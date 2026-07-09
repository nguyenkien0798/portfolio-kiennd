# Portfolio - Kiên Nguyễn Đình

Trang portfolio cá nhân của Front-end Developer, xây dựng bằng **Next.js 15**, **TypeScript** và **Tailwind CSS**.

## Clone from brittanychiang.com

## Chạy local

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt.

## Deploy lên Vercel

### Cách 1: Qua GitHub (khuyến nghị)

1. Push code lên GitHub repository
2. Đăng nhập [vercel.com](https://vercel.com)
3. Click **Add New Project** → Import repository
4. Vercel tự nhận diện Next.js, giữ nguyên cấu hình mặc định
5. Click **Deploy**

### Cách 2: Qua Vercel CLI

```bash
npm i -g vercel
vercel
```

Làm theo hướng dẫn trên terminal. Lần deploy đầu sẽ tạo project mới trên Vercel.

## Internationalization (i18n)

- **Default language:** English (`/`)
- **Vietnamese:** `/vi`
- Translation files: `messages/en.json`, `messages/vi.json`
- Language switcher in the header (EN / VI)

Content is managed in `messages/*.json`. Static data (contact info, tech stack) is in `src/data/portfolio.ts`.

