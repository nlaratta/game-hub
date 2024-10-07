from django.test import TestCase
import pytest
from django.urls import reverse
from .models import User

# Create your tests here.

@pytest.mark.django_db
def test_user_registration(client):
    url = reverse('register')
    data = {
        'username': 'testuser',
        'password': 'testpassword123',
    }
    response = client.post(url, data)
    assert response.status_code == 200
    assert User.objects.filter(username='testuser').exists()

@pytest.mark.django_db
def test_duplicate_username(client):
    User.objects.create_user(username='existinguser', password='password123')
    url = reverse('register')
    data = {
        'username': 'existinguser',
        'password': 'newpassword123',
    }
    response = client.post(url, data)
    assert response.status_code == 400
    assert b'Username already exists' in response.content

# Remove the test_duplicate_email function
