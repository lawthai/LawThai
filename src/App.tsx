import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  ShieldCheck,
  Target,
  Handshake,
  Lock,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { SmartImage } from "./components/SmartImage";
import { CountUp } from "./components/CountUp";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll to trigger sticky header background conversion
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler taking into account the sticky header offset
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // approximate height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false);
    }
  };

  // Shared Animation Variants for Scroll Reveals
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-primary/20 selection:text-primary font-sans antialiased overflow-x-hidden">
      
      {/* 1. NAVBAR SECTION */}
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-primary/10"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "hero")}
            className="flex items-center space-x-3 group"
            id="nav-logo-link"
          >
            <div className="w-10 h-10 overflow-hidden rounded-lg">
              <SmartImage
                src="/public/logo.png"
                alt="LAW THAI Logo"
                fallbackType="logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-sans font-bold text-xl tracking-wider leading-none transition-colors duration-300 ${
                isScrolled ? "text-primary" : "text-primary"
              }`}>
                LAW THAI
              </span>
              <span className="text-[10px] font-sans text-gold tracking-widest leading-none mt-1 font-semibold">
                CO., LTD.
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" id="desktop-nav">
            {[
              { label: "บริการ", id: "services" },
              { label: "เกี่ยวกับเรา", id: "about" },
              { label: "จุดเด่น", id: "why-us" },
              { label: "กลุ่มลูกค้า", id: "clients" },
              { label: "ติดต่อ", id: "contact" },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="relative px-3 py-2 text-sm font-medium text-dark/80 hover:text-primary rounded-lg transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute bottom-1 left-3 right-3 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </a>
            ))}
          </nav>

          {/* Desktop Call To Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://line.me/ti/p/Q3FwnDfzs_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-primary hover:bg-[#0d5955] text-white font-medium text-sm rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              id="cta-navbar-line"
            >
              {/* LINE style icon */}
              <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 10.3c0-5.7-5.4-10.3-12-10.3S0 4.6 0 10.3c0 5.1 4.3 9.4 10.1 10.1.4.1.9.3 1.1.7l.4 1.7c.1.5.1 1.2-.2 1.7-.2.3-.6.4-.8.2-.1-.1-1.7-1.1-2.4-2.1-3.6-.8-6.1-4-6.1-7.8C2.1 5.7 6.6 2.1 12 2.1s9.9 3.6 9.9 8.2c0 4.6-4.4 8.2-9.9 8.2-.5 0-1 .1-1.5.2 1.3 1 2.8 2.2 3.1 2.4.3.2.3-.1.3-.4l-.2-1.7c-.1-.5.1-.9.4-1.2 5.5-1.1 9.8-5.3 9.8-10.5z" />
              </svg>
              ติดต่อผ่าน LINE
            </a>
          </div>

          {/* Hamburger Menu Toggle for Mobile */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-dark/80 hover:text-primary focus:outline-none transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* Mobile Menu Dropdown Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-[70px] left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-lg border-b border-primary/10 md:hidden"
            id="mobile-nav-panel"
          >
            <div className="px-4 py-6 space-y-3 flex flex-col">
              {[
                { label: "บริการของเรา", id: "services" },
                { label: "เกี่ยวกับเรา", id: "about" },
                { label: "จุดเด่นของบริษัท", id: "why-us" },
                { label: "กลุ่มลูกค้า", id: "clients" },
                { label: "ติดต่อทนายความ", id: "contact" },
              ].map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="px-4 py-3 text-base font-medium text-dark/80 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
              <hr className="border-gray-100 my-2" />
              <div className="grid grid-cols-2 gap-3 px-2 pt-2">
                <a
                  href="https://line.me/ti/p/Q3FwnDfzs_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center py-3 bg-[#06C755] text-white font-medium text-sm rounded-xl hover:opacity-90 transition-opacity"
                >
                  LINE Chat
                </a>
                <a
                  href="tel:0-2995-4588"
                  className="inline-flex items-center justify-center py-3 bg-primary text-white font-medium text-sm rounded-xl hover:opacity-90 transition-opacity"
                >
                  โทรด่วน
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* 2. HERO SECTION */}
      <section
        id="hero"
        className="relative min-h-[92vh] flex items-center pt-28 pb-16 md:py-36 overflow-hidden bg-gradient-to-b from-primary/5 via-transparent to-transparent"
      >
        {/* Floating animated blobs */}
        <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-primary/20 blur-3xl animate-blob-1 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-secondary/15 blur-3xl animate-blob-2 pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-60 h-60 rounded-full bg-gold/10 blur-3xl animate-blob-1 pointer-events-none" />

        {/* Optional City Skyline Background with custom gradient mask */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          <SmartImage
            src="/public/hero-bg.jpg"
            alt="City Skyline Backdrop"
            fallbackType="hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-light via-bg-light/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left"
              id="hero-content-block"
            >
              {/* Premium tag */}
              <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-primary font-medium text-sm mb-6 mx-auto lg:mx-0 w-fit">
                <Sparkles className="w-4 h-4 text-gold" />
                <span>LAW THAI - บจก. ลอว์ ไทย</span>
              </div>

              <h1 className="font-sans font-bold text-dark tracking-tight leading-tight mb-4">
                <span className="block text-4xl sm:text-5xl md:text-6xl text-dark">
                  ที่ปรึกษาครบวงจร
                </span>
                <span className="block text-2xl sm:text-3xl md:text-4xl text-primary mt-2">
                  กฎหมาย การเงิน การลงทุน บัญชี ในที่เดียว
                </span>
              </h1>

              <p className="text-base sm:text-lg text-dark/70 max-w-2xl leading-relaxed mb-8 mx-auto lg:mx-0">
                ให้คำปรึกษาแนะนำ วางแผนกลยุทธ์ทางธุรกิจ ด้วยความรวดเร็ว กระชับ 
                พร้อมแนวทางและคำตอบให้กับทุกปัญหาที่เกิดขึ้น เพื่อผลลัพธ์ที่ดีที่สุดสำหรับธุรกิจคุณ
              </p>

              {/* Call-to-action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4" id="hero-ctas">
                <a
                  href="https://line.me/ti/p/Q3FwnDfzs_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#06C755] hover:bg-[#05b04b] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-base group"
                >
                  <svg className="w-5 h-5 mr-3 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 10.3c0-5.7-5.4-10.3-12-10.3S0 4.6 0 10.3c0 5.1 4.3 9.4 10.1 10.1.4.1.9.3 1.1.7l.4 1.7c.1.5.1 1.2-.2 1.7-.2.3-.6.4-.8.2-.1-.1-1.7-1.1-2.4-2.1-3.6-.8-6.1-4-6.1-7.8C2.1 5.7 6.6 2.1 12 2.1s9.9 3.6 9.9 8.2c0 4.6-4.4 8.2-9.9 8.2-.5 0-1 .1-1.5.2 1.3 1 2.8 2.2 3.1 2.4.3.2.3-.1.3-.4l-.2-1.7c-.1-.5.1-.9.4-1.2 5.5-1.1 9.8-5.3 9.8-10.5z" />
                  </svg>
                  ติดต่อทนายความผ่าน LINE
                </a>
                <a
                  href="tel:0-2995-4588"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white border border-primary/30 text-primary hover:bg-primary/5 font-semibold rounded-full shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 text-base"
                >
                  <Phone className="w-5 h-5 mr-3 text-primary animate-pulse" />
                  โทรหาเราตอนนี้
                </a>
              </div>
            </motion.div>

            {/* Hero Right Visual Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-5 hidden lg:block"
              id="hero-visual-card"
            >
              {/* Premium overlapping layout representing growth and professionalism */}
              <div className="relative">
                {/* Gold geometric square decoration */}
                <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-gold pointer-events-none" />
                <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-gold pointer-events-none" />
                
                {/* Main illustration placeholder box */}
                <div className="bg-white p-4 rounded-3xl shadow-2xl border border-primary/5 overflow-hidden">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-primary/10 relative">
                    <SmartImage
                      src="/public/about-office.jpg"
                      alt="LAW THAI Premium Office Room"
                      fallbackType="about"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Embedded mini trust floating card */}
                  <div className="mt-4 p-4 bg-gradient-to-r from-primary to-[#187570] text-white rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-xs text-accent-light tracking-wide uppercase font-semibold">LAW THAI Trust</h4>
                      <p className="text-sm font-semibold mt-1">บริการที่ปรึกษาระดับพรีเมียม</p>
                    </div>
                    <div className="h-8 w-px bg-white/20 mx-4" />
                    <div className="text-right">
                      <span className="block text-xs text-white/75">ประสบการณ์</span>
                      <span className="text-base font-bold text-gold">20+ ปีเต็ม</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* 3. ABOUT SECTION */}
      <section
        id="about"
        className="py-20 md:py-28 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
            id="about-container"
          >
            {/* Image Column */}
            <div className="lg:col-span-5" id="about-visual-column">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-lg opacity-25 group-hover:opacity-35 transition duration-500" />
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 h-[350px] sm:h-[450px] lg:h-auto lg:aspect-[4/5] bg-gray-50">
                  <SmartImage
                    src="/public/about-office.jpg"
                    alt="LAW THAI Office Lobby"
                    fallbackType="about"
                    className="w-full h-full object-cover transform hover:scale-102 transition duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Text Information Column */}
            <div className="lg:col-span-7 flex flex-col" id="about-text-column">
              <span className="text-gold font-semibold tracking-wider text-sm uppercase mb-2">ABOUT US</span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark tracking-tight leading-tight mb-6">
                เกี่ยวกับเรา
                <div className="h-[3px] w-12 bg-primary mt-3 rounded-full" />
              </h2>

              <p className="text-dark/80 text-base md:text-lg leading-relaxed mb-6 font-light">
                ด้วยสภาพเศรษฐกิจในยุคปัจจุบันที่มีการเปลี่ยนแปลงอยู่ตลอดเวลา <strong>บริษัท ลอว์ ไทย จำกัด</strong> จึงก่อตั้งขึ้นเพื่อเป็นผู้เชี่ยวชาญด้านการให้คำปรึกษา ครอบคลุมทั้งด้านกฎหมาย การเงิน การลงทุน การตลาด และการบัญชี ให้แก่บุคคล องค์กร และธุรกิจทุกประเภท ทั้งภาครัฐและเอกชน
              </p>
              
              <p className="text-dark/80 text-base leading-relaxed mb-8 font-light">
                เรายึดมั่นและเน้นการให้บริการด้วยความรวดเร็ว กระชับ มีแนวทางและคำตอบให้กับทุกปัญหาที่เกิดขึ้น เพื่อช่วยลดข้อผิดพลาด ป้องกันความเสี่ยงทางธุรกิจ และสร้างผลตอบแทนสูงสุดให้กับลูกค้าอย่างยั่งยืน
              </p>

              {/* Badges row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100" id="about-badges">
                {[
                  { title: "ครอบคลุม 5 ด้านหลัก", desc: "กฎหมาย เงิน ลงทุน ตลาด บัญชี", color: "bg-primary/5 text-primary border-primary/20" },
                  { title: "ทีมงานมืออาชีพ", desc: "ทีมทนายและผู้เชี่ยวชาญเฉพาะทาง", color: "bg-gold/5 text-[#9A7D3C] border-gold/20" },
                  { title: "บริการรวดเร็ว กระชับ", desc: "รวดเร็ว ทันใจ ตรงประเด็นปัญหา", color: "bg-secondary/5 text-[#1e8b81] border-secondary/20" },
                ].map((badge, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border ${badge.color} flex flex-col`}>
                    <span className="font-bold text-sm leading-tight">{badge.title}</span>
                    <span className="text-xs text-dark/60 mt-1 leading-snug">{badge.desc}</span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </section>


      {/* 4. SERVICES SECTION */}
      <section
        id="services"
        className="py-20 md:py-28 bg-[#F0F5F5]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16" id="services-header">
            <span className="text-gold font-semibold tracking-wider text-sm uppercase">OUR SERVICES</span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mt-2 tracking-tight">
              บริการของเรา
            </h2>
            <div className="h-[2px] w-20 bg-gold mx-auto mt-4" />
            <p className="text-dark/70 text-base mt-4 font-light">
              เราเพียบพร้อมด้วยบริการให้คำปรึกษาแบบครบวงจร ครอบคลุมทุกความต้องการด้านการบริหารและขยายธุรกิจอย่างปลอดภัย
            </p>
          </div>

          {/* Grid Layout of 5 service cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            id="services-grid"
          >
            {[
              {
                title: "กฎหมาย",
                desc: "ให้คำปรึกษา วางแผน และแก้ไขปัญหาด้านกฎหมายครบวงจร",
                svg: (
                  <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    {/* Scales of Justice */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M12 3L6 6m6-3l6 3M6 10c0 2 3 2 3 0s-3-2-3 0zm12 0c0 2 3 2 3 0s-3-2-3 0zM3 10h6m12 0h-6M6 10v6c0 2.5 3 2.5 3 0v-6m6 0v6c0 2.5 3 2.5 3 0v-6M12 21h4m-8 0h4" />
                  </svg>
                )
              },
              {
                title: "การเงิน",
                desc: "วางแผนการเงินและบริหารจัดการอย่างมีประสิทธิภาพ",
                svg: (
                  <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    {/* Pie chart & Coins */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.003 9.003 0 1020.95 12H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9zM19 13h2a1 1 0 011 1v4a1 1 0 01-1 1h-2a1 1 0 01-1-1v-4a1 1 0 011-1z" />
                  </svg>
                )
              },
              {
                title: "การลงทุน",
                desc: "ให้คำแนะนำการลงทุนที่เหมาะสมกับเป้าหมายธุรกิจ",
                svg: (
                  <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    {/* Growth Chart / Graph with Arrow */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 11h4v10h-4zM11 15h4v6h-4zM5 18h4v3H5z" />
                  </svg>
                )
              },
              {
                title: "การตลาด",
                desc: "วางกลยุทธ์การตลาดเพื่อขยายฐานลูกค้า",
                svg: (
                  <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    {/* Megaphone / Bullhorn */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                )
              },
              {
                title: "บัญชี",
                desc: "จัดทำและให้คำปรึกษาด้านบัญชีอย่างถูกต้องแม่นยำ",
                svg: (
                  <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    {/* Calculator with Ledger Sheet */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                )
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUpVariants}
                className="bg-white rounded-2xl p-6 shadow-md border border-primary/5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col items-center text-center group"
              >
                {/* SVG Icon wrapper */}
                <div className="p-4 bg-primary/5 rounded-2xl mb-5 group-hover:bg-primary/10 transition-colors duration-300">
                  {service.svg}
                </div>
                
                {/* Gold Highlight Line */}
                <div className="h-[2px] w-8 bg-transparent group-hover:bg-gold mb-3 transition-colors duration-300" />
                
                <h3 className="font-bold text-lg text-dark mb-3">
                  {service.title}
                </h3>
                
                <p className="text-xs text-dark/70 leading-relaxed font-light">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* 5. WHY CHOOSE US SECTION */}
      <section
        id="why-us"
        className="py-20 md:py-28 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16" id="why-us-header">
            <span className="text-gold font-semibold tracking-wider text-sm uppercase">WHY LAW THAI</span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mt-2 tracking-tight">
              จุดเด่นของเรา
            </h2>
            <div className="h-[2px] w-20 bg-gold mx-auto mt-4" />
            <p className="text-dark/70 text-base mt-4 font-light">
              สิ่งที่เรายึดมั่นเพื่อให้ลูกค้ามั่นใจในการบริการและไว้วางใจให้ทีมงานของเราดูแลในทุกขั้นตอน
            </p>
          </div>

          {/* 4 columns (2x2 on mobile) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            id="why-us-grid"
          >
            {[
              {
                icon: <ShieldCheck className="w-8 h-8 text-primary" />,
                title: "ทีมงานมืออาชีพ",
                desc: "ทนายความและนักบัญชีผู้เชี่ยวชาญ และมีประสบการณ์สูงในแต่ละด้าน"
              },
              {
                icon: <Target className="w-8 h-8 text-primary" />,
                title: "ตรงจุด ตรงความต้องการ",
                desc: "เข้าใจเจาะลึกปัญหา แก้ไขจุดบกพร่อง และให้คำแนะนำที่ถูกต้อง รวดเร็ว"
              },
              {
                icon: <Handshake className="w-8 h-8 text-primary" />,
                title: "บริการครบวงจร",
                desc: "ครบเครื่องทุกบริการที่เดียวในที่เดียว ไม่ต้องเหนื่อยติดต่อผู้ประสานหลายเจ้า"
              },
              {
                icon: <Lock className="w-8 h-8 text-primary" />,
                title: "เชื่อถือได้ ปลอดภัย",
                desc: "รักษาความลับส่วนตัวและข้อมูลสำคัญทางธุรกิจของลูกค้าอย่างเข้มงวดที่สุด"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUpVariants}
                className="flex flex-col p-6 rounded-2xl bg-[#F7FAFA] border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <div className="p-3 bg-white w-fit rounded-xl shadow-sm border border-primary/5 mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg text-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-dark/70 leading-relaxed font-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Row Separator */}
          <div className="mt-16 pt-12 border-t border-gray-100" id="stats-section">
            <div className="flex flex-col md:flex-row items-center justify-around gap-8 md:gap-4 max-w-4xl mx-auto">
              
              {/* Stat 1 */}
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-primary flex items-center justify-center">
                  <CountUp end={20} suffix="+ ปี" />
                </div>
                <p className="text-sm text-dark/75 mt-2 font-medium">
                  ประสบการณ์อันยาวนานในธุรกิจที่ปรึกษา
                </p>
              </div>

              {/* Vertical divider on desktop, horizontal on mobile */}
              <div className="hidden md:block w-px h-16 bg-gold/50" />
              <div className="block md:hidden w-16 h-px bg-gold/50" />

              {/* Stat 2 */}
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-gold flex items-center justify-center">
                  <CountUp end={40} suffix="%" />
                </div>
                <p className="text-sm text-dark/75 mt-2 font-medium">
                  การเพิ่มประสิทธิภาพธุรกิจและช่วยให้ลูกค้าเติบโต
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* 6. CLIENT TYPES SECTION */}
      <section
        id="clients"
        className="py-20 md:py-28 bg-[#F7FAFA]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16" id="clients-header">
            <span className="text-gold font-semibold tracking-wider text-sm uppercase">OUR TARGET CLIENTS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mt-2 tracking-tight">
              กลุ่มลูกค้าของเรา
            </h2>
            <div className="h-[2px] w-20 bg-gold mx-auto mt-4" />
            <p className="text-dark/70 text-base mt-4 font-light">
              เราให้บริการครอบคลุมในทุกระดับ ตั้งแต่นักธุรกิจสตาร์ทอัพรุ่นใหม่ ตลอดจนองค์กรขนาดใหญ่และบุคคลทั่วไป
            </p>
          </div>

          {/* Client Portrait row (3 columns) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            id="clients-grid"
          >
            {[
              {
                src: "/public/client-startup.jpg",
                fallbackType: "client-startup",
                label: "นักธุรกิจรุ่นใหม่ / สตาร์ทอัพ"
              },
              {
                src: "/public/client-corporate.jpg",
                fallbackType: "client-corporate",
                label: "องค์กรธุรกิจ / บริษัทขนาดกลาง-ใหญ่"
              },
              {
                src: "/public/client-individual.jpg",
                fallbackType: "client-individual",
                label: "บุคคลทั่วไป / ที่ต้องการความช่วยเหลือ"
              }
            ].map((client, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUpVariants}
                className="group relative rounded-2xl overflow-hidden shadow-lg border border-primary/5 cursor-pointer"
              >
                {/* Image and zoom effect */}
                <div className="h-72 overflow-hidden relative">
                  <SmartImage
                    src={client.src}
                    alt={client.label}
                    fallbackType={client.fallbackType as any}
                    className="w-full h-full object-cover group-hover:scale-105 duration-500"
                    overlay={true}
                  />
                  {/* Text Overlay pinned inside */}
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-white z-10 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent">
                    <span className="text-gold text-xs tracking-wider uppercase font-semibold mb-1">Target Group</span>
                    <h4 className="font-bold text-lg tracking-wide group-hover:text-accent-light transition-colors">
                      {client.label}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* 7. CONTACT/CTA SECTION */}
      <section
        id="contact"
        className="relative py-20 bg-dark text-white overflow-hidden"
      >
        {/* Subtle abstract wave lines background decoration */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 0,100 C 150,150 350,0 500,100 C 650,200 900,100 1000,150 L 1000,300 L 0,300 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M 0,50 C 200,20 400,120 600,50 C 800,-20 900,80 1000,30"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
            className="text-center max-w-4xl mx-auto"
            id="contact-container"
          >
            <span className="text-gold font-bold tracking-widest text-sm uppercase">CONSULTATION</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 tracking-tight leading-tight">
              พร้อมให้คำปรึกษาคุณแล้ววันนี้
            </h2>
            <p className="text-white/70 text-base md:text-lg mt-4 max-w-2xl mx-auto font-light">
              ติดต่อหาเราได้โดยตรงผ่าน LINE โทรศัพค์ หรือทางอีเมลเพื่อรับคำแนะนำเบื้องต้นฟรี
            </p>

            {/* Clickable contact options layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12" id="contact-methods">
              
              {/* LINE card */}
              <a
                href="https://line.me/ti/p/Q3FwnDfzs_"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-6 rounded-2xl bg-[#06C755] text-white hover:bg-[#05b04b] transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
              >
                <div className="p-3 bg-white/10 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 10.3c0-5.7-5.4-10.3-12-10.3S0 4.6 0 10.3c0 5.1 4.3 9.4 10.1 10.1.4.1.9.3 1.1.7l.4 1.7c.1.5.1 1.2-.2 1.7-.2.3-.6.4-.8.2-.1-.1-1.7-1.1-2.4-2.1-3.6-.8-6.1-4-6.1-7.8C2.1 5.7 6.6 2.1 12 2.1s9.9 3.6 9.9 8.2c0 4.6-4.4 8.2-9.9 8.2-.5 0-1 .1-1.5.2 1.3 1 2.8 2.2 3.1 2.4.3.2.3-.1.3-.4l-.2-1.7c-.1-.5.1-.9.4-1.2 5.5-1.1 9.8-5.3 9.8-10.5z" />
                  </svg>
                </div>
                <h4 className="font-bold text-lg">แชทผ่าน LINE</h4>
                <p className="text-white/80 text-xs mt-1">สะดวก รวดเร็ว ตอบกลับทันที</p>
                <div className="mt-4 px-4 py-1.5 bg-white/15 rounded-full text-xs font-semibold flex items-center">
                  @LawThai
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </a>

              {/* Phone card */}
              <a
                href="tel:0-2995-4588"
                className="group flex flex-col items-center p-6 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-3 bg-white/5 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8 text-gold" />
                </div>
                <h4 className="font-bold text-lg text-white">โทรสายด่วน</h4>
                <p className="text-white/60 text-xs mt-1">ปรึกษาด่วนกับเจ้าหน้าที่</p>
                <div className="mt-4 text-gold font-mono font-bold text-lg group-hover:text-white transition-colors">
                  0-2995-4588
                </div>
              </a>

              {/* Email card */}
              <a
                href="mailto:consult@lawthai.co.th"
                className="group flex flex-col items-center p-6 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-3 bg-white/5 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-8 h-8 text-accent-light" />
                </div>
                <h4 className="font-bold text-lg text-white">ส่งอีเมล</h4>
                <p className="text-white/60 text-xs mt-1">ส่งประเด็นปัญหาให้เราวิเคราะห์</p>
                <div className="mt-4 text-accent-light text-sm font-semibold truncate max-w-full group-hover:text-white transition-colors">
                  consult@lawthai.co.th
                </div>
              </a>

            </div>
          </motion.div>
        </div>
      </section>


      {/* 8. FOOTER */}
      <footer
        id="footer"
        className="bg-dark text-white pt-16 pb-8 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12" id="footer-grid">
            
            {/* Column 1: Company Logo / Info */}
            <div className="flex flex-col space-y-4" id="footer-col-1">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 overflow-hidden rounded-lg">
                  <SmartImage
                    src="/public/logo.png"
                    alt="LAW THAI Logo"
                    fallbackType="logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-sans font-bold text-lg tracking-wider">
                  LAW THAI
                </span>
              </div>
              <p className="text-white/60 text-xs leading-relaxed max-w-xs font-light">
                <strong>บริษัท ลอว์ ไทย จำกัด</strong> (LAW THAI Co., Ltd.) 
                ผู้ช่วยอันดับหนึ่งและพันธมิตรที่ไว้วางใจได้ในการปรึกษาทางกฎหมาย บัญชี และธุรกิจครบวงจร
              </p>
            </div>

            {/* Column 2: Address */}
            <div className="flex flex-col space-y-4" id="footer-col-2">
              <h3 className="font-bold text-sm tracking-widest text-gold uppercase">ที่อยู่สำนักงาน</h3>
              <div className="flex items-start space-x-2.5 text-white/70 text-xs leading-relaxed">
                <MapPin className="w-4 h-4 text-accent-light shrink-0 mt-0.5" />
                <span>
                  22/17 หมู่ที่ 5 ตำบลคูคต อำเภอลำลูกกา จังหวัดปทุมธานี 12130
                </span>
              </div>
            </div>

            {/* Column 3: Contact */}
            <div className="flex flex-col space-y-4" id="footer-col-3">
              <h3 className="font-bold text-sm tracking-widest text-gold uppercase">ติดต่อเรา</h3>
              <ul className="space-y-2.5 text-white/70 text-xs">
                <li className="flex items-center space-x-2.5">
                  <Phone className="w-4 h-4 text-accent-light" />
                  <a href="tel:0-2995-4588" className="hover:text-white transition-colors">
                    0-2995-4588
                  </a>
                  <span>,</span>
                  <a href="tel:08-1569-4266" className="hover:text-white transition-colors">
                    08-1569-4266
                  </a>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Mail className="w-4 h-4 text-accent-light" />
                  <a href="mailto:consult@lawthai.co.th" className="hover:text-white transition-colors">
                    consult@lawthai.co.th
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Hours & Social */}
            <div className="flex flex-col space-y-4" id="footer-col-4">
              <h3 className="font-bold text-sm tracking-widest text-gold uppercase">เวลาทำการ</h3>
              <div className="flex items-center space-x-2.5 text-white/70 text-xs">
                <Clock className="w-4 h-4 text-accent-light" />
                <span>จันทร์–เสาร์ 08:30–16:30 น.</span>
              </div>
              
              {/* Social icons row */}
              <div className="pt-3 flex items-center space-x-3" id="social-links">
                {/* LINE link */}
                <a
                  href="https://line.me/ti/p/Q3FwnDfzs_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#06C755] flex items-center justify-center text-white hover:scale-105 transition-transform"
                  aria-label="LINE"
                >
                  <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 10.3c0-5.7-5.4-10.3-12-10.3S0 4.6 0 10.3c0 5.1 4.3 9.4 10.1 10.1.4.1.9.3 1.1.7l.4 1.7c.1.5.1 1.2-.2 1.7-.2.3-.6.4-.8.2-.1-.1-1.7-1.1-2.4-2.1-3.6-.8-6.1-4-6.1-7.8C2.1 5.7 6.6 2.1 12 2.1s9.9 3.6 9.9 8.2c0 4.6-4.4 8.2-9.9 8.2-.5 0-1 .1-1.5.2 1.3 1 2.8 2.2 3.1 2.4.3.2.3-.1.3-.4l-.2-1.7c-.1-.5.1-.9.4-1.2 5.5-1.1 9.8-5.3 9.8-10.5z" />
                  </svg>
                </a>
                
                {/* Facebook Link */}
                <a
                  href="https://www.facebook.com/lawthaicompany/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:scale-105 transition-transform"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom sub footer bar */}
          <div className="pt-8 mt-8 border-t border-white/5 text-center text-xs text-white/40">
            <p>© 2026 LAW THAI Co., Ltd. สงวนลิขสิทธิ์</p>
          </div>

        </div>
      </footer>


      {/* FLOATING PULSING LINE BUTTON */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="https://line.me/ti/p/Q3FwnDfzs_"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-14 h-14 bg-[#06C755] hover:bg-[#05b04b] text-white rounded-full shadow-2xl hover:scale-105 duration-300 group"
          id="floating-line-button"
        >
          {/* Pulsing ring animation */}
          <span className="absolute -inset-1 bg-[#06C755]/40 rounded-full animate-ping pointer-events-none" />
          
          <svg className="w-7 h-7 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 10.3c0-5.7-5.4-10.3-12-10.3S0 4.6 0 10.3c0 5.1 4.3 9.4 10.1 10.1.4.1.9.3 1.1.7l.4 1.7c.1.5.1 1.2-.2 1.7-.2.3-.6.4-.8.2-.1-.1-1.7-1.1-2.4-2.1-3.6-.8-6.1-4-6.1-7.8C2.1 5.7 6.6 2.1 12 2.1s9.9 3.6 9.9 8.2c0 4.6-4.4 8.2-9.9 8.2-.5 0-1 .1-1.5.2 1.3 1 2.8 2.2 3.1 2.4.3.2.3-.1.3-.4l-.2-1.7c-.1-.5.1-.9.4-1.2 5.5-1.1 9.8-5.3 9.8-10.5z" />
          </svg>
          
          {/* Tooltip text showing up on hover */}
          <span className="absolute right-16 bg-dark text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md pointer-events-none">
            คุยไลน์กับเรา
          </span>
        </a>
      </div>

    </div>
  );
}
