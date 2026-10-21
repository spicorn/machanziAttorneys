/** Canonical public URL (custom domain). */
export const siteUrl = 'https://maruwamachanzi.co.zw'

export const site = {
  name: 'Maruwa Machanzi Attorneys',
  shortName: 'Maruwa Machanzi',
  tagline: 'Your rights. Our mission. Your success.',
  credential: 'Experience. Integrity  Results',
  blurb:
    'A full-service law firm registered with the Law Society of Zimbabwe, delivering precise counsel across conveyancing, commercial, family and dispute work.',
  /** Search-focused description — include the firm name and location */
  seoDescription:
    'Maruwa Machanzi Attorneys is a full-service law firm in Eastlea, Harare, Zimbabwe. Conveyancing, commercial, family, estates and litigation counsel registered with the Law Society of Zimbabwe.',
  keywords: [
    'Maruwa Machanzi',
    'Maruwa Machanzi Attorneys',
    'Machanzi Attorneys',
    'law firm Harare',
    'attorneys Eastlea',
    'conveyancing Zimbabwe',
    'Law Society of Zimbabwe',
    'lawyer Harare',
    'legal practitioners Zimbabwe',
  ],
  phones: [
    { label: 'Mobile', value: '0735 075 991', href: 'tel:+263735075991' },
    { label: 'Office', value: '0242 709 991', href: 'tel:+263242709991' },
  ],
  email: 'maruwamachanziattorneys@gmail.com',
  address: {
    line1: '13 Bodle Avenue',
    line2: 'Eastlea, Harare',
    country: 'Zimbabwe',
  },
  society: 'Registered with the Law Society of Zimbabwe',
} as const

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/expertise', label: 'Expertise' },
  { to: '/team', label: 'Team' },
  { to: '/contact', label: 'Contact' },
] as const

export const credentials = [
  { title: 'Legal Practitioners', key: 'practitioners' },
  { title: 'Conveyancer', key: 'conveyancer' },
  { title: 'Notaries', key: 'notaries' },
  { title: 'Commissioner of Oaths', key: 'oaths' },
] as const

export const pageSeo = {
  home: {
    title: 'Maruwa Machanzi Attorneys | Law Firm in Harare, Zimbabwe',
    description: site.seoDescription,
    path: '/',
  },
  about: {
    title: 'About Maruwa Machanzi Attorneys | Harare Law Firm',
    description:
      'Learn about Maruwa Machanzi Attorneys — a Law Society of Zimbabwe registered practice in Eastlea, Harare offering precise, client-focused legal counsel.',
    path: '/about',
  },
  expertise: {
    title: 'Legal Expertise | Maruwa Machanzi Attorneys Harare',
    description:
      'Practice areas at Maruwa Machanzi Attorneys: conveyancing, commercial law, family law, estates, litigation and more in Harare, Zimbabwe.',
    path: '/expertise',
  },
  team: {
    title: 'Our Team | Maruwa Machanzi Attorneys',
    description:
      'Meet the attorneys and staff at Maruwa Machanzi Attorneys in Eastlea, Harare — partners, associates and chambers professionals.',
    path: '/team',
  },
  contact: {
    title: 'Contact Maruwa Machanzi Attorneys | Eastlea, Harare',
    description:
      'Contact Maruwa Machanzi Attorneys at 13 Bodle Avenue, Eastlea, Harare. Call 0735 075 991 or email maruwamachanziattorneys@gmail.com.',
    path: '/contact',
  },
} as const
