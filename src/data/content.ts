import { asset } from '@/lib/asset'

export const testimonials = [
  {
    quote:
      'Clear advice, steady communication, and a transfer that closed without drama. Exactly what we needed from a chambers in Harare.',
    name: 'T. Moyo',
    title: 'Property client',
    rating: '4.9',
  },
  {
    quote:
      'They handled a sensitive family matter with discretion and practical options  never rushed, never vague.',
    name: 'A. Chikwanha',
    title: 'Family law client',
    rating: '5.0',
  },
  {
    quote:
      'Commercial drafting that protected our position and stayed readable. A rare combination.',
    name: 'R. Ncube',
    title: 'Business owner',
    rating: '4.9',
  },
] as const

export const insights = [
  {
    title: 'What to prepare before a property transfer',
    excerpt:
      'A short checklist for buyers and sellers so conveyancing stays on schedule.',
    author: 'Belindah Maruwa Machanzi',
    role: 'Senior Partner',
    image: asset('images/hero-scales.jpg'),
  },
  {
    title: 'Choosing mediation before litigation',
    excerpt:
      'When dispute resolution outside court can protect relationships and cost.',
    author: 'Yolanda Chourombo',
    role: 'Senior Associate',
    image: asset('images/meeting.jpg'),
  },
  {
    title: 'Administering an estate with clarity',
    excerpt:
      'Practical steps for executors navigating wills and succession formalities.',
    author: 'Rutendo Machanzi',
    role: 'Associate',
    image: asset('images/home.jpg'),
  },
] as const
