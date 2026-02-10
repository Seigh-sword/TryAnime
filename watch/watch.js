import { loadIcons } from '../assets/icon-index.js';
import { getAnimeById } from '../engine/importer.js';

let iconCache = null;

document.addEventListener('DOMContentLoaded', async () => {
    iconCache = await loadIcons();
    
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (id) {
        const anime = await getAnimeById(id);
        setupPage(anime);
    }
});

function setupPage(anime) {
    document.getElementById('anime-title').innerText = anime.title;
    document.getElementById('anime-synopsis').innerText = anime.synopsis;
    document.getElementById('anime-rating').innerText = anime.rating?.split(' ')[0] || 'N/A';
    document.getElementById('anime-status').innerText = anime.status;
    document.getElementById('anime-score').innerText = ` ${anime.score || 'N/A'}`;

    if (anime.trailer?.embed_url) {
        document.getElementById('video-frame').innerHTML = `
            <iframe src="${anime.trailer.embed_url}?autoplay=0" frameborder="0" allowfullscreen></iframe>
        `;
    }

    setupToggles();
}

function setupToggles() {
    const heartBtn = document.getElementById('fav-toggle');
    const starBtn = document.getElementById('star-toggle');
    const heartImg = document.getElementById('heart-img');
    const starImg = document.getElementById('star-img');

    let isFav = false;
    let isWatchlist = false;

    heartBtn.onclick = () => {
        isFav = !isFav;
        heartImg.src = isFav ? iconCache.heartActive : iconCache.heart;
        heartBtn.style.borderColor = isFav ? 'var(--primary)' : 'rgba(255,255,255,0.1)';
    };

    starBtn.onclick = () => {
        isWatchlist = !isWatchlist;
        starImg.src = isWatchlist ? iconCache.starActive : iconCache.star;
        starBtn.style.borderColor = isWatchlist ? 'var(--primary)' : 'rgba(255,255,255,0.1)';
    };
}