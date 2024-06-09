from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from authentication.models import User


class UserModelAdmin(BaseUserAdmin):
    model = User
    list_display = ["id", "email", "username", "is_staff", "is_superuser", "is_admin"]
    list_filter = [
        "is_superuser"
    ]  # Use 'is_superuser' for filtering instead of 'is_admin'
    fieldsets = (
        ("User Credentials", {"fields": ("email", "username", "password")}),
        ("Permissions", {"fields": ("is_staff", "is_superuser", "is_admin")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "username",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_superuser",
                    "is_admin",
                ),  # Use 'password1' and 'password2' for adding user
            },
        ),
    )
    search_fields = ["email", "username"]
    ordering = ["email", "id"]
    filter_horizontal = []

    @property
    def is_admin(self):
        return self.is_superuser


admin.site.register(User, UserModelAdmin)
