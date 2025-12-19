# Antimemetic Poetics - Site Runbook

## Site Overview

This website features an "antimemetic poetics" section where poems are encrypted and password-protected. The system uses client-side encryption (AES-GCM) to protect poem content, though it's important to note this is obfuscation rather than true security - determined users can extract and decrypt the content.

## How It Works

### Architecture

1. **Encryption**: Poems are encrypted using AES-GCM with PBKDF2 key derivation (100,000 iterations)
2. **Storage**: Encrypted content is embedded directly in HTML files (in `<script type="text/plain">` tags)
3. **Decryption**: Happens client-side using Web Crypto API when correct password is entered
4. **Attempt Tracking**: Uses localStorage to track password attempts per user, per poem
5. **Daily Reset**: Attempt counters reset at midnight Eastern Time

### User Flow

1. User visits `antimemetic-poetics.html` (listing page)
2. Clicks on a poem number (e.g., "one", "two")
3. Sees poem title, epigraph (password hint), and password form
4. Enters password (case-insensitive)
5. If correct: Poem is decrypted and displayed, attempts reset
6. If incorrect: Attempt counter increments, error message shown
7. Max attempts = poem number × 10 (poem 1 = 10, poem 2 = 20, etc.)
8. When max attempts reached: User must wait until midnight EST
9. After reading: User can click "forget" to reset the page

### Technical Details

- **Encryption Format**: `salt (16 bytes) + IV (12 bytes) + ciphertext + authTag (16 bytes)`, all base64 encoded
- **Password Derivation**: PBKDF2 with SHA-256, 100,000 iterations
- **Storage**: localStorage (works with `file://` protocol, unlike cookies)
- **Tracking**: Google Analytics events for password attempts, successes, failures, and poem views

## File Structure

```
poems/
  poem-1.txt          # Plaintext poem (with actual line breaks)
  poem-1.json         # Metadata (title, epigraph, password, etc.)
  poem-2.txt
  poem-2.json
  ...

antimemetic-poetics.html    # Listing page
antimemetic-poem-1.html     # Individual poem pages
antimemetic-poem-2.html
...

js/
  antimemetic.js      # Encryption/decryption and attempt tracking logic

css/
  antimemetic.css     # Styling

encrypt-poem.py       # Script to encrypt poems and update HTML
```

## Adding a New Poem

### Quick Start

1. **Create poem files:**
   ```bash
   python3 create-poem.py 3
   ```
   This creates template files for poem 3.

2. **Edit the files:**
   - `poems/poem-3.txt` - Write your poem (use actual line breaks)
   - `poems/poem-3.json` - Fill in metadata

3. **Encrypt and update HTML:**
   ```bash
   python3 encrypt-poem.py 3
   ```

4. **Add to listing page:**
   Edit `antimemetic-poetics.html` and add:
   ```html
   <li><a href="antimemetic-poem-3.html">three</a></li>
   ```

5. **Create the HTML page:**
   The script will create `antimemetic-poem-3.html` automatically, but if it doesn't exist, copy from an existing poem page and update the POEM_ID.

### Detailed Steps

#### Step 1: Create Poem Files

Use the helper script:
```bash
python3 create-poem.py <poem_number>
```

Or manually create:
- `poems/poem-{number}.txt` - The poem text
- `poems/poem-{number}.json` - Metadata (see template below)

#### Step 2: Fill in Metadata (poem-{number}.json)

```json
{
  "title": "Your Poem Title",
  "epigraph": "Your epigraph text here",
  "epigraph_attribution": "after Author Name" or null,
  "passwords": ["password1", "password2"],
  "publication_date": "December 19, 2025",
  "difficulty": "γ"
}
```

**Notes:**
- `epigraph_attribution`: Set to `null` if no attribution needed
- `passwords`: Array of acceptable passwords (case-insensitive)
- `difficulty`: Greek letter corresponding to poem number:
  - 1 = α (alpha)
  - 2 = β (beta)
  - 3 = γ (gamma)
  - 4 = δ (delta)
  - etc.

#### Step 3: Write the Poem (poem-{number}.txt)

Write your poem with actual line breaks. Each line will be preserved when encrypted/decrypted.

Example:
```
First line of the poem
Second line of the poem
Third line continues here
```

#### Step 4: Encrypt and Update HTML

```bash
python3 encrypt-poem.py <poem_number>
```

This will:
- Read the poem text from `poems/poem-{number}.txt`
- Read metadata from `poems/poem-{number}.json`
- Encrypt the poem using the first password from the JSON
- **Automatically create** `antimemetic-poem-{number}.html` if it doesn't exist (from template)
- **Or update** the existing HTML file with:
  - Title (in `<title>` and `<h1>`)
  - Epigraph (with attribution if present)
  - Password(s) in JavaScript
  - Publication date
  - Difficulty
  - Encrypted poem content
  - POEM_ID in JavaScript

#### Step 5: Add to Listing Page

Edit `antimemetic-poetics.html` and add a new list item:
```html
<li><a href="antimemetic-poem-3.html">three</a></li>
```

**Note**: The HTML file is automatically created by the encryption script, so you don't need to manually create it!

#### Step 6: Test

1. Open the poem page in your browser
2. Try the correct password - poem should decrypt
3. Try wrong passwords - attempts should increment
4. Verify max attempts work (poem number × 10)
5. Test "forget" button
6. Check that publication date and difficulty display correctly

## Helper Script: create-poem.py

The `create-poem.py` script creates template files for new poems:

```bash
python3 create-poem.py 3
```

This creates:
- `poems/poem-3.txt` (with placeholder text)
- `poems/poem-3.json` (with template metadata)

You then edit these files and run `encrypt-poem.py` to generate the HTML.

## Encryption Script: encrypt-poem.py

The main script for encrypting poems and updating HTML:

```bash
# Encrypt and update HTML (default)
python3 encrypt-poem.py 3

# Just encrypt, don't update HTML
python3 encrypt-poem.py 3 --no-update-html
```

**Requirements:**
- Python 3
- `cryptography` library: `pip3 install cryptography`

## How Encryption Works

1. **Key Derivation**: Password + random salt → PBKDF2 (100k iterations) → AES-256 key
2. **Encryption**: Poem text → AES-GCM encryption → ciphertext + auth tag
3. **Storage**: `salt + IV + ciphertext + authTag` → base64 encoded → embedded in HTML

## How Decryption Works

1. User enters password
2. Extract salt, IV, and ciphertext from embedded encrypted data
3. Derive key from password + salt (same PBKDF2 process)
4. Decrypt using AES-GCM
5. Display poem with preserved line breaks

## Attempt Tracking

- **Storage**: localStorage (key: `antimemetic_attempts_{poem_id}`)
- **Format**: `{count: number, date: "YYYY-MM-DD", poemId: number}`
- **Reset**: Automatically resets when date changes (midnight EST)
- **Max Attempts**: `poem_id × 10`
- **Per User**: Each browser/device has separate attempt tracking

## Google Analytics Tracking

Events tracked:
- `password_attempt` - Incorrect password entered
- `password_success` - Correct password entered
- `poem_decrypted` - Poem successfully decrypted
- `password_attempts_exceeded` - Max attempts reached
- `poem_forgotten` - User clicked "forget" button
- `page_view` - Page views on all antimemetic pages

All events include:
- `poem_id` - Which poem
- `user_id` - Unique user identifier (persists across sessions)
- `attempt_count` - Current attempt number
- `remaining_attempts` - Attempts left

## Troubleshooting

### Poem won't decrypt
- Verify password in JSON matches what you're testing
- Check that encrypted content was generated with the same password
- Look at browser console (F12) for errors

### Attempts not tracking
- Clear localStorage: `localStorage.clear()` in browser console
- Check that POEM_ID matches the poem number
- Verify date hasn't changed (attempts reset at midnight EST)

### HTML not updating
- Check that `encrypt-poem.py` ran successfully
- Verify JSON file has all required fields
- Check file permissions

### Encryption script fails
- Ensure `cryptography` library is installed: `pip3 install cryptography`
- Check Python version: `python3 --version` (needs 3.6+)
- Verify JSON file is valid JSON

## Security Notes

⚠️ **Important**: This is client-side encryption/obfuscation, not true security.

- Encrypted content is embedded in HTML (visible in page source)
- Determined users can extract and decrypt the content
- Passwords are discoverable in the JavaScript source code
- The system is designed for artistic/experimental purposes, not security

The hint message when attempts are exceeded acknowledges this limitation.

## Maintenance

### Updating a Poem

1. Edit `poems/poem-{number}.txt` or `poems/poem-{number}.json`
2. Run: `python3 encrypt-poem.py {number}`
3. Test the updated poem

### Changing a Password

1. Update `passwords` array in `poems/poem-{number}.json`
2. Run: `python3 encrypt-poem.py {number}`
3. Note: This will re-encrypt the poem with the new password

### Updating Publication Date

1. Edit `publication_date` in `poems/poem-{number}.json`
2. Run: `python3 encrypt-poem.py {number}`

## Greek Alphabet for Difficulty

- 1 = α (alpha)
- 2 = β (beta)
- 3 = γ (gamma)
- 4 = δ (delta)
- 5 = ε (epsilon)
- 6 = ζ (zeta)
- 7 = η (eta)
- 8 = θ (theta)
- 9 = ι (iota)
- 10 = κ (kappa)

