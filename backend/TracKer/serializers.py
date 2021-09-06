from rest_framework import serializers
from .models import Maintainer,Project,List,Card,Comment



class MaintainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maintainer
        fields = ['name', 'year', 'admin', 'disable']

class ProjectSerializer(serializers.ModelSerializer):

    #lists_in_project = serializers.StringRelatedField(many=True)
    #'lists_in_project'
    class Meta:
        model = Project
        fields = ['project_name', 'project_desc', 'project_maintained_by']
        depth = 1


class ListSerializer(serializers.ModelSerializer):
    card_in_list=serializers.StringRelatedField(many=True)
    list_mapped_to = serializers.StringRelatedField()
    class Meta:
        model = List
        fields = ['list_name', 'list_mapped_to','card_in_list']

class CardSerializer(serializers.ModelSerializer):
    comments_in_card=serializers.StringRelatedField(many=True)
    card_mapped_to = serializers.StringRelatedField()
    class Meta:
        model = Card
        fields = ['card_title', 'card_desc', 'is_card_assigned', 'card_mapped_to', 'card_assigned_to','comments_in_card']
        depth=1

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['comment_desc', 'comment_time', 'comment_mapped_to', 'commented_by']