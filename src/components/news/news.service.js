import { API_KEY } from "../../constants";

export const loadNews = async (store) => {
  const { sources, pageSize, page, q } = store.state;
  let url = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&language=en&pageSize=${pageSize}&page=${page}`;

  if (sources && sources.length) {
    url += `&sources=${sources.join(',')}`;
  }
  if (q) {
    url += `&q=${q}`;
  }

  try {
    const response = await fetch(encodeURI(url));

    return await response.json();
  } catch ({ message }) {
    return { isFailed: true, message };
  }
};
