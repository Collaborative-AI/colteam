from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
# from django.contrib.auth.models import User, Group
from .models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework.test import APIRequestFactory
import json
from rest_framework.authtoken.models import Token

# Create your tests here.
class RegistrationAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_register_user(self):
        # 构造要发送的数据
        data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "testpassword",
            "firstName": "Test",
            "lastName": "User"
        }
        # 发送 POST 请求
        response = self.client.post('/user/register/', data, format='json')

        # 检查响应状态码是否为 201 Created
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # 打印生成的 Token
        token = response.data.get('token')
        print("Generated Token:", token)
        # 检查数据库中是否有对应的用户
        self.assertEqual(CustomUser.objects.count(), 1)

        # 检查数据库中的用户信息是否正确
        user = CustomUser.objects.get()
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.email, 'test@example.com')

class LoginAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        # 构造要发送的数据
        data0 = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "testpassword",
            "firstName": "Test",
            "lastName": "User"
        }
        response = self.client.post('/user/register/', data0, format='json')


    def test_successful_login(self):
        data = {
            "username": "testuser",
            "password": "testpassword"
        }

        response = self.client.post('/user/login/', data, format='json')
        token = response.data.get('token')
        print("Generated Token:", token)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)

    # def test_invalid_credentials(self):
    #     data = {
    #         "username": "testuser",
    #         "password": "wrongpassword"
    #     }

    #     response = self.client.post('/user/login/', data, format='json')

    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    #     self.assertNotIn('token', response.data)

# class CreateUserTestCase(TestCase):
#     def setUp(self):
#         self.client = APIClient()

#     def test_create_user(self):
#         # 准备要发送的JSON数据
#         user_data = {
#             "username": "testuser",
#             "email": "test@example.com"
#         }

#         # 发送POST请求
#         response = self.client.post('/testView1/', user_data, format='json')

#         # 验证响应状态码
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)

#         # 验证数据库是否有新创建的用户
#         self.assertEqual(User.objects.count(), 1)

#         # 验证数据库中的用户数据是否正确
#         created_user = User.objects.get()
#         self.assertEqual(created_user.username, user_data["username"])
#         self.assertEqual(created_user.email, user_data["email"])

# class GetUserTestCase(TestCase):
#     def setUp(self):
#         self.client = APIClient()
#         # 创建一个测试用户以用于测试
#         User.objects.create(username="Remi", email="remi@example.com")

#     def test_get_users(self):
#         factory = APIRequestFactory()
#         request = factory.get('/testView2/')

#         # 发送GET请求
#         response = self.client.get('/testView2/')

#         # 验证响应状态码
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#         # 验证返回的JSON数据中是否包含预期的用户名
#         self.assertContains(response, "Remi")

#         # 验证返回的JSON数据是否包含预期的邮箱
#         self.assertContains(response, "remi@example.com")

#         # 在请求上下文中实例化序列化器，传递请求对象
#         context = {'request': request}
#         users = User.objects.filter(username="Remi")
#         user_serializer = UserSerializer(users, many=True, context=context)

#         # 将响应内容解析为JSON
#         response_data = json.loads(response.content)

#         # 验证返回的JSON数据是否正确序列化了用户数据
#         self.assertEqual(response_data, user_serializer.data)