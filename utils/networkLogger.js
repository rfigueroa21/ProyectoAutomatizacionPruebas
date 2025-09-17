// Network logger for capturing API/network requests
export function attachNetworkLogger(page) {
    const requests = [];
    page.on('request', request => {
        requests.push({ url: request.url(), method: request.method() });
    });
    page.on('response', response => {
        requests.push({ url: response.url(), status: response.status() });
    });
    return requests;
}
