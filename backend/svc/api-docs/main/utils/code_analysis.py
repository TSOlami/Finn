import os
from radon.raw import analyze

def analyze_codebase(repo_dir, supported_file_types):
    results = []

    for root, dirs, files in os.walk(repo_dir):
        for file in files:
            if any(file.endswith(file_type) for file_type in supported_file_types):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    analysis = analyze(content)
                    results.append({
                        'file': file_path,
                        'loc': analysis.loc,
                        'lloc': analysis.lloc,
                        'sloc': analysis.sloc,
                        'functions': len(analysis.functions),
                        'complexity': analysis.total_complexity,
                    })

    return results
