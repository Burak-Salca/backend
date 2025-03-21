# 🎓 Öğrenci ve Ders Yönetimi Sistemi

## 📋 Proje Hakkında
Bu proje, öğrenci ve ders yönetimini kapsayan kapsamlı bir web uygulamasıdır. Sistem, öğrencilerin derslere kaydolmasını, admin kullanıcıların öğrenci ve ders yönetimini yapmasını sağlayan modern bir platformdur.

## 📚 Kullanılan Kütüphaneler

### Ana Bağımlılıklar
- 🏗️ **@nestjs/common** (^11.0.1) - NestJS çekirdek kütüphanesi
- ⚙️ **@nestjs/config** (^4.0.1) - Konfigürasyon yönetimi
- 🚀 **@nestjs/core** (^11.0.1) - NestJS ana modülü
- 🔑 **@nestjs/jwt** (^11.0.0) - JWT (JSON Web Token) desteği
- 🛡️ **@nestjs/passport** (^11.0.5) - Kimlik doğrulama stratejileri
- 🌐 **@nestjs/platform-express** (^11.0.1) - Express entegrasyonu
- 📝 **@nestjs/swagger** (^11.0.7) - API dokümantasyonu
- 🗃️ **@nestjs/typeorm** (^11.0.0) - TypeORM entegrasyonu
- 🔒 **bcrypt** (^5.1.1) - Şifreleme işlemleri
- ✨ **class-transformer** (^0.5.1) - Nesne dönüşümleri
- ✅ **class-validator** (^0.14.1) - Veri doğrulama
- 🎫 **jsonwebtoken** (^9.0.2) - JWT işlemleri
- 🔐 **passport** (^0.7.0) - Kimlik doğrulama
- 🔑 **passport-jwt** (^4.0.1) - JWT stratejisi
- 🐘 **pg** (^8.14.1) - PostgreSQL sürücüsü
- 🔄 **typeorm** (^0.3.21) - ORM kütüphanesi

## 👥 Kullanıcı Rolleri ve Yetkiler

### 👨‍💼 Admin Rolü
- ➕ Öğrenci ekleme, güncelleme ve silme
- 📚 Ders ekleme, güncelleme ve silme
- 🔄 Öğrenci-ders eşleştirmelerini yönetme
- 📊 Tüm öğrenci ve ders listelerini görüntüleme
- 📝 Sistem genelinde tam yetki

### 👨‍🎓 Öğrenci Rolü
- 📝 Kendi profilini görüntüleme ve güncelleme
- 📚 Mevcut derslere kayıt olma
- ❌ Kayıtlı derslerden çıkma
- 📋 Kendi ders kayıtlarını görüntüleme

## 🛠️ Kullanılan Teknolojiler

### Backend
- ⚡ NestJS (Node.js framework)
- 🔐 JWT tabanlı kimlik doğrulama
- 🎯 TypeScript
- 📊 PostgreSQL veritabanı
- 📝 Swagger API dokümantasyonu

### Güvenlik
- 🔒 JWT (JSON Web Tokens)
- 👮‍♂️ Role-based access control (RBAC)
- 🛡️ Guards ve decorators ile yetkilendirme
- 🔑 Bcrypt ile şifreleme

### Veritabanı
- 🐘 PostgreSQL
- 🔄 TypeORM ile veritabanı yönetimi

### Test
- 🧪 Jest test framework


## 📁 Proje Mimarisi

```
src/
├── _base/          # 🏗️ Temel sınıflar ve yapılar
├── _config/        # ⚙️ Konfigürasyon dosyaları
├── _security/      # 🔒 Güvenlik ile ilgili dosyalar
├── admins/         # 👨‍💼 Admin modülü
├── auth/           # 🔐 Kimlik doğrulama modülü
├── courses/        # 📚 Ders modülü
└── students/       # 👨‍🎓 Öğrenci modülü
```

## 🚀 Kurulum ve Çalıştırma

### 📋 Ön Gereksinimler
- Node.js (v18 veya üzeri)
- PostgreSQL
- npm veya yarn

### 🔧 Kurulum Adımları

1. Projeyi klonlayın:
```bash
git clone [repo-url]
cd [proje-dizini]
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyasını oluşturun:
```env
DB_TYPE=***
DB_HOST=***
DB_PORT=***
DB_USERNAME=***
DB_PASSWORD=***
DB_NAME=***
JWT_SECRET=***
```

4. Veritabanını oluşturun:
```bash
# PostgreSQL'de veritabanını oluşturun
createdb DB_NAME
```

5. Uygulamayı başlatın:
```bash
# Geliştirme modu
npm run start:dev

# Prodüksiyon modu
npm run start:prod
```

### 🌐 API Endpoints

API dokümantasyonuna aşağıdaki URL'lerden erişebilirsiniz:
- Swagger UI: `http://localhost:3000/api`

## 🔍 Test

```bash
# Unit testleri çalıştır
npm run test

```
