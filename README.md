# JelajahKita

> **Bermain bersama, tumbuh bersama.**  
> A warm, cooperative family journey game designed for shared play on one device.

JelajahKita is a mobile-first, offline-first board game for **2–4 players**. The game is built around a simple idea: the family is on the same journey, so the goal is to **finish together**, not to beat each other.

The current MVP is implemented as a lightweight **Vanilla HTML/CSS/JavaScript web app**. It is designed to run offline and is intentionally structured so the same experience can later be packaged for Android using a WebView shell.

---

## ✨ Highlights

- **2–4 players** on one shared device
- **28-space cooperative board**
- **32 reflection cards**
  - 8 × HATI
  - 8 × CERITA
  - 8 × MIMPI
  - 8 × AKSI
- **6-sided tactile dice interaction**
- Special movement tiles such as **+2** and **−1**
- Individual player pawns with distinct colors and initials
- Card/reflection modal with bilingual content
- Cooperative milestone progress
- End-of-journey celebration screen
- **Indonesian / English** language toggle
- Offline-first: **no backend and no runtime network dependency**
- Responsive layout for mobile-sized screens
- Designed for future **Android WebView** packaging

---

## 🎲 Game Flow

```text
Player Setup
     │
     ▼
  Main Game
     │
     ├── Roll Dice
     │
     ├── Move Pawn
     │
     ├── Resolve Tile
     │       ├── Normal
     │       ├── +2
     │       ├── −1
     │       └── Reflection Card
     │
     ├── Continue Turn
     │
     └── Repeat
     │
     ▼
All Players Reach Finish
     │
     ▼
Completion Celebration
```

The core loop is deliberately simple so the family can focus on playing and talking together.

---

## 🗺️ Board

The MVP uses a **28-space S-curve board**.

```text
28  27  26  25  24  23  22
15  16  17  18  19  20  21
14  13  12  11  10   9   8
 1   2   3   4   5   6   7
```

Movement follows the journey from **START (1)** to **FINISH (28)**.

### Tile Types

| Type | Purpose |
|---|---|
| START | Beginning of the journey |
| PATH | Normal movement |
| HATI | Draw a heart/reflection card |
| CERITA | Draw a story card |
| MIMPI | Draw a dream card |
| AKSI | Draw an action card |
| MAJU_2 | Move forward 2 spaces |
| KEMBALI_1 | Move back 1 space |
| FINISH | Reach the shared destination |

---

## 💛 Reflection Card Deck

JelajahKita includes a 32-card bilingual deck:

| Category | Cards |
|---|---:|
| HATI | 8 |
| CERITA | 8 |
| MIMPI | 8 |
| AKSI | 8 |
| **Total** | **32** |

The cards are designed to be:

- family-friendly
- warm and playful
- easy to answer aloud
- cooperative rather than competitive
- suitable for casual family play

The approved deck lives in:

```text
web/data/card-deck.json
```

---

## 🎨 Design Direction

JelajahKita uses a **Warm Tactile Family Board Game** visual language.

### Palette

| Role | Color |
|---|---|
| Forest Green | `#1E3F2D` |
| Amber | `#E6A23C` |
| Terracotta | `#E27D60` |
| Lake Blue | `#6890AA` |
| Sage | `#8FA88D` |
| Bark | `#2C2B28` |
| Ivory / Cream | warm neutral surfaces |

The UI intentionally uses rounded surfaces, tactile shadows, stitched/card-like treatments, organic paths, and warm neutral backgrounds to make the interface feel closer to a physical family board game than a typical utility app.

---

## 🌐 Tech Stack

### Current Web MVP

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- SVG icons / illustrations
- Local JSON data
- Browser `sessionStorage` for active game/session state
- No framework
- No backend
- No runtime API calls

### Why Vanilla?

The MVP intentionally keeps the runtime small and transparent. The game rules are pure client-side logic, making the project easy to run locally, test, and later embed inside an Android WebView.

---

## 📱 Responsive & Offline-First

The interface is designed around mobile dimensions approximately in the range of:

```text
360 × 640
      to
430 × 932
```

The game does not require an internet connection after the project files are available locally.

This makes it suitable for:

- one-device family play
- classroom/demo environments
- offline demos
- future Android WebView packaging

---

## 📁 Project Structure

```text
JelajahKitaV1/
├── web/
│   ├── index.html
│   ├── game.html
│   │
│   ├── css/
│   │   ├── base.css
│   │   ├── design-system.css
│   │   ├── game-board.css
│   │   └── card.css
│   │
│   ├── js/
│   │   ├── icons.js
│   │   ├── i18n.js
│   │   ├── game.js
│   │   └── card.js
│   │
│   ├── data/
│   │   └── card-deck.json
│   │
│   └── assets/
│       └── ...
│
└── jelajahkita_prd_game_brief.md
```

---

## 🚀 Run Locally

Because this is a static web app, there is no build server or backend required.

The easiest option is **VS Code Live Server**.

1. Open the project in VS Code.
2. Start Live Server on the `web/` directory.
3. Open the generated local URL in a browser.
4. Start a new game from Player Setup.

Example:

```text
http://127.0.0.1:5500/web/
```

> Use a local HTTP server rather than opening the HTML files directly with `file://`, especially for local JSON loading.

---

## 🧩 Architecture

The game is intentionally divided into small client-side responsibilities:

```text
UI
│
├── Player Setup
│
├── Game Board
│     ├── Board rendering
│     ├── Player movement
│     ├── Dice
│     └── Tile resolution
│
├── Card System
│     ├── Deck loading
│     ├── Category rendering
│     └── Card modal
│
├── i18n
│     └── ID / EN
│
└── Completion
      └── Cooperative celebration
```

The game logic does not depend on Compose, Android APIs, a server, or a database. That separation is intentional so the web MVP can become the UI/runtime inside a future Android shell.

---

## 🛡️ Product Principles

JelajahKita is designed around a few deliberate non-goals.

There is:

- no money system
- no property ownership
- no bankruptcy
- no player elimination
- no ranking
- no leaderboard
- no winner / loser framing

The central objective is simply:

> **Everyone reaches the finish together.**

---

## 🧪 Current MVP Status

### Completed

- Player Setup
- 2–4 player configuration
- Responsive game board
- 28-space S-curve layout
- Dice interaction
- Turn management
- Player movement
- Special movement tiles
- 32-card bilingual deck
- Reflection Card Modal
- Cooperative milestone tracker
- Exit confirmation flow
- Completion celebration screen
- Indonesian / English UI
- Offline local data flow

### Next Step

**Android packaging**

The next phase is to bring the completed web experience into an Android application using a WebView-based shell while preserving the existing game rules and visual system.

---

## 🛣️ Roadmap

```text
✅ Web MVP
   │
   ├── Player Setup
   ├── Main Game
   ├── Card System
   ├── Completion
   └── ID / EN
        │
        ▼
🚧 Android WebView
        │
        ├── Android shell
        ├── App icon / splash
        ├── system Back integration
        ├── safe-area handling
        └── offline packaged assets
        │
        ▼
🎯 Android Release Candidate
```

---

## 📸 Screens

Recommended README screenshots:

```text
docs/
├── player-setup.png
├── main-game.png
├── card-modal.png
└── completion.png
```

Add the screenshots to the repository and reference them here when the final repository structure is ready.

---

## ❤️ Philosophy

JelajahKita is not built around competition.

It is built around a shared table, a shared journey, and small moments of conversation.

> **Bermain bersama, tumbuh bersama.**

---

## 📄 License

Add the project's chosen license here before publishing the repository.

---

## 👨‍💻 Project

**JelajahKita V1**  
Family Cooperative Journey Game  
Web-first MVP → Android WebView

