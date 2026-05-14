// Vercel serverless function: persists admin edits by committing files to GitHub.
// Required env vars:
//   ADMIN_PASSWORD  - password the admin panel sends to authenticate
//   GITHUB_TOKEN    - fine-grained PAT with "Contents: read & write" on this repo
//   GITHUB_OWNER    - e.g. "lembramento"
//   GITHUB_REPO     - e.g. "musicake-landing"
//   GITHUB_BRANCH   - e.g. "main" (optional, defaults to "main")

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" });
  }

  const { password, files, message } = req.body || {};

  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ error: "ADMIN_PASSWORD not configured" });
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "senha inválida" });
  }

  if (!Array.isArray(files) || files.length === 0) {
    return res.status(400).json({ error: "files (array) required" });
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token || !owner || !repo) {
    return res.status(500).json({ error: "GitHub env vars missing (need GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO)" });
  }

  const ghHeaders = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "musicake-admin",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const commits = [];

  for (const file of files) {
    const { path, contentBase64 } = file || {};
    if (typeof path !== "string" || typeof contentBase64 !== "string") {
      return res.status(400).json({ error: "each file needs { path, contentBase64 }" });
    }
    if (path.includes("..") || path.startsWith("/")) {
      return res.status(400).json({ error: `invalid path: ${path}` });
    }

    const apiPath = `https://api.github.com/repos/${owner}/${repo}/contents/${path.split("/").map(encodeURIComponent).join("/")}`;

    let sha;
    const getRes = await fetch(`${apiPath}?ref=${encodeURIComponent(branch)}`, { headers: ghHeaders });
    if (getRes.ok) {
      const j = await getRes.json();
      sha = j.sha;
    } else if (getRes.status !== 404) {
      const txt = await getRes.text();
      return res.status(502).json({ error: `GitHub GET ${path} failed`, status: getRes.status, body: txt });
    }

    const putBody = {
      message: message || `admin: update ${path}`,
      content: contentBase64,
      branch,
    };
    if (sha) putBody.sha = sha;

    const putRes = await fetch(apiPath, {
      method: "PUT",
      headers: { ...ghHeaders, "Content-Type": "application/json" },
      body: JSON.stringify(putBody),
    });
    if (!putRes.ok) {
      const txt = await putRes.text();
      return res.status(502).json({ error: `GitHub PUT ${path} failed`, status: putRes.status, body: txt });
    }
    const putJson = await putRes.json();
    commits.push({ path, sha: putJson.commit && putJson.commit.sha });
  }

  return res.status(200).json({ ok: true, commits });
}
