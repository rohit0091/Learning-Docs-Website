/**
 * Technical Learning & Daily Work Documentation Data Model
 * Prushal Technology Pvt. Ltd. Contact API + Knowledge Base
 */

const DOCS_DATA = {
    metadata: {
        company: "Prushal Technology Pvt. Ltd.",
        website: "https://www.prushal.com/",
        author: "Rohit",
        startDate: "2026-08-10",
        version: "1.2.0",
        lastUpdated: "2026-08-11"
    },

    // =========================================================================
    // 1. DAILY JOURNAL ENTRIES (Layer 1 & Layer 2)
    // =========================================================================
    journal: [
        {
            date: "2026-08-10",
            dayOfWeek: "Monday",
            title: "Django 6.1 Contact API + SQLite Foundation",
            project: "prushal-contact-api",
            status: "completed",
            summary: "Initialized the Django 6.1 project, created the 'contact' application, configured ContactMessage model, built ModelSerializer, implemented GET and POST API views using DRF, routed endpoints, and verified database persistence using Postman.",
            technologies: ["Python 3.13", "Django 6.1", "Django REST Framework", "SQLite", "Postman"],
            tasks: [
                { title: "Set up Python Virtual Environment (venv)", completed: true },
                { title: "Install Django 6.1 & Django REST Framework", completed: true },
                { title: "Create Django project ('config') and application ('contact')", completed: true },
                { title: "Define ContactMessage model with name, email, contact_no, message", completed: true },
                { title: "Create and apply SQLite database migrations", completed: true },
                { title: "Build ContactMessageSerializer with full field validation", completed: true },
                { title: "Implement function-based API view (@api_view(['GET', 'POST']))", completed: true },
                { title: "Configure project and app level URL routing (/api/messages/)", completed: true },
                { title: "Test GET & POST endpoints via Postman (HTTP 201 & HTTP 400)", completed: true },
                { title: "Verify SQLite data storage in db.sqlite3", completed: true }
            ],
            topicsLearned: [
                "django-architecture",
                "virtual-environments",
                "django-models",
                "drf-serializers",
                "api-views",
                "url-routing",
                "sqlite-database",
                "postman-testing"
            ],
            timeline: [
                { time: "09:30", event: "Project initialization & environment configuration" },
                { time: "11:00", event: "Model schema creation & migration to SQLite" },
                { time: "12:30", event: "DRF Serializer implementation & validation logic" },
                { time: "14:15", event: "API View implementation & URL routing" },
                { time: "16:30", event: "Postman testing suite execution & persistence verification" }
            ],
            problems: [
                {
                    error: "RuntimeError: Model class messages.models.ContactMessage doesn't declare an explicit app_label",
                    cause: "The Django application was registered improperly without matching the installed app configuration.",
                    solution: "Added 'contact' cleanly to INSTALLED_APPS in settings.py."
                },
                {
                    error: "Application labels aren't unique, duplicates: messages",
                    cause: "Attempted to use the reserved/existing app label 'messages' which conflicted with django.contrib.messages.",
                    solution: "Renamed the custom application to 'contact' avoiding namespace collision."
                }
            ],
            whatILearned: [
                "Django strictly enforces separation between the global project configuration ('config') and modular apps ('contact').",
                "ModelSerializer automatically generates serializer fields based on model schema definitions and handles automatic validation.",
                "Function-based views decorated with @api_view provide granular control while seamlessly integrating with DRF Response objects.",
                "SQLite stores all records locally inside db.sqlite3, making it ideal for rapid development and testing."
            ],
            whyItMatters: "Building a reliable, RESTful API layer is the foundational first step. By adhering to REST conventions (GET for retrieval, POST for creation with HTTP 201), the backend provides a predictable contract for web frontends and third-party integrations.",
            nextSteps: "Integrate SMTP email delivery so that both customer acknowledgements and internal admin notifications are dispatched automatically upon form submission."
        },
        {
            date: "2026-08-11",
            dayOfWeek: "Tuesday",
            title: "Professional SMTP Emails, CID Logo & Service Refactor",
            project: "prushal-contact-api",
            status: "completed",
            summary: "Engineered a dedicated email service layer (email_service.py) separate from views.py. Implemented corporate HTML email templates with CID logo embedding, EmailMultiAlternatives plain-text fallbacks, environment-based SMTP credentials, and resilient error handling.",
            technologies: ["SMTP", "Gmail TLS (Port 587)", "EmailMultiAlternatives", "MIMEImage / CID", "HTML Email Design", "Python Logging", "Dotenv"],
            tasks: [
                { title: "Extract email logic into contact/services/email_service.py", completed: true },
                { title: "Configure Django MAILERS setting using .env environment variables", completed: true },
                { title: "Design responsive customer acknowledgement email template", completed: true },
                { title: "Design internal admin notification email template with mailto: action", completed: true },
                { title: "Implement CID (Content-ID) inline embedding for prushal-logo.webp", completed: true },
                { title: "Integrate EmailMultiAlternatives with rich plain-text fallback", completed: true },
                { title: "Implement try/except blocks and logger.exception for error resilience", completed: true },
                { title: "Configure reply_to header on admin notifications", completed: true },
                { title: "Verify database persistence independence during SMTP simulation", completed: true },
                { title: "Build comprehensive technical documentation website portal", completed: true }
            ],
            topicsLearned: [
                "service-layer-pattern",
                "smtp-configuration",
                "email-multi-alternatives",
                "html-email-standards",
                "cid-image-embedding",
                "error-handling-resilience",
                "python-logging-system",
                "security-credential-management"
            ],
            timeline: [
                { time: "09:00", event: "Architecting email service separation from views.py" },
                { time: "10:45", event: "Designing table-based responsive HTML email templates" },
                { time: "12:15", event: "Investigating broken logo from external Bing CDN and implementing local CID embedding" },
                { time: "14:00", event: "Implementing EmailMultiAlternatives & dual MIME structure" },
                { time: "15:30", event: "Integrating Python logging and database persistence isolation" },
                { time: "17:00", event: "Complete documentation website creation & testing" }
            ],
            problems: [
                {
                    error: "NameError: name 'send_mail' is not defined in views.py",
                    cause: "send_mail import was removed when refactoring, but a legacy call still lingered in the view.",
                    solution: "Replaced direct email calls in views.py with the decoupled send_contact_emails(contact_message) service function."
                },
                {
                    error: "Broken logo image icon inside Gmail/Outlook recipient inbox",
                    cause: "External Bing CDN URL failed CORS, referer checks, and email proxy filters.",
                    solution: "Migrated to inline CID (Content-ID) embedding using MIMEImage, attaching the local prushal-logo.webp directly to the email payload."
                },
                {
                    error: "NameError: name 'logger' is not defined",
                    cause: "Logger was used inside a helper before initializing logging.getLogger(__name__).",
                    solution: "Initialized logger = logging.getLogger(__name__) at the module top level."
                }
            ],
            whatILearned: [
                "Email HTML requires strict table-based structures and inline CSS because email clients (Outlook, Gmail) ignore modern CSS grids and external stylesheets.",
                "CID (Content-ID) image embedding packages images directly inside the email payload, bypassing third-party CDN blocking and privacy proxies.",
                "Database persistence must always be decoupled from email delivery: if SMTP fails, the contact request must remain safely stored in SQLite.",
                "Python's logging module is essential for production diagnostics, capturing stack traces with logger.exception() while preventing credentials from leaking to stdout."
            ],
            whyItMatters: "Decoupling the email service and ensuring database persistence independence guarantees zero data loss. Professional email design establishes company credibility while CID embedding ensures flawless visual rendering on all devices.",
            nextSteps: "In future phases, introduce an asynchronous task queue (Celery + Redis) to offload SMTP network latency from the request-response cycle."
        }
    ],

    // =========================================================================
    // 2. KNOWLEDGE BASE ARTICLES (Layer 3)
    // =========================================================================
    topics: {
        "django-architecture": {
            id: "django-architecture",
            title: "Django Architecture & Request Lifecycle",
            category: "Backend Architecture",
            difficulty: "Beginner to Intermediate",
            tags: ["Django", "MVT", "Architecture", "Python"],
            summary: "A deep dive into Django's Model-View-Template (MVT) architecture, the HTTP request-response lifecycle, and the distinction between global configuration and modular applications.",
            sections: [
                {
                    heading: "What is Django?",
                    content: `Django is a high-level, batteries-included Python web framework designed for rapid development, clean design, and high security. It follows the **Model-View-Template (MVT)** architectural pattern, which is a software design variation of Model-View-Controller (MVC). In our contact system, Django provides the HTTP server, ORM, URL dispatcher, and template rendering engines.`
                },
                {
                    heading: "Django Project vs. Django App",
                    content: `A critical concept for beginners is understanding the distinction between a **Project** and an **App**:
                    
- **Django Project (\`config/\`)**: The overarching container and configuration root for the entire web application. It houses global settings (\`settings.py\`), root URL routing (\`urls.py\`), WSGI/ASGI entrypoints, and middleware pipelines.
- **Django App (\`contact/\`)**: A self-contained, modular Python package that encapsulates a specific business domain. It contains its own models, views, serializers, templates, services, and unit tests.

This modularity allows apps to be pluggable, testable, and reusable across multiple Django projects.`
                },
                {
                    heading: "The Complete Request Lifecycle",
                    content: `When a client (such as a frontend web form or Postman) submits a contact request, the request flows through the following pipeline:

\`\`\`
Client / Postman
      ↓ (HTTP POST /api/messages/)
config/urls.py (Root URL Dispatcher)
      ↓ (Includes contact.urls)
contact/views.py (contact_messages View)
      ↓
ContactMessageSerializer (Validation)
      ↓
ContactMessage Model (ORM)
      ↓
SQLite Database (db.sqlite3 Persistence)
      ↓
contact/services/email_service.py (Service Layer)
      ↓
render_to_string() (HTML Template Interpolation)
      ↓
EmailMultiAlternatives (Plain-Text + HTML + CID Logo)
      ↓
SMTP Server (Gmail TLS on Port 587)
      ↓
Recipients (Customer Acknowledgement & Admin Notification)
\`\`\``
                },
                {
                    heading: "Best Practices & Common Pitfalls",
                    content: `1. **Never mutate global settings dynamically**: Always read configuration through \`django.conf.settings\`.
2. **Avoid circular imports**: Keep service functions in dedicated subpackages (\`services/\`) rather than importing views inside models.
3. **App registration**: Always register newly created apps in \`INSTALLED_APPS\` inside \`settings.py\` before running migrations.`
                }
            ],
            codeExample: {
                language: "python",
                title: "Root Routing (config/urls.py)",
                code: `from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/messages/', include('contact.urls')),
]`
            }
        },

        "virtual-environments": {
            id: "virtual-environments",
            title: "Python Virtual Environments & Dependency Isolation",
            category: "Environment Setup",
            difficulty: "Beginner",
            tags: ["Python", "venv", "Pip", "Environment"],
            summary: "Why virtual environments are mandatory in Python development, how they isolate project dependencies, and how to configure them on Windows.",
            sections: [
                {
                    heading: "What is a Virtual Environment?",
                    content: `A Python Virtual Environment (\`venv\`) is an isolated execution directory containing its own Python interpreter binaries, standard library copies, and installed site-packages. Without a virtual environment, packages installed via \`pip\` pollute the global operating system Python installation, leading to version conflicts between different projects.`
                },
                {
                    heading: "Setting Up venv in Windows",
                    content: `In our project root (\`F:\\django_api\`), the virtual environment is managed under the \`venv\` folder:

\`\`\`powershell
# 1. Create a fresh virtual environment
python -m venv venv

# 2. Activate the virtual environment in PowerShell
.\\venv\\Scripts\\Activate.ps1

# 3. Install project dependencies
pip install django djangorestframework python-dotenv
\`\`\``
                },
                {
                    heading: "Best Practices",
                    content: `- Always add \`venv/\` to \`.gitignore\` so that environment binaries are never committed to version control.
- Generate a reproducible \`requirements.txt\` using \`pip freeze > requirements.txt\`.`
                }
            ]
        },

        "django-models": {
            id: "django-models",
            title: "Django ORM & ContactMessage Model Schema",
            category: "Data Layer",
            difficulty: "Beginner",
            tags: ["ORM", "Models", "SQLite", "Database"],
            summary: "How Django's Object-Relational Mapper (ORM) translates Python classes into SQL database tables, and the design of the ContactMessage schema.",
            sections: [
                {
                    heading: "What is the Django ORM?",
                    content: `The Django Object-Relational Mapper (ORM) allows developers to interact with relational databases using Python code instead of raw SQL queries. A **Model** is a Python class that inherits from \`django.db.models.Model\`. Each attribute of the class represents a database column.`
                },
                {
                    heading: "The ContactMessage Model Schema",
                    content: `The \`ContactMessage\` model is defined in \`contact/models.py\` and captures all fields submitted by the website contact form:

- **name**: \`CharField(max_length=100)\` — The visitor's full name.
- **email**: \`EmailField()\` — The visitor's email address (with built-in email syntax validation).
- **contact_no**: \`CharField(max_length=15)\` — Contact phone number.
- **message**: \`TextField()\` — The body text of the enquiry.
- **created_at**: \`DateTimeField(auto_now_add=True)\` — Automatically records the UTC timestamp when the record is created.`
                }
            ],
            codeExample: {
                language: "python",
                title: "ContactMessage Model (contact/models.py)",
                code: `from django.db import models

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    contact_no = models.CharField(max_length=15)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.email})"
`
            }
        },

        "drf-serializers": {
            id: "drf-serializers",
            title: "Django REST Framework Serializers & Validation",
            category: "API Layer",
            difficulty: "Intermediate",
            tags: ["DRF", "Serialization", "Validation", "JSON"],
            summary: "Understanding serialization, deserialization, data validation, and how ModelSerializer converts JSON payloads into model instances.",
            sections: [
                {
                    heading: "What is a Serializer?",
                    content: `In Django REST Framework (DRF), **Serializers** serve a dual purpose:
1. **Serialization**: Converting complex Python/Django Model instances into native Python datatypes that can easily be rendered into JSON responses.
2. **Deserialization & Validation**: Parsing incoming JSON request payloads, validating data types and constraints against model rules, and converting validated data into Django model instances.`
                },
                {
                    heading: "Validation Workflow",
                    content: `When a POST request reaches the view:
1. \`serializer = ContactMessageSerializer(data=request.data)\` initializes the serializer.
2. \`serializer.is_valid()\` checks field constraints (e.g., valid email formatting, character lengths, non-empty fields).
3. If valid, \`serializer.save()\` commits the record to SQLite and returns the created model instance.
4. If invalid, \`serializer.errors\` produces a structured error dictionary with field-specific messages, allowing the view to return \`HTTP 400 Bad Request\`.`
                }
            ],
            codeExample: {
                language: "python",
                title: "ContactMessageSerializer (contact/serializers.py)",
                code: `from rest_framework import serializers
from .models import ContactMessage

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'
`
            }
        },

        "api-views": {
            id: "api-views",
            title: "API Views & Lightweight Controller Design",
            category: "API Layer",
            difficulty: "Intermediate",
            tags: ["DRF", "Views", "REST", "HTTP"],
            summary: "Designing clean, single-responsibility API views that delegate business and email logic to dedicated service layers.",
            sections: [
                {
                    heading: "View Responsibility & Separation of Concerns",
                    content: `A core software engineering principle is **Separation of Concerns**. The API view in \`contact/views.py\` acts as an HTTP controller:
- It handles the incoming HTTP request method (\`GET\` vs \`POST\`).
- It delegates payload validation to the serializer.
- It saves the model instance to SQLite.
- It triggers the external email service.
- It formats and returns the HTTP status response (\`201 Created\` or \`400 Bad Request\`).

**What the view should NOT contain:**
- Raw HTML email templates or inline styling.
- SMTP connection parameters or email sending logic.
- Complex error-handling logic for mail servers.`
                }
            ],
            codeExample: {
                language: "python",
                title: "Clean API View (contact/views.py)",
                code: `from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import ContactMessage
from .serializers import ContactMessageSerializer
from .services.email_service import send_contact_emails

@api_view(['GET', 'POST'])
def contact_messages(request):
    if request.method == 'GET':
        messages = ContactMessage.objects.all().order_by('-created_at')
        serializer = ContactMessageSerializer(messages, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            contact_message = serializer.save()
            send_contact_emails(contact_message)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
`
            }
        },

        "service-layer-pattern": {
            id: "service-layer-pattern",
            title: "The Service Layer Pattern & Email Architecture",
            category: "Architecture",
            difficulty: "Intermediate to Advanced",
            tags: ["Design Patterns", "Service Layer", "Clean Code"],
            summary: "Why encapsulating business and integration logic in a dedicated service layer produces maintainable, testable, and scalable software.",
            sections: [
                {
                    heading: "Why Introduce a Service Layer?",
                    content: `In standard Django tutorials, developers often place \`send_mail()\` calls directly inside views or model save hooks. While functional for tiny scripts, this creates severe architectural issues:
1. **Bloated Views ("Fat Views")**: Views become hundreds of lines long with template rendering, MIME headers, and email attachments.
2. **Tight Coupling**: Testing views requires mocking entire SMTP networks.
3. **Difficult Refactoring**: Migrating from synchronous SMTP to Celery background workers becomes a massive rewrite if email code is scattered across views.`
                },
                {
                    heading: "Our Implementation: contact/services/email_service.py",
                    content: `By encapsulating all email construction, context preparation, template rendering, logo attachment, and error handling inside \`send_contact_emails()\`, our view remains only 5 lines of execution logic.`
                }
            ]
        },

        "smtp-configuration": {
            id: "smtp-configuration",
            title: "SMTP Protocol, Gmail App Passwords & Security",
            category: "Email & Infrastructure",
            difficulty: "Intermediate",
            tags: ["SMTP", "Gmail", "Security", "TLS", "Port 587"],
            summary: "How the Simple Mail Transfer Protocol (SMTP) works over TLS on Port 587, how to securely generate Gmail App Passwords, and managing credentials via .env.",
            sections: [
                {
                    heading: "What is SMTP?",
                    content: `The **Simple Mail Transfer Protocol (SMTP)** is the internet standard communication protocol for electronic mail transmission. In our architecture, Django acts as an SMTP client connecting to Google's mail transfer agent at \`smtp.gmail.com\` over port \`587\` with **STARTTLS** encryption.`
                },
                {
                    heading: "Gmail App Passwords",
                    content: `Modern email providers (Google, Microsoft) disallow authenticating with a primary account password due to Multi-Factor Authentication (2FA) security requirements. Instead, a dedicated **16-character App Password** is generated specifically for the Django application. This password grants scoped SMTP relay access without exposing the primary Google account credentials.`
                },
                {
                    heading: "Credential Management via .env",
                    content: `Under no circumstances should plain-text passwords be committed to Git. The project uses \`python-dotenv\` to load variables from a local \`.env\` file in the project root:

\`\`\`ini
EMAIL_HOST_USER=master.rohit90@gmail.com
EMAIL_HOST_PASSWORD=your_16_char_app_password
\`\`\`

In \`settings.py\`:
\`\`\`python
from dotenv import load_dotenv
import os

load_dotenv(BASE_DIR / '.env')

MAILERS = {
    'default': {
        'BACKEND': 'django.core.mail.backends.smtp.EmailBackend',
        'OPTIONS': {
            'host': 'smtp.gmail.com',
            'port': 587,
            'username': os.getenv('EMAIL_HOST_USER'),
            'password': os.getenv('EMAIL_HOST_PASSWORD'),
            'use_tls': True,
            'timeout': 10,
        },
    },
}
DEFAULT_FROM_EMAIL = os.getenv('EMAIL_HOST_USER')
\`\`\``
                }
            ]
        },

        "email-multi-alternatives": {
            id: "email-multi-alternatives",
            title: "EmailMultiAlternatives & Plain-Text Fallbacks",
            category: "Email & Infrastructure",
            difficulty: "Intermediate",
            tags: ["EmailMultiAlternatives", "MIME", "Accessibility", "Spam Filters"],
            summary: "Why transactional emails must include both plain-text and HTML MIME parts, and how EmailMultiAlternatives implements this in Django.",
            sections: [
                {
                    heading: "What is EmailMultiAlternatives?",
                    content: `Django's \`EmailMultiAlternatives\` class extends \`EmailMessage\` to create **MIME multipart/alternative** email payloads. A multipart/alternative email contains two distinct versions of the exact same message:
1. A **Plain-Text version** (\`text/plain\`)
2. A **Rich HTML version** (\`text/html\`)`
                },
                {
                    heading: "Why is Plain-Text Fallback Mandatory?",
                    content: `- **Accessibility & Screen Readers**: Visually impaired users using terminal clients or screen readers rely on clear plain-text formatting.
- **Spam Deliverability**: Spam filters (SpamAssassin, Google Postmaster) penalize emails that contain only HTML without a corresponding plain-text alternative.
- **Low-Bandwidth & Security Clients**: Secure enterprise environments and smartwatches often strip HTML scripts and display the plain-text body.`
                }
            ],
            codeExample: {
                language: "python",
                title: "Using EmailMultiAlternatives",
                code: `from django.core.mail import EmailMultiAlternatives

email = EmailMultiAlternatives(
    subject="Thank you for contacting Prushal Technology",
    body=plain_text_content,            # text/plain primary body
    from_email=settings.DEFAULT_FROM_EMAIL,
    to=[contact_message.email]
)
email.attach_alternative(html_content, "text/html")  # text/html alternative
email.send()`
            }
        },

        "html-email-standards": {
            id: "html-email-standards",
            title: "HTML Email Standards & Email Client Compatibility",
            category: "Frontend & Design",
            difficulty: "Intermediate",
            tags: ["HTML", "Email", "CSS", "Tables", "Outlook", "Gmail"],
            summary: "Why web HTML differs drastically from email HTML, why table layouts are necessary, and design rules for Gmail, Outlook, and Apple Mail.",
            sections: [
                {
                    heading: "Why is Email HTML Different From Web HTML?",
                    content: `Unlike modern web browsers (Chrome, Firefox, Safari) which support CSS Flexbox, CSS Grid, and modern JavaScript, email clients use disparate and outdated rendering engines:
- **Outlook for Windows**: Uses Microsoft Word's HTML/CSS rendering engine (no Flexbox, no CSS Grid, no \`calc()\`).
- **Gmail**: Strips \`<style>\` tags in some mobile clients and ignores external stylesheets.
- **Apple Mail**: Uses WebKit (modern support), but emails must remain compatible with the lowest common denominator.`
                },
                {
                    heading: "Core Email Design Rules",
                    content: `1. **Table-Based Layouts**: Use \`<table>\`, \`<tr>\`, and \`<td>\` for all layout containers and spacing.
2. **Inline CSS**: Apply styles directly to HTML elements via \`style="..."\` attributes.
3. **Fixed/Max Container Width**: Restrict the main container to \`600px\` width.
4. **Safe System Fonts**: Use \`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif\`.
5. **No JavaScript**: Script tags are blocked as high-security risks by 100% of mail clients.`
                }
            ]
        },

        "cid-image-embedding": {
            id: "cid-image-embedding",
            title: "Logo Strategy & CID (Content-ID) Image Embedding",
            category: "Email & Infrastructure",
            difficulty: "Advanced",
            tags: ["CID", "MIMEImage", "Branding", "Attachments"],
            summary: "Analyzing the 3 approaches to loading email images (Local path vs Public CDN vs CID inline embedding) and resolving the Bing CDN failure.",
            sections: [
                {
                    heading: "The 3 Image Loading Approaches",
                    content: `When embedding branding logos into emails, developers typically consider three methods:

| Method | Syntax | Pros | Cons | Verdict |
| :--- | :--- | :--- | :--- | :--- |
| **1. Local Windows Path** | \`<img src="C:\\Users\\...\\logo.webp">\` | Works only on local machine | Broken for all external recipients | **INVALID** |
| **2. Public HTTPS URL** | \`<img src="https://example.com/logo.png">\` | Lightweight email size | Blocked by default in Outlook/Gmail; fails if CDN is unreachable | **Acceptable in Prod** |
| **3. CID Inline Embedding** | \`<img src="cid:prushal-logo">\` | Displays offline, zero broken links, no CDN dependency | Increases email byte payload slightly | **RECOMMENDED & IMPLEMENTED** |`
                },
                {
                    heading: "The Real-World Bing CDN Failure",
                    content: `During initial development, an external Bing-hosted image URL was tested:
\`https://th.bing.com/th/id/OIP.ikyDmQJ4wmfkwCL254Z8HQHaHa?...\`

When delivered to Gmail and Outlook, the email displayed a broken image icon. Investigation revealed that third-party image CDNs frequently block hotlinking via referer checks, or trigger email client anti-tracking privacy blockers.

**The Fix:**
We imported the official \`prushal-logo.webp\` into \`contact/static/contact/images/\` and embedded it as a direct MIME part using \`MIMEImage\` with header \`Content-ID: <prushal-logo>\`.`
                }
            ],
            codeExample: {
                language: "python",
                title: "CID Embedding in Python (email_service.py)",
                code: `from email.mime.image import MIMEImage

with open('contact/static/contact/images/prushal-logo.webp', 'rb') as f:
    mime_img = MIMEImage(f.read(), _subtype='webp')
    mime_img.add_header('Content-ID', '<prushal-logo>')
    mime_img.add_header('Content-Disposition', 'inline', filename='prushal-logo.webp')
    email.attach(mime_img)
`
            }
        },

        "error-handling-resilience": {
            id: "error-handling-resilience",
            title: "Error Handling & Database Persistence Independence",
            category: "Backend Architecture",
            difficulty: "Intermediate",
            tags: ["Error Handling", "Persistence", "Fault Tolerance", "Logging"],
            summary: "Guaranteeing that external network or SMTP failures never roll back or destroy customer contact records stored in SQLite.",
            sections: [
                {
                    heading: "The Persistence Independence Rule",
                    content: `A catastrophic flaw in naive API implementations is coupling database transactions to external network services:

\`\`\`python
# ANTI-PATTERN (BAD PRACTICE):
serializer.save()
send_mail(...)  # If SMTP fails here, an unhandled exception triggers a 500 error or database rollback!
\`\`\`

If an external mail server is temporarily down, experiencing network timeouts, or rate-limiting requests, the visitor's submitted contact information **must still be safely saved in SQLite**. The company cannot afford to lose business leads due to an email delivery hiccup.`
                },
                {
                    heading: "Resilient Error Isolation",
                    content: `In our architecture:
1. \`contact_message = serializer.save()\` commits the record to SQLite first.
2. \`send_contact_emails(contact_message)\` wraps customer and admin email dispatches in independent \`try...except\` blocks.
3. If SMTP raises an \`SMTPException\` or connection timeout, the error is caught, logged with full stack traces, and suppressed from bubbling up to the HTTP response.
4. The client receives \`HTTP 201 Created\` confirming their submission was recorded.`
                }
            ]
        },

        "python-logging-system": {
            id: "python-logging-system",
            title: "Python Logging System vs. print() Statements",
            category: "DevOps & Monitoring",
            difficulty: "Beginner to Intermediate",
            tags: ["Logging", "Diagnostics", "Security", "Python"],
            summary: "Why print() must never be used in production backend systems, and how Python's logging module provides secure operational visibility.",
            sections: [
                {
                    heading: "Why Logging Over print()?",
                    content: `Many beginner developers rely on \`print()\` for debugging. In production web applications, this is considered an anti-pattern for several reasons:

1. **Log Levels**: The \`logging\` module provides severity levels (\`DEBUG\`, \`INFO\`, \`WARNING\`, \`ERROR\`, \`CRITICAL\`), allowing developers to filter noise in production.
2. **Stack Trace Capture**: \`logger.exception("Error message")\` automatically appends full traceback details to log files.
3. **Log Destinations**: Logs can be routed simultaneously to consoles, rotating files, or centralized logging aggregators (Datadog, AWS CloudWatch, Sentry).
4. **Security**: \`print()\` statements easily leak sensitive variables (passwords, auth tokens) to standard out, where they can be captured by unsecured container logs.`
                }
            ],
            codeExample: {
                language: "python",
                title: "Configuring Logging (contact/services/email_service.py)",
                code: `import logging

logger = logging.getLogger(__name__)

try:
    user_email.send(fail_silently=False)
    logger.info("Successfully sent acknowledgement email to %s", contact_message.email)
except Exception:
    logger.exception("Failed to send acknowledgement email to %s", contact_message.email)
`
            }
        },

        "security-credential-management": {
            id: "security-credential-management",
            title: "Security, Credential Protection & Production Hardening",
            category: "Security",
            difficulty: "Intermediate to Advanced",
            tags: ["Security", "Secrets", "XSS", "CSRF", "Hardening"],
            summary: "Best practices for protecting credentials, sanitizing user-provided email content, preventing XSS injection, and securing production Django deployments.",
            sections: [
                {
                    heading: "Zero Hard-Coded Secrets",
                    content: `- **SMTP Passwords & Gmail App Keys**: Always stored in \`.env\` and loaded through environment variables.
- **Django SECRET_KEY**: Must be kept secret and replaced in production.
- **Git Version Control**: Ensure \`.gitignore\` explicitly ignores \`.env\`, \`db.sqlite3\`, and \`*.pyc\` files.`
                },
                {
                    heading: "HTML Email Sanitization & XSS Prevention",
                    content: `When rendering user-submitted text (\`{{ message }}\`) inside HTML templates, Django's template engine automatically escapes dangerous HTML tags (\`<script>\`, \`<iframe>\`, \`<img onerror=...>\`) by default, preventing Cross-Site Scripting (XSS) attacks in recipient email clients.`
                },
                {
                    heading: "Production Checklist",
                    content: `- \`DEBUG = False\` in production settings.
- Restrict \`ALLOWED_HOSTS = ['api.prushal.com', 'www.prushal.com']\`.
- Enforce HTTPS via \`SECURE_SSL_REDIRECT = True\` and \`SESSION_COOKIE_SECURE = True\`.
- Implement API Rate Limiting (throttling) in DRF to prevent spam abuse.`
                }
            ]
        },

        "future-celery-scaling": {
            id: "future-celery-scaling",
            title: "Future Scaling: Asynchronous Email Queues with Celery & Redis",
            category: "Architecture & Scaling",
            difficulty: "Advanced",
            tags: ["Celery", "Redis", "Queues", "Asynchronous", "Future Architecture"],
            summary: "Why synchronous SMTP introduces latency, and the architectural design for future background email workers using Celery and Redis.",
            sections: [
                {
                    heading: "The Latency Problem with Synchronous SMTP",
                    content: `In the current implementation, email sending is **synchronous**:
1. Visitor clicks "Submit".
2. Django connects to Gmail SMTP over TLS (takes ~1.5 - 3.0 seconds).
3. Two emails are transmitted over the network.
4. Django returns \`HTTP 201 Created\` to the visitor.

While simple and reliable for initial launch, under high traffic this network round-trip delays the user response.`
                },
                {
                    heading: "Planned Asynchronous Architecture",
                    content: `In the planned future architecture:

\`\`\`
Client / Postman
      ↓ (HTTP POST)
Django DRF View
      ↓
Save ContactMessage to SQLite / PostgreSQL
      ↓
Dispatch Celery Background Task (contact_id)
      ↓ (Returns HTTP 201 immediately in 50ms!)
Redis Message Broker
      ↓
Celery Asynchronous Worker
      ↓
Execute email_service.py (SMTP Relay)
      ↓
Recipient Mailboxes
\`\`\`

**Why Not Introduce Celery Now?**
Introducing Celery prematurely requires running a Redis server daemon, configuring worker processes, handling serialization, and managing broker monitoring. The immediate priority is establishing a robust, tested synchronous pipeline first.`
                }
            ]
        }
    },

    // =========================================================================
    // 3. PROJECTS CATALOG
    // =========================================================================
    projects: [
        {
            id: "prushal-contact-api",
            name: "Prushal Technology Contact API + SMTP System",
            company: "Prushal Technology Pvt. Ltd.",
            status: "Implemented & Tested",
            description: "A production-grade Django 6.1 and Django REST Framework contact-form API that validates incoming customer enquiries, stores records in SQLite, and dispatches branded, responsive HTML transactional emails with CID logo embedding and plain-text fallbacks.",
            technologies: ["Python 3.13", "Django 6.1", "Django REST Framework", "SQLite", "SMTP / TLS", "EmailMultiAlternatives", "MIMEImage", "Postman"],
            liveEndpoint: "http://127.0.0.1:8000/api/messages/",
            website: "https://www.prushal.com/",
            implementedFeatures: [
                "GET /api/messages/ (Retrieve contact submission history)",
                "POST /api/messages/ (Validate & save enquiry)",
                "ContactMessage model with SQLite persistence",
                "DRF ModelSerializer with automatic validation",
                "Decoupled email_service.py architecture",
                "Branded Customer Acknowledgement HTML email",
                "Internal Admin Notification HTML email with mailto: CTA",
                "reply_to header support on admin emails",
                "CID (Content-ID) inline embedding of prushal-logo.webp",
                "EmailMultiAlternatives dual MIME structure (HTML + Plain-Text)",
                "Environment-based SMTP credential management (.env)",
                "Independent database persistence (DB saved even if SMTP fails)",
                "Structured Python logging via logger.exception()"
            ],
            futureRoadmap: [
                "Celery & Redis asynchronous background email queue",
                "Automatic email retry queue for failed SMTP deliveries",
                "Dedicated CONTACT_ADMIN_EMAIL environment variable",
                "API rate-limiting & anti-spam CAPTCHA verification",
                "Production database migration (PostgreSQL / MySQL)",
                "Email open & delivery tracking telemetry"
            ]
        }
    ],

    // =========================================================================
    // 4. DEVELOPMENT ERRORS & POST-MORTEMS
    // =========================================================================
    errors: [
        {
            id: "error-1",
            title: "RuntimeError: Model Class Missing Explicit app_label",
            errorString: "RuntimeError: Model class messages.models.ContactMessage doesn't declare an explicit app_label and isn't in an application in INSTALLED_APPS.",
            category: "Django App Registration",
            cause: "The Django application containing the ContactMessage model was either not listed in settings.py's INSTALLED_APPS, or was registered with an mismatched module path.",
            solution: "Explicitly added 'contact' to INSTALLED_APPS in config/settings.py and verified that contact/apps.py defined ContactConfig with name = 'contact'.",
            prevention: "Always register every new Django app in settings.py immediately after running python manage.py startapp <app_name>."
        },
        {
            id: "error-2",
            title: "ImproperlyConfigured: Duplicate Application Labels",
            errorString: "django.core.exceptions.ImproperlyConfigured: Application labels aren't unique, duplicates: messages",
            category: "Namespace Collision",
            cause: "Attempting to name the custom contact app 'messages' conflicted with Django's built-in framework app 'django.contrib.messages'.",
            solution: "Renamed the application folder and app label from 'messages' to 'contact', eliminating the namespace collision.",
            prevention: "Avoid naming custom applications after built-in Django apps (e.g., auth, messages, sessions, admin, contenttypes)."
        },
        {
            id: "error-3",
            title: "ModuleNotFoundError: No module named 'messages'",
            errorString: "ModuleNotFoundError: No module named 'messages'",
            category: "Import Resolution",
            cause: "After renaming the app to 'contact', lingering import statements in views.py or urls.py still referenced 'from messages.models import ContactMessage'.",
            solution: "Updated all import statements to use relative imports (from .models import ContactMessage) or absolute 'contact' paths.",
            prevention: "Use relative imports inside Django app modules to make apps portable and resilient to directory renaming."
        },
        {
            id: "error-4",
            title: "NameError: name 'send_mail' is not defined",
            errorString: "NameError: name 'send_mail' is not defined",
            category: "Refactoring Artifact",
            cause: "During service layer refactoring, the send_mail import was removed from views.py, but an orphaned call to send_mail() remained in the POST handler.",
            solution: "Removed the direct send_mail() call from views.py and replaced it with the unified send_contact_emails(contact_message) service function.",
            prevention: "Always run python manage.py check or automated test suites immediately after refactoring views."
        },
        {
            id: "error-5",
            title: "NameError: name 'ADMIN_EMAIL' is not defined",
            errorString: "NameError: name 'ADMIN_EMAIL' is not defined",
            category: "Settings Configuration",
            cause: "The email service referenced settings.ADMIN_EMAIL, which had not been defined in config/settings.py.",
            solution: "Updated the service to safely fallback to getattr(settings, 'ADMIN_EMAIL', settings.DEFAULT_FROM_EMAIL).",
            prevention: "Use getattr(settings, 'SETTING_NAME', default_value) when accessing optional configuration variables."
        },
        {
            id: "error-6",
            title: "NameError: name 'logger' is not defined",
            errorString: "NameError: name 'logger' is not defined",
            category: "Logging Initialization",
            cause: "logger.exception() was invoked inside an error handler before initializing the logger object.",
            solution: "Added logger = logging.getLogger(__name__) at the top of contact/services/email_service.py.",
            prevention: "Declare module-level loggers immediately below the import block in every Python module."
        },
        {
            id: "error-7",
            title: "Broken Logo Image Icon in Gmail & Outlook Inboxes",
            errorString: "Email client renders broken image placeholder instead of company branding logo.",
            category: "Email Client Rendering",
            cause: "Using a third-party hosted Bing CDN URL (https://th.bing.com/...) failed due to hotlinking restrictions, referer header mismatch, and Gmail image proxy caching.",
            solution: "Placed the official prushal-logo.webp in contact/static/contact/images/ and attached it as an inline MIMEImage using Content-ID (<prushal-logo>), referenced in HTML as <img src='cid:prushal-logo'>.",
            prevention: "Never rely on unverified third-party image CDNs for transactional emails; always use CID embedding or dedicated company-owned HTTPS assets."
        }
    ],

    // =========================================================================
    // 5. TESTING CHECKLIST & VERIFICATION MATRIX
    // =========================================================================
    testingChecklist: [
        { id: 1, label: "Django System Check", command: "python manage.py check", expected: "System check identified no issues (0 silenced)", status: "PASSED" },
        { id: 2, label: "API POST Payload Validation", endpoint: "POST /api/messages/", payload: "Valid JSON", expected: "HTTP 201 Created + serialized data", status: "PASSED" },
        { id: 3, label: "API Validation Rejection", endpoint: "POST /api/messages/", payload: "Missing 'email'", expected: "HTTP 400 Bad Request + error details", status: "PASSED" },
        { id: 4, label: "SQLite Persistence Verification", query: "SELECT * FROM contact_contactmessage;", expected: "Row committed in db.sqlite3", status: "PASSED" },
        { id: 5, label: "Customer Acknowledgement Email", trigger: "On Form Submit", expected: "Delivered to submitter with 3-step timeline & enquiry card", status: "PASSED" },
        { id: 6, label: "Admin Notification Email", trigger: "On Form Submit", expected: "Delivered to admin with contact details & mailto: CTA", status: "PASSED" },
        { id: 7, label: "CID Logo Rendering", client: "Gmail & Outlook", expected: "Prushal logo displays inline without broken image icon", status: "PASSED" },
        { id: 8, label: "Plain-Text Fallback", client: "Terminal / Text client", expected: "Clean, structured ASCII text fallback displays correctly", status: "PASSED" },
        { id: 9, label: "SMTP Failure Isolation", condition: "Invalid SMTP credentials", expected: "DB record saved in SQLite; HTTP 201 returned; failure logged", status: "PASSED" }
    ]
};
