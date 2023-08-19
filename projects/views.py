from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .serializers import ProjectDetailSerializer
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from .models import ProjectDetail


def viewList(request, *args, **kwargs):
    projects = ProjectDetail.objects.filter(owner=request.user.id)
    serializer = ProjectDetailSerializer(projects, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def createProject(request):
    # data = {
    #     'owner': request.user.id,
    #     'description': request.data.get('description'),
    # }
    serializer = ProjectDetailSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProjectApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]


class ProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = ProjectDetail.objects.all().order_by('-post_date')  # 使用自定义用户模型
    serializer_class = ProjectDetailSerializer
