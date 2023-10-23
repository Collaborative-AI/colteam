#!/bin/bash
pip install celery
pip install djongo
pip install django-redis
pip install django-cors-headers
pip install channels==3.0.4
pip install channels_redis==3.3.1

python3 manage.py makemigrations
python3 manage.py migrate
res="$?"
while [ "$res" != "0" ]
do
    sleep 3;
    python3 manage.py migrate
    res="$?"
done
python3 manage.py runserver 0.0.0.0:8000
cd redis || return
redis-server.exe redis.windows.conf
cd ..
celery -A colteam worker --loglevel=info
