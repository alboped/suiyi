import translate from "google-translate-open-api";
import axios from "axios";
import md5 from "md5";

const baiduInstance = axios.create({
  baseURL: "https://fanyi-api.baidu.com/api/trans/vip/translate",
  timeout: 2000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});

const getFormData = params => {
  const formData = new FormData();

  for (const key in params) {
    formData.append(key, params[key]);
  }

  return formData;
};

export const googleTranslate = text => {
  return translate(text, {
    to: "en",
    browers: true
  });
};

/**
 * 百度翻译
 * @param {String} text 翻译原文
 */
export const baiduTranslate = q => {
  const appid = process.env.VUE_APP_BAIDU_APPID;
  const secretKey = process.env.VUE_APP_BAIDU_SECRET_KEY;
  const salt = Date.now() - Math.round(Math.random() * 1000000);
  const sign = md5(`${appid}${q}${salt}${secretKey}`);

  const formData = getFormData({
    q,
    from: "en",
    to: "zh",
    appid,
    salt,
    sign
  });

  return baiduInstance.post("", formData);
};
