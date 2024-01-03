const fetchData = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Fetch failed with status ${response.status}`);
  }

  return response.json();
};

const { NEXT_PUBLIC_API_PROD_URL_STRAPI, NEXT_PUBLIC_API_STRAPI_DEV_URL, NODE_ENV } = process.env;

const PROD = NODE_ENV === "production";

const baseURL = PROD ? NEXT_PUBLIC_API_PROD_URL_STRAPI : NEXT_PUBLIC_API_STRAPI_DEV_URL;

export { baseURL, fetchData };
