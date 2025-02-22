# ColTeam
A website demo with react, django and mongodb

### Run the Frontend
Navigate to the `my-react-app` folder:
```
cd my-react-app
```
Install dependencies 
```
npm install 
```
Run React application 
```
npm start
```
Go check ```http://localhost:3000/```

### Run the Backend
Install packages:
```
pip install -r requirements.txt
```
Before starting the backend, run the following commands in separate terminals:
```
celery -A colteam worker --loglevel=info
redis-server
```
Run application 
```
python manage.py runserver
```
Go check ```http://localhost:8000/```

### Shortcut
Run startserver.sh for IOS System

Run startserver.bat for WINDOWS System

Packages will be installed automatically, things will be setup.

### Create a virtual environment in Python

To create a virtual environment in Python, you can use the built-in venv module. Here are the simple steps to create a virtual environment using venv in the terminal:

1. Open a terminal.
2. Navigate to the directory where you want to create the virtual environment.
3. Run the following command to create a virtual environment named myenv:
```bash
python -m venv myenv
```
Replace myenv with any name you prefer.

Activate the virtual environment:
On Windows:

```bash
myenv\Scripts\activate
```

On macOS and Linux:

```bash
source myenv/bin/activate
```

Once the virtual environment is activated, you will see (myenv) or the name of your virtual environment at the beginning of the command prompt. This indicates that you are inside the virtual environment, and all Python package installations and commands will be performed within this environment.

When you are done working, you can ```deactivate``` the virtual environment by running the ```deactivate``` command.

This way, you have created a Python virtual environment where you can independently install and manage packages without affecting the global Python environment.
