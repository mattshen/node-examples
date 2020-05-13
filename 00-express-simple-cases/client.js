const rp = require('request-promise');
const errors = require('request-promise/errors');

const result = {
    code: null, status: null, reason: null, data: null
};

function apiCall() {
    return rp({
        url: 'http://localhost:3002/timeout',
        timeout: 3000
    }).then(function (data) {
        console.log(data);
    })
        .catch(errors.StatusCodeError, reason => reason)
        .catch(errors.RequestError, reason => reason);
}

const sendNotification = () => new Promise((resolve, reject) => {
    const result = {
        code: null, status: null, reason: null, data: null
    };

    return apiCall()
        .then((response) => {
            if (response.statusCode === 204) {
                result.code = response.statusCode;
                result.status = 'success';
                result.reason = 'Notification sent successfully';
                return resolve(result);
            }
            result.code = 503;
            result.status = 'failure';
            result.reason = 'Failed to send the notification. Please try again later ...';
            return resolve(result);
        }).catch((error) => {
            result.code = 500;
            result.status = 'failure';
            result.reason = error;
            result.data = null;
            return reject(result);
        });
});


sendNotification().then(r => console.log(r)).catch(e => console.log(e));
