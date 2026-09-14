---
name: arabic-nlp
description: Arabic and Islamic-knowledge NLP on this workstation — text normalization, tokenization checks, Arabic model selection (embeddings + generative), Quran/Hadith-aware RAG chunking and metadata. Use when the user says "Arabic", "عربي", "Quran", "قرآن", "Hadith", "حديث", "Islamic", "Athar", "Baligh", "Arabic normalization", "Arabic embeddings", "Arabic fine-tuning", or processes Arabic text in any pipeline.
---

# Arabic & Islamic-Knowledge NLP

Domain layer on top of the generic `rag`, `vector-db`, and `qlora` skills.
Load those for pipeline mechanics; this skill covers what is Arabic/Islamic-specific.

## 1. Text normalization (matching vs display)

Normalize for search/matching/embedding — **never** destroy the display form:

| Feature | Normalization | Notes |
|---|---|---|
| Alef variants (أ إ آ ٱ) | → ا | biggest recall win for search |
| Ya vs Alef maqsura (ي / ى) | unify | common in names, verbs |
| Tashkeel (harakat) | strip for embedding/index; preserve for display | Quranic text: strip only a working copy |
| Teh marbuta (ة) | → ه | fuzzy matching only |
| Tatweel (ـ) | remove | |
| Unicode forms | NFC-normalize everything; U+0640 artifacts from PDFs are common | |

Keep both columns when indexing: normalized (for retrieval) + original (for
display/citation). Store the normalizer version with the index.

## 2. Tokenization checks (do before training or embedding)

- Verify vocab coverage of your corpus under the model tokenizer; Arabic
  byte-fallback or large-vocab models matter (fragmented UTF-8 inflates tokens 2-4x).
- Test candidates empirically: AraBERT (`aubmindlab/bert-base-arabertv02`),
  CAMeL-BERT, multilingual sentence-transformers.
- For morphology-heavy tasks consider Farasa segmentation as preprocessing.
- Dialects: decide explicitly MSA vs Egyptian vs Gulf handling; do not mix
  silently.

## 3. Model selection

### Embeddings
- `sentence-transformers/paraphrase-multilingual-mpnet-base-v2` — general baseline
- `aubmindlab/bert-base-arabertv02` — Arabic-specific
- `intfloat/multilingual-e5-large` — strong multilingual (watch input prefix rules)
- Domain-fine-tuned (e.g., triplet/Matryoshka Arabic retrieval models) — best if available
- Pin the embedding model name+dims with the index; mismatch = silent quality collapse.

### Generative
- Jais, ACEGPT, ALLaM-7B — Arabic-native options
- Qwen2.5/Qwen3 multilingual — solid Arabic+code mix
- On RTX 5000 16 GB: 7B-8B quantized fits; verify with the `llm-inference`
  skill budget before assuming.

## 4. Islamic-knowledge RAG specifics (with `rag` + `vector-db`)

Chunking by source type:
- **Quran**: chunk per ayah (or ayah-group); never merge across surah
  boundaries; keep surah:ayah in metadata; use verified sources only
  (Tanzil, quran.com API) — preserve tashkeel in the stored original.
- **Hadith**: one hadith per chunk; metadata MUST include narrator chain
  (isnad) and grade (صحيح / حسن / ضعيف) when known.
- **Fiqh/scholarly text**: chunk at argument boundaries; tag school of
  thought (مذهب) in metadata when relevant; link ruling ↔ evidence.

Generation guardrails:
- Require citations to retrieved passages; refuse when evidence is weak.
- Distinguish strictly: Quran (divine) / Hadith (prophetic) / commentary /
  fatwa. Never blend categories in one answer.
- Scholarly accuracy over fluency: when uncertain about religious content,
  flag it — do not guess.

## 5. Fine-tuning Arabic LLMs (with `qlora`)

- Same QLoRA mechanics; see the `qlora` skill (local RTX 5000 section and
  cloud/Colab variant).
- Arabic-specific: check tokenizer coverage first (section 2), evaluate with
  Arabic-native metrics + human review — BLEU/rouge on English-style splits
  misleads.
- Data hygiene: normalize consistently at train time using the SAME
  normalizer you will use at inference; record it in the model card.

## Common pitfalls

- English/multilingual-only embedding model for Arabic → poor retrieval.
- Stripping tashkeel from the stored original → unusable for Quran citation.
- Ignoring alef/ya variants → missed matches that look like model failures.
- Chunking across structural boundaries (surah, hadith, argument).
- Evaluating only with automated metrics; Arabic needs human spot-checks.

## Verify

- Retrieval eval set of 20-50 Arabic queries with known target passages;
  measure recall@k before and after any normalization/chunking change.
