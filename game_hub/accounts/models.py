from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class User(AbstractUser):
    # Remove the email field override
    pass

    def __str__(self):
        return self.username
