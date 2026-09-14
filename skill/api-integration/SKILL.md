---
name: api-integration
description: "API integration patterns. Use when the user says 'OAuth2', 'webhook', 'rate limiting', 'API client', 'retry logic', 'REST client', or 'third-party API'."
---

# API Integration

## OAuth2 flows

### Authorization Code (most common)
```
1. Redirect user to provider /authorize
2. User logs in, grants consent
3. Provider redirects back with code
4. Exchange code for tokens (POST /token)
5. Use access_token in API calls
6. Refresh when expired
```

### Client Credentials (machine-to-machine)
```python
response = requests.post(
    token_url,
    data={
        "grant_type": "client_credentials",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    },
)
```

## Webhook handling

```python
@app.post("/webhooks/stripe")
async def handle_webhook(request: Request):
    payload = await request.body()
    sig = request.headers["stripe-signature"]
    
    # Verify signature
    event = stripe.Webhook.construct_event(payload, sig, WEBHOOK_SECRET)
    
    # Handle event type
    if event["type"] == "payment_intent.succeeded":
        await handle_payment(event["data"]["object"])
    
    return {"status": "ok"}
```

## Retry logic

```python
import tenacity


@tenacity.retry(
    stop=tenacity.stop_after_attempt(3),
    wait=tenacity.wait_exponential(multiplier=1, min=4, max=10),
    retry=tenacity.retry_if_exception_type(
        (requests.Timeout, requests.ConnectionError)
    ),
)
def call_api(url, data):
    return requests.post(url, json=data, timeout=30)
```

## Rate limiting

- **Client-side**: token bucket or sliding window
- **Server-side**: 429 Too Many Requests with Retry-After header
- **Respect provider limits**: read docs, implement backoff

## API client pattern

```python
class APIClient:
    def __init__(self, base_url: str, api_key: str):
        self.base_url = base_url
        self.headers = {"Authorization": f"Bearer {api_key}"}
    
    def _request(self, method: str, path: str, **kwargs):
        url = f"{self.base_url}{path}"
        response = requests.request(method, url, headers=self.headers, **kwargs)
        if response.status_code == 429:
            retry_after = int(response.headers.get("Retry-After", 60))
            time.sleep(retry_after)
            return self._request(method, path, **kwargs)
        response.raise_for_status()
        return response.json()
    
    def get(self, path, **kwargs):
        return self._request("GET", path, **kwargs)
```

## Pitfalls

- Not verifying webhook signatures (security risk)
- Hardcoding API keys (use environment variables)
- Not implementing retry (transient failures cause data loss)
- Ignoring rate limits (get banned)
- Not logging API calls (impossible to debug)
