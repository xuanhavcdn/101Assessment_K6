# 101Assessment_K6
Performance testing with K6
Run test on local:
```
k6 run tests/createNewMerchant.js --out json=reports/result.json
```
Run test cloud:
```
k6 cloud tests/getListMerchant.js
```