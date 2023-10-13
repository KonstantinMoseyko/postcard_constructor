from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Postcard
from .serializers import PostcardSerializer


class PostcardViewSet(ModelViewSet):
    queryset = Postcard.objects.all()
    serializer_class = PostcardSerializer
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
         serializer.save(creator=self.request.user)
