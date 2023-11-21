from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from elasticsearch_dsl import Text
from chats.models import FlyChat


@registry.register_document
class FlyChatIndex(Document):
    sender = fields.ObjectField(properties={
        'id': fields.IntegerField(),
        'username': fields.TextField(),
        # 添加其他 sender 相关的字段
    })

    receiver = fields.ObjectField(properties={
        'id': fields.IntegerField(),
        'username': fields.TextField(),
        # 添加其他 receiver 相关的字段
    })

    content = fields.TextField()
    timestamp = fields.DateField()

    class Index:
        name = 'flychat_index'
        settings = {
            'number_of_shards': 2,
            'number_of_replicas': 3,
        }

    class Django:
        model = FlyChat
