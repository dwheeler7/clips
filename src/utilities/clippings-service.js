import * as clippingsAPI from './clippings-api'

export async function addClipping(clippingData) {
    const clipping = await clippingsAPI.addClipping(clippingData)
}

export async function getClippings() {
    const clippings = await clippingsAPI.getClippings()
    return clippings
}

export async function showClipping(clippingId) {
    const clipping = await clippingsAPI.showClipping(clippingId)    
    return clipping
}