import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { BRAND_CONFIG, FAQS } from '../data/catalog';
import { SectionHeading } from '../components/SectionHeading';
import {
  buildSafeWhatsAppUrl,
  checkRateLimit,
  isBotHoneypotTriggered,
  isValidEmail,
  isValidPhone,
  sanitizeEmail,
  sanitizePhone,
  sanitizeText,
} from '../utils/security';

const ALLOWED_INQUIRY_TYPES = [
  'Wedding / Private Event Cart',
  'Corporate Pop-Up & Gift Tins',
  'Hotel, Cinema or Retail Wholesale',
  'Home Delivery / Custom Flavor Tubs',
] as const;

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: 'Wedding / Private Event Cart',
    date: '',
    guests: '',
    message: '',
    honeypot: '', // Hidden anti-bot trap field
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // 1. Anti-bot honeypot trap
    if (isBotHoneypotTriggered(form.honeypot)) {
      return;
    }

    // 2. Validate & sanitize inputs
    const cleanName = sanitizeText(form.name, 80);
    const cleanPhone = sanitizePhone(form.phone, 24);
    const cleanEmail = sanitizeEmail(form.email, 120);
    const cleanMessage = sanitizeText(form.message, 500);

    if (cleanName.length < 2) {
      setErrorMsg('Please enter a valid full name.');
      return;
    }
    if (!isValidPhone(cleanPhone)) {
      setErrorMsg('Please enter a valid phone or WhatsApp number.');
      return;
    }
    if (cleanEmail && !isValidEmail(cleanEmail)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (cleanMessage.length < 3) {
      setErrorMsg('Please include brief details about your order or event.');
      return;
    }

    // 3. Rate limiting against automated spam
    const rate = checkRateLimit('contact-inquiry', 4, 60_000);
    if (!rate.allowed) {
      setErrorMsg(`Too many submissions. Please wait ${rate.retryAfterSeconds}s before retrying.`);
      return;
    }

    setSubmitted(true);
  };

  const safeInquiryType = ALLOWED_INQUIRY_TYPES.includes(
    form.inquiryType as (typeof ALLOWED_INQUIRY_TYPES)[number]
  )
    ? form.inquiryType
    : ALLOWED_INQUIRY_TYPES[0];

  const whatsappInquiryUrl = buildSafeWhatsAppUrl(BRAND_CONFIG.whatsappNumber, [
    `Hello *${BRAND_CONFIG.name}* Concierge!`,
    `*Inquiry Type:* ${safeInquiryType}`,
    form.name ? `*Name:* ${sanitizeText(form.name, 80)}` : '',
    form.phone ? `*Phone:* ${sanitizePhone(form.phone, 24)}` : '',
    form.email ? `*Email:* ${sanitizeEmail(form.email, 120)}` : '',
    form.date ? `*Preferred Date:* ${sanitizeText(form.date, 20)}` : '',
    form.guests ? `*Estimated Guests / Volume:* ${sanitizeText(form.guests, 60)}` : '',
    form.message ? `*Details:* ${sanitizeText(form.message, 400)}` : '',
  ]);

  return (
    <div className="bg-[#FAF7F2]">
      {/* Dark Editorial Header */}
      <section className="pt-36 pb-16 px-5 sm:px-8 bg-[#051B47] text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#F48C1C]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F6B254]">
              Direct Concierge
            </span>
            <span className="h-px w-8 bg-[#F48C1C]" />
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl leading-[1.06]">
            Order, Inquire &amp; <span className="italic text-[#F6B254]">Connect</span>
          </h1>
          <p className="mt-4 text-base text-[#CBD5E1] font-light max-w-xl mx-auto">
            Whether you are craving chilled tubs tonight, booking our twilight dessert cart, or
            stocking Crest Ice Cream &amp; Popcorn at your hotel or store — our team responds promptly.
          </p>
        </motion.div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-20 sm:py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Concierge Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-[#E8DFD1] shadow-sm space-y-6">
              <div className="inline-flex items-center bg-[#FAF7F2] px-4 py-2 rounded-2xl border border-[#EAE0D0]">
                <img
                  src="/images/crest-logo.png"
                  alt={BRAND_CONFIG.name}
                  className="h-11 w-auto object-contain"
                />
              </div>

              <div className="space-y-4 text-sm text-[#4A566B]">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#D41414] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#051B47]">Parlour &amp; Kitchen</p>
                    <p className="font-light mt-0.5">{BRAND_CONFIG.parlourAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#F48C1C] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#051B47]">Opening Hours</p>
                    <p className="font-light mt-0.5">{BRAND_CONFIG.hours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#072B75] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#051B47]">Phone &amp; WhatsApp</p>
                    <a
                      href={`tel:${BRAND_CONFIG.whatsappNumber}`}
                      className="font-light mt-0.5 block hover:text-[#D41414]"
                    >
                      {BRAND_CONFIG.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#072B75] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#051B47]">Reservations &amp; Wholesale</p>
                    <a
                      href={`mailto:${BRAND_CONFIG.email}`}
                      className="font-light mt-0.5 block hover:text-[#D41414]"
                    >
                      {BRAND_CONFIG.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F0E8DC]">
                <a
                  href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-[#072B75] hover:bg-[#D41414] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#F6B254]" />
                  Chat Directly on WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-3xl bg-[#051B47] text-white p-7 border border-[#F48C1C]/25">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#F6B254] font-semibold">
                Dispatch Coverage
              </p>
              <p className="font-serif text-2xl mt-2">Insulated Cold-Chain Delivery</p>
              <p className="text-xs text-[#CBD5E1] font-light mt-2 leading-relaxed">
                {BRAND_CONFIG.deliveryNote}
              </p>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-7 sm:p-10 border border-[#E8DFD1] shadow-[0_12px_40px_rgba(5,27,71,0.05)]">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C86E12]">
                  Custom Inquiry
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Protected Form
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#051B47] mt-1">
                Tell Us About Your Order or Event
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 p-8 rounded-2xl bg-[#FAF7F2] border border-[#E6DDD0] text-center space-y-4"
                >
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="font-serif text-3xl text-[#051B47]">
                    Asante, {sanitizeText(form.name, 80) || 'Friend'}!
                  </h3>
                  <p className="text-sm text-[#5A657A] font-light max-w-md mx-auto leading-relaxed">
                    Your inquiry for <strong className="text-[#051B47]">{safeInquiryType}</strong>{' '}
                    is ready. For the fastest reply from our team, send it straight to our WhatsApp
                    concierge below.
                  </p>
                  <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D41414] hover:bg-[#072B75] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Send on WhatsApp Now
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3.5 rounded-full border border-[#D9CEBC] text-xs font-semibold uppercase tracking-[0.18em] text-[#051B47] cursor-pointer"
                    >
                      Edit Inquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
                  {/* Hidden Anti-Bot Honeypot Trap */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="crest-website-field">Website</label>
                    <input
                      id="crest-website-field"
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.honeypot}
                      onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
                    />
                  </div>

                  {errorMsg && (
                    <div
                      role="alert"
                      className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#051B47] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        maxLength={80}
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Amina Hassan"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E2D8C8] text-sm text-[#051B47] focus:outline-none focus:border-[#072B75]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#051B47] mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        required
                        type="tel"
                        maxLength={24}
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: sanitizePhone(e.target.value) })}
                        placeholder="+255 / +254 ..."
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E2D8C8] text-sm text-[#051B47] focus:outline-none focus:border-[#072B75]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#051B47] mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        maxLength={120}
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E2D8C8] text-sm text-[#051B47] focus:outline-none focus:border-[#072B75]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#051B47] mb-1.5">
                        Inquiry Type
                      </label>
                      <select
                        value={form.inquiryType}
                        onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E2D8C8] text-sm text-[#051B47] focus:outline-none focus:border-[#072B75]"
                      >
                        {ALLOWED_INQUIRY_TYPES.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#051B47] mb-1.5">
                        Target Date
                      </label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E2D8C8] text-sm text-[#051B47] focus:outline-none focus:border-[#072B75]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#051B47] mb-1.5">
                        Guests / Order Volume
                      </label>
                      <input
                        type="text"
                        maxLength={60}
                        value={form.guests}
                        onChange={(e) => setForm({ ...form, guests: e.target.value })}
                        placeholder="e.g. Wedding reception or gift tins"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E2D8C8] text-sm text-[#051B47] focus:outline-none focus:border-[#072B75]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#051B47] mb-1.5">
                      Flavor Preferences &amp; Notes *
                    </label>
                    <textarea
                      required
                      rows={4}
                      maxLength={500}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Share your venue, preferred ice cream & popcorn flavors, or wholesale needs..."
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E2D8C8] text-sm text-[#051B47] focus:outline-none focus:border-[#072B75] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#D41414] hover:bg-[#072B75] text-white text-xs font-semibold uppercase tracking-[0.22em] transition-colors shadow-lg cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Submit Concierge Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 px-5 sm:px-8 bg-[#F2EBE0]/70 border-t border-[#E6DDD0]">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Good to Know"
            title="Frequently Asked Questions"
            italicWord="Questions"
          />

          <div className="mt-12 space-y-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.question}
                  className="bg-white rounded-2xl border border-[#E6DDD0] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-serif text-xl sm:text-2xl text-[#051B47]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#C86E12] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-[#525F75] font-light leading-relaxed border-t border-[#F4EDE2] pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
