export default class ApiUtil {
  static baseUrl = process.env.REACT_APP_REWARD_API

  static getHeader({ token }) {
    let header = {
      "Content-type": "application/json",
    };

    if (token) {
      header["Authorization"] = `Token ${token}`;
    }
    return header;
  }    
};