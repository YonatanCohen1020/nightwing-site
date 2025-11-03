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
    imageUrl: "/assets/wings.webp",
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
    imageUrl: "/assets/tenders.jpg",
    isAvailable: true,
  },
  {
    id: "sauce-chili",
    nameHe: "צ'ילי קלאסי",
    nameEn: "Classic Chili",
    descriptionHe: "רטב צ'ילי מסורתי",
    descriptionEn: "Traditional chili sauce",
    price: 0,
    category: "sauces",
    isAvailable: true,
  },
  {
    id: "sauce-thai",
    nameHe: "תאילנדי",
    nameEn: "Thai",
    descriptionHe: "רטב תאילנדי חריף",
    descriptionEn: "Spicy Thai sauce",
    price: 0,
    category: "sauces",
    spiceLevel: 4,
    isAvailable: true,
  },
  {
    id: "sauce-peanut",
    nameHe: "חמאת בוטנים",
    nameEn: "Peanut Butter",
    descriptionHe: "רטב חמאת בוטנים קרמי",
    descriptionEn: "Creamy peanut butter sauce",
    price: 0,
    category: "sauces",
    isAvailable: true,
  },
  {
    id: "sauce-mustard",
    nameHe: "חרדל ודבש",
    nameEn: "Mustard and Honey",
    descriptionHe: "רטב חרדל ודבש מתוק",
    descriptionEn: "Sweet mustard and honey sauce",
    price: 0,
    category: "sauces",
    isAvailable: true,
  },
  {
    id: "salad-coleslaw",
    nameHe: "קולסלאו קלאסי",
    nameEn: "Classic American Coleslaw",
    descriptionHe: "קולסלאו אמריקאי מסורתי",
    descriptionEn: "Traditional American coleslaw",
    price: 5,
    category: "salads",
    imageUrl: "/assets/coleslaw.jpg",
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
    imageUrl: "/assets/fries.webp",
    isAvailable: true,
  },
  {
    id: "combo-1",
    nameHe: "קומבו",
    nameEn: "Combo Meal",
    descriptionHe: "טנדרס/כנפיים + צ'יפס + פחית שתייה + סלט",
    descriptionEn: "Tenders/Wings + Fries + Can Drink + Salad",
    price: 65,
    category: "combo",
    imageUrl: "/assets/combo.webp",
    isAvailable: true,
  },
];
