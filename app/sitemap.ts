import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.breezefamily.co.za",
      lastModified: new Date(),
    },

    {
      url: "https://www.breezefamily.co.za/kids-edition",
      lastModified: new Date(),
    },

    {
      url: "https://www.breezefamily.co.za/season-2-finale",
      lastModified: new Date(),
    },

    {
      url: "https://www.breezefamily.co.za/fan-favorite-judge",
      lastModified: new Date(),
    },

    {
      url: "https://www.breezefamily.co.za/admin",
      lastModified: new Date(),
    },
  ];
}