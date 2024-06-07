from django.contrib import admin
from .models import Podcast

# Register your models here.
@admin.register(Podcast)
class PodcastAdmin(admin.ModelAdmin):
    list_display = ["title", "author", "uploaded_at"]
    list_filter = ["author", "uploaded_at"]
    search_fields = ["title", "author__username"]
    readonly_fields = ["slug", "uploaded_at"]
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "title",
                    "description",
                    "author",
                    "file",
                    "thumbnail",
                    "slug",
                    "uploaded_at",
                )
            },
        ),
    )
    ordering = ["-uploaded_at"]
    date_hierarchy = "uploaded_at"
    save_on_top = True
    save_as = True
    save_as_continue = False
    save_as_new = False
    actions_on_top = True
    actions_on_bottom = False
    actions_selection_counter = True
    
