from django.urls import path, include
from authentication.views import RegisterView, LoginView, ProfileView, PasswordChangeView, ResetPasswordEmailRequestView


urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("change-password/", PasswordChangeView.as_view(), name="change_password"),
    path("password-reset/", ResetPasswordEmailRequestView.as_view(), name="password_reset"),
]
