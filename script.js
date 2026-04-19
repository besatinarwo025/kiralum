const products = [
  {
    id: "p1",
    name: "Two-Tone Crest Shirt",
    price: 180,
    category: "Shirts",
    size: ["S", "M", "L", "XL"],
    color: "White",
    badge: "New",
    description: "A piece inspired by movement and everyday rhythm. Crest embroidery, clean collar, soft cotton.",
    images: ["assets/shirt-front.jpg", "assets/shirt-back.jpg"]
  },
  {
    id: "p2",
    name: "Forest Bubble Dress",
    price: 320,
    category: "Dresses",
    size: ["XS", "S", "M", "L"],
    color: "Green",
    badge: "Sale",
    description: "Voluminous skirt and fitted bodice for a quiet, expressive silhouette.",
    images: ["assets/dress-front.jpg", "assets/dress-back.jpg"]
  },
  {
    id: "p3",
    name: "Emerald Archer Trousers",
    price: 360,
    category: "Trousers",
    size: ["M", "L", "XL"],
    color: "Black",
    badge: null,
    description: "Elongated lines, grounded palette, and fluid drape for daily ease.",
    images: ["assets/trousers-front.jpg", "assets/trousers-back.jpg"]
  }
];

const els = {
  ageModal: document.getElementById("ageModal"),
  ageConfirm: document.getElementById("ageConfirm"),
  ageDecline: document.getElementById("ageDecline"),
  cookieBanner: document.getElementById("cookieBanner"),
  cookieAccept: document.getElementById("cookieAccept"),
  cookieSettings: document.getElementById("cookieSettings"),
  cartDrawer: document.getElementById("cartDrawer"),
  cartCount: document.getElementById("cartCount"),
  cartItems: document.getElementById("cartItems"),
  cartTotal: document.getElementById("cartTotal"),
  checkoutBtn: document.getElementById("checkoutBtn"),
  productGrid: document.getElementById("productGrid"),
  filterBtns: document.querySelectorAll(".filter-btn"),
  waFab: document.getElementById("waFab"),
  modal: document.getElementById("productModal"),
  modalName: document.getElementById("modalName"),
  modalPrice: document.getElementById("modalPrice"),
  modalDescription: document.getElementById("modalDescription"),
  modalCategory: document.getElementById("modalCategory"),
  modalAdd: document.getElementById("modalAdd"),
  modalSize: document.getElementById("modalSize"),
  modalColor: document.getElementById("modalColor"),
  sliderTrack: document.getElementById("sliderTrack"),
  newsletterForm: document.getElementById("newsletterForm"),
  newsletterEmail: document.getElementById("newsletterEmail"),
  newsletterSuccess: document.getElementById("newsletterSuccess"),
  header: document.querySelector(".site-header"),
  navDrawer: document.getElementById("navDrawer"),
  navBackdrop: document.getElementById("navBackdrop"),
  menuToggle: document.querySelector(".menu-toggle"),
  searchToggle: document.querySelector(".search-toggle"),
  searchModal: document.getElementById("searchModal"),
  searchInput: document.getElementById("searchInput"),
  searchClose: document.querySelector(".search-close"),
  searchResults: document.getElementById("searchResults"),
  wishlistToggle: document.querySelector(".wishlist-toggle"),
  wishlistDrawer: document.getElementById("wishlistDrawer"),
  wishlistCount: document.getElementById("wishlistCount"),
  wishlistItems: document.getElementById("wishlistItems"),
  wishlistClose: document.querySelector(".wishlist-close"),
  sizeFilter: document.getElementById("sizeFilter"),
  colorFilter: document.getElementById("colorFilter"),
  sortFilter: document.getElementById("sortFilter"),
  sizeGuideModal: document.getElementById("sizeGuideModal"),
  sizeGuideClose: document.querySelector(".size-guide-close"),
  zoomModal: document.getElementById("zoomModal"),
  zoomBtn: document.getElementById("zoomBtn"),
  zoomImage: document.getElementById("zoomImage"),
  zoomClose: document.querySelector(".zoom-modal-close"),
  compareModal: document.getElementById("compareModal"),
  compareContent: document.getElementById("compareContent"),
  compareBtn: document.getElementById("compareBtn"),
  compareClose: document.querySelector(".compare-modal-close"),
  compareFab: document.getElementById("compareFab"),
  compareCount: document.getElementById("compareCount"),
  newsletterPopup: document.getElementById("newsletterPopup"),
  popupNewsletterForm: document.getElementById("popupNewsletterForm"),
  popupNewsletterEmail: document.getElementById("popupNewsletterEmail"),
  popupNewsletterSuccess: document.getElementById("popupNewsletterSuccess"),
  noThanksCheckbox: document.getElementById("noThanksCheckbox"),
  relatedProducts: document.getElementById("relatedProducts")
};

let cart = loadCart();
let wishlist = loadWishlist();
let recentlyViewed = loadRecentlyViewed();
let comparedProducts = loadComparedProducts();
let currentProduct = null;
let currentSlide = 0;

document.addEventListener("DOMContentLoaded", () => {
  initAgeVerification();
  initCookieBanner();
  attachNav();
  attachCart();
  attachSearch();
  attachWishlist();
  attachWhatsApp();
  attachNewsletter();
  attachFadeIn();
  renderProducts();
  attachFilters();
  attachAdvancedFilters();
  attachSizeGuide();
  attachContactForm();
  attachModalControls();
  attachZoom();
  attachComparison();
  initScrollAnimations();
});

function attachNav() {
  document.querySelectorAll(".cart-toggle").forEach((btn) => btn.addEventListener("click", openCart));
  setupScrollHeader();
  setupMobileMenu();
}

function setupScrollHeader() {
  if (!els.header) return;
  const updateHeader = () => {
    const shouldSolid = window.scrollY > 8 || !els.header.classList.contains("is-transparent");
    els.header.classList.toggle("is-solid", shouldSolid);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

function setupMobileMenu() {
  const drawer = els.navDrawer;
  const backdrop = els.navBackdrop;
  const toggle = els.menuToggle;
  if (!drawer || !backdrop || !toggle) return;

  const openDrawer = () => {
    drawer.classList.add("open");
    backdrop.classList.add("open");
    toggle.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    drawer.setAttribute("aria-hidden", "false");
    backdrop.setAttribute("aria-hidden", "false");
    document.body.classList.add("nav-drawer-open");
  };

  const closeDrawer = () => {
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");
    backdrop.setAttribute("aria-hidden", "true");
    document.body.classList.remove("nav-drawer-open");
  };

  toggle.addEventListener("click", () => {
    if (drawer.classList.contains("open")) closeDrawer();
    else openDrawer();
  });
  backdrop.addEventListener("click", closeDrawer);
  drawer.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeDrawer));
  window.addEventListener("keydown", (e) => e.key === "Escape" && drawer.classList.contains("open") && closeDrawer());
  window.matchMedia("(min-width: 769px)").addEventListener("change", (e) => {
    if (e.matches) closeDrawer();
  });
}

function attachCart() {
  renderCartCount();
  renderCartDrawer();
  document.querySelector(".cart-close")?.addEventListener("click", closeCart);
  els.checkoutBtn?.addEventListener("click", checkoutWhatsApp);
}

function attachSearch() {
  if (!els.searchToggle) return;
  els.searchToggle.addEventListener("click", openSearch);
  els.searchClose?.addEventListener("click", closeSearch);
  els.searchInput?.addEventListener("input", handleSearch);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !els.searchModal?.hasAttribute("aria-hidden")) closeSearch();
  });
}

function attachWishlist() {
  renderWishlistCount();
  renderWishlistDrawer();
  document.querySelector(".wishlist-close")?.addEventListener("click", closeWishlist);
}

function attachWhatsApp() {
  els.waFab?.addEventListener("click", (e) => {
    e.preventDefault();
    checkoutWhatsApp();
  });
}

function attachNewsletter() {
  if (!els.newsletterForm) return;
  els.newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!els.newsletterEmail.checkValidity()) return;
    els.newsletterSuccess.style.display = "block";
    els.newsletterForm.reset();
  });
}

function initAgeVerification() {
  if (!els.ageModal) return;
  
  // Check if user has already verified age
  const ageVerified = localStorage.getItem("kiralum-age-verified");
  if (ageVerified === "true") {
    els.ageModal.setAttribute("aria-hidden", "true");
    return;
  }
  
  // Show modal
  els.ageModal.setAttribute("aria-hidden", "false");
  
  // Handle confirm
  els.ageConfirm?.addEventListener("click", () => {
    localStorage.setItem("kiralum-age-verified", "true");
    els.ageModal.setAttribute("aria-hidden", "true");
  });
  
  // Handle decline
  els.ageDecline?.addEventListener("click", () => {
    window.location.href = "https://www.google.com";
  });
}

function initCookieBanner() {
  if (!els.cookieBanner) return;
  
  // Check if user has already accepted cookies
  const cookiesAccepted = localStorage.getItem("kiralum-cookies-accepted");
  if (cookiesAccepted === "true") {
    return;
  }
  
  // Show banner after a short delay
  setTimeout(() => {
    els.cookieBanner.classList.add("show");
  }, 2000);
  
  // Handle accept all
  els.cookieAccept?.addEventListener("click", () => {
    localStorage.setItem("kiralum-cookies-accepted", "true");
    els.cookieBanner.classList.remove("show");
  });
  
  // Handle cookie settings (for now just accept)
  els.cookieSettings?.addEventListener("click", () => {
    localStorage.setItem("kiralum-cookies-accepted", "true");
    els.cookieBanner.classList.remove("show");
  });
}

function attachFadeIn() {
  const fades = document.querySelectorAll(".fade");
  if (!("IntersectionObserver" in window)) {
    fades.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const obs = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("in-view")),
    { threshold: 0.2 }
  );
  fades.forEach((el) => obs.observe(el));
}

function renderProducts() {
  if (!els.productGrid) return;
  const params = new URLSearchParams(window.location.search);
  const filter = params.get("category");
  const fragment = document.createDocumentFragment();
  products.forEach((p, idx) => {
    if (filter && p.category !== filter) return;
    const card = createProductCard(p);
    card.style.transitionDelay = `${idx * 60}ms`;
    fragment.appendChild(card);
  });
  els.productGrid.innerHTML = "";
  els.productGrid.appendChild(fragment);
  renderRecentlyViewed();
}

function renderRecentlyViewed() {
  const recentlyGrid = document.getElementById("recentlyGrid");
  const recentlyViewedEl = document.getElementById("recentlyViewed");
  
  if (!recentlyGrid || !recentlyViewedEl) return;
  
  const recentProducts = getRecentlyViewedProducts();
  if (recentProducts.length === 0) {
    recentlyViewedEl.style.display = "none";
    return;
  }
  
  recentlyViewedEl.style.display = "block";
  recentlyGrid.innerHTML = recentProducts.map(product => `
    <div class="recently-item" data-id="${product.id}">
      <img src="${product.images[0]}" alt="${product.name}" class="recently-thumb">
      <div class="recently-info">
        <h4>${product.name}</h4>
        <p>$${product.price}</p>
      </div>
    </div>
  `).join("");
  
  // Add click handlers
  document.querySelectorAll('.recently-item').forEach(item => {
    item.addEventListener('click', () => {
      const productId = item.dataset.id;
      const product = products.find(p => p.id === productId);
      if (product) {
        openModal(product);
      }
    });
  });
}

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card fade";
  card.dataset.id = product.id;
  card.dataset.hover = product.images[1];
  card.innerHTML = `
    <div class="product-image" style="background-image:url('${product.images[0]}')">
      ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
    </div>
    <div class="product-body">
      <h3>${product.name}</h3>
      <p class="price">$${product.price}</p>
      <div class="product-actions">
        <button class="wishlist-btn" data-id="${product.id}">❤️</button>
        <button class="btn btn-primary add-btn" data-id="${product.id}">Add to Bag</button>
      </div>
    </div>
  `;
  card.addEventListener("mouseenter", () => swapImage(card, true));
  card.addEventListener("mouseleave", () => swapImage(card, false));
  card.addEventListener("click", (e) => {
    if ((e.target instanceof HTMLElement) && e.target.matches(".add-btn")) return;
    openModal(product);
  });
  card.querySelector(".add-btn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    addToCart(product.id);
  });
  card.querySelector(".wishlist-btn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  });
  return card;
}

function swapImage(card, hover) {
  const img = card.querySelector(".product-image");
  const product = products.find((p) => p.id === card.dataset.id);
  if (!img || !product) return;
  img.style.backgroundImage = `url('${hover ? product.images[1] : product.images[0]}')`;
}

function attachFilters() {
  if (!els.filterBtns) return;
  els.filterBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      els.filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      document.querySelectorAll(".product-card").forEach((card) => {
        const prod = products.find((p) => p.id === card.dataset.id);
        const show = filter === "all" || prod?.category === filter;
        card.style.display = show ? "block" : "none";
      });
    })
  );
}

function attachAdvancedFilters() {
  [els.sizeFilter, els.colorFilter, els.sortFilter].forEach(el => {
    if (!el) return;
    el.addEventListener("change", applyFilters);
  });
}

function applyFilters() {
  const size = els.sizeFilter?.value || "";
  const color = els.colorFilter?.value || "";
  const sort = els.sortFilter?.value || "newest";
  let filtered = products.slice();
  if (size) filtered = filtered.filter(p => p.size?.includes(size));
  if (color) filtered = filtered.filter(p => p.color === color);
  if (sort === "price-low") filtered.sort((a, b) => a.price - b.price);
  else if (sort === "price-high") filtered.sort((a, b) => b.price - a.price);
  // For newest, assume id order
  renderFilteredProducts(filtered);
}

function renderFilteredProducts(prods) {
  if (!els.productGrid) return;
  const fragment = document.createDocumentFragment();
  prods.forEach((p) => {
    fragment.appendChild(createProductCard(p));
  });
  els.productGrid.innerHTML = "";
  els.productGrid.appendChild(fragment);
}

function openSearch() {
  if (!els.searchModal) return;
  els.searchModal.setAttribute("aria-hidden", "false");
  els.searchInput?.focus();
}

function closeSearch() {
  if (!els.searchModal) return;
  els.searchModal.setAttribute("aria-hidden", "true");
  els.searchInput.value = "";
  els.searchResults.innerHTML = "";
}

function handleSearch() {
  const query = els.searchInput.value.toLowerCase();
  if (!query) {
    els.searchResults.innerHTML = "";
    return;
  }
  const results = products.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
  els.searchResults.innerHTML = results.map(p => `
    <div class="search-item" data-id="${p.id}">
      <img src="${p.images[0]}" alt="${p.name}" class="search-thumb">
      <div class="search-meta">
        <h4>${p.name}</h4>
        <p>$${p.price}</p>
      </div>
    </div>
  `).join("");
  document.querySelectorAll(".search-item").forEach(item => {
    item.addEventListener("click", () => {
      const id = item.dataset.id;
      const product = products.find(p => p.id === id);
      if (product) {
        closeSearch();
        openModal(product);
      }
    });
  });
}

function renderWishlistCount() {
  if (!els.wishlistCount) return;
  els.wishlistCount.textContent = wishlist.length;
}

function renderWishlistDrawer() {
  if (!els.wishlistItems) return;
  if (wishlist.length === 0) {
    els.wishlistItems.innerHTML = '<p class="empty">Your wishlist is empty</p>';
    return;
  }
  els.wishlistItems.innerHTML = wishlist.map(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return '';
    return `
      <div class="wishlist-item">
        <img src="${product.images[0]}" alt="${product.name}" class="wishlist-thumb">
        <div class="wishlist-meta">
          <h4>${product.name}</h4>
          <p>$${product.price}</p>
          <button class="wishlist-remove" data-id="${item.id}">Remove</button>
        </div>
        <button class="btn btn-primary" onclick="addToCart(${item.id})">Add to Cart</button>
      </div>
    `;
  }).join("");
  document.querySelectorAll(".wishlist-remove").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      wishlist = wishlist.filter(item => item.id != id);
      saveWishlist();
      renderWishlistCount();
      renderWishlistDrawer();
    });
  });
}

function openWishlist() {
  if (!els.wishlistDrawer) return;
  els.wishlistDrawer.classList.add("open");
}

function closeWishlist() {
  if (!els.wishlistDrawer) return;
  els.wishlistDrawer.classList.remove("open");
}

function toggleWishlist(id) {
  const index = wishlist.findIndex(item => item.id == id);
  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push({ id });
  }
  saveWishlist();
  renderWishlistCount();
}

function openModal(product) {
  currentProduct = product;
  currentSlide = 0;
  addToRecentlyViewed(product.id); // Track recently viewed
  updateCompareButton(); // Update compare button state
  els.modalName.textContent = product.name;
  els.modalPrice.textContent = `$${product.price}`;
  els.modalDescription.textContent = product.description;
  els.modalCategory.textContent = product.category;
  els.modalAdd.onclick = () => addToCart(product.id);
  // Populate size
  els.modalSize.innerHTML = '<option value="">Select Size</option>' + product.size.map(s => `<option value="${s}">${s}</option>`).join("");
  // Populate color
  els.modalColor.innerHTML = `<option value="${product.color}">${product.color}</option>`;
  renderRelated(product.category, product.id);
  renderSlider(product.images);
  setModalVisible(true);
}

function attachModalControls() {
  if (!els.modal) return;
  els.modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("product-modal-backdrop") || e.target.classList.contains("product-modal-close")) {
      setModalVisible(false);
    }
  });
  document.querySelector(".slider-prev")?.addEventListener("click", () => changeSlide(-1));
  document.querySelector(".slider-next")?.addEventListener("click", () => changeSlide(1));
  document.addEventListener("keydown", (e) => {
    if (els.modal.getAttribute("aria-hidden") === "false") {
      if (e.key === "Escape") setModalVisible(false);
      if (e.key === "ArrowLeft") changeSlide(-1);
      if (e.key === "ArrowRight") changeSlide(1);
    }
  });
  
  // Social sharing buttons
  document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const platform = btn.dataset.platform;
      shareProduct(platform);
    });
  });
  
  // Compare button
  if (els.compareBtn) {
    els.compareBtn.addEventListener('click', () => {
      if (currentProduct) {
        addToComparison(currentProduct.id);
      }
    });
  }
}

function renderSlider(images) {
  if (!els.sliderTrack) return;
  els.sliderTrack.innerHTML = "";
  images.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    els.sliderTrack.appendChild(img);
  });
  updateSlider();
}

function changeSlide(delta) {
  if (!currentProduct) return;
  currentSlide = (currentSlide + delta + currentProduct.images.length) % currentProduct.images.length;
  updateSlider();
}

function attachSizeGuide() {
  document.querySelector(".size-guide-btn")?.addEventListener("click", openSizeGuide);
  els.sizeGuideClose?.addEventListener("click", closeSizeGuide);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !els.sizeGuideModal?.hasAttribute("aria-hidden")) closeSizeGuide();
  });
}

function openSizeGuide() {
  if (!els.sizeGuideModal) return;
  els.sizeGuideModal.setAttribute("aria-hidden", "false");
}

function closeSizeGuide() {
  if (!els.sizeGuideModal) return;
  els.sizeGuideModal.setAttribute("aria-hidden", "true");
}

function renderRelated(category, excludeId) {
  if (!els.relatedProducts) return;
  const related = products.filter(p => p.category === category && p.id !== excludeId).slice(0, 3);
  const grid = els.relatedProducts.querySelector(".related-grid");
  if (!grid) return;
  grid.innerHTML = related.map(p => `
    <div class="related-item" data-id="${p.id}">
      <img src="${p.images[0]}" alt="${p.name}" class="related-thumb">
      <h4>${p.name}</h4>
      <p>$${p.price}</p>
    </div>
  `).join("");
  document.querySelectorAll(".related-item").forEach(item => {
    item.addEventListener("click", () => {
      const id = item.dataset.id;
      const product = products.find(p => p.id === id);
      if (product) {
        setModalVisible(false);
        openModal(product);
      }
    });
  });
}

function attachContactForm() {
  const form = document.getElementById("contactForm");
  const success = document.getElementById("contactSuccess");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) return;
    success.style.display = "block";
    form.reset();
  });
}

function attachZoom() {
  if (!els.zoomBtn || !els.zoomModal) return;
  
  els.zoomBtn.addEventListener('click', () => {
    if (!currentProduct || !currentProduct.images[currentSlide]) return;
    els.zoomImage.src = currentProduct.images[currentSlide];
    els.zoomModal.setAttribute('aria-hidden', 'false');
  });
  
  els.zoomModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('zoom-modal-backdrop') || e.target.classList.contains('zoom-modal-close')) {
      els.zoomModal.setAttribute('aria-hidden', 'true');
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (els.zoomModal.getAttribute('aria-hidden') === 'false' && e.key === 'Escape') {
      els.zoomModal.setAttribute('aria-hidden', 'true');
    }
  });
}

function attachComparison() {
  if (!els.compareModal) return;
  
  // FAB button handler
  if (els.compareFab) {
    els.compareFab.addEventListener('click', () => {
      openComparison();
    });
  }
  
  els.compareModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('compare-modal-backdrop') || e.target.classList.contains('compare-modal-close')) {
      closeComparison();
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (els.compareModal.getAttribute('aria-hidden') === 'false' && e.key === 'Escape') {
      closeComparison();
    }
  });
  
  // Initialize count
  updateCompareCount();
}

function updateSlider() {
  if (!els.sliderTrack || !currentProduct) return;
  els.sliderTrack.style.transform = `translateX(${-currentSlide * 100}%)`;
}

function setModalVisible(show) {
  if (!els.modal) return;
  els.modal.setAttribute("aria-hidden", show ? "false" : "true");
}

function addToCart(id) {
  const item = cart.find((c) => c.id === id);
  if (item) item.qty += 1;
  else cart.push({ id, qty: 1 });
  saveCart();
  renderCartCount();
  renderCartDrawer();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter((c) => c.id !== id);
  saveCart();
  renderCartCount();
  renderCartDrawer();
}

function updateQty(id, delta) {
  const item = cart.find((c) => c.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  renderCartCount();
  renderCartDrawer();
}

function renderCartCount() {
  if (!els.cartCount) return;
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  els.cartCount.textContent = count;
}

function renderCartDrawer() {
  if (!els.cartItems || !els.cartTotal) return;
  els.cartItems.innerHTML = "";
  if (!cart.length) {
    els.cartItems.innerHTML = `<div class="empty">Your bag is empty.</div>`;
  }
  let subtotal = 0;
  cart.forEach((item) => {
    const prod = products.find((p) => p.id === item.id);
    if (!prod) return;
    subtotal += prod.price * item.qty;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <img class="cart-thumb" src="${prod.images[0]}" alt="${prod.name}">
      <div class="cart-meta">
        <h4>${prod.name}</h4>
        <div class="cart-controls">
          <button class="qty-btn" data-action="dec" data-id="${item.id}">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
        </div>
        <button class="remove-btn" data-action="remove" data-id="${item.id}">Remove</button>
      </div>
      <div class="cart-price">$${prod.price * item.qty}</div>
    `;
    els.cartItems.appendChild(row);
  });
  els.cartTotal.textContent = `$${subtotal}`;
  els.cartItems.querySelectorAll(".qty-btn").forEach((btn) =>
    btn.addEventListener("click", () => updateQty(btn.dataset.id, btn.dataset.action === "inc" ? 1 : -1))
  );
  els.cartItems.querySelectorAll(".remove-btn").forEach((btn) =>
    btn.addEventListener("click", () => removeFromCart(btn.dataset.id))
  );
}

function openCart() {
  els.cartDrawer?.classList.add("open");
  els.cartDrawer?.setAttribute("aria-hidden", "false");
}

function closeCart() {
  els.cartDrawer?.classList.remove("open");
  els.cartDrawer?.setAttribute("aria-hidden", "true");
}

function checkoutWhatsApp() {
  if (!cart.length) {
    openCart();
    return;
  }
  const lines = cart.map((item) => {
    const p = products.find((prod) => prod.id === item.id);
    return `${p?.name} x${item.qty} - $${p ? p.price * item.qty : 0}`;
  });
  const total = cart.reduce((sum, item) => {
    const p = products.find((prod) => prod.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
  const message = encodeURIComponent(`Order | KIRALUM\n${lines.join("\n")}\nTotal: $${total}`);
  window.open(`https://wa.me/263XXXXXXXXX?text=${message}`, "_blank");
}

function shareProduct(platform) {
  if (!currentProduct) return;
  
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(`${currentProduct.name} | KIRALUM`);
  const description = encodeURIComponent(currentProduct.description);
  const image = encodeURIComponent(window.location.origin + '/' + currentProduct.images[0]);
  
  let shareUrl = '';
  
  switch(platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
      break;
    case 'pinterest':
      shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${description}&media=${image}`;
      break;
    case 'copy':
      navigator.clipboard.writeText(window.location.href).then(() => {
        // Show success message
        const btn = document.querySelector('.share-btn[data-platform="copy"]');
        const originalText = btn.textContent;
        btn.textContent = '✅';
        setTimeout(() => btn.textContent = originalText, 2000);
      });
      return;
  }
  
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }
}

function showNewsletterPopup() {
  if (!els.newsletterPopup) return;
  
  // Check if user has already dismissed it
  const dismissed = localStorage.getItem("kiralum-newsletter-dismissed");
  if (dismissed === "true") return;
  
  // Check if already subscribed
  const subscribed = localStorage.getItem("kiralum-newsletter-subscribed");
  if (subscribed === "true") return;
  
  els.newsletterPopup.setAttribute('aria-hidden', 'false');
}

function hideNewsletterPopup() {
  if (!els.newsletterPopup) return;
  els.newsletterPopup.setAttribute('aria-hidden', 'true');
}

function initNewsletterPopup() {
  if (!els.newsletterPopup) return;
  
  // Show popup on exit intent (mouse leaving page)
  let exitIntentTriggered = false;
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0 && !exitIntentTriggered) {
      exitIntentTriggered = true;
      setTimeout(() => showNewsletterPopup(), 1000);
    }
  });
  
  // Show popup after 30 seconds of activity
  setTimeout(() => {
    if (!exitIntentTriggered) {
      showNewsletterPopup();
    }
  }, 30000);
  
  // Close button
  const closeBtn = document.querySelector('.newsletter-popup-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', hideNewsletterPopup);
  }
  
  // Backdrop click
  els.newsletterPopup.addEventListener('click', (e) => {
    if (e.target.classList.contains('newsletter-popup-backdrop')) {
      hideNewsletterPopup();
    }
  });
  
  // Form submission
  if (els.popupNewsletterForm) {
    els.popupNewsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!els.popupNewsletterEmail.checkValidity()) return;
      
      localStorage.setItem("kiralum-newsletter-subscribed", "true");
      els.popupNewsletterSuccess.style.display = "block";
      els.popupNewsletterForm.style.display = "none";
      
      setTimeout(() => {
        hideNewsletterPopup();
      }, 2000);
    });
  }
  
  // "No thanks" checkbox
  if (els.noThanksCheckbox) {
    els.noThanksCheckbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        localStorage.setItem("kiralum-newsletter-dismissed", "true");
        setTimeout(() => hideNewsletterPopup(), 500);
      }
    });
  }
  
  // Escape key
  document.addEventListener('keydown', (e) => {
    if (els.newsletterPopup.getAttribute('aria-hidden') === 'false' && e.key === 'Escape') {
      hideNewsletterPopup();
    }
  });
}

function saveCart() {
  localStorage.setItem("kiralum-cart", JSON.stringify(cart));
}

function loadCart() {
  try {
    const data = localStorage.getItem("kiralum-cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveWishlist() {
  localStorage.setItem("kiralum-wishlist", JSON.stringify(wishlist));
}

function loadWishlist() {
  try {
    const data = localStorage.getItem("kiralum-wishlist");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveRecentlyViewed() {
  localStorage.setItem("kiralum-recently-viewed", JSON.stringify(recentlyViewed));
}

function loadRecentlyViewed() {
  try {
    const data = localStorage.getItem("kiralum-recently-viewed");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function addToRecentlyViewed(productId) {
  // Remove if already exists
  recentlyViewed = recentlyViewed.filter(id => id !== productId);
  // Add to beginning
  recentlyViewed.unshift(productId);
  // Keep only last 5
  recentlyViewed = recentlyViewed.slice(0, 5);
  saveRecentlyViewed();
}

function getRecentlyViewedProducts() {
  return recentlyViewed.map(id => products.find(p => p.id === id)).filter(Boolean);
}

function saveComparedProducts() {
  localStorage.setItem("kiralum-compared", JSON.stringify(comparedProducts));
}

function loadComparedProducts() {
  try {
    const data = localStorage.getItem("kiralum-compared");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function addToComparison(productId) {
  if (comparedProducts.includes(productId)) {
    // Remove if already compared
    comparedProducts = comparedProducts.filter(id => id !== productId);
  } else {
    // Add to comparison (max 3 products)
    if (comparedProducts.length < 3) {
      comparedProducts.push(productId);
    } else {
      // Replace first item
      comparedProducts.shift();
      comparedProducts.push(productId);
    }
  }
  saveComparedProducts();
  updateCompareButton();
  updateCompareCount();
}

function updateCompareButton() {
  if (!els.compareBtn) return;
  const isCompared = currentProduct && comparedProducts.includes(currentProduct.id);
  els.compareBtn.textContent = isCompared ? 'Remove from Compare' : 'Compare Product';
  els.compareBtn.classList.toggle('compared', isCompared);
}

function updateCompareCount() {
  if (els.compareCount) {
    els.compareCount.textContent = comparedProducts.length;
  }
}

function renderComparison() {
  if (!els.compareContent) return;
  
  if (comparedProducts.length === 0) {
    els.compareContent.innerHTML = '<p class="compare-empty">Add products to compare them side by side.</p>';
    return;
  }
  
  const comparedItems = comparedProducts.map(id => products.find(p => p.id === id)).filter(Boolean);
  
  let tableHTML = '<table class="compare-table"><thead><tr>';
  tableHTML += '<th>Product</th>';
  comparedItems.forEach(product => {
    tableHTML += `<th>
      <img src="${product.images[0]}" alt="${product.name}" class="compare-image">
      <div class="compare-name">${product.name}</div>
      <div class="compare-price">$${product.price}</div>
      <button class="compare-remove" data-id="${product.id}">Remove</button>
    </th>`;
  });
  tableHTML += '</tr></thead><tbody>';
  
  // Features to compare
  const features = [
    { label: 'Category', key: 'category' },
    { label: 'Price', key: 'price', format: (val) => `$${val}` },
    { label: 'Sizes', key: 'size', format: (val) => val.join(', ') },
    { label: 'Color', key: 'color' },
    { label: 'Rating', value: '⭐⭐⭐⭐⭐ 4.8/5' }
  ];
  
  features.forEach(feature => {
    tableHTML += `<tr><td><strong>${feature.label}</strong></td>`;
    comparedItems.forEach(product => {
      let value = feature.value || product[feature.key];
      if (feature.format) value = feature.format(value);
      tableHTML += `<td>${value}</td>`;
    });
    tableHTML += '</tr>';
  });
  
  tableHTML += '</tbody></table>';
  els.compareContent.innerHTML = tableHTML;
  
  // Add remove handlers
  document.querySelectorAll('.compare-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const productId = btn.dataset.id;
      addToComparison(productId);
      renderComparison();
    });
  });
}

function openComparison() {
  if (!els.compareModal) return;
  renderComparison();
  els.compareModal.setAttribute('aria-hidden', 'false');
}

function closeComparison() {
  if (!els.compareModal) return;
  els.compareModal.setAttribute('aria-hidden', 'true');
}

// Scroll-triggered animations for product cards
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for smooth animation
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all product cards
  document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  cart = loadCart();
  wishlist = loadWishlist();
  renderCartCount();
  renderCartDrawer();
  renderProducts();
  attachEvents();
  attachSizeGuide();
  attachContactForm();
  initScrollAnimations();
  initNewsletterPopup();
});
