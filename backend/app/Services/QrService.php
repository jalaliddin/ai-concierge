<?php

namespace App\Services;

use App\Models\GuestHouse;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class QrService
{
    public function generateUrl(GuestHouse $house): string
    {
        $baseUrl = rtrim(config('app.public_url', config('app.url')), '/');
        return "{$baseUrl}/h/{$house->qr_token}";
    }

    public function generatePng(GuestHouse $house, int $size = 300): string
    {
        $url = $this->generateUrl($house);
        return QrCode::format('png')
            ->size($size)
            ->errorCorrection('H')
            ->generate($url);
    }

    public function generateSvg(GuestHouse $house, int $size = 300): string
    {
        $url = $this->generateUrl($house);
        return QrCode::format('svg')
            ->size($size)
            ->errorCorrection('H')
            ->generate($url);
    }
}
