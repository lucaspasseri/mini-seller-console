# Mini Seller Console - Challenge for a Frontend Developer position at CoverPin

## Challenge

### Mini Seller Console (React + Tailwind)

#### Goal: Build a lightweight console to triage Leads and convert them into Opportunities. You can use an AI co-pilot, we encourage dev’s to do so, but what we are assessing on is the structure and quality.

### Requirements (MVP)

#### Leads List

Load from a local JSON file.

Fields: id, name, company, email, source, score, status.

Features: search (name/company), filter (status), sort (score desc).

#### Lead Detail Panel

Click a row to open a slide-over panel.

Inline edit status and email (validate email format).

Save/cancel actions with basic error handling.

#### Convert to Opportunity

Button: Convert Lead.

Create an Opportunity with: id, name, stage, amount (optional), accountName.

Show Opportunities in a simple table.

#### UX/States

Loading, empty, and simple error states.

Handle ~100 leads smoothly.

#### Nice-to-Haves (pick 1–2)

Persist filter/sort in localStorage.

Optimistic updates with a rollback on simulated failure.

Responsive layout (desktop → mobile).

#### Tech Constraints

React (Vite or CRA) + Tailwind CSS.

No backend required; use local JSON and setTimeout to simulate latency.

##### duration

72h
