import {sanityQuery, QUERIES, imageUrl} from './sanity-client.js'

const container = document.querySelector('[data-cases-list]')
if (container) {
  const limit = parseInt(container.dataset.limit, 10) || 0
  renderCases(limit)
}

async function renderCases(limit = 0) {
  container.innerHTML = '<p class="loading">Chargement des références…</p>'
  try {
    let cases = await sanityQuery(QUERIES.allCases)
    if (!cases || cases.length === 0) {
      container.innerHTML = '<p class="loading">Aucune référence publiée pour le moment.</p>'
      return
    }
    if (limit > 0) cases = cases.slice(0, limit)
    container.innerHTML = cases.map(cardHtml).join('')
  } catch (err) {
    console.error('Erreur chargement references:', err)
    container.innerHTML = '<p class="loading">Impossible de charger les références.</p>'
  }
}

function cardHtml(caseStudy) {
  // Pas d'image dans Sanity -> bloc marque ARMD (jamais de photo aleatoire)
  const media = caseStudy.heroImage
    ? `<img src="${imageUrl(caseStudy.heroImage, {width: 800, auto: 'format'})}" alt="" loading="lazy" />`
    : `<div class="card-media-fallback" aria-hidden="true"><img src="assets/images/logos/armd-globe.webp" alt="" loading="lazy" /></div>`
  const slug = caseStudy.slug?.current || ''
  const eyebrow = [caseStudy.mission, caseStudy.period].filter(Boolean).join(' · ')

  return `
    <a href="case.html?slug=${encodeURIComponent(slug)}" class="case-card">
      <div class="case-card__image">
        ${media}
      </div>
      <div class="case-card__body">
        <div class="case-card__eyebrow">${escapeHtml(eyebrow)}</div>
        <h3 class="case-card__name">${escapeHtml(caseStudy.title)}</h3>
        <p class="case-card__desc">${escapeHtml(caseStudy.summary || '')}</p>
        ${
          caseStudy.metric?.value
            ? `<div class="case-card__metric">
                <div class="case-card__metric-value">
                  <svg class="target-mark" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M12 0Q14.8 9.2 24 12Q14.8 14.8 12 24Q9.2 14.8 0 12Q9.2 9.2 12 0Z"/></svg>
                  ${escapeHtml(caseStudy.metric.value)}
                </div>
                <div class="case-card__metric-label">${escapeHtml(caseStudy.metric.label || '')}</div>
              </div>`
            : ''
        }
      </div>
    </a>
  `
}

function escapeHtml(str) {
  return String(str || '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}
