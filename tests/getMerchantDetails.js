import http from 'k6/http';
import { check, sleep } from 'k6';
import testData from '../data/testData.js';
import { getToken } from '../data/common.js';

export default function () {
    const token = getToken();
    const merchantResponse = http.get(testData.baseUrl + testData.merchantUrl + '/04da6f45-efcf-4027-971c-cf13de607b2b', {
        headers: {
            'Authorization': 'Bearer ' + token.id_token
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