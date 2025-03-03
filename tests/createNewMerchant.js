import http from 'k6/http';
import { check, sleep } from 'k6';
import testData from '../data/testData.js';
import { getToken } from '../data/common.js';

const createNewMerchantPayload = JSON.parse(open('../json/createNewMerchant.json'));


export default function () {
    const token = getToken();
    const merchantResponse = http.post(testData.baseUrl + testData.merchantUrl, JSON.stringify(createNewMerchantPayload), {
        headers: {
            'Authorization': 'Bearer ' + token.id_token,
            'Content-Type': 'application/json'
        }
    });
    check(merchantResponse, {
        'status is 201': (res) => res.status === 201
    });
    sleep(1);
}

export let options = {
  stages: [
    { duration: '10s', target: 5 },  // Ramp-up to 5 users in 10s
    { duration: '30s', target: 5 },  // Hold 5 users for 30s
    { duration: '10s', target: 0 },  // Ramp-down to 0 users in 10s
  ],
  cloud: {
    distribution: {
      distributionLabel1: { percent: 100 },
    },
  },
};