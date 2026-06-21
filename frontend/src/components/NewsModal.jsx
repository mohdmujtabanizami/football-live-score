function NewsModal({
  selectedNews,
  news,
  t,
  darkMode,
  setSelectedNews,
}) {
  if (!selectedNews) return null;

  return (
    <div
      className="news-modal-overlay"
      onClick={() => setSelectedNews(null)}
    >
      <div
        className={`news-modal ${
          darkMode ? "dark-news" : "light-news"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={selectedNews.image}
          alt={selectedNews.title}
          className="news-modal-image"
        />

        <div className="news-meta">
          <span className="news-category">
            ⚽ {t.news}
          </span>
        </div>

        <h2>{selectedNews.title}</h2>

        <p className="news-author">
          {selectedNews.author || "Unknown"}
        </p>

        <p className="news-date">
          {new Date(
            selectedNews.date
          ).toLocaleString()}
        </p>

        <div className="news-article">
          {selectedNews.content
            ?.split("\n")
            .filter(Boolean)
            .map((para, index) => (
              <p key={index}>
                {para.replace(
                  /\[\+\d+ chars\]/g,
                  ""
                )}
              </p>
            ))}
        </div>

        <a
          href={selectedNews.url}
          target="_blank"
          rel="noopener noreferrer"
          className="read-full-btn"
        >
          {t.readFull}
        </a>

        <div className="related-news">
          <h3>{t.relatedNews}</h3>

          <div className="related-grid">
            {news
              .filter(
                (item) =>
                  item.id !== selectedNews.id
              )
              .slice(0, 3)
              .map((item) => (
                <div
                  key={item.id}
                  className="related-card"
                  onClick={() =>
                    setSelectedNews(item)
                  }
                >
                  <img
                    src={item.image}
                    alt={item.title}
                  />

                  <p>{item.title}</p>
                </div>
              ))}
          </div>
        </div>

        <button
          className="close-btn"
          onClick={() =>
            setSelectedNews(null)
          }
        >
          {t.close}
        </button>
      </div>
    </div>
  );
}

export default NewsModal;