const main = {
  state: {
    msg: '',
  },
  mutations: {
    setMsg(state: any, data: any) {
      state.msg = data;
      console.log(state.msg, data);
    },
  },
};

export default main;
