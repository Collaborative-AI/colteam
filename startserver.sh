#!/bin/bash
python.exe -m pip install --upgrade pip
pip show django || pip install django
pip show djongo || pip install djongo
pip show celery || pip install celery
pip show django-redis || pip install django-redis
pip show django-cors-headers || pip install django-cors-headers
pip show channels==3.0.4 || pip install channels==3.0.4
pip show channels_redis==3.3.1 || pip install channels_redis==3.3.1

# server
python3 manage.py makemigrations
python3 manage.py migrate
res="$?"
while [ "$res" != "0" ]
do
    sleep 3;
    python3 manage.py migrate
    res="$?"
done
nohup python3 manage.py runserver 0.0.0.0:8000 &

# redis
if ! cd redis; then
    echo "Failed to change directory to redis!"
    exit 1
fi
redis-server.exe redis.windows.conf &
# shellcheck disable=SC2103
cd ..

# celery
celery -A colteam worker --loglevel=info &
