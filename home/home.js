import { loadIcons } from '../assets/icon-index.js';
import { getTrending } from '../engine/importer.js';

document.addEventListener('DOMContentLoaded', async () => {
    const iconData = await loadIcons();
    
    const trendingList = await getTrending();
    renderHome(trendingList);
});

function renderHome(list) {
    const grid = document.getElementById('trending-grid');
    if (!grid) return;

    grid.innerHTML = '';

    list.forEach((anime, index) => {
        const card = document.createElement('div');
        card.className = 'anime-card';
        card.style.animationDelay = `${index * 0.05}s`;
        
        card.innerHTML = `
            <div class="img-container">
                <img src="${anime.images.jpg.image_url}" alt="${anime.title}" loading="lazy">
                <div class="rating-badge">${anime.rating ? anime.rating.split(' ')[0] : 'N/A'}</div>
            </div>
            <div class="card-info">
                <h3>${anime.title}</h3>
                <p>${anime.type} • ${anime.episodes || '?'} Episodes</p>
            </div>
        `;

        card.onclick = () => {
            window.location.href = `../watch/?id=${anime.mal_id}`;
        };

        grid.appendChild(card);
    });
}