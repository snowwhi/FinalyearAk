import { useState, useRef } from 'react';
import type React from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.sendForm(
        'Fyp',
        'template_2qs9486',
        formRef.current!,
        'qMJ1HvG-2yFxXS1cK'
      );
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full px-4 py-3 text-sm text-slate-800 bg-white border border-slate-200 rounded-lg placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all duration-200';

  return (
    <>
      {/* ── Form ── */}
      <div className="px-8 md:px-12 py-12">
        <h2 className="cinzel text-slate-900 font-semibold text-2xl mb-1">
          Send a Message
        </h2>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          We'll get back to you within one business day.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500">Email Address</label>
            <input
              type="email"
              name="email" // Fixed back to 'email' so your typing actually updates the state!
              value={form.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Write your message here..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="flex items-center gap-4 pt-1">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="px-8 py-3 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-amber-500 hover:text-slate-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? (
                <span className="flex items-center gap-2">
                  <i className="ri-loader-4-line animate-spin" /> Sending...
                </span>
              ) : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="text-green-600 text-sm flex items-center gap-1.5">
                <i className="ri-checkbox-circle-fill" /> Message sent!
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-500 text-sm flex items-center gap-1.5">
                <i className="ri-error-warning-fill" /> Something went wrong.
              </p>
            )}
          </div>

        </form>
      </div>
    </>
  )
}

export default ContactForm;