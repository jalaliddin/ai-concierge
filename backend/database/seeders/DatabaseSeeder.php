<?php

namespace Database\Seeders;

use App\Models\GuestHouse;
use App\Models\HouseRule;
use App\Models\KnowledgeBase;
use App\Models\Post;
use App\Models\Recommendation;
use App\Models\Service;
use App\Models\Transfer;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ─── Super Admin ──────────────────────────────────────────────────
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@khivatourguide.com',
            'password' => Hash::make('admin123'),
            'role' => 'super_admin',
        ]);

        // ─── Mehmon uylari (3 ta) ─────────────────────────────────────────
        $housesData = [
            [
                'name' => 'Khiva Guest House Ichan Kala',
                'slug' => 'khiva-guest-house-ichan-kala',
                'address' => "Ichan Kala, Khiva, Xorazm, O'zbekiston",
                'phone' => '+998935001234',
                'description' => "Ichan Kala ichidagi tarixiy mehmon uyi. UNESCO meros zonasida joylashgan.",
                'wifi_name' => 'KGH_IchanKala',
                'wifi_password' => 'khiva2024',
                'check_in_time' => '14:00',
                'check_out_time' => '12:00',
                'latitude' => 41.3775,
                'longitude' => 60.3597,
                'primary_color' => '#0D1B2A',
            ],
            [
                'name' => 'Silk Road Boutique Hotel',
                'slug' => 'silk-road-boutique-hotel',
                'address' => "Pahlavon Mahmud ko'chasi 15, Khiva",
                'phone' => '+998935005678',
                'description' => "Zamonaviy qulayliklar bilan an'anaviy xiva mehmondo'stligi.",
                'wifi_name' => 'SilkRoad_WiFi',
                'wifi_password' => 'silkroad2024',
                'check_in_time' => '13:00',
                'check_out_time' => '11:00',
                'latitude' => 41.3780,
                'longitude' => 60.3600,
                'primary_color' => '#1B4332',
            ],
            [
                'name' => 'Desert Rose Guest House',
                'slug' => 'desert-rose-guest-house',
                'address' => "Tashqal'a, Khiva shahar, O'zbekiston",
                'phone' => '+998935009012',
                'description' => 'Xiva tashqarisidagi tinch va qulay mehmon uyi.',
                'wifi_name' => 'DesertRose_Net',
                'wifi_password' => 'desert2024',
                'check_in_time' => '15:00',
                'check_out_time' => '12:00',
                'latitude' => 41.3790,
                'longitude' => 60.3610,
                'primary_color' => '#7C3AED',
            ],
        ];

        $houses = [];
        foreach ($housesData as $d) {
            $houses[] = GuestHouse::create($d);
        }

        // ─── Manager foydalanuvchilar ─────────────────────────────────────
        $managers = [
            ['name' => 'Ichan Kala Manager', 'email' => 'manager1@khivatourguide.com'],
            ['name' => 'Silk Road Manager', 'email' => 'manager2@khivatourguide.com'],
            ['name' => 'Desert Rose Manager', 'email' => 'manager3@khivatourguide.com'],
        ];

        foreach ($managers as $i => $mgr) {
            User::create([
                'name' => $mgr['name'],
                'email' => $mgr['email'],
                'password' => Hash::make('manager123'),
                'role' => 'manager',
                'guest_house_id' => $houses[$i]->id,
            ]);
        }

        // ─── Transferlar ──────────────────────────────────────────────────
        $transfers = [
            [
                'name' => 'Urgench Airport → Khiva Transfer',
                'from_location' => 'Urgench Airport (UGC)',
                'to_location' => 'Khiva City Centre',
                'vehicle_type' => 'sedan',
                'capacity' => 3,
                'price' => 20.00,
                'duration_minutes' => 35,
                'description' => 'Comfortable private transfer from Urgench International Airport to Khiva. Meet & greet service, flight tracking included.',
                'slug' => 'urgench-airport-khiva-transfer',
                'meta_title' => 'Urgench Airport to Khiva Transfer | Private Car $20',
                'meta_description' => 'Book private transfer from Urgench Airport (UGC) to Khiva. Sedan or minivan, from $20. Meet & greet, flight tracking.',
            ],
            [
                'name' => 'Urgench Airport → Khiva (Minivan)',
                'from_location' => 'Urgench Airport (UGC)',
                'to_location' => 'Khiva',
                'vehicle_type' => 'minivan',
                'capacity' => 7,
                'price' => 35.00,
                'duration_minutes' => 35,
                'description' => 'Minivan transfer from Urgench Airport to Khiva for groups up to 7 passengers.',
                'slug' => 'urgench-airport-khiva-minivan',
                'meta_title' => 'Urgench Airport to Khiva Minivan Transfer | $35',
                'meta_description' => 'Minivan transfer from Urgench Airport to Khiva. Up to 7 passengers, $35. Book now.',
            ],
            [
                'name' => 'Khiva → Nukus Private Transfer',
                'from_location' => 'Khiva',
                'to_location' => 'Nukus',
                'vehicle_type' => 'sedan',
                'capacity' => 3,
                'price' => 45.00,
                'duration_minutes' => 180,
                'description' => 'Private transfer from Khiva to Nukus, capital of Karakalpakstan. Comfortable sedan, air-conditioned.',
                'slug' => 'khiva-nukus-transfer',
                'meta_title' => 'Khiva to Nukus Transfer | Private Car $45',
                'meta_description' => 'Private transfer from Khiva to Nukus (Karakalpakstan). 3 hours, $45 per car.',
            ],
            [
                'name' => 'Khiva → Moynaq / Aral Sea Transfer',
                'from_location' => 'Khiva',
                'to_location' => 'Moynaq (Aral Sea)',
                'vehicle_type' => 'minivan',
                'capacity' => 6,
                'price' => 120.00,
                'duration_minutes' => 360,
                'description' => 'Private transfer to Moynaq and the Aral Sea ship graveyard. One of the most unique destinations in Central Asia.',
                'slug' => 'khiva-moynaq-aral-sea-transfer',
                'meta_title' => 'Khiva to Moynaq Aral Sea Transfer | Day Trip $120',
                'meta_description' => 'Private transfer from Khiva to Moynaq and Aral Sea. See the ship graveyard. Minivan, $120.',
            ],
            [
                'name' => 'Khiva → Bukhara Private Transfer',
                'from_location' => 'Khiva',
                'to_location' => 'Bukhara',
                'vehicle_type' => 'minivan',
                'capacity' => 6,
                'price' => 150.00,
                'duration_minutes' => 480,
                'description' => 'Private transfer from Khiva to Bukhara through the Kyzylkum Desert. A classic Silk Road journey.',
                'slug' => 'khiva-bukhara-transfer',
                'meta_title' => 'Khiva to Bukhara Transfer | Private Car $150',
                'meta_description' => 'Book private transfer from Khiva to Bukhara. Cross the Kyzylkum Desert. Minivan or sedan, $150.',
            ],
            [
                'name' => 'Khiva → Samarkand Private Transfer',
                'from_location' => 'Khiva',
                'to_location' => 'Samarkand',
                'vehicle_type' => 'minivan',
                'capacity' => 6,
                'price' => 200.00,
                'duration_minutes' => 600,
                'description' => 'Long-distance private transfer from Khiva to Samarkand. Comfortable minivan with stops along the way.',
                'slug' => 'khiva-samarkand-transfer',
                'meta_title' => 'Khiva to Samarkand Transfer | Private Car $200',
                'meta_description' => 'Private transfer Khiva to Samarkand. 10 hours, $200. Comfortable minivan, experienced driver.',
            ],
            [
                'name' => 'Khiva → Tashkent Private Transfer',
                'from_location' => 'Khiva',
                'to_location' => 'Tashkent',
                'vehicle_type' => 'minivan',
                'capacity' => 6,
                'price' => 250.00,
                'duration_minutes' => 720,
                'description' => 'Long-distance private transfer from Khiva to Tashkent. Overnight option available.',
                'slug' => 'khiva-tashkent-transfer',
                'meta_title' => 'Khiva to Tashkent Transfer | Private Car $250',
                'meta_description' => 'Private transfer from Khiva to Tashkent. $250 per car. 12 hours.',
            ],
        ];

        foreach ($transfers as $t) {
            Transfer::create(array_merge($t, ['currency' => 'USD', 'show_on_landing' => true, 'is_active' => true]));
        }

        // ─── Xizmatlar / Day trips ─────────────────────────────────────────
        $services = [
            [
                'category' => 'excursion',
                'name' => 'Khorezm Fortresses Day Trip (Ayaz Kala, Toprak Kala)',
                'slug' => 'khorezm-fortresses-day-trip',
                'short_description' => 'Visit ancient Khorezm fortresses: Ayaz Kala, Toprak Kala, Kyzyl Kala',
                'description' => "Full-day trip to the magnificent ancient fortresses of Khorezm from Khiva.\n\nIncludes: Ayaz Kala, Toprak Kala (Tuproq Qal'a), Kyzyl Kala. These 2,000-year-old mud-brick fortresses are among the most impressive archaeological sites in Central Asia.\n\nDuration: Full day (8-10 hours). Private car or minivan. Professional English/Russian speaking guide.",
                'price' => 80.00,
                'duration_text' => 'Full day (8-10 hours)',
                'meta_title' => 'Khorezm Fortresses Day Trip from Khiva | Ayaz Kala, Toprak Kala',
                'meta_description' => 'Visit ancient Khorezm fortresses from Khiva: Ayaz Kala, Toprak Kala, Kyzyl Kala. Private guided tour, $80/person.',
                'sort_order' => 1,
            ],
            [
                'category' => 'tour',
                'name' => 'Moynaq & Aral Sea Day Trip',
                'slug' => 'moynaq-aral-sea-day-trip',
                'short_description' => 'Visit the ghost ships of the Aral Sea and Moynaq fishing village',
                'description' => "One of the most striking ecological stories of the 20th century. Visit Moynaq, once a thriving fishing port.\n\nHighlights: Ship graveyard, Moynaq Museum of the Aral Sea, dramatic desert landscapes.\n\nDuration: Full day (12-14 hours from Khiva). Comfortable minivan. Professional guide.",
                'price' => 120.00,
                'duration_text' => 'Full day (12-14 hours)',
                'meta_title' => 'Moynaq Aral Sea Day Trip from Khiva | Ship Graveyard Tour',
                'meta_description' => 'Day trip from Khiva to Moynaq and the Aral Sea. See the ship graveyard. Private minivan, guide, $120/person.',
                'sort_order' => 2,
            ],
            [
                'category' => 'guide',
                'name' => 'Khiva City Tour (Ichan Kala)',
                'slug' => 'khiva-city-tour-ichan-kala',
                'short_description' => "Guided tour of Khiva's UNESCO-listed old city Ichan Kala",
                'description' => "Discover the magic of Khiva's Ichan Kala — a UNESCO World Heritage site.\n\nHighlights: Kalta Minor Minaret, Juma Mosque (218 wooden columns), Tash Hauli Palace, Muhammad Amin Khan Madrasah, Pahlavon Mahmud Mausoleum, Islam Khoja Minaret.\n\nDuration: 3-4 hours. Language: English, Russian, Uzbek.",
                'price' => 35.00,
                'duration_text' => '3-4 hours',
                'meta_title' => 'Khiva City Tour | Ichan Kala UNESCO Heritage Guided Tour',
                'meta_description' => 'Private guided tour of Khiva Ichan Kala UNESCO site. 3-4 hours, $35/person. English, Russian, Uzbek guide.',
                'sort_order' => 3,
            ],
            [
                'category' => 'tour',
                'name' => 'Bukhara Day Trip from Khiva',
                'slug' => 'bukhara-day-trip-from-khiva',
                'short_description' => 'One-day excursion to Bukhara — the holy city of the Silk Road',
                'description' => "Experience the ancient city of Bukhara on a full-day excursion from Khiva.\n\nHighlights: Kalon Mosque & Minaret, Ark Fortress, Lyabi-Hauz ensemble, Chor Minor, traditional bazaars.\n\nIncludes: Private transport, professional guide. Duration: Full day (14-16 hours including travel).",
                'price' => 180.00,
                'duration_text' => 'Full day (14-16 hours)',
                'meta_title' => 'Bukhara Day Trip from Khiva | Private Tour $180',
                'meta_description' => 'One-day tour from Khiva to Bukhara. Visit Kalon Mosque, Ark Fortress, bazaars. Private car, guide, $180.',
                'sort_order' => 4,
            ],
        ];

        foreach ($services as $s) {
            Service::create(array_merge($s, ['currency' => 'USD', 'show_on_landing' => true, 'is_active' => true]));
        }

        // ─── Qoidalar (birinchi uy) ────────────────────────────────────────
        $ruleData = [
            ['category' => 'check_in', 'title' => 'Check-in & Check-out', 'content' => 'Check-in: 14:00. Check-out: 12:00. Late check-out available on request.', 'sort_order' => 1],
            ['category' => 'general', 'title' => 'Quiet Hours', 'content' => 'Please keep noise to a minimum between 22:00 and 08:00.', 'sort_order' => 2],
            ['category' => 'smoking', 'title' => 'No Smoking Indoors', 'content' => 'Smoking is not permitted inside. Please use the designated outdoor area.', 'sort_order' => 3],
            ['category' => 'safety', 'title' => 'Key & Security', 'content' => 'Please keep your room key safe. Report any security concerns to reception.', 'sort_order' => 4],
            ['category' => 'general', 'title' => 'Breakfast', 'content' => 'Breakfast is served 07:30–10:00. Please inform us of dietary requirements.', 'sort_order' => 5],
        ];

        foreach ($ruleData as $r) {
            HouseRule::create(array_merge($r, ['guest_house_id' => $houses[0]->id, 'language' => 'en', 'is_active' => true]));
        }

        // ─── Knowledge Base ────────────────────────────────────────────────
        $faqs = [
            ['category' => 'transport', 'question' => 'How to get from Urgench Airport to Khiva?', 'answer' => 'We offer private transfers from Urgench Airport to Khiva (35 min, from $20). Ask in the chat to book!'],
            ['category' => 'tour', 'question' => 'What is the best day trip from Khiva?', 'answer' => 'Khorezm Fortresses (Ayaz Kala, Toprak Kala) is our most popular. For something unique, Moynaq & Aral Sea is unforgettable.'],
            ['category' => 'general', 'question' => 'What currency is used in Khiva?', 'answer' => 'Uzbek Sum (UZS). USD and EUR widely accepted by tour operators. ATMs available.'],
            ['category' => 'general', 'question' => 'Is Khiva safe for tourists?', 'answer' => 'Very safe. Emergency: 102 (police), 103 (ambulance).'],
            ['category' => 'transport', 'question' => 'Transfer to Bukhara or Samarkand?', 'answer' => 'We offer: Bukhara $150, Samarkand $200, Tashkent $250. Ask in chat to book!'],
        ];

        foreach ($faqs as $faq) {
            KnowledgeBase::create(array_merge($faq, ['language' => 'en', 'is_active' => true]));
        }

        // ─── Tavsiyalar ────────────────────────────────────────────────────
        $recs = [
            ['category' => 'restaurant', 'name' => 'Terrassa Restaurant', 'description' => 'Rooftop restaurant with views of Ichan Kala. Uzbek and European cuisine.', 'distance_text' => '100m'],
            ['category' => 'attraction', 'name' => 'Kalta Minor Minaret', 'description' => 'The iconic unfinished minaret of Khiva, covered in beautiful blue tiles.', 'distance_text' => '50m'],
            ['category' => 'cafe', 'name' => 'Cafe Khiva', 'description' => 'Cozy cafe in the old city serving tea, samsa and local sweets.', 'distance_text' => '200m'],
            ['category' => 'shopping', 'name' => 'Craft Bazaar Ichan Kala', 'description' => 'Local artisans selling traditional Khiva silk, woodwork, ceramics.', 'distance_text' => '150m'],
        ];

        foreach ($recs as $r) {
            Recommendation::create(array_merge($r, ['guest_house_id' => $houses[0]->id, 'is_active' => true]));
        }

        // ─── Blog ──────────────────────────────────────────────────────────
        Post::create([
            'title' => '7 Best Things to Do in Khiva, Uzbekistan',
            'slug' => '7-best-things-to-do-in-khiva',
            'excerpt' => "Khiva is one of the most well-preserved ancient cities in Central Asia. Here are the top 7 must-see attractions.",
            'body' => "Khiva's Ichan Kala is a UNESCO World Heritage Site.\n\n## 1. Kalta Minor Minaret\nThe iconic turquoise-tiled minaret — Khiva's most recognizable symbol.\n\n## 2. Juma Mosque\n218 intricately carved wooden columns.\n\n## 3. Khorezm Fortresses Day Trip\nAyaz Kala and Toprak Kala — unmissable!\n\n## 4. Islam Khoja Minaret\nClimb for panoramic views over the city.\n\n## 5. Pahlavon Mahmud Mausoleum\nThe spiritual heart of Khiva.\n\n## 6. Tash Hauli Palace\nBeautiful tilework, three separate courtyards.\n\n## 7. Sunset from the City Walls\nDon't miss the golden hour.",
            'meta_title' => 'Top 7 Things to Do in Khiva Uzbekistan | Travel Guide',
            'meta_description' => 'Discover the 7 best things to do in Khiva, Uzbekistan. Ancient fortresses, UNESCO sites, Silk Road history.',
            'language' => 'en',
            'is_published' => true,
            'published_at' => now()->subDays(10),
        ]);

        Post::create([
            'title' => 'Аральское море из Хивы: Полное руководство',
            'slug' => 'aralskoe-more-iz-khivy',
            'excerpt' => 'Как добраться до Муйнака и корабельного кладбища Аральского моря из Хивы.',
            'body' => "Аральское море — одна из самых масштабных экологических катастроф XX века.\n\n## Как добраться из Хивы\n\nРасстояние от Хивы до Муйнака около 350 км. Лучший вариант — частный трансфер.\n\n## Что посмотреть\n\n- Кладбище кораблей\n- Музей Аральского моря\n- Смотровая площадка\n\n## Стоимость\n\nЧастный трансфер Хива → Муйнак и обратно — от $120.",
            'meta_title' => 'Аральское море из Хивы: трансфер, цены, маршрут',
            'meta_description' => 'Как доехать до Аральского моря из Хивы. Частный трансфер Хива-Муйнак, цены, что посмотреть.',
            'language' => 'ru',
            'is_published' => true,
            'published_at' => now()->subDays(5),
        ]);

        $this->command->info('✅ Seeder muvaffaqiyatli bajarildi!');
        $this->command->info('Admin: admin@khivatourguide.com / admin123');
        $this->command->info('Manager: manager1@khivatourguide.com / manager123');
    }
}
