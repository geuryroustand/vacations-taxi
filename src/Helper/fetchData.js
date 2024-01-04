export const fetchData = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Fetch failed with status ${response.status}`);
  }

  return response.json();
};

const PROD = process.env.NODE_ENV === "production";
export const baseURL = PROD
  ? process.env.NEXT_PUBLIC_API_PROD_URL_STRAPI
  : process.env.NEXT_PUBLIC_API_STRAPI_DEV_URL;
