#!/usr/bin/env python3
"""
Create template files for a new poem.

Usage:
    python3 create-poem.py <poem_number>
    
Example:
    python3 create-poem.py 3
"""

import json
import sys
from pathlib import Path

# Greek alphabet for difficulty
GREEK_LETTERS = ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π', 'ρ', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω']

def get_greek_letter(number):
    """Get Greek letter for poem number (1-indexed)."""
    if number < 1 or number > len(GREEK_LETTERS):
        return 'α'  # Default
    return GREEK_LETTERS[number - 1]

def create_poem_files(poem_number):
    """Create template files for a new poem."""
    
    # Get Greek letter for difficulty
    difficulty = get_greek_letter(poem_number)
    
    # Create JSON template
    json_template = {
        "title": f"Poem {poem_number} Title",
        "epigraph": "Your epigraph text here",
        "epigraph_attribution": None,
        "passwords": ["your-password-here"],
        "publication_date": "December 19, 2025",
        "difficulty": difficulty
    }
    
    # Create text template
    text_template = f"""Write your poem here.
Use actual line breaks.
Each line will be preserved.
Edit this file with your poem text.
"""
    
    # File paths
    json_file = Path(f'poems/poem-{poem_number}.json')
    text_file = Path(f'poems/poem-{poem_number}.txt')
    
    # Check if files already exist
    if json_file.exists():
        print(f"⚠️  Warning: {json_file} already exists. Not overwriting.")
    else:
        with open(json_file, 'w') as f:
            json.dump(json_template, f, indent=2)
        print(f"✓ Created {json_file}")
    
    if text_file.exists():
        print(f"⚠️  Warning: {text_file} already exists. Not overwriting.")
    else:
        with open(text_file, 'w') as f:
            f.write(text_template)
        print(f"✓ Created {text_file}")
    
    print(f"\n📝 Next steps:")
    print(f"1. Edit {json_file} with your poem metadata")
    print(f"2. Edit {text_file} with your poem text")
    print(f"3. Run: python3 encrypt-poem.py {poem_number}")
    print(f"4. Add poem to antimemetic-poetics.html listing")

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 create-poem.py <poem_number>")
        print("Example: python3 create-poem.py 3")
        sys.exit(1)
    
    try:
        poem_number = int(sys.argv[1])
    except ValueError:
        print(f"Error: '{sys.argv[1]}' is not a valid poem number")
        sys.exit(1)
    
    if poem_number < 1:
        print("Error: Poem number must be 1 or greater")
        sys.exit(1)
    
    # Ensure poems directory exists
    Path('poems').mkdir(exist_ok=True)
    
    create_poem_files(poem_number)

if __name__ == '__main__':
    main()

