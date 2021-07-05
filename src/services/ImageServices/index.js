import axios from "axios";
const CryptoJS = require("crypto-js");

var UploadCancelToken = axios.CancelToken;
var uploadCancel;

const cancelUpload = () => {
  if (uploadCancel != undefined) {
    uploadCancel();
  }
};

const uploadImage = async image => {
  try {
    const imageType = image.uri.substring(
      image.uri.length - 3,
      image.uri.length
    );
    const file = {
      uri: image.uri,
      type: `image/${imageType}`,
      name: "upload_at_" + Date.now(),
    };
    let timestamp = Date.now();
    let api_key = "725922376825761";
    let api_secret = "GVaWC1LcMS4hZHvyoZitrm8qcWE";
    let hash_string = `timestamp=${timestamp}` + api_secret;
    let signature = CryptoJS.SHA1(hash_string).toString();

    let url = "https://api.cloudinary.com/v1_1/weteam/image/upload";
    let method = "POST";

    let formData = new FormData();
    formData.append("file", file);
    formData.append("timestamp", timestamp);
    formData.append("api_key", api_key);
    formData.append("signature", signature);
    let result = await axios({
      url,
      method,
      data: formData,
      headers: { "X-Requested-With": "XMLHttpRequest" },
      cancelToken: new UploadCancelToken(c => {
        uploadCancel = c;
      }),
    });
    return result.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw error;
    } else {
      throw error;
    }
  }
};

const destroyImage = async publicId => {
  try {
    let timestamp = Date.now();
    let api_key = "725922376825761";
    let api_secret = "GVaWC1LcMS4hZHvyoZitrm8qcWE";
    let hash_string =
      `public_id=${publicId}&timestamp=${timestamp}` + api_secret;
    let signature = CryptoJS.SHA1(hash_string).toString();

    let url = "https://api.cloudinary.com/v1_1/weteam/image/destroy";
    let method = "POST";

    let formData = new FormData();
    formData.append("public_id", publicId);
    formData.append("timestamp", timestamp);
    formData.append("api_key", api_key);
    formData.append("signature", signature);
    let result = await axios({
      url,
      method,
      data: formData,
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export default {
  uploadImage,
  destroyImage,
  cancelUpload,
};
