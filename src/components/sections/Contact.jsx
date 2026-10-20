import React, { useState, useRef, useEffect } from 'react';
import { pipelineData } from '../../data/timeline';
import { profileData } from '../../data/profile';
import { AgentLabel } from '../agents/AgentLabel';
import { Magnetic } from '../ui/Magnetic';
import { 
  Send, 
  Mail, 
  Linkedin, 
  Github, 
  ChevronDown,
  Check,
  ExternalLink, 
  CheckCircle2, 
  Terminal,
  Sparkles
} from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'AI Agents',
    message: '',
    botField: '',
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactStep = pipelineData.find((s) => s.id === 'contact') || pipelineData[5];

  const serviceOptions = [
    {
      value: 'AI Agents',
      title: 'AI Agents',
      desc: 'Autonomous multi-agent architectures & stateful workflows',
      dotColor: 'bg-[#14b8a6]',
      badgeText: 'AGENTIC'
    },
    {
      value: 'Automation',
      title: 'Automation',
      desc: 'Event-driven pipelines, API bridges & automated workflows',
      dotColor: 'bg-[#f59e0b]',
      badgeText: 'PIPELINE'
    },
    {
      value: 'Full Stack',
      title: 'Full Stack',
      desc: 'Modern reactive web applications & high-throughput backends',
      dotColor: 'bg-[#2dd4bf]',
      badgeText: 'SYSTEMS'
    },
    {
      value: 'Consulting',
      title: 'Consulting',
      desc: 'Architecture advisory, system reviews & strategic planning',
      dotColor: 'bg-[#fbbf24]',
      badgeText: 'ADVISORY'
    },
    {
      value: 'Other',
      title: 'Other',
      desc: 'Custom project scopes, technical inquiries & partnerships',
      dotColor: 'bg-slate-400',
      badgeText: 'GENERAL'
    }
  ];

  // Close custom dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = serviceOptions.find((opt) => opt.value === formData.projectType) || serviceOptions[0];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Confirmation email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim()) errs.message = 'Task briefing or message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const encode = (data) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'agent-task-intake',
        name: formData.name,
        email: formData.email,
        projectType: formData.projectType,
        message: formData.message,
        'bot-field': formData.botField,
      }),
    })
      .then(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      })
      .catch((err) => {
        console.error('Submission fallback:', err);
        setIsSubmitting(false);
        setIsSubmitted(true);
      });
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      projectType: 'AI Agents',
      message: '',
      botField: '',
    });
    setIsSubmitted(false);
  };

  return (
    <section
      id="contact"
      className="relative section-spacing section-container overflow-hidden pt-16 pb-24"
    >
      {/* Agent Header */}
      <div className="mb-10">
        <AgentLabel
          agent={contactStep.agentKey || 'AGENT 05'}
          name={contactStep.name}
          status="active"
          subtitle={contactStep.subtext}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Communication Channels */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Available for freelance and engineering roles</span>
            </div>

            <h2 className="font-display-fluid uppercase tracking-tight leading-[0.95] mb-4">
              <span className="text-cream-50">Give me a task. </span>
              <span className="text-gradient">I will handle the rest.</span>
            </h2>

            <p className="font-body-lg text-cream-muted leading-relaxed">
              Have an autonomous multi-agent pipeline to architect, an enterprise RAG system to ship, or a high-impact engineering role? Submit your task specs below.
            </p>
          </div>

          {/* Direct Communication Channels */}
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#fbbf24] uppercase tracking-widest block mb-2">
              Direct Communication Channels
            </span>

            {/* Email */}
            <a
              href={`mailto:${profileData.socials.email}`}
              className="p-3.5 rounded-xl bg-[#070c18] border border-white/10 hover:border-[#fbbf24]/40 flex items-center justify-between text-cream-100 hover:text-[#fbbf24] transition-all group"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#f59e0b]" />
                <span className="font-mono text-xs">{profileData.socials.email}</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </a>

            {/* LinkedIn & GitHub */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-[#070c18] border border-white/10 hover:border-[#fbbf24]/40 flex items-center justify-between text-cream-100 hover:text-[#fbbf24] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-sky-400" />
                  <span className="font-mono text-xs">LinkedIn</span>
                </div>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-[#070c18] border border-white/10 hover:border-[#fbbf24]/40 flex items-center justify-between text-cream-100 hover:text-[#fbbf24] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-cream-muted" />
                  <span className="font-mono text-xs">GitHub</span>
                </div>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>

            {/* WhatsApp, Upwork, Fiverr */}
            <div className="grid grid-cols-3 gap-3">
              <a
                href={profileData.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-[#070c18] border border-emerald-500/30 hover:border-emerald-400/60 text-center font-mono text-xs text-emerald-400 hover:text-emerald-300 transition-all flex items-center justify-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>WhatsApp</span>
              </a>
              <a
                href="https://upwork.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-[#070c18] border border-white/10 hover:border-[#fbbf24]/40 text-center font-mono text-xs text-cream-muted hover:text-[#fbbf24] transition-colors flex items-center justify-center"
              >
                Upwork
              </a>
              <a
                href="https://fiverr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-[#070c18] border border-white/10 hover:border-[#2dd4bf]/40 text-center font-mono text-xs text-cream-muted hover:text-[#2dd4bf] transition-colors flex items-center justify-center"
              >
                Fiverr
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Prompt-Style Task Intake Form */}
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl bg-[#070c18]/90 border border-white/10 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(245,158,11,0.1)]">
            {/* Top Prompt Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#fbbf24]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#fbbf24] font-semibold">
                  PROMPT TASK INTAKE
                </span>
              </div>
              <span className="font-mono text-xs text-cream-muted">
                DEPLOY // READY
              </span>
            </div>

            {/* Success State: Task Received with Animated Gradient Checkmark */}
            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#f59e0b] via-[#fbbf24] to-[#14b8a6] p-1 shadow-[0_0_35px_rgba(245,158,11,0.5)]">
                  <div className="w-full h-full rounded-full bg-[#03060e] flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                </div>

                <div className="max-w-md">
                  <h3 className="font-display text-3xl uppercase text-cream-50 tracking-wider">
                    Task Received
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-cream-muted mt-2 leading-relaxed">
                    Thank you, {formData.name}. Your specifications have been queued directly into Hamza's terminal. You will receive a response within 24 hours.
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-[#03060e] border border-white/20 text-[#fbbf24] font-mono text-xs uppercase font-semibold hover:bg-gradient-to-r hover:from-[#f59e0b] hover:to-[#14b8a6] hover:text-[#03060c] transition-all cursor-pointer"
                >
                  Submit Another Task
                </button>
              </div>
            ) : (
              /* Prompt Style Form */
              <form
                name="agent-task-intake"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Hidden Netlify Inputs */}
                <input type="hidden" name="form-name" value="agent-task-intake" />
                <p className="hidden">
                  <label>
                    Don't fill this out:{' '}
                    <input
                      name="bot-field"
                      value={formData.botField}
                      onChange={(e) => setFormData({ ...formData, botField: e.target.value })}
                    />
                  </label>
                </p>

                {/* Name Field */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-cream-muted mb-2">
                    Client / Stakeholder Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className={`w-full px-4 py-3 rounded-xl bg-[#03060e] border text-cream-50 font-sans text-sm focus:outline-none focus:ring-1 transition-all ${
                      errors.name
                        ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                        : 'border-white/10 focus:border-[#fbbf24] focus:ring-[#fbbf24]'
                    }`}
                  />
                  {errors.name && (
                    <span className="font-mono text-[11px] text-rose-400 mt-1 block">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-cream-muted mb-2">
                    Direct Confirmation Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="elena@company.com"
                    className={`w-full px-4 py-3 rounded-xl bg-[#03060e] border text-cream-50 font-sans text-sm focus:outline-none focus:ring-1 transition-all ${
                      errors.email
                        ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                        : 'border-white/10 focus:border-[#fbbf24] focus:ring-[#fbbf24]'
                    }`}
                  />
                  {errors.email && (
                    <span className="font-mono text-[11px] text-rose-400 mt-1 block">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Custom Glassmorphism Service Selection Dropdown */}
                <div className="relative z-30" ref={dropdownRef}>
                  <label className="block font-mono text-xs uppercase tracking-wider text-cream-muted mb-2">
                    Project Domain // Select Scope
                  </label>

                  {/* Hidden form input for submission */}
                  <input type="hidden" name="projectType" value={formData.projectType} />

                  {/* Dropdown Trigger */}
                  <button
                    id="service-domain-trigger-btn"
                    type="button"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className={`w-full px-4 py-3 rounded-xl bg-[#03060e] border text-left flex items-center justify-between transition-all cursor-pointer ${
                      dropdownOpen
                        ? 'border-[#fbbf24] shadow-[0_0_20px_rgba(245,158,11,0.2)] ring-1 ring-[#fbbf24]'
                        : 'border-white/10 hover:border-white/25 hover:bg-[#060b17]'
                    }`}
                    aria-haspopup="listbox"
                    aria-expanded={dropdownOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-2.5 h-2.5 rounded-full ${selectedOption.dotColor}`} />
                      <div>
                        <span className="font-sans font-medium text-sm text-cream-50 block leading-tight">
                          {selectedOption.title}
                        </span>
                        <span className="font-mono text-[11px] text-cream-muted block leading-tight mt-0.5">
                          {selectedOption.desc}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#fbbf24] uppercase hidden sm:inline-block">
                        {selectedOption.badgeText}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-cream-muted transition-transform duration-300 ${
                          dropdownOpen ? 'rotate-180 text-[#fbbf24]' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Custom Glassmorphism Dropdown Menu */}
                  {dropdownOpen && (
                    <div
                      className="absolute z-50 left-0 right-0 mt-2 rounded-2xl bg-[#070c18] border border-white/15 backdrop-blur-xl p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.95)] space-y-1"
                      role="listbox"
                    >
                      {serviceOptions.map((opt) => {
                        const isSelected = formData.projectType === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, projectType: opt.value });
                              setDropdownOpen(false);
                            }}
                            className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#0e172a] border border-[#fbbf24]/40 text-cream-50 shadow-sm'
                                : 'hover:bg-white/5 text-slate-300 hover:text-white border border-transparent'
                            }`}
                            role="option"
                            aria-selected={isSelected}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`w-2 h-2 rounded-full ${opt.dotColor}`} />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-sans font-semibold text-sm">
                                    {opt.title}
                                  </span>
                                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-cream-muted">
                                    {opt.badgeText}
                                  </span>
                                </div>
                                <p className="font-mono text-[11px] text-cream-muted mt-0.5">
                                  {opt.desc}
                                </p>
                              </div>
                            </div>

                            {isSelected && (
                              <Check className="w-4 h-4 text-[#fbbf24] shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Message Field with faint terminal prompt styling */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-cream-muted mb-2">
                    Task Briefing &amp; Scope Requirements *
                  </label>
                  <div className="relative">
                    <textarea
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe the problem, pipeline requirements, and target timeline..."
                      className={`w-full px-4 py-3 rounded-xl bg-[#03060e] border text-cream-50 font-sans text-sm focus:outline-none focus:ring-1 transition-all resize-none ${
                        errors.message
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                          : 'border-white/10 focus:border-[#fbbf24] focus:ring-[#fbbf24]'
                      }`}
                    />
                  </div>
                  {errors.message && (
                    <span className="font-mono text-[11px] text-rose-400 mt-1 block">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2 flex items-center justify-start">
                  <Magnetic strength={0.25}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#14b8a6] text-[#03060c] font-mono text-xs sm:text-sm uppercase font-bold tracking-widest shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                          <span>Dispatching Task...</span>
                        </>
                      ) : (
                        <>
                          <span>Dispatch Task</span>
                          <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                        </>
                      )}
                    </button>
                  </Magnetic>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
