function NewsPage({ news, t, setSelectedNews }) {
  return (
    <div className="news-section">
      <div className="news-header">
        {t.footballNews}
      </div>

      <div className="news-grid">
        {news.map((item) => (
          <div
            key={item.id}
            className="news-card"
            onClick={() => setSelectedNews(item)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="news-image"
            />

            <div className="news-content">
              <h3>{item.title}</h3>

              <span className="news-date">
                {new Date(item.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsPage;