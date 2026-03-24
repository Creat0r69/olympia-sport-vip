'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import emailjs from '@emailjs/browser';
import SectionWrapper from './ui/SectionWrapper';

type FormState = { name: string; email: string; phone: string; message: string };
type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const t = useTranslations('contact');
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { ...form },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <SectionWrapper id="contact" className="bg-surface/10">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white mb-3">{t('heading')}</h2>
        <p className="text-muted">{t('subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder={t('name')}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full bg-surface border border-surface text-white placeholder-muted rounded px-4 py-3 focus:outline-none focus:border-accent"
          />
          <input
            type="email"
            placeholder={t('email')}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full bg-surface border border-surface text-white placeholder-muted rounded px-4 py-3 focus:outline-none focus:border-accent"
          />
          <input
            type="text"
            placeholder={t('phone')}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full bg-surface border border-surface text-white placeholder-muted rounded px-4 py-3 focus:outline-none focus:border-accent"
          />
          <textarea
            placeholder={t('message')}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            rows={5}
            className="w-full bg-surface border border-surface text-white placeholder-muted rounded px-4 py-3 focus:outline-none focus:border-accent resize-none"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-accent text-black font-bold py-3 rounded hover:bg-accent/80 transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? '...' : t('send')}
          </button>
          {status === 'success' && <p className="text-green-400 text-sm" role="status">{t('success')}</p>}
          {status === 'error' && <p className="text-red-400 text-sm" role="alert">{t('error')}</p>}
        </form>

        {/* Info + Map placeholder */}
        <div className="space-y-6">
          <div>
            <p className="text-accent text-sm font-semibold mb-1">Address</p>
            <p className="text-muted">{t('address')}</p>
          </div>
          <div>
            <p className="text-accent text-sm font-semibold mb-1">Phone</p>
            <p className="text-muted">{t('phone_label')}</p>
          </div>
          <div>
            <p className="text-accent text-sm font-semibold mb-1">Email</p>
            <p className="text-muted">{t('email_label')}</p>
          </div>
          <div className="rounded overflow-hidden h-48 bg-surface flex items-center justify-center text-muted text-sm">
            Map embed — replace with Google Maps iframe
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
