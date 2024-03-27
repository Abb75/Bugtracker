from django.core.mail import send_mail


def create_mail_new_user(uuid_code):
    invitation_link = f'https://abb75.github.io/bugtracker_frontend/#/Register-invitation/{uuid_code}'
    subject = 'Invitation à rejoindre notre application'
    message =  f'Invitation à rejoindre notre application Utilisez ce lien pour accepter l\'invitation : {invitation_link}' 
    return message, subject        


def create_mail_user_exist(project_name):
    login = f'https://abb75.github.io/bugtracker_frontend/#/login/'
    subject = 'Invitation à rejoindre un projet'
    message =f'Invitation à rejoindre un projet Connecter vous pour voir l\'invitation: {login} voici le nom du projet {project_name}'
    return message, subject


def send_invitation_email(email, message, subject): 
       
    send_mail(
            subject=subject,
            message=message,
            fail_silently=False, 
            from_email= 'abrosso@free.fr',
            recipient_list= [email],
        )
    