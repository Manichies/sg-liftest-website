import { useState, useEffect, useRef } from "react";
import sgLiftLogo from "/SGLIFT_logo.PNG";
import bcaLogo from "/BCA.png";
import bizSafeLogo from "/BizSafe3.png";
import elevatorClosingPressureImg from "./assets/ElevatorClosingPressure.JPG";

// ─── SVG Icon Components ───
const Icons = {
  Shield: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  ),
  CheckCircle: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
  ),
  Search: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
  ),
  FileText: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
  ),
  Phone: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
  ),
  MapPin: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  ArrowRight: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  ),
  Download: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
  ),
  X: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  WhatsApp: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
  ),
  ChevronDown: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
  ),
  AlertTriangle: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
  ),
  Activity: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  ),
  Award: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
  ),
  Wrench: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
  ),
  Eye: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
};

// ─── Equipment Data ───
const liftEquipment = [
  { id: "rope-slip", name: "Elevator Wire Rope Slip Detector", tagline: "Wire Rope Slip Detector for Elevator Traction Monitoring", desc: "Specialized monitoring device designed to detect and measure rope slippage between the traction sheave and hoisting ropes. Uses precise sensors and digital data analysis to identify abnormal movement or loss of traction.", features: ["High-precision sensors with fast sampling", "Non-intrusive operation", "Real-time speed–time curve visualization", "Wireless transmission & USB connectivity", "Aluminum alloy casing — lightweight & durable"], color: "#1a5276" },
  { id: "governor", name: "Elevator Governor Tester", tagline: "Accurate & Portable Testing Solution for Elevator Speed Governors", desc: "A precision instrument for testing elevator speed governors on-site. Measures tripping speed, reset speed, and overspeed governor performance to ensure compliance with EN 81 and SS550 standards.", features: ["Portable & field-ready design", "Digital readout with data logging", "Tests tripping and reset speeds", "Compatible with all governor types", "Automatic report generation"], color: "#1e8449" },
  { id: "landing-door", name: "Elevator Landing Door Stress Deformation Detector", tagline: "Precision Monitoring for Door Frame Alignment & Structural Safety", desc: "Advanced detector that measures stress and deformation on elevator landing doors to ensure structural integrity and safety compliance. Identifies misalignment, warping, or fatigue in door frames.", features: ["High-sensitivity strain gauges", "Real-time deformation mapping", "Threshold alerts for safety limits", "Compact sensor array design", "EN 81 compliant testing protocols"], color: "#7d3c98" },
  { id: "rope-flaw", name: "Elevator Wire Rope Flaw Detector", tagline: "Precision Magnetic Inspection for Hidden Wire Rope Defects", desc: "Uses magnetic flux leakage technology to detect internal and external defects in elevator wire ropes, including broken wires, corrosion, and fatigue damage invisible to the naked eye.", features: ["Detects internal broken wires", "Magnetic flux leakage technology", "High-speed scanning capability", "Visual defect mapping output", "Compliant with international rope standards"], color: "#c0392b" },
  { id: "rope-tension", name: "Elevator Wire Rope Tension Tester", tagline: "Accurate Measurement for Balanced Elevator Rope Tension", desc: "Precision instrument for measuring and comparing tension across multiple elevator hoisting ropes to ensure balanced load distribution and prevent premature rope wear.", features: ["Multi-rope simultaneous measurement", "Digital display with deviation alerts", "Portable clamp-on design", "Data storage & export capability", "Ensures balanced rope loading"], color: "#2e86c1" },
  { id: "door-clearance", name: "Elevator Door Opening Clearance Detector", tagline: "Precision Measurement for Door Gap Alignment & Safety Compliance", desc: "Measures the clearance gaps around elevator doors to ensure they meet safety standards for finger entrapment prevention and smooth door operation.", features: ["Sub-millimetre measurement accuracy", "Articulated probe for tight spaces", "Digital display & logging", "Standards-compliant reporting", "Lightweight handheld design"], color: "#d4ac0d" },
  { id: "closing-pressure", name: "Elevator Closing Pressure Tester", tagline: "Safety Testing for Door Closing Force Compliance", desc: "Measures the kinetic energy and force of closing elevator doors to verify compliance with safety limits, protecting passengers from door-related injuries.", features: ["Force & kinetic energy measurement", "Peak detection with data hold", "Meets EN 81-20 requirements", "Compact handheld probe", "Instant pass/fail indication"], color: "#117864", image: elevatorClosingPressureImg },
];

const escalatorEquipment = [
  { id: "sync-rate", name: "Escalator Synchronization Rate Tester", tagline: "Precision Testing for Step Chain and Handrail Speed Synchronization", desc: "Measures the synchronization between step chain and handrail speeds to ensure passenger safety and comfort. Detects speed deviations that could cause falls or entrapment.", features: ["Dual-channel speed measurement", "Real-time sync ratio display", "Wireless handrail speed sensor", "Data logging with trend analysis", "EN 115 compliant"], color: "#1a5276" },
  { id: "comprehensive-eval", name: "Comprehensive Performance & Safety Evaluation System", tagline: "Integrated Testing Solution for Full Escalator Performance & Safety Compliance", desc: "An all-in-one system that evaluates multiple escalator performance parameters simultaneously — speed, vibration, noise, step alignment, and emergency response.", features: ["Multi-parameter simultaneous testing", "Integrated sensor suite", "Automated compliance reporting", "Cloud data upload capability", "Full EN 115 test coverage"], color: "#1e8449" },
  { id: "comprehensive-tester", name: "Comprehensive Tester for Escalator", tagline: "All-in-One Instrument for Escalator Performance & Safety Testing", desc: "Portable multi-function tester combining speed measurement, vibration analysis, and operational parameter monitoring into a single instrument for field use.", features: ["Speed, vibration & noise in one unit", "Touchscreen interface", "Built-in compliance calculations", "Rechargeable long-life battery", "Rugged field-ready enclosure"], color: "#7d3c98" },
  { id: "speed-displacement", name: "Escalator Speed Displacement Tester", tagline: "Precision Measurement of Escalator Speed and Step Movement Accuracy", desc: "Measures escalator step speed and displacement accuracy to detect irregularities in step chain movement that could affect passenger safety.", features: ["High-resolution optical encoder", "Step-by-step displacement tracking", "Speed deviation alerting", "Compact mounting system", "Real-time graph display"], color: "#c0392b" },
  { id: "engagement-depth", name: "Dynamic Engagement Depth Measuring Instrument", tagline: "Precision Measurement for Step and Comb Plate Engagement Safety", desc: "Measures the dynamic engagement depth between escalator steps and comb plates during operation to prevent entrapment and ensure safe step-to-comb transition.", features: ["Dynamic measurement during operation", "High-precision laser sensors", "Continuous monitoring mode", "Threshold alarm system", "Compact probe design"], color: "#2e86c1" },
  { id: "apron-clearance", name: "Dynamic Clearance Measuring Instrument for Apron Board", tagline: "Real-Time Measurement of Step-to-Apron Board Clearance for Safety Compliance", desc: "Measures the clearance between moving steps and stationary apron boards in real-time to ensure gaps remain within safety limits and prevent foot entrapment.", features: ["Real-time gap monitoring", "Non-contact measurement technology", "Sub-millimetre precision", "Continuous logging capability", "Visual & audible alerts on deviation"], color: "#d4ac0d" },
];

// ─── SVG Equipment Illustration Generator ───
function EquipmentSVG({ type, color, size = 200 }) {
  const patterns = {
    "rope-slip": (
      <svg width={size} height={size} viewBox="0 0 200 200">
        <rect width="200" height="200" fill={color} rx="16" opacity="0.1"/>
        <rect x="40" y="30" width="120" height="140" rx="8" fill={color} opacity="0.15"/>
        <rect x="55" y="50" width="90" height="60" rx="4" fill={color} opacity="0.3"/>
        <line x1="60" y1="65" x2="140" y2="65" stroke={color} strokeWidth="2" opacity="0.6"/>
        <line x1="60" y1="80" x2="140" y2="80" stroke={color} strokeWidth="2" opacity="0.6"/>
        <line x1="60" y1="95" x2="120" y2="95" stroke={color} strokeWidth="2" opacity="0.6"/>
        <circle cx="100" cy="145" r="12" fill={color} opacity="0.4"/>
        <rect x="88" y="142" width="24" height="6" rx="3" fill="white" opacity="0.6"/>
        <text x="100" y="185" textAnchor="middle" fill={color} fontSize="11" fontWeight="600" opacity="0.7">DETECTOR</text>
      </svg>
    ),
    "governor": (
      <svg width={size} height={size} viewBox="0 0 200 200">
        <rect width="200" height="200" fill={color} rx="16" opacity="0.1"/>
        <circle cx="100" cy="90" r="50" fill="none" stroke={color} strokeWidth="3" opacity="0.3"/>
        <circle cx="100" cy="90" r="35" fill="none" stroke={color} strokeWidth="2" opacity="0.2"/>
        <circle cx="100" cy="90" r="8" fill={color} opacity="0.5"/>
        <line x1="100" y1="90" x2="130" y2="70" stroke={color} strokeWidth="3" opacity="0.5"/>
        <rect x="60" y="150" width="80" height="25" rx="4" fill={color} opacity="0.2"/>
        <text x="100" y="167" textAnchor="middle" fill={color} fontSize="10" fontWeight="600" opacity="0.6">RPM 1200</text>
        <text x="100" y="190" textAnchor="middle" fill={color} fontSize="11" fontWeight="600" opacity="0.7">TESTER</text>
      </svg>
    ),
  };

  // Default pattern for all types
  return patterns[type] || (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <rect width="200" height="200" fill={color} rx="16" opacity="0.1"/>
      <rect x="35" y="25" width="130" height="130" rx="10" fill={color} opacity="0.12"/>
      <rect x="50" y="45" width="100" height="50" rx="6" fill={color} opacity="0.25"/>
      <circle cx="75" cy="70" r="8" fill={color} opacity="0.4"/>
      <circle cx="100" cy="70" r="8" fill={color} opacity="0.4"/>
      <circle cx="125" cy="70" r="8" fill={color} opacity="0.4"/>
      <rect x="50" y="105" width="100" height="35" rx="4" fill={color} opacity="0.18"/>
      <line x1="60" y1="115" x2="140" y2="115" stroke={color} strokeWidth="1.5" opacity="0.3"/>
      <line x1="60" y1="125" x2="120" y2="125" stroke={color} strokeWidth="1.5" opacity="0.3"/>
      <rect x="70" y="165" width="60" height="16" rx="8" fill={color} opacity="0.3"/>
      <text x="100" y="177" textAnchor="middle" fill="white" fontSize="8" fontWeight="600" opacity="0.8">TEST</text>
    </svg>
  );
}

// ─── PDF Generation ───
function generateEquipmentPDF(equipment, category) {
  const title = category === "lift" ? "Lift Testing Equipment Catalogue" : "Escalator Testing Equipment Catalogue";
  
  // Build a printable HTML document
  const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>${title}</title>
<style>
  @page { margin: 20mm; size: A4; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1a1a2e; line-height: 1.5; }
  .cover { height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background: linear-gradient(135deg, #0a1628 0%, #1a3a5c 100%); color: white; text-align: center; page-break-after: always; }
  .cover h1 { font-size: 32px; margin-bottom: 8px; letter-spacing: 2px; }
  .cover h2 { font-size: 18px; font-weight: 400; opacity: 0.8; margin-bottom: 40px; }
  .cover .company { font-size: 14px; opacity: 0.6; margin-top: 60px; }
  .cover .logo-text { font-size: 48px; font-weight: 800; letter-spacing: 4px; margin-bottom: 20px; color: #e8b931; }
  .item { page-break-inside: avoid; margin-bottom: 30px; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px; }
  .item h2 { font-size: 20px; color: #0a1628; margin-bottom: 4px; }
  .item .tagline { font-size: 13px; color: #666; margin-bottom: 12px; font-style: italic; }
  .item .desc { font-size: 13px; color: #333; margin-bottom: 16px; }
  .item .features { list-style: none; padding: 0; }
  .item .features li { font-size: 12px; padding: 4px 0 4px 20px; position: relative; color: #444; }
  .item .features li:before { content: "✓"; position: absolute; left: 0; color: #1a5276; font-weight: bold; }
  .toc { page-break-after: always; padding: 40px 0; }
  .toc h2 { font-size: 24px; margin-bottom: 20px; color: #0a1628; border-bottom: 2px solid #e8b931; padding-bottom: 8px; }
  .toc-item { padding: 8px 0; border-bottom: 1px dotted #ccc; font-size: 14px; }
  .toc-num { color: #e8b931; font-weight: 700; margin-right: 12px; }
  .header-bar { background: #0a1628; color: white; padding: 8px 20px; font-size: 11px; display: flex; justify-content: space-between; margin-bottom: 20px; }
  .footer { text-align: center; font-size: 10px; color: #999; margin-top: 30px; padding-top: 12px; border-top: 1px solid #eee; }
</style></head><body>
<div class="cover">
  <div class="logo-text">SINGAPORE LIFT INSPECTION TESTING</div>
  <h1>${title}</h1>
  <h2>Professional Testing & Inspection Solutions</h2>
  <div class="company">Singapore Lift Inspection Testing Pte Ltd<br/>BCA-Registered | bizSAFE Level 3 Certified<br/>32 Old Toh Tuck Road #02-15 I.Biz Centre, Singapore 597658</div>
</div>
<div class="toc">
  <h2>Table of Contents</h2>
  ${equipment.map((eq, i) => `<div class="toc-item"><span class="toc-num">${String(i + 1).padStart(2, '0')}</span>${eq.name}</div>`).join('')}
</div>
${equipment.map((eq, i) => `
<div class="item">
  <div class="header-bar"><span>${title}</span><span>Item ${i + 1} of ${equipment.length}</span></div>
  <h2>${eq.name}</h2>
  <div class="tagline">${eq.tagline}</div>
  <div class="desc">${eq.desc}</div>
  <h4 style="font-size:13px;margin-bottom:8px;color:#1a5276;">Key Features & Benefits</h4>
  <ul class="features">${eq.features.map(f => `<li>${f}</li>`).join('')}</ul>
  <div class="footer">© 2026 Singapore Lift Inspection Testing Pte Ltd | enquiry@lifttest.com | +65 9615 1522</div>
</div>`).join('')}
</body></html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${category}-testing-equipment-catalogue.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── Styles ───
const styles = {
  // Color system
  colors: {
    navy: "#0a1628",
    navyLight: "#132a46",
    gold: "#e8b931",
    goldLight: "#f5d76e",
    slate: "#2c3e50",
    white: "#ffffff",
    offWhite: "#f7f8fa",
    gray100: "#f0f2f5",
    gray300: "#d1d5db",
    gray500: "#6b7280",
    gray700: "#374151",
    accent: "#1a5276",
  },
};

// ─── Navigation Component ───
function Navigation({ page, setPage }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [equipDropdown, setEquipDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const container = document.querySelector('.site-container');
    if (!container) return;
    const handleScroll = () => setScrolled(container.scrollTop > 50);
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const navStyle = {
    position: "sticky", top: 0, zIndex: 100,
    background: scrolled ? "rgba(10,22,40,0.97)" : "rgba(10,22,40,0.92)",
    backdropFilter: "blur(12px)",
    borderBottom: `1px solid ${scrolled ? "rgba(232,185,49,0.15)" : "transparent"}`,
    transition: "all 0.3s ease",
  };

  const navItems = [
    { label: "Home", key: "home" },
    { label: "About", key: "about" },
    { label: "Services", key: "services" },
    { label: "Equipments", key: "equipment", hasDropdown: true },
    { label: "Contact", key: "contact" },
  ];

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        {/* Logo */}
        <div style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }} onClick={() => setPage("home")}>
          <img src={sgLiftLogo} alt="Company Logo" style={{ width: 44, height: 44, borderRadius: 10, objectFit: "contain" }} />
          <div>
            <div style={{ color: styles.colors.white, fontWeight: 700, fontSize: 15, letterSpacing: 1.5, lineHeight: 1.2, fontFamily: "'DM Sans', sans-serif" }}>SINGAPORE LIFT INSPECTION TESTING</div>
            <div style={{ color: styles.colors.gold, fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", fontWeight: 500 }}>Testing Pte Ltd</div>
          </div>
        </div>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="desktop-nav">
          {navItems.map(item => (
            <div key={item.key} style={{ position: "relative" }}
              onMouseEnter={() => item.hasDropdown && setEquipDropdown(true)}
              onMouseLeave={() => item.hasDropdown && setEquipDropdown(false)}>
              <button
                onClick={() => {
                  if (item.hasDropdown) {
                    setPage("lift-equipment");
                  } else {
                    setPage(item.key);
                  }
                  setMobileOpen(false);
                }}
                style={{
                  background: "none", border: "none", color: page === item.key || (item.key === "equipment" && (page === "lift-equipment" || page === "escalator-equipment")) ? styles.colors.gold : "rgba(255,255,255,0.75)",
                  fontSize: 14, fontWeight: 500, padding: "8px 16px", cursor: "pointer", transition: "color 0.2s",
                  display: "flex", alignItems: "center", gap: 4, fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {item.label}
                {item.hasDropdown && <Icons.ChevronDown />}
              </button>
              {item.hasDropdown && equipDropdown && (
                <div style={{
                  position: "absolute", top: "100%", left: 0, background: styles.colors.navy,
                  border: `1px solid rgba(232,185,49,0.2)`, borderRadius: 8, overflow: "hidden",
                  minWidth: 180, boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                }}>
                  {[{ label: "Lift Equipment", key: "lift-equipment" }, { label: "Escalator Equipment", key: "escalator-equipment" }].map(sub => (
                    <button key={sub.key} onClick={() => { setPage(sub.key); setEquipDropdown(false); }}
                      style={{
                        display: "block", width: "100%", textAlign: "left", background: page === sub.key ? "rgba(232,185,49,0.1)" : "transparent",
                        border: "none", color: page === sub.key ? styles.colors.gold : "rgba(255,255,255,0.8)",
                        padding: "12px 20px", cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                        borderBottom: "1px solid rgba(255,255,255,0.05)", transition: "all 0.2s",
                      }}
                      onMouseEnter={e => { e.target.style.background = "rgba(232,185,49,0.1)"; e.target.style.color = styles.colors.gold; }}
                      onMouseLeave={e => { e.target.style.background = page === sub.key ? "rgba(232,185,49,0.1)" : "transparent"; e.target.style.color = page === sub.key ? styles.colors.gold : "rgba(255,255,255,0.8)"; }}
                    >{sub.label}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display: "none", background: "none", border: "none", color: "white", cursor: "pointer", padding: 8 }} className="mobile-toggle">
          {mobileOpen ? <Icons.X /> : <Icons.Menu />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div style={{ background: styles.colors.navy, padding: "12px 24px 20px", borderTop: "1px solid rgba(255,255,255,0.1)" }} className="mobile-nav">
          {navItems.map(item => (
            <div key={item.key}>
              <button onClick={() => { if (!item.hasDropdown) { setPage(item.key); setMobileOpen(false); } else { setEquipDropdown(!equipDropdown); } }}
                style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", color: "rgba(255,255,255,0.8)", padding: "12px 0", fontSize: 15, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                {item.label}
              </button>
              {item.hasDropdown && equipDropdown && (
                <div style={{ paddingLeft: 20 }}>
                  {[{ label: "Lift", key: "lift-equipment" }, { label: "Escalator", key: "escalator-equipment" }].map(sub => (
                    <button key={sub.key} onClick={() => { setPage(sub.key); setMobileOpen(false); }}
                      style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", color: styles.colors.gold, padding: "8px 0", fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

// ─── Footer Component ───
function Footer({ setPage }) {
  return (
    <footer style={{ background: styles.colors.navy, color: "white", padding: "60px 24px 30px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 40 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <img src={sgLiftLogo} alt="Company Logo" style={{ width: 40, height: 40, objectFit: "contain" }} />
            <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: 1.5 }}>SINGAPORE LIFT INSPECTION TESTING</div>
          </div>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.7 }}>BCA-registered and bizSAFE Level 3 certified contractor delivering top-quality lift and escalator inspection services.</p>
        </div>
        <div>
          <h4 style={{ color: styles.colors.gold, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Quick Links</h4>
          {["home", "about", "services", "lift-equipment", "escalator-equipment", "contact"].map(p => (
            <button key={p} onClick={() => setPage(p)} style={{ display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 13, padding: "4px 0", cursor: "pointer", textTransform: "capitalize", fontFamily: "'DM Sans', sans-serif" }}>
              {p.replace("-", " ")}
            </button>
          ))}
        </div>
        <div>
          <h4 style={{ color: styles.colors.gold, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Contact</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.6)", fontSize: 13 }}><Icons.Phone /> +65 9615 1522</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.6)", fontSize: 13 }}><Icons.Mail /> enquiry@lifttest.com</div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "rgba(255,255,255,0.6)", fontSize: 13 }}><Icons.MapPin /> 32 Old Toh Tuck Road #02-15<br/>I.Biz Centre, Singapore 597658</div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "40px auto 0", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20, textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
        © 2026 Singapore Lift Inspection Testing Pte Ltd. All rights reserved.
      </div>
    </footer>
  );
}

// ─── Home Page ───
function HomePage({ setPage }) {
  return (
    <div>
      {/* Hero */}
      <section style={{
        background: `linear-gradient(135deg, ${styles.colors.navy} 0%, #1a3a5c 50%, #0d2137 100%)`,
        color: "white", padding: "100px 24px 80px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(232,185,49,0.3) 35px, rgba(232,185,49,0.3) 36px)" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "rgba(232,185,49,0.15)", border: "1px solid rgba(232,185,49,0.3)", borderRadius: 20, padding: "6px 16px", marginBottom: 24 }}>
              <img src={bcaLogo} alt="BCA Registered" style={{ height: 24, width: "auto" }} />
              <img src={bizSafeLogo} alt="bizSAFE Level 3" style={{ height: 24, width: "auto" }} />
            </div>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 20, fontFamily: "'DM Sans', sans-serif", letterSpacing: -1 }}>
              Your Lift Safety<br/><span style={{ color: styles.colors.gold }}>Partners</span>
            </h1>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: 36, maxWidth: 540 }}>
              Your premier lift inspection partner. Ensuring safety, compliance, and performance for elevators and escalators across Singapore.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => setPage("about")} style={{
                background: `linear-gradient(135deg, ${styles.colors.gold}, ${styles.colors.goldLight})`,
                color: styles.colors.navy, border: "none", padding: "14px 32px", borderRadius: 8,
                fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                boxShadow: "0 4px 20px rgba(232,185,49,0.3)",
              }}>Get Started</button>
              <button onClick={() => setPage("services")} style={{
                background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.3)",
                padding: "14px 32px", borderRadius: 8, fontWeight: 600, fontSize: 15, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}>Our Services</button>
            </div>
          </div>
        </div>
      </section>

      {/* About blurb */}
      <section style={{ padding: "80px 24px", background: styles.colors.white }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 13, color: styles.colors.gold, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>Who We Are</h2>
          <h3 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: styles.colors.navy, marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>Grow Your Vision</h3>
          <p style={{ fontSize: 16, color: styles.colors.gray500, lineHeight: 1.8, maxWidth: 700, margin: "0 auto" }}>
            Elevators play a crucial role in your buildings, serving residents, shoppers, patients, and employees daily. Licensed specialists are essential for ensuring smooth and efficient operation. We at Singapore Lift Inspection Testing, with our specialist inspectors, ensure your lifts are operating in good and safe conditions. Regular professional independent inspections are vital for safety and reliability.
          </p>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: "80px 24px", background: styles.colors.offWhite }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 13, color: styles.colors.gold, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>What We Do</h2>
            <h3 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: styles.colors.navy, fontFamily: "'DM Sans', sans-serif" }}>Our Services</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { icon: <Icons.Shield />, title: "Permit To Operate", desc: "Our Licensed Examine Inspector professionals conduct thorough inspections to guarantee your lift meets safety standards." },
              { icon: <Icons.Search />, title: "Independent Inspection", desc: "Independent lift and escalator inspections ensuring compliance with safety standards and regulations." },
              { icon: <Icons.AlertTriangle />, title: "Accident Investigation", desc: "Comprehensive accident investigation reports with meticulous root cause analysis to prevent future incidents." },
              { icon: <Icons.Activity />, title: "Health Checks & Assessment", desc: "Thorough inspections to assess the status and health of your lifts, ensuring safe and reliable operation." },
            ].map((svc, i) => (
              <div key={i} style={{
                background: "white", borderRadius: 12, padding: 32,
                border: "1px solid rgba(0,0,0,0.06)", transition: "all 0.3s",
                cursor: "pointer",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ width: 48, height: 48, background: `linear-gradient(135deg, ${styles.colors.gold}22, ${styles.colors.gold}44)`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: styles.colors.gold, marginBottom: 20 }}>
                  {svc.icon}
                </div>
                <h4 style={{ fontSize: 18, fontWeight: 700, color: styles.colors.navy, marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>{svc.title}</h4>
                <p style={{ fontSize: 14, color: styles.colors.gray500, lineHeight: 1.7 }}>{svc.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <button onClick={() => setPage("services")} style={{ background: "none", border: `2px solid ${styles.colors.navy}`, color: styles.colors.navy, padding: "12px 28px", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "inline-flex", alignItems: "center", gap: 8 }}>
              Learn More <Icons.ArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Equipment */}
      <section style={{ padding: "80px 24px", background: styles.colors.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 13, color: styles.colors.gold, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>Our Equipment</h2>
            <h3 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: styles.colors.navy, fontFamily: "'DM Sans', sans-serif" }}>Testing Equipment Showcase</h3>
          </div>

          {/* Lift equipment preview */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <h4 style={{ fontSize: 20, fontWeight: 700, color: styles.colors.navy, fontFamily: "'DM Sans', sans-serif" }}>Lift Testing Equipment</h4>
              <button onClick={() => setPage("lift-equipment")} style={{ background: "none", border: "none", color: styles.colors.gold, fontWeight: 600, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "'DM Sans', sans-serif" }}>
                View All <Icons.ArrowRight />
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
              {liftEquipment.slice(0, 4).map(eq => (
                <div key={eq.id} style={{ background: styles.colors.offWhite, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", transition: "all 0.3s", cursor: "pointer" }}
                  onClick={() => setPage("lift-equipment")}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ display: "flex", justifyContent: "center", padding: "16px 16px 0" }}>
                    <EquipmentSVG type={eq.id} color={eq.color} size={160} />
                  </div>
                  <div style={{ padding: "12px 16px 16px" }}>
                    <h5 style={{ fontSize: 14, fontWeight: 600, color: styles.colors.navy, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{eq.name}</h5>
                    <p style={{ fontSize: 11, color: styles.colors.gray500, lineHeight: 1.5 }}>{eq.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Escalator equipment preview */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <h4 style={{ fontSize: 20, fontWeight: 700, color: styles.colors.navy, fontFamily: "'DM Sans', sans-serif" }}>Escalator Testing Equipment</h4>
              <button onClick={() => setPage("escalator-equipment")} style={{ background: "none", border: "none", color: styles.colors.gold, fontWeight: 600, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "'DM Sans', sans-serif" }}>
                View All <Icons.ArrowRight />
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
              {escalatorEquipment.slice(0, 4).map(eq => (
                <div key={eq.id} style={{ background: styles.colors.offWhite, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", transition: "all 0.3s", cursor: "pointer" }}
                  onClick={() => setPage("escalator-equipment")}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ display: "flex", justifyContent: "center", padding: "16px 16px 0" }}>
                    <EquipmentSVG type={eq.id} color={eq.color} size={160} />
                  </div>
                  <div style={{ padding: "12px 16px 16px" }}>
                    <h5 style={{ fontSize: 14, fontWeight: 600, color: styles.colors.navy, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{eq.name}</h5>
                    <p style={{ fontSize: 11, color: styles.colors.gray500, lineHeight: 1.5 }}>{eq.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section style={{ padding: "60px 24px", background: styles.colors.offWhite }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: styles.colors.navy, marginBottom: 24, fontFamily: "'DM Sans', sans-serif" }}>
            As a BCA-registered and bizSAFE Level 3 certified contractor, we deliver top-quality, safe, and reliable lift and escalator services meeting the highest industry standards.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 40, alignItems: "center", flexWrap: "wrap" }}>
            <img src={bcaLogo} alt="BCA Registered" style={{ width: 240, height: 192, objectFit: "contain" }} />
            <img src={bizSafeLogo} alt="bizSAFE Level 3 Certified" style={{ width: 240, height: 192, objectFit: "contain" }} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", background: `linear-gradient(135deg, ${styles.colors.navy}, #1a3a5c)`, textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h3 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "white", marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>Ready to Elevate Safety?</h3>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, marginBottom: 32, lineHeight: 1.7 }}>Contact us today for professional lift and escalator inspection services.</p>
          <button onClick={() => setPage("contact")} style={{
            background: `linear-gradient(135deg, ${styles.colors.gold}, ${styles.colors.goldLight})`,
            color: styles.colors.navy, border: "none", padding: "14px 36px", borderRadius: 8,
            fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          }}>Contact Us</button>
        </div>
      </section>
    </div>
  );
}

// ─── About Page ───
function AboutPage() {
  return (
    <div>
      <section style={{ background: `linear-gradient(135deg, ${styles.colors.navy}, #1a3a5c)`, padding: "80px 24px 60px", textAlign: "center", color: "white" }}>
        <h1 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, fontFamily: "'DM Sans', sans-serif", marginBottom: 16 }}>About Us</h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, maxWidth: 500, margin: "0 auto" }}>Experienced professionals dedicated to elevator safety</p>
      </section>

      <section style={{ padding: "80px 24px", background: "white" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontSize: 17, color: styles.colors.gray700, lineHeight: 1.9, marginBottom: 32 }}>
            Singapore Lift Inspection Testing is a dynamic team of experienced professionals dedicated to ensuring elevator safety, compliance, and performance. With years of expertise, we specialize in comprehensive lift inspection services, offering peace of mind to building owners, facility managers, and operators.
          </p>
          <p style={{ fontSize: 17, color: styles.colors.gray700, lineHeight: 1.9, marginBottom: 32 }}>
            Our commitment to excellence drives us to deliver reliable solutions for elevators across various industries. Trust Singapore Lift Inspection Testing for all your certification needs and elevate safety with confidence! We ensure compliance with the latest SS550 standards to safeguard both users and operators alike.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, marginTop: 48 }}>
            {[
              { icon: <Icons.Award />, title: "BCA-Registered", desc: "Licensed and registered with the Building and Construction Authority" },
              { icon: <Icons.Shield />, title: "bizSAFE Level 3", desc: "Certified for workplace safety and health management" },
              { icon: <Icons.CheckCircle />, title: "SS550 Compliant", desc: "Meeting the latest Singapore Standards for lift operations" },
              { icon: <Icons.Wrench />, title: "Expert Team", desc: "Licensed Examine Inspectors with extensive field experience" },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center", padding: 24 }}>
                <div style={{ color: styles.colors.gold, marginBottom: 12, display: "flex", justifyContent: "center" }}>{item.icon}</div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: styles.colors.navy, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>{item.title}</h4>
                <p style={{ fontSize: 13, color: styles.colors.gray500, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Services Page ───
function ServicesPage() {
  const services = [
    { title: "Permit To Operate", desc: "We prioritize safety and compliance by ensuring all elevators operate with the necessary permits. Our Licensed Examine Inspector (LEI) professionals conduct thorough inspections to guarantee your lift meets safety standards. Trust us to help you navigate the approval process seamlessly, ensuring reliable and secure elevator performance.", color: "#1a5276" },
    { title: "Independent Lift & Escalators Inspection", desc: "We provide independent lift and escalator inspections, ensuring compliance with safety standards and regulations. Our expert team conducts thorough assessments to guarantee the reliability and safety of vertical transportation systems, protecting both users and property.", color: "#1e8449" },
    { title: "Accident Investigation Report", desc: "We specialize in comprehensive accident investigation reports for lifts and escalators, ensuring the highest standards of safety and reliability. Our dedicated team employs meticulous analysis to identify root causes and prevent future incidents.", color: "#c0392b" },
    { title: "Lift Health Checks & Assessment", desc: "We specialize in conducting thorough inspections to assess the status and health of your lifts. Our expert team ensures compliance with safety standards, allowing you to operate with confidence. Detailed evaluations keep your lifting systems reliable and safe.", color: "#7d3c98" },
  ];

  return (
    <div>
      <section style={{ background: `linear-gradient(135deg, ${styles.colors.navy}, #1a3a5c)`, padding: "80px 24px 60px", textAlign: "center", color: "white" }}>
        <h1 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, fontFamily: "'DM Sans', sans-serif", marginBottom: 16 }}>Our Services</h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, maxWidth: 600, margin: "0 auto" }}>Comprehensive range of services to ensure safety, compliance, and optimal performance</p>
      </section>

      <section style={{ padding: "80px 24px", background: "white" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", flexDirection: "column", gap: 40 }}>
          {services.map((svc, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "8px 1fr", gap: 24, alignItems: "stretch" }}>
              <div style={{ background: svc.color, borderRadius: 4 }} />
              <div style={{ padding: "24px 0" }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: styles.colors.navy, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>{svc.title}</h3>
                <p style={{ fontSize: 15, color: styles.colors.gray500, lineHeight: 1.8 }}>{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Equipment Page (shared for lift & escalator) ───
function EquipmentPage({ type, setPage }) {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const equipment = type === "lift" ? liftEquipment : escalatorEquipment;
  const title = type === "lift" ? "Lift Testing Equipment" : "Escalator Testing Equipment";

  return (
    <div>
      <section style={{ background: `linear-gradient(135deg, ${styles.colors.navy}, #1a3a5c)`, padding: "80px 24px 60px", textAlign: "center", color: "white" }}>
        <h1 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, fontFamily: "'DM Sans', sans-serif", marginBottom: 16 }}>{title}</h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, maxWidth: 500, margin: "0 auto" }}>Professional-grade testing instruments for comprehensive inspections</p>
        {/* Tab switcher */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 24 }}>
          <button onClick={() => setPage("lift-equipment")} style={{
            padding: "10px 24px", borderRadius: 8, border: "1px solid rgba(232,185,49,0.3)", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            background: type === "lift" ? styles.colors.gold : "transparent",
            color: type === "lift" ? styles.colors.navy : "rgba(255,255,255,0.7)",
          }}>Lift</button>
          <button onClick={() => setPage("escalator-equipment")} style={{
            padding: "10px 24px", borderRadius: 8, border: "1px solid rgba(232,185,49,0.3)", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            background: type === "escalator" ? styles.colors.gold : "transparent",
            color: type === "escalator" ? styles.colors.navy : "rgba(255,255,255,0.7)",
          }}>Escalator</button>
        </div>
      </section>

      <section style={{ padding: "60px 24px", background: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Download PDF button */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 32 }}>
            <button onClick={() => {
              const filename = type === "lift" ? "Lift-testing-equpiment-catelog.pdf" : "escalator-testing-equipment-catelog.pdf";
              const a = document.createElement('a');
              a.href = `${import.meta.env.BASE_URL}${filename}`;
              a.download = filename;
              a.click();
            }} style={{
              display: "flex", alignItems: "center", gap: 8,
              background: `linear-gradient(135deg, ${styles.colors.navy}, #1a3a5c)`,
              color: "white", border: "none", padding: "12px 24px", borderRadius: 8,
              fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            }}>
              <Icons.Download /> {type === "lift" ? "Download Lift Testing Equipment Catalog" : "Download Escalator Testing Equipment Catalog"}
            </button>
          </div>

          {/* Equipment Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {equipment.map(eq => (
              <div key={eq.id}
                onClick={() => setSelectedEquipment(eq)}
                style={{
                  background: styles.colors.offWhite, borderRadius: 12, overflow: "hidden",
                  border: "1px solid rgba(0,0,0,0.06)", cursor: "pointer", transition: "all 0.3s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ display: "flex", justifyContent: "center", padding: 20, background: `${eq.color}08` }}>
                  {eq.image ? <img src={eq.image} alt={eq.name} style={{ width: 200, height: 200, objectFit: "contain" }} /> : <EquipmentSVG type={eq.id} color={eq.color} size={200} />}
                </div>
                <div style={{ padding: "16px 20px 20px" }}>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: styles.colors.navy, marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>{eq.name}</h4>
                  <p style={{ fontSize: 12, color: styles.colors.gray500, lineHeight: 1.5, marginBottom: 12 }}>{eq.tagline}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: styles.colors.gold, fontSize: 13, fontWeight: 600 }}>
                    <Icons.Eye /> View Details
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Detail Modal */}
      {selectedEquipment && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
          onClick={() => setSelectedEquipment(null)}>
          <div style={{ background: "white", borderRadius: 16, maxWidth: 640, width: "100%", maxHeight: "85vh", overflow: "auto", boxShadow: "0 24px 80px rgba(0,0,0,0.3)" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ padding: "24px 28px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: styles.colors.navy, fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>{selectedEquipment.name}</h2>
                <p style={{ fontSize: 13, color: styles.colors.gray500, fontStyle: "italic" }}>{selectedEquipment.tagline}</p>
              </div>
              <button onClick={() => setSelectedEquipment(null)} style={{ background: "none", border: "none", cursor: "pointer", color: styles.colors.gray500, padding: 4 }}><Icons.X /></button>
            </div>
            <div style={{ display: "flex", justifyContent: "center", padding: "20px 28px" }}>
              {selectedEquipment.image ? <img src={selectedEquipment.image} alt={selectedEquipment.name} style={{ width: 240, height: 240, objectFit: "contain" }} /> : <EquipmentSVG type={selectedEquipment.id} color={selectedEquipment.color} size={240} />}
            </div>
            <div style={{ padding: "0 28px 28px" }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, color: styles.colors.navy, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>Description</h4>
              <p style={{ fontSize: 14, color: styles.colors.gray700, lineHeight: 1.7, marginBottom: 20 }}>{selectedEquipment.desc}</p>
              <h4 style={{ fontSize: 14, fontWeight: 600, color: styles.colors.navy, marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>Key Features & Benefits</h4>
              {selectedEquipment.features.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ color: styles.colors.gold, marginTop: 2, flexShrink: 0 }}><Icons.CheckCircle /></div>
                  <span style={{ fontSize: 13, color: styles.colors.gray700, lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Contact Page ───
function ContactPage() {
  return (
    <div>
      <section style={{ background: `linear-gradient(135deg, ${styles.colors.navy}, #1a3a5c)`, padding: "80px 24px 60px", textAlign: "center", color: "white" }}>
        <h1 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, fontFamily: "'DM Sans', sans-serif", marginBottom: 16 }}>Contact Us</h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, maxWidth: 500, margin: "0 auto" }}>Get in touch for professional lift inspection services</p>
      </section>

      <section style={{ padding: "80px 24px", background: "white" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48 }}>
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: styles.colors.navy, marginBottom: 24, fontFamily: "'DM Sans', sans-serif" }}>Get In Touch</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, background: `${styles.colors.gold}22`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: styles.colors.gold, flexShrink: 0 }}><Icons.Phone /></div>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 600, color: styles.colors.navy, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>Phone</h4>
                  <p style={{ fontSize: 14, color: styles.colors.gray500 }}>+65 9615 1522</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, background: `${styles.colors.gold}22`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: styles.colors.gold, flexShrink: 0 }}><Icons.Mail /></div>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 600, color: styles.colors.navy, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>Email</h4>
                  <p style={{ fontSize: 14, color: styles.colors.gray500 }}>enquiry@lifttest.com</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, background: `${styles.colors.gold}22`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: styles.colors.gold, flexShrink: 0 }}><Icons.MapPin /></div>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 600, color: styles.colors.navy, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>Address</h4>
                  <p style={{ fontSize: 14, color: styles.colors.gray500, lineHeight: 1.6 }}>32 Old Toh Tuck Road #02-15<br/>I.Biz Centre, Singapore 597658</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: styles.colors.navy, marginBottom: 24, fontFamily: "'DM Sans', sans-serif" }}>Send A Message</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input placeholder="Full Name" style={{ padding: "12px 16px", borderRadius: 8, border: "1px solid #e0e0e0", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none" }} />
              <input placeholder="Email Address" style={{ padding: "12px 16px", borderRadius: 8, border: "1px solid #e0e0e0", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none" }} />
              <input placeholder="Phone Number" style={{ padding: "12px 16px", borderRadius: 8, border: "1px solid #e0e0e0", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none" }} />
              <textarea placeholder="Your Message" rows={5} style={{ padding: "12px 16px", borderRadius: 8, border: "1px solid #e0e0e0", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", resize: "vertical" }} />
              <button style={{
                background: `linear-gradient(135deg, ${styles.colors.gold}, ${styles.colors.goldLight})`,
                color: styles.colors.navy, border: "none", padding: "14px 32px", borderRadius: 8,
                fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              }}>Send Message</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Main App ───
export default function App() {
  const [page, setPage] = useState("home");
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = 0;
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={setPage} />;
      case "about": return <AboutPage />;
      case "services": return <ServicesPage />;
      case "lift-equipment": return <EquipmentPage type="lift" setPage={setPage} />;
      case "escalator-equipment": return <EquipmentPage type="escalator" setPage={setPage} />;
      case "contact": return <ContactPage />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div ref={containerRef} className="site-container" style={{ fontFamily: "'DM Sans', sans-serif", width: "100%", height: "100vh", overflow: "auto", background: "#fff" }}>
        <Navigation page={page} setPage={setPage} />
        {renderPage()}
        <Footer setPage={setPage} />
      </div>
      {/* WhatsApp floating bubble */}
      <style>{`
        @keyframes wa-shake {
          0%,100% { transform: rotate(0deg); }
          15% { transform: rotate(-15deg); }
          30% { transform: rotate(15deg); }
          45% { transform: rotate(-10deg); }
          60% { transform: rotate(10deg); }
          75% { transform: rotate(-5deg); }
          90% { transform: rotate(5deg); }
        }
        @keyframes wa-ripple {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .wa-bubble { animation: wa-shake 1.2s ease-in-out infinite; animation-delay: 0s; }
        .wa-bubble:hover { animation: none; transform: scale(1.1) !important; }
        .wa-ripple1 { animation: wa-ripple 1.8s ease-out infinite; }
        .wa-ripple2 { animation: wa-ripple 1.8s ease-out infinite 0.6s; }
        .wa-ripple3 { animation: wa-ripple 1.8s ease-out infinite 1.2s; }
        .wa-tooltip {
          position: absolute; right: 70px; bottom: 10px;
          background: #1a1a1a; color: white;
          padding: 8px 14px; border-radius: 8px;
          font-size: 13px; font-family: 'DM Sans', sans-serif;
          white-space: nowrap; pointer-events: none;
          opacity: 1; box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        .wa-tooltip::after {
          content: ''; position: absolute; left: 100%; top: 50%;
          transform: translateY(-50%);
          border: 6px solid transparent;
          border-left-color: #1a1a1a;
        }
      `}</style>
      <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 9999, display: "flex", alignItems: "center" }}>
        {/* Tooltip */}
        <div className="wa-tooltip">Have a question? Contact us now</div>
        {/* Ripple rings */}
        <div style={{ position: "relative", width: 60, height: 60 }}>
          {["wa-ripple1","wa-ripple2","wa-ripple3"].map(cls => (
            <span key={cls} className={cls} style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: "#25D366", display: "block",
            }} />
          ))}
          {/* Red alert dot */}
          <span style={{
            position: "absolute", top: 2, right: 2, zIndex: 2,
            width: 14, height: 14, borderRadius: "50%",
            background: "#ff3b3b", border: "2px solid white",
          }} />
          {/* Button */}
          <a
            href="https://wa.me/6596151522?text=Hello"
            target="_blank"
            rel="noopener noreferrer"
            className="wa-bubble"
            style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: "#25D366",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", textDecoration: "none", zIndex: 1,
              boxShadow: "0 4px 16px rgba(37,211,102,0.5)",
            }}
          >
            <Icons.WhatsApp />
          </a>
        </div>
      </div>
    </>
  );
}
