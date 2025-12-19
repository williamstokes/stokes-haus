# Encrypting Poems

## Quick Setup

1. Install the cryptography library:
   ```bash
   pip3 install cryptography
   ```

2. Edit the poem in `poems/poem-{number}.txt`

3. Run the encryption script:
   ```bash
   python3 encrypt-poem.py 2 --update-html
   ```

That's it! The script will:
- Read the poem from `poems/poem-2.txt`
- Encrypt it with the correct password
- Automatically update `antimemetic-poem-2.html`

## Usage

```bash
# Encrypt poem 1 and update HTML
python3 encrypt-poem.py 1 --update-html

# Encrypt poem 2 and update HTML
python3 encrypt-poem.py 2 --update-html

# Just encrypt and show output (don't update HTML)
python3 encrypt-poem.py 2

# Use a custom password
python3 encrypt-poem.py 3 --password "your password here" --update-html
```

## Adding New Poems

1. Create `poems/poem-{number}.txt` with the poem text
2. Add the password to the `PASSWORDS` dict in `encrypt-poem.py`
3. Run: `python3 encrypt-poem.py {number} --update-html`

