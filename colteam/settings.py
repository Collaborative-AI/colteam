"""
Django settings for colteam project.

Generated by 'django-admin startproject' using Django 4.2.3.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""
import datetime
import os
import ssl
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-$h)9wxq$c-vmy(@!$gpss%hiitvqih_y$n$(pe3xu+pd#rft6f'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['web', '0.0.0.0', 'localhost', '127.0.0.1']

CSRF_TRUSTED_ORIGINS = ['http://*.vcm-xxxxx.vm.duke.edu:8000', 'http://*.127.0.0.1:8000', 'http://*.0.0.0.0:8000',
                        'http://localhost:8000']

AUTH_USER_MODEL = 'users.CustomUser'

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'users.apps.UsersConfig',
    'projects.apps.ProjectsConfig',
    'chats.apps.ChatsConfig',
    'forum.apps.ForumConfig',
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'crontab',
    'channels',
    'django_elasticsearch_dsl',
    'tags.apps.TagConfig'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'colteam.urls'

CORS_ORIGIN_ALLOW_ALL = True

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # 允许的前端应用的域名
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates',
                 os.path.join(BASE_DIR, "my-react-app/build"),
                 ]
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'colteam.wsgi.application'
ASGI_APPLICATION = 'colteam.asgi.application'

REST_FRAMEWORK = {
    # 指定使用的权限类
    # a.在全局指定默认的权限类（当认证通过之后，可以获取何种权限）
    'DEFAULT_PERMISSION_CLASSES': [
        # AllowAny 不管是否有认证成功，都能获取所有权限
        # IsAdminUser 管理员（管理员需要登录）具备所有权限
        # IsAuthenticated 只要登录，就具备所有权限
        # IsAuthenticatedOrReadOnly，如果登录了就具备所有权限，不登录只具备读取数据的权限
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'auths.token_auth.TokenValidationMiddleware',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}
JWT_AUTH = {
    'JWT_ALGORITHM': 'HS256',  # 选择适合您的加密算法
    'JWT_ALLOW_REFRESH': True,
    'JWT_VERIFY_EXPIRATION': True,  # 验证令牌是否过期
    'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(hours=5),  # 刷新令牌有效期
    'JWT_AUTH_HEADER_PREFIX': 'Bearer',
}

SIMPLE_JWT = {
    # token有效时长(返回的 access 有效时长)
    'ACCESS_TOKEN_LIFETIME': datetime.timedelta(hours=2),
    # token刷新的有效时间(返回的 refresh 有效时长)
    'REFRESH_TOKEN_LIFETIME': datetime.timedelta(hours=5),

    'SLIDING_TOKEN_REFRESH_LIFETIME': datetime.timedelta(hours=5),  # 滑动刷新令牌的过期时间
    'SLIDING_TOKEN_REFRESH_LIFETIME_GRACE_PERIOD': datetime.timedelta(minutes=5),  # 滑动刷新令牌宽限期
    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',  # 滑动刷新令牌的过期时间声明名称
    'BLACKLIST_AFTER_ROTATION': True,

    'ALGORITHM': 'HS256',
    'AUTH_HEADER_TYPES': ('Bearer',),
}

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "djongo",
        "CLIENT": {
            # "host":"mongodb+srv://admin:OBrgZwHsZLq4xbSM@cluster0.6zz5g2s.mongodb.net/?retryWrites=true&w=majority",
            # "username": "admin",
            # "password": "OBrgZwHsZLq4xbSM",
            # "name": "Cluster0",
            "host": "mongodb+srv://backend:JBoj5w4spnOlbLvF@crawl-data.5blrkb2.mongodb.net/?ssl=true&ssl_cert_reqs=CERT_NONE&retryWrites=true&w=majority",
            "username": "backend",
            "password": "JBoj5w4spnOlbLvF",
            "name": "Crawl-Data",
            "authMechanism": "SCRAM-SHA-1",
        },
    }}

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = False

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(os.path.dirname(__file__), 'static')

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "my-react-app\build\static"),
]

# 定时任务
CRONJOBS = [
    ('*/10 * * * *', 'users.tasks.clean_expired_tokens'),  # 每10分钟运行一次任务
]

# Redis缓存
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',  # Redis 地址
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            'CONNECTION_POOL_KWARGS': {'max_connections': 100},
            # 'PASSWORD': 'colteam',
        }
    }
}

# Email
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_USE_TLS = True
EMAIL_PORT = 587
# TODO: need finish register
# EMAIL_HOST_USER = 'colteam.mailbox@gmail.com'  # sender's email-id
# EMAIL_HOST_PASSWORD = 'qdcldriyjzaahxxh'  # password associated with above email-id
# test email
EMAIL_HOST_USER = 'ridol.mailbox@gmail.com'  # sender's email-id
EMAIL_HOST_PASSWORD = 'pcqg uflt lxrb qkaw'  # password associated with above email-id

 
# Celery配置
CELERY_BROKER_URL = 'redis://127.0.0.1:6379/6'  # Redis连接URL
CELERY_RESULT_BACKEND = 'redis://127.0.0.1:6379/8'  # Redis连接URL

# 让celery在启动时加载Django配置
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'UTC'
CELERY_TASK_TRACK_STARTED = True
CELERY_TASK_TIME_LIMIT = 30 * 60
CELERY_BROKER_CONNECTION_RETRY_ON_STARTUP = True

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('127.0.0.1', 6379)],
        },
    },
}

ELASTICSEARCH_DSL = {
    'default': {
        'hosts': [
            'localhost:9200',
            'localhost:9201',
            'localhost:9202',
        ],
        'timeout': 20,  # 设置连接超时为20秒
    },
}

MINIO_ACCESS_KEY = 'colteam-minio-access-key'
MINIO_SECRET_KEY = 'colteam-minio-secret-key'
MINIO_ENDPOINT = 'http://localhost:9000'
MINIO_USE_SSL = False  # 根据你的实际情况配置是否使用 SSL

DEFAULT_FILE_STORAGE = 'storages.backends.minio.MinioStorage'
STATICFILES_STORAGE = 'storages.backends.minio.MinioStorage'
MINIO_STORAGE_ACCESS_KEY = 'colteam-minio-access-key'
MINIO_STORAGE_SECRET_KEY = 'colteam-minio-secret-key'
MINIO_STORAGE_ENDPOINT = 'http://localhost:9000'
MINIO_STORAGE_USE_SSL = False  # 根据你的实际情况配置是否使用 SSL

MINIO_STORAGE_MEDIA_BUCKET_NAME = 'your-media-bucket'
MINIO_STORAGE_AUTO_CREATE_MEDIA_BUCKET = True
MINIO_STORAGE_STATIC_BUCKET_NAME = 'your-static-bucket'
MINIO_STORAGE_AUTO_CREATE_STATIC_BUCKET = True
