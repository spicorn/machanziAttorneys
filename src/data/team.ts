import belindah from '@/assets/Team/web/belindah.webp'
import yolanda from '@/assets/Team/web/yolanda.webp'
import rose from '@/assets/Team/web/rose.webp'
import rutendo from '@/assets/Team/web/rutendo.webp'
import paidamoyo from '@/assets/Team/web/paidamwoyo.webp'
import lazarus from '@/assets/Team/web/lazarus.webp'
import teamGroup from '@/assets/Team/web/team.webp'

export type TeamMember = {
  name: string
  role: string
  credentials?: string
  email?: string
  group: 'leadership' | 'associates' | 'admin'
  focus?: string
  image: string
}

export const teamPhoto = teamGroup

export const team: TeamMember[] = [
  {
    name: 'Belindah Maruwa Machanzi',
    role: 'Senior Partner',
    credentials: 'LLB (Hons) UZ',
    email: 'belindahmachanzi@gmail.com',
    group: 'leadership',
    focus: 'Commercial & litigation',
    image: belindah,
  },
  {
    name: 'Yolanda Chourombo',
    role: 'Senior Associate',
    credentials: 'LLB (Hons) UZ',
    email: 'chouromboyolanda@gmail.com',
    group: 'associates',
    focus: 'Conveyancing & notarial',
    image: yolanda,
  },
  {
    name: 'Rose Mayanda',
    role: 'Associate',
    group: 'associates',
    focus: 'Family law',
    image: rose,
  },
  {
    name: 'Rutendo Machanzi',
    role: 'Associate',
    credentials: 'BLS (UZ), BLR (LR)',
    email: 'rutendomachanzi35@gmail.com',
    group: 'associates',
    focus: 'Estates & advisory',
    image: rutendo,
  },
  {
    name: 'Paidamoyo Jaya',
    role: 'Admin & Receptionist',
    group: 'admin',
    image: paidamoyo,
  },
  {
    name: 'Lazarus Kunsedyo',
    role: 'Legal Clerk',
    group: 'admin',
    image: lazarus,
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
