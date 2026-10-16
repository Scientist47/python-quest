# Python Quest

A game for learning Python, on the web and Android. Players work through 24 levels across 7 worlds. They write and run real Python code right in the browser, and they earn XP, stars, streaks and trophies along the way.

The whole game is one HTML file with no server or sign-up. This project also wraps it as an Android app.

---

## Features

- **Real Python in the browser.** Code runs with [Skulpt](https://skulpt.org), so there's nothing to install.
- **24 levels in 7 worlds.** Each level has a short lesson, an example you can run, a "predict the output" question and a coding challenge.
- **Boss fights** at the end of four worlds. Each one combines everything taught so far.
- **Three difficulty levels:** Beginner, Intermediate and Expert.
- **Practice Arena.** Questions are generated fresh every round and weighted toward the levels you've missed most.
- **Game systems:** hearts, 1–3 stars per level, XP and ranks, daily streaks, combos and 18 trophies.
- **Built for phones.** It has a symbol-key bar (`( ) : " = [ ]` and Tab) and auto-indentation, so writing code on an Android keyboard is practical.
- **Light and dark themes.** It follows the device setting.

---

## How to play

1. Tap the first level on the map.
2. Read the lesson and press **Run this example** to see the code in action.
3. Answer the **predict the output** question.
4. Solve the **code challenge**:
   - **Run** is free. Use it to experiment as often as you like.
   - **Check** submits your code. A wrong check costs a heart.
5. Finish with hearts left to earn stars and unlock the next level.

If you run out of hearts, the level restarts. Progress on other levels is never lost.

### Difficulty

| | Hearts | Hints | Answer shown | Quiz style | XP |
|---|---|---|---|---|---|
| **Beginner** | 5 | Free | After 1 failed check | Multiple choice | 1× |
| **Intermediate** | 3 | Cost 5 XP | After 2 failed checks | Multiple choice | 1.5× |
| **Expert** | 2 | None | Never | Type the exact output | 2× |

On Expert, the starter code also has its helper comments removed.

The difficulty can be changed at any time from the map. Each cleared level shows a tag for the hardest difficulty it was beaten on. Replaying a level on a harder difficulty earns its full XP again. Replaying on the same difficulty only earns XP for new stars.

### Stars

Stars depend on how many hearts you lose in a level:

| Hearts lost | Stars |
|---|---|
| 0 | 3 |
| 1 | 2 |
| 2 or more | 1 |

### Practice Arena

Practice unlocks after you clear your first level.

- **Round size:** each round has 8 questions taken from the levels you've cleared.
- **Mix of questions:**
  - Most quiz questions are generated with new values every time.
  - The correct answer is worked out by running the code in Python.
  - The wrong options come from common mistakes, like going one step too far with `range` or mixing up `//` and `%`.
  - Each round also includes 1 code challenge on Beginner, or 2 on the higher difficulties.
- **Weak spots:**
  - A wrong answer anywhere in the game marks that level as a weak spot.
  - Weak-spot levels come up more often in practice.
  - Getting their questions right in practice clears the mark.
- **Combos:**
  - Each answer that's right on the first try raises your combo.
  - Quiz XP is 5 × your combo, up to 5×.
  - A wrong answer resets the combo to zero.
- **No hearts:** practice never ends early.

### Ranks

| XP | Rank |
|---|---|
| 0 | Hatchling |
| 80 | Coiler |
| 200 | Scripter |
| 380 | Pythonista |
| 600 | Serpent Sage |
| 880 | Code Wizard |
| 1200 | Python Legend |

---

## Curriculum

| World | Levels | Topics |
|---|---|---|
| 1. The Hatchery | Say Hello · Name Your Boxes · Number Crunch · String Theory | `print`, variables, `+ - * / // % **`, `len`, `.upper()`, f-strings |
| 2. Fork in the Path | True or False · Choose Your Path · Many Roads | comparisons, `and`/`or`, `if`/`else`, `elif` |
| 3. Loop Caves | Loop the Loop · Loot Bag · Treasure Count | `for`, `range`, lists, `append`, running totals, `while` |
| 4. Function Forge | Spell Crafting · The Inventory · **Boss: The Vowel Serpent** | `def`, `return`, dictionaries |
| 5. Slice Market | Slice It Up · Split the Bill · Clean-Up Crew · **Boss: The Mirror Merchant** | slicing, negative indexes, `split`/`join`, `strip`/`lower`/`replace` |
| 6. Error Swamp | Shape Shifters · Catch the Bug · **Boss: The Swamp Gremlin** | `int`/`str`/`float`, `try`/`except ValueError` |
| 7. Class Citadel | List Magic · Blueprints · Spellbook Methods · **Final Boss: The Python King** | list comprehensions, classes, `__init__`, `self`, methods |

---

## How answers are checked

A code challenge can be checked in up to three ways:

1. **Output.** What your code prints must match the expected output. Trailing spaces are ignored.
2. **Hidden tests.** For functions and classes, extra `assert` lines run after your code with different inputs. This means hard-coding the answer doesn't pass.
3. **Required features.** Some challenges check that you used the concept being taught. For example, a loop challenge needs a `for` loop rather than five `print` lines.

Error messages are rewritten in plain language. For example, a `NameError` becomes:

> Python doesn't know the name "scroe". Check the spelling, or put text in quotes.

Programs that run longer than 3 seconds are stopped, so an infinite loop can't freeze the game.

---

## Putting the website online

1. Run `npm run build`, or use the ready-made `python-quest-site` folder.
2. Drag the `site/` folder onto [Netlify Drop](https://app.netlify.com/drop).
3. To test on your own computer instead, open `site/index.html`, or run:

```bash
npx serve site
```

The website loads the Python engine from the jsDelivr CDN, so players need internet the first time. The Android app has everything bundled and works offline.

---

## Project layout

```
python-quest-app/
├── src/index.html              ← the game (edit this one)
├── scripts/build.mjs           ← makes site/ and www/ from src/index.html
├── scripts/make-icons.py       ← redraws the app icon and splash screens
├── assets/icon-512.png         ← app icon (also used as the website icon)
├── android/                    ← the Android project (Capacitor)
├── .github/workflows/android.yml  ← builds the APK on GitHub for free
├── netlify.toml                ← settings if Netlify deploys from GitHub
├── capacitor.config.json
└── package.json
```

`npm run build` creates two folders. Both are generated, so don't edit them by hand:

| Folder | What it is | Python engine and fonts |
|---|---|---|
| `site/` | The website you put on Netlify | Loaded from the internet |
| `www/` | The game inside the Android app | Bundled, so the app works **offline** |

Inside the app, the "Download APK" card is hidden automatically.

---

## Building the Android app (free, using GitHub)

The APK is built on GitHub's servers, so you don't need Android Studio.

### 1. Put the project on GitHub

1. Create a free account at github.com.
2. Click **New repository**, name it `python-quest` and click **Create**.
3. On the empty repository page, click **uploading an existing file**.
4. Drag in **everything inside** the `python-quest-app` folder, including the `.github` folder.
   - On Windows, hidden folders may not show up. Turn on **View → Hidden items**.
   - On a Mac, press `Cmd + Shift + .` in Finder to show the `.github` folder.
5. Click **Commit changes**.

If the `.github` folder didn't upload, create the workflow by hand:
1. Go to **Actions → set up a workflow yourself**.
2. Name the file `android.yml`.
3. Paste in the contents of `.github/workflows/android.yml` and commit.

### 2. Add the signing key (once)

The signing key proves that each new version of the app comes from you. Without it, phones refuse to install updates over an older version.

1. In your repository, go to **Settings → Secrets and variables → Actions → New repository secret**.
2. Add two secrets, using the files in the separate `python-quest-signing-key` folder:

| Secret name | Value |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | The whole contents of `ANDROID_KEYSTORE_BASE64.txt` |
| `ANDROID_KEYSTORE_PASSWORD` | The contents of `ANDROID_KEYSTORE_PASSWORD.txt` |

> **Keep the signing key folder private and backed up.** Never upload it to GitHub or your website. If you lose it, you can't publish updates to the same app.

### 3. Build

1. Go to the **Actions** tab, open **Build Android app**, and click **Run workflow**.
2. The build takes about 5–10 minutes.
3. From then on, it also runs automatically every time you change files on the `main` branch.

### 4. Get the APK

When the run finishes with a green tick, open the **Releases** section on the right of your repository page and download `python-quest.apk`.

The newest version is always at this link:

```
https://github.com/YOUR-NAME/python-quest/releases/latest/download/python-quest.apk
```

### Installing on a phone

1. Open the APK on the phone.
2. When Android asks, allow your browser or file manager to **install unknown apps**.
3. Tap **Install**.

Apps installed this way update by installing a newer APK over the old one. Progress is kept, as long as the same signing key is used.

---

## Download link on the website

The game page has a **Python Quest for Android** card with a **Download APK** button. It links to whatever `APK_URL` is set to, near the top of the main script in `src/index.html`:

```js
const APK_URL = "python-quest.apk";
```

**Option A: host the APK next to the game on Netlify (works with drag and drop).**
1. Download `python-quest.apk` from your GitHub release.
2. Put it in the website folder next to `index.html`.
3. Drag the folder onto Netlify.

The card checks whether the file is there. If it is, the button shows the file size. If not, the card says "Coming soon" until you add it.

**Option B: link straight to GitHub (updates itself).**
1. Change the line to your release link:
   ```js
   const APK_URL = "https://github.com/YOUR-NAME/python-quest/releases/latest/download/python-quest.apk";
   ```
2. Upload the site once more.

After that, every new GitHub build is offered automatically, with no need to re-upload the website.

---

## Building on your own computer (optional)

This needs Node.js 22+, Java 21 and Android Studio.

```bash
npm install
npm run build          # makes site/ and www/
npm run android        # copies www/ into the app and opens Android Studio
```

In Android Studio, click **Run** to install the app on a connected phone or emulator.

To change the icon, edit and run `python3 scripts/make-icons.py .` (needs Pillow).

---

## Publishing on Google Play (later)

Play Store uploads need an **AAB** file instead of an APK. To make one:

1. In the workflow, change `assembleRelease` to `bundleRelease`.
2. Change the copied file to `app/build/outputs/bundle/release/app-release.aab`.

You'll also need a Google Play developer account. Use the same signing key.

---

## Saved progress

Progress is saved in the browser's `localStorage` under the key `pyquest.v1`. It includes XP, stars, best difficulty per level, weak spots, trophies, streak and the chosen difficulty.

Progress stays on that device and browser only. It isn't synced between devices. Clearing site data, or pressing **Reset progress** at the bottom of the map, erases it.

---

## Adding levels

All content lives in the `<script id="levels">` block near the top of `src/index.html`. Run `npm run build` after editing.

To add a world, add an entry to `WORLDS`:

```js
{ name: "World Name", desc: "One-line summary" }
```

To add a level, append an object to `LEVELS`:

```js
{
  id: "unique-id",
  world: 7,                 // index into WORLDS
  title: "Level Title",
  blurb: "Short subtitle",
  boss: false,              // optional: boss styling
  badge: "trophy-id",       // optional: trophy awarded on clear
  lesson: `<p>HTML lesson text…</p>`,
  example: `print("runnable example")`,
  steps: [
    { type: "quiz",
      code: `print(1 + 1)`,
      q: "What is printed?",
      options: ["11", "2", "1 + 1", "An error"],
      answer: 1,                         // index of the correct option
      why: "Explanation shown after answering." },
    { type: "code",
      prompt: "What the player must do (HTML allowed)",
      starter: `# starting code\n`,
      expect: "exact expected output",   // optional
      test: `assert f(2) == 4, "f(2) should be 4"`,  // optional hidden tests
      requires: ["\\bfor\\b"],           // optional regexes the code must match
      requiresMsg: "Use a for loop.",
      hint: "Hint text",
      solution: `the reference solution` }
  ]
}
```

To add practice questions for a level, add a generator to `GEN` with the same key as the level `id`. It returns:

- `code`: the question code
- `wrong`: code that models common mistakes
- `lit`: literal wrong answers
- `why`: the explanation shown after answering

The game runs all of the code to get the correct answer and the wrong options.

A level needs a matching generator before practice can generate questions for it. Levels without one still appear in practice using their own quiz and code challenge.

Before shipping new content, check two things for every challenge:

- the `solution` passes every check;
- the `starter` code does **not** pass.

---

## Known limitations

- **Python coverage.** Skulpt implements most of core Python 3, which covers everything in the curriculum. It does not support third-party libraries (NumPy, pandas), file access or `input()`. Some advanced standard-library modules are missing too.
- **No accounts.** Progress is per device. There's no syncing, leaderboard or teacher dashboard.
- **The website needs internet on first load** to fetch the Python engine (about 1 MB). The Android app works offline.

---

## Tech

- **App:** one self-contained HTML file with vanilla JavaScript and CSS, and no framework.
- **Python engine:** [Skulpt 1.2.0](https://github.com/skulpt/skulpt), loaded from jsDelivr.
- **Fonts:** Bungee, Nunito and JetBrains Mono. The website gets them from Google Fonts, and the app bundles them from Fontsource.
- **Android:** [Capacitor 8](https://capacitorjs.com) wraps the game in a native app. GitHub Actions builds and signs the APK.
