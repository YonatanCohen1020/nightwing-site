import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { X, Trash2, Edit2, Minus, Plus, Navigation } from "lucide-react";
import { useCartStore, CartItem } from "../../stores/useCartStore";
import { ItemSelectionPanel } from "../menu/ItemSelectionPanel";
import { menuItems } from "../../types/menu";

// Dev mode switch: set to true to use test webhook
const USE_TEST_WEBHOOK = false;
const WEBHOOK_URL = USE_TEST_WEBHOOK
  ? "https://n8n.yarden-zamir.com/webhook-test/order"
  : "https://n8n.yarden-zamir.com/webhook/order";

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartPanel = ({ isOpen, onClose }: CartPanelProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "he";
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotal = useCartStore((state) => state.getTotal);

  const [editingItem, setEditingItem] = useState<CartItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Checkout form state
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("pickup");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "paybox">("cash");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleEditCombo = (item: CartItem) => {
    if (item.comboConfig) {
      setEditingItem(item);
    }
  };

  const handleUpdateCombo = () => {
    // The ItemSelectionPanel will handle updating via cart store
    setEditingItem(null);
  };

  const handleUseCurrentLocation = () => {
    setUseCurrentLocation(true);
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setUseCurrentLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        // Use Google Maps to reverse geocode the location
        setDeliveryAddress(`${lat}, ${lng}`);
        setUseCurrentLocation(false);
      },
      (_error) => {
        setLocationError("Unable to retrieve your location");
        setUseCurrentLocation(false);
      }
    );
  };

  const handleSubmitOrder = async () => {
    // Validation
    if (!customerName.trim()) {
      alert(t("cart.requiredField") + ": " + t("cart.customerName"));
      return;
    }
    if (!phoneNumber.trim()) {
      alert(t("cart.requiredField") + ": " + t("cart.phoneNumber"));
      return;
    }
    if (orderType === "delivery" && !deliveryAddress.trim()) {
      alert(t("cart.requiredField") + ": " + t("cart.deliveryAddress"));
      return;
    }

    setProcessing(true);

    try {
      const orderData = {
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          comboConfig: item.comboConfig,
        })),
        orderTime: new Date().toISOString(),
        paymentMethod: paymentMethod,
        customerName: customerName.trim(),
        phoneNumber: phoneNumber.trim(),
        orderType: orderType,
        deliveryAddress:
          orderType === "delivery" ? deliveryAddress.trim() : null,
        total: getTotal(),
      };

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setOrderSuccess(true);
        clearCart();
        // Reset form
        setCustomerName("");
        setPhoneNumber("");
        setDeliveryAddress("");
        setOrderType("pickup");
        setPaymentMethod("cash");

        // Close after 3 seconds
        setTimeout(() => {
          setOrderSuccess(false);
          setShowCheckout(false);
          onClose();
        }, 3000);
      } else {
        throw new Error("Failed to submit order");
      }
    } catch (error) {
      alert(t("cart.orderError"));
    } finally {
      setProcessing(false);
    }
  };

  if (!mounted || !isOpen) return null;

  const panelContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -400 : 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? -400 : 400 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed top-0 bottom-0 ${
              isRTL ? "left-0" : "right-0"
            } md:w-[400px] w-full bg-bg-dark border-2 border-accent-pink ${
              isRTL ? "border-r-2" : "border-l-2"
            } z-[9999] overflow-y-auto overscroll-contain`}
            dir={isRTL ? "rtl" : "ltr"}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-accent-pink/20 sticky top-0 bg-bg-dark z-10">
                <h2 className="text-2xl md:text-3xl font-body font-bold text-text-primary">
                  {showCheckout ? t("cart.checkout") : t("cart.title")}
                </h2>
                <button
                  onClick={() =>
                    showCheckout ? setShowCheckout(false) : onClose()
                  }
                  className="p-2 hover:bg-bg-light rounded-lg transition-colors flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close"
                >
                  <X className="w-6 h-6 text-text-primary" />
                </button>
              </div>

              {/* Checkout Form */}
              {showCheckout && !orderSuccess && (
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                  {/* Order Items Summary */}
                  <div className="bg-bg-light rounded-xl p-4 border border-accent-pink/20">
                    <h3 className="text-lg font-body font-bold text-text-primary mb-3">
                      {t("cart.total")}: ₪{getTotal()}
                    </h3>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-text-primary/80">
                            {item.name} x{item.quantity}
                          </span>
                          <span className="text-accent-pink">
                            ₪{item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Type */}
                  <div className="bg-bg-light rounded-xl p-4 border border-accent-pink/20">
                    <label className="block text-sm font-body font-bold text-text-primary mb-3">
                      {t("cart.orderType")}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setOrderType("pickup")}
                        className={`px-4 py-3 rounded-lg font-body font-bold transition-colors ${
                          orderType === "pickup"
                            ? "bg-accent-pink text-white"
                            : "bg-bg-dark text-text-primary hover:bg-bg-light"
                        }`}
                      >
                        {t("cart.pickupOption")}
                      </button>
                      <button
                        onClick={() => setOrderType("delivery")}
                        className={`px-4 py-3 rounded-lg font-body font-bold transition-colors ${
                          orderType === "delivery"
                            ? "bg-accent-pink text-white"
                            : "bg-bg-dark text-text-primary hover:bg-bg-light"
                        }`}
                      >
                        {t("cart.deliveryOption")}
                      </button>
                    </div>
                  </div>

                  {/* Customer Name */}
                  <div className="bg-bg-light rounded-xl p-4 border border-accent-pink/20">
                    <label className="block text-sm font-body font-bold text-text-primary mb-2">
                      {t("cart.customerName")} *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-bg-dark text-text-primary font-body placeholder-text-primary/50 border border-accent-pink/20 focus:border-accent-pink focus:outline-none"
                      placeholder={t("cart.customerName")}
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="bg-bg-light rounded-xl p-4 border border-accent-pink/20">
                    <label className="block text-sm font-body font-bold text-text-primary mb-2">
                      {t("cart.phoneNumber")} *
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-bg-dark text-text-primary font-body placeholder-text-primary/50 border border-accent-pink/20 focus:border-accent-pink focus:outline-none"
                      placeholder={t("cart.phoneNumber")}
                    />
                  </div>

                  {/* Delivery Address */}
                  {orderType === "delivery" && (
                    <div className="bg-bg-light rounded-xl p-4 border border-accent-pink/20 space-y-3">
                      <label className="block text-sm font-body font-bold text-text-primary mb-2">
                        {t("cart.deliveryAddress")} *
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-bg-dark text-text-primary font-body placeholder-text-primary/50 border border-accent-pink/20 focus:border-accent-pink focus:outline-none"
                        placeholder={t("cart.manualAddress")}
                      />
                    </div>
                  )}

                  {/* Payment Method */}
                  <div className="bg-bg-light rounded-xl p-4 border border-accent-pink/20">
                    <label className="block text-sm font-body font-bold text-text-primary mb-3">
                      {t("cart.paymentMethod")}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setPaymentMethod("cash")}
                        className={`px-4 py-3 rounded-lg font-body font-bold transition-colors ${
                          paymentMethod === "cash"
                            ? "bg-accent-pink text-white"
                            : "bg-bg-dark text-text-primary hover:bg-bg-light"
                        }`}
                      >
                        {t("cart.cash")}
                      </button>
                      <button
                        onClick={() => setPaymentMethod("paybox")}
                        className={`px-4 py-3 rounded-lg font-body font-bold transition-colors ${
                          paymentMethod === "paybox"
                            ? "bg-accent-pink text-white"
                            : "bg-bg-dark text-text-primary hover:bg-bg-light"
                        }`}
                      >
                        {t("cart.paybox")}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmitOrder}
                    disabled={processing}
                    className="w-full px-6 py-4 rounded-lg bg-accent-pink text-white font-body font-bold text-lg hover:bg-accent-pink/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processing ? t("cart.processing") : t("cart.submitOrder")}
                  </button>
                </div>
              )}

              {/* Success Message */}
              {orderSuccess && (
                <div className="flex-1 flex items-center justify-center p-4">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-2xl font-body font-bold text-accent-pink mb-2">
                      {t("cart.orderSuccess")}
                    </h3>
                  </div>
                </div>
              )}

              {/* Cart Items */}
              {!showCheckout && !orderSuccess && (
                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <p className="text-xl md:text-2xl font-body font-bold text-text-primary/60">
                        {t("cart.empty")}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="bg-bg-light rounded-xl p-4 border border-accent-pink/20 text-center"
                        >
                          {/* Item Image */}
                          {item.imageUrl && (
                            <div className="w-full h-32 mb-3 bg-bg-dark rounded-lg overflow-hidden flex items-center justify-center p-2">
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                          )}

                          {/* Item Info */}
                          <div className="mb-3">
                            <h3 className="text-lg md:text-lg font-body font-bold text-text-primary mb-1">
                              {item.name}
                            </h3>
                          </div>

                          {/* Quantity Control */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="p-2 rounded-lg bg-bg-dark hover:bg-accent-pink/20 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                              >
                                <Minus className="w-4 h-4 text-text-primary" />
                              </button>
                              <span className="text-lg font-body font-bold text-text-primary min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="p-2 rounded-lg bg-bg-dark hover:bg-accent-pink/20 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                              >
                                <Plus className="w-4 h-4 text-text-primary" />
                              </button>
                            </div>
                            <span className="text-xl md:text-2xl font-body font-bold text-accent-pink">
                              ₪{item.price * item.quantity}
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            {item.comboConfig ? (
                              <>
                                <button
                                  onClick={() => handleEditCombo(item)}
                                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-accent-pink/20 text-accent-pink hover:bg-accent-pink/30 transition-colors font-body font-bold text-sm md:text-base"
                                >
                                  <Edit2 className="w-4 h-4" />
                                  {t("cart.edit")}
                                </button>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors font-body font-bold text-sm md:text-base"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  {t("cart.remove")}
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => removeItem(item.id)}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors font-body font-bold text-sm md:text-base"
                              >
                                <Trash2 className="w-4 h-4" />
                                {t("cart.remove")}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Footer */}
              {items.length > 0 && !showCheckout && (
                <div className="border-t border-accent-pink/20 p-4 md:p-6 bg-bg-dark sticky bottom-0">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl md:text-2xl font-body font-bold text-text-primary">
                      {t("cart.total")}:
                    </span>
                    <span className="text-2xl md:text-3xl font-body font-bold text-accent-pink">
                      ₪{getTotal()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={clearCart}
                      className="flex-1 px-4 py-3 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors font-body font-bold text-lg md:text-lg"
                    >
                      {t("cart.clear")}
                    </button>
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="flex-1 px-4 py-3 rounded-lg bg-accent-pink text-white hover:bg-accent-pink/90 transition-colors font-body font-bold text-lg md:text-lg"
                    >
                      {t("cart.checkout")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {createPortal(panelContent, document.body)}
      {/* Edit Panel for Combo/Wings/Tenders */}
      {editingItem && editingItem.comboConfig && (
        <ComboEditPanel
          cartItem={editingItem}
          onClose={() => {
            handleUpdateCombo();
            setEditingItem(null);
          }}
          onUpdate={handleUpdateCombo}
        />
      )}
    </>
  );
};

// Helper component for editing combo
interface ComboEditPanelProps {
  cartItem: CartItem;
  onClose: () => void;
  onUpdate: () => void;
}

const ComboEditPanel = ({
  cartItem,
  onClose,
  onUpdate,
}: ComboEditPanelProps) => {
  // Find the base item - could be combo, wings, or tenders
  if (!cartItem.comboConfig) return null;

  let baseItem = menuItems.find((i) => i.category === "combo");

  if (cartItem.isCombo) {
    baseItem = menuItems.find((i) => i.category === "combo");
  } else {
    // For wings/tenders, find the base item
    // We know comboConfig is not null here due to the check above
    baseItem = menuItems.find((i) => i.id === cartItem.comboConfig!.baseItemId);
  }

  if (!baseItem) return null;

  return (
    <ItemSelectionPanel
      item={baseItem}
      isOpen={true}
      onClose={() => {
        onUpdate();
        onClose();
      }}
      editingCartItemId={cartItem.id}
      initialConfig={cartItem.comboConfig}
    />
  );
};
