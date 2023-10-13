from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Postcard


class PostcardSerializer(ModelSerializer):

    creator = serializers.ReadOnlyField(source='creator.username')
    creator_id = serializers.ReadOnlyField(source='creator.id')
    image_url = serializers.ImageField(required=False)

    class Meta:
        model = Postcard
        fields = ['id', 'creator', 'creator_id', 'title', 'description', 'image_url']
