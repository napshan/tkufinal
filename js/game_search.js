const API_URL = 'https://script.google.com/macros/s/AKfycbzt34B86tOAWs70_iFRXoG51-VEdOdu154-j9kjZSdwLtz_dbWemRkPsa0SVEyoYlZlbw/exec';

async function searchGames(query) {
  const url = `${API_URL}?q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { mode: 'cors' });
  if (!res.ok) throw new Error(`Server returned ${res.status}`);

  const text = await res.text();
  // 1. 嘗試直接 JSON.parse
  try {
    return JSON.parse(text);
  } catch (e) {
    // 2. 如果開頭是 callback(…);，就拆掉包裝
    const stripped = text.replace(/^\s*callback\(([\s\S]+)\);\s*$/, '$1');
    return JSON.parse(stripped);
  }
}
// 使用範例
document.getElementById('searchBtn').addEventListener('click', async () => {
  try {
    const q = document.getElementById('searchInput').value;
    const games = await searchGames(q);
    renderResults(games);
  } catch (err) {
    console.error(err);
    alert('搜尋失敗，請稍後再試');
  }
});

/**
 * 將搜尋結果渲染到畫面上
 * @param {Array} games — 後端回傳的遊戲物件陣列
 */
function renderResults(games) {
  const container = document.getElementById('searchResult');
  container.innerHTML = '';

  if (!games.length) {
    container.innerHTML = '<p class="no-results">找不到符合條件的桌遊。</p>';
    return;
  }

  // 用 Grid 讓多筆結果排得整齊
  const grid = document.createElement('div');
  grid.classList.add('games-grid');

  games.forEach(game => {
    const card = document.createElement('div');
    card.classList.add('game-card');

    // —— 只有有 imageUrl 的才插圖 —— 
    if (game.imageUrl && game.imageUrl.trim() !== '') {
      const img = document.createElement('img');
      img.src = game.imageUrl;
      img.alt = game.name;
      img.classList.add('game-img');
      card.appendChild(img);
    }

    const info = document.createElement('div');
    info.classList.add('game-info');
    info.innerHTML = `
      <h4 class="game-name">${game.name}</h4>
      <p>遊玩時間：${game.duration}</p>
      <p>人數：${game.players}</p>
      <p>類型：${game.type}</p>
      <p>難度：${game.difficulty}</p>
      <p>推薦：${game.recommended}</p>
    `;
    card.appendChild(info);

    grid.appendChild(card);
  });

  container.appendChild(grid);
}
