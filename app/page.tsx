'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  Instagram, 
  Mail, 
  Phone, 
  User, 
  CheckCircle, 
  Menu, 
  X, 
  ChevronRight, 
  Activity, 
  Sparkles, 
  Award, 
  Compass, 
  Quote 
} from 'lucide-react';

export default function Home() {
  // Navigation Mobile Menu Toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form State
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Safe mount state to avoid Next.js hydration issues
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Run asynchronously to prevent synchronous set-state-in-effect issues
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // WhatsApp Typing Input Mask (Brazilian format: (XX) XXXXX-XXXX)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Remove all non-digits
    value = value.replace(/\D/g, '');
    
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    
    // Apply Brazilian phone masking
    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    
    setWhatsapp(value);
  };

  // Form Submission Handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome.trim() || !email.trim() || whatsapp.length < 14) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      
      // Build WhatsApp Pre-filled message URL
      const messageText = `Olá! Acabei de me inscrever para a aula experimental gratuita. Meu nome é ${nome.trim()} e meu e-mail é ${email.trim()}`;
      const waUrl = `https://wa.me/5521975293562?text=${encodeURIComponent(messageText)}`;
      
      // Attempt to open the WhatsApp tab in browser
      if (typeof window !== 'undefined') {
        window.open(waUrl, '_blank');
      }
      
      // Track submission action (analytics simulation in console)
      console.log('Lead Capturado & Redirecionado:', { nome, email, whatsapp, timestamp: new Date().toISOString() });
    }, 1200);
  };

  // Quick helper to scroll smoothly to section
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen text-slate-100 bg-slate-950 font-sans selection:bg-neon-orange selection:text-white">
      {/* HEADER & NAV */}
      <header className="sticky top-0 z-50 w-full bg-slate-950/85 backdrop-blur-md border-b border-royal-dark/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a 
            onClick={() => scrollTo('inicio')} 
            id="header-logo"
            className="cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            <Image 
              src="/logo-header.png" 
              alt="Attractive Pilates" 
              width={180} 
              height={60} 
              className="w-[180px] h-auto object-contain" 
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Negação Principal">
            <button 
              onClick={() => scrollTo('inicio')} 
              className="text-sm font-medium text-slate-300 hover:text-ciano transition-colors duration-200 cursor-pointer"
              aria-label="Ir para o Início"
              id="nav-link-inicio"
            >
              Início
            </button>
            <button 
              onClick={() => scrollTo('sobre')} 
              className="text-sm font-medium text-slate-300 hover:text-ciano transition-colors duration-200 cursor-pointer"
              aria-label="Ir para Sobre o Estúdio"
              id="nav-link-sobre"
            >
              O Estúdio
            </button>
            <button 
              onClick={() => scrollTo('inscricao')} 
              className="text-sm font-medium text-slate-300 hover:text-ciano transition-colors duration-200 cursor-pointer"
              aria-label="Ir para Formulário de Agendamento"
              id="nav-link-inscricao"
            >
              Aula Grátis
            </button>
            <button 
              onClick={() => scrollTo('inscricao')} 
              className="bg-royal/40 hover:bg-royal text-white border border-royal-light/40 hover:border-royal bg-size-200 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
              aria-label="Botão para agendar aula experimental gratuita"
              id="nav-btn-inscricao"
            >
              Agendar Aula Grátis
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-slate-300 hover:text-white p-2"
              aria-expanded={mobileMenuOpen}
              aria-label="Alternar Menu de Navegação"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <nav 
            className="md:hidden bg-slate-900 border-b border-royal-dark/50 px-4 py-6 flex flex-col gap-4 animate-fade-in-up"
            aria-label="Negação Mobile"
            id="mobile-navigation"
          >
            <button 
              onClick={() => scrollTo('inicio')} 
              className="text-left text-base font-medium py-2 border-b border-slate-800 text-slate-300 hover:text-ciano transition-all"
              id="mob-link-inicio"
            >
              Início
            </button>
            <button 
              onClick={() => scrollTo('sobre')} 
              className="text-left text-base font-medium py-2 border-b border-slate-800 text-slate-300 hover:text-ciano transition-all"
              id="mob-link-sobre"
            >
              O Estúdio
            </button>
            <button 
              onClick={() => scrollTo('inscricao')} 
              className="text-left text-base font-medium py-2 border-b border-slate-800 text-slate-300 hover:text-ciano transition-all"
              id="mob-link-inscricao"
            >
              Aula Grátis
            </button>
            <button 
              onClick={() => scrollTo('inscricao')} 
              className="bg-neon-orange hover:bg-neon-orange-light text-white text-center py-3 rounded-lg font-bold text-sm tracking-wide mt-2 shadow-lg hover:shadow-neon-orange/20 transition-all cursor-pointer"
              id="mob-btn-inscricao"
            >
              AGENDAR AULA EXPERIMENTAL
            </button>
          </nav>
        )}
      </header>

      <main>
        {/* SEÇÃO 1: HERO & CONTROLE REGRESSIVO */}
        <section 
          id="inicio" 
          className="relative py-20 lg:py-28 overflow-hidden flex flex-col items-center justify-center border-b border-royal-dark/20"
        >
          {/* Ambient Cosmic Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(29,78,216,0.18),rgba(3,7,18,0))]" />
          <div className="absolute top-1/4 right-[10%] w-[350px] h-[350px] bg-royal/10 rounded-full mix-blend-screen filter blur-[90px] animate-pulse-subtle pointer-events-none" />
          <div className="absolute bottom-10 left-[5%] w-[300px] h-[300px] bg-ciano/5 rounded-full mix-blend-screen filter blur-[100px] animate-float pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            
            {/* Safe trial class indicator badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-royal-light/30 mb-8 animate-pulse-subtle shadow-md">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-orange"></span>
              </span>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-300">
                Aula Experimental Gratuita • Copacabana
              </span>
            </div>

            {/* Main Heading & Subheading */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white max-w-5xl mx-auto leading-tight md:leading-[1.1]">
              Attractive Pilates: <br />
              <span className="bg-gradient-to-r from-ciano-light via-royal-light to-neon-orange-light bg-clip-text text-transparent">
                Recupere Sua Postura, Alivie Dores e Ganhe Flexibilidade
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
              Agende uma aula experimental gratuita no estúdio mais tradicional de Copacabana e mude sua rotina.
            </p>

            {/* Benefícios do Método (Grid Layout) */}
            <div className="mt-12 max-w-5xl mx-auto">
              <h3 className="text-xs sm:text-sm font-mono tracking-widest text-ciano uppercase font-semibold mb-8 text-center">
                ✨ BENEFÍCIOS COMPROVADOS DO MÉTODO:
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                {/* Benefício 1: Alívio de Dores */}
                <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-royal/40 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-royal/5 rounded-full filter blur-xl" />
                  <div className="p-2.5 rounded-lg bg-royal/10 text-ciano border border-royal/20 w-fit mb-4">
                    <Activity size={22} />
                  </div>
                  <h4 className="font-display font-semibold text-lg text-white mb-2">Alívio de Dores</h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Alivie dores na coluna, tensões musculares e previna futuras lesões corporais de forma equilibrada.
                  </p>
                </div>

                {/* Benefício 2: Correção Postural */}
                <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-royal/40 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-royal/5 rounded-full filter blur-xl" />
                  <div className="p-2.5 rounded-lg bg-royal/10 text-ciano border border-royal/20 w-fit mb-4">
                    <Compass size={22} />
                  </div>
                  <h4 className="font-display font-semibold text-lg text-white mb-2">Correção Postural</h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Ajuste o alinhamento da coluna, melhorando drasticamente sua presença física e conforto diário.
                  </p>
                </div>

                {/* Benefício 3: Tonificação Corporal */}
                <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-royal/40 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-royal/5 rounded-full filter blur-xl" />
                  <div className="p-2.5 rounded-lg bg-royal/10 text-ciano border border-royal/20 w-fit mb-4">
                    <Sparkles size={22} />
                  </div>
                  <h4 className="font-display font-semibold text-lg text-white mb-2">Tonificação</h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Fortaleça o abdômen profundo (core), glúteos e pernas com treinos eficientes de baixo impacto.
                  </p>
                </div>

                {/* Benefício 4: Atendimento Individualizado */}
                <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-royal/40 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-royal/5 rounded-full filter blur-xl" />
                  <div className="p-2.5 rounded-lg bg-royal/10 text-ciano border border-royal/20 w-fit mb-4">
                    <Award size={22} />
                  </div>
                  <h4 className="font-display font-semibold text-lg text-white mb-2">Individualizado</h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Equipamentos modernos e exercícios adaptados à sua própria anatomia e limites pessoais.
                  </p>
                </div>
              </div>
            </div>

            {/* Hero CTA & Trust elements */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => scrollTo('inscricao')}
                className="w-full sm:w-auto px-8 py-4 bg-neon-orange hover:bg-neon-orange-light text-white font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-neon-orange/20 flex items-center justify-center gap-2 text-base tracking-wide cursor-pointer border-glow-orange animate-pulse-subtle"
                aria-label="Agende sua aula experimental gratuita agora"
                id="hero-cta-btn"
              >
                AGENDAR MINHA AULA EXPERIMENTAL GRATUITA
                <ChevronRight size={18} />
              </button>
              <button 
                onClick={() => scrollTo('sobre')}
                className="w-full sm:w-auto px-8 py-4 bg-slate-905 border border-slate-800 hover:border-royal text-slate-300 hover:text-white font-semibold rounded-xl transition-all duration-300 text-base flex items-center justify-center gap-2 cursor-pointer"
                aria-label="Conheça mais sobre o estúdio"
                id="hero-secondary-btn"
              >
                Conhecer o Estúdio
              </button>
            </div>

            {/* Quick value badges */}
            <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto pt-10 border-t border-slate-900">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="p-2.5 rounded-lg bg-royal/10 text-ciano border border-royal/20">
                  <Award size={20} />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-400 text-left">13 anos de tradição em Copacabana</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="p-2.5 rounded-lg bg-royal/10 text-ciano border border-royal/20">
                  <Sparkles size={20} />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-400 text-left">Método Autêntico Joseph Pilates</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="p-2.5 rounded-lg bg-royal/10 text-ciano border border-royal/20">
                  <Activity size={20} />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-400 text-left">Foco em Equilíbrio Corpo & Mente</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="p-2.5 rounded-lg bg-royal/10 text-ciano border border-royal/20">
                  <Compass size={20} />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-400 text-left">Cuidado Individual e Personalizado</span>
              </div>
            </div>

          </div>
        </section>

        {/* SEÇÃO 2: SOBRE O ESTÚDIO E FILOSOFIA */}
        <section 
          id="sobre" 
          className="py-24 bg-slate-950 border-b border-royal-dark/15 relative"
        >
          {/* Subtle details */}
          <div className="absolute top-[20%] left-[-100px] w-96 h-96 bg-royal-dark/10 rounded-full blur-[110px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Section Title */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold tracking-widest text-ciano uppercase font-mono bg-royal-dark/20 px-3 py-1 rounded-md border border-royal-light/20 inline-block mb-3">
                🏆 NOSSA AUTORIDADE
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
                Estúdio Attractive Pilates
              </h2>
              <p className="mt-4 text-slate-400 text-base sm:text-lg">
                Autoridade, Tradição e Cuidado Individualizado no Coração de Copacabana
              </p>
            </div>

            {/* Split Grid for Story/Details and Philosophy Quote */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch" id="grid-sobre">
              
              {/* Pillar 1: History, Address and Schedule (Bento Style Card) */}
              <article className="lg:col-span-7 flex flex-col gap-6 justify-between">
                
                {/* Traditional History */}
                <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 hover:border-royal/30 transition-all duration-300 flex-1 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-royal/5 rounded-full filter blur-xl transform group-hover:scale-125 transition-transform duration-500" />
                  
                  <span className="text-[10px] font-mono tracking-widest text-ciano uppercase font-bold block mb-4">
                    Nossa Trajetória
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-4">
                    13 Anos de História em Copacabana
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Localizado no coração da Zona Sul do Rio de Janeiro, o estúdio <strong className="text-ciano">Attractive Pilates</strong> consolidou-se como um centro referencial para recuperação postural, ganho de tônus e reabilitação. Fundado há mais de uma década, o estúdio é conduzido por especialistas apaixonados pela verdadeira essência do método criado por Joseph Pilates, oferecendo treinos focados na necessidade específica de cada aluno.
                  </p>
                </div>

                {/* Practical Info Grid (Address and Schedule cards) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Address Card */}
                  <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-royal/35 transition-all duration-300 flex flex-col justify-start">
                    <div className="p-2 bg-royal/10 text-ciano border border-royal/20 rounded-lg w-fit mb-4">
                      <MapPin size={22} aria-hidden="true" />
                    </div>
                    <h4 className="font-display font-semibold text-lg text-white mb-2">
                      Localização Fácil
                    </h4>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Rua Figueiredo de Magalhães, 701, Sobreloja <br />
                      <span className="font-medium text-slate-100">Copacabana, Rio de Janeiro - RJ</span>
                    </p>
                  </div>

                  {/* Schedule Card */}
                  <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-royal/35 transition-all duration-300 flex flex-col justify-start">
                    <div className="p-2 bg-royal/10 text-ciano border border-royal/20 rounded-lg w-fit mb-4">
                      <Clock size={22} aria-hidden="true" />
                    </div>
                    <h4 className="font-display font-semibold text-lg text-white mb-2">
                      Horários Flexíveis
                    </h4>
                    <div className="text-slate-300 text-xs sm:text-sm leading-relaxed space-y-1">
                      <p className="font-semibold text-ciano">Segunda a Sexta:</p>
                      <p>07h às 12h e 16h às 21h</p>
                      <p className="font-semibold text-slate-500 mt-2">Sábado e Domingo:</p>
                      <p className="text-slate-500">Fechado</p>
                    </div>
                  </div>

                </div>

              </article>

              {/* Pillar 2: Philosophy Quote & Beautiful Pilates Visual SVG (Large Card) */}
              <article className="lg:col-span-5 flex">
                <div className="glass-panel-royal p-8 sm:p-10 rounded-3xl border border-ciano/15 flex flex-col justify-between items-center text-center relative overflow-hidden flex-1 group">
                  
                  {/* Glowing core overlay for pilates balance feel */}
                  <div className="absolute -bottom-24 bg-ciano/10 w-80 h-80 rounded-full blur-[60px] pointer-events-none group-hover:bg-ciano/15 transition-all duration-500" />
                  
                  {/* Quote decoration */}
                  <div className="text-ciano/20 w-16 h-16 mb-2">
                    <Quote className="w-12 h-12 stroke-[1.5]" />
                  </div>

                  <blockquote className="relative z-10 my-4 text-center">
                    <p className="font-display italic text-lg sm:text-xl md:text-2xl text-slate-100 leading-relaxed font-medium">
                      {"\"Verdadeira saúde é obter e manter o desenvolvimento uniforme do corpo com perfeito equilíbrio entre corpo, mente e espírito\""}
                    </p>
                    <footer className="mt-5 text-sm uppercase tracking-widest text-neon-orange font-bold font-mono">
                      — Joseph Pilates
                    </footer>
                  </blockquote>

                  {/* Geometric Pilates symmetry vector icon representation */}
                  <div className="relative mt-8 w-full max-w-[200px]" aria-hidden="true">
                    {/* SVG representing a stylized Pilates teaser posture with harmonious arcs */}
                    <svg className="w-full h-auto text-ciano-light opacity-85 hover:text-white transition-colors duration-300 filter drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Body posture curve (Teaser exercise line) */}
                      <path d="M 15 55 Q 50 15 85 55" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                      {/* Supporting arm reaching */}
                      <path d="M 50 24 L 75 24 M 50 24 L 25 35" stroke="#ff6b00" strokeWidth="5" strokeLinecap="round" />
                      {/* Balance base foundation circle */}
                      <circle cx="50" cy="55" r="4" fill="currentColor" />
                      <line x1="20" y1="62" x2="80" y2="62" stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeLinecap="round" />
                      <path d="M 38 62 A 12 12 0 0 1 62 62" stroke="rgba(6,182,212,0.25)" strokeWidth="2" strokeDasharray="4 2" />
                      {/* Dynamic head representing consciousness/focus */}
                      <circle cx="50" cy="18" r="7" fill="#ff6b00" />
                    </svg>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mt-2 text-center">
                      Harmonia, Controle e Alinhamento
                    </span>
                  </div>

                </div>
              </article>

            </div>

          </div>
        </section>

        {/* SEÇÃO 3: FORMULÁRIO DE CAPTURA DE LEADS */}
        <section 
          id="inscricao" 
          className="py-24 relative bg-slate-950 overflow-hidden"
        >
          {/* Circular gradient background to highlight registration */}
          <div className="absolute inset-x-0 bottom-0 top-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(11,37,104,0.18),rgba(3,7,18,0))]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-royal/8 rounded-full filter blur-[110px] pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Form Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest text-[#ff6b00] uppercase font-mono bg-neon-orange/10 px-3 py-1 rounded-md border border-neon-orange/30 inline-block mb-3 text-glow-orange">
                ⚠️ VAGAS LIMITADAS
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
                Agende Sua Aula Experimental Gratuita!
              </h2>
              <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                Preencha seus dados abaixo e daremos continuidade ao agendamento de seu horário direto no seu WhatsApp em instantes.
              </p>
            </div>

            {/* Interactive Lead Capture Form Block */}
            <div className="max-w-xl mx-auto">
              
              {!formSubmitted ? (
                // ACTIVE FORM STATE
                <form 
                  id="trial-capture-form"
                  onSubmit={handleFormSubmit}
                  className="glass-panel p-8 sm:p-10 rounded-2xl border border-royal/20 relative overflow-hidden shadow-2xl"
                >
                  {/* Decorative corner flash */}
                  <div className="absolute top-0 right-0 w-2 h-2 bg-neon-orange" />
                  
                  <div className="space-y-6">
                    
                    {/* Name input */}
                    <div>
                      <label htmlFor="fullname" className="block text-xs sm:text-sm font-mono tracking-wider text-slate-300 mb-2 uppercase font-medium">
                        Nome Completo
                      </label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                          <User size={18} />
                        </div>
                        <input
                          type="text"
                          id="fullname"
                          required
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          placeholder="Digite seu nome completo"
                          className="block w-full pl-10 pr-4 py-3 sm:py-3.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-ciano transition-colors text-slate-200 placeholder-slate-600 text-sm sm:text-base focus:ring-1 focus:ring-ciano"
                          aria-label="Entre com seu nome completo"
                        />
                      </div>
                    </div>

                    {/* Email input */}
                    <div>
                      <label htmlFor="email" className="block text-xs sm:text-sm font-mono tracking-wider text-slate-300 mb-2 uppercase font-medium">
                        E-mail Principal
                      </label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                          <Mail size={18} />
                        </div>
                        <input
                          type="email"
                          id="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seu.email@exemplo.com"
                          className="block w-full pl-10 pr-4 py-3 sm:py-3.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-ciano transition-colors text-slate-200 placeholder-slate-600 text-sm sm:text-base focus:ring-1 focus:ring-ciano"
                          aria-label="Entre com seu e-mail de contato"
                        />
                      </div>
                    </div>

                    {/* WhatsApp Input (with Auto Brazilian Mask) */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="whatsapp" className="block text-xs sm:text-sm font-mono tracking-wider text-slate-300 uppercase font-medium">
                          Celular / WhatsApp
                        </label>
                        <span className="text-[10px] text-ciano font-mono">Formatado automático</span>
                      </div>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                          <Phone size={18} />
                        </div>
                        <input
                          type="tel"
                          id="whatsapp"
                          required
                          value={whatsapp}
                          onChange={handlePhoneChange}
                          placeholder="(21) 99999-9999"
                          className="block w-full pl-10 pr-4 py-3 sm:py-3.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-ciano transition-colors text-slate-200 placeholder-slate-600 text-sm sm:text-base focus:ring-1 focus:ring-ciano"
                          aria-label="Entre com o celular de contato com o código de DDD brasileiro"
                        />
                      </div>
                    </div>

                    {/* Dynamic helper details */}
                    <div className="flex gap-2.5 items-start mt-2">
                      <input 
                        type="checkbox" 
                        defaultChecked 
                        required
                        id="terms" 
                        aria-label="Aceito compartilhar dados de contato"
                        className="w-4 h-4 mt-1 rounded bg-slate-950 border-slate-800 focus:ring-ciano focus:ring-offset-slate-950 accent-ciano text-ciano" 
                      />
                      <label htmlFor="terms" className="text-xs text-slate-400 leading-normal select-none">
                        Concordo em receber mensagens do estúdio via e-mail e WhatsApp para o agendamento da minha aula gratuita. Respeitamos seu espaço e não enviamos spam.
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-6 py-4 px-6 bg-neon-orange hover:bg-neon-orange-light disabled:bg-slate-800 disabled:border-slate-700 disabled:text-slate-500 hover:scale-[1.01] transition-all duration-300 font-bold rounded-xl text-white shadow-xl shadow-neon-orange/20 text-center tracking-wide flex items-center justify-center gap-3 cursor-pointer text-base select-none"
                      id="submit-register-button"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processando Agendamento...
                        </>
                      ) : (
                        'AGENDAR MINHA AULA EXPERIMENTAL GRATUITA!'
                      )}
                    </button>

                  </div>
                </form>
              ) : (
                // EXTREMELY POLISHED SUCCESS SCREEN ON SUBMISSION
                <div 
                  id="register-success-block"
                  className="glass-panel-royal p-8 sm:p-12 rounded-3xl border border-ciano-light/20 relative overflow-hidden text-center shadow-2xl animate-fade-in-up"
                >
                  {/* Decorative internal circles */}
                  <div className="absolute top-[-30px] right-[-30px] w-24 h-24 bg-ciano/10 rounded-full filter blur-xl" />
                  
                  {/* Glowing success icon */}
                  <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 border border-ciano/40 mb-6 text-ciano text-glow-ciano">
                    <CheckCircle size={36} />
                  </div>

                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                    Agendamento Iniciado, {nome.split(' ')[0]}!
                  </h3>
                  
                  <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
                    Tudo pronto! Seus dados foram salvos com sucesso. Se a nova aba do WhatsApp não tiver aberto automaticamente, clique no botão verde abaixo para falar diretamente com nosso estúdio e confirmar seu horário.
                  </p>

                  {/* Highlights Card */}
                  <div className="my-8 py-5 px-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-left space-y-3 font-medium text-xs sm:text-sm">
                    <div className="flex items-center gap-2.5 text-slate-300">
                      <span className="w-5 h-5 rounded bg-royal/10 border border-royal-light/20 text-ciano flex items-center justify-center font-mono text-[10px]">1</span>
                      <span>Garantimos seu atendimento 100% individualizado.</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-300">
                      <span className="w-5 h-5 rounded bg-royal/10 border border-royal-light/20 text-ciano flex items-center justify-center font-mono text-[10px]">2</span>
                      <span>Defina o melhor dia e horário diretamente por mensagem com nossos professores.</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-300">
                      <span className="w-5 h-5 rounded bg-royal/10 border border-royal-light/20 text-ciano flex items-center justify-center font-mono text-[10px]">3</span>
                      <span>Lembre-se de comparecer com roupas confortáveis para praticar os exercícios.</span>
                    </div>
                  </div>

                  {/* Immediate Action Buttons (E.g. WhatsApp Studio link for confirmation feedback) */}
                  <div className="space-y-4">
                    <a 
                      href={`https://wa.me/5521975293562?text=Olá! Acabei de me inscrever para a aula experimental gratuita. Meu nome é ${encodeURIComponent(nome)} e meu e-mail é ${encodeURIComponent(email)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 px-6 py-4 bg-[#25D366] hover:bg-[#20ba56] text-white font-bold rounded-xl transition-transform hover:-translate-y-0.5 shadow-lg select-none text-sm tracking-wide"
                      id="whatsapp-direct-success"
                    >
                      <Phone size={18} />
                      FALAR COM O ESTÚDIO NO WHATSAPP
                    </a>
                    
                    <button 
                      onClick={() => {
                        setNome('');
                        setEmail('');
                        setWhatsapp('');
                        setFormSubmitted(false);
                      }}
                      className="text-xs text-slate-400 hover:text-white transition-colors duration-200 underline block mx-auto cursor-pointer"
                      id="reset-form-ref"
                    >
                      Agendar para outra pessoa
                    </button>
                  </div>

                </div>
              )}

            </div>

          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-royal-dark/30 relative z-10 text-slate-400 text-sm py-16">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-900" id="footer-layout">
          
          {/* Col 1: Studio Identity & Philosophy */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('inicio')} id="footer-logo">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-royal">
                <svg className="w-5 h-5 text-ciano" viewBox="0 0 100 100" fill="currentColor">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" />
                  <path d="M30 55 Q50 25 70 55" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                  <circle cx="50" cy="30" r="8" fill="#ff6b00" />
                </svg>
              </div>
              <span className="font-display font-bold text-base tracking-tight text-white uppercase">
                Attractive <span className="text-ciano">Pilates</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Um estúdio tradicional com 13 anos de dedicação em Copacabana, focados na verdadeira filosofia de Joseph Pilates para o equilíbrio perfeito entre corpo, mente e espírito.
            </p>
          </div>

          {/* Col 2: Navigation Links (Internal Ancora + Institutional placehloders) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold font-mono text-slate-300">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button onClick={() => scrollTo('inicio')} className="hover:text-ciano transition-colors duration-200 cursor-pointer text-left">
                  Início (Topo)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('sobre')} className="hover:text-ciano transition-colors duration-200 cursor-pointer text-left">
                  Sobre o Estúdio
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('inscricao')} className="hover:text-ciano transition-colors duration-200 cursor-pointer text-left">
                  Aula Grátis
                </button>
              </li>
              <li>
                <a href="#politica" className="hover:text-ciano transition-colors duration-200 text-left">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contacts & Social networks */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold font-mono text-slate-300">
              Canais de Contato
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm">
              
              {/* WhatsApp phone link */}
              <a 
                href="https://wa.me/5521975293562" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 hover:text-ciano transition-colors group"
                aria-label="Nosso telefone do WhatsApp para conversar"
                id="footer-whatsapp"
              >
                <div className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-500 group-hover:text-ciano group-hover:border-ciano/40 transition-colors">
                  <Phone size={16} />
                </div>
                <span>+55 21 97529-3562</span>
              </a>

              {/* Email contact link */}
              <a 
                href="mailto:attractivepilates@outlook.com" 
                className="flex items-center gap-3 hover:text-ciano transition-colors group"
                aria-label="Nosso e-mail de correspondência oficial"
                id="footer-email"
              >
                <div className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-500 group-hover:text-ciano group-hover:border-ciano/40 transition-colors">
                  <Mail size={16} />
                </div>
                <span>attractivepilates@outlook.com</span>
              </a>

              {/* Instagram link */}
              <a 
                href="https://www.instagram.com/attractivepilates" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 hover:text-ciano transition-colors group"
                aria-label="Siga-nos no Instagram oficial"
                id="footer-instagram"
              >
                <div className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-500 group-hover:text-ciano group-hover:border-ciano/40 transition-colors">
                  <Instagram size={16} />
                </div>
                <span>@attractivepilates</span>
              </a>

            </div>
          </div>

        </div>

        {/* Outer footer copyright area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span>
            © 2026 Attractive Pilates. Todos os direitos reservados.
          </span>
          <span className="text-slate-600">
            Copacabana • Rio de Janeiro • Brasil
          </span>
        </div>

      </footer>
    </div>
  );
}
