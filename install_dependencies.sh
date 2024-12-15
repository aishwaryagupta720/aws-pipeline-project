#!/bin/bash
echo "Installing Node.js..."
curl -fsSL https://rpm.nodesource.com/setup_14.x | bash -
yum install -y nodejs
cd /awsapp
npm install
