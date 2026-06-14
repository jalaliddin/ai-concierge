#!/bin/sh
set -e

echo "=========================================="
echo "  Khiva Tour Guide - Backend Starting"
echo "=========================================="

# Auto-generate APP_KEY if not provided
KEY_FILE="/var/www/backend/storage/.app_key"
if [ -z "$APP_KEY" ]; then
    if [ -f "$KEY_FILE" ]; then
        export APP_KEY=$(cat "$KEY_FILE")
        echo "✅ APP_KEY loaded from storage"
    else
        export APP_KEY=$(php artisan key:generate --show 2>/dev/null | tr -d '\r\n')
        echo "$APP_KEY" > "$KEY_FILE"
        echo ""
        echo "⚠️  Generated new APP_KEY: $APP_KEY"
        echo "⚠️  Add this to your .env.docker file to persist across redeploys!"
        echo ""
    fi
fi

# Wait for MySQL
echo "⏳ Waiting for MySQL at ${DB_HOST}:${DB_PORT:-3306}..."
RETRIES=30
until nc -z "${DB_HOST}" "${DB_PORT:-3306}" || [ $RETRIES -eq 0 ]; do
    RETRIES=$((RETRIES - 1))
    echo "   Retrying... ($RETRIES left)"
    sleep 3
done

if [ $RETRIES -eq 0 ]; then
    echo "❌ MySQL did not become ready in time!"
    exit 1
fi
echo "✅ MySQL is ready!"

# Clear old config cache and re-cache with current env vars
php artisan config:clear --quiet
php artisan config:cache --quiet
php artisan route:cache --quiet
echo "✅ Config and routes cached"

# Run migrations
echo "⏳ Running migrations..."
php artisan migrate --force --quiet
echo "✅ Migrations done"

# Create storage symlink
php artisan storage:link --quiet 2>/dev/null || true

# Seed on first run (flag persisted in volume)
SEED_FLAG="/var/www/backend/storage/.seeded"
if [ ! -f "$SEED_FLAG" ]; then
    echo "⏳ First run detected - seeding database..."
    php artisan db:seed --force --quiet
    touch "$SEED_FLAG"
    echo "✅ Database seeded"
fi

echo "=========================================="
echo "  🚀 Backend ready on port 8000"
echo "  Admin: admin@khivatourguide.com / admin123"
echo "=========================================="

exec "$@"
