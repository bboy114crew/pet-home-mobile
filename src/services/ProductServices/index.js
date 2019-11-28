import ApiServices from "../ApiServices";
import axios from "axios";
import { API_URL } from "../../constants/config";
import qs from 'qs';

const getProductDetail = async data => {
  try {
    const url = API_URL + 'product/productByIdForApp';
    const result = await axios.get(url, {
      params: {
        id: data.id
      },
      paramsSerializer: params => {
        return qs.stringify(params)
      } 
    });
    return result.data.productDetailForApp;
  } catch (error) {
    throw error;
  }
};

const getProductInOneCategories = async data => {
  try {
    const url = API_URL + 'product/productInOneCategories';
    const result = await axios.get(url, {
      params: {
        typeId: data.typeId
      },
      paramsSerializer: params => {
        return qs.stringify(params)
      } 
    });
    return result.data.productInOneCategories;
  } catch (error) {
    throw error;
  }
};

export default {
  getProductDetail,
  getProductInOneCategories
};
