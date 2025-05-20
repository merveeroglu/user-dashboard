# 🧑‍💻 React User List App

Bu proje, bir kullanıcı listesini yönetmek amacıyla React ile geliştirilmiş basit ama işlevsel bir uygulamadır. Kullanıcılar bir tabloda listelenir; arama, filtreleme, sayfalama, kullanıcı ekleme, düzenleme ve silme gibi temel özellikler sunar.

## 🚀 Kullanılan Teknolojiler

- ⚛️ **React** (Vite ile yapılandırıldı)
- 💅 **Bootstrap** (stil ve UI düzeni için)
- 📦 **Axios** (API istekleri için)
- 📝 **Formik** (form kontrolü için)
- ✅ **Yup** (form doğrulama için)

## 📋 Özellikler

- ✅ **Kullanıcıları API'den çekme** ve tablo halinde listeleme
- 🔍 **Arama & filtreleme** işlevselliği
- ➕ **Yeni kullanıcı ekleme** (API desteklemediği için `localStorage`'a kaydedilir)
- 🗑️ **Kullanıcı silme** ve 📝 **düzenleme**
  - API'den gelen verilerde silme ve güncelleme *sadece anlık* olarak gösterilir
  - `localStorage`'a eklenen kullanıcılar için tam CRUD desteği vardır
- 📄 **Sayfalama (Pagination)**
  - Yeni eklenen kullanıcılar otomatik olarak son sayfada yer alır

## ⚠️ Notlar

- Kullanıcı ekleme, silme ve güncelleme işlemleri **API üzerinde gerçek zamanlı olarak çalışmamaktadır.**
- API yalnızca listeleme (GET) işlemini desteklemektedir.
- Bu nedenle `localStorage` üzerinde simüle edilmiş veri yönetimi yapılmaktadır.

## 🔗 Canlı Proje

https://usermanagement02.netlify.app/



##




This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
