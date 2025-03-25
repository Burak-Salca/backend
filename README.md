# 🎓 Öğrenci ve Ders Yönetimi Sistemi

## 📋 Proje Hakkında
Bu proje, öğrenci ve ders yönetimini kapsayan kapsamlı bir web uygulamasıdır. Sistem, öğrencilerin derslere kaydolmasını, admin kullanıcıların öğrenci ve ders yönetimini yapmasını sağlayan modern bir platformdur.

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

## 🛡️ Validasyonlar ve İş Kuralları

### 👤 Kullanıcı Validasyonları (Admin & Öğrenci)
- 📧 Email adresi:
  - Benzersiz olmalıdır (aynı email ile birden fazla kayıt yapılamaz)
  - Geçerli email formatında olmalıdır
  - En fazla 100 karakter olabilir

- 🔐 Şifre:
  - En az 8 karakter olmalıdır
  - En az bir büyük harf içermelidir
  - En az bir küçük harf içermelidir
  - En az bir rakam içermelidir
  - En az bir özel karakter içermelidir
  - En fazla 100 karakter olabilir

- 👤 İsim ve Soyisim:
  - Boş bırakılamaz
  - Sadece boşluk karakteri içeremez
  - En fazla 50 karakter olabilir
  - String tipinde olmalıdır

### 📚 Ders Validasyonları
- 📝 Ders Adı:
  - Boş bırakılamaz
  - Sadece boşluk karakteri içeremez
  - String tipinde olmalıdır
  - Benzersiz olmalıdır (aynı isimde iki ders oluşturulamaz)

- 📄 Ders İçeriği:
  - Boş bırakılamaz
  - Sadece boşluk karakteri içeremez
  - String tipinde olmalıdır

### ⚡ İş Kuralları ve Kısıtlamalar
- 🚫 Admin kendisini silemez
- 🔒 Öğrenci sadece kendi profilini güncelleyebilir
- 📝 Öğrenci sadece kendi derslerini görüntüleyebilir
- ➕ Öğrenci aynı derse birden fazla kez kayıt olamaz
- ❌ Öğrenci sadece kayıtlı olduğu dersten çıkabilir
- 👮‍♂️ Admin tüm öğrenci ve dersleri yönetebilir
- 🔄 Admin öğrencileri derslere ekleyip çıkarabilir
- 📊 Admin tüm öğrenci-ders ilişkilerini görüntüleyebilir

## 🛠️ Kullanılan Teknolojiler

### Kullanılan Kütüphaneler
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
- 📡 **swagger-ui-express** (^5.0.1) - Swagger UI
- 🔄 **reflect-metadata** (^0.2.2) - Metadata reflection
- 🌊 **rxjs** (^7.8.1) - Reactive Extensions


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
- 🚫 Token blacklist sistemi

### Veritabanı
- 🐘 PostgreSQL
- 🔄 TypeORM ile veritabanı yönetimi

### Konteynerizasyon
- 🐳 Docker
- 🎭 Docker Compose
- 📦 Container tabanlı deployment

### Test
- 🧪 Jest test framework

## 📁 Proje Mimarisi

```
src/
├── _base/          # 🏗️ Temel sınıflar ve yapılar
├── _common/        # 🔧 Ortak kullanılan araçlar ve filtreler
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
- Docker ve Docker Compose
- DBeaver
- npm veya yarn
- PostgreSQL (Docker kullanmıyorsanız)

### 🔧 Kurulum Adımları

## 1. Projeyi klonlayın:
```bash
git clone [repo-url]
cd [proje-dizini]
```

## 2. Bağımlılıkları yükleyin:
```bash
npm install
```

## 3. `.env` dosyasını oluşturun:
```env
DB_TYPE=***
DB_HOST=***
DB_PORT=***
DB_USERNAME=***
DB_PASSWORD=***
DB_NAME=***
JWT_SECRET=***
```

## 4. Uygulamayı başlatmanın iki yolu var:

#### A) Docker ile Çalıştırma (Önerilen):
```bash
# Docker container'larını başlat
docker-compose up -d

# Uygulamayı başlat
npm run start:dev

💡 **Not**: Docker container'ı çalışırken yerel PostgreSQL servisinin durdurulmuş olması önemlidir.

```

#### B) Yerel Geliştirme Ortamında Çalıştırma:
```bash
# PostgreSQL'de veritabanını oluştur
createdb your_database_name

# Uygulamayı başlat
npm run start:dev
```

## 5. DBeaver ile Bağlantı
Docker üzerinden çalışan PostgreSQL veritabanına DBeaver ile bağlanmak için aşağıdaki adımları izleyin:

-1. **DBeaver** uygulamasını açın.  
-2. Sol üstteki **"New Database Connection"** butonuna tıklayın.  
-3. Açılan pencerede **PostgreSQL** veritabanı türünü seçin ve **Next** butonuna tıklayın.  
-4. Aşağıdaki bilgileri, `.env` dosyanızda tanımladığınız değerlere göre doldurun:

   - **Host**: `DB_HOST`  
   - **Port**: `DB_PORT`  
   - **Database**: `DB_NAME`  
   - **Username**: `DB_USERNAME`  
   - **Password**: `DB_PASSWORD`


### 🌐 API Endpoints

API dokümantasyonuna aşağıdaki URL'den erişebilirsiniz:
- Swagger UI: `http://localhost:3001/api`

## 🔍 Test

```bash
# Unit testleri çalıştır
npm run test

```
