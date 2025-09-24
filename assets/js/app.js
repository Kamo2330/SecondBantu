(function(){
  const root = document.documentElement;
  const preferred = (window.__INITIAL_THEME__ || 'gold');
  const stored = localStorage.getItem('theme');
  const theme = stored || preferred;
  document.body?.setAttribute('data-theme', theme === 'green' ? 'green' : 'gold');

  // Random currency selection (persistent)
  const currencies = [
    { symbol: '$', code: 'USD', name: 'US Dollar' },
    { symbol: '€', code: 'EUR', name: 'Euro' },
    { symbol: '£', code: 'GBP', name: 'British Pound' },
    { symbol: '¥', code: 'JPY', name: 'Japanese Yen' },
    { symbol: 'C$', code: 'CAD', name: 'Canadian Dollar' },
    { symbol: 'A$', code: 'AUD', name: 'Australian Dollar' },
    { symbol: 'R', code: 'ZAR', name: 'South African Rand' },
    { symbol: '₹', code: 'INR', name: 'Indian Rupee' }
  ];
  
  // Force South African Rand (ZAR)
  let selectedCurrency = { symbol: 'R', code: 'ZAR', name: 'South African Rand' };
  localStorage.setItem('selectedCurrency', JSON.stringify(selectedCurrency));
  window.CURRENT_CURRENCY = selectedCurrency;
  
  // Currency formatting function
  window.formatCurrency = function(amount) {
    if (selectedCurrency.code === 'JPY' || selectedCurrency.code === 'INR') {
      return selectedCurrency.symbol + Math.round(amount).toLocaleString();
    }
    // For ZAR, show whole numbers (no decimals)
    if (selectedCurrency.code === 'ZAR') {
      return selectedCurrency.symbol + Math.round(amount).toLocaleString();
    }
    return selectedCurrency.symbol + amount.toFixed(2);
  };

  const themeToggle = document.getElementById('themeToggle');
  if(themeToggle){
    themeToggle.addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme');
      const next = current === 'gold' ? 'green' : 'gold';
      document.body.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // Update theme button to show current currency
  if(themeToggle){
    themeToggle.textContent = `${selectedCurrency.symbol} ${selectedCurrency.code}`;
    themeToggle.title = `Current: ${selectedCurrency.name}. Double-click to change currency.`;
    
    // Currency reset button (double-click to change)
    themeToggle.addEventListener('dblclick', () => {
      const newCurrency = currencies[Math.floor(Math.random() * currencies.length)];
      localStorage.setItem('selectedCurrency', JSON.stringify(newCurrency));
      window.CURRENT_CURRENCY = newCurrency;
      location.reload(); // Refresh to apply new currency
    });
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  // WhatsApp link
  const wa = document.getElementById('whatsappLink');
  if(wa){
    const msg = encodeURIComponent('Hello 2ndBantu, I need assistance.');
    wa.setAttribute('href', 'https://wa.me/00000000000?text=' + msg);
    wa.setAttribute('target','_blank');
    wa.setAttribute('rel','noopener');
  }

  // Featured products on Home
  const featuredGrid = document.getElementById('featuredGrid');
  if(featuredGrid){
    const items = [
      {id:1,title:'iPhone 13 Pro 128GB',price:480,cond:'Like New',cat:'electronics',img:'https://images.unsplash.com/photo-1603398938378-c7c62b76dfe7?q=80&w=400&auto=format&fit=crop'},
      {id:2,title:'Gold Chain Bracelet',price:320,cond:'Good',cat:'jewelry',img:'https://images.unsplash.com/photo-1617038260897-57b8d7f52c16?q=80&w=400&auto=format&fit=crop'},
      {id:3,title:'Makita Cordless Drill',price:95,cond:'Good',cat:'tools',img:'https://images.unsplash.com/photo-1581091014534-7d9690f6d2b4?q=80&w=400&auto=format&fit=crop'},
      {id:4,title:'Gucci Handbag',price:540,cond:'Fair',cat:'fashion',img:'https://images.unsplash.com/photo-1610395219791-f6a0293ee2ef?q=80&w=400&auto=format&fit=crop'},
      {id:5,title:'Samsung 55" Smart TV',price:350,cond:'Good',cat:'electronics',img:'https://images.unsplash.com/photo-1593359677879-612bd6f0f3a2?q=80&w=400&auto=format&fit=crop'},
      {id:6,title:'Diamond Engagement Ring',price:890,cond:'Like New',cat:'jewelry',img:'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=400&auto=format&fit=crop'},
      {id:7,title:'MacBook Air M2',price:750,cond:'Like New',cat:'electronics',img:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop'},
      {id:8,title:'Rolex Submariner',price:1200,cond:'Good',cat:'jewelry',img:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop'},
      {id:9,title:'Dewalt Circular Saw',price:120,cond:'Good',cat:'tools',img:'https://images.unsplash.com/photo-1581091014534-7d9690f6d2b4?q=80&w=400&auto=format&fit=crop'},
      {id:10,title:'Louis Vuitton Wallet',price:280,cond:'Fair',cat:'fashion',img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400&auto=format&fit=crop'},
      {id:11,title:'Sony PlayStation 5',price:420,cond:'Like New',cat:'electronics',img:'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=400&auto=format&fit=crop'},
      {id:12,title:'Pearl Necklace',price:180,cond:'Good',cat:'jewelry',img:'https://images.unsplash.com/photo-1515562141207-7a88e7b8a4c1?q=80&w=400&auto=format&fit=crop'}
    ];
    const grid = featuredGrid;
    const render = (filter) => {
      grid.innerHTML='';
      items.filter(x => filter==='all'||!filter? true : x.cat===filter).forEach(item => {
        const el = document.createElement('div');
        el.className='card';
        el.innerHTML = `
          <img alt="${item.title}" src="${item.img}">
          <div class="body">
            <div>${item.title}</div>
            <div class="meta">${item.cond} • ${item.cat}</div>
            <div class="price">${formatCurrency(item.price)}</div>
            <button class="btn btn-primary" style="margin-top:6px">Buy Now</button>
          </div>
        `;
        grid.appendChild(el);
      });
    };
    render('all');
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
        tab.classList.add('active');
        render(tab.getAttribute('data-filter'));
      });
    });
  }

  // Pawn form stepper
  const pawnForm = document.getElementById('pawnForm');
  if(pawnForm){
    const steps = Array.from(pawnForm.querySelectorAll('.step'));
    let current = 0;
    const show = (idx) => {
      steps.forEach((s,i)=> s.classList.toggle('hidden', i!==idx));
    };
    show(0);

    pawnForm.addEventListener('click', (e) => {
      const target = e.target;
      if(!(target instanceof HTMLElement)) return;
      if(target.matches('[data-next]')){
        e.preventDefault();
        if(current < steps.length - 1){ current++; show(current); }
      }
      if(target.matches('[data-prev]')){
        e.preventDefault();
        if(current > 0){ current--; show(current); }
      }
    });

    const fileInput = pawnForm.querySelector('#photos');
    const photoHint = pawnForm.querySelector('#photoHint');
    const offerBox = pawnForm.querySelector('#offerBox');
    const calcBtn = pawnForm.querySelector('#calcOffer');
    const submitBtn = pawnForm.querySelector('#submitPawn');

    if(fileInput){
      fileInput.addEventListener('change', () => {
        const files = fileInput.files ? fileInput.files.length : 0;
        photoHint.textContent = `${files} selected • need at least 3 (max 12)`;
      });
    }
    if(calcBtn){
      calcBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Mock offer based on condition and category
        const baseByCat = { electronics: 200, jewelry: 400, appliances: 150, fashion: 120, tools: 100 };
        const category = pawnForm.querySelector('#category');
        const condition = pawnForm.querySelector('#condition');
        const cat = category && category.value ? category.value : 'electronics';
        const cond = condition && condition.value ? condition.value : 'Good';
        const conditionMultiplier = { 'New': 1.0, 'Like New': 0.9, 'Good': 0.7, 'Fair': 0.5, 'Poor': 0.3 }[cond] || 0.6;
        const offer = Math.round((baseByCat[cat] || 150) * conditionMultiplier);
        offerBox.textContent = `Instant valuation: ${formatCurrency(offer)}`;
        offerBox.style.display = 'block';
        submitBtn.removeAttribute('disabled');
      });
    }

    pawnForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Submitted! Our team will contact you shortly.');
      pawnForm.reset();
      window.location.href = 'thankyou.html';
    });
  }

  // Shop filters (simple client-side filter on demo items)
  const shopGrid = document.getElementById('shopGrid');
  if(shopGrid){
  const items = [
    {id:1,title:'iPhone 13 Pro 128GB',price:480,cond:'Like New',cat:'electronics',img:'https://images.unsplash.com/photo-1603398938378-c7c62b76dfe7?q=80&w=400&auto=format&fit=crop'},
    {id:2,title:'Gold Chain Bracelet',price:320,cond:'Good',cat:'jewelry',img:'https://images.unsplash.com/photo-1617038260897-57b8d7f52c16?q=80&w=400&auto=format&fit=crop'},
    {id:3,title:'Makita Cordless Drill',price:95,cond:'Good',cat:'tools',img:'https://images.unsplash.com/photo-1581091014534-7d9690f6d2b4?q=80&w=400&auto=format&fit=crop'},
    {id:4,title:'Gucci Handbag',price:540,cond:'Fair',cat:'fashion',img:'https://images.unsplash.com/photo-1610395219791-f6a0293ee2ef?q=80&w=400&auto=format&fit=crop'},
    {id:5,title:'Samsung 55" Smart TV',price:350,cond:'Good',cat:'appliances',img:'https://images.unsplash.com/photo-1593359677879-612bd6f0f3a2?q=80&w=400&auto=format&fit=crop'},
    {id:6,title:'Diamond Engagement Ring',price:890,cond:'Like New',cat:'jewelry',img:'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=400&auto=format&fit=crop'},
    {id:7,title:'MacBook Air M2',price:750,cond:'Like New',cat:'electronics',img:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop'},
    {id:8,title:'Rolex Submariner',price:1200,cond:'Good',cat:'jewelry',img:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop'},
    {id:9,title:'Dewalt Circular Saw',price:120,cond:'Good',cat:'tools',img:'https://images.unsplash.com/photo-1581091014534-7d9690f6d2b4?q=80&w=400&auto=format&fit=crop'},
    {id:10,title:'Louis Vuitton Wallet',price:280,cond:'Fair',cat:'fashion',img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400&auto=format&fit=crop'},
    {id:11,title:'Sony PlayStation 5',price:420,cond:'Like New',cat:'electronics',img:'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=400&auto=format&fit=crop'},
    {id:12,title:'Pearl Necklace',price:180,cond:'Good',cat:'jewelry',img:'https://images.unsplash.com/photo-1515562141207-7a88e7b8a4c1?q=80&w=400&auto=format&fit=crop'}
  ];
    const render = (list) => {
      shopGrid.innerHTML='';
      list.forEach(item => {
        const el = document.createElement('div');
        el.className = 'card';
        el.innerHTML = `
          <img alt="${item.title}" src="${item.img}">
          <div class="body">
            <div>${item.title}</div>
            <div class="meta">${item.cond} • ${item.cat}</div>
            <div class="price">${formatCurrency(item.price)}</div>
            <button class="btn btn-primary" style="margin-top:6px">Buy Now</button>
          </div>
        `;
        shopGrid.appendChild(el);
      });
    };
    const catSel = document.getElementById('filterCategory');
    const condSel = document.getElementById('filterCondition');
    const priceMin = document.getElementById('priceMin');
    const priceMax = document.getElementById('priceMax');
    const applyFilters = () => {
      const c = catSel.value;
      const k = condSel.value;
      const min = Number(priceMin.value || 0);
      const max = Number(priceMax.value || Infinity);
      const filtered = items.filter(x => (c==='all'||x.cat===c) && (k==='all'||x.cond===k) && x.price>=min && x.price<=max);
      render(filtered);
    };
    [catSel,condSel,priceMin,priceMax].forEach(el => el && el.addEventListener('change', applyFilters));
    render(items);
  }
})();


