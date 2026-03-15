// Demo product data
const products = [
  { id:1, title:'Striped Casual Shirt', brand:'Zebra Co.', price:799, category:'men', img:'[images.unsplash.com](https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=0a9b2ff7b6a6b6c8c3a1b4c6b5d1a2f6)' },
  { id:2, title:'Floral Summer Dress', brand:'Bloom', price:1299, category:'women', img:'[images.unsplash.com](https://images.unsplash.com/photo-1520975698519-0f8a9a0c5b0f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=5b6e2f4f4f58f5b7c3a1d4e2b6c8d9f3)' },
  { id:3, title:'Casual Sneakers', brand:'RunFast', price:2499, category:'men', img:'[images.unsplash.com](https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=cc8ee7a5a0b9f3f7a2a7d3f9a1b1c4d3)' },
  { id:4, title:'Kids Polo T-shirt', brand:'TinySteps', price:399, category:'kids', img:'[images.unsplash.com](https://images.unsplash.com/photo-1602810319517-b3a6d7b3c5b4?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=8c9b6d4f3e7a1b2c3d4e5f6a7b8c9d0e)' },
  { id:5, title:'Matte Lipstick', brand:'Glow', price:349, category:'beauty', img:'[images.unsplash.com](https://images.unsplash.com/photo-1556228720-1f4d6a6f4b3d?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=6b7c8d9e0a1b2c3d4e5f6a7b8c9d0a1b)' },
  { id:6, title:'Denim Jacket', brand:'Ridge', price:2199, category:'women', img:'[images.unsplash.com](https://images.unsplash.com/photo-1520975698519-0f8a9a0c5b0f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=5b6e2f4f4f58f5b7c3a1d4e2b6c8d9f3)' },
  { id:7, title:'Running Shorts', brand:'Sprint', price:599, category:'men', img:'[images.unsplash.com](https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=ad3c1f2b3e4f5a6b7c8d9e0f1a2b3c4d)' },
  { id:8, title:'Casual Sneakers (Pink)', brand:'RunFast', price:2399, category:'women', img:'[images.unsplash.com](https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=cc8ee7a5a0b9f3f7a2a7d3f9a1b1c4d3)' }
];

// Simple cart state
let cart = {};

const productGrid = document.getElementById('productGrid');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');

function formatINR(n){ return n.toLocaleString('en-IN'); }

function renderProducts(list){
  productGrid.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="thumb" style="background-image:url('${p.img}')"></div>
      <div class="body">
        <div class="brand">${p.brand}</div>
        <div class="title">${p.title}</div>
        <div class="price">
          <div class="amount">₹${formatINR(p.price)}</div>
          <button data-id="${p.id}" class="addBtn">Add</button>
        </div>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// Cart functions
function updateCartCount(){
  const count = Object.values(cart).reduce((s,it)=>s+it.qty,0);
  cartCount.textContent = count;
}

function openCart(){
  renderCartItems();
  cartModal.classList.remove('hidden');
}

function closeCart(){
  cartModal.classList.add('hidden');
}

function renderCartItems(){
  cartItemsEl.innerHTML = '';
  const items = Object.values(cart);
  if(items.length === 0){
    cartItemsEl.innerHTML = '<div style="color:var(--muted);padding:12px">Your cart is empty.</div>';
    cartTotalEl.textContent = '0';
    return;
  }
  let total=0;
  items.forEach(it=>{
    total += it.product.price * it.qty;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${it.product.img}" alt="${it.product.title}" />
      <div style="flex:1">
        <div style="font-weight:600">${it.product.title}</div>
        <div style="color:var(--muted);font-size:13px">${it.product.brand}</div>
        <div style="margin-top:6px;color:var(--muted);font-size:14px">₹${formatINR(it.product.price)} × ${it.qty}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px">
        <button class="small" data-action="inc" data-id="${it.product.id}">+</button>
        <button class="small" data-action="dec" data-id="${it.product.id}">−</button>
      </div>
    `;
    cartItemsEl.appendChild(div);
  });
  cartTotalEl.textContent = formatINR(total);
}

// Event listeners
document.addEventListener('click', (e) => {
  if(e.target.matches('.addBtn')){
    const id = +e.target.dataset.id;
    const product = products.find(p=>p.id===id);
    if(!cart[id]) cart[id] = { product, qty:0 };
    cart[id].qty += 1;
    updateCartCount();
  }

  if(e.target.id === 'cartBtn'){
    openCart();
  }

  if(e.target.id === 'closeCart'){
    closeCart();
  }

  if(e.target.matches('[data-action]')){
    const id = +e.target.dataset.id;
    const action = e.target.dataset.action;
    if(!cart[id]) return;
    if(action === 'inc') cart[id].qty += 1;
    if(action === 'dec'){ cart[id].qty -= 1; if(cart[id].qty <= 0) delete cart[id]; }
    renderCartItems();
    updateCartCount();
  }

  if(e.target.id === 'checkout'){
    alert('Proceeding to checkout — demo only.');
    cart = {};
    updateCartCount();
    closeCart();
  }

  if(e.target.id === 'shopNow'){
    window.scrollTo({ top: document.querySelector('.product-grid').offsetTop - 20, behavior:'smooth' });
  }
});

// Search & filters
document.getElementById('searchBtn').addEventListener('click', () => {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  const filtered = products.filter(p => p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
  renderProducts(filtered.length ? filtered : products);
});

document.getElementById('searchInput').addEventListener('keypress', (e)=> {
  if(e.key === 'Enter') document.getElementById('searchBtn').click();
});

document.querySelectorAll('.nav-filter').forEach(btn=>{
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    document.getElementById('categorySelect').value = filter;
    applyFilters();
  });
});

document.getElementById('categorySelect').addEventListener('change', applyFilters);
document.getElementById('sortSelect').addEventListener('change', applyFilters);

function applyFilters(){
  const cat = document.getElementById('categorySelect').value;
  const sort = document.getElementById('sortSelect').value;
  let list = products.slice();
  if(cat !== 'all') list = list.filter(p => p.category === cat);
  if(sort === 'low') list.sort((a,b)=>a.price-b.price);
  if(sort === 'high') list.sort((a,b)=>b.price-a.price);
  renderProducts(list);
}

// Modal background click closes
cartModal.addEventListener('click', (e)=>{
  if(e.target === cartModal) closeCart();
});

// init
renderProducts(products);
updateCartCount();
