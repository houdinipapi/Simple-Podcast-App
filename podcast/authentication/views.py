from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from authentication.serializers import RegisterSerializer, LoginSerializer, ProfileSerializer, PasswordChangeSeralizer, ResetPasswordEmailRequestSerializer, ResetPasswordSerializer, LogoutSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from authentication.renderers import UserRenderer
from django.contrib.auth import get_user_model

User = get_user_model()


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


class RegisterView(APIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer
    renderer_classes = (UserRenderer,)

    def post(self, request, format=None):
        user_data = request.data
        serializer = self.serializer_class(data=user_data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        tokens = get_tokens_for_user(user)
        return Response(
            {
                "user": serializer.data,
                "tokens": tokens,
                "message": "User registered successfully!",
            },
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer
    renderer_classes = (UserRenderer,)

    def post(self, request, format=None):
        user_data = request.data
        serializer = self.serializer_class(data=user_data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        tokens = get_tokens_for_user(user)
        return Response(
            {
                "user": {
                    "email": user.email,
                    "username": user.username,
                },
                "tokens": tokens,
                "message": "User logged in successfully!",
            },
            status=status.HTTP_200_OK,
       )
    
    def get_tokens_for_user(self, user):
        refresh = RefreshToken.for_user(user)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        serializer = ProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, format=None):
        user = request.user
        serializer = ProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordChangeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = PasswordChangeSeralizer(data=request.data, context={"request": request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({
                "message": "Password changed successfully!"
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordEmailRequestView(APIView):
    # permission_classes = [AllowAny]
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = ResetPasswordEmailRequestSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(
                {"message": "Password reset email has been sent!"},
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetView(APIView):
    permission_classes = [AllowAny]
    renderer_classes = [UserRenderer]

    def post(self, request, uidb64, token):
        serializer = ResetPasswordSerializer(
            data=request.data,
            context={
                "uidb64": uidb64,
                "token": token
            }
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(
                {"message": "Password reset successful!"},
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        serializer = LogoutSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(
                {"message": "User logged out successfully!"},
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(Self, request, *args, **kwargs):
        user = request.user
        user.delete()

        return Response(
            {
                "message": "User account deleted successfully!"
            },
            status=status.HTTP_204_NO_CONTENT
        )
