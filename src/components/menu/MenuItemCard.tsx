import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import { MenuItem } from "../../types/menu";
import { useCartStore } from "../../stores/useCartStore";
import { ItemSelectionPanel } from "./ItemSelectionPanel";

interface MenuItemCardProps {
  item: MenuItem;
}

export const MenuItemCard = ({ item }: MenuItemCardProps) => {
  const { i18n } = useTranslation();
  const addItem = useCartStore((state) => state.addItem);
  const isRTL = i18n.language === "he";
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Check if item needs customization (wings, tenders, combo)
  const needsCustomization =
    item.category === "wings" ||
    item.category === "tenders" ||
    item.category === "combo";

  const handleAddToCart = () => {
    if (needsCustomization) {
      // Open selection panel
      setIsPanelOpen(true);
    } else {
      // Add directly to cart
      addItem({
        id: item.id,
        name: isRTL ? item.nameHe : item.nameEn,
        price: item.price,
        imageUrl: item.imageUrl,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -8 }}
      className="bg-bg-dark rounded-xl overflow-hidden border border-accent-pink/20 hover:border-accent-pink/40 transition-all duration-300"
    >
      {/* Image */}
      {item.imageUrl && (
        <div className="w-full h-48 bg-bg-light overflow-hidden">
          <img
            src={item.imageUrl}
            alt={isRTL ? item.nameHe : item.nameEn}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4 md:p-6">
        {/* Description */}
        <p className="text-text-primary/70 text-lg md:text-xl font-body font-bold mb-4">
          {isRTL ? item.descriptionHe : item.descriptionEn}
        </p>

        {/* Price & Add Button */}
        <div className="flex items-center justify-between">
          <span className="text-2xl md:text-3xl font-bold text-accent-pink">
            ₪{item.price}
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="bg-accent-pink text-white p-2 md:p-3 rounded-lg hover:bg-accent-pink/90 transition-colors"
            aria-label="Add to cart"
          >
            <Plus className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        </div>
      </div>

      {/* Selection Panel */}
      <ItemSelectionPanel
        item={item}
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
    </motion.div>
  );
};
