const RootStore = {
state: {
    showNavbar: false,
    filter: {}
},
reducers: {
    setRoot(state, payload) {
    return {
        ...state,
        ...payload,
    };
    },
},
effects: (dispatch) => ({
    // Create your dispatch here
}),
};

export default RootStore;
