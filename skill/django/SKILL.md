---
name: django
description: "Django framework patterns. Use when the user says 'django', 'ORM', 'models', 'views', 'migrations', 'admin', 'Django REST framework', 'serializers', or manages a Django project."
---

# Django Framework

## Project structure

```
project/
  manage.py
  project/
    settings.py
    urls.py
    wsgi.py
    asgi.py
  app1/
    models.py
    views.py
    urls.py
    serializers.py   # DRF
    admin.py
    tests.py
    migrations/
  app2/
    ...
```

## ORM

### QuerySet basics
```python
User.objects.filter(is_active=True).order_by("-created_at")[:10]
```

### Performance
- `select_related()`: JOIN for ForeignKey/OneToOne (1 query)
- `prefetch_related()`: separate query for ManyToMany/reverse FK (2 queries)
- `F expressions`: atomic updates without race conditions
- `Q objects`: complex filters (`Q(status='active') | Q(priority__gte=5)`)

### N+1 detection
- `django-debug-toolbar`: see all queries per request
- `select_related`/`prefetch_related` are the fix

## Views

### Function-based views (FBV)
```python
def user_detail(request, pk):
    user = get_object_or_404(User, pk=pk)
    return render(request, "user_detail.html", {"user": user})
```

### Class-based views (CBV)
```python
class UserDetailView(DetailView):
    model = User
    template_name = "user_detail.html"
```

### Decision tree
- Simple view -> FBV
- CRUD -> CBV (ListView, DetailView, CreateView, UpdateView, DeleteView)
- API -> DRF ViewSet

## Migrations

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py showmigrations  # check status
python manage.py squashmigrations app1 0001 0010  # compress old ones
```

- Data migrations: `RunPython` with forwards/backwards functions
- Rollback: `python manage.py migrate app1 0005` (go back to migration 0005)

## Django REST Framework

```python
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "email"]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
```

- Routers: `DefaultRouter()` auto-generates URL patterns
- Permissions: `IsAuthenticated`, `DjangoModelPermissions`, custom
- Pagination: `PageNumberPagination`, `LimitOffsetPagination`
- Filtering: `django-filter` package

## Testing

```python
from django.test import TestCase, Client


class UserTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(email="test@test.com", password="pw")

    def test_user_list(self):
        self.client.login(email="test@test.com", password="pw")
        response = self.client.get("/api/users/")
        self.assertEqual(response.status_code, 200)
```

- `TestCase`: wraps in transaction, rolls back after test (fast)
- `TransactionTestCase`: real commits, for testing DB constraints
- `factory_boy`: factories for test data generation

## Pitfalls

- Not using `select_related`/`prefetch_related` (N+1 queries)
- Synchronous views for I/O-bound work (use `async def` in Django 4.1+)
- Not running migrations in CI
- Hardcoded settings (use environment variables)
