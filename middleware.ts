import { next } from '@vercel/functions'

const BASIC_AUTH_REALM = 'Haggler Internal'
const BASIC_AUTH_USER = 'internal'
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1'])

function unauthorizedResponse() {
  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'Cache-Control': 'no-store',
      'WWW-Authenticate': `Basic realm="${BASIC_AUTH_REALM}", charset="UTF-8"`,
    },
  })
}

function unavailableResponse() {
  return new Response('Site password is not configured.', {
    status: 503,
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}

export const config = {
  runtime: 'nodejs',
}

export default function middleware(request: Request) {
  const url = new URL(request.url)

  if (LOCAL_HOSTS.has(url.hostname)) {
    return next()
  }

  const password = process.env.HAGGLER_SITE_PASSWORD

  if (!password) {
    return unavailableResponse()
  }

  const authorization = request.headers.get('authorization')

  if (!authorization?.startsWith('Basic ')) {
    return unauthorizedResponse()
  }

  const expected = Buffer.from(`${BASIC_AUTH_USER}:${password}`, 'utf8').toString('base64')
  const provided = authorization.slice('Basic '.length).trim()

  if (provided !== expected) {
    return unauthorizedResponse()
  }

  return next()
}
