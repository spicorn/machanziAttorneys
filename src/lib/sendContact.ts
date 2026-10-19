import { site } from '@/data/site'

export type ContactInquiry = {
  name: string
  email: string
  phone?: string
  message: string
  /** Honeypot — must stay empty */
  company?: string
}

/**
 * Sends an enquiry over HTTPS to maruwamachanziattorneys@gmail.com.
 * Prefers Web3Forms when VITE_WEB3FORMS_ACCESS_KEY is set; otherwise FormSubmit.
 */
export async function sendContactInquiry(inquiry: ContactInquiry): Promise<void> {
  if (inquiry.company?.trim()) {
    // Bot filled the honeypot — pretend success
    return
  }

  const name = inquiry.name.trim()
  const email = inquiry.email.trim()
  const phone = inquiry.phone?.trim() || 'Not provided'
  const message = inquiry.message.trim()

  if (!name || !email || !message) {
    throw new Error('Please complete all required fields.')
  }

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim()

  if (accessKey) {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Consultation request ${name}`,
        from_name: name,
        email,
        phone,
        message,
        website: site.name,
      }),
    })
    const data = (await res.json()) as { success?: boolean; message?: string }
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Unable to send your message. Please try again.')
    }
    return
  }

  const res = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(site.email)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
        _subject: `Consultation request ${name}`,
        _template: 'table',
        _captcha: 'false',
        _replyto: email,
      }),
    },
  )
  const data = (await res.json()) as { success?: string | boolean; message?: string }
  const ok = data.success === true || data.success === 'true'
  if (!res.ok || !ok) {
    throw new Error(data.message || 'Unable to send your message. Please try again.')
  }
}
