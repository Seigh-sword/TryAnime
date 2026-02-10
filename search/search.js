import { loadIcons } from '../assets/icon-index.js';
import { searchAnime } from '../engine/importer.js';

document.addEventListener('DOMContentLoaded', async () => {
    await loadIcons();
    
    const urlParams = new URLSearchParams(window.location.search);
    const keyword = urlParams.get('keyword');
    const age = urlParams.get('age');

    if (keyword) {
        document.getElementById('search-input').value = keyword;
        document.getElementById('search-query-text').innerText = `Results for "${keyword}"`;
    } else if (age) {
        document.getElementById('search-query-text').innerText = `Rating: ${age.toUpperCase()}`;
    }

    const results = await searchAnime({
        keyword: keyword,
        age: age
    });

    renderResults(results);
});

function renderResults(list) {
    const container = document.getElementById('search-grid');
    const countLabel = document.getElementById('results-count');
    container.innerHTML = '';

    if (!list || list.length === 0) {
        countLabel.innerText = "0 items found";
        container.innerHTML = '<div class="no-results">No anime matches your criteria.</div>';
        return;
    }

    countLabel.innerText = `${list.length} items found`;

    list.forEach((anime, index) => {
        const card = document.createElement('div');
        card.className = 'anime-card';
        card.style.animationDelay = `${index * 0.05}s`;
        
        card.innerHTML = `
            <div class="img-container">
                <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                <div class="rating-badge">${anime.rating ? anime.rating.split(' ')[0] : 'N/A'}</div>
            </div>
            <div class="card-info">
                <h3>${anime.title}</h3>
                <p>${anime.type} • ${anime.score || 'N/A'} </p>
            </div>
        `;
        
        card.onclick = () => window.location.href = `../watch/?id=${anime.mal_id}`;
        container.appendChild(card);
    });
}