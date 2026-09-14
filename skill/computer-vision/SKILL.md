---
name: computer-vision
description: Computer vision with PyTorch on this workstation. Use when the user says "computer vision", "YOLO", "object detection", "segmentation", "image classification", "OpenCV", "torchvision", or training/evaluating vision models on the RTX 5000.
---

# Computer Vision on RTX 5000 + WSL2

## Stack

- torchvision + PyTorch 2.11 (CUDA 12.8-capable build), OpenCV, albumentations/torchvision transforms.
- YOLO-family (ultralytics) for detection/segmentation — verify CUDA build on install.
- Display caveat: headless WSL2 — no GUI windows; save visualizations to files and view from Windows.

## GPU realities (sm_75, 16 GB)

- fp16 training with `torch.autocast` is supported; bf16 lacks native tensor-core support on Turing — prefer fp16.
- `channels_last` memory format helps conv models; verify per model.
- Batch size 8-32 typical for classification at 224px; detection with large inputs (1024+) eats VRAM fast — budget before promising.

## Workflow

1. Data: source + split (train/val/test by file, not by folder shuffle), class balance report.
2. Preprocessing: resize/interpolation policy, normalization matching the pretrained model's stats.
3. Model: start from pretrained weights (torchvision / ultralytics); freeze backbone for small data.
4. Training: LR schedule, augmentation, `torch.compile` if it helps, checkpoint every epoch to `D:\AI\Checkpoints\`.
5. Evaluation: per-class metrics, confusion matrix, PR curves, error analysis on samples (save figures to `docs/` or reports dir).

## Dataset rules

- Small samples may be mirrored for tests.
- Record dataset version/split hashes for reproducibility.