import {sanityQuery, QUERIES, imageUrl, portableTextToHtml, formatDate} from './sanity-client.js'

const container = document.querySelector('[data-article]')
if (container) {
  renderArticle()
}

async function renderArticle() {
  const params = new URLSearchParams(window.location.search)
  const slug = params.get('slug')

  if (!slug) {
    container.innerHTML = renderNotFound('Aucun article specifie dans l\'URL.')
    return
  }

  container.innerHTML = '<p class="loading" style="padding: 4rem 2rem; text-align: center;">Chargement de l\'article…</p>'

  try {
    const article = await sanityQuery(QUERIES.articleBySlug, {slug})

    if (!article) {
      container.innerHTML = renderNotFound('Cet article n\'existe pas ou a été supprimé.')
      return
    }

    document.title = `${article.title} - ARMD Insights`
    container.innerHTML = renderArticleHtml(article)
  } catch (err) {
    console.error('Erreur chargement article:', err)
    container.innerHTML = renderNotFound('Impossible de charger l\'article.')
  }
}

function renderArticleHtml(article) {
  const heroImg = article.heroImage
    ? imageUrl(article.heroImage, {width: 1600, auto: 'format'})
    : `https://picsum.photos/seed/${article._id}/1600/900`
  const heroAlt = article.heroImage?.alt || ''

  const meta = [
    article.tag ? `<span class="tag">${escapeHtml(article.tag)}</span>` : '',
    article.publishedAt ? `<time datetime="${article.publishedAt}">${formatDate(article.publishedAt)}</time>` : '',
    article.readingTime ? `<span>${article.readingTime} min de lecture</span>` : '',
  ]
    .filter(Boolean)
    .join('')

  const authorHtml = article.author?.name
    ? `<div class="article-header__byline">
        ${article.author.photo ? `<img src="${imageUrl(article.author.photo, {width: 120})}" alt="" />` : ''}
        <div class="article-header__byline-info">
          <span class="article-header__byline-name">${escapeHtml(article.author.name)}</span>
          ${article.author.role ? `<span class="article-header__byline-role">${escapeHtml(article.author.role)}</span>` : ''}
        </div>
      </div>`
    : ''

  const bodyHtml = portableTextToHtml(article.body || [])
  const pullquote = article.pullquote
    ? `<div class="article-body__pullquote">${escapeHtml(article.pullquote)}</div>`
    : ''

  const relatedHtml = renderRelated(article.related || [])

  return `
    <header class="article-header">
      <div class="article-header__inner">
        <div class="article-header__meta">${meta}</div>
        <h1 class="article-header__title">${escapeHtml(article.title)}</h1>
        ${article.lead ? `<p class="article-header__lead">${escapeHtml(article.lead)}</p>` : ''}
        ${authorHtml}
      </div>
    </header>

    <figure class="article-hero-image">
      <img src="${heroImg}" alt="${escapeAttr(heroAlt)}" data-parallax="0.15" loading="lazy" />
    </figure>

    <div class="article-body">
      <div class="article-body__inner">
        ${bodyHtml}
        ${pullquote}
      </div>
    </div>

    <footer class="article-footer">
      <div class="article-footer__inner">
        <div class="article-footer__nav">
          <a href="insights.html" class="cta-text">
            <span class="arrow" aria-hidden="true">&#8592;</span>
            Tous les insights
          </a>
          <div class="article-footer__nav-info">Insight ARMD${article.publishedAt ? ' · ' + formatDate(article.publishedAt) : ''}</div>
        </div>
        ${relatedHtml}
      </div>
    </footer>
  `
}

function renderRelated(related) {
  if (!related.length) return ''
  const items = related
    .map(
      (r) => `
      <a href="article.html?slug=${encodeURIComponent(r.slug?.current || '')}">
        <span>${escapeHtml(r.tag || '')}</span>
        ${escapeHtml(r.title)}
      </a>`,
    )
    .join('')
  return `
    <div class="article-footer__related">
      <h3>À lire également</h3>
      <div class="article-footer__related-list">${items}</div>
    </div>
  `
}

function renderNotFound(message) {
  return `
    <section style="padding: 8rem 2rem; text-align: center;">
      <h1 style="font-size: 2rem; margin-bottom: 1rem;">Article introuvable</h1>
      <p style="opacity: 0.7; margin-bottom: 2rem;">${escapeHtml(message)}</p>
      <a href="insights.html" class="cta-text">Retour aux insights <span class="arrow">&#8594;</span></a>
    </section>
  `
}

function escapeHtml(str) {
  return String(str || '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}
function escapeAttr(str) {
  return escapeHtml(str).replaceAll('"', '&quot;')
}
