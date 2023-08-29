import Axios from "axios";
import ApiUtil from "../utils/ApiUtil";

let result = {
  status: null,
  data: [],
  message: "",
};

const HomeStore = {
  state: {
    product: null,
  },
  reducers: {
    setProduct(state, payload) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    async getProducts(payload, rootState) {
      const { page, types, priceRange } = payload;

      let extraParams = `?page=${page}&perPage=5`
      if(types) {
        extraParams += `&type=${types}`
      }

      if(priceRange) {
        extraParams += `&priceRange=${priceRange}`
      }

      await Axios.get(`${ApiUtil.baseUrl}/mobile/v1/reward${extraParams}`, {
        headers: ApiUtil.getHeader({ token: rootState.LoginStore.loginData.token }),
        withCredentials: false,
      })
        .then((response) => {
          result.status = response.data.success;
          result.data = response.data.data;
        })
        .catch((error) => {
          result.status = error.status;
          result.message = error.statusText;
        });

      return result;
    },
  })
};

export default HomeStore;
