from rest_framework import serializers
from authentication.models import User
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
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


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        style={"input_type": "password"},
        trim_whitespace=False
    )

    class Meta:
        model = User
        fields = ["email", "password"]

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if email and password:
            user = authenticate(request=self.context.get("request"), email=email, password=password)
            if not user:
                msg = _("Invalid credentials!")
                raise serializers.ValidationError(msg, code="authorization")
        else:
            msg = _("Must include 'email' and 'password'!")
            raise serializers.ValidationError(msg, code="authorization")
            
        attrs["user"] = user
        return attrs
    

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "username", "is_active", "is_staff", "is_superuser", "is_admin", "created_at", "updated_at"]
        read_only_fields = ["email", "is_active", "is_staff", "is_superuser", "is_admin", "created_at", "updated_at"]

    def update(self, instance, validated_data):
        instance.username = validated_data.get("username", instance.username)
        instance.save()
        return instance
