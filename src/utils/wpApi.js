// WordPress API client utility
const LOCAL_WP_URL = 'http://improx-tech.local/wp-json/wp/v2';
const PUBLIC_WP_URL = 'https://public-api.wordpress.com/wp/v2/sites/improxtech.wordpress.com';
const FALLBACK_WP_URL = 'https://improxtech.wordpress.com/wp-json/wp/v2';

export const getWpUrls = (pathAndQuery) => {
  return [
    `${LOCAL_WP_URL}${pathAndQuery}`,
    `${FALLBACK_WP_URL}${pathAndQuery}`,
    `${PUBLIC_WP_URL}${pathAndQuery}`,
  ];
};

export const fetchFromWp = async (pathAndQuery) => {
  const urls = getWpUrls(pathAndQuery);
  let lastError;

  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      return await res.json();
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('Failed to fetch from WordPress API');
};
