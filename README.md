# Cast Wide

You have one idea. It deserves more than one platform.

Cast Wide takes a raw thought and rewrites it natively for Twitter, LinkedIn, and Reddit at the same time. Each version is tuned to how that platform actually works. Not just rephrased. Actually rewritten. A Reddit post and a LinkedIn post about the same thing should read nothing alike, and Cast Wide knows that.

Every output comes with a virality score and a plain-English explanation of why it'll land or flop.

**Live demo:** https://cast-wide.vercel.app
**Credentials:** `judge@castwide.app` / `demo2026` (pre-filled on the login page, just hit sign in)

---

## The problem

Most people write one version of something and post it everywhere. That doesn't work.

A LinkedIn post written like a tweet gets ignored. A Reddit post that sounds like a press release gets downvoted. Platform-native writing is a real skill and most AI tools just hand you your idea back in slightly fancier English without understanding the platform at all.

Cast Wide actually understands the difference and writes accordingly.

---

## What it does

- Paste any raw idea or rough draft
- Pick your platforms: Twitter, LinkedIn, Reddit, or all three
- Set a tone: professional, casual, bold, witty, or inspirational
- Cap the word count if you want something tight
- Get three platform-native posts back, each with a virality score and explanation
- Every generation saves to AWS DynamoDB automatically
- Review, copy, or delete past generations from the History page

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), Tailwind CSS, shadcn/ui |
| Deployment | Vercel |
| AI | Groq API, llama-3.3-70b-versatile |
| Database | AWS DynamoDB |
| Auth | Demo auth via localStorage |

---

## How it works

```
User input
    ↓
/api/generate (Vercel serverless function)
    ↓
Three Groq API calls running in parallel via Promise.all
One per platform, each with a different prompt tuned to that platform
    ↓
Results and virality scores returned to the UI
    ↓
Generation saved to AWS DynamoDB
    ↓
History page reads directly from DynamoDB on every load
```

The three AI calls run at the same time, not one after another. All three results come back together instead of making you wait three times as long.

---

## DynamoDB schema

Table: `castwide-generations`

| Key | Type | What it is |
|---|---|---|
| `userId` (PK) | String | Who made it (anonymous for the demo) |
| `createdAt` (SK) | String | ISO timestamp, also used to sort history chronologically |
| `id` | String | UUID for the generation |
| `idea` | String | The original input |
| `platforms` | List | Which platforms were selected |
| `results` | List of Maps | Per-platform content, score, and explanation |

Querying by `userId` with `createdAt` as the sort key means every user's history comes back in time order with a single efficient query. No full table scans, no extra indexes needed. That design holds up at any scale.

---

## Running locally

```bash
git clone https://github.com/filza-rahman/cast-wide.git
cd cast-wide
pnpm install
cp .env.local.example .env.local
```

Fill in `.env.local`:

```
GROQ_API_KEY=from console.groq.com
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your key
AWS_SECRET_ACCESS_KEY=your secret
DYNAMODB_TABLE_NAME=castwide-generations
```

```bash
pnpm dev
```

Open `http://localhost:3000`.

---

## AWS setup

1. AWS Console → DynamoDB → Create table
2. Table name: `castwide-generations`
3. Partition key: `userId` (String)
4. Sort key: `createdAt` (String)
5. Everything else: leave as default

---

## Built for

H0: Hack the Zero Stack with Vercel and AWS Databases
Track 3: Million-Scale Global App
https://h01.devpost.com