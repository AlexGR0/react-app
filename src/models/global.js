export default {
  namespace: 'global',
  state: {
    menuCollapsed: false,
    locale: 'zh',
  },
  reducers: {
    saveMenuCollapsed(state) {
      return { ...state, menuCollapsed: !state.menuCollapsed };
    },
    saveLocale(state) {
      return { ...state, locale: state.locale === 'zh' ? 'en' : 'zh' };
    },
  },
  effects: {
    *menuCollapsedToggle(_, { put }) {
      yield put({ type: 'saveMenuCollapsed' });
    },
    *localeToggle(_, { put }) {
      yield put({ type: 'saveLocale' });
    },
  },
};
