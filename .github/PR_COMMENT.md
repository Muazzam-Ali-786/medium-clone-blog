Vercel env variables added

I've added the required environment variables to Vercel (MONGODB_URI, NEXTAUTH_SECRET, NEXTAUTH_URL). The site URL is:

- https://medium-clone-blog-ivory.vercel.app

Please verify:

- MongoDB Atlas user/password are correct and have access to the `blog` database.
- Atlas IP whitelist includes the Vercel deployment or `0.0.0.0/0` for testing.
- Deployment logs show successful connection.

If you want, run the following locally to set them via CLI:

```
vercel env add MONGODB_URI production
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production
```
