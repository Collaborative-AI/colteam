from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import ProjectDetail
from .serializers import ProjectDetailSerializer
from rest_framework.test import APIRequestFactory
from datetime import datetime, timedelta
import json
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
# Create your tests here.
# Create your tests here.
class test_create(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_register_user(self):
        # 构造要发送的数据
        data = {
            "id": 6,  
            "title": "Test Project 3",
            "end_date": datetime.now() + timedelta(days=7),
            "description": "A new test project."
        }

        # 发送 POST 请求
        response = self.client.post('/projects/create/', data, format='json')

        # 检查响应状态码是否为 201 Created
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # 检查数据库中是否有对应的用户
        self.assertEqual(ProjectDetail.objects.count(), 1)

        # 检查数据库中的用户信息是否正确
        project = ProjectDetail.objects.get()
        self.assertEqual(project.title, 'Test Project 3')
        self.assertEqual(project.user.username, 'user123@gmai.com')