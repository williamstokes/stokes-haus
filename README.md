# stokes haus

A minimal poetic website.

## Getting Started

This is a minimal single-page website with no styling.

## Deploying to GitHub Pages

### Step 1: Initialize Git and Create Repository

1. In your terminal, navigate to this directory:
   ```bash
   cd /Users/ws/web
   ```

2. Initialize a git repository:
   ```bash
   git init
   ```

3. Add all files:
   ```bash
   git add .
   ```

4. Make your first commit:
   ```bash
   git commit -m "Initial commit: minimal stokes haus website"
   ```

### Step 2: Create Repository on GitHub

1. Go to [github.com](https://github.com) and log in
2. Click the "+" icon in the top right, then select "New repository"
3. Name it something like `stokes-haus` (or `web`, or whatever you prefer)
4. **Do NOT** initialize with README, .gitignore, or license (since you already have files)
5. Click "Create repository"

### Step 3: Create a Personal Access Token

Since you signed up via Google SSO, you'll need a Personal Access Token (PAT) instead of a password:

1. Go to [github.com](https://github.com) and log in
2. Click your profile picture (top right) → **Settings**
3. Scroll down in the left sidebar and click **Developer settings**
4. Click **Personal access tokens** → **Tokens (classic)**
5. Click **Generate new token** → **Generate new token (classic)**
6. Give it a name like "stokes-haus-website" (or anything you want)
7. Set expiration: choose "90 days" or "No expiration" (your choice)
8. Check the **repo** box (this gives it access to repositories)
9. Scroll down and click **Generate token**
10. **IMPORTANT**: Copy the token immediately! It will look like `ghp_xxxxxxxxxxxxxxxxxxxx` - you won't be able to see it again!

### Step 4: Connect Local Repository to GitHub

1. In your terminal, run these commands (replace `YOUR-USERNAME` and `YOUR-REPO-NAME`):
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   git branch -M main
   ```

2. When you run `git push -u origin main`, it will ask for:
   - **Username**: Your GitHub username
   - **Password**: Paste your Personal Access Token (the `ghp_...` token you just copied)

That's it! The push should work now.

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" (top menu bar)
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose branch: `main`
6. Choose folder: `/ (root)`
7. Click "Save"

Your site will be available at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

### Step 6: Connect Your Custom Domain (willstokes.com)

**IMPORTANT SECURITY NOTE**: If https://willstokes.com is redirecting to a scammy site, your DNS is misconfigured. Follow these steps carefully.

1. **Create a CNAME file** (helps GitHub recognize your domain):
   - A `CNAME` file has been created in your repo root with `willstokes.com`
   - Commit and push this file to GitHub

2. In your GitHub repository, go to **Settings** → **Pages**
3. In the "Custom domain" field, enter `willstokes.com` (without www)
4. **IMPORTANT**: Make sure "Enforce HTTPS" checkbox is checked (this will be available after DNS propagates)
5. Click "Save"

6. **In your Hover account**, go to DNS settings for willstokes.com:
   - **DELETE ALL EXISTING A RECORDS** that don't point to GitHub Pages
   - **DELETE ALL EXISTING CNAME RECORDS** that don't point to GitHub Pages
   - This is critical! Old/malicious DNS records are causing the issue

7. Add these DNS records (these are the correct GitHub Pages records):
   
   **A Records (add all 4 of these):**
   - **Type**: A
     - **Host**: @ (or blank/root)
     - **Value**: 185.199.108.153
   - **Type**: A
     - **Host**: @ (or blank/root)
     - **Value**: 185.199.109.153
   - **Type**: A
     - **Host**: @ (or blank/root)
     - **Value**: 185.199.110.153
   - **Type**: A
     - **Host**: @ (or blank/root)
     - **Value**: 185.199.111.153

   **CNAME Record (optional, for www.willstokes.com):**
   - **Type**: CNAME
     - **Host**: www
     - **Value**: YOUR-USERNAME.github.io

8. **Wait for DNS propagation** (can take a few minutes to 48 hours, usually 15-30 minutes)
9. GitHub will automatically provision an SSL certificate once DNS is correct
10. Once you see a green checkmark in GitHub Pages settings, "Enforce HTTPS" will become available - check it!

### Troubleshooting: DNS Verification Errors

**If GitHub shows "DNS check unsuccessful" or "Domain does not resolve to the GitHub Pages server":**

1. **Verify your Hover DNS records are exactly correct:**
   - Go to your Hover DNS settings for willstokes.com
   - You should have EXACTLY 4 A records for the root domain (@):
     - A @ → 185.199.108.153
     - A @ → 185.199.109.153
     - A @ → 185.199.110.153
     - A @ → 185.199.111.153
   - Make sure there are NO other A records for @
   - Make sure there are NO CNAME records for @ (you can't have both)

2. **Check DNS propagation:**
   - Go to [dnschecker.org](https://dnschecker.org)
   - Type `willstokes.com` and select "A" record type
   - Check if servers worldwide show the 4 GitHub Pages IPs (185.199.108.x through 185.199.111.x)
   - If they show different IPs, DNS hasn't propagated yet - wait 30-60 minutes

3. **Try using dig command (if you're comfortable with terminal):**
   ```bash
   dig willstokes.com +short
   ```
   This should return the 4 GitHub Pages IPs. If it shows different IPs, DNS isn't set correctly.

4. **Alternative: Use CNAME instead of A records (easier to verify):**
   - Some people find CNAME works better. In Hover:
   - **Delete all A records for @**
   - Add a CNAME record:
     - **Type**: CNAME
     - **Host**: @ (or blank)
     - **Value**: YOUR-USERNAME.github.io
   - Note: Not all DNS providers support CNAME for root domain. If Hover doesn't allow it, stick with A records.

5. **During DNS propagation (can take 15 minutes to 48 hours):**
   - This is normal! Different DNS servers update at different times
   - Your local DNS might show old IPs while other regions show new ones
   - You can check global propagation at [dnschecker.org](https://dnschecker.org) - type `willstokes.com` and select "A" record
   - Once most servers (especially US-based ones) show the GitHub Pages IPs, GitHub should be able to verify

6. **After DNS has propagated (check dnschecker.org), force GitHub to re-check:**
   - Go to GitHub → Settings → Pages
   - Clear the "Custom domain" field completely
   - Click "Save"
   - Wait 10 seconds
   - Re-enter `willstokes.com` in the custom domain field
   - Click "Save"
   - This forces GitHub to re-check DNS from their servers

**If https://willstokes.com shows a red/strikethrough HTTPS and redirects to a scam site:**

1. **Check your Hover DNS**: Make sure you ONLY have the 4 GitHub Pages A records listed above
2. **Remove any suspicious records**: Delete any A or CNAME records you didn't add yourself
3. **Wait**: DNS changes can take time to propagate globally
4. **Clear your browser cache**: Sometimes old DNS is cached
5. **Check DNS propagation**: Use [dnschecker.org](https://dnschecker.org) to see if your DNS is updated globally
6. **Verify in GitHub**: Go to your repo → Settings → Pages → check that the custom domain shows correctly

## Making Updates

Whenever you make changes:

1. Make your edits to the files
2. In terminal:
   ```bash
   git add .
   git commit -m "Description of your changes"
   git push
   ```

GitHub Pages will automatically update your site (usually takes 1-2 minutes).

