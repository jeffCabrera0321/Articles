from rest_framework import serializers
from rest_framework.authtoken.views import Token
from .models import Article
from django.contrib.auth.models import User


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'title', 'description']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']

        extra_kwargs = {'password':{
            'write_only': True,
            'required': True,
        }}

    def create(self, validate_data):
        user = User.objects.create_user(**validate_data)
        Token.objects.create(user=user)
        return user