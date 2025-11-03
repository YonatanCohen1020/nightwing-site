import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Trash2, Edit2, Minus, Plus } from 'lucide-react';
import { useCartStore, CartItem } from '../../stores/useCartStore';
import { ItemSelectionPanel } from '../menu/ItemSelectionPanel';
import { menuItems } from '../../types/menu';

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartPanel = ({ isOpen, onClose }: CartPanelProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'he';
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotal = useCartStore((state) => state.getTotal);

  const [editingItem, setEditingItem] = useState<CartItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
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
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed top-0 bottom-0 ${isRTL ? 'left-0' : 'right-0'} md:w-[400px] w-full bg-bg-dark border-2 border-accent-pink ${isRTL ? 'border-r-2' : 'border-l-2'} z-[9999] overflow-y-auto overscroll-contain`}
            dir={isRTL ? 'rtl' : 'ltr'}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-accent-pink/20 sticky top-0 bg-bg-dark z-10">
                <h2 className="text-2xl md:text-3xl font-body font-bold text-text-primary">
                  {t('cart.title')}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-bg-light rounded-lg transition-colors flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close"
                >
                  <X className="w-6 h-6 text-text-primary" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <p className="text-xl md:text-2xl font-body font-bold text-text-primary/60">
                      {t('cart.empty')}
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
                          <div className="w-full h-32 mb-3 bg-bg-dark rounded-lg overflow-hidden">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
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
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 rounded-lg bg-bg-dark hover:bg-accent-pink/20 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                            >
                              <Minus className="w-4 h-4 text-text-primary" />
                            </button>
                            <span className="text-lg font-body font-bold text-text-primary min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
                                {t('cart.edit')}
                              </button>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors font-body font-bold text-sm md:text-base"
                              >
                                <Trash2 className="w-4 h-4" />
                                {t('cart.remove')}
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => removeItem(item.id)}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors font-body font-bold text-sm md:text-base"
                            >
                              <Trash2 className="w-4 h-4" />
                              {t('cart.remove')}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-accent-pink/20 p-4 md:p-6 bg-bg-dark sticky bottom-0">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl md:text-2xl font-body font-bold text-text-primary">
                      {t('cart.total')}:
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
                      {t('cart.clear')}
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 px-4 py-3 rounded-lg bg-accent-pink text-white hover:bg-accent-pink/90 transition-colors font-body font-bold text-lg md:text-lg"
                    >
                      {t('cart.keepOrdering')}
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

const ComboEditPanel = ({ cartItem, onClose, onUpdate }: ComboEditPanelProps) => {
  // Find the base item - could be combo, wings, or tenders
  if (!cartItem.comboConfig) return null;

  let baseItem = menuItems.find((i) => i.category === 'combo');
  
  if (cartItem.isCombo) {
    baseItem = menuItems.find((i) => i.category === 'combo');
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

