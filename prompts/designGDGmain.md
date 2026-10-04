# Code Roaster — Design Specification

**Product:** Code Roaster (Desi Edition)  
**Event:** DevFest Nashik 2026  
**Design reference:** https://devfest26.gdgnashik.com/  
**Source PRD:** Code-Roaster-PRD-v2.md  
**Design status:** Build-ready specification

---

## 1. Design Direction

Code Roaster should feel like a **DevFest Nashik 2026 side-quest**, not a generic AI dashboard.

The visual direction combines:

- DevFest Nashik's warm, editorial, Indian-local identity.
- A playful debugging-tool interface.
- Thick black outlines and hard offset shadows.
- Mustard yellow as the main action colour.
- Small Google-colour accents.
- Warli/rangoli-inspired decorative language.
- Desi/Hinglish microcopy without turning the interface into a caricature.

The DevFest site positions the 2026 edition around ideas moving from **seed → bloom → harvest → label**, with a strong Nashik identity and Warli-inspired illustrations. Code Roaster should borrow the **visual grammar**, not copy whole sections or layouts.

Reference observations from the live site:
- Warm off-white/cream surfaces.
- Heavy black typography and outlines.
- Rounded cards.
- Strong yellow/Google-colour accents.
- Warli-style illustration language.
- Marathi/Hinglish microcopy.
- Editorial section labels and large display headings.
- Nashik references such as Panchavati Express, misal and grapes.
- A deliberately local, playful tone.

---

## 2. Design Principles

### 2.1 Code is the hero

The interface exists to make the code → roast → fix loop immediately understandable.

Do not overdecorate the editor.

### 2.2 Brutal visual language, friendly UX

The product can look loud and cheeky, but controls must remain obvious and usable.

### 2.3 DevFest, not "AI SaaS"

Avoid:
- Generic purple AI gradients.
- Glassmorphism.
- Excessive neon.
- Floating chatbot aesthetics.
- Dark hacker-terminal styling.
- Generic dashboard charts.

### 2.4 Local without cliché overload

Use Nashik/Marathi details as accents:
- Marathi microcopy.
- Rangoli/Warli patterns.
- Small Nashik references.
- Occasional playful labels.

Do not cover the entire interface in Marathi or decorative cultural motifs.

---

# 3. Visual System

## 3.1 Colour tokens

```css
--cream: #F8F4EC;
--lavender: #EFF2FB;
--pale-yellow: #F7E3A8;

--ink: #141414;
--white: #FFFFFF;

--mustard: #EDB13E;

--google-blue: #4C80F0;
--google-red: #D9503F;
--google-green: #4FA35A;
--google-yellow: #EDB13E;

--muted-ink: #66625B;
--editor-bg: #171717;
--editor-ink: #F7F3EA;
```

### Colour usage

**Cream**
- Main page background.
- Large breathing areas.

**Mustard**
- Primary CTA.
- Active states.
- Roast score emphasis.
- Small highlight elements.

**Blue / red / green**
- Category borders.
- Severity states.
- Small decorative dots.
- Never use colour alone to communicate meaning.

**Near-black**
- Typography.
- Borders.
- Shadows.
- Icons.

---

# 4. Typography

Use:

### Display
A bold rounded geometric sans similar in character to the DevFest site.

Recommended:
- Google Sans Flex / Google Sans where available.
- Fallback: `Arial Rounded MT Bold`, `Inter`, sans-serif.

### UI
`Inter`

### Code
`JetBrains Mono`

### Marathi/Hindi UI microcopy
`Noto Sans Devanagari`

### Labels

Use monospace uppercase labels with generous tracking:

```text
INPUT // SRC
AUDIT // REPORT
ROAST LEVEL
PERSONA
LANGUAGE
REDEMPTION ARC
MADE BY
```

Suggested:

```css
font-size: 11px;
font-weight: 700;
letter-spacing: 0.12em;
text-transform: uppercase;
```

---

# 5. Shape Language

## Cards

```css
border: 2px solid #141414;
border-radius: 22px;
box-shadow: 4px 4px 0 #141414;
```

Use 20–24px radius consistently.

## Buttons

Pill-shaped.

```css
border: 2px solid #141414;
border-radius: 999px;
box-shadow: 4px 4px 0 #141414;
```

Pressed:

```css
transform: translate(3px, 3px);
box-shadow: 1px 1px 0 #141414;
```

No soft shadows.

## Inputs

```css
border: 2px solid #141414;
border-radius: 14px;
```

Focused:

```css
outline: 3px solid #141414;
outline-offset: 2px;
```

---

# 6. Global Layout

Desktop target:

```text
┌─────────────────────────────────────────────────────────────┐
│                     FLOATING NAVBAR                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│              EYEBROW                                        │
│              CODE ROASTER                                   │
│              short supporting line                           │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ CONTROL BAR                                            │  │
│  ├────────────────────────┬──────────────────────────────┤  │
│  │                        │                              │  │
│  │ YOUR CODE              │ ROAST REPORT                │  │
│  │                        │                              │  │
│  │ code editor            │ empty / loading / result    │  │
│  │                        │                              │  │
│  │                        │                              │  │
│  └────────────────────────┴──────────────────────────────┘  │
│                                                             │
│                   RANGOLI / WARLI STRIP                     │
│                   FOOTER                                    │
└─────────────────────────────────────────────────────────────┘
```

Maximum content width:

```text
1200–1280px
```

Page horizontal padding:

```text
Desktop: 32–48px
Tablet: 24px
Mobile: 16px
```

---

# 7. Header

## Desktop

Floating pill centered near the top.

```text
┌──────────────────────────────────────────────────────────────┐
│ [GDG NASHIK]          CODE ROASTER  v2          [DEVFEST]  │
└──────────────────────────────────────────────────────────────┘
```

Properties:
- Cream/white background.
- 2–3px black border.
- 4px hard black shadow.
- 999px radius.
- Height approximately 64–72px.
- GDG logo left.
- Wordmark center.
- DevFest logo right.

Do not redraw or recolour official logos.

## Mobile

```text
┌───────────────────────────────────┐
│ [GDG]   CODE ROASTER       [⋯]   │
└───────────────────────────────────┘
```

DevFest logo moves to footer.

---

# 8. Hero

Keep this intentionally short.

Eyebrow:

```text
CODE BOL RAHA HAI · मला वाचवा!
```

Main heading:

```text
Code Roaster
```

Supporting copy:

```text
Paste your code. Pick your roast.
Get humbled. Get the fix.
```

Optional small line:

```text
Desi debugging, powered by Gemini.
```

Do not make the hero consume half the viewport. The actual tool should appear quickly.

---

# 9. Main Tool Card

The tool is the primary visual object.

Use one large outer card:

```text
┌───────────────────────────────────────────────────────────────┐
│ ROAST LEVEL     PERSONA        LANGUAGE       + ERROR         │
│ [HALKA][TIKHA][ZANZANIT]       [▼]            [▼] [button]   │
│                                                [ ROAST ME 🔥 ]│
├──────────────────────────────┬───────────────────────────────┤
│ INPUT // SRC                 │ AUDIT // REPORT               │
│ YOUR CODE                    │ ROAST REPORT                  │
│                              │                               │
│ 01 │ def foo():              │                               │
│ 02 │   ...                   │       Empty state             │
│ 03 │                          │                               │
│                              │                               │
│ SAMPLE BUG    CLEAR          │                               │
│                              │                               │
│                    1,204/12k │                               │
└──────────────────────────────┴───────────────────────────────┘
```

The outer shell should have the same black-outline/hard-shadow language as the DevFest cards.

---

# 10. Control Bar

Controls should read left-to-right.

### Roast Level

Segmented control:

```text
[ Halka ] [ Tikha ] [ Zanzanit ]
```

Default:

```text
Tikha
```

Selected state:
- Mustard background.
- Black text.
- Black outline.
- Slight pressed/shadow treatment.

### Persona

Dropdown.

Default:

```text
Stand-up Roaster
```

Options:
- Stand-up Roaster
- Sharma ji ka Beta
- Strict Professor
- Hostel Bhau
- Campus Recruiter

### Language

Dropdown.

Default:

```text
Auto-detect
```

### Error

Secondary dashed control:

```text
+ ERROR MESSAGE
```

Click reveals a compact textarea beneath/inside the control area.

### Primary CTA

```text
Roast Me / भाजून काढ 🔥 →
```

Must be the largest action.

---

# 11. Code Editor

Editor should feel serious and technical while the surrounding UI stays playful.

Recommended:
- Near-black editor background.
- Cream/light code text.
- JetBrains Mono.
- Line-number gutter.
- Subtle syntax highlighting.
- No rounded code-window "browser chrome".
- No fake terminal decorations.

Header:

```text
INPUT // SRC
YOUR CODE
```

Utility row:

```text
SAMPLE BUG    CLEAR
```

Footer:

```text
Python · Auto-detected                    1,204 / 12,000
```

Editor should support:
- Line numbers.
- Keyboard focus.
- Long-code scrolling.
- Character limit.
- Mobile horizontal scrolling.

---

# 12. Empty State

Right panel before first roast.

Use a simple illustrated empty state.

Suggested composition:

```text
        ◇
     ┌─────┐
     │ ?_? │
     └─────┘

Your code is suspiciously quiet.

Paste some code and
let's find out why.

[ TRY SAMPLE BUG → ]
```

Keep illustration CSS/SVG based.

Avoid generic robot/AI imagery.

---

# 13. Analyzing State

Right panel transforms into a focused loading scene.

Large tilted square:

```text
       ◇
      / /
     / /
```

Black outline with mustard interior accent.

Rotating messages:

```text
Compiler ki chai thandi ho rahi hai…
Sharma ji ke bete se comparison chal raha hai…
Bhau, roast tayyar ho raha hai…
Panchavati Express se bhi late hai tumhara code…
```

Motion:
- Slight rotation.
- Very subtle pulse.
- No excessive animation.

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

---

# 14. Result State

The result should feel like a printed "case file" or roast report.

## Result header

```text
AUDIT // REPORT

"Yeh code nahi, Panchavati Express ki
general boghi hai."
```

Next to/below it:

```text
┌─────────────────┐
│      72         │
│  ROAST SCORE    │
│ ATTENDANCE SHORT│
│  CODE BHI SHORT │
└─────────────────┘
```

Make the score badge resemble a physical rubber stamp:
- Slight rotation.
- Thick black border.
- Hard shadow.
- Mustard/red accent depending on score.
- Never use colour alone for the score meaning.

---

# 15. Issue Cards

Each issue is a separate card.

Example:

```text
┌───────────────────────────────────────────────────────────┐
│  03–05    LOGIC             HIGH                         │
│                                                           │
│  "Bhau, yaha pe condition nahi..."                       │
│                                                           │
│  Fix: Use `==` instead of `=` for comparison.             │
└───────────────────────────────────────────────────────────┘
```

Structure:

1. Line number pill.
2. Category.
3. Severity.
4. Roast.
5. Fix.

Severity:

```text
LOW       → green
MEDIUM    → mustard
HIGH      → red
```

Always show text:
- Low
- Medium
- High

---

# 16. Error Explainer

Only render when an error was supplied.

```text
ERROR // WHAT HAPPENED

Yeh error ka matlab:

Your program tried to add a string
and a number. Python doesn't know
how to combine those automatically.
```

Visual treatment:
- Pale lavender background.
- Black outline.
- Red/blue accent border.

---

# 17. Redemption Arc

This is the "you got roasted, now here's the useful bit" section.

Heading:

```text
REDEMPTION ARC
```

Subheading:

```text
Ab asli fix dekh, bhau.
```

Corrected code block:
- Dark editor.
- Copy button top-right.
- JetBrains Mono.
- Keep it visually distinct from the original code.

Copy state:

```text
COPY →
COPIED ✓
```

---

# 18. Closing Actions

After corrected code:

```text
[ SHARE ROAST → ]   [ ROAST AGAIN, SPICIER → ]

[ NEW CODE ]
```

Primary action should remain visually dominant.

Encouragement:

```text
Chinta mat kar. Code bhi gym jaisa hai —
repeat karoge toh better hoga.
```

The encouragement should be sincere and not undermine the roast.

---

# 19. Error / Rate Limit States

## Generic error

```text
ROAST // INTERRUPTED

Bhau, Gemini ne chai break le li.

Something went wrong while generating
the roast.

[ RETRY → ]
```

## Rate limit

```text
ROAST // TOO FAST

Bhai, itni bhi jaldi kya hai?

Thoda ruk, roast ko bhi marinate hone do.

[ TRY AGAIN → ]
```

## Offline sample fallback

If the built-in sample is used and AI fails, render the predefined roast instead of a dead screen.

This is particularly important for workshops.

---

# 20. Responsive Design

## Desktop ≥ 1024px

Split pane:

```text
50% / 50%
```

or approximately:

```text
48% editor / 52% report
```

Controls remain in one horizontal row.

## Tablet 768–1023px

Keep split pane if there is enough width.

Reduce:
- Padding.
- Heading size.
- Control gaps.

## Mobile ≤ 767px

Single column.

Order:

```text
Hero
↓
Controls
↓
Code
↓
Report
↓
Redemption
↓
Actions
↓
Footer
```

Original/Fixed code becomes tabs:

```text
[ ORIGINAL ] [ FIXED ]
```

Header:
- GDG logo + Code Roaster.
- DevFest logo moves to footer.

Controls may wrap into 2 rows.

Primary CTA becomes full width.

---

# 21. Decorative System

Decorations should support the DevFest identity without interfering with usability.

## Rangoli strip

Place above footer.

Use repeating geometric triangles/dots.

Concept:

```text
▲ ▼ ▲ ▼ ▲ ▼ ▲ ▼
  •   •   •   •
▲ ▼ ▲ ▼ ▲ ▼ ▲ ▼
```

Use CSS/SVG.

## Floating dots

Small Google-colour dots can appear around major sections.

Keep them sparse.

## Warli illustration

Use one or two small black silhouette scenes:
- Person debugging.
- Person looking at code.
- Person holding a magnifying glass.
- Person celebrating a fixed bug.

Do not make the main interface depend on illustrations.

---

# 22. Iconography

Use simple outlined icons.

Preferred:
- Arrow → CTA.
- Copy icon.
- Chevron.
- Plus.
- X/Clear.
- Flame only for roast action.

Avoid:
- 3D AI icons.
- Robot heads.
- Excessive emojis.
- Generic SaaS icon grids.

---

# 23. Component Inventory

Required components:

```text
Header
Hero
RoastTool
ControlBar
SegmentedLevelSelector
PersonaSelect
LanguageSelect
ErrorToggle
CodeEditor
ReportPanel
EmptyState
AnalyzingLoader
RoastHeadline
ScoreStamp
IssueCard
ErrorExplainer
RedemptionCode
ActionBar
Footer
RangoliStrip
Toast
```

---

# 24. Component States

Every interactive component needs:

```text
default
hover
focus
active
disabled
loading
error
success
```

Focus must always be visible.

Do not rely on colour alone.

---

# 25. Accessibility

Minimum requirements:

- WCAG AA contrast target.
- Keyboard navigation.
- Visible focus states.
- Screen-reader labels for icon-only buttons.
- Severity communicated with text + colour.
- Reduced-motion support.
- Code editor remains usable at 200% browser zoom.
- Minimum comfortable touch target around 44px.
- Avoid flashing animations.

---

# 26. Brand Rules

### Must do

- Use official GDG Nashik logo.
- Use official DevFest Nashik 2026 logo.
- Preserve their original colours.
- Keep logos visually balanced.
- Use "Built by Google Developer Groups Nashik" in footer.
- Keep DevFest Nashik 2026 attribution visible.

### Do not do

- Redraw official logos.
- Recolour official logos.
- Put logos inside decorative shapes that distort them.
- Turn Google branding into generic rainbow decoration.
- Make the product look like an unrelated startup.

---

# 27. Content Tone

The interface voice should be:

**Playful + local + technically competent.**

Good:

```text
CODE BOL RAHA HAI · मला वाचवा!
Roast Me / भाजून काढ
Redemption Arc
Bhau, roast tayyar ho raha hai.
```

Bad:

```text
OMG YOUR CODE IS TRASH!!!
YOU SUCK AT PROGRAMMING
```

The PRD's comedy contract is strict: roast the code/habit, never the person.

---

# 28. Stitch Screen Prompts

## Screen 01 — Home

```text
Design Code Roaster, a playful debugging web app in the exact visual language of DevFest Nashik 2026.

Warm cream background, thick near-black 2–3px outlines, hard 4px offset black shadows, mustard-yellow primary actions, subtle Google blue/red/green accents, rounded 20–24px cards, pill buttons, Warli/rangoli-inspired decorative details.

Create a floating pill navbar with GDG Nashik logo, CODE ROASTER wordmark, and DevFest Nashik 2026 logo.

Hero:
"CODE BOL RAHA HAI · मला वाचवा!"
"Code Roaster"

Immediately below, place one large split-pane tool card.

Control bar:
Roast Level segmented control, Persona dropdown, Language dropdown, + ERROR MESSAGE, and primary "Roast Me / भाजून काढ 🔥 →" button.

Left pane:
"INPUT // SRC"
"YOUR CODE"
line-numbered code editor
"SAMPLE BUG | CLEAR"
character counter.

Right pane:
"AUDIT // REPORT"
"ROAST REPORT"
friendly empty state with sample bug CTA.

Keep the tool as the visual hero. Avoid generic SaaS dashboard aesthetics.
```

## Screen 02 — Analyzing

```text
Use the same Code Roaster design system.

Keep the original code visible on the left.

Right report pane becomes an analyzing state:
large tilted outlined square loader, mustard accent, rotating Hinglish messages.

Messages:
"Compiler ki chai thandi ho rahi hai…"
"Bhau, roast tayyar ho raha hai…"
"Sharma ji ke bete se comparison chal raha hai…"

Minimal motion, editorial and playful.
```

## Screen 03 — Result

```text
Use the Code Roaster DevFest Nashik visual system.

Right report pane shows:
AUDIT // REPORT
large savage headline
rubber-stamp Roast Score badge
score label
3–8 issue cards

Each issue card:
line number pill
category
severity
roast text
Fix line

Below:
ERROR // WHAT HAPPENED when applicable
REDEMPTION ARC
corrected code block with Copy button

Bottom:
Share Roast
Roast Again, Spicier
New Code

Use coloured top borders and Google-colour accents.
```

## Screen 04 — Error / Rate Limit

```text
Create friendly error and rate-limit states for Code Roaster.

Use cream background, thick black outline, hard shadows and mustard CTA.

Rate-limit copy:
"ROAST // TOO FAST"
"Bhai, itni bhi jaldi kya hai?"
"Thoda ruk, roast ko bhi marinate hone do."

Button:
"TRY AGAIN →"

Keep the states funny but never insulting.
```

---

# 29. Design Tokens for Implementation

```ts
export const designTokens = {
  colors: {
    cream: "#F8F4EC",
    lavender: "#EFF2FB",
    paleYellow: "#F7E3A8",
    ink: "#141414",
    white: "#FFFFFF",
    mustard: "#EDB13E",
    blue: "#4C80F0",
    red: "#D9503F",
    green: "#4FA35A",
  },

  radius: {
    card: "22px",
    input: "14px",
    pill: "999px",
  },

  border: {
    standard: "2px solid #141414",
    heavy: "3px solid #141414",
  },

  shadow: {
    standard: "4px 4px 0 #141414",
    pressed: "1px 1px 0 #141414",
  },

  spacing: {
    page: "clamp(16px, 4vw, 48px)",
    section: "clamp(48px, 7vw, 96px)",
  }
};
```

---

# 30. Final Visual Test

Before shipping, check the app at:

### 360 × 800
- No horizontal page overflow.
- CTA remains usable.
- Editor readable.
- Controls wrap cleanly.

### 390 × 844
- Hero does not dominate.
- Report cards remain readable.
- Fixed-code section works as tabs.

### 768 × 1024
- Tablet layout does not feel cramped.
- Split pane remains usable if chosen.

### 1280 × 800
- Main tool dominates the page.
- Header remains floating.
- No excessive empty space.
- Both logos are legible.

### 1440 × 900
- Visual hierarchy still feels intentional.
- Decorations remain secondary.
- Report and editor feel equally important.

---

# 31. Acceptance Checklist

- [ ] Warm cream DevFest-style background.
- [ ] Near-black thick outlines.
- [ ] Hard offset shadows, no blur.
- [ ] Mustard primary CTA.
- [ ] Google-colour accents.
- [ ] Rounded editorial cards.
- [ ] Floating pill header.
- [ ] GDG Nashik logo preserved.
- [ ] DevFest Nashik 2026 logo preserved.
- [ ] Code editor visually serious.
- [ ] Roast report visually playful.
- [ ] Roast Score stamp treatment.
- [ ] Issue cards with line/category/severity/roast/fix.
- [ ] Redemption Arc clearly separated.
- [ ] Empty/loading/error states designed.
- [ ] Rangoli/Warli footer decoration.
- [ ] Mobile single-column layout.
- [ ] Original/Fixed tabs on mobile.
- [ ] Keyboard focus visible.
- [ ] Reduced-motion support.
- [ ] No generic AI/SaaS purple-gradient aesthetic.
- [ ] No decorative element competes with the roast tool.

---

## 32. One-Line Design North Star

> **A serious code editor walked into a Nashik DevFest roast show — thick ink, mustard paper, Warli details, Google-colour sparks, and just enough chaos to make debugging memorable.**
