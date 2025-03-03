import http from 'k6/http';
import { check } from 'k6';
import testData from './testData.js';

const tokenPayload = JSON.parse(open('../json/getTokenPayload.json'));

export function getToken() {
    const getTokenResponse = http.post(testData.tokenUrl, JSON.stringify(tokenPayload));
    const token = JSON.parse(getTokenResponse.body);
    check(getTokenResponse, {
        'status is 200': (res) => res.status === 200
    });
    return token;
}