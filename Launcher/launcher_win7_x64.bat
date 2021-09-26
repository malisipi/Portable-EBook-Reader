@echo off
color f0
title E-Book
echo Portable E-Book Reader
taskkill /f /im chrome.exe
start chrome.exe --kiosk http://localhost:3748/res/index.html --incognito --disable-pinch --no-user-gesture-required --overscroll-history-navigation=0
launcher_win7_x64.exe