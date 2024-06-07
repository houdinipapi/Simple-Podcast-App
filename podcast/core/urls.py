from django.urls import path
from .views import PodcastListCreateView

urlpatterns = [
    path("core/", PodcastListCreateView.as_view, name="podcast-list-create"),
]
