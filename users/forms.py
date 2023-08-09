from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


# class UserRegistrationForm(UserCreationForm):
#     username = forms.CharField(min_length=3, max_length=50, required=True,
#                                error_messages={'min_length': 'Minimum length of username should be greater than 3!',
#                                                'max_length': 'Maximum length of username cannot be greater than 50!',
#                                                'required': 'Username is required!'}, widget=forms.TextInput(
#             attrs={'placeholder': 'Please enter your username', 'class': 'form-control'}), label='Username:')

#     email = forms.EmailField(required=True, error_messages={'required': 'Email address is required!',
#                                                             'invalid': 'Please enter a valid email address!'},
#                              widget=forms.EmailInput(
#                                  attrs={'placeholder': 'Please enter your email address', 'class': 'form-control'}),
#                              label='Email:')

#     first_name = forms.CharField(max_length=20, required=True, error_messages={
#         'max_length': 'Maximum length of first name cannot be greater than 20!', 'required': 'First name is required!'},
#                                  widget=forms.TextInput(
#                                      attrs={'placeholder': 'Please enter your first name', 'class': 'form-control'}),
#                                  label='First Name:')

#     last_name = forms.CharField(max_length=20, required=True,
#                                 error_messages={'max_length': 'Maximum length of last name cannot be greater than 20!',
#                                                 'required': 'Last name is required!'}, widget=forms.TextInput(
#             attrs={'placeholder': 'Please enter your last name', 'class': 'form-control'}), label='Last Name:')

#     gender_choices = (
#         (0, '------'),
#         (1, 'Male'),
#         (2, 'Female'),
#         (3, 'Guess?'),
#     )

#     gender = forms.ChoiceField(label='Gender:', widget=forms.Select(), choices=gender_choices,
#                                initial=gender_choices[0])

#     address = forms.CharField(max_length=100, required=False,
#                               error_messages={'max_length': 'Maximum length of address cannot be greater than 100!'},
#                               widget=forms.TextInput(
#                                   attrs={'placeholder': 'Please enter your address', 'class': 'form-control'}),
#                               label='Address:')

#     city = forms.CharField(max_length=100, required=False,
#                            error_messages={'max_length': 'Maximum length of address cannot be greater than 100!'},
#                            widget=forms.TextInput(attrs={'class': 'form-control'}), label='City:')

#     state = forms.CharField(max_length=100, required=False,
#                             error_messages={'max_length': 'Maximum length of address cannot be greater than 100!'},
#                             widget=forms.TextInput(attrs={'class': 'form-control'}), label='State:')

#     czip = forms.CharField(max_length=100, required=False,
#                            error_messages={'max_length': 'Maximum length of address cannot be greater than 100!'},
#                            widget=forms.TextInput(attrs={'class': 'form-control'}), label='Zip:')

#     password1 = forms.CharField(min_length=8, max_length=50, required=True,
#                                 error_messages={'min_length': 'Minimum length of password should be greater than 8!',
#                                                 'max_length': 'Maximum length of password cannot be greater than 50!',
#                                                 'required': 'Password 1 is required!'}, widget=forms.PasswordInput(
#             attrs={'placeholder': 'Please enter your password', 'class': 'form-control'}), label='Password 1:')

#     password2 = forms.CharField(min_length=8, max_length=50, required=True,
#                                 error_messages={'min_length': 'Minimum length of password should be greater than 8!',
#                                                 'max_length': 'Maximum length of password cannot be greater than 50!',
#                                                 'required': 'Password 2 is required!'}, widget=forms.PasswordInput(
#             attrs={'placeholder': 'Please confirm your password', 'class': 'form-control'}), label='Password 2:')

#     class Meta:
#         model = User
#         fields = ['username', 'email', 'first_name', 'last_name', 'gender', 'address', 'city', 'state', 'czip',
#                   'password1', 'password2']
#         error_messages = {'password_mismatch': "The two password fields didn't match!"}


# class UserUpdateForm(forms.ModelForm):
#     email = forms.EmailField(required=True, error_messages={'required': 'Email address is required!',
#                                                             'invalid': 'Please enter a valid email address!'},
#                              widget=forms.EmailInput(
#                                  attrs={'placeholder': 'Please enter your email address', 'class': 'form-control'}),
#                              label='Email:')

#     first_name = forms.CharField(max_length=20, required=True, error_messages={
#         'max_length': 'Maximum length of first name cannot be greater than 20!', 'required': 'First name is required!'},
#                                  widget=forms.TextInput(
#                                      attrs={'placeholder': 'Please enter your first name', 'class': 'form-control'}),
#                                  label='First Name:')

#     last_name = forms.CharField(max_length=20, required=True,
#                                 error_messages={'max_length': 'Maximum length of last name cannot be greater than 20!',
#                                                 'required': 'Last name is required!'}, widget=forms.TextInput(
#             attrs={'placeholder': 'Please enter your last name', 'class': 'form-control'}), label='Last Name:')

#     gender_choices = (
#         (0, '------'),
#         (1, 'Male'),
#         (2, 'Female'),
#         (3, 'Guess?'),
#     )

#     gender = forms.ChoiceField(label='Gender:', widget=forms.Select(), choices=gender_choices,
#                                initial=gender_choices[0])

#     address = forms.CharField(max_length=100, required=False,
#                               error_messages={'max_length': 'Maximum length of address cannot be greater than 100!'},
#                               widget=forms.TextInput(
#                                   attrs={'placeholder': 'Please enter your address', 'class': 'form-control'}),
#                               label='Address:')

#     city = forms.CharField(max_length=100, required=False,
#                            error_messages={'max_length': 'Maximum length of address cannot be greater than 100!'},
#                            widget=forms.TextInput(attrs={'class': 'form-control'}), label='City:')

#     state = forms.CharField(max_length=100, required=False,
#                             error_messages={'max_length': 'Maximum length of address cannot be greater than 100!'},
#                             widget=forms.TextInput(attrs={'class': 'form-control'}), label='State:')

#     czip = forms.CharField(max_length=100, required=False,
#                            error_messages={'max_length': 'Maximum length of address cannot be greater than 100!'},
#                            widget=forms.TextInput(attrs={'class': 'form-control'}), label='Zip:')

#     class Meta:
#         model = User
#         fields = ['email', 'first_name', 'last_name', 'gender', 'address', 'city', 'state', 'czip']


# class UserUpdatePasswordForm(forms.ModelForm):
#     password1 = forms.CharField(min_length=8, max_length=50, required=True,
#                                 error_messages={'min_length': 'Minimum length of password should be greater than 8!',
#                                                 'max_length': 'Maximum length of password cannot be greater than 50!',
#                                                 'required': 'New Password 1 is required!'}, widget=forms.PasswordInput(
#             attrs={'placeholder': 'Please enter your new password', 'class': 'form-control'}), label='New Password 1:')

#     password2 = forms.CharField(min_length=8, max_length=50, required=True,
#                                 error_messages={'min_length': 'Minimum length of password should be greater than 8!',
#                                                 'max_length': 'Maximum length of password cannot be greater than 50!',
#                                                 'required': 'New Password 2 is required!'}, widget=forms.PasswordInput(
#             attrs={'placeholder': 'Please confirm your new password', 'class': 'form-control'}),
#                                 label='New Password 2:')

#     class Meta:
#         model = User
#         fields = ['password1', 'password2']
