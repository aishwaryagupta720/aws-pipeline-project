#!/bin/bash
echo "Starting backend server..."
pm2 stop all || true
pm2 start home/ubuntu/awsapp/index.js
