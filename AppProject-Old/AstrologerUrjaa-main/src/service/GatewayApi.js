const paytmConfig = {
  MID: 'ONSTEC98627930489094',
  WEBSITE: 'APPSTAGING',
  CHANNEL_ID: 'WAP',
  INDUSTRY_TYPE_ID: 'Retail',
  // CALLBACK_URL: 'https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=',
  CALLBACK_URL: 'https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=',
};
const paytmPaymentJson = (config) => ({
  mode: 'Staging', // 'Staging' or 'Production'
  MID: paytmConfig.MID,
  INDUSTRY_TYPE_ID: paytmConfig.INDUSTRY_TYPE_ID,
  WEBSITE: paytmConfig.WEBSITE,
  CHANNEL_ID: paytmConfig.CHANNEL_ID,
  TXN_AMOUNT: `${config.taxAmt}`, // String
  ORDER_ID: config.orderId, // String
  EMAIL: config.email, // String
  MOBILE_NO: config.mobile, // String
  CUST_ID: config.customerId, // String
  CHECKSUMHASH: config.CHECKSUMHASH, //From your server using PayTM Checksum Utility
  CALLBACK_URL: `${paytmConfig.CALLBACK_URL}${config.orderId}`,
  // MERC_UNQ_REF: mercUnqRef, // optional
});

const checksumJson = (config) => ({
  MID: paytmConfig.MID,
  ORDER_ID: config.orderId,
  CUST_ID: config.customerId,
  INDUSTRY_TYPE_ID: 'Retail',
  CHANNEL_ID: 'WAP',
  TXN_AMOUNT: config.taxAmt,
  WEBSITE: 'APPSTAGING',
  MOBILE_NO: config.mobile,
  EMAIL: config.email,
  CALLBACK_URL: `${paytmConfig.CALLBACK_URL}${config.orderId}`,
});

export const checkSumApi = (config) => {
  return new Promise((resolve, reject) => {
    fetch('http://139.59.76.223/cab/paytm/generateChecksum.php', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checksumJson(config)),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.CHECKSUMHASH) {
          config.CHECKSUMHASH = responseJson.CHECKSUMHASH;
          resolve(paytmPaymentJson(config));
        } else reject(responseJson);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
