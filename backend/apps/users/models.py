from django.db import models
from django.contrib.auth.models import AbstractUser  
 
class User(AbstractUser):           # Siginifie que notre User herite du systeme utilisateur de Django, on recupere donc des champs comme username, password, first and last name,...

    class Role(models.TextChoices):   # Ici on ajoute nos propres elements   (textchoices pour ne pas laisser n'importe quel valeur)
        CUSTOMER = "CUSTOMER", "Customer"   # client
        STAFF = "STAFF", "Staff"    # manager,chef...
        ADMIN = "ADMIN", "Admin"   # admin
 
    email = models.EmailField(unique=True)      # Un email ne peut pas appartenir a deux utilisateurs

    role = models.CharField(
        max_length=20,
        choices= Role.choices,
        default= Role.CUSTOMER
    )
    USERNAME_FIELD = 'email'        #Pour identifier l'utilisateur lors de l'authentification, utilise email
    REQUIRED_FIELDS = ["username"]  #celui ci concerne 

    def __str__(self):
        return self.email

# Create your models here.
