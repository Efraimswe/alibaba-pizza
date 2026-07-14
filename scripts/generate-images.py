#!/usr/bin/env python3
"""Генерация фото блюд: pollinations (белый фон) -> rembg -> прозрачный PNG.

Читает scripts/image-manifest.json, пропускает уже готовые файлы (резюмируемо).
Запуск из корня проекта: python3 scripts/generate-images.py
"""
import json
import pathlib
import subprocess
import sys
import threading
import time
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor

ROOT = pathlib.Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "scripts" / "image-manifest.json"
TMP = ROOT / "scripts" / ".imggen-tmp"
TMP.mkdir(exist_ok=True)
REMBG = pathlib.Path.home() / ".local" / "bin" / "rembg"

entries = json.loads(MANIFEST.read_text())
todo = [e for e in entries if not (ROOT / e["file"]).exists()]
print(f"total {len(entries)}, todo {len(todo)}", flush=True)

fails = []
done_count = [0]
lock = threading.Lock()


def gen(e):
    out = ROOT / e["file"]
    out.parent.mkdir(parents=True, exist_ok=True)
    seed = abs(hash(e["file"])) % 100000
    url = (
        "https://image.pollinations.ai/prompt/"
        + urllib.parse.quote(e["prompt"])
        + f"?width={e['w']}&height={e['h']}&nologo=true&seed={seed}"
    )
    jpg = TMP / (out.stem + ".jpg")
    ok = False
    for attempt in range(5):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "curl/8"})
            with urllib.request.urlopen(req, timeout=180) as r:
                data = r.read()
            if len(data) < 5000:
                raise RuntimeError(f"too small: {len(data)}")
            jpg.write_bytes(data)
            ok = True
            break
        except Exception as ex:
            wait = 30 * (attempt + 1)
            print(f"retry {attempt+1} {out.name}: {ex} (sleep {wait}s)", flush=True)
            time.sleep(wait)
    if not ok:
        with lock:
            fails.append(e["file"])
        return
    r = subprocess.run([str(REMBG), "i", str(jpg), str(out)], capture_output=True, text=True)
    if r.returncode != 0 or not out.exists():
        print(f"rembg FAIL {out.name}: {r.stderr[-200:]}", flush=True)
        with lock:
            fails.append(e["file"])
        return
    jpg.unlink(missing_ok=True)
    with lock:
        done_count[0] += 1
        print(f"[{done_count[0]}/{len(todo)}] done {e['file']}", flush=True)
    time.sleep(8)


with ThreadPoolExecutor(max_workers=1) as pool:
    list(pool.map(gen, todo))

print(f"finished, fails: {len(fails)}", flush=True)
for f in fails:
    print("FAIL", f, flush=True)
sys.exit(1 if fails else 0)
