from rest_framework import serializers
from authentication.models import User
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator



class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(
        style={"input_type": "password"},
        max_length=68,
        min_length=6,
        write_only=True
    )

    class Meta:
        model = User
        fields = ["email", "username", "password", "confirm_password"]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def validate(self, attrs):
        password = attrs.get("password", "")
        confirm_password = attrs.get("confirm_password", "")



        if password != confirm_password:
            raise serializers.ValidationError({"Passwords do not match!"})
        return attrs

    def create(self, validated_data):
        validated_data.pop("confirm_password")
        return User.objects.create_user(**validated_data)