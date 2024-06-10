from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from authentication.serializers import RegisterSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
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
