export default {
  namespace: 'global',
  state: {
    menuCollapsed: false,
  },
  reducers: {
    saveCollapsed(state) {
      return { ...state, menuCollapsed: !state.menuCollapsed };
    },
  },
  effects: {
    *menuCollapsedToggle(_, { put }) {
      yield put({ type: 'saveCollapsed' });
    },
  },
};
