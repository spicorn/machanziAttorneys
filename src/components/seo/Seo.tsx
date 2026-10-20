import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { pageSeo, site, siteUrl } from '@/data/site'

function absoluteUrl(path: string) {
  const base = siteUrl.replace(/\/$/, '')
  if (!path || path === '/') return `${base}/`
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  )
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

const byPath: Record<string, (typeof pageSeo)[keyof typeof pageSeo]> = {
  '/': pageSeo.home,
  '/about': pageSeo.about,
  '/expertise': pageSeo.expertise,
  '/team': pageSeo.team,
  '/contact': pageSeo.contact,
}

/**
 * Updates document title + meta for the active route (helps crawlers that run JS).
 */
export function Seo() {
  const { pathname } = useLocation()
  const clean = pathname.replace(/\/$/, '') || '/'
  const page = byPath[clean] ?? pageSeo.home
  const url = absoluteUrl(page.path)

  useEffect(() => {
    document.title = page.title
    upsertMeta('name', 'description', page.description)
    upsertMeta('name', 'keywords', site.keywords.join(', '))
    upsertMeta('property', 'og:title', page.title)
    upsertMeta('property', 'og:description', page.description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', site.name)
    upsertMeta('name', 'twitter:title', page.title)
    upsertMeta('name', 'twitter:description', page.description)
    upsertLink('canonical', url)
  }, [page, url])

  return null
}
