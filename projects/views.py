from rest_framework.decorators import api_view
from rest_framework.views import APIView
from users.models import CustomUser
from .serializers import ProjectDetailSerializer
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from .models import ProjectDetail
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from users.views import UserView
from rest_framework_jwt.utils import jwt_decode_handler

@api_view(['POST'])
def create_project(request):
    user_id = request.data.get("id")
    user = CustomUser.objects.get(id=user_id)
    request_data = {key: value for key, value in request.data.items() if key != 'id'}
    request_data['owner'] = user.pk
    serializer = ProjectDetailSerializer(data=request_data)
    if serializer.is_valid():
        project = serializer.save()
        return Response({'message': 'Create project successfully'}, status=status.HTTP_201_CREATED)
    else:
        print((f'Project creation failed: {serializer.errors}'))
        return Response({'message': 'Create project failed'}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
def my_projects(request):
    try:
        # 得到已经登录了的用户
        user_token_Auth = UserView.get_token_from_request(request)
        user_id_Auth = jwt_decode_handler(user_token_Auth)['user_id']
        user_Auth = CustomUser.objects.get(id=user_id_Auth)
        
        project = ProjectDetail.objects.filter(owner=user_Auth)
        serializer = ProjectDetailSerializer(project, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
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
        user_token_Auth = UserView.get_token_from_request(request)
        user_id_Auth = jwt_decode_handler(user_token_Auth)['user_id']
        user_Auth = CustomUser.objects.get(id=user_id_Auth)
        # 拿到项目
        project_id = request.data.get('id')
        print(project_id)
        project = ProjectDetail.objects.get(id=project_id)
        print(project)

        if user_Auth.id==project.owner.id:
            request_data = {key: value for key, value in request.data.items() if key != 'owner'}
            serializer = ProjectDetailSerializer(instance=project, data=request_data, partial=True)
            if serializer.is_valid():
                serializer.update(project,request_data)
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
        user_token_Auth = UserView.get_token_from_request(request)
        user_id_Auth = jwt_decode_handler(user_token_Auth)['user_id']
        user_Auth = CustomUser.objects.get(id=user_id_Auth)
        # 得到项目信息
        project_id = request.data.get('id')
        project = ProjectDetail.objects.get(id=project_id)
        # 判断项目owner是否登录
        if user_Auth == project.owner:
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
        project = ProjectDetail.objects.all()
        serializer = ProjectDetailSerializer(project, many=True)
        #project_map = {project.id: serializer.data for project in projects}
        return Response( serializer.data,status=status.HTTP_200_OK)
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
