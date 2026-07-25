import React, { useState, useRef } from 'react';
import { CAREER_POSITIONS, CareerItem } from '../data/mockData';
import {
  MapPin, Clock, ChevronDown, ChevronUp, Send, ArrowRight,
  Check, Upload, X, FileText, ExternalLink
} from 'lucide-react';
import { api } from '../services/api';
import { Analytics } from '../services/analytics';
import { SEOHead } from '../components/SEOHead';

const DEPARTMENTS = ['All', 'Engineering', 'Design', 'Marketing', 'Management'];

const PERKS = [
  {
    index: '01',
    title: 'Remote-First',
    description: 'Work from anywhere. Our team is distributed across India and internationally. Results matter, not where you sit.',
  },
  {
    index: '02',
    title: 'Continuous Learning',
    description: 'Dedicated learning budget for courses, certifications, and industry conferences — we invest in your expertise.',
  },
  {
    index: '03',
    title: 'Direct Product Impact',
    description: 'Engineers and designers own their work end-to-end. You will see your code ship to real clients within days, not quarters.',
  },
  {
    index: '04',
    title: 'Flexible Hours',
    description: 'Core hours for collaboration, but how you structure your day is yours. We optimise for output, not attendance.',
  },
  {
    index: '05',
    title: 'Fast Career Growth',
    description: 'Flat structure means your ideas reach decision-makers directly. Strong performers move fast — no politics, no queues.',
  },
  {
    index: '06',
    title: 'Global Clients',
    description: 'Work on projects for clients in Singapore, Texas, Milan, Munich and more. Real-world scale from day one.',
  },
];

const DEPT_COLORS: Record<string, string> = {
  Engineering: 'text-sky-400 bg-sky-500/10',
  Design: 'text-violet-400 bg-violet-500/10',
  Marketing: 'text-amber-400 bg-amber-500/10',
  Management: 'text-emerald-400 bg-emerald-500/10',
};

export const CareersPage: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    resumeFile: null as File | null,
    resumeLink: '',
    whyJoinUs: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const filteredJobs = CAREER_POSITIONS.filter(
    (job) => selectedDept === 'All' || job.department === selectedDept
  );

  const handleApply = (job: CareerItem) => {
    setFormData((prev) => ({ ...prev, position: job.title }));
    setTimeout(() => {
      document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleRemoveFile = () => {
    setFormData((prev) => ({ ...prev, resumeFile: null }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.position) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);
    try {
      await api.submitContact({
        name: formData.name,
        email: formData.email,
        phone: '+91 0000000000',
        service: `Career Application — ${formData.position}`,
        message: `Position: ${formData.position}. Resume: ${formData.resumeFile ? formData.resumeFile.name : formData.resumeLink || 'N/A'}. Message: ${formData.whyJoinUs}`,
      });
      Analytics.jobApplicationSubmit(formData.position);
      setSubmitted(true);
    } catch {
      setErrorMsg('Submission failed. Email us at info@riyadvisoftwaretechnologies.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-28 bg-[#050508] min-h-screen font-sans overflow-x-hidden">
      <SEOHead
        title="Careers — Join Riyadvi Software Technologies"
        description="We're hiring engineers, designers, and marketers. Explore open positions at Riyadvi Software Technologies."
        canonical="https://riyadvisoftwaretechnologies.com/careers"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Hero ─────────────────────────────────────────── */}
        <div className="border-b border-[#1F1F2C] pb-10 sm:pb-16 mb-10 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div className="space-y-6">
              <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                CAREERS AT RIYADVI
              </p>
              <h1 className="font-display font-extrabold text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.0] sm:leading-[0.92]">
                Build things<br />that matter.
              </h1>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
                We build enterprise software for clients across Singapore, Texas, Milan, and Munich. Join a tight-knit team where your work ships to real users — fast.
              </p>
              <button
                onClick={() => document.getElementById('open-roles')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-extrabold text-xs hover:bg-[#c5a02e] transition-all shadow-md cursor-pointer"
              >
                <span>See Open Roles</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Stats Panel */}
            <div className="grid grid-cols-2 gap-px bg-[#1F1F2C] rounded-2xl overflow-hidden border border-[#1F1F2C]">
              {[
                { value: '3', label: 'Open Positions' },
                { value: 'Remote', label: 'Work Location' },
                { value: '4+', label: 'Years Building' },
                { value: '40+', label: 'Global Clients' },
              ].map((s) => (
                <div key={s.label} className="bg-[#080810] p-4 sm:p-6 space-y-1">
                  <p className="font-display font-black text-2xl sm:text-3xl text-[#D4AF37]">{s.value}</p>
                  <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Why Join ──────────────────────────────────────── */}
        <div className="border-b border-[#1F1F2C] pb-10 sm:pb-16 mb-10 sm:mb-16">
          <div className="mb-7 sm:mb-10 space-y-1">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">WHY RIYADVI</p>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
              How we work together.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 sm:gap-x-10 gap-y-0">
            {PERKS.map((perk) => (
              <div
                key={perk.index}
                className="py-5 sm:py-6 space-y-2 border-t border-[#1F1F2C]"
              >
                <span className="text-[10px] font-mono text-neutral-600">{perk.index}</span>
                <p className="text-sm font-bold text-white">{perk.title}</p>
                <p className="text-xs text-neutral-400 leading-relaxed">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Open Roles ────────────────────────────────────── */}
        <div id="open-roles" className="border-b border-[#1F1F2C] pb-10 sm:pb-16 mb-10 sm:mb-16 scroll-mt-28">
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-5">
            <div className="space-y-1">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">OPEN POSITIONS</p>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">Current openings.</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedDept === dept
                      ? 'bg-[#D4AF37] text-black shadow-md'
                      : 'bg-[#0E0E14] text-neutral-300 border border-[#1E1E2C] hover:border-[#D4AF37]/40 hover:text-white'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-[#1F1F2C]">
            {filteredJobs.length === 0 && (
              <p className="py-10 text-sm text-neutral-500 text-center">No openings in this department right now. Submit a general application below.</p>
            )}
            {filteredJobs.map((job, idx) => {
              const isOpen = expandedJob === job.id;
              const deptColor = DEPT_COLORS[job.department] ?? 'text-[#D4AF37] bg-[#D4AF37]/10';
              return (
                <div key={job.id} className="border-b border-[#1A1A26]">
                  <button
                    className="w-full text-left py-6 group cursor-pointer"
                    onClick={() => setExpandedJob(isOpen ? null : job.id)}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-start sm:items-center gap-4 sm:gap-6 flex-col sm:flex-row flex-1 min-w-0">
                        <span className="text-[11px] font-mono text-neutral-600 w-6 flex-shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`text-[10px] font-mono font-black uppercase tracking-widest px-2 py-0.5 rounded ${deptColor}`}>
                              {job.department}
                            </span>
                            <span className="text-[10px] font-mono text-neutral-600">{job.designation} · {job.experience}</span>
                          </div>
                          <p className="text-base sm:text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                            {job.title}
                          </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-5 text-[10px] font-mono text-neutral-500 flex-shrink-0">
                          <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" />{job.location}</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{job.type}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {isOpen
                          ? <ChevronUp className="w-4 h-4 text-[#D4AF37]" />
                          : <ChevronDown className="w-4 h-4 text-neutral-500 group-hover:text-[#D4AF37] transition-colors" />
                        }
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="pb-6 sm:pb-8 pl-0 sm:pl-12 space-y-5 sm:space-y-7 animate-in fade-in duration-200">
                      <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl">{job.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">What you'll do</p>
                          <ul className="space-y-2.5">
                            {job.responsibilities.map((r, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-relaxed">
                                <span className="text-[#D4AF37] mt-1.5 text-[8px] flex-shrink-0">■</span>
                                <span>{r}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">What we need</p>
                          <ul className="space-y-2.5">
                            {job.requirements.map((r, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-relaxed">
                                <span className="text-[#D4AF37] mt-1.5 text-[8px] flex-shrink-0">■</span>
                                <span>{r}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <button
                        onClick={() => handleApply(job)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-extrabold text-xs hover:bg-[#c5a02e] active:bg-[#c5a02e] transition-all shadow-md cursor-pointer"
                      >
                        <span>Apply for this Role</span>
                        <ArrowRight className="w-4 h-4 flex-shrink-0" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Application Form ─────────────────────────────── */}
        <div id="application-form" className="scroll-mt-28">
          <div className="mb-8 sm:mb-10 space-y-2">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">APPLY NOW</p>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
              Submit your application.
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-lg pt-1">
              Don't see a perfect fit? Apply anyway — we review all strong candidates for upcoming roles.
            </p>
          </div>

          {submitted ? (
            <div className="border border-[#1F1F2C] rounded-2xl p-10 space-y-4 max-w-lg">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <Check className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">Application received.</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Thanks, <strong className="text-white">{formData.name}</strong>. We've received your application for{' '}
                <strong className="text-white">{formData.position}</strong> and will reply to{' '}
                <strong className="text-white">{formData.email}</strong> within 5 business days.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', position: '', resumeFile: null, resumeLink: '', whyJoinUs: '' });
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="text-xs font-bold text-[#D4AF37] hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>Submit another application</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-8 max-w-3xl">
              {errorMsg && (
                <p className="text-rose-400 text-xs bg-rose-500/10 px-4 py-3 rounded-xl border border-rose-500/20">{errorMsg}</p>
              )}

              {/* Row 1: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase tracking-[0.15em] text-neutral-500">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-[#0A0A12] border border-[#1E1E2C] rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase tracking-[0.15em] text-neutral-500">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="yourname@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-[#0A0A12] border border-[#1E1E2C] rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Position */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase tracking-[0.15em] text-neutral-500">Position Applying For *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Full Stack Engineer, UI/UX Designer, or General Application"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-4 py-3 text-sm bg-[#0A0A12] border border-[#1E1E2C] rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              {/* Row 3: Resume upload + link */}
              <div className="space-y-3">
                <label className="block text-[10px] font-mono uppercase tracking-[0.15em] text-neutral-500">
                  Resume — Upload File or Paste Link
                </label>

                {/* File Upload Zone */}
                {formData.resumeFile ? (
                  /* File Selected — show name + remove X */
                  <div className="flex items-center gap-3 bg-[#0A0A12] border border-[#D4AF37]/40 rounded-xl px-4 py-3">
                    <FileText className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span className="text-sm text-white flex-1 truncate font-medium">
                      {formData.resumeFile.name}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500 flex-shrink-0">
                      {(formData.resumeFile.size / 1024).toFixed(0)} KB
                    </span>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="w-6 h-6 rounded-lg bg-[#1A1A26] border border-[#2A2A3C] text-neutral-400 hover:text-rose-400 hover:border-rose-500/40 transition-all flex items-center justify-center flex-shrink-0 cursor-pointer"
                      title="Remove file"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  /* Upload Dropzone */
                  <label className="flex flex-col items-center justify-center gap-2 bg-[#0A0A12] border border-dashed border-[#2A2A3C] rounded-xl px-6 py-8 cursor-pointer hover:border-[#D4AF37]/50 hover:bg-[#0D0D16] transition-all group">
                    <Upload className="w-6 h-6 text-neutral-500 group-hover:text-[#D4AF37] transition-colors" />
                    <span className="text-sm font-semibold text-neutral-300 group-hover:text-white transition-colors">Click to upload your resume</span>
                    <span className="text-[11px] text-neutral-600">PDF, DOC, or DOCX — max 10MB</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setFormData({ ...formData, resumeFile: e.target.files[0] });
                        }
                      }}
                    />
                  </label>
                )}

                {/* OR Drive Link */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-[#1F1F2C]" />
                  <span className="text-[10px] font-mono text-neutral-600">OR</span>
                  <div className="flex-1 h-px bg-[#1F1F2C]" />
                </div>
                <div className="relative">
                  <ExternalLink className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-600" />
                  <input
                    type="url"
                    placeholder="Paste Google Drive, Dropbox, or portfolio URL"
                    value={formData.resumeLink}
                    onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 text-sm bg-[#0A0A12] border border-[#1E1E2C] rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              {/* Row 4: Cover note */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase tracking-[0.15em] text-neutral-500">
                  Why do you want to join us?
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your background, what excites you about Riyadvi, and what you'd bring to the team..."
                  value={formData.whyJoinUs}
                  onChange={(e) => setFormData({ ...formData, whyJoinUs: e.target.value })}
                  className="w-full px-4 py-3 text-sm bg-[#0A0A12] border border-[#1E1E2C] rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                />
              </div>

              {/* Submit row */}
              <div className="flex flex-col gap-4 pt-2 border-t border-[#1F1F2C]">
                <p className="text-xs text-neutral-500">We respond to every application within 5 business days.</p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#D4AF37] text-black font-extrabold text-xs hover:bg-[#c5a02e] active:bg-[#c5a02e] transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4 flex-shrink-0" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
