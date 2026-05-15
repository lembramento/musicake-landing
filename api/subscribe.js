// Vercel serverless function: receives newsletter signups and appends them
// to subscribers.json in the repo via the GitHub Contents API.
//
// Required env vars (already configured for /api/save):
//   GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH (optional)
//
// Subscribers schema:
//   [{ email, role, submittedAt }, ...]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" });
  }

  const body = req.body || {};
  const emailRaw = typeof body.email === "string" ? body.email.trim() : "";
  const role = body.role === "artist" ? "artist" : "listener";

  if (!emailRaw || !EMAIL_RE.test(emailRaw) || emailRaw.length > 254) {
    return res.status(400).json({ error: "e-mail inválido" });
  }
  const email = emailRaw.toLowerCase();

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token || !owner || !repo) {
    return res.status(500).json({ error: "server config missing (GitHub env vars)" });
  }

  const ghHeaders = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "musicake-subscribe",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const path = "subscribers.json";
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  // Retry loop for concurrent writes (409/422 = stale SHA → refetch)
  for (let attempt = 0; attempt < 5; attempt++) {
    let sha;
    let subscribers = [];

    const getRes = await fetch(`${apiUrl}?ref=${encodeURIComponent(branch)}`, { headers: ghHeaders });
    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
      try {
        const decoded = Buffer.from(data.content || "", "base64").toString("utf-8");
        const parsed = JSON.parse(decoded);
        if (Array.isArray(parsed)) subscribers = parsed;
      } catch {
        subscribers = [];
      }
    } else if (getRes.status !== 404) {
      const txt = await getRes.text();
      return res.status(502).json({ error: "GitHub GET failed", status: getRes.status, body: txt });
    }

    if (subscribers.some(s => s && typeof s.email === "string" && s.email.toLowerCase() === email)) {
      return res.status(200).json({ ok: true, duplicate: true });
    }

    subscribers.push({ email, role, submittedAt: new Date().toISOString() });

    const content = Buffer.from(JSON.stringify(subscribers, null, 2) + "\n", "utf-8").toString("base64");
    const putBody = { message: `subscribe: ${email}`, content, branch };
    if (sha) putBody.sha = sha;

    const putRes = await fetch(apiUrl, {
      method: "PUT",
      headers: { ...ghHeaders, "Content-Type": "application/json" },
      body: JSON.stringify(putBody),
    });

    if (putRes.ok) {
      return res.status(200).json({ ok: true });
    }
    if (putRes.status === 409 || putRes.status === 422) {
      continue;
    }
    const txt = await putRes.text();
    return res.status(502).json({ error: "GitHub PUT failed", status: putRes.status, body: txt });
  }

  return res.status(503).json({ error: "muitas tentativas simultâneas, tente de novo" });
}
