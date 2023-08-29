import Axios from "axios";
import ApiUtil from "../utils/ApiUtil";
import { LoginModel } from "../models/LoginModel";

let result = {
  status: null,
  data: [],
  message: "",
};

const LoginStore = {
  state: {
    loginData: new LoginModel({}),
  },
  reducers: {
    setLoginData(state, payload) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    async loginAuth(payload) {
      await Axios.post(`${ApiUtil.baseUrl}/v1/login`, payload)
        .then((response) => {
          const responseData = response.data;
          if(responseData.data) {
            dispatch.LoginStore.setLoginData({ loginData: responseData.data })
            result.data = responseData.data;
          }

          result.status = responseData.success;          
        })
        .catch((error) => {          
          throw error;
        });

      return result;
    },
  })
};

export default LoginStore;
