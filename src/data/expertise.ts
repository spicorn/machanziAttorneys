import type { LucideIcon } from 'lucide-react'
import {
  Scale,
  Landmark,
  ScrollText,
  ClipboardCheck,
  BriefcaseBusiness,
  HeartHandshake,
  FileStack,
  Gavel,
  Leaf,
  Pickaxe,
  Handshake,
} from 'lucide-react'

export type PracticeArea = {
  slug: string
  title: string
  summary: string
  detail: string
  icon: LucideIcon
}

export const practiceAreas: PracticeArea[] = [
  {
    slug: 'conveyancing-notarial',
    title: 'Conveyancing & Notarial',
    summary: 'Property transfers, registrations, and notarial instruments handled with exacting care.',
    detail:
      'From transfers and bond registrations to notarial deeds and authentication, we guide clients through Zimbabwe’s property and documentary formalities with clarity and pace.',
    icon: Landmark,
  },
  {
    slug: 'commercial-law',
    title: 'Commercial Law',
    summary: 'Contracts, companies, and commercial relationships structured for durable outcomes.',
    detail:
      'We advise individuals and enterprises on company formation, commercial agreements, shareholder arrangements, and day-to-day corporate counsel that protects commercial intent.',
    icon: BriefcaseBusiness,
  },
  {
    slug: 'family-law',
    title: 'Family Law',
    summary: 'Sensitive counsel for divorce, custody, maintenance, and matrimonial property.',
    detail:
      'Family matters demand discretion and steadiness. We help clients navigate divorce, custody, maintenance, and related disputes with a focus on workable, lasting resolutions.',
    icon: HeartHandshake,
  },
  {
    slug: 'administration-of-estates',
    title: 'Administration of Estates',
    summary: 'Estate winding-up, wills, and succession matters managed with dignity and precision.',
    detail:
      'We assist executors and families with estate administration, wills, and succession planning so assets pass according to law and intention.',
    icon: FileStack,
  },
  {
    slug: 'litigation',
    title: 'Litigation',
    summary: 'Civil and related court advocacy grounded in preparation and strategy.',
    detail:
      'Where dispute becomes unavoidable, we prepare thoroughly and advocate firmly  from pleadings through hearing  with clear communication at every stage.',
    icon: Gavel,
  },
  {
    slug: 'environmental-law',
    title: 'Environmental Law',
    summary: 'Compliance, permitting, and environmental risk counsel for projects and operators.',
    detail:
      'We advise on environmental obligations, regulatory engagement, and risk management for developments and operations that intersect with Zimbabwe’s environmental framework.',
    icon: Leaf,
  },
  {
    slug: 'mining-law',
    title: 'Mining Law',
    summary: 'Mining rights, regulatory process, and transactional support for the sector.',
    detail:
      'Our mining practice supports title, compliance, and commercial arrangements for stakeholders operating in Zimbabwe’s mineral economy.',
    icon: Pickaxe,
  },
  {
    slug: 'arbitration-dispute-resolution',
    title: 'Arbitration & Dispute Resolution',
    summary: 'Negotiation, mediation, and arbitration pathways that resolve without unnecessary delay.',
    detail:
      'Not every conflict belongs in open court. We pursue negotiated, mediated, and arbitral routes that protect commercial relationships and control cost.',
    icon: Handshake,
  },
]

export const credentialIcons: Record<string, LucideIcon> = {
  practitioners: Scale,
  conveyancer: Landmark,
  notaries: ScrollText,
  oaths: ClipboardCheck,
}
