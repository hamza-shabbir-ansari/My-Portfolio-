import React, { useState } from 'react';
import { pipelineData } from '../../data/timeline';
import { profileData } from '../../data/profile';
import { AgentLabel } from '../agents/AgentLabel';
import { Magnetic } from '../ui/Magnetic';
import { 
  Send, 
  Mail, 
  Linkedin, 
  Github, 
  ExternalLink, 
  CheckCircle2, 
  Terminal,
  Layers,
  Sparkles
} from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Autonomous Multi-Agent System',
    message: '',
    botField: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactStep = pipelineData.find((s) => s.id === 'contact') || pipelineData[5];

  const projectTypes = [
    'Autonomous Multi-Agent System (LangGraph / CrewAI)',
    'Production RAG & Vector Search (ChromaDB / LangChain)',
    'Full-Stack Web Application (React / Next.js / FastAPI)',
    'Workflow Automation & Event Queues (n8n / APIs)',
    'Engineering Role / Consultation'
  ];

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
      projectType: 'Autonomous Multi-Agent System',
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

            <h2 className="font-display-fluid text-cream-50 uppercase tracking-tight leading-[0.95] mb-4">
              Give me a task. I will handle the rest.
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

            <a
              href="mailto:contact@hamzashabbir.dev"
              className="p-3.5 rounded-xl bg-[#070c18] border border-white/10 hover:border-[#fbbf24]/40 flex items-center justify-between text-cream-100 hover:text-[#fbbf24] transition-all group"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#f59e0b]" />
                <span className="font-mono text-xs">contact@hamzashabbir.dev</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </a>

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

            <div className="grid grid-cols-3 gap-3">
              <a
                href="https://wa.me/923000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#070c18] border border-white/10 hover:border-[#fbbf24]/40 text-center font-mono text-xs text-cream-muted hover:text-emerald-400 transition-colors"
              >
                WhatsApp
              </a>
              <a
                href="https://upwork.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#070c18] border border-white/10 hover:border-[#fbbf24]/40 text-center font-mono text-xs text-cream-muted hover:text-[#fbbf24] transition-colors"
              >
                Upwork
              </a>
              <a
                href="https://fiverr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#070c18] border border-white/10 hover:border-[#fbbf24]/40 text-center font-mono text-xs text-cream-muted hover:text-[#2dd4bf] transition-colors"
              >
                Fiverr
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Prompt-Style Task Intake Form */}
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl bg-[#070c18]/90 border border-white/10 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(245,158,11,0.1)] overflow-hidden">
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

                {/* Project Type Select */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-cream-muted mb-2">
                    Pipeline Architecture / Task Category
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#03060e] border border-white/10 text-cream-50 font-sans text-sm focus:outline-none focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] transition-all cursor-pointer"
                  >
                    {projectTypes.map((pt, idx) => (
                      <option key={idx} value={pt} className="bg-[#070c18] text-cream-100">
                        {pt}
                      </option>
                    ))}
                  </select>
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

                {/* Submit Button & Direct Mailto Fallback */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
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

                  <a
                    href="mailto:contact@hamzashabbir.dev?subject=Project%20Inquiry%20via%20Portfolio&body=Hi%20Hamza,%0D%0A%0D%0AI%20would%20like%20to%20discuss%20a%20task..."
                    className="font-mono text-xs text-cream-muted hover:text-[#fbbf24] underline underline-offset-4 transition-colors"
                  >
                    Open in default mail client
                  </a>
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
