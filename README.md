# Next-Gen App Enhancement

A modular React + Firestore project designed to enhance options strategy generation, simulation, and prompt tuning — powered by AI and enriched with real-time filtering logic.

---

## 🚀 Features

- 🔮 Gemini prompt tuner with real-time variant testing
- 📊 Strategy payoff simulator with multi-strike visualization
- 🛠 Admin suite for prompt feedback and tuning
- 🔗 Firestore schema + seed data for immediate testing
- ⚙️ Modular hooks, parsers, and enrichment layers

---

## 🧱 Project Structure

```
components/         → Prompt tools, admin UIs, simulator
hooks/              → Prompt test harness hooks
lib/                → Strategy enrichment, parsing, and scoring
pages/admin/        → Admin routes: logs, prompt-tuner, compare
seed/               → Sample logs and prompt variants
firestore/schema.md → Firestore schema reference
```

---

## 🧪 Setup Instructions

1. **Install dependencies**  
   ```bash
   npm install
   ```

2. **Start the dev server**
   ```bash
   npm run dev
   ```

3. **Configure Firebase**
   - Create a Firestore DB.
   - Add `strategyLogs` and `promptVariants` collections.
   - Import mock data from `seed/` folder or admin UI.

---

## ⚡ Prompt Testing

Use `/admin/prompt-tuner` to run Gemini templates live with your `generateText()` hook.

## 🧠 Strategy Logs

View and tag generated strategies via `/admin/logs`. Supports feedback tagging for:
- 👍 good
- 👎 bad
- 🔧 needs_tuning

## 🎛 Prompt Comparison Tool

Use `/admin/compare` to A/B outputs from different prompt variants.

## 📄 Firestore Setup

See `firestore/schema.md` for collection structure and data types.

## 🪄 Next Up

- Add scoring dashboard
- Integrate prompt performance tracking
- Deploy as internal AI strategy assistant

Crafted for strategy builders, traders, and AI tinkerers who demand clarity, flexibility, and control.
---
