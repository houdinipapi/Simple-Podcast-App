from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from authentication.models import User

# Register your models here.
class UserModelAdmin(BaseUserAdmin):
    model = User
    list_display = ["id", "email", "username", "is_staff", "is_superuser"]
    # list_filter = ["is_admin"]
    fieldsets = (
        ("User Credentials", {"fields": ("email", "username", "password")}),
        ("Permissions", {"fields": ("is_staff", "is_superuser")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "username", "password1", "password2", "is_staff", "is_superuser")
        }),
    )
    search_fields = ["email", "username"]
    ordering = ["email", "id"]

admin.site.register(User, UserModelAdmin)