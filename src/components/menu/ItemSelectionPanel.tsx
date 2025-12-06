import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { X, Check, Minus, Plus } from "lucide-react";
import { MenuItem } from "../../types/menu";
import { menuItems } from "../../types/menu";
import { useCartStore } from "../../stores/useCartStore";

interface ItemSelectionPanelProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
  onAddSuccess?: () => void; // Callback when item is added successfully
  editingCartItemId?: string; // If provided, we're editing an existing cart item
  initialConfig?: {
    comboType: "wings" | "tenders";
    selectedSauces: string[];
    selectedDrink: string;
  };
}

export const ItemSelectionPanel = ({
  item,
  isOpen,
  onClose,
  onAddSuccess,
  editingCartItemId,
  initialConfig,
}: ItemSelectionPanelProps) => {
  const { t, i18n } = useTranslation();
  const addItem = useCartStore((state) => state.addItem);
  const updateItem = useCartStore((state) => state.updateItem);
  const isRTL = i18n.language === "he";
  const [mounted, setMounted] = useState(false);

  const sauces = menuItems.filter((i) => i.category === "sauces");
  const drinks = menuItems.filter((i) => i.category === "drinks");
  const wingsItem = menuItems.find((i) => i.category === "wings");
  const tendersItem = menuItems.find((i) => i.category === "tenders");
  const friesItem = menuItems.find((i) => i.category === "addons");
  const saladItem = menuItems.find((i) => i.category === "salads");

  // State for combo: wings or tenders selection
  const [comboType, setComboType] = useState<"wings" | "tenders">(
    initialConfig?.comboType || "wings"
  );

  // State for sauce selection (max 2)
  const [selectedSauces, setSelectedSauces] = useState<string[]>(() => {
    if (!initialConfig?.selectedSauces) return [];
    // Filter out invalid sauces to prevent issues with removed menu items
    return initialConfig.selectedSauces.filter((id) =>
      menuItems.some((i) => i.id === id && i.category === "sauces")
    );
  });

  // State for drink selection (combo only, 1 drink)
  const [selectedDrink, setSelectedDrink] = useState<string | null>(() => {
    if (!initialConfig?.selectedDrink) return null;
    // Validate drink exists
    return menuItems.some(
      (i) => i.id === initialConfig.selectedDrink && i.category === "drinks"
    )
      ? initialConfig.selectedDrink
      : null;
  });

  // Sync state when initialConfig changes (for editing scenarios)
  useEffect(() => {
    if (isOpen && initialConfig) {
      // Filter invalid items again when props change
      const validSauces = initialConfig.selectedSauces.filter((id) =>
        menuItems.some((i) => i.id === id && i.category === "sauces")
      );
      setSelectedSauces(validSauces);

      const validDrink = menuItems.some(
        (i) => i.id === initialConfig.selectedDrink && i.category === "drinks"
      )
        ? initialConfig.selectedDrink
        : null;
      setSelectedDrink(validDrink);

      setComboType(initialConfig.comboType);
    }
  }, [isOpen, initialConfig]);

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

  const addSauce = (sauceId: string) => {
    setSelectedSauces((prev) => {
      if (prev.length < 2) {
        return [...prev, sauceId];
      }
      return prev;
    });
  };

  const removeSauce = (sauceId: string) => {
    setSelectedSauces((prev) => {
      const index = prev.indexOf(sauceId);
      if (index > -1) {
        const newSauces = [...prev];
        newSauces.splice(index, 1);
        return newSauces;
      }
      return prev;
    });
  };

  const toggleDrink = (drinkId: string) => {
    setSelectedDrink((prev) => (prev === drinkId ? null : drinkId));
  };

  const handleAddToCart = () => {
    if (item.category === "combo") {
      // Combo needs: wings/tenders choice + 2 sauces + 1 drink
      if (selectedSauces.length !== 2 || !selectedDrink) return;

      const baseItem = comboType === "wings" ? wingsItem! : tendersItem!;
      const selectedSauceItems = selectedSauces.map((id) =>
        sauces.find((s) => s.id === id)
      );
      const selectedDrinkItem = drinks.find((d) => d.id === selectedDrink);

      // Create a unique ID for this combo configuration
      const comboId = `combo-${comboType}-${selectedSauces
        .sort()
        .join("-")}-${selectedDrink}`;

      // Build combo name with all included items
      const sauceNames = selectedSauceItems
        .map((s) => (isRTL ? s?.nameHe : s?.nameEn))
        .filter(Boolean);
      const comboName = isRTL
        ? `${item.nameHe} - ${baseItem.nameHe}, ${sauceNames.join(", ")}, ${
            selectedDrinkItem?.nameHe || ""
          }, ${friesItem?.nameHe || ""}, ${saladItem?.nameHe || ""}`
        : `${item.nameEn} - ${baseItem.nameEn}, ${sauceNames.join(", ")}, ${
            selectedDrinkItem?.nameEn || ""
          }, ${friesItem?.nameEn || ""}, ${saladItem?.nameEn || ""}`;

      if (editingCartItemId) {
        // Update existing cart item
        if (updateItem) {
          updateItem(editingCartItemId, {
            id: comboId,
            name: comboName,
            price: item.price,
            imageUrl: item.imageUrl,
            isCombo: true,
            comboConfig: {
              comboType,
              selectedSauces,
              selectedDrink,
              baseItemId: baseItem.id,
            },
          });
        }
      } else {
        // Add new item
        addItem({
          id: comboId,
          name: comboName,
          price: item.price,
          imageUrl: item.imageUrl,
          isCombo: true,
          comboConfig: {
            comboType,
            selectedSauces,
            selectedDrink,
            baseItemId: baseItem.id,
          },
        });
      }

      // Trigger animation first, then close panel
      if (onAddSuccess) {
        onAddSuccess();
      }
      // Small delay before closing so the animation starts from correct position
      setTimeout(() => onClose(), 50);
    } else {
      // Wings or Tenders needs: 2 sauces
      if (selectedSauces.length !== 2) return;

      const selectedSauceItems = selectedSauces.map((id) =>
        sauces.find((s) => s.id === id)
      );

      const customizedId = `${item.id}-${selectedSauces.sort().join("-")}`;
      const customizedName = isRTL
        ? `${item.nameHe} - ${selectedSauceItems
            .map((s) => s?.nameHe)
            .join(", ")}`
        : `${item.nameEn} - ${selectedSauceItems
            .map((s) => s?.nameEn)
            .join(", ")}`;

      if (editingCartItemId) {
        // Update existing cart item
        if (updateItem) {
          updateItem(editingCartItemId, {
            id: customizedId,
            name: customizedName,
            price: item.price,
            imageUrl: item.imageUrl,
            comboConfig: {
              comboType: item.category === "wings" ? "wings" : "tenders",
              selectedSauces,
              selectedDrink: "", // Not applicable for wings/tenders
              baseItemId: item.id,
            },
          });
        }
      } else {
        // Add new item
        addItem({
          id: customizedId,
          name: customizedName,
          price: item.price,
          imageUrl: item.imageUrl,
          comboConfig: {
            comboType: item.category === "wings" ? "wings" : "tenders",
            selectedSauces,
            selectedDrink: "", // Not applicable for wings/tenders
            baseItemId: item.id,
          },
        });
      }

      // Trigger animation first, then close panel
      if (onAddSuccess) {
        onAddSuccess();
      }
      // Small delay before closing so the animation starts from correct position
      setTimeout(() => {
        onClose();
        // Reset after closing
        setSelectedSauces([]);
        setSelectedDrink(null);
        setComboType("wings");
      }, 50);
    }
  };

  const canAddToCart =
    item.category === "combo"
      ? selectedSauces.length === 2 && selectedDrink !== null
      : selectedSauces.length === 2;

  // Calculate selected sauce names for display
  const selectedSauceNames = selectedSauces
    .map((id) => {
      const s = sauces.find((sauce) => sauce.id === id);
      return isRTL ? s?.nameHe : s?.nameEn;
    })
    .filter(Boolean)
    .join(", ");

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
                        className={`flex-1 p-3 md:p-4 rounded-xl border-2 transition-all font-body font-bold text-sm md:text-lg min-h-[48px] flex items-center justify-center gap-3 ${
                          comboType === "wings"
                            ? "border-accent-pink bg-accent-pink/20 text-accent-pink"
                            : "border-accent-pink/30 bg-bg-light text-text-primary"
                        }`}
                      >
                        {wingsItem.imageUrl && (
                          <img
                            src={wingsItem.imageUrl}
                            alt=""
                            className="w-10 h-10 md:w-12 md:h-12 object-contain"
                          />
                        )}
                        <span className="font-body font-bold text-sm md:text-lg">
                          {isRTL ? wingsItem.nameHe : wingsItem.nameEn}
                        </span>
                      </button>
                    )}
                    {tendersItem && (
                      <button
                        onClick={() => setComboType("tenders")}
                        className={`flex-1 p-3 md:p-4 rounded-xl border-2 transition-all font-body font-bold text-sm md:text-lg min-h-[48px] flex items-center justify-center gap-3 ${
                          comboType === "tenders"
                            ? "border-accent-pink bg-accent-pink/20 text-accent-pink"
                            : "border-accent-pink/30 bg-bg-light text-text-primary"
                        }`}
                      >
                        {tendersItem.imageUrl && (
                          <img
                            src={tendersItem.imageUrl}
                            alt=""
                            className="w-10 h-10 md:w-12 md:h-12 object-contain"
                          />
                        )}
                        <span className="font-body font-bold text-sm md:text-lg">
                          {isRTL ? tendersItem.nameHe : tendersItem.nameEn}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Sauce Selection */}
              <div className="mb-4 md:mb-6">
                <p className="text-base md:text-xl font-body font-bold text-text-primary mb-3 md:mb-4">
                  {t("selection.chooseSauces")}
                  {selectedSauces.length > 0 && (
                    <span className="text-accent-pink ml-2 text-sm md:text-lg font-normal">
                      {selectedSauceNames}
                    </span>
                  )}
                </p>
                <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                  {sauces.map((sauce) => {
                    const count = selectedSauces.filter(
                      (id) => id === sauce.id
                    ).length;
                    const isSelected = count > 0;
                    const canAdd = selectedSauces.length < 2;

                    return (
                      <div
                        key={sauce.id}
                        onClick={() => {
                          if (!isSelected && canAdd) addSauce(sauce.id);
                        }}
                        className={`relative p-1 rounded-xl border-2 transition-all min-h-[56px] md:min-h-[64px] flex items-center justify-center w-[calc(50%-0.25rem)] md:w-[calc(25%-0.75rem)] ${
                          isSelected
                            ? "border-accent-pink bg-accent-pink/20 text-accent-pink"
                            : canAdd
                            ? "border-accent-pink/30 bg-bg-light text-text-primary cursor-pointer hover:border-accent-pink/50 active:bg-accent-pink/10"
                            : "border-accent-pink/10 bg-bg-light text-text-primary/40 opacity-50 cursor-not-allowed"
                        }`}
                      >
                        {isSelected ? (
                          <div className="flex items-center justify-between w-full px-2 gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeSauce(sauce.id);
                              }}
                              className="p-1 rounded-full bg-bg-dark/20 hover:bg-bg-dark/40 transition-colors flex-shrink-0"
                            >
                              <Minus className="w-4 h-4" />
                            </button>

                            <div className="flex items-center justify-center gap-2 flex-1">
                              {sauce.imageUrl && (
                                <img
                                  src={sauce.imageUrl}
                                  alt=""
                                  className="w-8 h-8 md:w-10 md:h-10 object-contain"
                                />
                              )}
                              <span className="font-body font-bold text-sm md:text-lg text-center">
                                {isRTL ? sauce.nameHe : sauce.nameEn}
                              </span>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                addSauce(sauce.id);
                              }}
                              disabled={!canAdd}
                              className={`p-1 rounded-full transition-colors flex-shrink-0 ${
                                canAdd
                                  ? "bg-bg-dark/20 hover:bg-bg-dark/40"
                                  : "opacity-0 cursor-default"
                              }`}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            {sauce.imageUrl && (
                              <img
                                src={sauce.imageUrl}
                                alt=""
                                className="w-8 h-8 md:w-10 md:h-10 object-contain"
                              />
                            )}
                            <span className="font-body font-bold text-sm md:text-lg select-none px-2 text-center">
                              {isRTL ? sauce.nameHe : sauce.nameEn}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Drink Selection (Combo only) */}
              {item.category === "combo" && (
                <div className="mb-4 md:mb-6">
                  <p className="text-base md:text-xl font-body font-bold text-text-primary mb-3 md:mb-4">
                    {t("selection.chooseDrink")}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                    {drinks.map((drink) => {
                      const isSelected = selectedDrink === drink.id;

                      return (
                        <button
                          key={drink.id}
                          onClick={() => toggleDrink(drink.id)}
                          className={`p-3 md:p-4 rounded-xl border-2 transition-all font-body font-bold text-sm md:text-lg min-h-[56px] md:min-h-[64px] flex items-center justify-center gap-3 w-[calc(50%-0.25rem)] md:w-[calc(25%-0.75rem)] ${
                            isSelected
                              ? "border-accent-pink bg-accent-pink/20 text-accent-pink"
                              : "border-accent-pink/30 bg-bg-light text-text-primary hover:border-accent-pink/50 active:bg-accent-pink/10"
                          }`}
                        >
                          {drink.imageUrl && (
                            <img
                              src={drink.imageUrl}
                              alt=""
                              className="w-10 h-10 md:w-12 md:h-12 object-contain"
                            />
                          )}
                          <span className="font-body font-bold text-sm md:text-lg">
                            {isRTL ? drink.nameHe : drink.nameEn}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Footer with Add Button */}
              <div className="flex flex-col gap-2 pt-4 border-t border-accent-pink/20 sticky bottom-0 bg-bg-dark pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xl md:text-3xl font-body font-bold text-accent-pink">
                    ₪{item.price}
                  </span>
                  <button
                    onClick={handleAddToCart}
                    disabled={!canAddToCart}
                    className={`px-4 md:px-8 py-2.5 md:py-4 rounded-xl font-body font-bold text-base md:text-2xl transition-all min-h-[48px] md:min-h-[56px] flex items-center gap-2 ${
                      canAddToCart
                        ? "bg-accent-pink text-white hover:bg-accent-pink/90 active:bg-accent-pink/80"
                        : "bg-accent-pink/30 text-text-primary/50 cursor-not-allowed"
                    }`}
                  >
                    {t("selection.addToCart")}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(panelContent, document.body);
};
