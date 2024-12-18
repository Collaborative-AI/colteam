#!/bin/bash
echo "PACKAGES WILL BE INSTALLED. THIS MAY BREAK YOUR EXISTING TOOLCHAIN."
echo "YOU ACCEPT ALL RESPONSIBILITY BY PROCEEDING."

install(){
  python -m pip install --upgrade pip
  pip install -r requirements.txt
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
