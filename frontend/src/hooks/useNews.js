import { useEffect, useState } from "react";

export default function useNews(language) {
  const [news, setNews] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const langMap = {
          English: "en",
          Hindi: "hi",
          Urdu: "ur",
          Arabic: "ar",
          French: "fr",
          Spanish: "es",
          German: "de",
          Portuguese: "pt",
          Chinese: "zh",
          Japanese: "ja",
        };

        const response =
          await fetch(
            `http://localhost:5000/api/news?lang=${
              langMap[language] || "en"
            }`
          );

        const data =
          await response.json();

        setNews(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (err) {
        console.error(
          "News fetch error:",
          err
        );

        setError(err);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [language]);

  return {
    news,
    loading,
    error,
  };
}