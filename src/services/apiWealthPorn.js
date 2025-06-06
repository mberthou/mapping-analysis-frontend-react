
async function apiFetch(endpoint, options = {}, retry = true) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  const response = await fetch(`${import.meta.env.VITE_WEALTHPORN_API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok && retry) {
    try {
      return apiFetch(endpoint, { ...options }, false); // Retry once
    } catch (err) {
      throw new Error(`API error (${response.status})`);
    }
  }
  else if (!response.ok && !retry) {
    const error = await response.json();
    throw new Error((error.message || 'API error') + ` (${response.status})`);
  }

  return await response.json();
}

export const getUkTopWealthDistro = async () => {
  const endpoint = '/uk-data/uk-top-wealth-distro';
  const options = {
    method: 'GET'
  }
  return apiFetch(endpoint, options);
}

export const getDiscogsIdForArtist = async (searchInput) => {
  const endpoint = '/database/search?q=' + searchInput + '&' + KEY_SECRET_PARAMS;
  const options = {
    method: 'GET'
  }
  const data = await apiFetch(endpoint, options);
  const artists = data.results.filter((resultItem) => resultItem.type === "artist");
  return artists[0].id; // naive selection of 1st artist in the list
}

export const getDiscogsImgURLsForArtist = async (artistDiscogsId) => {
  const endpoint = '/artists/' + artistDiscogsId + '?' + KEY_SECRET_PARAMS;
  const options = {
    method: 'GET'
  }
  const data = await apiFetch(endpoint, options);
  const imgURLs = data.images.map((imageSet) => imageSet.uri);
  return imgURLs;
}