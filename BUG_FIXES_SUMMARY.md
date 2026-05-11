<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>CARTELLO — Premium Streetwear</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,700;0,800;0,900;1,900&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
  <style>
    :root {
      --cream: #F5F0E8;
      --ink: #0A0A0A;
      --orange: #E84C1E;
      --orange-light: #FF6B3D;
      --muted: #6B6560;
      --border-light: rgba(10,10,10,0.1);
    }
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'Barlow',sans-serif;background:var(--cream);color:var(--ink);overflow-x:hidden;}

    /* ── SPLASH ── */
    .splash{position:fixed;inset:0;z-index:99999;background:var(--ink);display:flex;align-items:center;justify-content:center;flex-direction:column;transition:transform 1.1s cubic-bezier(0.86,0,0.07,1),opacity 0.8s ease;}
    .splash-logo{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:clamp(3rem,9vw,7rem);color:#fff;letter-spacing:-0.02em;clip-path:inset(0 100% 0 0);animation:revealText 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s forwards;}
    .splash-bar{margin-top:2rem;width:160px;height:1px;background:rgba(255,255,255,0.15);overflow:hidden;opacity:0;animation:fadeIn 0.4s ease 0.5s forwards;}
    .splash-bar-inner{height:100%;width:100%;background:#fff;transform:translateX(-100%);animation:barSlide 1.8s cubic-bezier(0.65,0,0.35,1) 0.7s forwards;}
    .splash-tag{margin-top:1.2rem;font-size:0.7rem;letter-spacing:0.45em;text-transform:uppercase;color:rgba(255,255,255,0);animation:fadeInText 0.8s ease 0.9s forwards;}
    .splash-exit{transform:translateY(-105%);}
    @keyframes revealText{to{clip-path:inset(0 0% 0 0);}}
    @keyframes fadeIn{to{opacity:1;}}
    @keyframes barSlide{0%{transform:translateX(-100%)}50%{transform:translateX(0)}100%{transform:translateX(101%)}}
    @keyframes fadeInText{to{color:rgba(255,255,255,0.45);}}

    /* ── NAVBAR ── */
    .navbar{position:sticky;top:0;z-index:100;background:var(--cream);border-bottom:1px solid var(--border-light);transition:all 0.4s cubic-bezier(0.32,0.72,0,1);}
    .navbar.scrolled{background:rgba(245,240,232,0.95);box-shadow:0 1px 0 rgba(10,10,10,0.08);}
    .nav-inner{max-width:1400px;margin:0 auto;padding:0 2rem;display:flex;align-items:center;justify-content:space-between;height:64px;}
    .nav-logo{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:1.6rem;letter-spacing:-0.01em;color:var(--ink);text-decoration:none;}
    .nav-links{display:flex;align-items:center;gap:2.5rem;list-style:none;}
    .nav-links a{font-size:0.8rem;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;color:var(--muted);text-decoration:none;transition:color 0.25s ease;position:relative;}
    .nav-links a::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:1.5px;background:var(--ink);transition:width 0.3s cubic-bezier(0.32,0.72,0,1);}
    .nav-links a:hover{color:var(--ink);}
    .nav-links a:hover::after{width:100%;}
    .nav-actions{display:flex;align-items:center;gap:1rem;}
    .nav-search{display:flex;align-items:center;gap:0.5rem;background:rgba(10,10,10,0.06);border-radius:999px;padding:0.5rem 1rem;font-size:0.8rem;color:var(--muted);cursor:pointer;border:none;transition:background 0.25s ease;}
    .nav-search:hover{background:rgba(10,10,10,0.1);}
    .nav-cart{position:relative;width:40px;height:40px;border-radius:50%;background:rgba(10,10,10,0.06);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--ink);font-size:0.9rem;transition:background 0.25s ease;}
    .nav-cart:hover{background:rgba(10,10,10,0.12);}
    .cart-badge{position:absolute;top:-3px;right:-3px;width:18px;height:18px;border-radius:50%;background:var(--orange);color:#fff;font-size:0.6rem;font-weight:700;display:flex;align-items:center;justify-content:center;}
    .nav-signin{display:flex;align-items:center;gap:0.5rem;background:var(--ink);color:#fff;border-radius:999px;padding:0.55rem 1.2rem;font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;text-decoration:none;border:none;cursor:pointer;transition:background 0.25s ease,transform 0.2s ease;}
    .nav-signin:hover{background:#2a2a2a;transform:scale(1.02);}
    .mobile-menu-btn{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px;}
    .mobile-menu-btn span{display:block;width:22px;height:2px;background:var(--ink);border-radius:2px;transition:all 0.35s cubic-bezier(0.32,0.72,0,1);transform-origin:center;}
    .mobile-menu-btn.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
    .mobile-menu-btn.open span:nth-child(2){opacity:0;transform:scaleX(0);}
    .mobile-menu-btn.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
    .mobile-menu{position:fixed;inset:0;z-index:99;background:var(--ink);transform:translateX(100%);transition:transform 0.5s cubic-bezier(0.32,0.72,0,1);display:flex;flex-direction:column;padding:5rem 2rem 2rem;gap:0;}
    .mobile-menu.open{transform:translateX(0);}
    .mobile-menu a{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:clamp(2.5rem,8vw,4rem);color:rgba(255,255,255,0.15);text-decoration:none;border-bottom:1px solid rgba(255,255,255,0.06);padding:0.6rem 0;transition:color 0.25s ease;transform:translateY(20px);opacity:0;animation:none;}
    .mobile-menu.open a{color:rgba(255,255,255,0.15);}
    .mobile-menu.open a:hover{color:#fff;}
    .mobile-menu.open a:nth-child(1){animation:slideUp 0.5s 0.1s ease forwards;}
    .mobile-menu.open a:nth-child(2){animation:slideUp 0.5s 0.15s ease forwards;}
    .mobile-menu.open a:nth-child(3){animation:slideUp 0.5s 0.2s ease forwards;}
    .mobile-menu.open a:nth-child(4){animation:slideUp 0.5s 0.25s ease forwards;}
    .mobile-menu.open a:nth-child(5){animation:slideUp 0.5s 0.3s ease forwards;}
    @keyframes slideUp{to{opacity:1;transform:translateY(0);}}
    .search-dropdown{position:absolute;top:calc(100% + 0.75rem);right:0;width:320px;background:#fff;border-radius:1.5rem;box-shadow:0 20px 60px rgba(0,0,0,0.12);border:1px solid rgba(10,10,10,0.08);padding:1rem;display:none;z-index:200;}
    .search-dropdown.active{display:block;animation:fadeScaleIn 0.2s ease;}
    @keyframes fadeScaleIn{from{opacity:0;transform:scale(0.96) translateY(-8px);}to{opacity:1;transform:scale(1) translateY(0);}}

    /* ═══════════════════════════════
       HERO SLIDER
    ═══════════════════════════════ */
    .hero-slider{position:relative;height:92vh;min-height:600px;overflow:hidden;background:var(--ink);}

    /* Slides */
    .slides-container{position:absolute;inset:0;}
    .slide{position:absolute;inset:0;opacity:0;transition:opacity 1s cubic-bezier(0.32,0.72,0,1);}
    .slide.active{opacity:1;}
    .slide-bg{position:absolute;inset:0;background-size:cover;background-position:center;transform:scale(1.04);transition:transform 8s cubic-bezier(0.25,0.46,0.45,0.94);}
    .slide.active .slide-bg{transform:scale(1);}
    .slide-gradient{position:absolute;inset:0;background:linear-gradient(110deg,rgba(10,10,10,0.82) 0%,rgba(10,10,10,0.55) 50%,rgba(10,10,10,0.2) 100%);}

    /* Content panel */
    .hero-content{position:absolute;inset:0;display:flex;align-items:center;pointer-events:none;}
    .hero-content-inner{max-width:1400px;width:100%;margin:0 auto;padding:0 3rem;display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;}
    .hero-text{pointer-events:all;}
    .slide-eyebrow{display:inline-flex;align-items:center;gap:0.6rem;background:rgba(255,255,255,0.12);border-radius:999px;padding:0.35rem 0.9rem;font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.22em;color:rgba(255,255,255,0.8);width:fit-content;margin-bottom:1.5rem;border:1px solid rgba(255,255,255,0.15);backdrop-filter:blur(8px);}
    .eyebrow-dot{width:6px;height:6px;border-radius:50%;background:var(--orange);animation:pulse 2s ease-in-out infinite;flex-shrink:0;}
    @keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.6;transform:scale(1.4);}}
    .slide-headline{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-style:italic;font-size:clamp(4.5rem,9vw,9rem);line-height:0.88;letter-spacing:-0.02em;color:#fff;text-transform:uppercase;margin-bottom:1.5rem;}
    .slide-headline .outline{-webkit-text-stroke:2.5px rgba(255,255,255,0.7);color:transparent;}
    .slide-headline .accent{color:var(--orange);}
    .slide-sub{font-size:0.95rem;line-height:1.7;color:rgba(255,255,255,0.6);max-width:380px;margin-bottom:2rem;}
    .cta-row{display:flex;align-items:center;gap:1rem;pointer-events:all;}
    .btn-primary{display:inline-flex;align-items:center;gap:0.75rem;background:var(--orange);color:#fff;border-radius:999px;padding:1rem 2rem;font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;text-decoration:none;border:none;cursor:pointer;transition:all 0.35s cubic-bezier(0.32,0.72,0,1);}
    .btn-primary .icon-wrap{width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1);font-size:0.75rem;}
    .btn-primary:hover{background:var(--orange-light);transform:scale(1.03);}
    .btn-primary:hover .icon-wrap{transform:translate(2px,-2px) scale(1.1);}
    .btn-glass{display:inline-flex;align-items:center;gap:0.6rem;background:rgba(255,255,255,0.1);color:#fff;border:1.5px solid rgba(255,255,255,0.25);border-radius:999px;padding:1rem 1.8rem;font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;text-decoration:none;cursor:pointer;transition:all 0.3s ease;backdrop-filter:blur(8px);}
    .btn-glass:hover{background:rgba(255,255,255,0.2);border-color:rgba(255,255,255,0.4);}

    /* Right panel — floating product card */
    .hero-product-panel{pointer-events:all;display:flex;justify-content:flex-end;}
    .hero-product-card{background:rgba(245,240,232,0.96);border-radius:2rem;padding:1.75rem;width:280px;backdrop-filter:blur(16px);border:1px solid rgba(245,240,232,0.5);box-shadow:0 32px 80px rgba(0,0,0,0.25);transform:translateY(0);transition:transform 0.4s cubic-bezier(0.32,0.72,0,1);}
    .hero-product-card:hover{transform:translateY(-6px);}
    .hero-product-img{width:100%;height:180px;border-radius:1.25rem;overflow:hidden;margin-bottom:1.1rem;position:relative;}
    .hero-product-img img{width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease;}
    .hero-product-card:hover .hero-product-img img{transform:scale(1.06);}
    .hero-product-img-badge{position:absolute;top:0.6rem;left:0.6rem;background:var(--orange);color:#fff;border-radius:999px;padding:0.25rem 0.7rem;font-size:0.6rem;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;}
    .hero-product-label{font-size:0.62rem;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:var(--muted);margin-bottom:0.3rem;}
    .hero-product-name{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:1.35rem;color:var(--ink);line-height:1.1;margin-bottom:0.5rem;}
    .hero-product-stars{color:#FFB800;font-size:0.7rem;letter-spacing:2px;margin-bottom:0.8rem;}
    .hero-product-footer{display:flex;align-items:center;justify-content:space-between;}
    .hero-product-price{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:1.6rem;color:var(--ink);}
    .hero-product-price span{font-size:0.85rem;font-weight:500;color:var(--muted);text-decoration:line-through;margin-left:0.4rem;}
    .hero-add-btn{width:38px;height:38px;border-radius:50%;background:var(--ink);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.85rem;transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);}
    .hero-add-btn:hover{background:var(--orange);transform:scale(1.12) rotate(90deg);}

    /* Bottom controls */
    .hero-controls{position:absolute;bottom:2.5rem;left:0;right:0;pointer-events:all;}
    .hero-controls-inner{max-width:1400px;margin:0 auto;padding:0 3rem;display:flex;align-items:center;justify-content:space-between;}
    .slide-counter{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:1rem;color:rgba(255,255,255,0.5);letter-spacing:0.05em;}
    .slide-counter strong{color:#fff;font-size:1.4rem;}
    .slide-dots{display:flex;align-items:center;gap:0.5rem;}
    .slide-dot{height:3px;border-radius:999px;background:rgba(255,255,255,0.3);cursor:pointer;transition:all 0.4s cubic-bezier(0.32,0.72,0,1);}
    .slide-dot.active{background:#fff;width:28px !important;}
    .slide-arrows{display:flex;gap:0.6rem;}
    .slide-arrow{width:44px;height:44px;border-radius:50%;border:1.5px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.85rem;transition:all 0.3s ease;backdrop-filter:blur(8px);}
    .slide-arrow:hover{background:var(--orange);border-color:var(--orange);}

    /* Progress bar */
    .hero-progress{position:absolute;bottom:0;left:0;width:100%;height:2px;background:rgba(255,255,255,0.1);}
    .hero-progress-fill{height:100%;background:var(--orange);width:0;transition:none;}
    .hero-progress-fill.animating{transition:width linear;}

    /* Floating tag top-right */
    .slide-float-tag{position:absolute;top:2rem;right:2rem;background:rgba(245,240,232,0.95);border-radius:1rem;padding:0.7rem 1rem;font-size:0.62rem;text-transform:uppercase;letter-spacing:0.2em;color:var(--muted);font-weight:700;backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.4);pointer-events:none;}
    .slide-float-tag strong{display:block;font-family:'Barlow Condensed',sans-serif;font-size:1.2rem;color:var(--ink);letter-spacing:-0.01em;line-height:1;margin-top:0.1rem;}

    /* ── TICKER ── */
    .ticker-wrap{background:var(--orange);overflow:hidden;}
    .ticker-track{display:flex;gap:0;white-space:nowrap;animation:ticker 18s linear infinite;}
    .ticker-item{display:inline-flex;align-items:center;gap:2rem;padding:1rem 2rem;font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:1.1rem;text-transform:uppercase;letter-spacing:0.15em;color:#fff;}
    .ticker-star{font-size:0.6rem;opacity:0.7;}
    @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

    /* ═══════════════════════════════
       BENTO GRID (REDESIGNED)
    ═══════════════════════════════ */
    .bento-section{max-width:1400px;margin:0 auto;padding:5rem 2rem 6rem;}
    .bento-header{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3rem;opacity:0;transition:all 0.9s cubic-bezier(0.32,0.72,0,1);transform:translateY(30px);}
    .bento-header.visible{opacity:1;transform:translateY(0);}
    .bento-title{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-style:italic;font-size:clamp(3rem,6vw,5.5rem);line-height:0.95;text-transform:uppercase;color:var(--ink);letter-spacing:-0.02em;}
    .bento-right{display:flex;align-items:flex-end;gap:1.5rem;}
    .bento-filter-row{display:flex;gap:0.5rem;margin-bottom:0.5rem;}
    .bento-filter{background:transparent;border:1.5px solid var(--border-light);border-radius:999px;padding:0.4rem 1rem;font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;cursor:pointer;color:var(--muted);transition:all 0.25s ease;}
    .bento-filter:hover,.bento-filter.active{background:var(--ink);color:#fff;border-color:var(--ink);}
    .bento-view-all{display:inline-flex;align-items:center;gap:0.5rem;font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:var(--ink);text-decoration:none;border-bottom:1.5px solid var(--ink);padding-bottom:2px;transition:color 0.25s ease,border-color 0.25s ease;white-space:nowrap;margin-bottom:0.5rem;}
    .bento-view-all:hover{color:var(--orange);border-color:var(--orange);}

    /* Grid */
    .bento-grid{display:grid;grid-template-columns:repeat(12,1fr);gap:1rem;}

    /* Card base */
    .bc{border-radius:1.75rem;overflow:hidden;position:relative;cursor:pointer;transition:transform 0.45s cubic-bezier(0.32,0.72,0,1),box-shadow 0.45s cubic-bezier(0.32,0.72,0,1);opacity:0;transform:translateY(40px);}
    .bc.visible{opacity:1;transform:translateY(0);}
    .bc:hover{transform:translateY(-6px);box-shadow:0 24px 60px rgba(10,10,10,0.18);}
    .bc-1{grid-column:span 5;min-height:520px;}
    .bc-2{grid-column:span 4;min-height:520px;}
    .bc-3{grid-column:span 3;min-height:520px;}
    .bc-4{grid-column:span 4;min-height:260px;}
    .bc-5{grid-column:span 4;min-height:260px;}
    .bc-6{grid-column:span 4;min-height:260px;}
    .bc-7{grid-column:span 3;min-height:240px;}
    .bc-8{grid-column:span 6;min-height:240px;}
    .bc-9{grid-column:span 3;min-height:240px;}
    .bc-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 0.7s cubic-bezier(0.32,0.72,0,1);}
    .bc:hover .bc-img{transform:scale(1.06);}
    .bc-overlay{position:absolute;inset:0;background:linear-gradient(180deg,transparent 30%,rgba(10,10,10,0.75) 100%);transition:background 0.4s ease;}
    .bc:hover .bc-overlay{background:linear-gradient(180deg,transparent 10%,rgba(10,10,10,0.88) 100%);}
    .bc-content{position:relative;z-index:2;height:100%;display:flex;flex-direction:column;justify-content:flex-end;padding:1.75rem;}
    .bc-tag{display:inline-block;margin-bottom:0.5rem;background:rgba(255,255,255,0.15);border-radius:999px;padding:0.3rem 0.8rem;font-size:0.62rem;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;color:#fff;border:1px solid rgba(255,255,255,0.2);width:fit-content;backdrop-filter:blur(4px);}
    .bc-title{font-family:'Barlow Condensed',sans-serif;font-weight:900;text-transform:uppercase;color:#fff;line-height:1;margin-bottom:0.5rem;}
    .bc-1 .bc-title{font-size:clamp(2rem,3.5vw,3rem);}
    .bc-2 .bc-title,.bc-3 .bc-title{font-size:clamp(1.4rem,2.5vw,2.2rem);}
    .bc-4 .bc-title,.bc-5 .bc-title,.bc-6 .bc-title{font-size:1.6rem;}
    .bc-desc{font-size:0.82rem;color:rgba(255,255,255,0.7);line-height:1.5;margin-bottom:1rem;max-width:280px;}
    .bc-link{display:inline-flex;align-items:center;gap:0.5rem;font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#fff;text-decoration:none;transition:gap 0.3s ease;}
    .bc:hover .bc-link{gap:0.8rem;}
    .bc-link i{font-size:0.7rem;}
    .bc-arrow{position:absolute;top:1.25rem;right:1.25rem;width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.75rem;opacity:0;transform:scale(0.8);transition:opacity 0.3s ease,transform 0.3s cubic-bezier(0.34,1.56,0.64,1);backdrop-filter:blur(4px);}
    .bc:hover .bc-arrow{opacity:1;transform:scale(1);}

    /* Product cards (new) */
    .bc-product{background:#fff;border:1px solid rgba(10,10,10,0.08);}
    .bc-product-inner{height:100%;display:flex;flex-direction:column;}
    .bc-product-img{position:relative;overflow:hidden;flex-shrink:0;}
    .bc-1 .bc-product-img,.bc-2 .bc-product-img{height:340px;}
    .bc-3 .bc-product-img{height:300px;}
    .bc-product-img img{width:100%;height:100%;object-fit:cover;transition:transform 0.6s cubic-bezier(0.32,0.72,0,1);}
    .bc:hover .bc-product-img img{transform:scale(1.06);}
    .bc-product-badge{position:absolute;top:0.75rem;left:0.75rem;background:var(--orange);color:#fff;border-radius:999px;padding:0.28rem 0.75rem;font-size:0.6rem;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;}
    .bc-product-badge.sold-out{background:var(--ink);}
    .bc-product-wishlist{position:absolute;top:0.75rem;right:0.75rem;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,0.9);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:0.85rem;transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);opacity:0;}
    .bc:hover .bc-product-wishlist{opacity:1;}
    .bc-product-wishlist:hover{color:var(--orange);transform:scale(1.12);}
    .bc-product-body{padding:1.25rem 1.5rem 1.5rem;flex:1;display:flex;flex-direction:column;}
    .bc-product-category{font-size:0.62rem;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:var(--muted);margin-bottom:0.35rem;}
    .bc-product-name{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:1.3rem;color:var(--ink);line-height:1.1;margin-bottom:0.45rem;}
    .bc-product-stars{color:#FFB800;font-size:0.65rem;letter-spacing:2px;margin-bottom:0.75rem;}
    .bc-product-stars span{color:var(--muted);font-family:'Barlow',sans-serif;font-size:0.7rem;letter-spacing:0;margin-left:0.3rem;}
    .bc-product-footer{margin-top:auto;display:flex;align-items:center;justify-content:space-between;}
    .bc-product-price{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:1.5rem;color:var(--ink);}
    .bc-product-price .old{font-size:0.9rem;font-weight:500;color:var(--muted);text-decoration:line-through;margin-left:0.35rem;}
    .bc-product-price .save{font-size:0.65rem;font-weight:700;color:var(--orange);display:block;margin-top:0.1rem;}
    .bc-add-btn{display:inline-flex;align-items:center;gap:0.5rem;background:var(--ink);color:#fff;border-radius:999px;padding:0.6rem 1.1rem;font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;border:none;cursor:pointer;transition:all 0.3s cubic-bezier(0.32,0.72,0,1);white-space:nowrap;}
    .bc-add-btn:hover{background:var(--orange);}
    .bc-add-btn i{font-size:0.75rem;}

    /* Solid cards */
    .bc-solid-orange{background:var(--orange);}
    .bc-solid-ink{background:var(--ink);}
    .bc-solid-cream{background:#EDE8DC;border:1px solid rgba(10,10,10,0.08);}
    .bc-solid-content{height:100%;display:flex;flex-direction:column;justify-content:space-between;padding:1.75rem;}
    .solid-tag{font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;opacity:0.6;}
    .solid-num{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-style:italic;font-size:clamp(2.5rem,5vw,4.5rem);line-height:1;letter-spacing:-0.02em;}
    .solid-label{font-size:0.8rem;font-weight:600;opacity:0.75;margin-top:0.2rem;}
    .solid-cta{display:inline-flex;align-items:center;gap:0.5rem;margin-top:1rem;font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;text-decoration:none;transition:gap 0.25s ease;}
    .solid-cta:hover{gap:0.8rem;}
    .bc-stars{color:#FFB800;font-size:0.7rem;margin-bottom:0.3rem;letter-spacing:2px;}

    /* ── PRODUCT SHOWCASE SECTION ── */
    .showcase-section{background:var(--ink);padding:5rem 0;}
    .showcase-inner{max-width:1400px;margin:0 auto;padding:0 2rem;}
    .showcase-header{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3rem;}
    .showcase-title{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-style:italic;font-size:clamp(2.5rem,5vw,4.5rem);line-height:0.95;text-transform:uppercase;color:#fff;letter-spacing:-0.02em;}
    .showcase-eyebrow{font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.25em;color:rgba(255,255,255,0.4);margin-bottom:0.75rem;}
    .showcase-view-all{display:inline-flex;align-items:center;gap:0.5rem;font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:rgba(255,255,255,0.5);text-decoration:none;border-bottom:1.5px solid rgba(255,255,255,0.2);padding-bottom:2px;transition:all 0.25s ease;margin-bottom:0.5rem;}
    .showcase-view-all:hover{color:#fff;border-color:#fff;}
    .showcase-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;}
    .pcard{border-radius:1.5rem;overflow:hidden;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);cursor:pointer;transition:all 0.4s cubic-bezier(0.32,0.72,0,1);opacity:0;transform:translateY(30px);}
    .pcard.visible{opacity:1;transform:translateY(0);}
    .pcard:hover{background:rgba(255,255,255,0.07);border-color:rgba(255,255,255,0.15);transform:translateY(-5px);}
    .pcard-img{position:relative;overflow:hidden;height:260px;}
    .pcard-img img{width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease;}
    .pcard:hover .pcard-img img{transform:scale(1.07);}
    .pcard-badge{position:absolute;top:0.7rem;left:0.7rem;border-radius:999px;padding:0.25rem 0.7rem;font-size:0.58rem;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;}
    .pcard-badge.new{background:var(--orange);color:#fff;}
    .pcard-badge.sale{background:#fff;color:var(--ink);}
    .pcard-badge.hot{background:#FFB800;color:var(--ink);}
    .pcard-quick{position:absolute;bottom:0;left:0;right:0;background:rgba(10,10,10,0.85);padding:0.85rem;display:flex;align-items:center;justify-content:center;gap:0.5rem;font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#fff;transform:translateY(100%);transition:transform 0.35s cubic-bezier(0.32,0.72,0,1);backdrop-filter:blur(8px);}
    .pcard:hover .pcard-quick{transform:translateY(0);}
    .pcard-quick:hover{background:var(--orange);}
    .pcard-body{padding:1.1rem 1.25rem 1.25rem;}
    .pcard-category{font-size:0.6rem;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:rgba(255,255,255,0.35);margin-bottom:0.3rem;}
    .pcard-name{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:1.15rem;color:#fff;line-height:1.1;margin-bottom:0.4rem;}
    .pcard-stars{color:#FFB800;font-size:0.6rem;letter-spacing:2px;margin-bottom:0.65rem;}
    .pcard-footer{display:flex;align-items:center;justify-content:space-between;}
    .pcard-price{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:1.35rem;color:#fff;}
    .pcard-price .old{font-size:0.8rem;font-weight:500;color:rgba(255,255,255,0.3);text-decoration:line-through;margin-left:0.3rem;}
    .pcard-add{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);cursor:pointer;display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.8rem;transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);}
    .pcard-add:hover{background:var(--orange);border-color:var(--orange);transform:scale(1.12) rotate(90deg);}

    /* ── ANIMATIONS ── */
    @keyframes fadeUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}

    /* ── REVEAL ── */
    .reveal-up,.reveal-left,.reveal-right{opacity:0;transition:opacity 0.9s cubic-bezier(0.32,0.72,0,1),transform 0.9s cubic-bezier(0.32,0.72,0,1);}
    .reveal-up{transform:translateY(50px);}
    .reveal-left{transform:translateX(-50px);}
    .reveal-right{transform:translateX(50px);}
    .reveal-up.visible,.reveal-left.visible,.reveal-right.visible{opacity:1;transform:none;}

    /* SHARED UTILITIES */
    .section-eyebrow{display:inline-flex;align-items:center;gap:0.5rem;background:rgba(10,10,10,0.06);border-radius:999px;padding:0.35rem 1rem;font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.22em;color:var(--muted);margin-bottom:1.5rem;width:fit-content;}
    .section-eyebrow.light{background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.6);}
    .outline-text{-webkit-text-stroke:2.5px var(--ink);color:transparent;}
    .outline-text-light{-webkit-text-stroke:2.5px rgba(255,255,255,0.8);color:transparent;}

    /* ── ABOUT ── */
    .about-section{background:var(--cream);border-top:1px solid var(--border-light);overflow:hidden;}
    .about-inner{max-width:1400px;margin:0 auto;padding:7rem 2rem 5rem;display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:center;}
    .about-images{position:relative;height:600px;}
    .about-img-main{width:100%;height:100%;border-radius:2rem;overflow:hidden;position:relative;box-shadow:0 40px 80px rgba(10,10,10,0.18);}
    .about-img-main img{width:100%;height:100%;object-fit:cover;transition:transform 0.9s cubic-bezier(0.32,0.72,0,1);}
    .about-images:hover .about-img-main img{transform:scale(1.04);}
    .about-badge{position:absolute;bottom:2rem;left:2rem;background:rgba(245,240,232,0.95);border-radius:1.25rem;padding:1rem 1.4rem;border:1px solid rgba(245,240,232,0.6);box-shadow:0 8px 30px rgba(10,10,10,0.1);}
    .about-badge-label{font-size:0.6rem;text-transform:uppercase;letter-spacing:0.2em;color:var(--muted);display:block;}
    .about-badge-val{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:2rem;color:var(--ink);display:block;line-height:1;}
    .about-img-accent{position:absolute;right:-2.5rem;top:3rem;width:160px;height:200px;border-radius:1.5rem;overflow:hidden;box-shadow:0 20px 50px rgba(10,10,10,0.2);border:4px solid var(--cream);}
    .about-img-accent img{width:100%;height:100%;object-fit:cover;}
    .about-float-stat{position:absolute;right:-1rem;bottom:5rem;background:#fff;border-radius:1.25rem;padding:1.1rem 1.4rem;box-shadow:0 12px 40px rgba(10,10,10,0.12);text-align:center;min-width:100px;border:1px solid rgba(10,10,10,0.06);}
    .about-headline{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-style:italic;font-size:clamp(3rem,5.5vw,5rem);line-height:0.95;text-transform:uppercase;letter-spacing:-0.02em;color:var(--ink);margin-bottom:1.75rem;}
    .about-body{font-size:1rem;line-height:1.75;color:var(--muted);max-width:440px;margin-bottom:2.5rem;}
    .about-pillars{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;border-top:1px solid var(--border-light);padding-top:2rem;}
    .pillar-item{display:flex;gap:0.85rem;align-items:flex-start;}
    .pillar-icon{width:40px;height:40px;border-radius:50%;background:rgba(10,10,10,0.06);display:flex;align-items:center;justify-content:center;color:var(--ink);font-size:0.85rem;flex-shrink:0;transition:background 0.25s ease;}
    .pillar-item:hover .pillar-icon{background:var(--orange);color:#fff;}
    .pillar-title{font-weight:700;font-size:0.85rem;color:var(--ink);margin-bottom:0.2rem;}
    .pillar-desc{font-size:0.78rem;color:var(--muted);line-height:1.5;}
    .about-brand-row{background:var(--ink);color:rgba(255,255,255,0.35);padding:1.5rem 2rem;display:flex;align-items:center;justify-content:center;gap:2rem;flex-wrap:wrap;font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;}
    .about-brand-row .dot{color:var(--orange);font-size:0.4rem;}

    /* ── TESTIMONIALS ── */
    .testi-section{background:var(--ink);padding:7rem 0 6rem;overflow:hidden;}
    .testi-inner{max-width:1400px;margin:0 auto;padding:0 2rem;}
    .testi-header{margin-bottom:4rem;}
    .testi-headline{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-style:italic;font-size:clamp(3.5rem,7vw,6.5rem);line-height:0.9;text-transform:uppercase;color:#fff;letter-spacing:-0.02em;margin-bottom:1rem;}
    .testi-sub{font-size:0.95rem;color:rgba(255,255,255,0.4);max-width:380px;line-height:1.6;}
    .testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;}
    .tcard{border-radius:1.75rem;padding:2rem;position:relative;overflow:hidden;opacity:0;transform:translateY(40px);transition:opacity 0.8s cubic-bezier(0.32,0.72,0,1) var(--d,0s),transform 0.8s cubic-bezier(0.32,0.72,0,1) var(--d,0s),box-shadow 0.4s ease;}
    .tcard.visible{opacity:1;transform:translateY(0);}
    .tcard:hover{box-shadow:0 24px 60px rgba(0,0,0,0.3);transform:translateY(-5px);}
    .tcard-dark{background:#1a1a1a;color:#fff;}
    .tcard-cream{background:#EDE8DC;color:var(--ink);}
    .tcard-orange{background:var(--orange);color:#fff;}
    .tcard-white{background:#fff;color:var(--ink);}
    .tcard-stat{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:#fff;display:flex;flex-direction:column;justify-content:center;}
    .tcard-stars{font-size:0.85rem;letter-spacing:3px;color:#FFB800;margin-bottom:1.2rem;}
    .tcard-quote{font-size:0.9rem;line-height:1.7;margin-bottom:1.5rem;flex:1;}
    .tcard-dark .tcard-quote{color:rgba(255,255,255,0.7);}
    .tcard-cream .tcard-quote,.tcard-white .tcard-quote{color:var(--muted);}
    .tcard-orange .tcard-quote{color:rgba(255,255,255,0.85);}
    .tcard-author{display:flex;align-items:center;gap:0.85rem;margin-top:auto;}
    .tcard-avatar{width:44px;height:44px;border-radius:50%;object-fit:cover;flex-shrink:0;}
    .tcard-name{font-weight:700;font-size:0.88rem;}
    .tcard-dark .tcard-name{color:#fff;}
    .tcard-role{font-size:0.68rem;text-transform:uppercase;letter-spacing:0.15em;opacity:0.5;margin-top:0.1rem;}
    .tcard-quote-mark{font-family:'Barlow Condensed',sans-serif;font-size:6rem;font-weight:900;line-height:1;color:rgba(255,255,255,0.08);position:absolute;bottom:-1rem;right:1.5rem;pointer-events:none;user-select:none;}

    /* ── CONTACT ── */
    .contact-section{background:var(--cream);border-top:1px solid var(--border-light);padding:7rem 0 6rem;overflow:hidden;}
    .contact-inner{max-width:1400px;margin:0 auto;padding:0 2rem;display:grid;grid-template-columns:1fr 1.1fr;gap:6rem;align-items:start;}
    .contact-headline{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-style:italic;font-size:clamp(3rem,5.5vw,5rem);line-height:0.95;text-transform:uppercase;letter-spacing:-0.02em;color:var(--ink);margin-bottom:1.5rem;}
    .contact-sub{font-size:0.95rem;line-height:1.75;color:var(--muted);max-width:400px;margin-bottom:2.5rem;}
    .contact-cards{display:flex;flex-direction:column;gap:1rem;}
    .contact-card{display:flex;gap:1.1rem;align-items:flex-start;background:#fff;border-radius:1.25rem;padding:1.25rem 1.5rem;border:1px solid rgba(10,10,10,0.07);transition:border-color 0.25s ease,box-shadow 0.25s ease;}
    .contact-card:hover{border-color:var(--orange);box-shadow:0 6px 24px rgba(232,76,30,0.08);}
    .cc-icon{width:44px;height:44px;border-radius:50%;background:rgba(10,10,10,0.06);flex-shrink:0;display:flex;align-items:center;justify-content:center;color:var(--ink);font-size:0.9rem;transition:background 0.25s ease,color 0.25s ease;}
    .contact-card:hover .cc-icon{background:var(--orange);color:#fff;}
    .cc-title{font-weight:700;font-size:0.88rem;color:var(--ink);}
    .cc-sub{font-size:0.73rem;color:var(--muted);margin-top:0.1rem;}
    .cc-link{font-size:0.82rem;font-weight:600;color:var(--ink);text-decoration:none;display:block;margin-top:0.35rem;transition:color 0.2s ease;}
    .cc-link:hover{color:var(--orange);}
    .contact-form-wrap{background:#fff;border-radius:2rem;padding:3rem;border:1px solid rgba(10,10,10,0.08);box-shadow:0 30px 80px rgba(10,10,10,0.06);}
    .contact-form-title{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:2rem;color:var(--ink);margin-bottom:0.3rem;}
    .contact-form-sub{font-size:0.82rem;color:var(--muted);margin-bottom:2rem;}
    .contact-form{display:flex;flex-direction:column;gap:1.1rem;}
    .form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
    .form-group{display:flex;flex-direction:column;gap:0.45rem;}
    .form-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;color:var(--muted);}
    .form-input{background:#F7F4EF;border:1.5px solid transparent;border-radius:0.85rem;padding:0.85rem 1.1rem;font-size:0.88rem;font-family:inherit;color:var(--ink);outline:none;transition:border-color 0.25s ease,background 0.25s ease;width:100%;}
    .form-input:focus{border-color:var(--ink);background:#fff;}
    .form-textarea{resize:none;}
    .form-select{appearance:none;cursor:pointer;}
    .form-submit{display:flex;align-items:center;justify-content:center;gap:0.85rem;background:var(--ink);color:#fff;border:none;border-radius:999px;padding:1.1rem 2.5rem;font-size:0.82rem;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;cursor:pointer;width:100%;transition:all 0.35s cubic-bezier(0.32,0.72,0,1);}
    .form-submit:hover{background:var(--orange);transform:scale(1.01);}
    .submit-icon{width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;font-size:0.75rem;transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1);}
    .form-submit:hover .submit-icon{transform:translate(3px,-3px) scale(1.1);}

    /* ── FOOTER ── */
    .site-footer{background:var(--ink);color:#fff;}
    .footer-top{max-width:1400px;margin:0 auto;padding:6rem 2rem 4rem;display:grid;grid-template-columns:1fr 2fr;gap:6rem;border-bottom:1px solid rgba(255,255,255,0.07);}
    .footer-logo{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:2.2rem;letter-spacing:-0.01em;color:#fff;text-decoration:none;display:block;margin-bottom:1rem;}
    .footer-tagline{font-size:0.85rem;color:rgba(255,255,255,0.35);line-height:1.7;max-width:260px;margin-bottom:1.75rem;}
    .footer-socials{display:flex;gap:0.75rem;}
    .fsoc{width:38px;height:38px;border-radius:50%;border:1px solid rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.4);font-size:0.85rem;text-decoration:none;transition:all 0.25s ease;}
    .fsoc:hover{border-color:var(--orange);background:var(--orange);color:#fff;}
    .footer-cols{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;}
    .footer-col-title{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:rgba(255,255,255,0.35);margin-bottom:1.25rem;}
    .footer-col ul{list-style:none;display:flex;flex-direction:column;gap:0.65rem;}
    .footer-col a{font-size:0.85rem;color:rgba(255,255,255,0.5);text-decoration:none;transition:color 0.22s ease;}
    .footer-col a:hover{color:#fff;}
    .footer-newsletter{max-width:1400px;margin:0 auto;padding:2.5rem 2rem;display:flex;align-items:center;justify-content:space-between;gap:3rem;border-bottom:1px solid rgba(255,255,255,0.07);}
    .fn-title{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:1.6rem;color:#fff;}
    .fn-sub{font-size:0.8rem;color:rgba(255,255,255,0.35);margin-top:0.25rem;}
    .fn-form{display:flex;gap:0.6rem;flex:1;max-width:480px;}
    .fn-input{flex:1;background:rgba(255,255,255,0.07);border:1.5px solid rgba(255,255,255,0.1);border-radius:999px;padding:0.8rem 1.4rem;font-size:0.85rem;font-family:inherit;color:#fff;outline:none;transition:border-color 0.25s ease;}
    .fn-input::placeholder{color:rgba(255,255,255,0.3);}
    .fn-input:focus{border-color:var(--orange);}
    .fn-btn{background:var(--orange);color:#fff;border:none;border-radius:999px;padding:0.8rem 1.6rem;font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;cursor:pointer;white-space:nowrap;transition:all 0.25s ease;display:flex;align-items:center;gap:0.5rem;}
    .fn-btn:hover{background:#c43a12;transform:scale(1.02);}
    .footer-bottom{max-width:1400px;margin:0 auto;padding:1.75rem 2rem;display:flex;align-items:center;justify-content:space-between;gap:2rem;flex-wrap:wrap;}
    .footer-copy{font-size:0.78rem;color:rgba(255,255,255,0.25);}
    .footer-legal{display:flex;gap:1.25rem;align-items:center;}
    .footer-legal a{font-size:0.78rem;color:rgba(255,255,255,0.3);text-decoration:none;transition:color 0.2s ease;}
    .footer-legal a:hover{color:#fff;}
    .footer-legal span{color:rgba(255,255,255,0.15);font-size:0.65rem;}
    .footer-pays{display:flex;gap:0.85rem;font-size:1.6rem;color:rgba(255,255,255,0.25);}
    .footer-pays i{transition:color 0.2s ease;}
    .footer-pays i:hover{color:#fff;}

    /* ── RESPONSIVE ── */
    @media(max-width:1024px){
      .hero-content-inner{grid-template-columns:1fr;gap:2rem;}
      .hero-product-panel{display:none;}
      .hero-slider{height:80vh;}
      .showcase-grid{grid-template-columns:repeat(2,1fr);}
      .bc-1{grid-column:span 12;min-height:420px;}
      .bc-2{grid-column:span 6;}
      .bc-3{grid-column:span 6;}
      .bc-4,.bc-5,.bc-6{grid-column:span 6;}
      .bc-7{grid-column:span 6;}
      .bc-8{grid-column:span 6;}
      .bc-9{grid-column:span 6;}
      .about-inner{grid-template-columns:1fr;gap:4rem;}
      .about-images{height:420px;}
      .about-img-accent{right:0;top:1.5rem;width:130px;height:160px;}
      .contact-inner{grid-template-columns:1fr;gap:3rem;}
      .footer-top{grid-template-columns:1fr;gap:3rem;}
      .footer-cols{grid-template-columns:repeat(2,1fr);}
      .testi-grid{grid-template-columns:1fr 1fr;}
      .footer-newsletter{flex-direction:column;align-items:flex-start;}
      .fn-form{max-width:100%;width:100%;}
    }
    @media(max-width:768px){
      .nav-links,.nav-search{display:none;}
      .mobile-menu-btn{display:flex;}
      .hero-slider{height:75vh;}
      .hero-content-inner{padding:0 1.5rem;}
      .hero-controls-inner{padding:0 1.5rem;}
      .slide-headline{font-size:clamp(3.5rem,12vw,6rem);}
      .showcase-grid{grid-template-columns:repeat(2,1fr);}
      .bc-2,.bc-3,.bc-4,.bc-5,.bc-6,.bc-7,.bc-8,.bc-9{grid-column:span 12;}
      .testi-grid{grid-template-columns:1fr;}
      .testi-section{padding:4rem 0;}
      .contact-section{padding:4rem 0;}
      .about-inner,.contact-inner{padding:4rem 1rem;}
      .about-img-accent,.about-float-stat{display:none;}
      .footer-top{padding:4rem 1rem 2.5rem;}
      .footer-bottom{flex-direction:column;align-items:flex-start;gap:1rem;}
      .footer-cols{grid-template-columns:1fr 1fr;}
      .footer-newsletter{padding:2rem 1rem;}
      .form-row{grid-template-columns:1fr;}
      .contact-form-wrap{padding:2rem 1.5rem;}
      .bento-section{padding:3rem 1rem 4rem;}
      .bento-right{flex-direction:column;align-items:flex-start;gap:0.75rem;}
      .showcase-section{padding:3rem 0;}
    }

  </style>
</head>
<body>

<!-- SPLASH -->
<div id="splashScreen" class="splash">
  <div style="overflow:hidden;padding:6px;">
    <h1 class="splash-logo">CARTELLO</h1>
  </div>
  <div class="splash-bar"><div class="splash-bar-inner"></div></div>
  <p class="splash-tag">Premium Streetwear</p>
</div>
<script>
  const splash=document.getElementById('splashScreen');
  if(sessionStorage.getItem('splashShown')){splash.remove();}
  else{sessionStorage.setItem('splashShown','true');document.body.style.overflow='hidden';
  window.addEventListener('DOMContentLoaded',()=>{setTimeout(()=>{splash.classList.add('splash-exit');setTimeout(()=>{splash.remove();document.body.style.overflow='';},1100);},2800);});}
</script>

<!-- NAVBAR -->
<header class="navbar" id="mainNav">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">CARTELLO</a>
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="pages/products.html">Shop</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <div class="nav-actions">
      <div style="position:relative;">
        <button class="nav-search" id="searchToggle">
          <i class="fas fa-magnifying-glass" style="font-size:0.75rem;"></i>Search
        </button>
        <div class="search-dropdown" id="searchDropdown">
          <div style="position:relative;">
            <i class="fas fa-magnifying-glass" style="position:absolute;left:1rem;top:50%;transform:translateY(-50%);color:#999;font-size:0.8rem;"></i>
            <input id="searchInput" type="text" placeholder="Search products…" style="width:100%;padding:0.75rem 1rem 0.75rem 2.5rem;border-radius:999px;border:1.5px solid #eee;font-size:0.85rem;outline:none;font-family:inherit;transition:border-color 0.2s ease;"/>
          </div>
          <div id="searchResults" style="margin-top:0.75rem;max-height:220px;overflow-y:auto;"></div>
        </div>
      </div>
      <a href="pages/cart.html" style="position:relative;">
        <button class="nav-cart"><i class="fas fa-bag-shopping"></i><span class="cart-badge" id="cartCount">0</span></button>
      </a>
      <div id="authSection"><a href="pages/login.html" class="nav-signin">Sign In</a></div>
      <button class="mobile-menu-btn" id="mobileMenuBtn"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>

<!-- MOBILE MENU -->
<nav class="mobile-menu" id="mobileMenu">
  <a href="index.html">Home</a>
  <a href="pages/products.html">Shop</a>
  <a href="#about">About</a>
  <a href="#contact">Contact</a>
  <a href="pages/cart.html">Cart</a>
</nav>

<!-- ═══════════════════════════════════════
     HERO SLIDER
═══════════════════════════════════════ -->
<section class="hero-slider" id="heroSlider">

  <!-- Slides -->
  <div class="slides-container">
    <!-- Slide 1 -->
    <div class="slide active" data-index="0">
      <div class="slide-bg" style="background-image:url('https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1800&q=80');"></div>
      <div class="slide-gradient"></div>
    </div>
    <!-- Slide 2 -->
    <div class="slide" data-index="1">
      <div class="slide-bg" style="background-image:url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1800&q=80');"></div>
      <div class="slide-gradient"></div>
    </div>
    <!-- Slide 3 -->
    <div class="slide" data-index="2">
      <div class="slide-bg" style="background-image:url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=80');"></div>
      <div class="slide-gradient"></div>
    </div>
    <!-- Slide 4 -->
    <div class="slide" data-index="3">
      <div class="slide-bg" style="background-image:url('https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1800&q=80');"></div>
      <div class="slide-gradient"></div>
    </div>
  </div>

  <!-- Content Panel -->
  <div class="hero-content">
    <div class="hero-content-inner">
      <!-- Left: Text -->
      <div class="hero-text" id="heroText">
        <div class="slide-eyebrow">
          <span class="eyebrow-dot"></span>
          <span id="slideEyebrow">Spring / Summer 2026 — New Drop</span>
        </div>
        <h1 class="slide-headline" id="slideHeadline">
          Explore<br>
          <span class="outline">Your</span><br>
          <span class="accent">True</span><br>
          Style.
        </h1>
        <p class="slide-sub" id="slideSub">Discover a diverse range of clothing and accessories that redefine contemporary trends — from sleek tailored suits to bold statement streetwear.</p>
        <div class="cta-row">
          <a href="pages/products.html" class="btn-primary" id="slideBtn">
            <span id="slideBtnText">Shop Now</span>
            <span class="icon-wrap"><i class="fas fa-arrow-right"></i></span>
          </a>
          <a href="#bento" class="btn-glass">
            <i class="fas fa-play" style="font-size:0.65rem;"></i>View Lookbook
          </a>
        </div>
      </div>

      <!-- Right: Floating product card -->
      <div class="hero-product-panel">
        <div class="hero-product-card" id="heroProductCard">
          <div class="hero-product-img">
            <img id="heroCardImg" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" alt="Featured Product"/>
            <div class="hero-product-img-badge" id="heroCardBadge">New Drop</div>
          </div>
          <div class="hero-product-label" id="heroCardCategory">Signature Collection</div>
          <div class="hero-product-name" id="heroCardName">Air Boost Phantom</div>
          <div class="hero-product-stars">★★★★★</div>
          <div class="hero-product-footer">
            <div class="hero-product-price" id="heroCardPrice">₱3,499 <span>₱4,999</span></div>
            <button class="hero-add-btn" title="Add to cart"><i class="fas fa-plus"></i></button>
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- Float tag top-right -->
  <div class="slide-float-tag" id="slideFloatTag">
    Season<strong>SS '26</strong>
  </div>

  <!-- Controls -->
  <div class="hero-controls">
    <div class="hero-controls-inner">
      <div class="slide-counter"><strong id="currentSlideNum">01</strong> / <span id="totalSlides">04</span></div>
      <div class="slide-dots" id="slideDots"></div>
      <div class="slide-arrows">
        <button class="slide-arrow" id="prevSlide" aria-label="Previous slide"><i class="fas fa-chevron-left"></i></button>
        <button class="slide-arrow" id="nextSlide" aria-label="Next slide"><i class="fas fa-chevron-right"></i></button>
      </div>
    </div>
  </div>

  <!-- Progress bar -->
  <div class="hero-progress"><div class="hero-progress-fill" id="heroProgressFill"></div></div>
</section>

<!-- TICKER -->
<div class="ticker-wrap">
  <div class="ticker-track">
    <div class="ticker-item"><span>35% Off Now</span><span class="ticker-star">✦</span></div>
    <div class="ticker-item"><span>New Arrivals</span><span class="ticker-star">✦</span></div>
    <div class="ticker-item"><span>Free Shipping ₱2,500+</span><span class="ticker-star">✦</span></div>
    <div class="ticker-item"><span>Premium Streetwear</span><span class="ticker-star">✦</span></div>
    <div class="ticker-item"><span>Bold Looks</span><span class="ticker-star">✦</span></div>
    <div class="ticker-item"><span>SS '26 Collection</span><span class="ticker-star">✦</span></div>
    <div class="ticker-item"><span>35% Off Now</span><span class="ticker-star">✦</span></div>
    <div class="ticker-item"><span>New Arrivals</span><span class="ticker-star">✦</span></div>
    <div class="ticker-item"><span>Free Shipping ₱2,500+</span><span class="ticker-star">✦</span></div>
    <div class="ticker-item"><span>Premium Streetwear</span><span class="ticker-star">✦</span></div>
    <div class="ticker-item"><span>Bold Looks</span><span class="ticker-star">✦</span></div>
    <div class="ticker-item"><span>SS '26 Collection</span><span class="ticker-star">✦</span></div>
  </div>
</div>

<!-- ═══════════════════════════════════════
     BENTO GRID — COLLECTIONS
═══════════════════════════════════════ -->
<div id="bento" class="bento-section">
  <div class="bento-header" id="bentoHeader">
    <div>
      <h2 class="bento-title">New<br>Collections</h2>
    </div>
    <div class="bento-right">
      <div class="bento-filter-row">
        <button class="bento-filter active">All</button>
        <button class="bento-filter">Men's</button>
        <button class="bento-filter">Women's</button>
        <button class="bento-filter">Footwear</button>
      </div>
      <a href="pages/products.html" class="bento-view-all">View All <i class="fas fa-arrow-right"></i></a>
    </div>
  </div>

  <div class="bento-grid">

    <!-- BC-1: Large editorial — Premium Footwear (image card) -->
    <div class="bc bc-1" id="bc1">
      <img class="bc-img" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80" alt="Footwear"/>
      <div class="bc-overlay"></div>
      <div class="bc-arrow"><i class="fas fa-arrow-up-right"></i></div>
      <div class="bc-content">
        <div class="bc-tag">Signature Collection</div>
        <div class="bc-stars">★★★★★</div>
        <h3 class="bc-title">Premium<br>Footwear</h3>
        <p class="bc-desc">Step into comfort and bold aesthetics. Heritage craft meets street-level attitude.</p>
        <a href="pages/products.html" class="bc-link">Shop Sneakers <i class="fas fa-arrow-right"></i></a>
      </div>
    </div>

    <!-- BC-2: Product card — Women's Blazer -->
    <div class="bc bc-2 bc-product" id="bc2">
      <div class="bc-product-inner">
        <div class="bc-product-img">
          <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80" alt="Women's Edit"/>
          <div class="bc-product-badge">New</div>
          <button class="bc-product-wishlist"><i class="fas fa-heart"></i></button>
        </div>
        <div class="bc-product-body">
          <div class="bc-product-category">Women's Edit</div>
          <div class="bc-product-name">Structured Blazer — Ivory</div>
          <div class="bc-product-stars">★★★★★ <span>(128)</span></div>
          <div class="bc-product-footer">
            <div class="bc-product-price">₱2,199 <span class="old">₱2,999</span><span class="save">Save 27%</span></div>
            <button class="bc-add-btn"><i class="fas fa-plus"></i> Add</button>
          </div>
        </div>
      </div>
    </div>

    <!-- BC-3: Product card — Men's Hoodie -->
    <div class="bc bc-3 bc-product" id="bc3">
      <div class="bc-product-inner">
        <div class="bc-product-img">
          <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=80" alt="Men's"/>
          <div class="bc-product-badge">Hot</div>
          <button class="bc-product-wishlist"><i class="fas fa-heart"></i></button>
        </div>
        <div class="bc-product-body">
          <div class="bc-product-category">Men's</div>
          <div class="bc-product-name">Oversized Hoodie — Onyx</div>
          <div class="bc-product-stars">★★★★☆ <span>(94)</span></div>
          <div class="bc-product-footer">
            <div class="bc-product-price">₱1,799</div>
            <button class="bc-add-btn"><i class="fas fa-plus"></i> Add</button>
          </div>
        </div>
      </div>
    </div>

    <!-- BC-4: Product card — Accessories -->
    <div class="bc bc-4" id="bc4">
      <img class="bc-img" src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80" alt="Accessories"/>
      <div class="bc-overlay"></div>
      <div class="bc-arrow"><i class="fas fa-arrow-up-right"></i></div>
      <div class="bc-content">
        <div class="bc-tag">Accessories</div>
        <h3 class="bc-title">Complete<br>The Look</h3>
        <a href="pages/products.html" class="bc-link">Shop Now <i class="fas fa-arrow-right"></i></a>
      </div>
    </div>

    <!-- BC-5: Orange solid — Sale -->
    <div class="bc bc-5 bc-solid-orange" id="bc5">
      <div class="bc-solid-content" style="color:#fff;">
        <div><div class="solid-tag" style="color:rgba(255,255,255,0.7);">Limited Time</div></div>
        <div>
          <div class="solid-num">35%<br>OFF</div>
          <div class="solid-label">On selected items</div>
          <a href="pages/products.html?category=sale" class="solid-cta" style="color:#fff;">Grab the Deal <i class="fas fa-arrow-right"></i></a>
        </div>
      </div>
    </div>

    <!-- BC-6: Product card — Cargo Pants -->
    <div class="bc bc-6 bc-product" id="bc6">
      <div class="bc-product-inner">
        <div class="bc-product-img" style="height:155px;">
          <img src="https://images.unsplash.com/photo-1607522370275-f6fd7d57e058?auto=format&fit=crop&w=800&q=80" alt="Cargo Pants"/>
          <div class="bc-product-badge">New</div>
          <button class="bc-product-wishlist"><i class="fas fa-heart"></i></button>
        </div>
        <div class="bc-product-body">
          <div class="bc-product-category">Men's</div>
          <div class="bc-product-name">Tactical Cargo — Sage</div>
          <div class="bc-product-stars">★★★★★ <span>(61)</span></div>
          <div class="bc-product-footer">
            <div class="bc-product-price">₱2,499 <span class="old">₱3,200</span></div>
            <button class="bc-add-btn"><i class="fas fa-plus"></i> Add</button>
          </div>
        </div>
      </div>
    </div>

    <!-- BC-7: Shipping info -->
    <div class="bc bc-7 bc-solid-cream" id="bc7">
      <div class="bc-solid-content" style="color:var(--ink);">
        <div><div class="solid-tag">Shipping</div></div>
        <div>
          <div style="font-size:2.2rem;margin-bottom:0.5rem;">🚚</div>
          <div class="solid-num" style="font-size:clamp(1.8rem,3vw,2.8rem);">Fast<br>Delivery</div>
          <div class="solid-label">Free express ₱2,500+</div>
        </div>
      </div>
    </div>

    <!-- BC-8: Brand statement — ink solid -->
    <div class="bc bc-8 bc-solid-ink" id="bc8">
      <div class="bc-solid-content" style="color:#fff;">
        <div><div class="solid-tag" style="color:rgba(255,255,255,0.5);">Our Promise</div></div>
        <div>
          <div style="font-family:'Barlow Condensed',sans-serif;font-weight:900;font-style:italic;font-size:clamp(1.3rem,2.5vw,2rem);line-height:1.1;margin-bottom:0.75rem;">"Premium craft<br>at street price."</div>
          <div style="font-size:0.8rem;color:rgba(255,255,255,0.55);line-height:1.6;max-width:320px;">Every piece is carefully selected for uncompromising quality, superior fit, and timeless appeal.</div>
          <a href="#about" class="solid-cta" style="color:#fff;margin-top:1.2rem;">Our Story <i class="fas fa-arrow-right"></i></a>
        </div>
      </div>
    </div>

    <!-- BC-9: Rating -->
    <div class="bc bc-9 bc-solid-orange" id="bc9">
      <div class="bc-solid-content" style="color:#fff;">
        <div><div class="solid-tag" style="color:rgba(255,255,255,0.7);">Reviews</div></div>
        <div>
          <div class="solid-num">4.9</div>
          <div class="solid-label">/ 5 Rating</div>
          <div style="font-size:1rem;letter-spacing:3px;margin-top:0.4rem;">★★★★★</div>
          <div style="font-size:0.72rem;opacity:0.7;margin-top:0.4rem;">10K+ verified reviews</div>
        </div>
      </div>
    </div>

  </div>
</div>

<!-- ═══════════════════════════════════════
     PRODUCT SHOWCASE — DARK SECTION
═══════════════════════════════════════ -->
<section class="showcase-section" id="showcase">
  <div class="showcase-inner">
    <div class="showcase-header reveal-up">
      <div>
        <div class="showcase-eyebrow">Trending Now</div>
        <h2 class="showcase-title">Most<br>Wanted.</h2>
      </div>
      <a href="pages/products.html" class="showcase-view-all">Browse All <i class="fas fa-arrow-right"></i></a>
    </div>
    <div class="showcase-grid">

      <!-- Product 1 -->
      <div class="pcard" id="pcard1">
        <div class="pcard-img">
          <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80" alt="Air Boost Phantom"/>
          <span class="pcard-badge new">New</span>
          <div class="pcard-quick"><i class="fas fa-bolt" style="font-size:0.75rem;"></i> Quick Add to Cart</div>
        </div>
        <div class="pcard-body">
          <div class="pcard-category">Footwear</div>
          <div class="pcard-name">Air Boost Phantom</div>
          <div class="pcard-stars">★★★★★</div>
          <div class="pcard-footer">
            <div class="pcard-price">₱3,499 <span class="old">₱4,999</span></div>
            <button class="pcard-add" title="Add to cart"><i class="fas fa-plus"></i></button>
          </div>
        </div>
      </div>

      <!-- Product 2 -->
      <div class="pcard" id="pcard2">
        <div class="pcard-img">
          <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80" alt="Cartello Puffer"/>
          <span class="pcard-badge hot">Hot</span>
          <div class="pcard-quick"><i class="fas fa-bolt" style="font-size:0.75rem;"></i> Quick Add to Cart</div>
        </div>
        <div class="pcard-body">
          <div class="pcard-category">Outerwear</div>
          <div class="pcard-name">Cartello Puffer — Black</div>
          <div class="pcard-stars">★★★★☆</div>
          <div class="pcard-footer">
            <div class="pcard-price">₱4,299</div>
            <button class="pcard-add" title="Add to cart"><i class="fas fa-plus"></i></button>
          </div>
        </div>
      </div>

      <!-- Product 3 -->
      <div class="pcard" id="pcard3">
        <div class="pcard-img">
          <img src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80" alt="Signature Polo"/>
          <span class="pcard-badge sale">35% OFF</span>
          <div class="pcard-quick"><i class="fas fa-bolt" style="font-size:0.75rem;"></i> Quick Add to Cart</div>
        </div>
        <div class="pcard-body">
          <div class="pcard-category">Men's</div>
          <div class="pcard-name">Signature Polo — White</div>
          <div class="pcard-stars">★★★★★</div>
          <div class="pcard-footer">
            <div class="pcard-price">₱1,299 <span class="old">₱1,999</span></div>
            <button class="pcard-add" title="Add to cart"><i class="fas fa-plus"></i></button>
          </div>
        </div>
      </div>

      <!-- Product 4 -->
      <div class="pcard" id="pcard4">
        <div class="pcard-img">
          <img src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=600&q=80" alt="Mini Crossbody"/>
          <span class="pcard-badge new">New</span>
          <div class="pcard-quick"><i class="fas fa-bolt" style="font-size:0.75rem;"></i> Quick Add to Cart</div>
        </div>
        <div class="pcard-body">
          <div class="pcard-category">Accessories</div>
          <div class="pcard-name">Mini Crossbody — Tan</div>
          <div class="pcard-stars">★★★★★</div>
          <div class="pcard-footer">
            <div class="pcard-price">₱2,799</div>
            <button class="pcard-add" title="Add to cart"><i class="fas fa-plus"></i></button>
          </div>
        </div>
      </div>

    </div>

  </div>
</section>

<!-- ═══════════════════════════════════════
     ABOUT
═══════════════════════════════════════ -->
<section id="about" class="about-section">
  <div class="about-inner">
    <div class="about-images reveal-left">
      <div class="about-img-main">
        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80" alt="Fashion"/>
        <div class="about-badge"><span class="about-badge-label">Established</span><span class="about-badge-val">2024</span></div>
      </div>
      <div class="about-img-accent"><img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80" alt="Accessories"/></div>
      <div class="about-float-stat">
        <i class="fas fa-gem" style="color:var(--orange);font-size:1.2rem;margin-bottom:0.4rem;"></i>
        <div style="font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:1.8rem;line-height:1;">500+</div>
        <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.15em;color:var(--muted);margin-top:0.15rem;">Products</div>
      </div>
    </div>
    <div class="about-copy reveal-right">
      <div class="section-eyebrow">Our Story</div>
      <h2 class="about-headline">Curating<br><span class="outline-text">Confidence</span><br>For The<br><span style="color:var(--orange);">Modern World.</span></h2>
      <p class="about-body">Cartello is more than just clothing — it's an attitude. We blend premium streetwear aesthetics with effortless everyday comfort. Every piece in our collection is carefully selected for uncompromising quality, superior fit, and timeless appeal.</p>
      <div class="about-pillars">
        <div class="pillar-item"><div class="pillar-icon"><i class="fas fa-gem"></i></div><div><div class="pillar-title">Premium Quality</div><div class="pillar-desc">Materials sourced globally for maximum durability and comfort.</div></div></div>
        <div class="pillar-item"><div class="pillar-icon"><i class="fas fa-leaf"></i></div><div><div class="pillar-title">Sustainable Edit</div><div class="pillar-desc">Conscious fashion choices that respect our environment.</div></div></div>
        <div class="pillar-item"><div class="pillar-icon"><i class="fas fa-bolt"></i></div><div><div class="pillar-title">Bold Identity</div><div class="pillar-desc">Each piece is a statement. Wear your identity without saying a word.</div></div></div>
        <div class="pillar-item"><div class="pillar-icon"><i class="fas fa-truck-fast"></i></div><div><div class="pillar-title">Fast Delivery</div><div class="pillar-desc">Express shipping on all orders over ₱2,500 nationwide.</div></div></div>
      </div>
      <a href="#contact" class="btn-primary" style="width:fit-content;margin-top:2rem;background:var(--ink);">Get In Touch <span class="icon-wrap"><i class="fas fa-arrow-right"></i></span></a>
    </div>
  </div>
  <div class="about-brand-row">
    <span>10K+ Customers</span><span class="dot">●</span><span>500+ Styles</span><span class="dot">●</span><span>4.9★ Rating</span><span class="dot">●</span><span>Est. 2024</span><span class="dot">●</span><span>Free Returns</span><span class="dot">●</span><span>Premium Quality</span><span class="dot">●</span><span>Nationwide Delivery</span>
  </div>
</section>

<!-- ═══════════════════════════════════════
     TESTIMONIALS
═══════════════════════════════════════ -->
<section id="testimonials" class="testi-section">
  <div class="testi-inner">
    <div class="testi-header reveal-up">
      <div class="section-eyebrow light">What They Say</div>
      <h2 class="testi-headline">Loved By<br><span class="outline-text-light">The Bold.</span></h2>
      <p class="testi-sub">Real words from real people who wear their confidence daily.</p>
    </div>
    <div class="testi-grid">
      <div class="tcard tcard-dark reveal-up" style="--d:0s"><div class="tcard-stars">★★★★★</div><p class="tcard-quote">"The quality of these pieces absolutely blew me away. The fits are perfectly tailored — making effortless style actually effortless. Will definitely be ordering again."</p><div class="tcard-author"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="Sarah P." class="tcard-avatar"/><div><div class="tcard-name">Sarah P.</div><div class="tcard-role">Fashion Creator</div></div><div class="tcard-quote-mark">"</div></div></div>
      <div class="tcard tcard-cream reveal-up" style="--d:0.08s"><div class="tcard-stars" style="color:#E84C1E;">★★★★★</div><p class="tcard-quote">"CARTELLO perfectly bridges the gap between high-end fashion and everyday wear. The fabrics are insane and the delivery was incredibly fast."</p><div class="tcard-author"><img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" alt="Marcus T." class="tcard-avatar"/><div><div class="tcard-name">Marcus T.</div><div class="tcard-role">Creative Director</div></div><div class="tcard-quote-mark" style="color:rgba(10,10,10,0.06);">"</div></div></div>
      <div class="tcard tcard-orange reveal-up" style="--d:0.16s"><div class="tcard-stars" style="color:#fff;">★★★★★</div><p class="tcard-quote">"Finding a brand that consistently delivers on both aesthetics and comfort is rare. The signature collection is a must-have for anyone serious about style."</p><div class="tcard-author"><img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80" alt="Elena V." class="tcard-avatar"/><div><div class="tcard-name">Elena V.</div><div class="tcard-role">Stylist</div></div><div class="tcard-quote-mark" style="color:rgba(255,255,255,0.15);">"</div></div></div>
      <div class="tcard tcard-white reveal-up" style="--d:0.06s"><div class="tcard-stars" style="color:#E84C1E;">★★★★★</div><p class="tcard-quote">"I've been loyal to CARTELLO for six months now. Every single drop surprises me. The packaging alone feels premium — like unboxing a luxury brand."</p><div class="tcard-author"><img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80" alt="Lia M." class="tcard-avatar"/><div><div class="tcard-name">Lia M.</div><div class="tcard-role">Influencer · 200K</div></div><div class="tcard-quote-mark" style="color:rgba(10,10,10,0.05);">"</div></div></div>
      <div class="tcard tcard-stat reveal-up" style="--d:0.12s"><div style="font-family:'Barlow Condensed',sans-serif;font-weight:900;font-style:italic;font-size:clamp(3.5rem,7vw,5.5rem);line-height:1;color:var(--orange);">10K+</div><div style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.2em;color:var(--muted);margin-top:0.5rem;">Verified Reviews</div><div style="width:40px;height:2px;background:var(--orange);margin:1.5rem 0;"></div><p style="font-size:0.85rem;color:var(--muted);line-height:1.6;">Trusted by thousands across the Philippines and beyond.</p></div>
      <div class="tcard tcard-dark reveal-up" style="--d:0.2s"><div class="tcard-stars">★★★★★</div><p class="tcard-quote">"Super fast delivery! Ordered on a Monday, received by Wednesday. The quality exceeded my expectations. CARTELLO is now my go-to brand for everything."</p><div class="tcard-author"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Jake R." class="tcard-avatar"/><div><div class="tcard-name">Jake R.</div><div class="tcard-role">Streetwear Collector</div></div><div class="tcard-quote-mark">"</div></div></div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════
     CONTACT
═══════════════════════════════════════ -->
<section id="contact" class="contact-section">
  <div class="contact-inner">
    <div class="contact-info reveal-left">
      <div class="section-eyebrow">Support Team</div>
      <h2 class="contact-headline">Here When<br><span class="outline-text">You Need</span><br><span style="color:var(--orange);">Us.</span></h2>
      <p class="contact-sub">Have a question about an order, styling advice, or fit details? Our dedicated team is ready to give you the help you deserve.</p>
      <div class="contact-cards">
        <div class="contact-card"><div class="cc-icon"><i class="fas fa-envelope"></i></div><div><div class="cc-title">Email Us</div><div class="cc-sub">Replies within 24 hours</div><a href="mailto:support@cartello.ph" class="cc-link">support@cartello.ph</a></div></div>
        <div class="contact-card"><div class="cc-icon"><i class="fas fa-phone"></i></div><div><div class="cc-title">Call Us</div><div class="cc-sub">Mon–Fri · 9am–6pm PHT</div><a href="tel:+639123456789" class="cc-link">+63 912 345 6789</a></div></div>
        <div class="contact-card"><div class="cc-icon"><i class="fab fa-instagram"></i></div><div><div class="cc-title">Instagram</div><div class="cc-sub">DM for quick replies</div><a href="#" class="cc-link">@cartello.ph</a></div></div>
      </div>
    </div>
    <div class="contact-form-wrap reveal-right">
      <div class="contact-form-header"><h3 class="contact-form-title">Send a Message</h3><p class="contact-form-sub">We'll get back to you as soon as possible.</p></div>
      <form id="contactForm" class="contact-form">
        <div class="form-row">
          <div class="form-group"><label class="form-label">First Name</label><input type="text" name="firstName" required class="form-input" placeholder="John"/></div>
          <div class="form-group"><label class="form-label">Last Name</label><input type="text" name="lastName" class="form-input" placeholder="Doe"/></div>
        </div>
        <div class="form-group"><label class="form-label">Email Address</label><input type="email" name="email" required class="form-input" placeholder="john@example.com"/></div>
        <div class="form-group"><label class="form-label">Subject</label><select name="subject" class="form-input form-select"><option value="">Select a topic…</option><option>Order Inquiry</option><option>Returns & Exchanges</option><option>Styling Advice</option><option>Partnership</option><option>Other</option></select></div>
        <div class="form-group"><label class="form-label">Message</label><textarea name="message" required rows="4" class="form-input form-textarea" placeholder="How can we help you?"></textarea></div>
        <button type="submit" class="form-submit" id="formSubmit"><span class="submit-text">Send Message</span><span class="submit-icon"><i class="fas fa-arrow-right"></i></span></button>
      </form>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="site-footer">
  <div class="footer-top">
    <div class="footer-brand">
      <a href="index.html" class="footer-logo">CARTELLO</a>
      <p class="footer-tagline">Premium fashion for confident, modern lives. Curated essentials delivered to your door.</p>
      <div class="footer-socials">
        <a href="#" class="fsoc"><i class="fab fa-instagram"></i></a>
        <a href="#" class="fsoc"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="fsoc"><i class="fab fa-tiktok"></i></a>
        <a href="#" class="fsoc"><i class="fab fa-x-twitter"></i></a>
      </div>
    </div>
    <div class="footer-cols">
      <div class="footer-col"><div class="footer-col-title">Shop</div><ul><li><a href="pages/products.html">All Products</a></li><li><a href="pages/products.html?category=new">New Arrivals</a></li><li><a href="pages/products.html?category=sale">Sale</a></li><li><a href="pages/products.html">Best Sellers</a></li><li><a href="pages/products.html">Men's Edit</a></li><li><a href="pages/products.html">Women's Edit</a></li></ul></div>
      <div class="footer-col"><div class="footer-col-title">Account</div><ul><li><a href="pages/profile.html">My Profile</a></li><li><a href="pages/orders.html">My Orders</a></li><li><a href="pages/cart.html">My Cart</a></li><li><a href="pages/login.html">Sign In</a></li><li><a href="pages/login.html?mode=register">Register</a></li></ul></div>
      <div class="footer-col"><div class="footer-col-title">Company</div><ul><li><a href="#about">About Us</a></li><li><a href="#contact">Contact</a></li><li><a href="#">Careers</a></li><li><a href="#">Press</a></li><li><a href="#">Sustainability</a></li></ul></div>
      <div class="footer-col"><div class="footer-col-title">Support</div><ul><li><a href="#">FAQs</a></li><li><a href="#">Shipping Info</a></li><li><a href="#">Returns Policy</a></li><li><a href="#">Size Guide</a></li><li><a href="#">Track Order</a></li></ul></div>
    </div>
  </div>
  <div class="footer-newsletter">
    <div class="fn-copy"><div class="fn-title">Stay In The Loop</div><div class="fn-sub">Get early access to drops, exclusive offers, and styling tips.</div></div>
    <form class="fn-form" onsubmit="event.preventDefault();this.innerHTML='<span style=\'color:var(--orange);font-weight:700;\'>✓ You\'re in! Check your inbox.</span>';"><input type="email" required placeholder="Enter your email…" class="fn-input"/><button type="submit" class="fn-btn">Subscribe <i class="fas fa-arrow-right"></i></button></form>
  </div>
  <div class="footer-bottom">
    <p class="footer-copy">CARTELLO © 2024–2026. All rights reserved.</p>
    <div class="footer-legal"><a href="#">Privacy Policy</a><span>·</span><a href="#">Terms of Service</a><span>·</span><a href="#">Shipping Info</a></div>
    <div class="footer-pays"><i class="fab fa-cc-visa" title="Visa"></i><i class="fab fa-cc-mastercard" title="Mastercard"></i><i class="fab fa-cc-paypal" title="PayPal"></i><i class="fab fa-google-pay" title="GCash-style"></i></div>
  </div>
</footer>

<!-- ═══════════════════════════════════════
     SCRIPTS
═══════════════════════════════════════ -->
<script src="js/app.js" onerror="void 0"></script>
<script src="js/auth.js" onerror="void 0"></script>
<script src="js/products.js" onerror="void 0"></script>

<script>
// ── HERO SLIDER ──
const SLIDES = [
  {
    eyebrow: 'Spring / Summer 2026 — New Drop',
    headline: 'Explore<br><span class="outline">Your</span><br><span class="accent">True</span><br>Style.',
    sub: 'Discover a diverse range of clothing and accessories that redefine contemporary trends — from sleek tailored suits to bold statement streetwear.',
    btnText: 'Shop Now',
    floatTag: 'Season<strong>SS \'26</strong>',
    cardImg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    cardCategory: 'Signature Collection', cardName: 'Air Boost Phantom', cardPrice: '₱3,499', cardOld: '₱4,999', cardBadge: 'New Drop'
  },
  {
    eyebrow: 'Footwear — SS \'26 Collection',
    headline: '<span class="outline">Step</span><br>Into<br><span class="accent">Bold</span><br>Kicks.',
    sub: 'Heritage craft meets street-level attitude. The new footwear line drops with premium materials and iconic silhouettes.',
    btnText: 'Shop Footwear',
    floatTag: 'Category<strong>Footwear</strong>',
    cardImg: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
    cardCategory: 'Footwear', cardName: 'Air Boost Phantom', cardPrice: '₱3,499', cardOld: '₱4,999', cardBadge: 'New'
  },
  {
    eyebrow: 'Women\'s Edit — Effortless Elegance',
    headline: 'Effortless<br><span class="outline">Modern</span><br><span class="accent">Woman.</span>',
    sub: 'Curated for the bold and modern woman. Bold silhouettes, refined textures, and a cut that speaks confidence.',
    btnText: 'Explore Women\'s',
    floatTag: 'Category<strong>Women\'s</strong>',
    cardImg: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    cardCategory: 'Women\'s Edit', cardName: 'Structured Blazer', cardPrice: '₱2,199', cardOld: '₱2,999', cardBadge: 'New'
  },
  {
    eyebrow: 'Men\'s Essentials — Refined Attitude',
    headline: '<span class="accent">Men\'s</span><br><span class="outline">Refined</span><br>Essentials.',
    sub: 'From premium hoodies to sculpted cargo pants — essentials engineered for the man who leads with confidence.',
    btnText: 'Shop Men\'s',
    floatTag: 'Category<strong>Men\'s</strong>',
    cardImg: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=80',
    cardCategory: 'Men\'s', cardName: 'Oversized Hoodie — Onyx', cardPrice: '₱1,799', cardOld: '', cardBadge: 'Hot'
  }
];

let currentSlide = 0;
let autoTimer = null;
let progressTimer = null;
const SLIDE_DURATION = 5500;

const slidesEl = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('slideDots');
const progressFill = document.getElementById('heroProgressFill');
const heroText = document.getElementById('heroText');

// Build dots
SLIDES.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
  dot.style.width = i === 0 ? '28px' : '8px';
  dot.setAttribute('aria-label', `Go to slide ${i+1}`);
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

function updateContent(idx) {
  const s = SLIDES[idx];
  document.getElementById('slideEyebrow').textContent = s.eyebrow;
  document.getElementById('slideHeadline').innerHTML = s.headline;
  document.getElementById('slideSub').textContent = s.sub;
  document.getElementById('slideBtnText').textContent = s.btnText;
  document.getElementById('slideFloatTag').innerHTML = s.floatTag;
  document.getElementById('heroCardImg').src = s.cardImg;
  document.getElementById('heroCardCategory').textContent = s.cardCategory;
  document.getElementById('heroCardName').textContent = s.cardName;
  const priceEl = document.getElementById('heroCardPrice');
  priceEl.innerHTML = s.cardPrice + (s.cardOld ? ` <span>${s.cardOld}</span>` : '');
  document.getElementById('heroCardBadge').textContent = s.cardBadge;
  document.getElementById('currentSlideNum').textContent = String(idx+1).padStart(2,'0');
}

function goToSlide(idx) {
  slidesEl[currentSlide].classList.remove('active');
  document.querySelectorAll('.slide-dot')[currentSlide].classList.remove('active');
  document.querySelectorAll('.slide-dot')[currentSlide].style.width = '8px';

  currentSlide = idx;

  slidesEl[currentSlide].classList.add('active');
  document.querySelectorAll('.slide-dot')[currentSlide].classList.add('active');
  document.querySelectorAll('.slide-dot')[currentSlide].style.width = '28px';

  heroText.style.opacity = '0';
  heroText.style.transform = 'translateY(20px)';
  setTimeout(() => {
    updateContent(currentSlide);
    heroText.style.transition = 'opacity 0.6s cubic-bezier(0.32,0.72,0,1), transform 0.6s cubic-bezier(0.32,0.72,0,1)';
    heroText.style.opacity = '1';
    heroText.style.transform = 'translateY(0)';
  }, 250);

  resetProgress();
}

function nextSlide() { goToSlide((currentSlide + 1) % SLIDES.length); }
function prevSlide() { goToSlide((currentSlide - 1 + SLIDES.length) % SLIDES.length); }

function resetProgress() {
  progressFill.classList.remove('animating');
  progressFill.style.width = '0';
  clearTimeout(autoTimer);
  clearTimeout(progressTimer);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      progressFill.style.transition = `width ${SLIDE_DURATION}ms linear`;
      progressFill.classList.add('animating');
      progressFill.style.width = '100%';
    });
  });
  autoTimer = setTimeout(nextSlide, SLIDE_DURATION);
}

document.getElementById('nextSlide').addEventListener('click', () => { clearTimeout(autoTimer); nextSlide(); });
document.getElementById('prevSlide').addEventListener('click', () => { clearTimeout(autoTimer); prevSlide(); });

// Pause on hover
const slider = document.getElementById('heroSlider');
slider.addEventListener('mouseenter', () => {
  clearTimeout(autoTimer);
  progressFill.style.animationPlayState = 'paused';
});
slider.addEventListener('mouseleave', resetProgress);

// Keyboard nav
document.addEventListener('keydown', e => {
  if(e.key === 'ArrowRight') nextSlide();
  if(e.key === 'ArrowLeft') prevSlide();
});

// Touch/swipe
let touchStartX = 0;
slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, {passive:true});
slider.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if(Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
}, {passive:true});

resetProgress();

// ── NAVBAR SCROLL ──
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 60); }, {passive:true});

// ── MOBILE MENU ──
const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
mobileBtn.addEventListener('click', () => { mobileBtn.classList.toggle('open'); mobileMenu.classList.toggle('open'); });
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { mobileBtn.classList.remove('open'); mobileMenu.classList.remove('open'); }));

// ── SEARCH ──
const searchToggle = document.getElementById('searchToggle');
const searchDropdown = document.getElementById('searchDropdown');
searchToggle.addEventListener('click', e => {
  e.stopPropagation();
  searchDropdown.classList.toggle('active');
  if(searchDropdown.classList.contains('active')) setTimeout(() => document.getElementById('searchInput').focus(), 100);
});
document.addEventListener('click', e => { if(!searchDropdown.contains(e.target) && e.target !== searchToggle) searchDropdown.classList.remove('active'); });

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'});}
  });
});

// ── BENTO FILTER ──
document.querySelectorAll('.bento-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.bento-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ── INTERSECTION OBSERVERS ──
const bentoObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if(entry.isIntersecting){
      entry.target.style.transitionDelay = `${i * 0.07}s`;
      entry.target.classList.add('visible');
      bentoObserver.unobserve(entry.target);
    }
  });
}, {threshold:0.12, rootMargin:'0px 0px -60px 0px'});
document.querySelectorAll('.bc, .bento-header').forEach(el => bentoObserver.observe(el));

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){ entry.target.classList.add('visible'); revealObs.unobserve(entry.target); }
  });
}, {threshold:0.1, rootMargin:'0px 0px -80px 0px'});
document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right,.tcard,.pcard,.showcase-header').forEach(el => revealObs.observe(el));

// Stagger pcards
const pcardObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if(entry.isIntersecting){
      setTimeout(() => { entry.target.classList.add('visible'); }, i * 100);
      pcardObs.unobserve(entry.target);
    }
  });
}, {threshold:0.1});
document.querySelectorAll('.pcard').forEach(el => pcardObs.observe(el));

// ── CONTACT FORM ──
const contactForm = document.getElementById('contactForm');
const formSubmit = document.getElementById('formSubmit');
if(contactForm){
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const submitText = formSubmit.querySelector('.submit-text');
    const submitIcon = formSubmit.querySelector('.submit-icon');
    const originalText = submitText.textContent;
    const originalIcon = submitIcon.innerHTML;
    submitText.textContent = 'Sending...';
    submitIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    formSubmit.disabled = true;
    try {
      const formData = new FormData(contactForm);
      const firstName = formData.get('firstName')||'';
      const lastName = formData.get('lastName')||'';
      const name = `${firstName} ${lastName}`.trim();
      const email = formData.get('email');
      const subject = formData.get('subject');
      const message = formData.get('message');
      const API = window.location.hostname==='localhost'||window.location.hostname==='127.0.0.1'?'http://localhost:5000/api':'https://shopco-ecommerce-pm93.onrender.com/api';
      const res = await fetch(`${API}/notifications/contact`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,subject,message})});
      const data = await res.json();
      if(!res.ok) throw new Error(data.message||'Failed to send message');
      submitText.textContent = 'Message Sent!';
      submitIcon.innerHTML = '<i class="fas fa-check"></i>';
      formSubmit.style.background = '#16a34a';
      contactForm.reset();
    } catch(error){
      submitText.textContent = 'Failed to send';
      submitIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
      formSubmit.style.background = '#dc2626';
    }
    setTimeout(() => {
      submitText.textContent = originalText;
      submitIcon.innerHTML = originalIcon;
      formSubmit.style.background = '';
      formSubmit.disabled = false;
    }, 3500);
  });
}

// ── CART COUNT ──
try{
  const cart = JSON.parse(localStorage.getItem('cartello_cart')||'[]');
  const count = cart.reduce((s,i) => s+(i.qty||1), 0);
  document.getElementById('cartCount').textContent = count || 0;
}catch(e){}

// ── CURSOR EFFECT ──
if(window.matchMedia('(hover:hover)').matches){
  const cursor = document.createElement('div');
  cursor.style.cssText='position:fixed;width:20px;height:20px;border-radius:50%;border:1.5px solid rgba(232,76,30,0.5);pointer-events:none;z-index:9997;display:none;mix-blend-mode:multiply;transition:transform 0.1s ease;';
  document.body.appendChild(cursor);
  document.addEventListener('mousemove',e=>{
    cursor.style.display='block';
    cursor.style.transform=`translate(${e.clientX-10}px,${e.clientY-10}px)`;
  });
}
</script>
</body>
</html>
