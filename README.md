# colteam


### Frontend
Install dependencies 
```
npm install 
```
Run React application 
```
npm start
```
Go check ```http://localhost:3000/```

### Backend
Install packages:
pip, django, djongo, ...
Run application 
```
python3 manage.py runserver
```
Go check ```http://localhost:8000/```

```
redis-server
celery -A colteam worker --loglevel=info
daphne -p 8001 colteam.asgi:application
```

#### branch clarification
develop -> test -> (release) -> main
develop is used for develop new functions and self test.

### Shortcut
Run startserver.sh for MAC

Run startserver.bat for WINDOWS

Packages will be installed
