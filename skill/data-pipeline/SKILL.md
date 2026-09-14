---
name: data-pipeline
description: Data pipeline design and implementation. Ingestion, cleaning, preprocessing, validation, format conversion, deduplication, data versioning. Use when the user says "data pipeline", "preprocess", "clean data", "dataset", "ingestion", "ETL", "validate data", or "data quality".
---

# Data Pipeline

## Architecture

```
Source Loaders -> Cleaning -> Validation -> Preprocessing -> Versioning -> Storage
```

## Source Loaders

- **PDF:** PyMuPDF, pdfplumber, unstructured
- **Web:** BeautifulSoup, trafilatura, newspaper3k
- **APIs:** httpx, requests with rate limiting
- **Databases:** SQLAlchemy, duckdb
- **Files:** pandas/polars for CSV/JSON/Parquet

## Cleaning

- Deduplication (exact + fuzzy via simhash/minhash)
- PII detection and masking
- Language detection and filtering
- Format normalization (encoding, line endings)
- Missing value handling

## Validation

- Schema validation (pandera, great_expectations)
- Statistical checks (distribution drift, missing values)
- Content quality (readability, coherence scores)
- Class imbalance detection (ratio > 10:1)

## Storage

- D:\AI\Datasets\ for raw and processed data
- Record provenance: source, version, timestamp, hash

## Format Conversion

- JSONL for LLM training data
- Parquet for columnar storage
- Arrow for inter-process transfer
- HuggingFace datasets for ML workflows

## Rules

- Keep raw data immutable; transformations produce new files
