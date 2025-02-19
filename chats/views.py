from .models import FlyChat, Room, RoomChat
from .serializers import FlyChatSerializer, RoomSerializer, RoomChatSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from users.models import CustomUser
from rest_framework.pagination import PageNumberPagination
from auths.token_auth import get_token_from_request
from rest_framework_jwt.utils import jwt_decode_handler

class CustomPageNumberPagination(PageNumberPagination):
    page_size = 10  # 每页显示的数量
    page_size_query_param = 'page_size'
    max_page_size = 100000


@api_view(['POST'])
def create_room(request):
    room_name = request.data.get('room_name')  # 从请求数据中获取房间名字
    if not room_name:
        return Response({'message': 'Room name is required'}, status=status.HTTP_400_BAD_REQUEST)

    # 检查房间名是否已存在
    if Room.objects.filter(name=room_name).exists():
        return Response({'message': 'Room name already exists'}, status=status.HTTP_400_BAD_REQUEST)

    room = Room.objects.create(name=room_name)
    serializer = RoomSerializer(room)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def find_room(request):
    try:
        room_name = request.data.get('room_name')  # 从请求数据中获取房间名字
        room = Room.objects.get(name=room_name)
        serializer = RoomSerializer(room)
        return Response(serializer.data)
    except Room.DoesNotExist:
        return Response({'message': 'Room not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def create_flychat(request):
    sender_id = request.data.get('sender')
    receiver_id = request.data.get('receiver')
    content = request.data.get('content')

    if not sender_id or not receiver_id or not content:
        return Response({'message': 'Sender, receiver, and content are required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        sender = CustomUser.objects.get(id=sender_id)
        receiver = CustomUser.objects.get(id=receiver_id)

    except CustomUser.DoesNotExist:
        return Response({'message': 'Sender or receiver not found'}, status=status.HTTP_404_NOT_FOUND)

    flychat = FlyChat.objects.create(sender=sender, receiver=receiver, content=content)
    serializer = FlyChatSerializer(flychat)
    return Response({'message': 'Create flychat successfully'}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def find_flychat(request):
    sender_id = request.data.get('sender')
    receiver_id = request.data.get('receiver')

    if not sender_id or not receiver_id:
        return Response({'message': 'Sender, receiver are required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        sender = CustomUser.objects.get(id=sender_id)
        receiver = CustomUser.objects.get(id=receiver_id)
    except CustomUser.DoesNotExist:
        return Response({'message': 'Sender or receiver not found'}, status=status.HTTP_404_NOT_FOUND)

    try:
        flychat = FlyChat.objects.filter(sender=sender, receiver=receiver).order_by('timestamp')
        # 使用分页器分页
        paginator = CustomPageNumberPagination()
        flychat = paginator.paginate_queryset(flychat, request)
        serializer = FlyChatSerializer(flychat, many=True)
        return paginator.get_paginated_response(serializer.data)
        # serializer = FlyChatSerializer(flychat, status=status.HTTP_200_OK)
        # return Response(serializer.data)
    except FlyChat.DoesNotExist:
        return Response({'message': 'FlyChat not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def join_room(request):
    # 找到房间
    room_name = request.data.get('room_name')
    room = Room.objects.get(name=room_name)

    # 得到已经登录了的用户
    user_token_auth = get_token_from_request(request)
    user_id_auth = jwt_decode_handler(user_token_auth)['user_id']
    user_auth = CustomUser.objects.get(id=user_id_auth)

    # 加入房间
    room.join(user_auth)
    return Response({'message': 'User join successfully'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def leave_room(request):
    # 找到房间
    room_name = request.data.get('room_name')
    room = Room.objects.get(name=room_name)

    # 得到已经登录了的用户
    user_token_auth = get_token_from_request(request)
    user_id_auth = jwt_decode_handler(user_token_auth)['user_id']
    user_auth = CustomUser.objects.get(id=user_id_auth)

    # 加入房间
    room.leave(user_auth)
    return Response({'message': 'User leave successfully'}, status=status.HTTP_200_OK)