/**
 * OKX API Authentication
 *
 * Uses Web Crypto API for HMAC-SHA256 signing (browser-compatible).
 * Keys never leave the browser — all signing happens client-side.
 */

export interface OKXCredentials {
  apiKey: string
  secretKey: string
  passphrase: string
}

/**
 * Generate HMAC-SHA256 signature for OKX API requests.
 *
 * Pre-hash string = timestamp + method + requestPath + body
 * Signature = Base64(HMAC-SHA256(prehash, secretKey))
 */
export async function signOKXRequest(
  timestamp: string,
  method: string,
  requestPath: string,
  body: string,
  secretKey: string
): Promise<string> {
  const prehash = timestamp + method.toUpperCase() + requestPath + body

  // Use Web Crypto API for browser compatibility
  const encoder = new TextEncoder()
  const keyData = encoder.encode(secretKey)
  const messageData = encoder.encode(prehash)

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData)

  // Convert ArrayBuffer to Base64
  const bytes = new Uint8Array(signature)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

/**
 * Build authenticated headers for OKX API requests.
 */
export async function buildAuthHeaders(
  credentials: OKXCredentials,
  method: string,
  requestPath: string,
  body: string = ''
): Promise<Record<string, string>> {
  const timestamp = new Date().toISOString()

  const sign = await signOKXRequest(
    timestamp,
    method,
    requestPath,
    body,
    credentials.secretKey
  )

  return {
    'OK-ACCESS-KEY': credentials.apiKey,
    'OK-ACCESS-SIGN': sign,
    'OK-ACCESS-TIMESTAMP': timestamp,
    'OK-ACCESS-PASSPHRASE': credentials.passphrase,
    'Content-Type': 'application/json',
  }
}

/**
 * Make an authenticated request to OKX API.
 * Uses Vite proxy in browser (/api/okx → www.okx.com).
 */
export async function okxAuthFetch(
  credentials: OKXCredentials,
  method: string,
  path: string,
  body?: Record<string, unknown>,
  timeoutMs: number = 10_000
): Promise<unknown> {
  const bodyStr = body ? JSON.stringify(body) : ''
  const headers = await buildAuthHeaders(credentials, method, path, bodyStr)

  const baseUrl = typeof window !== 'undefined' ? '/api/okx' : 'https://www.okx.com'

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const res = await fetch(`${baseUrl}${path}`, {
      method,
      headers,
      body: bodyStr || undefined,
      signal: controller.signal,
    })

    const data = await res.json()

    if (data.code !== '0') {
      throw new Error(`OKX API error ${data.code}: ${data.msg || JSON.stringify(data)}`)
    }

    return data
  } finally {
    clearTimeout(timer)
  }
}
