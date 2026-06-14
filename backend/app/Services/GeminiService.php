<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected Client $client;
    protected string $apiKey;
    protected string $model;
    protected string $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';

    public function __construct()
    {
        $this->client = new Client(['timeout' => 60]);
        $this->apiKey = config('services.gemini.key');
        $this->model = config('services.gemini.model', 'gemini-2.0-flash');
    }

    /**
     * Send a generateContent request to Gemini API.
     *
     * @param array $contents Chat history in Gemini format
     * @param string|null $systemInstruction System prompt
     * @param array $tools Function declarations for tool calling
     * @return array Raw Gemini API response
     */
    public function generateContent(array $contents, ?string $systemInstruction = null, array $tools = []): array
    {
        $url = "{$this->baseUrl}/{$this->model}:generateContent?key={$this->apiKey}";

        $body = ['contents' => $contents];

        if ($systemInstruction) {
            $body['systemInstruction'] = [
                'parts' => [['text' => $systemInstruction]],
            ];
        }

        if (!empty($tools)) {
            $body['tools'] = [['functionDeclarations' => $tools]];
        }

        try {
            $response = $this->client->post($url, [
                'json' => $body,
                'headers' => ['Content-Type' => 'application/json'],
            ]);

            return json_decode($response->getBody()->getContents(), true);
        } catch (GuzzleException $e) {
            Log::error('Gemini API error', ['message' => $e->getMessage()]);
            throw $e;
        }
    }

    public function extractTextFromResponse(array $response): ?string
    {
        return $response['candidates'][0]['content']['parts'][0]['text'] ?? null;
    }

    public function extractFunctionCallFromResponse(array $response): ?array
    {
        $parts = $response['candidates'][0]['content']['parts'] ?? [];
        foreach ($parts as $part) {
            if (isset($part['functionCall'])) {
                return $part['functionCall'];
            }
        }
        return null;
    }

    public function getFinishReason(array $response): ?string
    {
        return $response['candidates'][0]['finishReason'] ?? null;
    }

    public function getContent(array $response): ?array
    {
        return $response['candidates'][0]['content'] ?? null;
    }
}
