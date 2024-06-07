from rest_framework import generics
from .models import Podcast
from .serializers import PodcastSerializer


class PodcastListCreateView(generics.ListCreateAPIView):
    queryset = Podcast.objects.all()
    serializer_class = PodcastSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)