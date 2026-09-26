This is a [Next.js](https://nextjs.org) frontend with a Django API for customer accounts and orders.

## Run the app

Install the backend dependencies once:

```bash
cd backend
python -m pip install -r requirements.txt
python manage.py migrate
```

Start Django in one terminal:

```bash
cd backend
python manage.py runserver 8000
```

Start Next.js in another terminal:

```bash
npm run dev
```

Next.js proxies `/api/*` requests to Django, so the browser can call the API without a separate CORS setup. The proxy targets `http://127.0.0.1:8000` by default; set `BACKEND_URL` in the frontend environment when Django runs on another host.

The account routes are `/signin`, `/signup`, `/auth/forgot`, and `/dashboard`. `/login` and `/auth/login` redirect to `/signin`. Django issues JWT access and refresh tokens; authenticated API calls use the access token and refresh it when it expires.

Password reset emails use Django's console email backend by default, which prints the reset link in the Django terminal during local development. Set `FRONTEND_URL` and Django's `EMAIL_BACKEND`/SMTP environment variables to send reset emails in another environment.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
