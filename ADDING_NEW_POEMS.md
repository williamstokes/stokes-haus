# How to Add New Antimemetic Poems

## Overview
Each poem requires:
- A new HTML page (e.g., `antimemetic-poem-2.html`)
- Encrypted poem content embedded in the page
- Configuration (title, epigraph, password, poem number)

## Step-by-Step Instructions

### Step 1: Prepare Your Poem
Have ready:
- **Title**: The poem's title
- **Epigraph**: The epigraph text
- **Password**: The password (case insensitive, can have multiple acceptable options)
- **Poem Content**: The exact poem text with "/" marks where line breaks should occur

### Step 2: Generate Encrypted Content
1. Open `test-setup.html` in your browser
2. Replace the poem text in the textarea with your new poem (keep the "/" marks for line breaks)
3. Enter your password in the password field
4. Click "Generate Encrypted Content"
5. Copy the encrypted content from the textarea

### Step 3: Create the Poem HTML Page
1. Copy `antimemetic-poem-1.html` to create a new file (e.g., `antimemetic-poem-2.html`)
2. Update the following in the new file:

#### a) Update the `<title>` tag:
```html
<title>Your Poem Title - antimemetic poetics</title>
```

#### b) Update the poem title in the page:
```html
<h1 class="poem-title">Your Poem Title</h1>
```

#### c) Update the epigraph:
```html
<div class="epigraph">Your epigraph text</div>
```

#### d) Replace the encrypted content in the script tag:
Find this section:
```html
<script id="encrypted-poem-data" type="text/plain">
[OLD ENCRYPTED CONTENT HERE]
</script>
```

Replace `[OLD ENCRYPTED CONTENT HERE]` with the encrypted content you generated in Step 2.

#### e) Update the JavaScript configuration:
Find this section near the top of the `<script>` tag:
```javascript
// Poem configuration
const POEM_ID = 1;  // Change this to the poem number (2, 3, 4, etc.)
const ACCEPTABLE_PASSWORDS = ['violet']; // Add your password(s) here
const ENCRYPTED_FILE = 'poems/poem-1.encrypted'; // Update to poem-2.encrypted, etc.
```

Update:
- `POEM_ID`: Set to the poem number (2, 3, 4, etc.)
- `ACCEPTABLE_PASSWORDS`: Array of acceptable passwords (case insensitive)
- `ENCRYPTED_FILE`: Update to match the poem number (only needed if hosting on a server)

**Note**: Max attempts = POEM_ID × 10 (poem 2 = 20 attempts, poem 3 = 30 attempts, etc.)

### Step 4: Update the Listing Page (Optional)
If you want the poem to appear on `antimemetic-poetics.html`, add a new list item:
```html
<li><a href="antimemetic-poem-2.html">two</a></li>
```

### Step 5: Create Encrypted File (For Server Hosting)
If you're hosting on GitHub Pages or another server:
1. Create a file: `poems/poem-2.encrypted` (replace 2 with your poem number)
2. Paste the encrypted content from Step 2 into this file
3. The page will automatically use the file when accessed via http/https

## Example: Adding Poem 2

### Configuration:
- **Title**: "Second Poem"
- **Epigraph**: "An example epigraph"
- **Password**: "secret" (case insensitive)
- **POEM_ID**: 2
- **Max Attempts**: 20 (2 × 10)

### JavaScript Config:
```javascript
const POEM_ID = 2;
const ACCEPTABLE_PASSWORDS = ['secret'];
const ENCRYPTED_FILE = 'poems/poem-2.encrypted';
```

## Important Notes

1. **Password Security**: Remember, this is client-side encryption (obfuscation, not true security). Anyone determined can extract the encrypted content and decrypt it.

2. **Encrypted Content**: The encrypted content is unique each time you generate it (due to random salt/IV). Make sure to use the exact encrypted content you generated for your password.

3. **Line Breaks**: Use "/" marks in your poem text where you want line breaks. The system will automatically convert them to line breaks.

4. **Attempt Tracking**: Each poem has its own attempt counter stored in localStorage. Attempts reset daily at midnight Eastern time.

5. **Testing**: Always test the new poem page:
   - Verify the password works
   - Check that wrong passwords increment attempts
   - Verify the poem displays correctly with line breaks
   - Test the "forget" button

## Troubleshooting

- **Decryption fails**: Make sure you used the encrypted content generated with the same password you're testing
- **Poem doesn't appear**: Check browser console (F12) for errors
- **Attempts not tracking**: Clear localStorage and try again, or check that POEM_ID is set correctly

