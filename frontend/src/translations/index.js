const translations = {
    English: {
      home: "Home", liveScores: "Live Scores", news: "News", rankings: "Rankings", topScorers: "Top Scorers",
      lightMode: "☀️ Light Mode", darkMode: "🌙 Dark Mode", notifOn: "🔔 Notifications ON", notifOff: "🔕 Notifications OFF",
      login: "Login", logout: "Logout", liveMatches: "🔴 Live Matches", matchInfo: "Match Info",
      live: "🔴 LIVE", upcoming: "📅 UPCOMING", finished: "✅ FINISHED", fav: "⭐ FAVORITES", myTeams: "⭐ MY TEAMS",
      search: "🔍 Search Team...", noMatch: "No Match Found ⚽", viewStats: "📊 View Stats", matchDetails: "📊 Match Details",
      stadium: "🏟 Stadium", country: "🌍 Country", referee: "👨‍⚖️ Referee", season: "📅 Season", round: "🏆 Round", city: "🏙 City",
      standings: "Standings", pos: "Pos", team: "Team", p: "P", w: "W", d: "D", l: "L", pts: "Pts", close: "Close",
      latestNews: "📰 Latest News", footballNews: "📰 Football News", relatedNews: "Related News",
      readFull: "Read Full Article ↗"
    },
    Hindi: {
      home: "होम", liveScores: "लाइव स्कोर", news: "समाचार", rankings: "रैंकिंग", topScorers: "टॉप स्कोरर",
      lightMode: "☀️ लाइट मोड", darkMode: "🌙 डार्क मोड", notifOn: "🔔 नोटिफिकेशन चालू", notifOff: "🔕 नोटिफिकेशन बंद",
      login: "लॉगिन", logout: "लॉगआउट", liveMatches: "🔴 लाइव मैच", matchInfo: "मैच जानकारी",
      live: "🔴 लाइव", upcoming: "📅 आगामी", finished: "✅ समाप्त", fav: "⭐ पसंदीदा", myTeams: "⭐ मेरी टीमें",
      search: "🔍 टीम खोजें...", noMatch: "कोई मैच नहीं मिला ⚽", viewStats: "📊 आँकड़े देखें", matchDetails: "📊 मैच विवरण",
      stadium: "🏟 स्टेडियम", country: "🌍 देश", referee: "👨‍⚖️ रेफरी", season: "📅 सीज़न", round: "🏆 राउंड", city: "🏙 शहर",
      standings: "स्टैंडिंग", pos: "स्थान", team: "टीम", p: "खेले", w: "जीत", d: "ड्रॉ", l: "हार", pts: "अंक", close: "बंद करें",
      latestNews: "📰 ताज़ा ख़बरें", footballNews: "📰 फुटबॉल न्यूज़", relatedNews: "संबंधित ख़बरें",
      readFull: "पूरी खबर पढ़ें ↗"
    },
    Urdu: {
      home: "ہوم", liveScores: "لائیو اسکورز", news: "خبریں", rankings: "رینکنگ", topScorers: "ٹاپ اسکوررز",
      lightMode: "☀️ لائٹ موڈ", darkMode: "🌙 ڈارک موڈ", notifOn: "🔔 نوٹیفکیشن آن", notifOff: "🔕 نوٹیفکیشن آف",
      login: "لاگ ان", logout: "لاگ آؤٹ", liveMatches: "🔴 لائیو میچز", matchInfo: "میچ کی معلومات",
      live: "🔴 لائیو", upcoming: "📅 آنے والے", finished: "✅ ختم", fav: "⭐ پسندیدہ", myTeams: "⭐ میری ٹیمیں",
      search: "🔍 ٹیم تلاش کریں...", noMatch: "کوئی میچ نہیں ملا ⚽", viewStats: "📊 اعداد و شمار", matchDetails: "📊 میچ کی تفصیلات",
      stadium: "🏟 اسٹیڈیم", country: "🌍 ملک", referee: "👨‍⚖️ ریفری", season: "📅 سیزن", round: "🏆 راؤنڈ", city: "🏙 شہر",
      standings: "اسٹینڈنگز", pos: "پوزیشن", team: "ٹیم", p: "کھیلے", w: "جیتے", d: "ڈرا", l: "ہارے", pts: "پوائنٹس", close: "بند کریں",
      latestNews: "📰 تازہ ترین خبریں", footballNews: "📰 فٹبال کی خبریں", relatedNews: "متعلقہ خبریں",
      readFull: "پوری خبر پڑھیں ↗"
    },
    Arabic: {
      home: "الرئيسية", liveScores: "النتائج المباشرة", news: "الأخبار", rankings: "التصنيفات", topScorers: "الهدافين",
      lightMode: "☀️ الوضع المضيء", darkMode: "🌙 الوضع المظلم", notifOn: "🔔 الإشعارات مفعلة", notifOff: "🔕 الإشعارات معطلة",
      login: "تسجيل الدخول", logout: "تسجيل الخروج", liveMatches: "🔴 مباريات مباشرة", matchInfo: "معلومات المباراة",
      live: "🔴 مباشر", upcoming: "📅 القادمة", finished: "✅ انتهت", fav: "⭐ المفضلة", myTeams: "⭐ فرقي",
      search: "🔍 ابحث عن فريق...", noMatch: "لم يتم العثور على مباراة ⚽", viewStats: "📊 الإحصائيات", matchDetails: "📊 تفاصيل المباراة",
      stadium: "🏟 الملعب", country: "🌍 البلد", referee: "👨‍⚖️ الحكم", season: "📅 الموسم", round: "🏆 الجولة", city: "🏙 المدينة",
      standings: "الترتيب", pos: "مركز", team: "فريق", p: "لعب", w: "فاز", d: "تعادل", l: "خسر", pts: "نقاط", close: "إغلاق",
      latestNews: "📰 أحدث الأخبار", footballNews: "📰 أخبار كرة القدم", relatedNews: "أخبار ذات صلة",
      readFull: "اقرأ المقال كاملاً ↗"
    },
    French: {
      home: "Accueil", liveScores: "Scores en direct", news: "Actualités", rankings: "Classements", topScorers: "Meilleurs Buteurs",
      lightMode: "☀️ Mode Clair", darkMode: "🌙 Mode Sombre", notifOn: "🔔 Notifications Activées", notifOff: "🔕 Notifications Désactivées",
      login: "Connexion", logout: "Déconnexion", liveMatches: "🔴 Matchs en Direct", matchInfo: "Infos du Match",
      live: "🔴 DIRECT", upcoming: "📅 À VENIR", finished: "✅ TERMINÉ", fav: "⭐ FAVORIS", myTeams: "⭐ MES ÉQUIPES",
      search: "🔍 Chercher une équipe...", noMatch: "Aucun match trouvé ⚽", viewStats: "📊 Voir les stats", matchDetails: "📊 Détails du match",
      stadium: "🏟 Stade", country: "🌍 Pays", referee: "👨‍⚖️ Arbitre", season: "📅 Saison", round: "🏆 Tour", city: "🏙 Ville",
      standings: "Classement", pos: "Pos", team: "Équipe", p: "J", w: "G", d: "N", l: "P", pts: "Pts", close: "Fermer",
      latestNews: "📰 Dernières Actualités", footballNews: "📰 Actualités Football", relatedNews: "Actualités Liées",
      readFull: "Lire l'article complet ↗"
    },
    Spanish: {
      home: "Inicio", liveScores: "Resultados en Vivo", news: "Noticias", rankings: "Clasificaciones", topScorers: "Máximos Goleadores",
      lightMode: "☀️ Modo Claro", darkMode: "🌙 Modo Oscuro", notifOn: "🔔 Notificaciones Activadas", notifOff: "🔕 Notificaciones Desactivadas",
      login: "Iniciar Sesión", logout: "Cerrar Sesión", liveMatches: "🔴 Partidos en Vivo", matchInfo: "Info del Partido",
      live: "🔴 VIVO", upcoming: "📅 PRÓXIMOS", finished: "✅ FINALIZADO", fav: "⭐ FAVORITOS", myTeams: "⭐ MIS EQUIPOS",
      search: "🔍 Buscar equipo...", noMatch: "No se encontraron partidos ⚽", viewStats: "📊 Ver Estadísticas", matchDetails: "📊 Detalles del Partido",
      stadium: "🏟 Estadio", country: "🌍 País", referee: "👨‍⚖️ Árbitro", season: "📅 Temporada", round: "🏆 Ronda", city: "🏙 Ciudad",
      standings: "Clasificación", pos: "Pos", team: "Equipo", p: "PJ", w: "G", d: "E", l: "P", pts: "Pts", close: "Cerrar",
      latestNews: "📰 Últimas Noticias", footballNews: "📰 Noticias de Fútbol", relatedNews: "Noticias Relacionadas",
      readFull: "Leer el artículo completo ↗"
    },
    German: {
      home: "Startseite", liveScores: "Live-Ergebnisse", news: "Nachrichten", rankings: "Ranglisten", topScorers: "Torschützenkönige",
      lightMode: "☀️ Heller Modus", darkMode: "🌙 Dunkler Modus", notifOn: "🔔 Benachrichtigungen EIN", notifOff: "🔕 Benachrichtigungen AUS",
      login: "Anmelden", logout: "Abmelden", liveMatches: "🔴 Live-Spiele", matchInfo: "Spielinfo",
      live: "🔴 LIVE", upcoming: "📅 BEVORSTEHEND", finished: "✅ BEENDET", fav: "⭐ FAVORITEN", myTeams: "⭐ MEINE TEAMS",
      search: "🔍 Team suchen...", noMatch: "Kein Spiel gefunden ⚽", viewStats: "📊 Statistiken ansehen", matchDetails: "📊 Spieldetails",
      stadium: "🏟 Stadion", country: "🌍 Land", referee: "👨‍⚖️ Schiedsrichter", season: "📅 Saison", round: "🏆 Runde", city: "🏙 Stadt",
      standings: "Tabelle", pos: "Pos", team: "Team", p: "Sp", w: "S", d: "U", l: "N", pts: "Pkt", close: "Schließen",
      latestNews: "📰 Neueste Nachrichten", footballNews: "📰 Fußball-Nachrichten", relatedNews: "Ähnliche Nachrichten",
      readFull: "Den ganzen Artikel lesen ↗"
    },
    Portuguese: {
      home: "Início", liveScores: "Resultados ao Vivo", news: "Notícias", rankings: "Classificações", topScorers: "Artilheiros",
      lightMode: "☀️ Modo Claro", darkMode: "🌙 Modo Escuro", notifOn: "🔔 Notificações LIGADAS", notifOff: "🔕 Notificações DESLIGADAS",
      login: "Entrar", logout: "Sair", liveMatches: "🔴 Jogos ao Vivo", matchInfo: "Info da Partida",
      live: "🔴 AO VIVO", upcoming: "📅 PRÓXIMOS", finished: "✅ ENCERRADO", fav: "⭐ FAVORITOS", myTeams: "⭐ MEUS TIMES",
      search: "🔍 Procurar time...", noMatch: "Nenhuma partida encontrada ⚽", viewStats: "📊 Ver Estatísticas", matchDetails: "📊 Detalhes da Partida",
      stadium: "🏟 Estádio", country: "🌍 País", referee: "👨‍⚖️ Árbitro", season: "📅 Temporada", round: "🏆 Rodada", city: "🏙 Cidade",
      standings: "Tabela", pos: "Pos", team: "Time", p: "J", w: "V", d: "E", l: "D", pts: "Pts", close: "Fechar",
      latestNews: "📰 Últimas Notícias", footballNews: "📰 Notícias de Futebol", relatedNews: "Notícias Relacionadas",
      readFull: "Ler o artigo completo ↗"
    },
    Chinese: {
      home: "首页", liveScores: "实时比分", news: "新闻", rankings: "排名", topScorers: "射手榜",
      lightMode: "☀️ 浅色模式", darkMode: "🌙 深色模式", notifOn: "🔔 开启通知", notifOff: "🔕 关闭通知",
      login: "登录", logout: "登出", liveMatches: "🔴 直播比赛", matchInfo: "比赛信息",
      live: "🔴 直播", upcoming: "📅 即将进行", finished: "✅ 已结束", fav: "⭐ 收藏", myTeams: "⭐ 我的球队",
      search: "🔍 搜索球队...", noMatch: "未找到比赛 ⚽", viewStats: "📊 查看统计", matchDetails: "📊 比赛详情",
      stadium: "🏟 体育场", country: "🌍 国家", referee: "👨‍⚖️ 裁判", season: "📅 赛季", round: "🏆 轮次", city: "🏙 城市",
      standings: "积分榜", pos: "排名", team: "球队", p: "赛", w: "胜", d: "平", l: "负", pts: "分", close: "关闭",
      latestNews: "📰 最新新闻", footballNews: "📰 足球新闻", relatedNews: "相关新闻",
      readFull: "阅读全文 ↗"
    },
    Japanese: {
      home: "ホーム", liveScores: "ライブスコア", news: "ニュース", rankings: "順位表", topScorers: "得点王",
      lightMode: "☀️ ライトモード", darkMode: "🌙 ダークモード", notifOn: "🔔 通知オン", notifOff: "🔕 通知オフ",
      login: "ログイン", logout: "ログアウト", liveMatches: "🔴 ライブ試合", matchInfo: "試合情報",
      live: "🔴 ライブ", upcoming: "📅 予定", finished: "✅ 終了", fav: "⭐ お気に入り", myTeams: "⭐ マイチーム",
      search: "🔍 チームを検索...", noMatch: "試合が見つかりません ⚽", viewStats: "📊 統計を見る", matchDetails: "📊 試合詳細",
      stadium: "🏟 スタジアム", country: "🌍 国", referee: "👨‍⚖️ 審判", season: "📅 シーズン", round: "🏆 ラウンド", city: "🏙 都市",
      standings: "順位表", pos: "順位", team: "チーム", p: "試", w: "勝", d: "分", l: "敗", pts: "点", close: "閉じる",
      latestNews: "📰 最新ニュース", footballNews: "📰 サッカーニュース", relatedNews: "関連ニュース",
      readFull: "記事全文を読む ↗"
    }
  };
  export { translations };