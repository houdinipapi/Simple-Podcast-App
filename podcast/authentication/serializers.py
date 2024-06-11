from rest_framework import serializers
from authentication.models import User
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import get_user_model
from authentication.utils import Util
from rest_framework_simplejwt.tokens import RefreshToken


User = get_user_model()


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


class PasswordChangeSeralizer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)
    confirm_password = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        old_password = attrs.get("old_password")
        new_password = attrs.get("new_password")
        confirm_password = attrs.get("confirm_password")

        if new_password != confirm_password:
            raise serializers.ValidationError({"confirm_password": "New passwords must match!"})
        
        # Validate the new password
        validate_password(new_password)

        return attrs
    
    def validate_old_password(self, value):
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is incorrect!")
        return value
    
    def save(self, **kwargs):
        user = self.context["request"].user
        user.set_password(self.validated_data["new_password"])
        user.save()
        return user


class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        fields = ["email"]

    def validate(self, attrs):
        email = attrs.get("email")

        if User.objects.filter(email=email).exists:
            user = User.objects.get(email = email)
            uidb64 = urlsafe_base64_encode(force_bytes(user.id))
            print("Encoded UID", uidb64)
            token = PasswordResetTokenGenerator().make_token(user)
            print("Password Reset Token", token)
            link = (
                "http://localhost:8000/api/user/reset-password/"
                + uidb64
                + "/"
                + token
                + "/"
            )
            print("Password Reset Link", link)

            # Send Email
            body = "Click the following link to reset your password "+link
            data = {
                "email_body": body,
                "to_email": user.email,
                "email_subject": "Reset your password"
            }
            Util.send_email(data)
            return attrs
        else:
            raise serializers.ValidationError({"email": "This email does not exist!"})

    def save(self, **kwargs):
        return self.validated_data


class ResetPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        style={"input_type": "password"}, max_length=68, min_length=6, write_only=True
    )
    confirm_password = serializers.CharField(
        style={"input_type": "password"}, max_length=68, min_length=6, write_only=True
    )

    class Meta:
        fields = ["password", "confirm_password"]

    def validate(self, attrs):
        try:
            uid = self.context["uidb64"]
            token = self.context["token"]
            uid = urlsafe_base64_decode(uid).decode()
            user = User.objects.get(pk=uid)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise serializers.ValidationError(
                    {"token": "Token is not valid or expired"}
                )
            if attrs["password"] != attrs["confirm_password"]:
                raise serializers.ValidationError({"password": "Passwords must match"})
            return attrs
        except (
            TypeError,
            ValueError,
            OverflowError,
            User.DoesNotExist,
            DjangoUnicodeDecodeError,
        ):
            raise serializers.ValidationError(
                {"token": "Token is not valid or expired"}
            )

    def save(self, **kwargs):
        password = self.validated_data["password"]
        uid = self.context["uidb64"]
        uid = urlsafe_base64_decode(uid).decode()
        user = User.objects.get(pk=uid)
        user.set_password(password)
        user.save()
        return user
    

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        self.token = attrs["refresh"]
        return attrs
    
    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            token.blacklist()
        except Exception as e:
            self.fail("bad_token")
