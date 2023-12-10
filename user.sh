#!/bin/bash
nohup deno run -A server-user.js > user.log & echo $! > user_pid.txt
