"""
URL configuration for SecondBantu project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from .views import HtmlTemplateByNameView
from django.conf import settings
from django.conf.urls.static import static
from pathlib import Path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name="index.html"), name="home"),
    path('pawn/', TemplateView.as_view(template_name="pawn.html"), name="pawn"),
    path('shop/', TemplateView.as_view(template_name="shop.html"), name="shop"),
    path('sell/', TemplateView.as_view(template_name="sell.html"), name="sell"),
    path('how/', TemplateView.as_view(template_name="how.html"), name="how"),
    path('about/', TemplateView.as_view(template_name="about.html"), name="about"),
    path('contact/', TemplateView.as_view(template_name="contact.html"), name="contact"),
    path('thankyou/', TemplateView.as_view(template_name="thankyou.html"), name="thankyou"),
    # Compatibility for .html paths (e.g., /shop.html -> shop.html template)
    re_path(r'^(?P<name>\w+)\.html$', HtmlTemplateByNameView.as_view(), name='legacy_html'),
]

# Serve /assets/* from the parent directory in DEBUG mode
if settings.DEBUG:
    urlpatterns += static(
        "/assets/",
        document_root=Path(settings.BASE_DIR) / "assets",
    )
