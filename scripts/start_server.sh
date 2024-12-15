#!/bin/bash
echo "Starting backend server..."
pm2 stop all || true
pm2 start awsapp/index.js
