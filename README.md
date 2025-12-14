#  NestJS & React Fullstack Project (Ödev 4)

Bu repository, **Web Teknolojileri** dersi kapsamında verilen **Ödev 4** için geliştirilmiş bir **fullstack web uygulamasını** içermektedir.

Proje; **NestJS (backend)** ve **React (frontend)** kullanılarak geliştirilmiş olup, backend tarafında oluşturulan REST API frontend tarafından tüketilmektedir.

---

## 📌 Proje İçeriği

Bu projede kullanıcı profillerinin yönetilebildiği bir sistem geliştirilmiştir.

### Backend (NestJS)

* NestJS framework kullanılmıştır
* TypeORM ile veritabanı işlemleri yapılmıştır
* PostgreSQL veritabanı kullanılmıştır
* `Profile` ve `ProfileType` entity’leri tanımlanmıştır
* Profile – ProfileType arasında **bire-çok** ilişki kurulmuştur
* CRUD işlemleri desteklenmektedir
* DTO ve ValidationPipe ile doğrulama yapılmıştır
* Fotoğraf yükleme işlemi desteklenmektedir (URL olarak saklanır)

#### Kullanılan Endpoint’ler

* `GET /profiles`
* `GET /profiles/:id`
* `POST /profiles`
* `PATCH /profiles/:id`
* `DELETE /profiles/:id`
* `GET /profileTypes`

---

### Frontend (React)

* React kullanılarak görsel bir arayüz oluşturulmuştur
* Profiller listelenebilir, eklenebilir, güncellenebilir ve silinebilir
* ProfileType bilgileri API üzerinden dinamik olarak çekilmektedir
* Kullanıcıya **ProfileType ID gösterilmez**, sadece adı gösterilir
* Form, tablo ve select yapıları ödev yönergesine uygun şekilde hazırlanmıştır




> **Not:** `node_modules` klasörleri özellikle repository’ye eklenmemiştir.

---

## ▶️ Projeyi Çalıştırma

### Backend

```bash
cd backend
npm install
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## ⚠️ Önemli Notlar

* `.env` dosyaları güvenlik sebebiyle repoya eklenmemiştir
* Fotoğraflar sunucu tarafında saklanmakta ve URL olarak veritabanında tutulmaktadır
* Proje, ödev yönergesindeki tüm gereksinimleri karşılayacak şekilde hazırlanmıştır






