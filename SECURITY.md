# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are
currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 5.1.x   | :white_check_mark: |
| 5.0.x   | :x:                |
| 4.0.x   | :white_check_mark: |
| < 4.0   | :x:                |

## Reporting a Vulnerability

Use this section to tell people how to report a vulnerability.

Tell them where to go, how often they can expect to get an update on a
reported vulnerability, what to expect if the vulnerability is accepted or
declined, etc.
I found database leak security vulnerabilities on your site.
# App port to run on
PORT=3000

# The name of the site where Kutt is hosted
SITE_NAME=Kutt

# The domain that this website is on
DEFAULT_DOMAIN=localhost:3000

# Generated link length
LINK_LENGTH=6

# Postgres database credential details
DB_HOST=postgres
DB_PORT=5432
DB_NAME=postgres
DB_USER=
DB_PASSWORD=
DB_SSL=false

# Redis host and port
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=

# Disable registration
DISALLOW_REGISTRATION=false

# Disable anonymous link creation
DISALLOW_ANONYMOUS_LINKS=false

# The daily limit for each user
USER_LIMIT_PER_DAY=50

# Create a cooldown for non-logged in users in minutes
# Set 0 to disable
NON_USER_COOLDOWN=0

# Max number of visits for each link to have detailed stats
DEFAULT_MAX_STATS_PER_LINK=5000

# Use HTTPS for links with custom domain
CUSTOM_DOMAIN_USE_HTTPS=false

# A passphrase to encrypt JWT. Use a long and secure key.
JWT_SECRET=securekey

# Admin emails so they can access admin actions on settings page
# Comma seperated
ADMIN_EMAILS=

# Invisible reCaptcha secret key
# Create one in https://www.google.com/recaptcha/intro/
RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=

# Google Cloud API to prevent from users from submitting malware URLs.
# Get it from https://developers.google.com/safe-browsing/v4/get-started
GOOGLE_SAFE_BROWSING_KEY=

# Your email host details to use to send verification emails.
# More info on http://nodemailer.com/
# Mail from example "Kutt <support@kutt.it>". Leave empty to use MAIL_USER
MAIL_HOST=
MAIL_PORT=
MAIL_SECURE=true
MAIL_USER=
MAIL_FROM=
MAIL_PASSWORD=

# The email address that will receive submitted reports.
REPORT_EMAIL=

# Support email to show on the app
CONTACT_EMAIL=