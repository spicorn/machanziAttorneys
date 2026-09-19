export const site = {
  name: 'Maruwa Machanzi Attorneys',
  shortName: 'Maruwa Machanzi',
  tagline: 'Your rights. Our mission. Your success.',
  credential: 'Experience. Integrity  Results',
  blurb:
    'A full-service law firm registered with the Law Society of Zimbabwe, delivering precise counsel across conveyancing, commercial, family, and dispute work.',
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
  { to: '/people', label: 'People' },
  { to: '/contact', label: 'Contact' },
] as const

export const credentials = [
  { title: 'Legal Practitioners', key: 'practitioners' },
  { title: 'Conveyancer', key: 'conveyancer' },
  { title: 'Notaries', key: 'notaries' },
  { title: 'Commissioner of Oaths', key: 'oaths' },
] as const
