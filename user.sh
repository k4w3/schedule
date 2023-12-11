#!/bin/bash
nohup deno run -A user.js > user.log & echo $! > user.pid
