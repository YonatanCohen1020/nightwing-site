import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../stores/useCartStore';

interface CartButtonProps {
  onClick: () => void;
}

export const CartButton = ({ onClick }: CartButtonProps) => {
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={onClick}
          className="fixed top-4 left-4 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-accent-pink text-white shadow-lg hover:bg-accent-pink/90 transition-colors border-2 border-bg-dark"
          aria-label="Open cart"
        >
          <ShoppingCart className="w-6 h-6 md:w-7 md:h-7" />
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 rounded-full bg-bg-dark text-accent-pink text-xs md:text-sm font-black font-body"
            style={{ textShadow: '0 0 2px currentColor' }}
          >
            {itemCount}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

