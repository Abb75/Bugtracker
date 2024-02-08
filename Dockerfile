# Utilisez une image Python avec Django pré-installé
FROM python:3.10-alpine

# Définit le répertoire de travail dans le conteneur
WORKDIR /app/bug_tracker

RUN pip install --upgrade pip
# Copiez le fichier requirements.txt pour installer les dépendances
COPY ./requirements.txt /app/

#RUN apk update && apk upgrade && \
    #apk add --no-cache build-base


RUN pip install -r requirements.txt

COPY ./ ./

ENTRYPOINT [ "gunicorn", "core.wsgi" ]
#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]