import { API_KEY } from "../../constants";

export const loadSources = async () => {
  const url = `https://newsapi.org/v2/top-headlines/sources?apiKey=${API_KEY}&language=en`;

  try {
    const response = await fetch(encodeURI(url));
    const {sources} = await response.json();

    return sources.slice(0, 100);
  } catch (e) {
    throw new Error('Failed to fetch sources.');
  }
};
