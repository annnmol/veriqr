let BASE_URL = process.env.EXPO_PUBLIC_CDN_BUCKET_PUBLIC_ASSETS_BASE_URL!;

BASE_URL = BASE_URL; //add custom path

function getPublicAssets(path: string) {
  return BASE_URL + path;
}

export default getPublicAssets;
