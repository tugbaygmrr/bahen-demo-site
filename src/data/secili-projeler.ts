export type SeciliProje = {
  name: string;
  tag: "Devam Eden Proje" | "Tamamlanan Proje";
  description: string;
  imageUrl: string;
  icon: "building" | "factory" | "campus";
};

export const seciliProjeler: SeciliProje[] = [
  {
    name: "Yüksek Yoğunluklu Karma Yapı",
    tag: "Devam Eden Proje",
    description:
      "Karma kullanımda ısıtma, soğutma ve tesisat sistemlerinin tek projede koordinasyonu.",
    imageUrl:
      "https://www.bahen.com.tr/uploads/2023/09/Rams-Denizkent-Bayramoglu.jpg",
    icon: "building",
  },
  {
    name: "Endüstri Tesisi Modernizasyonu",
    tag: "Tamamlanan Proje",
    description:
      "Üretim hattına uygun mekanik yenileme, enerji verimliliği ve devreye alma.",
    imageUrl: "https://www.bahen.com.tr/uploads/2024/05/image-1.png",
    icon: "factory",
  },
  {
    name: "Kurumsal Kampüs Mekanik Altyapı",
    tag: "Devam Eden Proje",
    description:
      "Kampüs ölçeğinde merkezi sistemler, dağıtım hatları ve bina entegrasyonu.",
    imageUrl: "https://www.bahen.com.tr/uploads/2024/05/image-2.png",
    icon: "campus",
  },
];
