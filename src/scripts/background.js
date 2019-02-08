import Kutt from 'kutt';
import browser from 'webextension-polyfill';

let targetURLs = [];

// Shorten url
async function getShortURL(API_key, URLtoShorten, password) {
    const kutt = new Kutt();
    kutt.setKey(API_key);

    const data = {
        target: URLtoShorten,
        password: password
    };

    try {
        const response = await kutt.submit(data);
        // Returning shortlink
        return response.shortUrl;
    } catch (e) {
        // time out
        if (e.code === 'ECONNABORTED') {
            return 504;
        }
        else if (e.response) {
            // return error code
            return e.response.status;
        }
    }
}


// Calling function
browser.runtime.onMessage.addListener(async (request, sender, response) => {
    // get the url shorten request from popup.js
    if (request.msg === 'start') {
        // consume the promise
        return getShortURL(request.API_key, request.pageUrl, request.password)
            .then(shortLink => {
                return shortLink;
            });
    }
    // store urls to history
    else if (request.msg === 'store') {
        let counter = request.count;
        if (counter >= 3) {
            // delete first element
            targetURLs.shift();
            --counter;
            browser.storage.local.set({ count: counter });
        }
        if (counter < 3) {
            targetURLs.push(request.mix_URLs);
            ++counter;
            browser.storage.local.set({ URL_array: targetURLs, count: counter });
            // console.log(targetURLs);
        }
        // console.log('count in bg: ' + counter);
    }
});