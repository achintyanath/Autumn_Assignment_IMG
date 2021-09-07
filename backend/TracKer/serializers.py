from rest_framework import serializers
from .models import Maintainer,Project,List,Card,Comment



class MaintainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maintainer
        fields = ['id','name', 'year', 'admin', 'disable']



class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id','comment_desc', 'comment_time', 'comment_mapped_to', 'commented_by']

class CardSerializerGet(serializers.ModelSerializer):
    comments_in_card=serializers.StringRelatedField(many=True)
    #card_mapped_to = serializers.StringRelatedField()
    class Meta:
        model = Card
        fields = ['id','card_title', 'card_desc', 'is_card_assigned', 'card_mapped_to', 'card_assigned_to','comments_in_card']
        depth=1

class CardSerializerElse(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['id','card_title', 'card_desc', 'is_card_assigned', 'card_mapped_to', 'card_assigned_to']


class ListSerializer(serializers.ModelSerializer):
    card_in_list=serializers.StringRelatedField(many=True)
    #card_in_list=CardSerializer(many=True)
    class Meta:
        model = List
        fields = ['id','list_name', 'list_mapped_to','card_in_list']
class ProjectSerializerElse(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = ['id','project_name', 'project_desc', 'project_maintained_by']


class ProjectSerializerGet(serializers.ModelSerializer):
    lists_in_project = serializers.StringRelatedField(many=True)
    class Meta:
        model = Project
        fields = ['id','project_name', 'project_desc', 'project_maintained_by','lists_in_project']
        depth = 1
