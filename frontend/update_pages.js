const fs = require('fs');
const path = require('path');
const pagesDir = path.join(__dirname, 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const content = fs.readFileSync(path.join(pagesDir, file), 'utf-8');
  let newContent = content.replace(/<div id="authSection" class="relative">/g, '<div id="authSection" class="relative hidden lg:block">');

  newContent = newContent.replace(/<div id="mobileMenu" class="hidden fixed inset-0 z-50 bg-black\/60 backdrop-blur-sm">[\s\S]*?<\/div>\n    <\/div>/,
    '<div id="mobileMenu" class="fixed inset-0 z-50 pointer-events-none">\n      <div id="mobileMenuOverlay" class="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 transition-opacity duration-300"></div>\n      <div id="mobileMenuContent" class="absolute right-0 top-0 h-full w-72 md:w-80 bg-white shadow-2xl flex flex-col p-6 gap-6 transform translate-x-full transition-transform duration-300 ease-in-out">\n        <div class="flex items-center justify-between">\n          <span class="text-xl font-black">CARTELLO</span>\n          <button id="closeMobileMenu" class="p-2 rounded-full bg-slate-100 hover:bg-slate-200"><i class="fas fa-times"></i></button>\n        </div>\n        <nav class="flex flex-col gap-4 text-sm font-medium text-slate-700">\n          <a href="../index.html" class="hover:text-black transition">Home</a>\n          <a href="products.html" class="hover:text-black transition">Shop</a>\n          <a href="../index.html#about" class="hover:text-black transition">About</a>\n          <a href="../index.html#contact" class="hover:text-black transition">Contact</a>\n          <hr class="border-slate-200">\n          <div id="mobileAuthLinks" class="flex flex-col gap-4">\n             <a href="login.html" class="hover:text-black transition">Sign In</a>\n             <a href="register.html" class="hover:text-black transition">Create Account</a>\n          </div>\n          <hr class="border-slate-200">\n          <a href="orders.html" class="hover:text-black transition">My Orders</a>\n          <a href="profile.html" class="hover:text-black transition">Profile</a>\n          <a href="cart.html" class="hover:text-black transition">Cart</a>\n        </nav>\n      </div>\n    </div>');

  // Replace the inline JS for mobile menu logic
  newContent = newContent.replace(/const btn = document\.getElementById\('mobileMenuBtn'\);[\s\S]*?if \(menu\) menu\.addEventListener\('click', e => { if \(e\.target === menu\) menu\.classList\.add\('hidden'\); }\);/,
    `const btn = document.getElementById('mobileMenuBtn');
      const menu = document.getElementById('mobileMenu');
      const overlay = document.getElementById('mobileMenuOverlay');
      const content = document.getElementById('mobileMenuContent');
      const close = document.getElementById('closeMobileMenu');
      
      const closeMenu = () => {
        if(content) content.classList.add('translate-x-full');
        if(overlay) {
          overlay.classList.add('opacity-0');
          setTimeout(() => menu.classList.add('pointer-events-none'), 300);
        } else if(menu) menu.classList.add('hidden');
      };

      if (btn) btn.addEventListener('click', () => {
        menu.classList.remove('pointer-events-none');
        if(overlay) overlay.classList.remove('opacity-0');
        if(content) content.classList.remove('translate-x-full');
        menu.classList.remove('hidden');
      });
      if (close) close.addEventListener('click', closeMenu);
      if (overlay) overlay.addEventListener('click', closeMenu);
      else if (menu) menu.addEventListener('click', e => { if (e.target === menu) closeMenu(); });`);

  // Inject mobileAuthLinks logic in the auth section block
  newContent = newContent.replace(/authSection\.innerHTML = `[\s\S]*?`;/,
    `authSection.innerHTML = \`
          <button id="userMenuToggle" class="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50" style="transition: none !important; animation: none !important; transform: none !important;">
            <img src="https://ui-avatars.com/api/?name=\${encodeURIComponent(user.name||user.fullName)}&background=000&color=fff&size=24" class="w-6 h-6 rounded-full">
            <span class="hidden xl:inline">\${(user.name||user.fullName||'').split(' ')[0]}</span>
            <i class="fas fa-chevron-down text-xs"></i>
          </button>
          <div id="userMenu" class="absolute top-full mt-2 right-0 w-48 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 hidden z-50">
            <a href="profile.html" class="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 transition"><i class="fas fa-user w-4"></i> Profile</a>
            <a href="orders.html" class="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 transition"><i class="fas fa-shopping-bag w-4"></i> Orders</a>
            <hr class="my-2 border-slate-200">
            <button onclick="localStorage.removeItem('token');localStorage.removeItem('user');window.location.href='login.html'" class="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 transition w-full text-left"><i class="fas fa-sign-out-alt w-4"></i> Sign Out</button>
          </div>
        \`;
        
        const mobileAuthLinks = document.getElementById('mobileAuthLinks');
        if (mobileAuthLinks) {
            mobileAuthLinks.innerHTML = \`
                <div class="flex items-center gap-3 mb-2">
                    <img src="https://ui-avatars.com/api/?name=\${encodeURIComponent(user.name||user.fullName)}&background=000&color=fff&size=32" class="w-8 h-8 rounded-full">
                    <span class="font-bold text-slate-900">\${user.name||user.fullName}</span>
                </div>
                <a href="profile.html" class="hover:text-black transition"><i class="fas fa-user w-5"></i> Profile</a>
                <a href="orders.html" class="hover:text-black transition"><i class="fas fa-shopping-bag w-5"></i> My Orders</a>
                <button onclick="localStorage.removeItem('token');localStorage.removeItem('user');window.location.href='login.html'" class="text-left text-red-600 hover:text-red-700 transition font-bold mt-2"><i class="fas fa-sign-out-alt w-5"></i> Sign Out</button>
            \`;
        }`);

  fs.writeFileSync(path.join(pagesDir, file), newContent);
}
console.log('Updated all pages');
