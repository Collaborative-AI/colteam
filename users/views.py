from django.shortcuts import render, redirect, get_object_or_404
from .forms import UserRegistrationForm, UserUpdateForm, UserUpdatePasswordForm
from django.contrib.auth.decorators import login_required
from django.contrib import auth
from django.contrib import messages
from .models import UserProfile
from django.contrib.auth.models import User


def UserRegister(request):
    if request.method == 'GET':
        form = UserRegistrationForm()
        return render(request, 'users/regpage.html', {'form': form})
    elif request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            email = form.cleaned_data.get('email')
            password = form.cleaned_data.get('password2')
            first_name = form.cleaned_data.get('first_name')
            last_name = form.cleaned_data.get('last_name')
            user = User.objects.create_user(username=username, email=email, password=password, first_name=first_name,
                                            last_name=last_name)
            gender = form.cleaned_data.get('gender')
            address = form.cleaned_data.get('address')
            city = form.cleaned_data.get('city')
            state = form.cleaned_data.get('state')
            czip = form.cleaned_data.get('czip')
            user_profile = UserProfile(user=user, gender=gender, address=address, city=city, state=state, czip=czip)
            user_profile.save()
            messages.success(request, f'Your account has been created. Please login now.')
            return redirect('UserLogin')
        else:
            print(form.errors)
            return render(request, 'users/regpage.html', {'form': form})


def login(request):
    if request.method == 'POST':
        print(request.POST)
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = auth.authenticate(username=username, password=password)
        if user is not None and user.is_active:
            auth.login(request, user)
            mes = "Hello! " + user.last_name + " " + user.first_name + ". How are doing today?"
            messages.success(request, mes)
            return redirect('Home')
        else:
            messages.warning(request, f'Username or password is not correct, please try again')
            return render(request, 'users/loginpage.html')
    else:
        return render(request, 'users/loginpage.html')


@login_required
def logout(request):
    auth.logout(request)
    return render(request, 'users/logoutpage.html')


@login_required
def UserChangePassword(request):
    pk = request.user.id
    user = get_object_or_404(User,pk=pk)
    if request.method == 'POST':
        form = UserUpdatePasswordForm(request.POST)
        if form.is_valid():
            if form.cleaned_data['password1'] == form.cleaned_data['password2']:
                new_password = form.cleaned_data['password2']
                user.set_password(new_password)
                user.save()
                messages.success(request, f'You have sucessfully changed your password.')
                return redirect('UserLogin')
            else:
                messages.warning(request, f"The two password fields didn't match! Please try again.")
                return render(request, 'users/passwordchange.html',{'form' : form})
        else:
            return render(request, 'users/passwordchange.html',{'form' : form})
    else:
        form = UserUpdatePasswordForm()
        return render(request, 'users/passwordchange.html',{'form' : form})
