# Encrypting Poems

## Quick Setup

1. Install the cryptography library:
   ```bash
   pip3 install cryptography
   ```

2. Edit the poem text in `poems/poem-{number}.txt`
3. Edit the metadata in `poems/poem-{number}.json` (title, epigraph, password, etc.)

4. Run the encryption script:
   ```bash
   python3 encrypt-poem.py 2
   ```

That's it! The script will:
- Read the poem from `poems/poem-2.txt`
- Read metadata from `poems/poem-2.json`
- Encrypt the poem with the password from JSON
- Automatically update `antimemetic-poem-2.html` with:
  - Title
  - Epigraph (and attribution if present)
  - Password(s)
  - Publication date
  - Difficulty
  - Encrypted poem content

## Usage

```bash
# Encrypt poem 1 and update HTML (default behavior)
python3 encrypt-poem.py 1

# Encrypt poem 2 and update HTML
python3 encrypt-poem.py 2

# Just encrypt and show output (don't update HTML)
python3 encrypt-poem.py 2 --no-update-html
```

## File Structure

For each poem, you need:

1. **`poems/poem-{number}.txt`** - The poem text (use `/` to separate lines)
2. **`poems/poem-{number}.json`** - Metadata:
   ```json
   {
     "title": "Poem Title",
     "epigraph": "Epigraph text here",
     "epigraph_attribution": "after Author Name" or null,
     "passwords": ["password1", "password2"],
     "publication_date": "December 19, 2025",
     "difficulty": "α"
   }
   ```

## Adding New Poems

1. Create `poems/poem-{number}.txt` with the poem text
2. Create `poems/poem-{number}.json` with all metadata
3. Run: `python3 encrypt-poem.py {number}`
4. The script will automatically create/update `antimemetic-poem-{number}.html`

