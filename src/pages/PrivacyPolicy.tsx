import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PrivacyPolicy() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "he";

  const updatedAt = "2025-12-18";

  const content =
    i18n.language === "he"
      ? {
          title: "מדיניות פרטיות",
          back: "חזרה לתפריט",
          lastUpdated: `עודכן לאחרונה: ${updatedAt}`,
          intro:
            "אנחנו ב‑Night Wing PH מכבדים את הפרטיות שלך. מדיניות זו מסבירה איזה מידע אנחנו אוספים כשאת/ה מבצע/ת הזמנה, למה אנחנו משתמשים בו, עם מי הוא עשוי להיות משותף, ואיך ניתן ליצור איתנו קשר.",
          sections: [
            {
              heading: "איזה מידע אנחנו אוספים",
              body: [
                "מידע שאתה מזין בעת הזמנה: שם, מספר טלפון, סוג הזמנה (איסוף/משלוח), כתובת למשלוח (אם רלוונטי), ותכולת ההזמנה (פריטים, רטבים, משקה וכו').",
                "מידע תפעולי בסיסי: תאריך ושעת ההזמנה, מזהה הזמנה, סטטוס תשלום/משלוח לצורך מעקב תפעולי.",
              ],
            },
            {
              heading: "למה אנחנו משתמשים במידע",
              body: [
                "לעיבוד ההזמנה, הכנתה ומסירתה.",
                "ליצירת קשר במקרה של בעיה/חוסר במלאי/בירור.",
                "לרישום וניהול הזמנות (למשל בגוגל שיטס) ושיפור תפעולי.",
              ],
            },
            {
              heading: "שיתוף מידע עם צדדים שלישיים",
              body: [
                "אנחנו עשויים לשתף מידע מינימלי הנדרש לתפעול השירות, למשל עם שירותי תשתית/אוטומציה (כגון Google Sheets ו‑Telegram להתראות פנימיות) או ספקי תשלום (PayBox) בהתאם לשיטת התשלום שבחרת.",
                "אנחנו לא מוכרים את המידע האישי שלך.",
              ],
            },
            {
              heading: "שמירת מידע",
              body: [
                "אנחנו שומרים מידע הזמנה למשך הזמן הנדרש לצורך תפעול העסק, ניהול הזמנות, והתנהלות מול לקוחות במקרה הצורך.",
              ],
            },
            {
              heading: "אבטחה",
              body: [
                "אנחנו נוקטים אמצעי אבטחה סבירים כדי להגן על המידע. יחד עם זאת, אין מערכת שיכולה להבטיח אבטחה מוחלטת.",
              ],
            },
            {
              heading: "הזכויות שלך",
              body: [
                "ניתן לפנות אלינו לבקשת גישה/תיקון/מחיקה של מידע אישי, בכפוף לחובות חוקיות ושיקולים תפעוליים.",
              ],
            },
            {
              heading: "יצירת קשר",
              body: [
                "לכל שאלה בנושא פרטיות ניתן ליצור קשר בטלפון: 058-6230849.",
              ],
            },
          ],
        }
      : {
          title: "Privacy Policy",
          back: "Back to menu",
          lastUpdated: `Last updated: ${updatedAt}`,
          intro:
            "At Night Wing PH, we respect your privacy. This policy explains what information we collect when you place an order, how we use it, who we may share it with, and how to contact us.",
          sections: [
            {
              heading: "What we collect",
              body: [
                "Information you provide when ordering: name, phone number, order type (pickup/delivery), delivery address (if applicable), and order contents (items, sauces, drink, etc.).",
                "Basic operational info: order date/time, order ID, and payment/delivery status for operational tracking.",
              ],
            },
            {
              heading: "How we use the information",
              body: [
                "To process, prepare, and fulfill your order.",
                "To contact you if there’s an issue, out-of-stock item, or clarification needed.",
                "To record and manage orders (for example in Google Sheets) and improve operations.",
              ],
            },
            {
              heading: "Sharing with third parties",
              body: [
                "We may share the minimum necessary information to operate the service, for example with infrastructure/automation tools (such as Google Sheets and Telegram for internal alerts) or payment providers (PayBox) depending on your payment method.",
                "We do not sell your personal information.",
              ],
            },
            {
              heading: "Data retention",
              body: [
                "We retain order information for as long as needed to run the business, manage orders, and handle customer follow-ups when required.",
              ],
            },
            {
              heading: "Security",
              body: [
                "We take reasonable measures to protect your information. However, no system can guarantee absolute security.",
              ],
            },
            {
              heading: "Your rights",
              body: [
                "You can contact us to request access, correction, or deletion of personal information, subject to legal obligations and operational needs.",
              ],
            },
            {
              heading: "Contact",
              body: ["For privacy questions, contact us at: 058-6230849."],
            },
          ],
        };

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary">
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-accent-pink/20 hover:bg-accent-pink/30 border border-accent-pink/40 transition-colors text-sm font-body font-bold"
          >
            {content.back}
          </Link>
        </div>

        <div className={isRTL ? "text-right" : "text-left"}>
          <h1 className="text-4xl md:text-5xl font-display text-accent-pink mb-2">
            {content.title}
          </h1>
          <p className="text-text-primary/60 text-sm mb-6">
            {content.lastUpdated}
          </p>
          <p className="text-text-primary/80 text-base md:text-lg font-body font-bold leading-relaxed mb-10">
            {content.intro}
          </p>

          <div className="space-y-8">
            {content.sections.map((s) => (
              <section key={s.heading} className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-display text-text-primary">
                  {s.heading}
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-text-primary/80 text-base md:text-lg font-body font-bold leading-relaxed">
                  {s.body.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



