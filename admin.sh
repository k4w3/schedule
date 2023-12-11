#!/bin/bash
nohup deno run -A admin.js > admin.log & echo $! > admin.pid
