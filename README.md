# Mini Seller Console - Challenge for a Frontend Developer position at CoverPin

## Deploy

You can see the [Mini Seller Console](https://lucaspasseri.github.io/mini-seller-console/) on Github pages.

## Mini Seller Console (React + Tailwind)

### Goal

Build a lightweight console to triage **Leads** and convert them into **Opportunities**.  
You can use an AI co-pilot—we encourage devs to do so—but what we are assessing is the **structure and quality**.

---

## Requirements (MVP)

### 1. Leads List

- Load from a local JSON file.
- Fields: `id`, `name`, `company`, `email`, `source`, `score`, `status`.
- Features:
  - Search by name/company
  - Filter by status
  - Sort by score (descending)

### 2. Lead Detail Panel

- Click a row to open a slide-over panel.
- Inline edit `status` and `email` (validate email format).
- Save/cancel actions with basic error handling.

### 3. Convert to Opportunity

- Button: **Convert Lead**.
- Create an Opportunity with:
  - `id`
  - `name`
  - `stage`
  - `amount` (optional)
  - `accountName`
- Show Opportunities in a simple table.

### 4. UX / States

- Loading, empty, and simple error states.
- Handle ~100 leads smoothly.

---

## Nice-to-Haves (pick 1–2)

- Persist filter/sort in `localStorage`.
- Optimistic updates with rollback on simulated failure.
- Responsive layout (desktop → mobile).

---

## Tech Constraints

- React (**Vite** or **CRA**) + **Tailwind CSS**.
- No backend required:
  - Use local JSON
  - Use `setTimeout` to simulate latency.o simulate latency.

##### Duration

72h
