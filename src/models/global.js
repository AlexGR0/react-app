export default {
  namespace: 'global',
  state: {
    menuCollapsed: false,
    locale: 'zh',
    mainColor: '#b682ff',
  },
  reducers: {
    saveMenuCollapsed(state) {
      return { ...state, menuCollapsed: !state.menuCollapsed };
    },
    saveLocale(state) {
      return { ...state, locale: state.locale === 'zh' ? 'en' : 'zh' };
    },
    saveMainColor(state, action) {
      console.log(action, 123213);
      return { ...state, mainColor: action?.payload?.mainColor };
    },
  },
  effects: {
    *menuCollapsedToggle(_, { put }) {
      yield put({ type: 'saveMenuCollapsed' });
    },
    *localeToggle(_, { put }) {
      yield put({ type: 'saveLocale' });
    },
    *changeMainColor({ payload }, { put }) {
      yield put({ type: 'saveMainColor', payload });
    },
  },
};
