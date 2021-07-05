import ApiServices from "../ApiServices";

const getAllPostCategories = async () => {
  try {
    const url = "post/category/get";
    const data = await ApiServices.get(url);
    return data.categories;
  } catch (error) {
    throw error;
  }
};

const getPostCategories = async () => {
  try {
    const url = "post/category/getVisible";
    const data = await ApiServices.get(url);
    return data.categories;
  } catch (error) {
    throw error;
  }
};

const getPostCategoryById = async id => {
  try {
    const url = `post/category/${id}`;
    const data = await ApiServices.get(url);
    return data.categories;
  } catch (error) {
    throw error;
  }
};

const createPost = async postData => {
  try {
    const url = "post/add";
    const method = "POST";
    const data = await ApiServices.requestOption(method, url, postData);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const editPost = async postData => {
  try {
    const url = "post/edit";
    const method = "PUT";
    const data = await ApiServices.requestOption(method, url, postData);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const deletePost = async postData => {
  try {
    const url = "post/deleteById";
    const method = "DELETE";
    const data = await ApiServices.requestOption(method, url, postData);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const url = `post/get`;
    const data = await ApiServices.get(url);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const getPostByType = async typeId => {
  try {
    const url = `post/get/${typeId}`;
    const data = await ApiServices.get(url);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const getPostByOwner = async ownerId => {
  try {
    const url = `post/${ownerId}`;
    const data = await ApiServices.get(url);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const getPostById = async postId => {
  try {
    const url = `post/getById/${postId}`;
    const data = await ApiServices.get(url);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const searchPostByText = async text => {
  try {
    const url = `post/search?title=${text}`;
    const data = await ApiServices.get(url);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const getVote = async (postId, voteType) => {
  try {
    const url = `post/vote/get?postId=${postId}&voteType=${voteType}`;
    const data = await ApiServices.get(url);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const vote = async voteData => {
  try {
    const url = `post/vote`;
    const method = "POST";
    const data = await ApiServices.requestOption(method, url, voteData);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const report = async report => {
  try {
    const url = `report/addReport`;
    const method = "POST";
    const data = await ApiServices.requestOption(method, url, report);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const addComment = async comment => {
  try {
    const url = `post/comment/add`;
    const method = "POST";
    const data = await ApiServices.requestOption(method, url, comment);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const getComments = async postId => {
  try {
    const url = `post/comment/${postId}`;
    const data = await ApiServices.get(url);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const editComment = async comment => {
  try {
    const url = `post/report/add`;
    const method = "POST";
    const data = await ApiServices.requestOption(method, url, report);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const deleteComment = async comment => {
  try {
    const url = `post/report/add`;
    const method = "POST";
    const data = await ApiServices.requestOption(method, url, report);
    return data.result;
  } catch (error) {
    throw error;
  }
};

export default {
  getPostCategories,
  getPostCategoryById,
  getAllPostCategories,
  createPost,
  editPost,
  deletePost,
  getPostByType,
  getPostByOwner,
  searchPostByText,
  getAll,
  vote,
  getVote,
  report,
  addComment,
  getComments,
  editComment,
  deleteComment,
  getPostById,
};
