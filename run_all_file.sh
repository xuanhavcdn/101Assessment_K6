#!/bin/bash

# Navigate to the tests directory
cd tests

# Run each test file one by one in k6 Cloud
for test_file in *.js; do
  echo "Running $test_file in k6 Cloud..."
  k6 cloud "$test_file"
done
