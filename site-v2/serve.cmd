@echo off
rem Lance le site ARMD en local sur http://localhost:8080
cd /d "%~dp0"
start "" "http://localhost:8080"
python -m http.server 8080
