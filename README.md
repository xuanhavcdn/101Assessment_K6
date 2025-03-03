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
Run all js file:
```
./run_all_file.sh
```
Cloud: https://xuanhavcdn.grafana.net/a/k6-app/projects/3751909