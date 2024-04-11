#!/bin/bash
echo "PACKAGES WILL BE INSTALLED. THIS MAY BREAK YOUR EXISTING TOOLCHAIN."
echo "YOU ACCEPT ALL RESPONSIBILITY BY PROCEEDING."

install(){
#  python.exe -m pip install --upgrade pip
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
  pip show minio || pip install minio
  pip show django-storages boto3 || pip install django-storages boto3
  pip show django-storages djangorestframework-api-key || pip install djangorestframework-api-key
  pip show redis || pip install redis
  pip show django-redis || pip install django-redis
  pip show pymongo==3.12.3 || pip install pymongo==3.12.3
}

read -r -p "Proceed? [Y/n] : " yn
case $yn in
  Y|y) install;;
  *) ;;
esac

# server
python manage.py makemigrations
python manage.py migrate
res="$?"
while [ "$res" != "0" ]
do
    sleep 3;
    python manage.py migrate
    res="$?"
done
echo "STARTING COLTEAM SERVER"
nohup python manage.py runserver 0.0.0.0:8000 &

# redis
echo "INSTALLING REDIS SERVER"
if ! cd redis_mac; then
    mkdir redis_mac && cd redis_mac || exit 1
    curl -O http://download.redis.io/redis-stable.tar.gz
    tar xzvf redis-stable.tar.gz
    cd redis-stable || exit 1
    if ! command -v brew &> /dev/null; then
        echo "Homebrew is not installed. Installing Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    brew install pkg-config
    sudo make install
    cd ..
fi
echo "STARTING REDIS SERVER"
redis-server &

cd ..
# celery
echo "STARTING CELERY TASKS"
celery -A colteam worker --loglevel=info &
