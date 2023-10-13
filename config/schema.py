import graphene
from graphene_django import DjangoObjectType

from todoapp.models import Postcard
from users.models import Users


class UserType(DjangoObjectType):
    class Meta:
        model = Users
        fields = "__all__"


class PostcardType(DjangoObjectType):
    class Meta:
        model = Postcard
        fields = "__all__"


class Query(graphene.ObjectType):

    all_users = graphene.List(UserType)

    def resolve_all_users(root, info):
        return Users.objects.all()

    all_postcards = graphene.List(PostcardType)

    def resolve_all_postcards(root, info):
        return Postcard.objects.all()


schema = graphene.Schema(query=Query)
