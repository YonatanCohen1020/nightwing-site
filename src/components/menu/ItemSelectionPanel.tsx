import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { X, Check } from "lucide-react";
import { MenuItem } from "../../types/menu";
import { menuItems } from "../../types/menu";
import { useCartStore } from "../../stores/useCartStore";

interface ItemSelectionPanelProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
}

export const ItemSelectionPanel = ({ item, isOpen, onClose }: ItemSelectionPanelProps) => {
  const { t, i18n } = useTranslation();
  const addItem = useCartStore((state) => state.addItem);
  const isRTL = i18n.language === "he";
  const [mounted, setMounted] = useState(false);
  
  const sauces = menuItems.filter((i) => i.category === "sauces");
  const wingsItem = menuItems.find((i) => i.category === "wings");
  const tendersItem = menuItems.find((i) => i.category === "tenders");

  // State for combo: wings or tenders selection
  const [comboType, setComboType] = useState<"wings" | "tenders">("wings");
  
  // State for sauce selection (max 2)
  const [selectedSauces, setSelectedSauces] = useState<string[]>([]);

  // Ensure component is mounted before using portal
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

  const toggleSauce = (sauceId: string) => {
    setSelectedSauces((prev) => {
      if (prev.includes(sauceId)) {
        return prev.filter((id) => id !== sauceId);
      } else if (prev.length < 2) {
        return [...prev, sauceId];
      }
      return prev;
    });
  };

  const handleAddToCart = () => {
    if (item.category === "combo") {
      // Combo needs: wings/tenders choice + 2 sauces
      if (selectedSauces.length !== 2) return;
      
      const baseItem = comboType === "wings" ? wingsItem! : tendersItem!;
      const selectedSauceItems = selectedSauces.map((id) =>
        sauces.find((s) => s.id === id)
      );

      // Create a unique ID for this combo configuration
      const comboId = `combo-${comboType}-${selectedSauces.sort().join("-")}`;
      const comboName = isRTL
        ? `${item.nameHe} - ${baseItem.nameHe}`
        : `${item.nameEn} - ${baseItem.nameEn}`;
      const comboDescription = isRTL
        ? `${baseItem.descriptionHe}, ${selectedSauceItems.map((s) => s?.nameHe).join(", ")}`
        : `${baseItem.descriptionEn}, ${selectedSauceItems.map((s) => s?.nameEn).join(", ")}`;

      addItem({
        id: comboId,
        name: comboName,
        price: item.price,
        imageUrl: baseItem.imageUrl,
      });
    } else {
      // Wings or Tenders needs: 2 sauces
      if (selectedSauces.length !== 2) return;

      const selectedSauceItems = selectedSauces.map((id) =>
        sauces.find((s) => s.id === id)
      );

      const customizedId = `${item.id}-${selectedSauces.sort().join("-")}`;
      const customizedName = isRTL
        ? `${item.nameHe} - ${selectedSauceItems.map((s) => s?.nameHe).join(", ")}`
        : `${item.nameEn} - ${selectedSauceItems.map((s) => s?.nameEn).join(", ")}`;

      addItem({
        id: customizedId,
        name: customizedName,
        price: item.price,
        imageUrl: item.imageUrl,
      });
    }

    // Reset and close
    setSelectedSauces([]);
    setComboType("wings");
    onClose();
  };

  const canAddToCart =
    item.category === "combo"
      ? selectedSauces.length === 2
      : selectedSauces.length === 2;

  if (!mounted) return null;

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
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-bg-dark border-t-2 border-accent-pink rounded-t-3xl z-[9999] max-h-[85vh] md:max-h-[80vh] overflow-y-auto overscroll-contain"
            dir={isRTL ? "rtl" : "ltr"}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container mx-auto px-4 md:px-6 py-4 md:py-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 md:mb-6 sticky top-0 bg-bg-dark pb-2 pt-2 z-10">
                <h3 className="text-xl md:text-3xl font-body font-bold text-text-primary flex-1 pr-2">
                  {isRTL ? item.nameHe : item.nameEn}
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-bg-light rounded-lg transition-colors flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close"
                >
                  <X className="w-6 h-6 text-text-primary" />
                </button>
              </div>

              {/* Combo Type Selection */}
              {item.category === "combo" && (
                <div className="mb-4 md:mb-6">
                  <p className="text-base md:text-xl font-body font-bold text-text-primary mb-3 md:mb-4">
                    {t("selection.chooseType")}
                  </p>
                  <div className="flex gap-3 md:gap-4">
                    {wingsItem && (
                      <button
                        onClick={() => setComboType("wings")}
                        className={`flex-1 p-3 md:p-4 rounded-xl border-2 transition-all font-body font-bold text-lg md:text-xl min-h-[48px] ${
                          comboType === "wings"
                            ? "border-accent-pink bg-accent-pink/20 text-accent-pink"
                            : "border-accent-pink/30 bg-bg-light text-text-primary"
                        }`}
                      >
                        {isRTL ? wingsItem.nameHe : wingsItem.nameEn}
                      </button>
                    )}
                    {tendersItem && (
                      <button
                        onClick={() => setComboType("tenders")}
                        className={`flex-1 p-3 md:p-4 rounded-xl border-2 transition-all font-body font-bold text-lg md:text-xl min-h-[48px] ${
                          comboType === "tenders"
                            ? "border-accent-pink bg-accent-pink/20 text-accent-pink"
                            : "border-accent-pink/30 bg-bg-light text-text-primary"
                        }`}
                      >
                        {isRTL ? tendersItem.nameHe : tendersItem.nameEn}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Sauce Selection */}
              <div className="mb-4 md:mb-6">
                <p className="text-base md:text-xl font-body font-bold text-text-primary mb-3 md:mb-4">
                  {t("selection.chooseSauces")}
                  <span className="text-accent-pink ml-2">
                    ({selectedSauces.length}/2)
                  </span>
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                  {sauces.map((sauce) => {
                    const isSelected = selectedSauces.includes(sauce.id);
                    const canSelect = selectedSauces.length < 2 || isSelected;

                    return (
                      <button
                        key={sauce.id}
                        onClick={() => toggleSauce(sauce.id)}
                        disabled={!canSelect}
                        className={`p-3 md:p-4 rounded-xl border-2 transition-all font-body font-bold text-sm md:text-lg min-h-[56px] md:min-h-[64px] ${
                          isSelected
                            ? "border-accent-pink bg-accent-pink/20 text-accent-pink"
                            : canSelect
                            ? "border-accent-pink/30 bg-bg-light text-text-primary hover:border-accent-pink/50 active:bg-accent-pink/10"
                            : "border-accent-pink/10 bg-bg-light text-text-primary/40 opacity-50 cursor-not-allowed"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="flex-1 text-left">{isRTL ? sauce.nameHe : sauce.nameEn}</span>
                          {isSelected && (
                            <Check className="w-4 h-4 md:w-5 md:h-5 text-accent-pink flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Footer with Add Button */}
              <div className="flex items-center justify-between pt-4 border-t border-accent-pink/20 sticky bottom-0 bg-bg-dark pb-2">
                <span className="text-xl md:text-3xl font-body font-bold text-accent-pink">
                  ₪{item.price}
                </span>
                <button
                  onClick={handleAddToCart}
                  disabled={!canAddToCart}
                  className={`px-4 md:px-8 py-2.5 md:py-4 rounded-xl font-body font-bold text-base md:text-2xl transition-all min-h-[48px] md:min-h-[56px] ${
                    canAddToCart
                      ? "bg-accent-pink text-white hover:bg-accent-pink/90 active:bg-accent-pink/80"
                      : "bg-accent-pink/30 text-text-primary/50 cursor-not-allowed"
                  }`}
                >
                  {t("selection.addToCart")}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(panelContent, document.body);
};

