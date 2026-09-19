/** Public asset URL that respects Vite `base` (needed on GitHub Pages). */
export function asset(path: string) {
  const base = import.meta.env.BASE_URL
  const clean = path.replace(/^\//, '')
  return `${base}${clean}`
}
