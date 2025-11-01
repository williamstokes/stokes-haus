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

### Step 3: Connect Local Repository to GitHub

GitHub will show you commands. Use these:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

(Replace `YOUR-USERNAME` and `YOUR-REPO-NAME` with your actual GitHub username and the repository name you created)

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" (top menu bar)
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose branch: `main`
6. Choose folder: `/ (root)`
7. Click "Save"

Your site will be available at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

### Step 5: Connect Your Custom Domain (stokes.haus)

Once GitHub Pages is working:

1. In the same GitHub Pages settings page, enter `stokes.haus` in the "Custom domain" field
2. Click "Save"
3. In your Hover account, go to DNS settings for stokes.haus
4. Add/update these DNS records:
   - **Type**: A
     - **Host**: @
     - **Value**: 185.199.108.153
   - **Type**: A
     - **Host**: @
     - **Value**: 185.199.109.153
   - **Type**: A
     - **Host**: @
     - **Value**: 185.199.110.153
   - **Type**: A
     - **Host**: @
     - **Value**: 185.199.111.153

   (These are GitHub Pages IP addresses)

5. Also add a CNAME record:
   - **Type**: CNAME
   - **Host**: www
   - **Value**: YOUR-USERNAME.github.io

It may take a few minutes to a few hours for DNS to propagate. Once it does, https://stokes.haus will point to your GitHub Pages site.

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

