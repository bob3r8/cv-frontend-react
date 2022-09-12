const host = '';
const API_URL = host + '/api';

export async function getData(lang, path) {
    const url = API_URL + path;
    var response = await fetch(url, {method: 'GET', headers: {'Accept-Language': lang}})
    var out = await response.json()
    return out
}
