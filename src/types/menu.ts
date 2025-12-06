export interface MenuItem {
  id: string;
  nameHe: string;
  nameEn: string;
  descriptionHe: string;
  descriptionEn: string;
  price: number;
  category:
    | "wings"
    | "tenders"
    | "sauces"
    | "salads"
    | "drinks"
    | "addons"
    | "combo";
  imageUrl?: string;
  spiceLevel?: number; // 0-5
  isAvailable: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: "wings-1",
    nameHe: "כנפיים",
    nameEn: "Wings",
    descriptionHe: "9 חתיכות, 2 רטבים",
    descriptionEn: "9 pieces, 2 sauces",
    price: 45,
    category: "wings",
    imageUrl: "/assets/menu_items/wings.webp",
    isAvailable: true,
  },
  {
    id: "tenders-1",
    nameHe: "טנדרס",
    nameEn: "Tenders",
    descriptionHe: "6 חתיכות חזה עוף, 2 רטבים",
    descriptionEn: "6 chicken fillet pieces, 2 sauces",
    price: 45,
    category: "tenders",
    imageUrl: "/assets/menu_items/tenders.webp",
    isAvailable: true,
  },
  {
    id: "sauce-mustard",
    nameHe: "חרדל ודבש",
    nameEn: "Mustard and Honey",
    descriptionHe: "רוטב חרדל ודבש מתוק",
    descriptionEn: "Sweet mustard and honey sauce",
    price: 2,
    category: "sauces",
    imageUrl: "/assets/menu_items/Sweet_mustard_and_honey_sauce.webp",
    isAvailable: true,
  },
  {
    id: "sauce-peanut",
    nameHe: "חמאת בוטנים",
    nameEn: "Peanut Butter",
    descriptionHe: "רוטב חמאת בוטנים ",
    descriptionEn: "Peanut butter sauce",
    price: 2,
    category: "sauces",
    imageUrl: "/assets/menu_items/Creamy_peanut_butter_sauce.webp",
    isAvailable: true,
  },
  {
    id: "sauce-chili",
    nameHe: "צ'ילי",
    nameEn: "Chili",
    descriptionHe: "רוטב צ'ילי",
    descriptionEn: "Chili sauce",
    price: 2,
    category: "sauces",
    imageUrl: "/assets/menu_items/Traditional_chili_sauce.webp",
    isAvailable: true,
  },
  {
    id: "sauce-spicy-honey",
    nameHe: "דבש חריף",
    nameEn: "Spicy Honey",
    descriptionHe: "רוטב דבש חריף",
    descriptionEn: "Spicy Honey sauce",
    price: 2,
    category: "sauces",
    imageUrl: "/assets/menu_items/spicy_honey.webp",
    spiceLevel: 4,
    isAvailable: true,
  },
  {
    id: "salad-coleslaw",
    nameHe: "קולסלאו",
    nameEn: "Coleslaw",
    descriptionHe: "קולסלאו",
    descriptionEn: "Coleslaw",
    price: 5,
    category: "salads",
    imageUrl: "/assets/menu_items/coleslaw.webp",
    isAvailable: true,
  },
  {
    id: "drink-cola-zero",
    nameHe: "קולה זירו",
    nameEn: "Cola Zero",
    descriptionHe: "קולה זירו",
    descriptionEn: "Cola Zero",
    price: 10,
    category: "drinks",
    imageUrl: "/assets/menu_items/cola_zero.webp",
    isAvailable: true,
  },
  {
    id: "drink-fanta",
    nameHe: "פנטה",
    nameEn: "Fanta",
    descriptionHe: "פנטה",
    descriptionEn: "Fanta",
    price: 10,
    category: "drinks",
    imageUrl: "/assets/menu_items/fanta.webp",
    isAvailable: true,
  },
  {
    id: "drink-sprite-zero",
    nameHe: "ספרייט זירו",
    nameEn: "Sprite Zero",
    descriptionHe: "ספרייט זירו",
    descriptionEn: "Sprite Zero",
    price: 10,
    category: "drinks",
    imageUrl: "/assets/menu_items/sprite_zero.webp",
    isAvailable: true,
  },
  {
    id: "drink-sprite",
    nameHe: "ספרייט",
    nameEn: "Sprite",
    descriptionHe: "ספרייט",
    descriptionEn: "Sprite",
    price: 10,
    category: "drinks",
    imageUrl: "/assets/menu_items/sprite.webp",
    isAvailable: true,
  },
  {
    id: "addon-fries",
    nameHe: "צ'יפס",
    nameEn: "Fries",
    descriptionHe: "צ'יפס פריך וטעים",
    descriptionEn: "Crispy and delicious fries",
    price: 15,
    category: "addons",
    imageUrl: "/assets/menu_items/fries.webp",
    isAvailable: true,
  },
  {
    id: "addon-corndog",
    nameHe: "קורנדוג",
    nameEn: "Corndog",
    descriptionHe: "4 יחידות",
    descriptionEn: "4 units",
    price: 30,
    category: "addons",
    imageUrl: "/assets/menu_items/corndogs.webp",
    isAvailable: true,
  },
  {
    id: "combo-1",
    nameHe: "עסקית",
    nameEn: "Combo Meal",
    descriptionHe: "טנדרס/כנפיים + צ'יפס + פחית שתייה + סלט",
    descriptionEn: "Tenders/Wings + Fries + Can Drink + Salad",
    price: 65,
    category: "combo",
    imageUrl: "/assets/menu_items/combo.webp",
    isAvailable: true,
  },
];
