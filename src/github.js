/* GitHub integration: serialize admin state back to src/data.js and commit via GitHub API */

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN
const GITHUB_OWNER = import.meta.env.VITE_GITHUB_OWNER || 'tradersurfer'
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO || 'dreamz-dc'
const DATA_FILE_PATH = 'src/data.js'
const BASE_BRANCH = 'master'

const API_BASE = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`

const headers = {
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  'X-GitHub-Api-Version': '2022-11-28',
  'Content-Type': 'application/json',
}

// --- API wrapper ---
async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  if (!res.ok) {
    let detail = ''
    try { detail = JSON.stringify(await res.json()) } catch { detail = await res.text().slice(0, 300) }
    throw new Error(`GitHub API ${res.status}: ${detail}`)
  }
  return res.json()
}

// --- Serialize admin state back into src/data.js source ---
function cleanObj(obj) {
  const clean = {}
  for (const [k, v] of Object.entries(obj || {})) {
    if (v !== undefined && v !== null) clean[k] = v
  }
  return clean
}

const FILTER_PRODUCTS_FN = `export function filterProducts(pathname) {
  const path = pathname.replace(/\\/+$/, '') || '/'
  let list = PRODUCTS
  let title = 'Shop'
  if (path === '/shop' || path === '/categories') return { list, title: 'All Products' }
  if (path.startsWith('/flower')) {
    list = PRODUCTS.filter((p) => p.category === 'flower')
    title = 'Flower'
    if (path.includes('/shake')) { list = list.filter((p) => p.flowerKind === 'shake'); title = 'Shake' }
    else if (path.includes('/small-buds')) { list = list.filter((p) => p.flowerKind === 'small-buds'); title = 'Small Buds' }
    else if (path.includes('/whole-flower') || /premium|top-shelf|exclusives/.test(path)) {
      list = list.filter((p) => p.flowerKind === 'whole-flower' || !p.flowerKind)
      title = 'Whole Flower'
    }
    if (path.includes('/premium')) { list = list.filter((p) => p.flowerTier === 'premium'); title = 'Premium Flower ($40–45 / ⅛)' }
    else if (path.includes('/top-shelf')) { list = list.filter((p) => p.flowerTier === 'top-shelf'); title = 'Top Shelf Flower ($50–55 / ⅛)' }
    else if (path.includes('/exclusives')) { list = list.filter((p) => p.flowerTier === 'exclusives' || p.price >= 60); title = 'Exclusives ($60+ / ⅛)' }
  } else if (path.startsWith('/vapes')) {
    list = PRODUCTS.filter((p) => p.category === 'vapes')
    title = 'Vapes'
    if (path.includes('/disposables')) { list = list.filter((p) => p.vapeKind === 'disposables'); title = 'Disposable Vapes' }
    else if (path.includes('/510')) { list = list.filter((p) => p.vapeKind === '510-cartridges'); title = '510 Thread Cartridges' }
  } else if (path.startsWith('/prerolls')) { list = PRODUCTS.filter((p) => p.category === 'prerolls'); title = 'Pre-Rolls' }
  else if (path.startsWith('/edibles')) { list = PRODUCTS.filter((p) => p.category === 'edibles'); title = 'Edibles' }
  else if (path.startsWith('/concentrates')) { list = PRODUCTS.filter((p) => p.category === 'concentrates'); title = 'Concentrates' }
  else if (path.startsWith('/tinctures')) { list = PRODUCTS.filter((p) => p.category === 'tinctures'); title = 'Tinctures' }
  else if (path.startsWith('/topicals')) { list = PRODUCTS.filter((p) => p.category === 'topicals'); title = 'Topicals' }
  else if (path.startsWith('/accessories')) { list = PRODUCTS.filter((p) => p.category === 'accessories'); title = 'Accessories' }
  else if (path.startsWith('/merch')) { list = PRODUCTS.filter((p) => p.category === 'merch' || p.category === 'accessories'); title = 'Merch & Accessories' }
  else if (path.startsWith('/brands/')) {
    const slug = decodeURIComponent(path.split('/brands/')[1] || '')
    list = PRODUCTS.filter((p) => p.brand.toLowerCase().replace(/\\s+/g, '-') === slug)
    title = list[0]?.brand || 'Brand'
  }
  return { list, title }
}`

export function serializeDataJS({ catalog, brands, categories, announcements, business }) {
  // Convert announcement objects back to strings for BUSINESS.announcements
  const activeAnnouncements = (announcements || [])
    .filter((a) => a.active !== false)
    .map((a) => (a.subtitle ? `${a.title} — ${a.subtitle}` : a.title))

  const BUSINESS = { ...cleanObj(business), announcements: activeAnnouncements }

  return `/**
 * DREAMZ DC shop catalog — auto-generated from admin dashboard
 * Last updated: ${new Date().toISOString()}
 */

export const BUSINESS = ${JSON.stringify(BUSINESS, null, 2)}

export const CATEGORIES = ${JSON.stringify((categories || []).map(cleanObj), null, 2)}

/* Combine all products. To add a product, use the admin dashboard (Admin > Products). */
export const PRODUCTS = ${JSON.stringify((catalog || []).map(cleanObj), null, 2)}

/* Brands — logo files live in public/images/ */
export const BRANDS = ${JSON.stringify((brands || []).map(cleanObj), null, 2)}

${FILTER_PRODUCTS_FN}
`
}

// --- Commit to GitHub + open PR ---
export async function commitChangesToGitHub(content, commitMessage) {
  if (!GITHUB_TOKEN) {
    throw new Error('VITE_GITHUB_TOKEN not configured in .env.local')
  }

  // 1. Get base branch's latest commit SHA
  const baseBranch = await api(`/branches/${BASE_BRANCH}`)
  const baseSha = baseBranch.commit.sha

  // 2. Create a new branch
  const branchName = `admin-sync-${Date.now()}`
  await api('/git/refs', {
    method: 'POST',
    body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: baseSha }),
  })

  // 3. Get current file SHA on the new branch
  const fileData = await api(`/contents/${DATA_FILE_PATH}?ref=${branchName}`)

  // 4. Commit the updated file
  await api(`/contents/${DATA_FILE_PATH}`, {
    method: 'PUT',
    body: JSON.stringify({
      message: commitMessage,
      content: btoa(unescape(encodeURIComponent(content))),
      sha: fileData.sha,
      branch: branchName,
    }),
  })

  // 5. Create a pull request
  const pr = await api('/pulls', {
    method: 'POST',
    body: JSON.stringify({
      title: commitMessage,
      body: `Admin dashboard changes synced to \`src/data.js\`.\n\nThis PR was generated from the admin panel. Review and merge to deploy.`,
      head: branchName,
      base: BASE_BRANCH,
    }),
  })

  return { branchName, prUrl: pr.html_url, prNumber: pr.number }
}
