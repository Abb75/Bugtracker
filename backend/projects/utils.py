from django.shortcuts import get_object_or_404


def get_project_or_404(project, pk):
    return get_object_or_404(project, pk)