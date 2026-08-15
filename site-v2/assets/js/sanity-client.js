// Client Sanity minimaliste - fetch depuis l'API CDN, pas de dependance
// Utilise l'endpoint HTTP direct de Sanity (pas besoin du SDK complet).

import {SANITY_CONFIG} from './sanity-config.js'

const {projectId, dataset, apiVersion, useCdn} = SANITY_CONFIG
const HOST = useCdn ? 'apicdn.sanity.io' : 'api.sanity.io'
const BASE = `https://${projectId}.${HOST}/v${apiVersion}/data/query/${dataset}`

/**
 * Execute une requete GROQ (langage de query Sanity)
 * @param {string} query - Requete GROQ
 * @param {Object} params - Parametres optionnels
 */
export async function sanityQuery(query, params = {}) {
  const url = new URL(BASE)
  url.searchParams.set('query', query)
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(`$${key}`, JSON.stringify(value))
  }

  const res = await fetch(url.toString())
  if (!res.ok) {
    throw new Error(`Sanity query failed: ${res.status}`)
  }
  const {result} = await res.json()
  return result
}

/**
 * Genere l'URL d'une image Sanity a partir de sa reference
 * Ex: imageUrl(article.heroImage, {width: 1600})
 */
export function imageUrl(image, options = {}) {
  if (!image || !image.asset || !image.asset._ref) return ''

  // Parse la reference: image-abc123-1920x1080-jpg
  const ref = image.asset._ref
  const [_, id, dims, format] = ref.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/) || []
  if (!id) return ''

  let url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dims}.${format}`

  const params = []
  if (options.width) params.push(`w=${options.width}`)
  if (options.height) params.push(`h=${options.height}`)
  if (options.quality) params.push(`q=${options.quality}`)
  if (options.fit) params.push(`fit=${options.fit}`)
  if (options.auto) params.push(`auto=${options.auto}`)
  if (params.length) url += '?' + params.join('&')

  return url
}

/**
 * Convertit du Portable Text (format Sanity) en HTML basique
 * Supporte: paragraphes, h2, h3, blockquote, strong, em, listes, images
 */
export function portableTextToHtml(blocks) {
  if (!Array.isArray(blocks)) return ''

  return blocks
    .map((block) => {
      if (block._type === 'image') {
        const url = imageUrl(block, {width: 1200, auto: 'format'})
        const alt = block.alt || ''
        return `<figure class="article-body__image"><img src="${url}" alt="${alt}" loading="lazy" /></figure>`
      }

      if (block._type !== 'block') return ''

      const style = block.style || 'normal'
      const children = (block.children || [])
        .map((child) => {
          let text = escapeHtml(child.text || '')
          const marks = child.marks || []
          if (marks.includes('strong')) text = `<strong>${text}</strong>`
          if (marks.includes('em')) text = `<em>${text}</em>`
          return text
        })
        .join('')

      if (block.listItem === 'bullet') return `<li>${children}</li>`
      if (style === 'h2') return `<h2>${children}</h2>`
      if (style === 'h3') return `<h3>${children}</h3>`
      if (style === 'blockquote') return `<blockquote><p>${children}</p></blockquote>`
      return `<p>${children}</p>`
    })
    .join('\n')
    // Wrap consecutive <li> in <ul>
    .replace(/(<li>[\s\S]*?<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

/**
 * Formate une date ISO en francais : "22 mai 2026"
 */
export function formatDate(isoDate) {
  if (!isoDate) return ''
  const d = new Date(isoDate)
  return d.toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'})
}

// -------- Queries GROQ preconfigurees --------

export const QUERIES = {
  allArticles: `*[_type == "article"] | order(publishedAt desc) {
    _id, title, slug, tag, publishedAt, readingTime, lead, heroImage
  }`,

  articleBySlug: `*[_type == "article" && slug.current == $slug][0] {
    _id, title, slug, tag, publishedAt, readingTime, lead, heroImage,
    author, body, pullquote,
    "related": *[_type == "article" && slug.current != $slug] | order(publishedAt desc)[0...2] {
      _id, title, slug, tag
    }
  }`,

  allCases: `*[_type == "caseStudy"] | order(_createdAt desc) {
    _id, title, slug, sector, mission, period, pillars, metric, heroImage, summary
  }`,

  caseBySlug: `*[_type == "caseStudy" && slug.current == $slug][0] {
    _id, title, slug, sector, mission, period, pillars, metric, heroImage,
    summary, context, challenge, approach, results,
    "related": relatedCases[]-> {_id, title, slug, sector}
  }`,

  teamMembers: `*[_type == "teamMember"] | order(order asc) {
    _id, name, slug, role, isFounder, photo, bio, credentials
  }`,
}
