import ApiServices from "../ApiServices";

const addPet = async pet => {
  try {
    const url = "pet/add";
    const method = "POST";
    const result = await ApiServices.requestOption(method, url, pet);
    return result;
  } catch (error) {
    throw error;
  }
};

const getPetByOwner = async userId => {
  try {
    const url = `pet/get/${userId}`;
    const data = await ApiServices.get(url);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const getPet = async userId => {
  try {
    const url = `pet/getNotIgnoredPet/${userId}`;
    const data = await ApiServices.get(url);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const getPetById = async petId => {
  try {
    const url = `pet/getById/${petId}`;
    const data = await ApiServices.get(url);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const editPet = async data => {
  try {
    const url = "pet/editPet";
    const method = "POST";
    const result = await ApiServices.requestOption(method, url, data);
    return result;
  } catch (error) {
    throw error;
  }
};

const deletePet = async petId => {
  try {
    const url = "pet/deletePet";
    const method = "DELETE";
    const result = await ApiServices.requestOption(method, url, { id: petId });
    return result;
  } catch (error) {
    throw error;
  }
};

const getLikeNumber = async petId => {
  try {
    const url = `pet/getLikeNumber/${petId}`;
    const data = await ApiServices.get(url);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const like = async (petId, userId) => {
  try {
    const url = `pet/like`;
    const method = "POST";
    const result = await ApiServices.requestOption(method, url, {
      petId,
      userId,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const isLiked = async (petId, userId) => {
  try {
    const url = `pet/isLiked?petId=${petId}&userId=${userId}`;
    const data = await ApiServices.get(url);
    return data.result ? data.result.user : null;
  } catch (error) {
    throw error;
  }
};

const ignore = async (petId, userId) => {
  try {
    const url = `pet/ignore`;
    const method = "POST";
    const result = await ApiServices.requestOption(method, url, {
      petId,
      userId,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const requestMatch = async data => {
  try {
    const url = `app/notification/add`;
    const method = "POST";
    const result = await ApiServices.requestOption(method, url, data);
    return result;
  } catch (error) {
    throw error;
  }
};

const changeStatus = async (notificationId, status, notification) => {
  try {
    const url = `pet/changeRequestStatus`;
    const method = "POST";
    const result = await ApiServices.requestOption(method, url, {
      notificationId,
      status,
      notification
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export default {
  addPet,
  getPetByOwner,
  getPet,
  getPetById,
  editPet,
  deletePet,
  getLikeNumber,
  like,
  ignore,
  isLiked,
  requestMatch,
  changeStatus,
};
