export type TeamMember = {
  name: string
  role: string
  credentials?: string
  email?: string
  group: 'leadership' | 'associates' | 'admin'
  focus?: string
}

export const team: TeamMember[] = [
  {
    name: 'Belindah Maruwa Machanzi',
    role: 'Senior Partner',
    credentials: 'LLB (Hons) UZ',
    email: 'belindahmachanzi@gmail.com',
    group: 'leadership',
    focus: 'Commercial & litigation',
  },
  {
    name: 'Yolanda Chourombo',
    role: 'Senior Associate',
    credentials: 'LLB (Hons) UZ',
    email: 'chouromboyolanda@gmail.com',
    group: 'associates',
    focus: 'Conveyancing & notarial',
  },
  {
    name: 'Rose Moyanda',
    role: 'Associate',
    group: 'associates',
    focus: 'Family law',
  },
  {
    name: 'Rutendo Machanzi',
    role: 'Associate',
    credentials: 'BLS (UZ), BLR (LR)',
    email: 'rutendomachanzi35@gmail.com',
    group: 'associates',
    focus: 'Estates & advisory',
  },
  {
    name: 'Paidamoyo Jaya',
    role: 'Admin & Receptionist',
    group: 'admin',
  },
  {
    name: 'Lazarus Kurodyo',
    role: 'Legal Clerk',
    group: 'admin',
  },
]

export function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
