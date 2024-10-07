from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST, require_GET
from .models import User

@csrf_exempt
@require_POST
def register(request):
    username = request.POST.get('username')
    password = request.POST.get('password')

    if User.objects.filter(username=username).exists():
        return JsonResponse({'error': 'Username already exists'}, status=400)

    user = User.objects.create(
        username=username,
        password=make_password(password),
    )
    login(request, user)
    return JsonResponse({'success': 'User registered successfully'})

@csrf_exempt
@require_POST
def user_login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse({'success': 'Login successful'})
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=400)

@csrf_exempt
@require_POST
def user_logout(request):
    logout(request)
    return JsonResponse({'success': 'Logout successful'})

@require_GET
def check_auth(request):
    return JsonResponse({'is_authenticated': request.user.is_authenticated})
