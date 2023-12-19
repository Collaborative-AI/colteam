@echo off
echo PACKAGES WILL BE INSTALLED. THIS MAY BREAK YOUR EXISTING TOOLCHAIN.
echo YOU ACCEPT ALL RESPONSIBILITY BY PROCEEDING.
set /p "yn=Proceed? [Y/n] : "
if /I "%yn%"=="Y" (
    call :install
)
goto :EOF

:install
python -m pip install --upgrade pip
pip show django || pip install django
pip show djangorestframework || pip install djangorestframework
pip show djangorestframework-jwt || pip install djangorestframework-jwt
pip show djangorestframework-simplejwt || pip install djangorestframework-simplejwt
pip show djongo || pip install djongo
pip show celery || pip install celery
pip show crontab || pip install crontab
pip show django-crontab || pip install django-crontab
pip show django-cors-headers || pip install django-cors-headers
pip show channels==3.0.4 || pip install channels==3.0.4
pip show channels_redis==3.3.1 || pip install channels_redis==3.3.1
pip show elasticsearch || pip install elasticsearch
pip show django-elasticsearch-dsl || pip install django-elasticsearch-dsl

:: server
python manage.py makemigrations
python manage.py migrate
set res=%errorlevel%
:check_res
if %res% neq 0 (
    timeout /t 3
    python manage.py migrate
    set res=%errorlevel%
    if %res% neq 0 goto check_res
)
echo STARTING COLTEAM SERVER
start "Colteam Server" /B python manage.py runserver 0.0.0.0:8000

:: redis
cd redis_windows
echo STARTING REDIS SERVER
start "Run Redis Server" /B redis-server.exe redis.windows.conf

:: celery
cd ..
echo STARTING CELERY TASKS
start "Celery Tasks" /B celery -A colteam worker --loglevel=info