from django.conf.urls import include, url
from django.contrib import admin


urlpatterns = [
    # Examples:
    # url(r'^$', 'django_react.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    # url(r'^', include(urls())),
    url(r'^$', 'Delorean.views.home', name='home'),
    url(r'^participants/$', 'Delorean.views.mock_participants',
        name='participants')
]
