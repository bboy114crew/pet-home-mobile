import ApiServices from "../ApiServices";
import ExpoService from "../ExpoService";
const login = async userData => {
  try {
    const method = "POST";
    const funcUrl = "app/user/add";
    const data = await ApiServices.requestOption(method, funcUrl, userData);
    const token = await ExpoService.getExpoToken();
    const user = data.result;
    await registerToken(user._id, token);
    return user;
  } catch (error) {
    throw error;
  }
};

const registerToken = async (userId, expoToken) => {
  try {
    const method = "POST";
    const funcUrl = "app/user/addExpoToken";
    const data = await ApiServices.requestOption(method, funcUrl, {
      userId,
      expoToken,
    });
    return data.result;
  } catch (error) {
    throw error;
  }
};

const removeToken = async userId => {
  try {
    const method = "POST";
    const funcUrl = "app/user/removeExpoToken";
    const data = await ApiServices.requestOption(method, funcUrl, { userId });
    return data.result;
  } catch (error) {
    throw error;
  }
};

const getNotifications = async userId => {
  try {
    const funcUrl = `app/notification/${userId}`;
    const data = await ApiServices.get(funcUrl);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const getNotificationsByType = async (userId, type) => {
  try {
    const funcUrl = `app/notification/getType/${userId}/${type}`;
    const data = await ApiServices.get(funcUrl);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const sendNotification = async notification => {
  try {
    const funcUrl = `app/notification/add`;
    const method = "POST";
    const data = await ApiServices.requestOption(method, funcUrl, notification);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const hideNotification = async (notificationId, userId) => {
  try {
    const funcUrl = `app/notification/hide`;
    const method = "POST";
    const data = await ApiServices.requestOption(method, funcUrl, {
      notificationId,
      userId,
    });
    return data.result;
  } catch (error) {
    throw error;
  }
};

const findUser = async userId => {
  try {
    const funcUrl = `app/user/${userId}`;
    const data = await ApiServices.get(funcUrl);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const editInfo = async (userId, updateOption) => {
  try {
    const method = "POST";
    const funcUrl = "app/user/editInfo";
    const data = await ApiServices.requestOption(method, funcUrl, {
      userId,
      updateOption,
    });
    return data.result;
  } catch (error) {
    throw error;
  }
};

export default {
  login,
  findUser,
  registerToken,
  removeToken,
  getNotifications,
  getNotificationsByType,
  sendNotification,
  hideNotification,
  editInfo,
};
