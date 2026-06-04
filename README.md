# ÖzKartal İletişim — Resmî Site

Profesyonel telefon, drone, elektronik ve araç beyin (ECU) tamir servisi · Elazığ.

## Tech Stack

- **Framework:** Astro 6
- **Styling:** Tailwind + custom CSS
- **3D:** Spline (web component)
- **Map:** MapLibre GL
- **Deploy:** Vercel
- **Domain:** ozkartal.com.tr (planlanan)

## Geliştirme

```bash
npm install --legacy-peer-deps
npm run dev     # http://localhost:3001
npm run build   # production build → dist/
npm run preview # build çıktısını test et
```

## Yönetim Paneli

```
http://localhost:3001/admin
Şifre: 14532332
```

Panelde değiştirilebilir:
- İletişim (telefon, WhatsApp, e-posta, adres, çalışma saatleri)
- Harita konumu (lat/lng + Google Maps linki)
- Hero metinleri
- 4 hizmet kategorisi (başlık, açıklama, görsel)
- 6 galeri görseli (URL veya PC'den yükleme)
- 9 müşteri yorumu
- 8 S.S.S. soru/cevap
- Footer (slogan, telif)
- SEO (başlık, açıklama, logo)
- Canlı sohbet (karşılama, özel yanıtlar, AI ayarları)
- Ziyaretçi logları (anonim, client-side)

## Vercel Deploy

### Otomatik (GitHub bağlı)

1. Bu repo'yu GitHub'a push'la
2. [vercel.com](https://vercel.com) → New Project → Import
3. Framework otomatik **Astro** algılanır → Deploy
4. Her commit yeni otomatik deploy başlatır
5. Vercel ücretsiz subdomain verir: `ozkartal-iletisim.vercel.app`

### CLI ile manuel

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Custom Domain (ozkartal.com.tr)

1. Vercel Dashboard → Project → Settings → Domains
2. `ozkartal.com.tr` ve `www.ozkartal.com.tr` ekle
3. Domain sağlayıcıda DNS:
   - `A    @   →  76.76.21.21`
   - `CNAME www → cname.vercel-dns.com`
4. SSL otomatik (1-3 dk)

## Güvenlik

| Özellik | Durum |
|---|---|
| HTTPS + HSTS (preload) | ✓ Vercel + vercel.json |
| Admin SHA-256 şifre + rate limit | ✓ 5 hata = 60sn kilit |
| Honeypot bot koruması | ✓ |
| Constant-time hash karşılaştırma | ✓ |
| X-Frame-Options, X-XSS, nosniff | ✓ |
| Referrer-Policy, Permissions-Policy | ✓ |
| Cross-Origin-Opener-Policy | ✓ |
| Admin no-cache + noindex | ✓ |
| Static asset 1 yıl immutable cache | ✓ |
| robots.txt + sitemap.xml | ✓ |
| Schema.org LocalBusiness JSON-LD | ✓ |
| OG tags + Twitter card | ✓ |

## Admin Şifresi Değiştirme

PowerShell ile yeni hash al:

```powershell
$bytes = [System.Text.Encoding]::UTF8.GetBytes("YENI_SIFRE")
-join ([System.Security.Cryptography.SHA256]::Create().ComputeHash($bytes) | ForEach-Object { $_.ToString("x2") })
```

Çıkan hash'i `src/pages/admin.astro` içinde `PW_HASH` değerine yaz, commit + redeploy.

## Yapı

```
src/
├── components/
│   ├── Nav.astro, Footer.astro, Logo.astro
│   ├── Hero.astro (Spline 3D)
│   ├── ShapeBackground.astro (turuncu glow + ribbon shapes)
│   ├── Services.astro (4 kategori)
│   ├── Pricing.astro, Gallery.astro
│   ├── HowItWorks.astro, Stats.astro
│   ├── Testimonials.astro, FAQ.astro
│   ├── Contact.astro (MapLibre harita)
│   └── ChatWidget.astro (sağ alt canlı sohbet)
├── layouts/Layout.astro
├── pages/
│   ├── index.astro
│   └── admin.astro (yönetim paneli)
└── styles/global.css

public/
├── favicon.svg
├── robots.txt
└── sitemap.xml
```

## Lisans

© ÖzKartal İletişim · Tüm hakları saklıdır.
