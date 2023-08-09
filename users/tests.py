from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User, Group
from .serializers import UserSerializer
from rest_framework.test import APIRequestFactory
import json
# Create your tests here.
class CreateUserTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_user(self):
        # 准备要发送的JSON数据
        user_data = {
            "username": "testuser",
            "email": "test@example.com"
        }

        # 发送POST请求
        response = self.client.post('/testView1/', user_data, format='json')

        # 验证响应状态码
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # 验证数据库是否有新创建的用户
        self.assertEqual(User.objects.count(), 1)

        # 验证数据库中的用户数据是否正确
        created_user = User.objects.get()
        self.assertEqual(created_user.username, user_data["username"])
        self.assertEqual(created_user.email, user_data["email"])

class GetUserTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        # 创建一个测试用户以用于测试
        User.objects.create(username="Remi", email="remi@example.com")

    def test_get_users(self):
        factory = APIRequestFactory()
        request = factory.get('/testView2/')

        # 发送GET请求
        response = self.client.get('/testView2/')

        # 验证响应状态码
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # 验证返回的JSON数据中是否包含预期的用户名
        self.assertContains(response, "Remi")

        # 验证返回的JSON数据是否包含预期的邮箱
        self.assertContains(response, "remi@example.com")

        # 在请求上下文中实例化序列化器，传递请求对象
        context = {'request': request}
        users = User.objects.filter(username="Remi")
        user_serializer = UserSerializer(users, many=True, context=context)

        # 将响应内容解析为JSON
        response_data = json.loads(response.content)

        # 验证返回的JSON数据是否正确序列化了用户数据
        self.assertEqual(response_data, user_serializer.data)