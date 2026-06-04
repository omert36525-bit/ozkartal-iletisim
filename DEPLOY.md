# ÖzKartal İletişim — Deploy Rehberi

## Hızlı Deploy (Vercel)

```bash
# 1. Vercel CLI kur
npm i -g vercel

# 2. Deploy
vercel --prod
```

İlk kez deploy ederken Vercel sana:
- Proje adı (örn. `ozkartal-iletisim`)
- Framework: **Astro** (otomatik algılar)
- Build komutu: `npm run build` (otomatik)
- Output: `dist` (otomatik)

## Custom Domain (ozkartal.com.tr)

1. Vercel Dashboard → Project → Settings → Domains
2. `ozkartal.com.tr` ve `www.ozkartal.com.tr` ekle
3. Vercel sana DNS kayıtları verir — domain sağlayıcına şu kayıtları ekle:
   - A kaydı: `@ → 76.76.21.21`
   - CNAME: `www → cname.vercel-dns.com`
4. SSL otomatik kurulur (Let's Encrypt)

## Admin Panel Güvenliği (Production)

Mevcut durumda admin paneli **client-side** çalışıyor:
- Şifre SHA-256 hash'lenmiş kodda saklanır
- Rate limit, honeypot, constant-time compare aktif
- noindex/nofollow + X-Robots-Tag ile arama motorlarından gizli

### Şifreyi Değiştirmek

1. Yeni şifrenin SHA-256 hash'ini al (PowerShell):
   ```powershell
   $bytes = [System.Text.Encoding]::UTF8.GetBytes("YENİ_ŞİFRE")
   $hash = [System.Security.Cryptography.SHA256]::Create().ComputeHash($bytes)
   -join ($hash | ForEach-Object { $_.ToString("x2") })
   ```
2. `src/pages/admin.astro` dosyasında `PW_HASH` değerini güncelle
3. Git commit + redeploy

### Daha Yüksek Güvenlik (Önerilen)

Production'da admin auth'u **server-side**'a taşı:
- Vercel Edge Function ile basit token endpoint
- VEYA Cloudflare Workers
- VEYA Supabase / Firebase Auth

## Kontrol Listesi (Deploy Öncesi)

- [ ] Admin'den telefon numarasını gerçek değerle güncelle
- [ ] Adres + harita koordinatlarını gerçek değerle güncelle
- [ ] WhatsApp numarasını gerçek değerle güncelle
- [ ] E-posta adresini gerçek değerle güncelle
- [ ] Hero metinlerini gözden geçir
- [ ] Servis görsellerini PC'den yükle (gerçek atölye fotoğrafları)
- [ ] Galeri görsellerini PC'den yükle
- [ ] Yorumları kontrol et (gerçek müşteri yorumları)
- [ ] SEO başlık ve açıklamayı gözden geçir
- [ ] `npm run build` başarıyla tamamlanmalı
- [ ] Production'da `/admin` rotasının `noindex` aldığını kontrol et

## Build & Preview Yerel

```bash
npm run build       # dist/ klasörü oluşturur
npm run preview     # dist'i serve eder
```

## Performans & Güvenlik Özellikleri

| Özellik | Durum |
|---------|-------|
| HTTPS + HSTS | ✓ (Vercel otomatik) |
| Static asset cache | ✓ (1 yıl immutable) |
| Admin no-store cache | ✓ |
| X-Frame-Options | ✓ SAMEORIGIN |
| Referrer-Policy | ✓ strict-origin |
| Permissions-Policy | ✓ kamera/mikrofon reddi |
| Spline 3D preload | ✓ |
| MapLibre yerel | ✓ (Google Maps yerine) |
| robots.txt + sitemap | ✓ |

## Domain Sağlayıcılar (Türkiye)

- **Natro.com** — uygun fiyat, .com.tr için TR-TLD
- **Doruk.net.tr** — kurumsal
- **GoDaddy / Namecheap** — uluslararası

## Yedek & Restore

Admin panel **Yedek Al** butonu → JSON dosyası indirir.
**Yedek Yükle** butonu → JSON yükler → tüm içerik geri yüklenir.

Düzenli yedek almayı unutma!
