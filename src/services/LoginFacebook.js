import UserServices from "./UserServices";

export const loginFb = async () => {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
    "2349961725231282",
    {
      permissions: ["public_profile"],
    }
  );
  if (type === "success") {
    try {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture,first_name,middle_name,last_name`
      );
      const responsePic = await fetch(
        `https://graph.facebook.com/v3.2/me/picture?type=large&redirect=false&access_token=${token}`
      );
      const responseJson = await response.json();
      const responsePicJson = await responsePic.json();
      const userData = {
        facebookId: responseJson.id,
        appName: responseJson.name,
        avatar: responsePicJson.data.url,
        role: 2,
      };
      const result = await UserServices.login(userData);
      return result;
    } catch (error) {
      throw error;
    }
  }
  return null;
};

export const getUserPicture = (id, type) => {};
