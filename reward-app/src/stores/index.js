import { init } from "@rematch/core";
import createLoadingPlugin from "@rematch/loading";
import createPersistPlugin from "@rematch/persist";
import storage from "redux-persist/lib/storage";
import RootStore from "./RootStore";
import HomeStore from "./HomeStore";
import LoginStore from "./LoginStore";

const persistConfig = {
  key: "root",
  storage,
};

const stores = init({
  models: {
    RootStore,
    LoginStore,
    HomeStore,    
  },
  plugins: [
    createLoadingPlugin({ asNumber: false }),
    createPersistPlugin(persistConfig),
  ],
  redux: {
    devtoolOptions: {},
    rootReducers: { RESET_APP: () => undefined },
  },
});

export default stores;