import sendRequest from './send-request'

const BASE_URL = '/api/clippings'

export function addClipping(clippingData) {
    return sendRequest(BASE_URL, 'POST', clippingData)
}

export function getClippings() {
    return sendRequest(BASE_URL)
}