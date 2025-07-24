import {create} from 'apisauce';
import {ApiSauceJson, ApiSauceJsonMulitpart} from './Config';
const ApiSauce = create(ApiSauceJson);
const ApiSauceMultiPart = create(ApiSauceJsonMulitpart);

export const request = (path, json) => {
  return new Promise((resolve, reject) => {
    console.log('path', path);
    console.log('json', json);
    ApiSauce.post(path, json).then(response => {

      if (response.ok) {
        // console.log('path', path);
        // console.log('json', json);
        // console.log(JSON.stringify(response.data, null, 2));
        resolve(response.data);
      } else {
        console.log("hello")
        console.log(JSON.stringify(response),null,2);
        reject(response.err);
      }
    });
  });
};
export const requestMultipart = (path, form) => {
  return new Promise((resolve, reject) => {
    ApiSauceMultiPart.post(path, form).then(response => {
      if (response.ok) {
        resolve(response.data);
      } else {
        reject(response);
      }
    });
  });
};
