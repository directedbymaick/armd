import {sanityQuery, QUERIES, imageUrl, portableTextToHtml} from './sanity-client.js'

const container = document.querySelector('[data-case]')
if (container) {
  renderCase()
}

async function renderCase() {
  const slug = new URLSearchParams(window.location.search).get('slug')
  if (!slug) {
    container.innerHTML = notFound('Aucune référence spécifiée.')
    return
  }

  container.innerHTML = '<p class="loading" style="padding: 4rem 2rem; text-align: center;">Chargement du cas…</p>'

  try {
    const c = await sanityQuery(QUERIES.caseBySlug, {slug})
    if (!c) {
      container.innerHTML = notFound('Ce cas n\'existe pas ou a été retiré.')
      return
    }
    document.title = `${c.title} - Référence ARMD`
    container.innerHTML = renderCaseHtml(c)
  } catch (err) {
    console.error('Erreur chargement cas:', err)
    container.innerHTML = notFound('Impossible de charger le cas.')
  }
}

function renderCaseHtml(c) {
  const heroImg = c.heroImage
    ? imageUrl(c.heroImage, {width: 1600, auto: 'format'})
    : `https://picsum.photos/seed/${c._id}/1600/900`

  const summaryItems = [
    c.sector ? {label: 'Secteur', value: c.sector} : null,
    c.mission ? {label: 'Mission', value: c.mission} : null,
    c.period ? {label: 'Période', value: c.period} : null,
    c.pillars?.length ? {label: 'Piliers ARMD', value: c.pillars.join(' · ')} : null,
    c.metric?.value ? {label: c.metric.label || 'Résultat clé', value: c.metric.value, metric: true} : null,
  ].filter(Boolean)

  const summaryHtml = summaryItems.length
    ? `<section class="case-summary">
        <div class="container case-summary__inner">
          ${summaryItems
            .map(
              (i) => `
            <div class="case-summary__item${i.metric ? ' case-summary__item--metric' : ''}">
              <span>${escapeHtml(i.label)}</span>
              <p>${escapeHtml(i.value)}</p>
            </div>`,
            )
            .join('')}
        </div>
      </section>`
    : ''

  const resultsHtml = c.results?.length
    ? `<section class="case-results">
        <div class="container">
          <h2 class="case-results__heading">Résultats mesurables</h2>
          <ul class="case-results__list">
            ${c.results
              .map(
                (r) => `
              <li>
                <strong>${escapeHtml(r.value)}</strong>
                <span>${escapeHtml(r.label || '')}</span>
              </li>`,
              )
              .join('')}
          </ul>
        </div>
      </section>`
    : ''

  const bodyBlocks = [
    c.context?.length ? `<h2>Le contexte</h2>${portableTextToHtml(c.context)}` : '',
    c.challenge?.length ? `<h2>L'enjeu</h2>${portableTextToHtml(c.challenge)}` : '',
    c.approach?.length ? `<h2>L'approche ARMD</h2>${portableTextToHtml(c.approach)}` : '',
  ]
    .filter(Boolean)
    .join('\n')

  const relatedHtml = renderRelated(c.related || [])

  return `
    <header class="article-header">
      <div class="article-header__inner">
        <div class="article-header__meta">
          <span class="tag">Cas client</span>
          ${c.sector ? `<span>${escapeHtml(c.sector)}</span>` : ''}
        </div>
        <h1 class="article-header__title">${escapeHtml(c.title)}</h1>
        ${c.summary ? `<p class="article-header__lead">${escapeHtml(c.summary)}</p>` : ''}
      </div>
    </header>

    <figure class="article-hero-image">
      <img src="${heroImg}" alt="" data-parallax="0.15" loading="lazy" />
    </figure>

    ${summaryHtml}

    ${bodyBlocks ? `<div class="article-body"><div class="article-body__inner">${bodyBlocks}</div></div>` : ''}

    ${resultsHtml}

    <footer class="article-footer">
      <div class="article-footer__inner">
        <div class="article-footer__nav">
          <a href="references.html" class="cta-text">
            <span class="arrow" aria-hidden="true">&#8592;</span>
            Toutes les références
          </a>
          <div class="article-footer__nav-info">Référence ARMD</div>
        </div>
        ${relatedHtml}
      </div>
    </footer>
  `
}

function renderRelated(related) {
  if (!related.length) return ''
  return `
    <div class="article-footer__related">
      <h3>Cas connexes</h3>
      <div class="article-footer__related-list">
        ${related
          .map(
            (r) => `
          <a href="case.html?slug=${encodeURIComponent(r.slug?.current || '')}">
            <span>${escapeHtml(r.sector || 'Cas client')}</span>
            ${escapeHtml(r.title)}
          </a>`,
          )
          .join('')}
      </div>
    </div>
  `
}

function notFound(message) {
  return `
    <section style="padding: 8rem 2rem; text-align: center;">
      <h1 style="font-size: 2rem; margin-bottom: 1rem;">Référence introuvable</h1>
      <p style="opacity: 0.7; margin-bottom: 2rem;">${escapeHtml(message)}</p>
      <a href="references.html" class="cta-text">Retour aux références <span class="arrow">&#8594;</span></a>
    </section>
  `
}

function escapeHtml(str) {
  return String(str || '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}
