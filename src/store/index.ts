import { createStore } from 'vuex';
import user from './modules/account';
import main from './modules/main';

const store = createStore({
  ...user,
  ...main,
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  // modules: {},
});

export default store;
