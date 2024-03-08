import { getToken } from './users-service'

export default async function sendRequest(url, method='GET', payload = null) {
    const options = { method }
    console.log('payload',!!payload)
    if (payload) {
        options.headers = { 'Content-Type': 'application/json' }
        options.body = JSON.stringify(payload)
    }
    const token = getToken()
    console.log('token',!!token)
    if (token) {
        options.headers = options.headers || {}
        options.headers.Authorization = `Bearer ${token}`
    }
    const res = await fetch(url, options)
    console.log('res',!!res)
    if (res.ok) {
        return res.json()
    } else {
        throw new Error('Bad request')
    }

}