# ÖzKartal İletişim — Site Projesi Oturum Kaydı

**Son Güncelleme:** 2026-06-03 v3 (Admin panel + 4. kategori + Anti-AI hero)
**Durum:** Canlı, http://localhost:3002 (port 3001 doluysa Astro otomatik yükseltir)

---

## Proje Özeti

| Alan | Bilgi |
|------|-------|
| İşletme | ÖzKartal İletişim |
| Şehir | Elazığ, Türkiye |
| Adres | Admin panelinden değiştirilebilir |
| Hizmetler | Telefon, Drone, Elektronik, **Araç Beyin Tamiri (ECU)** |
| Framework | Astro 6 + Tailwind CSS 3 |
| Host hedef | Vercel (ücretsiz) |
| Python komutu | `py` (python değil — bu PC'de py) |

---

## v3 Değişiklikler (Son güncelleme)

### Hero — Tamamen yenilendi
- ❌ Sağdaki "ufak turuncu çizgi karalama" kaldırıldı
- ✅ **Three.js node network** (60 düğüm, mesafe < 5.5 birim olan düğümler arası bağlantı çizgileri)
- ✅ Bağlantı hatları üzerinde **animasyonlu pulse spheres** (8 nokta, bağlantılarda gezinir)
- ✅ İcosahedron + Octahedron wireframe arka plan şekilleri (subtle)
- ✅ CSS floating particles (28 parça, turuncu/amber tonlarında, yukarı süzülür)
- ✅ Mouse parallax + blob animasyonu (12s döngü)

### 4. Kategori — Araç Beyin Tamiri
- Services: Telefon, Drone, Elektronik, **Araç Beyin Tamiri** (4. kart)
- Pricing: Aynı 4 kategori, her birinde "ve daha fazlası..." item'ı
- Araç Beyin item'ları: ECU Programlama, ECU Onarımı, ABS Beyni, Airbag Modülü, Şanzıman Beyni, Klima Beyni, BSI/BCM, OBD Teşhis, Anahtar Kodlama, Kontak

### Görseller — Makro çekim
- Eski takım elbiseli adam görseli kaldırıldı
- Tüm service kartları gerçek tamir makro çekimleri:
  - Telefon: `4709378` (telefon iç komponenti)
  - Drone: `336232` (drone)
  - Elektronik: `9242896` (anakart lehim)
  - Araç Beyin: `6636458` (ECU elektronik kart makro)
- Galeri: `7286009`, `9242896`, `4709378`, `36169774`, `6636458`, `4709370` (tümü makro)

### Testimonials — Kayan kolonlar
- 3 kolon × 3 yorum = 9 farklı yorum
- Her kolon farklı hızda dikey scroll (14s, 18s, 22s)
- Top/bottom fade mask ile sınırsız döngü
- Yorumlar gerçekçi, abartısız, samimi
- Mobile: 1 kolon, Tablet: 2, Desktop: 3

### Admin Panel — `/admin` rotası
- **Şifre:** `14532332` (SHA-256 hash'lenmiş client-side)
- **Bölümler:** İletişim, Hero, Hizmetler, Galeri, Pricing, SEO
- **Çalışma:** localStorage'a yazar → Layout.astro runtime'da uygular
- **Anlık güncelleme:** Storage event ile diğer tablar otomatik refresh
- **Reset/Export:** Config dışa aktarma, tüm değişiklikleri sıfırlama
- **Anti-indexing:** `<meta name="robots" content="noindex, nofollow">`

### Runtime Config Injection
Layout.astro localStorage'dan oz-config okur, şu attribute'lara uygular:
- `data-cfg="phone"` → telefon numarası
- `data-cfg="email"` → e-posta
- `data-cfg="address"` → adres
- `data-cfg-href="phone"` → tel: link
- `data-cfg-href="email"` → mailto: link
- `data-cfg-href="whatsapp"` → wa.me link
- `data-cfg-maps` → iframe src (Google Maps)
- `data-cfg="logoOz"` / `data-cfg="logoRest"` → logo metinleri
- `data-cfg="heroLine1"` / `heroLine2` / `heroSub` → hero metinleri
- `data-cfg-src="serviceImg-N"` → servis görseli
- `data-cfg-src="gallery-N"` → galeri görseli

### Contact — Genişletildi
- Google Maps iframe eklendi (admin panelden değiştirilebilir)
- Grayscale + contrast filtre, hover'da renkli
- WhatsApp butonu + mail/tel linkleri + adres + saatler

---

## Dosya Yapısı

```
C:\site\
├── CLAUDE.md
├── SESSION_LOG.md          ← Bu dosya
├── astro.config.mjs        ← port 3001 (3002'ye düşebilir)
├── tailwind.config.mjs     ← turuncu palet + Space Grotesk/DM Sans
├── package.json            ← astro, tailwind, three, gsap, motion
├── serve.mjs               ← node serve.mjs (eski statik server, kullanılmıyor)
├── screenshot.mjs          ← Puppeteer screenshot tool
├── public/
│   └── favicon.svg         ← Turuncu hexagon + X logo
├── src/
│   ├── layouts/Layout.astro      ← Global, admin config injection
│   ├── pages/
│   │   ├── index.astro     ← Ana sayfa
│   │   └── admin.astro     ← /admin (şifre: 14532332)
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Hero.astro            ← Node network + particles
│   │   ├── Services.astro        ← 4 kart, makro çekim
│   │   ├── HowItWorks.astro
│   │   ├── Stats.astro
│   │   ├── Gallery.astro         ← 6 makro görsel
│   │   ├── DroneSection.astro
│   │   ├── Testimonials.astro    ← Kayan 3 kolon
│   │   ├── Pricing.astro         ← 4 kategori + "ve daha fazlası"
│   │   ├── FAQ.astro             ← Accordion
│   │   ├── Contact.astro         ← Form + Maps iframe
│   │   └── Footer.astro
│   └── styles/global.css         ← Turuncu palet + reveal anim
└── temporary screenshots/        ← Auto-incremented PNGs
```

---

## Komutlar

```bash
# Dev server (otomatik 3001 → 3002 fallback)
npm run dev

# Build (production)
npm run build

# Preview build
npm run preview

# Screenshot
node screenshot.mjs http://localhost:3002
node screenshot.mjs http://localhost:3002 label

# Admin panele git
http://localhost:3002/admin
```

---

## Görsel Kaynaklar (Pexels, API'siz)

```
URL: https://images.pexels.com/photos/{ID}/pexels-photo-{ID}.jpeg?auto=compress&cs=tinysrgb&w=800
```

**Makro çekim ID listesi:**
- Devre kartı: `36169774`, `159220`, `6636458`, `36169772`, `6755067`
- Lehim çalışması: `9242896`, `9242905`, `9241777`, `4709378`, `4709370`
- Büyüteç altı tamir: `7286009`, `7286013`, `7286020`
- Atölye masası: `4709370`, `4709372`
- Drone: `336232`, `2876511`

---

## Yapılacaklar (Sonraki Adım)

- [ ] Adres bilgisini admin panelden gerçek adresle güncelle
- [ ] Telefon numarasını admin panelden güncelle (+90 424 ...)
- [ ] Google Maps iframe src'sini gerçek konumla güncelle (Elazığ)
- [ ] Production build test: `npm run build && npm run preview`
- [ ] Vercel deploy: `vercel --prod`
- [ ] Cloudflare DNS bağlama (alan adı alınınca)
- [ ] Admin panelinin Cloudflare Workers ile sunucu-tarafı'na taşınması (ileri seviye güvenlik)

---

## Önemli Notlar

- **em-dash (—) kesinlikle yasak** — taste-skill
- **Inter/Roboto yok** — Space Grotesk + DM Sans
- **Generic Tailwind blue/indigo yok** — turuncu (#FF6B35) + amber (#F59E0B)
- **transition-all yok** — sadece transform ve opacity animate edilir
- **Garanti vurgusu yumuşatıldı** — "2 Yıl Garanti" gibi laflar yok
- **Yorumlar abartısız** — "memnun kaldım", "sıkıntı yok" tarzı sade
- **Pexels** API'siz, WebFetch ile direkt URL çekiliyor
- **Python = py** (bu PC'de python değil)
- **Admin şifresi:** `14532332` (SHA-256 hash hardcoded)

---

*VS Code'dan ya da yeni Claude oturumundan devam ederken: SESSION_LOG.md + CLAUDE.md oku, npm run dev, sonra screenshot kontrol.*
