
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

export const getUkBottomWealthDistro = async () => {
  const endpoint = '/uk-data/uk-bottom-wealth-distro';
  const options = {
    method: 'GET'
  }
  return apiFetch(endpoint, options);
}

export const getUkTopHundredWealthiest = async () => {
  const endpoint = '/uk-data/uk-wealth-top-100';
  const options = {
    method: 'GET'
  }
  return apiFetch(endpoint, options);
}

export const getUkGiniCoefficient = async () => {
  const endpoint = '/uk-data/uk-gini-coef';
  const options = {
    method: 'GET'
  }
  return apiFetch(endpoint, options);
}
