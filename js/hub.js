// Renders GAMES (js/games.js) into cards using the #game-card template.
(function () {
  const list = document.getElementById('games');
  const tpl = document.getElementById('game-card');

  for (const game of GAMES) {
    const card = tpl.content.cloneNode(true);
    card.querySelector('.thumb').href = game.play;
    const img = card.querySelector('img');
    img.src = game.image;
    img.alt = `${game.title} screenshot`;
    card.querySelector('h2').textContent = game.title;
    card.querySelector('.blurb').textContent = game.blurb;

    const tags = card.querySelector('.tags');
    for (const t of game.tags) {
      const li = document.createElement('li');
      li.textContent = t;
      tags.appendChild(li);
    }

    const play = card.querySelector('.play');
    play.href = game.play;
    play.setAttribute('aria-label', `Play ${game.title}`);
    const source = card.querySelector('.source');
    source.href = game.source;
    source.setAttribute('aria-label', `${game.title} source code`);

    list.appendChild(card);
  }
})();
