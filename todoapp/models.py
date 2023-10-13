from django.db import models

from users.models import Users


def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)


class Postcard(models.Model):
    """Модель открыток"""
    class Meta:
        verbose_name = 'Открытка'
        verbose_name_plural = 'Открытки'
        
    creator = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="listings")
    title = models.CharField(max_length=80, blank=True, null=True)
    description = models.CharField(max_length=1024, blank=True, null=True)
    image_url = models.ImageField(upload_to=upload_to, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.title}"
