// Node v10.15.3
// const axios = require('axios').default; // npm install axios
// const CryptoJS = require('crypto-js'); // npm install crypto-js

// const config = {
//   appid: "553",
//   key1: "9phuAOYhan4urywHTh0ndEXiV3pKHr5Q",
//   key2: "Iyz2habzyr7AG8SgvoBCbKwKi3UzlLi3",
//   endpoint: "https://sbgateway.zalopay.vn/api/getlistmerchantbanks"
// };

// let reqtime = Date.now();
// let params = {
//   appid: config.appid,
//   reqtime: reqtime, // miliseconds
//   mac: CryptoJS.HmacSHA256(config.appid + "|" + reqtime, config.key1).toString() // appid|reqtime
// };

// export const getPayZalo = () => {
//   axios.get(config.endpoint, { params })
//     .then(res => {
//       let banks = res.data.banks;
//       for (let id in banks) {
//         let banklist = banks[id];
//         console.log(id + ".");
//         for (let bank of banklist) {
//           console.log(bank);
//         }
//       }
//     })
//     .catch(err => console.error(err));
// }

