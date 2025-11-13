import { useState, useRef } from "react";
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
  const [isFlyingToCart, setIsFlyingToCart] = useState(false);
  const [flyingPosition, setFlyingPosition] = useState({ x: 0, y: 0 });
  const [flyingSize, setFlyingSize] = useState(80);
  const cardRef = useRef<HTMLDivElement>(null);

  // Check if item needs customization (wings, tenders, combo)
  const needsCustomization =
    item.category === "wings" ||
    item.category === "tenders" ||
    item.category === "combo";

  const triggerFlyingAnimation = () => {
    // Start flying animation
    if (cardRef.current && item.imageUrl) {
      const cardRect = cardRef.current.getBoundingClientRect();
      
      // Set initial position (center of clicked card)
      setFlyingPosition({
        x: cardRect.left + cardRect.width / 2 - 40,
        y: cardRect.top + cardRect.height / 2 - 40
      });
      setFlyingSize(80);
      setIsFlyingToCart(true);
      
      // After small delay, fly to top-left corner (cart position)
      setTimeout(() => {
        setFlyingPosition({
          x: 20, // Top-left corner
          y: 20 // Near top
        });
        setFlyingSize(50);
      }, 10);
      
      // Remove animation element
      setTimeout(() => {
        setIsFlyingToCart(false);
      }, 700);
    }
  };

  const handleAddToCart = () => {
    if (needsCustomization) {
      // Open selection panel
      setIsPanelOpen(true);
    } else {
      // Trigger animation
      triggerFlyingAnimation();
      
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
    <>
    <div
      ref={cardRef}
      onClick={handleAddToCart}
      className="bg-bg-dark rounded-xl overflow-hidden border border-accent-pink/20 hover:border-accent-pink/40 transition-all duration-300 cursor-pointer"
    >
      {/* Image */}
      {item.imageUrl && (
        <div className="w-full h-48 bg-bg-light overflow-hidden">
          <img
            src={item.imageUrl}
            alt={isRTL ? item.nameHe : item.nameEn}
            className="w-full h-full object-cover"
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
          <div
            className="p-2 md:p-3 rounded-lg transition-all duration-300 bg-accent-pink text-white"
            aria-label="Add to cart"
          >
            <Plus className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>
      </div>

      {/* Selection Panel */}
      <ItemSelectionPanel
        item={item}
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onAddSuccess={triggerFlyingAnimation}
      />
    </div>

    {/* Flying to Cart Animation */}
    {isFlyingToCart && (
      <div
        style={{
          position: 'fixed',
          left: flyingPosition.x + 'px',
          top: flyingPosition.y + 'px',
          width: flyingSize + 'px',
          height: flyingSize + 'px',
          borderRadius: '50%',
          backgroundColor: '#ec4899',
          border: '3px solid white',
          backgroundImage: item.imageUrl ? `url(${item.imageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'all 0.7s ease-out',
          boxShadow: '0 8px 30px rgba(236, 72, 153, 0.8)',
        }}
      />
    )}
    </>
  );
};
