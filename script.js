/* =========================
   STYLE: Complete (style.css)
   ========================= */

/* Root + reset */
:root{
  --bg:#f7fbfd;
  --ink:#0b2540;
  --muted:#606a78;
  --accent:#004aad;   /* corporate blue */
  --accent-2:#072b61; /* dark navy */
  --card:#ffffff;
  --radius:12px;
  --shadow-sm: 0 6px 18px rgba(11,37,64,0.06);
  --shadow-md: 0 10px 30px rgba(11,37,64,0.10);
  --transition: all .28s ease;
}

*{box-sizing:border-box;margin:0;padding:0}
html,body{height:auto;min-height:100%;background:var(--bg);color:var(--ink);font-family:Inter,Segoe UI,Arial,sans-serif;line-height:1.55;scroll-behavior:smooth}
.page-preload{opacity:0}
.page-loaded{opacity:1;transition:opacity .5s ease}
.container{width:92%;max-width:1100px;margin:0 auto}

/* Header / Nav */
.header{
  position:fixed;left:0;top:0;width:100%;z-index:1100;
  background:var(--accent);color:#fff;padding:18px 0;box-shadow:var(--shadow-sm);
  transition: padding .28s ease, background .28s ease, transform .28s ease;
}
.header.shrink{padding:8px 0;background:rgba(0,74,173,0.92);backdrop-filter:blur(6px)}
.nav-wrap{display:flex;align-items:center;justify-content:space-between;gap:12px}
.logo{font-weight:800;color:#fff;text-decoration:none;font-family:'Poppins',Inter,sans-serif;font-size:1.15rem}
#menu-toggle{display:none;background:none;border:0;cursor:pointer;padding:6px 8px}
#menu-toggle span{display:block;width:22px;height:2.5px;background:#fff;border-radius:3px;margin:4px 0;transition:var(--transition)}
.nav{display:block}
.nav-links{list-style:none;display:flex;gap:28px;align-items:center}
.nav-links a{color:#fff;text-decoration:none;font-weight:700;padding-bottom:6px;position:relative;transition:color .22s}
.nav-links a:hover{color:#dceeff}
/* instant active underline */
.nav-links a.active::after{
  content:"";position:absolute;left:20%;bottom:0;height:3px;width:60%;background:#fff;border-radius:2px
}

/* Sections */
.section{padding:88px 0}
.section-panel{padding:64px 0;background:#fff;border-radius:16px;margin:24px 0;box-shadow:var(--shadow-sm)}
.section-panel h2{color:var(--accent-2);margin-bottom:16px}

/* Hero */
.hero{padding-top:140px;padding-bottom:64px}
.hero-grid{display:grid;grid-template-columns:320px 1fr;gap:36px;align-items:center}
.hero-photo{display:flex;justify-content:center}
.photo-frame{width:220px;height:220px;border-radius:999px;overflow:hidden;box-shadow:0 8px 30px rgba(10,30,70,0.08)}
.photo-frame img{width:100%;height:100%;object-fit:cover;object-position:center;display:block}
.hero-title{font-size:2rem;color:var(--accent-2);margin-bottom:8px}
.hero-sub{font-weight:700;color:var(--accent);margin-bottom:10px}
.hero-lead{color:var(--muted);margin-bottom:16px;max-width:720px}

/* Stats row */
.hero-stats{display:flex;align-items:center;justify-content:space-between;gap:18px;max-width:780px;margin-bottom:16px}
.stat{flex:1;text-align:center}
.stat strong{display:block;font-size:1.6rem;color:var(--accent-2)}
.stat span{display:block;color:var(--muted);font-size:.95rem}
.divider{width:1px;height:48px;background:#e1e6ee;border-radius:2px}

/* CTAs */
.hero-ctas{display:flex;gap:12px;margin-top:10px;flex-wrap:wrap}
.btn{display:inline-block;padding:10px 18px;border-radius:999px;text-decoration:none;font-weight:800;cursor:pointer;border:2px solid transparent;transition:var(--transition)}
.btn-primary{background:var(--accent);color:#fff;box-shadow:0 6px 20px rgba(0,74,173,.12)}
.btn-primary:hover{transform:translateY(-3px)}
.btn-outline{background:transparent;color:var(--accent);border:2px solid var(--accent)}
.btn-outline:hover{background:var(--accent);color:#fff}

/* Contact */
.contact-grid{display:grid;grid-template-columns:1fr 380px;gap:28px;align-items:start}
.contact-form input,.contact-form textarea{width:100%;padding:10px;border-radius:10px;border:1px solid #e6e9ef;margin-bottom:10px;font-size:.95rem}
.contact-form label{display:block;font-weight:700;margin-top:8px;margin-bottom:6px;color:var(--accent-2)}
.contact-form .consent{font-weight:500;font-size:.95rem;margin-top:8px}
.form-status{margin-top:10px;font-weight:700}

/* Cookie + back to top */
.cookie-banner{position:fixed;bottom:12px;left:12px;right:12px;background:#fff;padding:12px;border-radius:12px;box-shadow:var(--shadow-sm);display:flex;align-items:center;justify-content:space-between;gap:12px}
#back-to-top{position:fixed;right:16px;bottom:16px;background:var(--accent);color:#fff;border:0;padding:10px 12px;border-radius:12px;cursor:pointer;display:none}
#back-to-top.show{display:block}

/* Reveal animations */
.animate-on-scroll{opacity:0;transform:translateY(22px);transition:opacity .7s ease,transform .7s ease}
.animate-on-scroll.visible{opacity:1;transform:translateY(0)}

/* Responsive */
@media (max-width:980px){
  .hero-grid{grid-template-columns:1fr;text-align:center}
  .divider{display:none}
}
@media (max-width:680px){
  .nav-links{gap:14px}
  .header{padding:12px 0}
  #menu-toggle{display:block}
  .nav-links{
    position:fixed;right:16px;top:64px;background:rgba(0,74,173,.98);
    padding:14px;border-radius:12px;flex-direction:column;transform:translateX(120%);
    transition:transform .28s;display:flex;gap:10px
  }
  .nav-links.open{transform:translateX(0)}
  .nav-links a{color:#fff;padding:8px 6px;display:block}
}
