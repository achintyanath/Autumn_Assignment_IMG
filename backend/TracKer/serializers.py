from django.db.models.fields import CommaSeparatedIntegerField
from rest_framework import serializers
from .models import Maintainer,Project,List,Card,Comment



class MaintainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maintainer
        fields = ['id','enrollment_number','name', 'year', 'admin', 'disable']

class CommentSerializerElse(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['id','comment_desc', 'comment_time', 'comment_mapped_to', 'commented_by']
        #depth = 1

class CommentSerializerGet(serializers.ModelSerializer):
    commented_by=Maintainer
    class Meta:
        model = Comment
        fields = ['id','comment_desc', 'comment_time', 'comment_mapped_to', 'commented_by']
        depth = 1

class CardSerializerGet(serializers.ModelSerializer):
    comments_in_card=CommentSerializerGet(many=True)
    class Meta:
        model = Card
        fields = ['id','card_title', 'card_desc',  'card_mapped_to', 'card_assigned_to','comments_in_card']
        depth=1

class CardSerializerElse(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['id','card_title', 'card_desc',  'card_mapped_to', 'card_assigned_to']


class ListSerializerElse(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = ['id','list_name', 'list_mapped_to']

class ListSerializerGet(serializers.ModelSerializer):
    card_in_list=CardSerializerGet(many=True)
    
    class Meta:
        model = List
        fields = ['id','list_name', 'list_mapped_to','card_in_list']

class ListSerializerElse(serializers.ModelSerializer):

    class Meta:
        model = List
        fields = ['id','list_name', 'list_mapped_to']


class ProjectSerializerElse(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = ['id','project_name', 'project_desc', 'project_maintained_by']


class ProjectSerializerGet(serializers.ModelSerializer):
    lists_in_project = ListSerializerGet(many=True)
    class Meta:
        model = Project
        fields = ['id','project_name', 'project_desc', 'project_maintained_by','lists_in_project']
        depth =1
