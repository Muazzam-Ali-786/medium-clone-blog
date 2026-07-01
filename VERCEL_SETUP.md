# Vercel environment setup

This document shows commands and steps to add the required environment variables to your Vercel project and how to notify GitHub. I cannot access your Vercel or GitHub accounts from here, so run the commands below locally.

1) Install CLIs (if missing)

   npm install -g vercel
   npm install -g @github/cli

2) Login to Vercel and GitHub

   vercel login
   gh auth login

3) Add environment variables to Vercel (interactive)

   cd path/to/your/project
   # Add production variable (you will be prompted to paste the value)
   vercel env add MONGODB_URI production
   vercel env add NEXTAUTH_SECRET production
   # Set NEXTAUTH_URL to the deployed site URL, for example:
   vercel env add NEXTAUTH_URL production
   # Example production value: https://medium-clone-blog-ivory.vercel.app

   # Repeat for preview and development environments if needed:
   vercel env add MONGODB_URI preview
   vercel env add MONGODB_URI development

4) Non-interactive (scripted) option using Vercel API

   # Create a Vercel personal token first at https://vercel.com/account
   # Then use the API to set environment variables (replace <TEAM_ID> if needed)

   VERCEL_TOKEN="<your_vercel_token>"
   PROJECT_ID="$(vercel projects ls --json | jq -r '.[] | select(.name=="YOUR_PROJECT_NAME") | .id')"

   curl -s -X POST "https://api.vercel.com/v9/projects/$PROJECT_ID/env" \
     -H "Authorization: Bearer $VERCEL_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"key":"MONGODB_URI","value":"mongodb+srv://...","type":"encrypted","target":["production"]}'

5) Add a comment or create an issue on GitHub to record the change

   # Create an issue
   gh issue create --title "Add Vercel env variables for production" --body "Added MONGODB_URI and NEXTAUTH_SECRET to Vercel. Please verify Atlas IP whitelist and credentials." --label "infra"

   # Or comment on an open PR (replace <PR_NUMBER>)
   gh pr comment <PR_NUMBER> --body-file .github/PR_COMMENT.md

6) Atlas IP whitelist

   - In MongoDB Atlas go to Network Access and add IP access. For quick testing add `0.0.0.0/0` (not recommended long-term). For production, restrict to Vercel IP ranges or use VPC peering.

7) Verify deployment logs

   - In Vercel dashboard open the latest deployment and check logs for connection errors.

Security note: Do not commit `.env.local` or real secrets to the repository. Use the `.env.example` file for placeholders only.
