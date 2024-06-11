from django.urls import path, include
from authentication.views import PasswordResetView, RegisterView, LoginView, ProfileView, PasswordChangeView, ResetPasswordEmailRequestView, LogoutView, DeleteAccountView


urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("change-password/", PasswordChangeView.as_view(), name="change_password"),
    path("password-reset/", ResetPasswordEmailRequestView.as_view(), name="password_reset"),
    path("password-reset-confirm/<uidb64>/<token>/", PasswordResetView.as_view(), name="password_reset_confirm"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("delete-account/", DeleteAccountView.as_view(), name="delete_account"),
]
