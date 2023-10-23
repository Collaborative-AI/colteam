#!/bin/bash
echo "PACKAGES WILL BE INSTALLED. THIS MAY BREAK YOUR EXISTING TOOLCHAIN."
echo "YOU ACCEPT ALL RESPONSIBILITY BY PROCEEDING."
read -r -p "Proceed? [Y/n] : " yn
case $yn in
  Y|y) install;;
  *) ;;
esac

install(){
  python.exe -m pip install --upgrade pip
  pip show django || pip install django
  pip show djongo || pip install djongo
  pip show celery || pip install celery
  pip show django-redis || pip install django-redis
  pip show django-cors-headers || pip install django-cors-headers
  pip show channels==3.0.4 || pip install channels==3.0.4
  pip show channels_redis==3.3.1 || pip install channels_redis==3.3.1
}

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
if ! cd redis_mac; then
    mkdir redis_mac && cd redis_mac || return
    curl -O http://download.redis.io/redis-stable.tar.gz
    tar xzvf redis-stable.tar.gz
    cd redis-stable || exit 1
    make
    make test
    sudo make install
fi

redis-server &

# celery
celery -A colteam worker --loglevel=info &
