from rest_framework import serializers
from .models import Podcast


class PodcastSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source="author.username")

    class Meta:
        model = Podcast
        fields = "__all__"
        read_only_fields = ["slug"]