export default {
  namespace: 'global',
  state: {
    count: 0,
  },
  reducers: {
    increment(state) {
      return { ...state, count: state.count + 1 };
    },
    decrement(state) {
      return { ...state, count: state.count - 1 };
    },
  },
  effects: {
    *incrementAsync({ payload }, { call, put }) {
      yield call(delay, 1000);
      console.log(payload, 123);
      yield put({ type: 'increment' });
    },
  },
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
