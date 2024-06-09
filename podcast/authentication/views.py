from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from authentication.serializers import RegisterSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from authentication.renderers import UserRenderer
from django.contrib.auth import authenticate


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


class RegisterView(APIView):
    serializer_class = RegisterSerializer
    renderer_classes = (UserRenderer,)

    def post(self, request, format=None):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        # user = User.objects.get(email=user_data["email"])
        tokens = get_tokens_for_user(user)
        return Response(
            {
                "user": user_data,
                "tokens": tokens,
                "message": "User registered successfully!"
            },
            user_data,
            status=status.HTTP_201_CREATED
        )