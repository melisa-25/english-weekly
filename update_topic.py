import json
from datetime import datetime

with open("bank_materi.json", "r", encoding="utf-8") as f:
    bank = json.load(f)

try:
    with open("topics.json", "r", encoding="utf-8") as f:
        current = json.load(f)
        current_week = current.get("week", 0)
except FileNotFoundError:
    current_week = 0

# Pilih minggu berikutnya (berputar kembali ke minggu 1 jika sudah habis)
next_index = current_week % len(bank)
next_topic = bank[next_index].copy()
next_topic["updated_at"] = datetime.utcnow().strftime("%Y-%m-%d")

with open("topics.json", "w", encoding="utf-8") as f:
    json.dump(next_topic, f, indent=2, ensure_ascii=False)

print(f"Updated to Week {next_topic['week']}")
