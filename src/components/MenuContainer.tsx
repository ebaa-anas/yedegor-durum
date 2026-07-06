import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { ShoppingCart, Plus, Minus, Trash2, Flame, MapPin, Store, UtensilsCrossed, X, Banknote, CreditCard } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  weight?: string;
  isAvailable: boolean;
  image?: string;
}

interface MenuProps {
  lang: string;
}

export default function MenuContainer({ lang }: MenuProps) {
  // Always query Firebase with TR categories to keep database logic intact
  const [activeCategoryTR, setActiveCategoryTR] = useState("Dürümler");
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [cart, setCart] = useState<{name: string, price: number, quantity: number}[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderType, setOrderType] = useState("delivery");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const categoriesTR = ["Dürümler", "Porsiyonlar", "İçecekler"];
  
  // Translation Dictionary for the UI
  const t = {
    Dürümler: lang === "TR" ? "Dürümler" : "Wraps",
    Porsiyonlar: lang === "TR" ? "Porsiyonlar" : "Portions",
    İçecekler: lang === "TR" ? "İçecekler" : "Drinks",
    loading: lang === "TR" ? "Menü yükleniyor..." : "Loading menu...",
    popular: lang === "TR" ? "Popüler" : "Popular",
    noImage: lang === "TR" ? "Fotoğraf Ekleniyor" : "Adding Photo",
    items: lang === "TR" ? "Ürün" : "Item(s)",
    confirmCart: lang === "TR" ? "Sepeti Onayla" : "Confirm Cart",
    myOrder: lang === "TR" ? "Siparişim" : "My Order",
    orderNote: lang === "TR" ? "Sipariş Notu (Örn: Ekstra soğanlı olsun...)" : "Order Note (e.g., Extra onion...)",
    delivery: lang === "TR" ? "Eve Teslim" : "Delivery",
    pickup: lang === "TR" ? "Gel-Al" : "Pickup",
    dineIn: lang === "TR" ? "Masadayım" : "Dine-in",
    tableNum: lang === "TR" ? "Masa Numarası (Örn: Masa 4)" : "Table Number (e.g., Table 4)",
    fullName: lang === "TR" ? "Adınız Soyadınız" : "Full Name",
    phone: lang === "TR" ? "Telefon (Örn: 0555...)" : "Phone (e.g., 0555...)",
    address: lang === "TR" ? "Açık Adresiniz veya Google Haritalar Linki..." : "Full Address or Google Maps Link...",
    payMethod: lang === "TR" ? "Ödeme Yöntemi" : "Payment Method",
    cash: lang === "TR" ? "Nakit" : "Cash",
    card: lang === "TR" ? "Kredi Kartı" : "Credit Card",
    total: lang === "TR" ? "Genel Toplam" : "Total",
    submit: lang === "TR" ? "Siparişi Gönder" : "Submit Order",
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "menu"));
        const items: MenuItem[] = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as MenuItem);
        });
        items.sort((a, b) => a.name.localeCompare(b.name));
        setMenuItems(items);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredMenu = menuItems.filter((item) => item.category === activeCategoryTR && item.isAvailable);

  const handleAddToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
      setCart(cart.map(cartItem => cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem));
    } else {
      setCart([...cart, { name: item.name, price: item.price, quantity: 1 }]);
    }
  };

  const handleDecreaseQuantity = (itemName: string) => {
    const existingItem = cart.find(cartItem => cartItem.name === itemName);
    if (existingItem?.quantity === 1) {
      setCart(cart.filter(cartItem => cartItem.name !== itemName));
    } else {
      setCart(cart.map(cartItem => cartItem.name === itemName ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem));
    }
  };

  const handleRemoveItem = (itemName: string) => setCart(cart.filter(cartItem => cartItem.name !== itemName));

  const orderTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const orderCount = cart.reduce((count, item) => count + item.quantity, 0);

  useEffect(() => { if (orderCount === 0) setIsCheckoutOpen(false); }, [orderCount]);

  const submitOrderToWhatsApp = () => {
    const restaurantPhone = "905306154677"; 
    
    let message = `*YENİ SİPARİŞ / NEW ORDER - YEDEGÖR DÜRÜM* 🌯\n\n`;
    message += `*Tip/Type:* ${orderType === 'delivery' ? 'Eve Teslim 🛵' : orderType === 'pickup' ? 'Gel-Al 🛍️' : 'Masaya Sipariş 🍽️'}\n`;
    
    if (orderType !== 'dine-in') {
      message += `*İsim/Name:* ${customerName}\n`;
      message += `*Tel/Phone:* ${customerPhone}\n`;
      if (orderType === 'delivery') message += `*Adres/Address:* ${address}\n`;
      message += `*Ödeme/Payment:* ${paymentMethod === 'cash' ? 'Nakit 💵' : 'Kredi Kartı 💳'}\n`;
    } else {
      message += `*Masa/Table:* ${tableNumber}\n`;
    }
    
    message += `\n*-- Sipariş Detayı / Order Details --*\n`;
    cart.forEach(item => { message += `${item.quantity}x ${item.name} - ${item.price * item.quantity} ₺\n`; });
    if (orderNote.trim() !== "") message += `\n*📝 Not/Note:* ${orderNote}\n`;
    message += `\n*Toplam / Total:* ${orderTotal} ₺\n`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${restaurantPhone}?text=${encodedMessage}`, '_blank');
    setIsCheckoutOpen(false);
    setCart([]);
  };

  const isFormValid = () => {
    if (orderType === 'dine-in') return tableNumber.trim() !== "";
    if (orderType === 'pickup') return customerName.trim() !== "" && customerPhone.trim() !== "";
    if (orderType === 'delivery') return customerName.trim() !== "" && customerPhone.trim() !== "" && address.trim() !== "";
    return false;
  };

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-stone-500">
        <div className="w-12 h-12 border-4 border-stone-200 border-t-orange-500 rounded-full animate-spin mb-4"></div>
        <p className="font-bold animate-pulse">{t.loading}</p>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen pb-32 font-sans text-stone-900 relative">
      
      {/* Category Navbar */}
      <div className="sticky top-0 z-10 bg-stone-50/90 backdrop-blur-md border-b border-stone-200 py-4 px-4 shadow-sm">
        <div className="flex justify-center space-x-3 overflow-x-auto hide-scrollbar max-w-6xl mx-auto">
          {categoriesTR.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategoryTR(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategoryTR === cat ? "bg-orange-500 text-white shadow-md" : "bg-white text-stone-500 border border-stone-200 hover:bg-stone-100"
              }`}
            >
              {t[cat as keyof typeof t]}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
              <div>
                {item.image ? (
                  <div className="relative h-48 w-full mb-4">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover rounded-xl shadow-sm border border-stone-100" />
                    {item.category !== "İçecekler" && (
                      <div className="absolute top-3 left-3 bg-red-50/90 text-red-600 px-2.5 py-1 rounded-md text-xs font-bold flex items-center shadow-sm backdrop-blur-sm">
                        <Flame size={14} className="mr-1" /> {t.popular}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-48 bg-stone-100 rounded-xl mb-4 w-full flex items-center justify-center relative border-2 border-dashed border-stone-200 overflow-hidden">
                    <span className="text-stone-400 text-sm font-medium">{t.noImage}</span>
                    {item.category !== "İçecekler" && (
                      <div className="absolute top-3 left-3 bg-red-50 text-red-600 px-2.5 py-1 rounded-md text-xs font-bold flex items-center">
                        <Flame size={14} className="mr-1" /> {t.popular}
                      </div>
                    )}
                  </div>
                )}
                <h3 className="text-xl font-bold text-stone-800">{item.name}</h3>
                {item.weight && <p className="text-sm text-stone-500 font-medium mt-1">{item.weight}</p>}
              </div>
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-stone-100">
                <span className="text-orange-600 font-extrabold text-2xl">{item.price} ₺</span>
                <button onClick={() => handleAddToCart(item)} className="bg-stone-100 hover:bg-orange-500 hover:text-white text-stone-600 p-2.5 rounded-xl transition-all group-hover:scale-105">
                  <Plus size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      {orderCount > 0 && (
        <div className="fixed bottom-6 left-0 right-0 px-4 z-40 flex justify-center animate-bounce-short">
          <button onClick={() => setIsCheckoutOpen(true)} className="bg-stone-900 text-white px-6 py-4 rounded-full shadow-2xl flex items-center justify-between w-full max-w-sm hover:scale-105 transition-transform">
            <div className="flex items-center space-x-3">
              <div className="bg-stone-800 p-2 rounded-full text-orange-400"><ShoppingCart size={20} /></div>
              <span className="font-bold text-lg">{orderCount} {t.items}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-extrabold text-xl text-orange-400">{orderTotal} ₺</span>
              <span className="bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full">{t.confirmCart}</span>
            </div>
          </button>
        </div>
      )}

      {/* --- ADVANCED CHECKOUT MODAL --- */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-stone-900/70 backdrop-blur-sm z-50 flex justify-center items-end sm:items-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg sm:rounded-3xl rounded-t-3xl p-6 shadow-2xl max-h-[95vh] overflow-y-auto flex flex-col">
            
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-stone-100">
              <h2 className="text-2xl font-bold text-stone-800">{t.myOrder}</h2>
              <button onClick={() => setIsCheckoutOpen(false)} className="text-stone-400 hover:text-stone-600 bg-stone-100 p-2 rounded-full"><X size={20} /></button>
            </div>

            <div className="mb-6 space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-stone-50 p-3 rounded-xl border border-stone-100">
                  <div className="flex-1">
                    <h4 className="font-bold text-stone-800">{item.name}</h4>
                    <span className="text-orange-500 font-bold">{item.price * item.quantity} ₺</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white border border-stone-200 rounded-lg p-1">
                    <button onClick={() => handleDecreaseQuantity(item.name)} className="p-1 text-stone-500 hover:text-orange-500"><Minus size={16} /></button>
                    <span className="font-bold w-4 text-center">{item.quantity}</span>
                    <button onClick={() => handleAddToCart({name: item.name, price: item.price} as MenuItem)} className="p-1 text-stone-500 hover:text-orange-500"><Plus size={16} /></button>
                  </div>
                  <button onClick={() => handleRemoveItem(item.name)} className="ml-3 p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <textarea placeholder={t.orderNote} value={orderNote} onChange={(e) => setOrderNote(e.target.value)} rows={2} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 transition-colors resize-none"></textarea>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-6">
              <button onClick={() => setOrderType("delivery")} className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${orderType === "delivery" ? "border-orange-500 bg-orange-50 text-orange-600" : "border-stone-100 text-stone-500"}`}>
                <MapPin size={24} className="mb-1" />
                <span className="text-xs font-bold text-center">{t.delivery}</span>
              </button>
              <button onClick={() => setOrderType("pickup")} className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${orderType === "pickup" ? "border-orange-500 bg-orange-50 text-orange-600" : "border-stone-100 text-stone-500"}`}>
                <Store size={24} className="mb-1" />
                <span className="text-xs font-bold text-center">{t.pickup}</span>
              </button>
              <button onClick={() => setOrderType("dine-in")} className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${orderType === "dine-in" ? "border-orange-500 bg-orange-50 text-orange-600" : "border-stone-100 text-stone-500"}`}>
                <UtensilsCrossed size={24} className="mb-1" />
                <span className="text-xs font-bold text-center">{t.dineIn}</span>
              </button>
            </div>

            <div className="space-y-4 mb-6 flex-grow">
              {orderType === "dine-in" ? (
                <input type="text" placeholder={t.tableNum} value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition-colors font-bold text-lg text-center" />
              ) : (
                <>
                  <input type="text" placeholder={t.fullName} value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition-colors" />
                  <input type="tel" placeholder={t.phone} value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition-colors" />
                  
                  {orderType === "delivery" && (
                    <textarea placeholder={t.address} value={address} onChange={(e) => setAddress(e.target.value)} rows={2} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition-colors resize-none"></textarea>
                  )}

                  <div className="pt-2">
                    <p className="text-sm font-bold text-stone-500 mb-2">{t.payMethod}</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => setPaymentMethod("cash")} className={`flex items-center justify-center space-x-2 p-3 rounded-xl border-2 transition-all ${paymentMethod === "cash" ? "border-green-500 bg-green-50 text-green-700" : "border-stone-100 text-stone-500 hover:bg-stone-50"}`}>
                        <Banknote size={18} />
                        <span className="font-bold text-sm">{t.cash}</span>
                      </button>
                      <button onClick={() => setPaymentMethod("card")} className={`flex items-center justify-center space-x-2 p-3 rounded-xl border-2 transition-all ${paymentMethod === "card" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-stone-100 text-stone-500 hover:bg-stone-50"}`}>
                        <CreditCard size={18} />
                        <span className="font-bold text-sm">{t.card}</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-stone-100 mt-auto">
              <div className="flex justify-between items-center mb-4">
                <span className="text-stone-500 font-medium">{t.total}</span>
                <span className="text-2xl font-black text-orange-600">{orderTotal} ₺</span>
              </div>
              <button onClick={submitOrderToWhatsApp} disabled={!isFormValid()} className="w-full bg-stone-900 hover:bg-orange-500 disabled:bg-stone-300 disabled:text-stone-500 text-white font-bold text-lg py-4 rounded-xl transition-colors shadow-lg flex justify-center items-center">
                {t.submit}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}