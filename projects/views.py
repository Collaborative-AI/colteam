from rest_framework.decorators import api_view
from rest_framework.views import APIView
from users.models import CustomUser
from .serializers import ProjectDetailSerializer
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from .models import ProjectDetail
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework_jwt.utils import jwt_decode_handler
from users.views import *
from rest_framework.pagination import PageNumberPagination


class CustomPageNumberPagination(PageNumberPagination):
    page_size = 10  # 每页显示的数量
    page_size_query_param = 'page_size'
    max_page_size = 100


@api_view(['POST'])
def create_project(request):
    # 得到已经登录了的用户
    user_token_auth = get_token_from_request(request)
    user_id_auth = jwt_decode_handler(user_token_auth)['user_id']
    user_auth = CustomUser.objects.get(id=user_id_auth)

    request_data = {key: value for key, value in request.data.items() if key != 'id'}
    request_data['owner'] = user_auth.pk
    serializer = ProjectDetailSerializer(data=request_data)
    if serializer.is_valid():
        project = serializer.save()
        return Response({'message': 'Create project successfully'}, status=status.HTTP_201_CREATED)
    else:
        print(f'Project creation failed: {serializer.errors}')
        return Response({'message': 'Create project failed'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def view_my_projects(request):
    # TODO: 返回前x个项目,展开分页展示。
    # TODO: 添加类
    # TODO: 将东西放到日志里
    try:
        # 得到已经登录了的用户
        user_token_auth = get_token_from_request(request)
        user_id_auth = jwt_decode_handler(user_token_auth)['user_id']
        user_auth = CustomUser.objects.get(id=user_id_auth)

        project = ProjectDetail.objects.filter(owner=user_auth).order_by('id')
        # 不使用分页器
        # serializer = ProjectDetailSerializer(project, many=True)
        # return Response(serializer.data, status=status.HTTP_200_OK)

        # 使用分页器分页
        paginator = CustomPageNumberPagination()
        result_page = paginator.paginate_queryset(project, request)
        serializer = ProjectDetailSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    except Exception:
        return Response({'message': 'Invalid username'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def view_one_project(request):
    """
    view a specific project and its details (get a project by Id)
    """
    try:
        project_id = request.data.get('id')
        project = ProjectDetail.objects.filter(id=project_id)
        serializer = ProjectDetailSerializer(project, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception:
        return Response({'message': 'Invalid project ID'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def update_project(request):
    try:
        # 得到已经登录了的用户
        user_token_auth = get_token_from_request(request)
        user_id_auth = jwt_decode_handler(user_token_auth)['user_id']
        user_auth = CustomUser.objects.get(id=user_id_auth)
        # 拿到项目
        project_id = request.data.get('id')
        project = ProjectDetail.objects.get(id=project_id)

        if user_auth.id == project.owner.id:
            request_data = {key: value for key, value in request.data.items() if key != 'owner'}
            serializer = ProjectDetailSerializer(instance=project, data=request_data, partial=True)
            if serializer.is_valid():
                serializer.update(project, request_data)
                return Response({'message': 'Update project successfully'}, status=status.HTTP_200_OK)
            else:
                print(serializer.errors)
                return Response({'message': 'Information is not valid.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': 'You can only update your project'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        error_message = str(e)
        return Response({'message': 'Invalid project id'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def delete_project(request):
    try:
        # 得到已经登录了的用户
        user_token_auth = get_token_from_request(request)
        user_id_auth = jwt_decode_handler(user_token_auth)['user_id']
        user_auth = CustomUser.objects.get(id=user_id_auth)
        # 得到项目信息
        project_id = request.data.get('id')
        project = ProjectDetail.objects.get(id=project_id)
        # 判断项目owner是否登录
        if user_auth == project.owner:
            project.delete()
            return Response({'message': 'Delete project successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'You can only delete your project'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception:
        return Response({'message': 'Invalid project id'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def all_projects(request):
    try:
        project = ProjectDetail.objects.all().order_by('id')
        # 不使用分页器分页
        # serializer = ProjectDetailSerializer(project, many=True)
        # return Response(serializer.data, status=status.HTTP_200_OK)
        # 使用分页器
        paginator = CustomPageNumberPagination()
        result_page = paginator.paginate_queryset(project, request)
        serializer = ProjectDetailSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    except Exception:
        return Response({'message': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)


class ProjectApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]


class ProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = ProjectDetail.objects.all().order_by('-post_date')  # 使用自定义用户模型
    serializer_class = ProjectDetailSerializer
