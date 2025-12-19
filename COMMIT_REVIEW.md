# Pre-Commit Security Review

## Files Excluded from Git (.gitignore)

The following helper/temporary files are excluded and will NOT be committed:
- `encrypt-helper.html` - Helper for generating encrypted content
- `encrypt-poem.js` - Node.js encryption script
- `encrypt-poem.py` - Python encryption script  
- `generate-encrypted.html` - Helper for generating encrypted content
- `generate-poem-2.html` - Helper for generating poem 2 encrypted content
- `test-setup.html` - Helper for generating encrypted content
- `.cursor/debug.log` - Debug logs

**Why excluded:** These files are development tools that could be used to regenerate encrypted content or test encryption. They're not needed for the live site.

## Files Safe to Commit

### Core Site Files
- `index.html` - Main homepage
- `antimemetic-poetics.html` - Listing page
- `antimemetic-poem-1.html` - Poem 1 page
- `antimemetic-poem-2.html` - Poem 2 page
- `css/antimemetic.css` - Styling
- `js/antimemetic.js` - Encryption/decryption logic

### Encrypted Content
- `poems/poem-1.encrypted` - Encrypted poem file (for server hosting)
- Encrypted content embedded in HTML `<script>` tags

**Why safe:** 
- Encrypted content requires the password to decrypt
- Even if someone extracts the encrypted content, they still need the password
- This is client-side obfuscation (not true security), but the encrypted content itself is safe to commit

### Configuration
- Passwords are stored in `ACCEPTABLE_PASSWORDS` arrays in HTML files

**Why safe:**
- These are for client-side validation only
- The actual decryption still requires the correct password
- Anyone determined can extract and decrypt anyway (as designed - this is obfuscation, not true security)
- The passwords are hints from epigraphs, so they're meant to be discoverable

### Documentation
- `ADDING_NEW_POEMS.md` - Instructions for adding new poems
- `README.md` - Project readme

## Security Notes

1. **Client-Side Encryption**: The encryption/decryption happens in the browser. This is obfuscation, not true security. Anyone determined can extract the encrypted content and decrypt it.

2. **Password Storage**: Passwords are in the HTML files for validation, but the encrypted content still requires the exact password used during encryption to decrypt.

3. **No Server Secrets**: There are no server-side secrets or API keys. Everything is client-side.

4. **Helper Files**: The helper files for generating encrypted content are excluded, so others can't easily regenerate encrypted content with different passwords.

## What Others Can Do (Even After Commit)

- View the encrypted content (it's in the HTML files)
- View the password validation logic
- Extract and attempt to decrypt (requires knowing/guessing the password)
- View the attempt tracking logic

## What Others Cannot Do (Because Files Are Excluded)

- Regenerate encrypted content easily (helper files are excluded)
- Modify encryption without understanding the code
- Access debug logs

## Recommendation

✅ **Safe to commit** - The current setup is appropriate for a static site with client-side encryption. The helper files are excluded, and the encrypted content requires passwords to decrypt.

