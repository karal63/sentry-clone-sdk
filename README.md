# Sentry Clone Vue SDK

This project includes a lightweight SDK that allows applications to send error events to the Simple Sentry Clone server.

---

## Installation

Install the SDK in your Vue project

```bash
  npm install sentry-clone-sdk
```

## Verify setup

```javascript
// ...
<button @click="throwError">Throw error</button>
// ...
<script setup>
    function throwError() {
      throw new Error('Sentry Error');
    }
</script>
```
