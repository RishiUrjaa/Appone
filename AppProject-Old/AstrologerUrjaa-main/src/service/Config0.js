const webClientId =
  '207538176069-cgih256ia35b2jlbcm1ta837l79kas22s.apps.googleusercontent.com';
const BASE_URL = 'https://astrourjaa.com/dev/admin/admin_ci/api/';
export const SOCKET_URL = 'http://astrourjaa.com:5050';
export const SOCKET_URL_2 = 'http://astrourjaa.com:5050/api/';
export const Apikey = 's@##@17$';
export const GOOGLE_MAPS_APIKEY = 'AIzaSyBaZc4wDnH_Nb31HYqFx-LUrt_rzO0yk5U';
export const GoogleSigninJson = {
  webClientId: webClientId,
  offlineAccess: true,
  hostedDomain: '',
  forceConsentPrompt: true,
};
export const ApiSauceJson = {
  baseURL: BASE_URL,
  headers: {
    HTTP_X_API_KEY: Apikey,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};
export const ApiSauceJsonMulitpart = {
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
};
export const latitudeDelta = 0.0922;
