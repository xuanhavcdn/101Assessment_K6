import http from 'k6/http';
import { check, sleep } from 'k6';
import testData from '../data/testData.js';
import { getToken } from '../data/common.js';

const updateMerchantPayload = JSON.parse(open('../json/updateMerchant.json'));

// Use setup() to fetch the token before the test starts
export function setup() {
    return { token: getToken() };  // Get token once and share it across iterations
}

export default function (data) {
    const merchantResponse = http.patch(testData.baseUrl + testData.merchantUrl + '/' + testData.merchantId, JSON.stringify(updateMerchantPayload), {
        headers: {
            'Authorization': 'Bearer ' + data.token.id_token,  // Use token from setup()
            'Content-Type': 'application/json'
        }
    });
    check(merchantResponse, {
        'status is 200': (res) => res.status === 200
    });
    sleep(1);
}
export let options = {
  stages: [
    { duration: '10s', target: 5 },  // Ramp-up to 5 users in 10s
    { duration: '30s', target: 5 },  // Hold 5 users for 30s
    { duration: '10s', target: 0 },  // Ramp-down to 0 users in 10s
  ],
};