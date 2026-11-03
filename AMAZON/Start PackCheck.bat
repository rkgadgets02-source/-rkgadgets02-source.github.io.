@echo off
title PackCheck (keep this window open)
echo PackCheck is running at http://localhost:8080/
echo Keep this window open while you use the app. Close it to stop.
start "" "http://localhost:8080/"
python -m http.server 8080 --bind 127.0.0.1 --directory "%~dp0PackCheck"
pause
