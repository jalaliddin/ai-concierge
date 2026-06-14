<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class RegistrationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $query = Registration::with(['guest:id,name,email', 'guestHouse:id,name']);

        if (!$user->isSuperAdmin() && $user->guest_house_id) {
            $query->where('guest_house_id', $user->guest_house_id);
        }

        return response()->json($query->orderByDesc('created_at')->paginate(20));
    }

    public function upload(Request $request, Registration $registration): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf,jpg,jpeg,png|max:10240',
        ]);

        if ($registration->file_path) {
            Storage::disk('public')->delete($registration->file_path);
        }

        $file = $request->file('file');
        $path = $file->store('registrations', 'public');

        $registration->update([
            'file_path' => $path,
            'file_name' => $file->getClientOriginalName(),
            'status' => 'uploaded',
        ]);

        return response()->json($registration);
    }

    public function send(Registration $registration): JsonResponse
    {
        if ($registration->status !== 'uploaded' || !$registration->file_path) {
            return response()->json(['error' => 'Fayl yuklanmagan.'], 400);
        }

        $guest = $registration->guest;
        $filePath = Storage::disk('public')->path($registration->file_path);

        Mail::send([], [], function ($message) use ($guest, $registration, $filePath) {
            $message->to($guest->email, $guest->name)
                ->subject('Registratsiya kartochkasi — ' . $registration->guestHouse->name)
                ->setBody(
                    "Hurmatli {$guest->name},\n\n"
                    . "Registratsiya kartochkangiz tayyor. Iltimos, qo'shimchani oching.\n\n"
                    . "Savollar uchun: " . config('mail.from.address'),
                    'text/plain'
                )
                ->attach($filePath, ['as' => $registration->file_name]);
        });

        $registration->update([
            'status' => 'sent',
            'sent_at' => now(),
        ]);

        return response()->json(['message' => 'Kartochka yuborildi.']);
    }
}
