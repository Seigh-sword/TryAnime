const API_BASE = "https://api.jikan.moe/v4";

async function getTrending() {
    const res = await fetch(`${API_BASE}/top/anime`);
    const json = await res.json();
    return json.data;
}

async function searchAnime(params = {}) {
    const { keyword, age, filter } = params;
    let url = new URL(`${API_BASE}/anime`);
    
    if (keyword) url.searchParams.append('q', keyword);
    if (age) url.searchParams.append('rating', age);
    if (filter) url.searchParams.append('type', filter);
    
    const res = await fetch(url);
    const json = await res.json();
    return json.data;
}

async function getAnimeById(id) {
    const res = await fetch(`${API_BASE}/anime/${id}`);
    const json = await res.json();
    return json.data;
}

export { getTrending, searchAnime, getAnimeById };