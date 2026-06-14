<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Log;

class TelegramService
{
    protected Client $client;
    protected string $token;
    protected string $defaultChatId;

    public function __construct()
    {
        $this->client = new Client(['timeout' => 10]);
        $this->token = config('services.telegram.bot_token', '');
        $this->defaultChatId = config('services.telegram.chat_id', '');
    }

    public function sendMessage(string $text, ?string $chatId = null, string $parseMode = 'HTML'): bool
    {
        $chatId = $chatId ?: $this->defaultChatId;

        if (empty($this->token) || empty($chatId)) {
            Log::warning('Telegram not configured: missing token or chat_id');
            return false;
        }

        try {
            $this->client->post("https://api.telegram.org/bot{$this->token}/sendMessage", [
                'json' => [
                    'chat_id' => $chatId,
                    'text' => $text,
                    'parse_mode' => $parseMode,
                ],
            ]);
            return true;
        } catch (GuzzleException $e) {
            Log::error('Telegram send error', ['message' => $e->getMessage()]);
            return false;
        }
    }

    public function notifyNewBooking(array $data, ?string $chatId = null): bool
    {
        $text = "🚕 <b>Yangi Transfer Bronı</b>\n"
            . "👤 Mehmon: {$data['guest_name']}\n"
            . "📌 Transfer: {$data['transfer_name']}\n"
            . "🕒 Vaqt: {$data['pickup_time']}\n"
            . "📍 Manzil: {$data['pickup_location']}\n"
            . "👥 Yo'lovchilar: {$data['passengers']}\n"
            . "🏠 Mehmonxona: {$data['guest_house']}\n"
            . "🔗 Admin: " . config('app.public_url') . "/admin/bookings";

        return $this->sendMessage($text, $chatId);
    }

    public function notifyNewRequest(array $data, ?string $chatId = null): bool
    {
        $priorities = ['low' => '🟢', 'medium' => '🟡', 'high' => '🔴'];
        $icon = $priorities[$data['priority']] ?? '⚪';

        $text = "📋 <b>Yangi Mehmon So'rovi</b>\n"
            . "👤 Mehmon: {$data['guest_name']}\n"
            . "📌 Tur: {$data['type']}\n"
            . "📝 Mavzu: {$data['subject']}\n"
            . "{$icon} Muhimlik: {$data['priority']}\n"
            . "🏠 Mehmonxona: {$data['guest_house']}\n"
            . "🕒 Vaqt: " . now()->format('d.m.Y H:i') . "\n"
            . "🔗 Admin: " . config('app.public_url') . "/admin/requests";

        return $this->sendMessage($text, $chatId);
    }

    public function notifyNewRegistration(array $data, ?string $chatId = null): bool
    {
        $text = "📄 <b>Registratsiya So'rovi</b>\n"
            . "👤 Mehmon: {$data['guest_name']}\n"
            . "📧 Email: {$data['guest_email']}\n"
            . "🏠 Mehmonxona: {$data['guest_house']}\n"
            . "🕒 Vaqt: " . now()->format('d.m.Y H:i') . "\n"
            . "🔗 Admin: " . config('app.public_url') . "/admin/registrations";

        return $this->sendMessage($text, $chatId);
    }

    public function notifyNewOrder(array $data, ?string $chatId = null): bool
    {
        $text = "🛒 <b>Yangi Buyurtma (Landing)</b>\n"
            . "📦 #{$data['order_number']}\n"
            . "👤 Mijoz: {$data['customer_name']}\n"
            . "📧 Email: {$data['customer_email']}\n"
            . "📞 Tel: {$data['customer_phone']}\n"
            . "💰 Jami: {$data['total']} {$data['currency']}\n"
            . "🕒 Vaqt: " . now()->format('d.m.Y H:i') . "\n"
            . "🔗 Admin: " . config('app.public_url') . "/admin/orders";

        return $this->sendMessage($text, $chatId);
    }
}
