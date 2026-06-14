# Khiva Tour Guide — Full-Stack System

AI-powered concierge + e-commerce landing site for Khiva guest houses.

## Architecture

```
Internet
   │
VPS Nginx (port 80/443, SSL)
   │  proxy_pass → localhost:8094
   │
Docker nginx (port 8094)
   ├── /api/*        → Laravel backend (php artisan serve :8000)
   ├── /storage/*    → Laravel uploaded files
   ├── /admin*       → Vue 3 SPA (admin panel)
   ├── /h/*          → Vue 3 SPA (guest QR app)
   └── /*            → Nuxt 3 SSR (landing site)

Internal Docker network (khiva):
   mysql:3306   backend:8000   landing:3000
```

## Stack

| Layer | Tech |
|---|---|
| Backend API | Laravel 11 + Sanctum + Gemini AI |
| Database | MySQL 8.0 |
| Guest/Admin SPA | Vue 3 + Vuetify 3 + Pinia |
| Landing SSR | Nuxt 3 + vuetify-nuxt-module + i18n |
| Reverse proxy | Nginx (Docker) |

## Default credentials (after first deploy)

| Role | Email | Password |
|---|---|---|
| Super Admin | admin@khivatourguide.com | admin123 |
| Manager 1 | manager1@khivatourguide.com | manager123 |
| Manager 2 | manager2@khivatourguide.com | manager123 |
| Manager 3 | manager3@khivatourguide.com | manager123 |

**Change these immediately after first login.**

---

## Quick Start (VPS)

### 1. Clone the repo

```bash
git clone <your-repo-url> /var/www/khivatourguide
cd /var/www/khivatourguide/app
```

### 2. Configure environment

```bash
cp .env.docker .env
nano .env   # fill in all values (see comments inside)
```

### 3. Generate APP_KEY

```bash
# Run a temporary container to generate the key
docker run --rm php:8.2-fpm-alpine php -r "echo 'base64:'.base64_encode(random_bytes(32));"
```

Copy the output and paste it as `APP_KEY=` in your `.env` file.

### 4. Build and start

```bash
docker compose --env-file .env up -d --build
```

First startup takes ~3–5 minutes (builds all images + runs migrations + seeds DB).

### 5. Verify

```bash
# Check all containers are running
docker compose ps

# Follow logs
docker compose logs -f

# Test API
curl http://localhost:8094/api/landing/catalog | jq '.transfers | length'
```

---

## VPS Nginx Reverse Proxy (port 8094)

On your VPS, configure the system nginx (or Caddy) to forward to Docker:

### Nginx (with SSL via Certbot)

```nginx
# /etc/nginx/sites-available/khivatourguide.com
server {
    listen 80;
    server_name khivatourguide.com www.khivatourguide.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name khivatourguide.com www.khivatourguide.com;

    ssl_certificate     /etc/letsencrypt/live/khivatourguide.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/khivatourguide.com/privkey.pem;

    client_max_body_size 50M;

    location / {
        proxy_pass         http://127.0.0.1:8094;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade           $http_upgrade;
        proxy_set_header   Connection        "upgrade";
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }
}
```

```bash
# Enable site and get SSL cert
ln -s /etc/nginx/sites-available/khivatourguide.com /etc/nginx/sites-enabled/
certbot --nginx -d khivatourguide.com -d www.khivatourguide.com
nginx -t && systemctl reload nginx
```

### Caddy (automatic HTTPS, simpler)

```
# /etc/caddy/Caddyfile
khivatourguide.com {
    reverse_proxy localhost:8094
}
```

---

## Daily Operations

### View logs

```bash
# All services
docker compose logs -f

# Single service
docker compose logs -f backend
docker compose logs -f landing
docker compose logs -f nginx
```

### Restart a service

```bash
docker compose restart backend
```

### Update and redeploy

```bash
git pull
docker compose --env-file .env up -d --build
```

Only changed images rebuild (Docker layer cache).

### Run artisan commands

```bash
docker compose exec backend php artisan migrate:status
docker compose exec backend php artisan tinker
docker compose exec backend php artisan db:seed --force   # re-seed (careful!)
```

### Database backup

```bash
docker compose exec mysql mysqldump -uroot -p${DB_PASSWORD} khiva_tour > backup_$(date +%Y%m%d).sql
```

### Restore backup

```bash
cat backup_20240101.sql | docker compose exec -T mysql mysql -uroot -p${DB_PASSWORD} khiva_tour
```

### Force re-seed (reset all data)

```bash
# ⚠️  This deletes all data!
docker compose exec backend rm -f storage/.seeded
docker compose exec backend php artisan migrate:fresh --seed --force
docker compose exec backend touch storage/.seeded
```

---

## Project Structure

```
app/
├── backend/                 # Laravel 11 API
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   ├── Admin/       # Admin CRUD endpoints
│   │   │   ├── Landing/     # Public e-commerce endpoints
│   │   │   └── Public/      # Guest QR concierge endpoints
│   │   ├── Models/
│   │   └── Services/
│   │       ├── ConciergeService.php   # Gemini AI agent loop
│   │       ├── GeminiService.php
│   │       ├── TelegramService.php
│   │       └── QrService.php
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/api.php
│   ├── Dockerfile
│   └── docker-entrypoint.sh
│
├── frontend/                # Vue 3 + Vuetify 3 SPA
│   ├── src/
│   │   ├── views/
│   │   │   ├── guest/       # WelcomePage + ChatPage (QR flow)
│   │   │   └── admin/       # Admin panel (13 pages)
│   │   ├── stores/          # Pinia (auth, guest)
│   │   ├── router/
│   │   └── api/axios.js
│   └── vite.config.js
│
├── landing/                 # Nuxt 3 SSR (SEO landing)
│   ├── pages/
│   │   ├── index.vue        # Hero + catalog + tracker
│   │   ├── transfers/       # List + detail (Product schema)
│   │   ├── services/        # List + detail (TouristTrip schema)
│   │   ├── blog/            # List + article (Article schema)
│   │   └── checkout.vue     # Cart + order form
│   ├── layouts/default.vue  # Navbar + cart drawer + footer + WhatsApp/TG
│   ├── composables/useApi.ts
│   ├── stores/cart.ts       # Pinia cart (persisted)
│   ├── i18n/locales/        # uz / ru / en translations
│   └── nuxt.config.ts
│
├── nginx/
│   ├── Dockerfile           # Builds Vue SPA + nginx
│   └── default.conf         # Routing rules
│
├── docker-compose.yml
├── .env.docker              # Environment template
└── README.md
```

---

## API Routes Summary

### Public (Guest QR — no auth)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/public/resolve/{token}` | House info by QR token |
| POST | `/api/public/start/{token}` | Register guest, open conversation |
| POST | `/api/public/chat/{conversation_id}` | Send message to AI |
| GET | `/api/public/messages/{conversation_id}` | Chat history |
| GET | `/api/public/rules/{token}` | House rules |
| GET | `/api/public/transfers/{token}` | Available transfers |
| GET | `/api/public/recommendations/{token}` | Local recommendations |
| POST | `/api/public/request/{token}` | Submit guest request |

### Landing (E-commerce)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/landing/catalog` | All transfers + services |
| GET | `/api/landing/transfers` | Transfer list |
| GET | `/api/landing/transfers/{slug}` | Transfer detail |
| GET | `/api/landing/services` | Service list |
| GET | `/api/landing/services/{slug}` | Service detail |
| GET | `/api/landing/posts` | Blog posts |
| GET | `/api/landing/posts/{slug}` | Blog post detail |
| POST | `/api/landing/order` | Place order |
| GET | `/api/landing/order/{number}` | Track order |
| GET | `/api/sitemap.xml` | XML sitemap |

### Admin (Bearer token required)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/admin/login` | Get Sanctum token |
| GET | `/api/admin/dashboard/stats` | KPIs + charts |
| CRUD | `/api/admin/guest-houses` | Guest house management |
| GET | `/api/admin/guest-houses/{id}/qr` | Download QR PNG |
| CRUD | `/api/admin/transfers` | Transfer management |
| CRUD | `/api/admin/services` | Service management |
| CRUD | `/api/admin/bookings` | Transfer bookings |
| CRUD | `/api/admin/orders` | Landing orders |
| CRUD | `/api/admin/requests` | Guest requests |
| CRUD | `/api/admin/house-rules` | House rules |
| CRUD | `/api/admin/knowledge-base` | FAQ management |
| CRUD | `/api/admin/recommendations` | Local tips |
| CRUD | `/api/admin/posts` | Blog posts |
| GET | `/api/admin/conversations` | AI chat history |
| POST | `/api/admin/registrations/{id}/upload` | Upload reg card |
| POST | `/api/admin/registrations/{id}/send` | Email reg card |

---

## Guest QR Flow

```
Guest scans QR code
       │
       ▼
/h/{qr_token}  (Vue SPA)
       │
       ▼
Enter name / email / phone / room / language
       │
       ▼
POST /api/public/start/{token}
       │
       ▼
AI Chat (Gemini gemini-2.0-flash)
  ├── get_available_transfers
  ├── book_transfer
  ├── get_house_rules
  ├── create_request (laundry, food, etc.)
  ├── get_recommendations
  ├── search_knowledge_base
  └── request_registration_card
```

---

## Troubleshooting

**Backend not starting:**
```bash
docker compose logs backend
# Common: APP_KEY missing → check .env file
# Common: MySQL not ready → wait 30s and retry
```

**Landing 500 error:**
```bash
docker compose logs landing
# Common: NUXT_API_BASE_INTERNAL not reachable → check backend is healthy
```

**Migrations fail:**
```bash
docker compose exec backend php artisan migrate:status
docker compose exec backend php artisan migrate --force
```

**Reset everything and start fresh:**
```bash
docker compose down -v          # removes volumes (all data lost!)
docker compose up -d --build
```

**Check nginx routing:**
```bash
docker compose exec nginx nginx -t        # test config
docker compose exec nginx cat /etc/nginx/conf.d/default.conf
```

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `APP_KEY` | ✅ | Laravel encryption key (`base64:...`) |
| `DB_PASSWORD` | ✅ | MySQL root password |
| `GEMINI_API_KEY` | ✅ | Google AI Studio API key |
| `TELEGRAM_BOT_TOKEN` | ✅ | Telegram bot token |
| `TELEGRAM_CHAT_ID` | ✅ | Telegram chat/group ID for notifications |
| `APP_URL` | ✅ | Production domain (`https://khivatourguide.com`) |
| `NUXT_PUBLIC_SITE_URL` | ✅ | Same as APP_URL (for SSR/SEO) |
| `NUXT_PUBLIC_WHATSAPP` | ✅ | WhatsApp number with country code |
| `NUXT_PUBLIC_TELEGRAM` | ✅ | Telegram username (`@handle`) |
| `MAIL_*` | ○ | SMTP for registration card emails |
