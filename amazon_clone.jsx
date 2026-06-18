import { useState } from "react";

const products = [
  { id: 1, name: "Apple iPhone 15 Pro", price: 79999, rating: 4.5, reviews: 2341, image: "📱", category: "Electronics", prime: true },
  { id: 2, name: "Samsung 55\" 4K Smart TV", price: 54999, rating: 4.3, reviews: 1876, image: "📺", category: "Electronics", prime: true },
  { id: 3, name: "Sony WH-1000XM5 Headphones", price: 24999, rating: 4.7, reviews: 5423, image: "🎧", category: "Electronics", prime: false },
  { id: 4, name: "Nike Air Max 270", price: 8999, rating: 4.2, reviews: 983, image: "👟", category: "Fashion", prime: true },
  { id: 5, name: "Instant Pot Duo 7-in-1", price: 6499, rating: 4.6, reviews: 12034, image: "🍲", category: "Kitchen", prime: true },
  { id: 6, name: "Canon EOS R50 Camera", price: 59990, rating: 4.4, reviews: 734, image: "📷", category: "Electronics", prime: false },
  { id: 7, name: "Kindle Paperwhite", price: 13999, rating: 4.8, reviews: 9876, image: "📚", category: "Electronics", prime: true },
  { id: 8, name: "Adidas Running Jacket", price: 3999, rating: 4.1, reviews: 512, image: "🧥", category: "Fashion", prime: false },
];

const categories = ["All", "Electronics", "Fashion", "Kitchen"];

const styles = {
  // Layout
  app: { fontFamily: "'Segoe UI', Arial, sans-serif", minHeight: "100vh", backgroundColor: "#f3f3f3", color: "#0f1111" },
  
  // Navbar
  navbar: { backgroundColor: "#131921", color: "white", padding: "0", position: "sticky", top: 0, zIndex: 100 },
  navTop: { display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", flexWrap: "wrap" },
  logo: { color: "#ff9900", fontSize: "22px", fontWeight: "bold", letterSpacing: "-1px", cursor: "pointer", whiteSpace: "nowrap" },
  logoSub: { color: "white", fontSize: "22px", fontWeight: "bold" },
  searchBox: { flex: 1, display: "flex", minWidth: "200px", borderRadius: "4px", overflow: "hidden" },
  searchSelect: { backgroundColor: "#f3f3f3", border: "none", padding: "8px", cursor: "pointer", fontSize: "13px", color: "#555" },
  searchInput: { flex: 1, border: "none", padding: "8px 12px", fontSize: "14px", outline: "none" },
  searchBtn: { backgroundColor: "#ff9900", border: "none", padding: "0 16px", cursor: "pointer", fontSize: "18px" },
  navIcons: { display: "flex", gap: "16px", alignItems: "center" },
  navIcon: { color: "white", cursor: "pointer", fontSize: "13px", textAlign: "center", lineHeight: "1.3", padding: "4px 8px", borderRadius: "3px", border: "1px solid transparent", transition: "border 0.1s" },
  cartIcon: { color: "white", cursor: "pointer", fontSize: "13px", display: "flex", alignItems: "center", gap: "4px", padding: "4px 8px", borderRadius: "3px", border: "1px solid transparent" },
  badge: { backgroundColor: "#ff9900", color: "#131921", borderRadius: "50%", padding: "1px 6px", fontSize: "12px", fontWeight: "bold" },
  navBottom: { backgroundColor: "#232f3e", padding: "6px 16px", display: "flex", gap: "16px", overflowX: "auto" },
  navLink: { color: "white", fontSize: "13px", cursor: "pointer", whiteSpace: "nowrap", padding: "4px 8px", borderRadius: "3px", border: "1px solid transparent" },

  // Banner
  banner: { background: "linear-gradient(135deg, #232f3e 0%, #37475a 100%)", color: "white", padding: "32px 24px", textAlign: "center", margin: "0" },
  bannerTitle: { fontSize: "28px", fontWeight: "bold", marginBottom: "8px", color: "#ff9900" },
  bannerSub: { fontSize: "16px", color: "#ccc", marginBottom: "20px" },
  bannerBtn: { backgroundColor: "#ff9900", color: "#0f1111", border: "none", padding: "12px 28px", borderRadius: "4px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", transition: "background 0.2s" },

  // Main content
  main: { maxWidth: "1400px", margin: "0 auto", padding: "16px" },

  // Category filter
  filterBar: { display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap", alignItems: "center" },
  filterLabel: { fontSize: "14px", fontWeight: "bold", color: "#555" },
  filterBtn: { padding: "7px 18px", borderRadius: "20px", border: "1px solid #ccc", cursor: "pointer", fontSize: "14px", transition: "all 0.15s" },

  // Products
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" },
  card: { backgroundColor: "white", borderRadius: "8px", padding: "16px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)", transition: "box-shadow 0.2s, transform 0.15s", cursor: "pointer", position: "relative" },
  cardImg: { fontSize: "60px", textAlign: "center", marginBottom: "10px", lineHeight: 1 },
  primeBadge: { backgroundColor: "#00a8e1", color: "white", fontSize: "10px", fontWeight: "bold", padding: "2px 6px", borderRadius: "3px", display: "inline-block", marginBottom: "6px" },
  cardName: { fontSize: "14px", fontWeight: "500", marginBottom: "4px", lineHeight: "1.4", color: "#0f1111" },
  stars: { color: "#ff9900", fontSize: "13px" },
  reviewCount: { color: "#007185", fontSize: "12px", marginLeft: "4px" },
  price: { fontSize: "20px", fontWeight: "bold", color: "#0f1111", marginTop: "6px" },
  priceSymbol: { fontSize: "14px", verticalAlign: "super" },
  addBtn: { width: "100%", backgroundColor: "#ffd814", border: "none", padding: "8px", borderRadius: "20px", fontWeight: "bold", fontSize: "13px", cursor: "pointer", marginTop: "10px", transition: "background 0.15s" },
  wishlistBtn: { position: "absolute", top: "12px", right: "12px", backgroundColor: "transparent", border: "none", fontSize: "18px", cursor: "pointer" },

  // Cart Modal
  overlay: { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", justifyContent: "flex-end" },
  cartPanel: { backgroundColor: "white", width: "min(420px, 100vw)", height: "100vh", overflowY: "auto", padding: "24px", boxShadow: "-4px 0 16px rgba(0,0,0,0.2)" },
  cartHeader: { fontSize: "20px", fontWeight: "bold", marginBottom: "20px", paddingBottom: "12px", borderBottom: "1px solid #eee" },
  cartItem: { display: "flex", gap: "12px", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f0f0f0" },
  cartItemEmoji: { fontSize: "36px" },
  cartItemInfo: { flex: 1 },
  cartItemName: { fontSize: "13px", fontWeight: "500", marginBottom: "4px" },
  cartItemPrice: { color: "#b12704", fontWeight: "bold", fontSize: "14px" },
  qtyControls: { display: "flex", alignItems: "center", gap: "8px", marginTop: "6px" },
  qtyBtn: { width: "26px", height: "26px", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer", backgroundColor: "#f0f0f0", fontWeight: "bold", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center" },
  removeBtn: { color: "#c45500", fontSize: "12px", cursor: "pointer", background: "none", border: "none", textDecoration: "underline" },
  cartTotal: { fontSize: "18px", fontWeight: "bold", padding: "16px 0", borderTop: "2px solid #eee", marginTop: "8px" },
  checkoutBtn: { width: "100%", backgroundColor: "#ffd814", border: "none", padding: "12px", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", marginTop: "8px" },
  emptyCart: { textAlign: "center", padding: "40px 0", color: "#666" },
  closeBtn: { float: "right", background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#555" },

  // Toast
  toast: { position: "fixed", bottom: "24px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#23aa17", color: "white", padding: "12px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: "bold", zIndex: 300, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" },

  // Checkout done
  successBox: { textAlign: "center", padding: "32px" },
};

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={styles.stars}>
      {"★".repeat(full)}{half ? "½" : ""}{"☆".repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
}

export default function AmazonClone() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [toast, setToast] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [checkoutDone, setCheckoutDone] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  // 1. Add to Cart
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`✅ "${product.name}" added to cart!`);
  };

  // 2. Toggle Wishlist
  const toggleWishlist = (id) => {
    setWishlist(prev => {
      const isIn = prev.includes(id);
      showToast(isIn ? "💔 Removed from Wishlist" : "❤️ Added to Wishlist!");
      return isIn ? prev.filter(w => w !== id) : [...prev, id];
    });
  };

  // 3. Search
  const handleSearch = () => {
    setCategory("All");
    setSearch(searchInput.trim());
    showToast(searchInput.trim() ? `🔍 Showing results for "${searchInput.trim()}"` : "Showing all products");
  };

  // 4. Change Qty
  const changeQty = (id, delta) => {
    setCart(prev => prev
      .map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
      .filter(i => i.qty > 0)
    );
  };

  // 5. Checkout
  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutDone(true);
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const filtered = products.filter(p => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={styles.app}>
      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <div style={styles.navTop}>
          <div style={styles.logo} onClick={() => { setSearch(""); setSearchInput(""); setCategory("All"); }}>
            <span style={{ color: "white" }}>amazon</span><span style={{ color: "#ff9900" }}>.in</span>
          </div>

          {/* Search Bar */}
          <div style={styles.searchBox}>
            <select style={styles.searchSelect}>
              <option>All</option><option>Electronics</option><option>Fashion</option><option>Kitchen</option>
            </select>
            <input
              style={styles.searchInput}
              placeholder="Search Amazon.in"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
            />
            {/* BUTTON 1: Search */}
            <button style={styles.searchBtn} onClick={handleSearch} title="Search">🔍</button>
          </div>

          <div style={styles.navIcons}>
            <div style={styles.navIcon}>
              <div style={{ fontSize: "11px", color: "#ccc" }}>Hello, Sign in</div>
              <div style={{ fontWeight: "bold" }}>Account & Lists ▾</div>
            </div>
            <div style={styles.navIcon}>
              <div style={{ fontSize: "11px", color: "#ccc" }}>Returns</div>
              <div style={{ fontWeight: "bold" }}>& Orders</div>
            </div>
            {/* BUTTON 2: Open Cart */}
            <button
              style={{ ...styles.cartIcon, background: "none" }}
              onClick={() => { setCartOpen(true); setCheckoutDone(false); }}
            >
              <span style={{ fontSize: "28px" }}>🛒</span>
              <span style={styles.badge}>{cartCount}</span>
              <span style={{ fontWeight: "bold" }}>Cart</span>
            </button>
          </div>
        </div>

        <div style={styles.navBottom}>
          {["Today's Deals", "Customer Service", "Prime", "New Releases", "Gift Cards"].map(link => (
            <span key={link} style={styles.navLink} onClick={() => showToast(`📌 Navigating to ${link}...`)}>{link}</span>
          ))}
        </div>
      </nav>

      {/* BANNER */}
      <div style={styles.banner}>
        <div style={styles.bannerTitle}>Great Indian Festival Sale 🎉</div>
        <div style={styles.bannerSub}>Millions of products. Unbelievable prices. Fast delivery.</div>
        {/* BUTTON 3: Shop Now */}
        <button style={styles.bannerBtn} onClick={() => { document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }); showToast("🛍️ Let's shop!"); }}>
          Shop Now
        </button>
      </div>

      {/* MAIN */}
      <div style={styles.main} id="products">
        {/* CATEGORY FILTER */}
        <div style={styles.filterBar}>
          <span style={styles.filterLabel}>Department:</span>
          {categories.map(cat => (
            /* BUTTON 4: Category Filter */
            <button
              key={cat}
              style={{
                ...styles.filterBtn,
                backgroundColor: category === cat ? "#232f3e" : "white",
                color: category === cat ? "white" : "#0f1111",
                borderColor: category === cat ? "#232f3e" : "#ccc",
                fontWeight: category === cat ? "bold" : "normal",
              }}
              onClick={() => { setCategory(cat); setSearch(""); setSearchInput(""); }}
            >
              {cat}
            </button>
          ))}
          {(search || category !== "All") && (
            <button style={{ ...styles.filterBtn, color: "#c45500", borderColor: "#c45500" }} onClick={() => { setCategory("All"); setSearch(""); setSearchInput(""); }}>
              ✕ Clear Filters
            </button>
          )}
        </div>

        {/* Results count */}
        {search && <p style={{ color: "#555", marginBottom: "12px", fontSize: "14px" }}>Showing {filtered.length} results for "<strong>{search}</strong>"</p>}

        {/* PRODUCT GRID */}
        <div style={styles.grid}>
          {filtered.length === 0 ? (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px", color: "#666" }}>
              <div style={{ fontSize: "48px" }}>🔍</div>
              <div style={{ fontSize: "18px", marginTop: "12px" }}>No results found for "{search}"</div>
            </div>
          ) : filtered.map(product => (
            <div key={product.id} style={styles.card}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "none"; }}
            >
              {/* BUTTON 5: Wishlist */}
              <button style={styles.wishlistBtn} onClick={() => toggleWishlist(product.id)} title="Add to Wishlist">
                {wishlist.includes(product.id) ? "❤️" : "🤍"}
              </button>

              <div style={styles.cardImg}>{product.image}</div>
              {product.prime && <div style={styles.primeBadge}>prime</div>}
              <div style={styles.cardName}>{product.name}</div>
              <div>
                <StarRating rating={product.rating} />
                <span style={styles.reviewCount}>({product.reviews.toLocaleString()})</span>
              </div>
              <div style={styles.price}>
                <span style={styles.priceSymbol}>₹</span>
                {product.price.toLocaleString("en-IN")}
              </div>
              <button
                style={styles.addBtn}
                onClick={() => addToCart(product)}
                onMouseEnter={e => e.target.style.backgroundColor = "#f0c14b"}
                onMouseLeave={e => e.target.style.backgroundColor = "#ffd814"}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CART PANEL */}
      {cartOpen && (
        <div style={styles.overlay} onClick={e => e.target === e.currentTarget && setCartOpen(false)}>
          <div style={styles.cartPanel}>
            <button style={styles.closeBtn} onClick={() => setCartOpen(false)}>✕</button>
            <div style={styles.cartHeader}>🛒 Your Cart ({cartCount} items)</div>

            {checkoutDone ? (
              <div style={styles.successBox}>
                <div style={{ fontSize: "60px" }}>✅</div>
                <h2 style={{ color: "#23aa17", marginTop: "12px" }}>Order Placed!</h2>
                <p style={{ color: "#555", marginTop: "8px" }}>Thank you for shopping. Your order will be delivered soon.</p>
                <button style={{ ...styles.checkoutBtn, marginTop: "20px" }} onClick={() => { setCheckoutDone(false); setCartOpen(false); }}>Continue Shopping</button>
              </div>
            ) : cart.length === 0 ? (
              <div style={styles.emptyCart}>
                <div style={{ fontSize: "60px" }}>🛒</div>
                <p style={{ marginTop: "12px", fontSize: "16px" }}>Your cart is empty.</p>
                <p style={{ fontSize: "13px", color: "#999" }}>Add items to get started!</p>
              </div>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} style={styles.cartItem}>
                    <div style={styles.cartItemEmoji}>{item.image}</div>
                    <div style={styles.cartItemInfo}>
                      <div style={styles.cartItemName}>{item.name}</div>
                      <div style={styles.cartItemPrice}>₹{(item.price * item.qty).toLocaleString("en-IN")}</div>
                      <div style={styles.qtyControls}>
                        <button style={styles.qtyBtn} onClick={() => changeQty(item.id, -1)}>−</button>
                        <span style={{ fontWeight: "bold", minWidth: "20px", textAlign: "center" }}>{item.qty}</span>
                        <button style={styles.qtyBtn} onClick={() => changeQty(item.id, 1)}>+</button>
                        <button style={styles.removeBtn} onClick={() => changeQty(item.id, -item.qty)}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))}

                <div style={styles.cartTotal}>
                  Subtotal ({cartCount} items): <span style={{ color: "#b12704" }}>₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>

                {/* BUTTON 6: Checkout */}
                <button
                  style={styles.checkoutBtn}
                  onClick={handleCheckout}
                  onMouseEnter={e => e.target.style.backgroundColor = "#f0c14b"}
                  onMouseLeave={e => e.target.style.backgroundColor = "#ffd814"}
                >
                  Proceed to Checkout
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && <div style={styles.toast}>{toast}</div>}
    </div>
  );
}
