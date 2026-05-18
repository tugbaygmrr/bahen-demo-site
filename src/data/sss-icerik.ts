export type SssIcon =
  | "building"
  | "helmet"
  | "leaf"
  | "team"
  | "document";

export type SssItem = {
  question: string;
  answer: string;
  icon: SssIcon;
};

export const sssItems: SssItem[] = [
  {
    icon: "building",
    question: "Projeleriniz hangi ölçeklerde gerçekleştiriliyor?",
    answer:
      "Konut, ofis, endüstri, kampüs ve karma kullanım projeleri başta olmak üzere farklı ölçekte yapılar tasarlıyor ve hayata geçiriyoruz. Her projeyi bulunduğu bağlama ve ihtiyaca özel yaklaşımla ele alıyoruz.",
  },
  {
    icon: "helmet",
    question: "Tasarım ve uygulama süreçleriniz nasıl ilerliyor?",
    answer:
      "Keşif ve strateji ile başlayıp üretime hazır proje dokümantasyonuna, ardından sahada disiplinli uygulama ve devreye almaya kadar dört fazda ilerliyoruz. Her adımda net çıktı ve onay noktası bulunur.",
  },
  {
    icon: "leaf",
    question: "Sürdürülebilirlik yaklaşımınız nedir?",
    answer:
      "Enerji verimliliği, doğru sistem seçimi ve mevzuata uyum önceliğimizdir. Isı geri kazanımı, verimli ekipman ve ölçülebilir hedeflerle projeleri uzun vadeli işletme maliyetleriyle birlikte değerlendiriyoruz.",
  },
  {
    icon: "team",
    question: "Proje süresince müşteriyle iletişim nasıl sağlanıyor?",
    answer:
      "Proje yöneticisi ve teknik ekip düzenli durum paylaşımı, revizyon onayları ve saha koordinasyonu ile süreci şeffaf yürütür. Kritik kararlar yazılı olarak netleştirilir.",
  },
  {
    icon: "document",
    question: "Teklif almak için ne yapmalıyım?",
    answer:
      "Yapı tipi, metrekare, kullanım amacı ve hedef takvimi gibi temel bilgileri paylaşmanız yeterli. info@bahen.com.tr üzerinden veya iletişim formumuzdan bize ulaşabilirsiniz; ekibimiz kısa sürede dönüş yapar.",
  },
];
