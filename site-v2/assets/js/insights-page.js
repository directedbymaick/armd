import {sanityQuery, QUERIES, imageUrl, formatDate} from './sanity-client.js'

const container = document.querySelector('[data-insights-list]')
if (container) {
  renderInsights()
}

async function renderInsights() {
  container.innerHTML = '<p class="loading">Chargement des analyses…</p>'

  try {
    const articles = await sanityQuery(QUERIES.allArticles)

    if (!articles || articles.length === 0) {
      container.innerHTML = '<p class="loading">Aucun article publié pour le moment.</p>'
      return
    }

    container.innerHTML = articles.map(cardHtml).join('')
  } catch (err) {
    console.error('Erreur chargement articles:', err)
    container.innerHTML = '<p class="loading">Impossible de charger les articles. Réessayer plus tard.</p>'
  }
}

function cardHtml(article) {
  // Pas d'image dans Sanity -> bloc marque ARMD (jamais de photo aleatoire)
  const media = article.heroImage
    ? `<img src="${imageUrl(article.heroImage, {width: 800, auto: 'format'})}" alt="${escapeAttr(article.heroImage?.alt || '')}" loading="lazy" />`
    : `<div class="card-media-fallback" aria-hidden="true"><img src="assets/images/logos/armd-globe.webp" alt="" loading="lazy" /></div>`
  const slug = article.slug?.current || ''
  const meta = [
    article.tag,
    article.publishedAt ? formatDate(article.publishedAt) : null,
    article.readingTime ? `${article.readingTime} min de lecture` : null,
  ]
    .filter(Boolean)
    .join(' · ')

  return `
    <a href="article.html?slug=${encodeURIComponent(slug)}" class="insight-card">
      <div class="insight-card__image">
        ${media}
      </div>
      <div class="insight-card__body">
        <span class="insight-card__tag">${escapeHtml(article.tag || '')}</span>
        <h3 class="insight-card__title">${escapeHtml(article.title)}</h3>
        <p class="insight-card__desc">${escapeHtml(article.lead || '')}</p>
        <div class="insight-card__meta">${escapeHtml(meta)}</div>
      </div>
    </a>
  `
}

function escapeHtml(str) {
  return String(str || '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}
function escapeAttr(str) {
  return escapeHtml(str).replaceAll('"', '&quot;')
}
