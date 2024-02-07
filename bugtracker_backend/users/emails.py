from django.core.mail import send_mail
from django.template.loader import render_to_string


def send_confirmation_email(user):

        confirmation_url =  f"https://abb75.github.io/bugtracker_frontend/#/success-register/{user.id}"
        email_content = render_to_string('register_confirmation_email.html', {'confirmation_url': confirmation_url})

        send_mail(
            'Confirmation d\'inscription',
            email_content,
            'abrosso@free.fr',
            [user.email],
            fail_silently=False,
        )