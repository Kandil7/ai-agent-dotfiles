---
name: qlora
description: PEFT / QLoRA fine-tuning on the RTX 5000 16GB. Use when the user says "fine-tune", "QLoRA", "LoRA", "PEFT", "4-bit training", "bitsandbytes", "unsloth", or training a model on this GPU.
---

# QLoRA / PEFT Fine-tuning on 16 GB VRAM

## Feasibility (FACT-based)

QLoRA (4-bit NF4 + LoRA adapters) makes 7B-8B fine-tuning feasible on 16 GB:

| Workload | Approx VRAM (QLoRA) |
|---|---|
| 7B, batch 1, seq 512-1024, grad checkpointing | 10-14 GB |
| 3B, comfortable headroom | 6-9 GB |
| 13B | risky, needs aggressive settings — verify before promising |

Budget: 4-bit weights (~4 GB for 7B) + gradients (only LoRA params are trained) + optimizer (AdamW 8-bit) + KV/activations (gradient checkpointing keeps these low).

## Config essentials

- `BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_quant_type="nf4", bnb_4bit_compute_dtype=torch.float16)` — fp16 on sm_75.
- `LoraConfig(r=8-16, lora_alpha=16-32, lora_dropout=0.05-0.1, target_modules=<model-specific>)`.
- `gradient_checkpointing=True` (mandatory for 7B on 16 GB).
- `optim="paged_adamw_8bit"`, `per_device_train_batch_size=1-2` + gradient accumulation.
- Save only the adapter (`save_pretrained` on the PEFT model), merge when needed for inference.

## Rules

- bitsandbytes must support the installed PyTorch/CUDA combo — verify before installing; report the version assumption.
- Record: base model + quant + r/alpha + batch + seq + VRAM peak + loss curve + eval metrics.

## Verification

- After training: load the adapter, run eval on the same eval set used before training; report delta.
- Overfitting check: compare train vs eval loss curves.

## Cloud variant (Colab T4 / Vast.ai / RunPod)

Local prep -> cloud execution: write and unit-test the script locally on
samples; run the full training where the GPU is.

### Data preparation
- Format as instruction-response pairs: Alpaca (`instruction`/`input`/`output`)
  or ChatML messages; pick one format and stay consistent.
- Load/preprocess with `datasets`; tokenize with the model's tokenizer and
  verify special tokens + chat template.
- Plot the token-length distribution before choosing `max_seq_length`.
- Held-out eval split (90/10) saved to disk so reruns are comparable.
- Arabic data: apply the `arabic-nlp` normalization rules consistently.

### Starting hyperparameters (SFTTrainer from `trl`)
- `learning_rate=2e-4`, cosine schedule, `warmup_ratio=0.03`
- `per_device_train_batch_size=1-2` on T4 (<=4 for a 7B QLoRA); compensate with
  `gradient_accumulation_steps=4-8`
- `num_train_epochs=3-5`; log to wandb/tensorboard
- `gradient_checkpointing=True` AND `model.config.use_cache=False` during
  training (forgetting this silently corrupts outputs)

### Compute dtype — CORRECTED FACT
Colab T4 is Turing (sm_75): **no bfloat16**. Use fp16 everywhere:
`bnb_4bit_compute_dtype=torch.float16` + `fp16=True`. bf16 only on Ampere+.

### Export & push
- `model.merge_and_unload()` only at export time; ship adapters during iteration.
- Push merged model + tokenizer + model card (data, normalizer version,
  hyperparams, eval results) via `push_to_hub`. Save a checkpoint to Drive/HF
  BEFORE pushing anything anywhere.

### Colab setup cell
```python
!pip install -q transformers datasets accelerate peft trl bitsandbytes wandb
# pin versions in the first cell for reproducibility
from google.colab import drive; drive.mount('/content/drive')
!nvidia-smi   # confirm GPU before spending time
```

### Cloud pitfalls
- Padding side: right for training, left for generation-time inference.
- Seed everything (`transformers.set_seed`) — unseeded runs are unreproducible.
- Pick fp16 or bf16 once per run; never mix.
- Clear cache between stages: `torch.cuda.empty_cache()`.
