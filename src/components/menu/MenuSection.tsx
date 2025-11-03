import { useTranslation } from "react-i18next";
import { menuItems } from "../../types/menu";
import { MenuItemCard } from "./MenuItemCard";

export const MenuSection = () => {
  const { t } = useTranslation();

  // Group items by category - combo first
  // Fries (addons) appear after tenders, before salads
  const categories = [
    {
      key: "combo" as const,
      items: menuItems.filter((item) => item.category === "combo"),
    },
    {
      key: "wings" as const,
      items: menuItems.filter((item) => item.category === "wings"),
    },
    {
      key: "tenders" as const,
      items: menuItems.filter((item) => item.category === "tenders"),
    },
    {
      key: "fries" as const,
      items: menuItems.filter((item) => item.category === "addons"),
    },
    {
      key: "salads" as const,
      items: menuItems.filter((item) => item.category === "salads"),
    },
    {
      key: "sauces" as const,
      items: menuItems.filter((item) => item.category === "sauces"),
    },
    {
      key: "drinks" as const,
      items: menuItems.filter((item) => item.category === "drinks"),
    },
  ];

  return (
    <section
      id="menu"
      className="py-16 md:py-24 bg-bg-primary scroll-mt-[70px]"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Title */}
        <h2 className="text-accent-pink font-body font-bold text-4xl md:text-5xl mb-12 md:mb-16 pb-4 md:pb-2 inline-block text-center w-full relative menu-title-thick">
          {t("menu.title")}
          <span className="absolute bottom-0 left-0 right-0 h-[4px] bg-accent-pink rounded-full"></span>
        </h2>

        {/* Menu Categories */}
        <div className="space-y-16 md:space-y-20">
          {categories.map((category) => {
            if (category.items.length === 0) return null;

            return (
              <div key={category.key} className="space-y-6">
                {/* Category Title */}
                <h3 className="text-3xl md:text-4xl font-body font-bold text-text-primary mb-6 pb-2 md:pb-3 relative">
                  {t(`menu.${category.key}`)}
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-pink/30 rounded-full"></span>
                </h3>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {category.items.map((item) => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
