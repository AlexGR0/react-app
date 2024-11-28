import { CustomAction } from '@/typings/action';

export interface GlobalState {
  menuCollapsed?: boolean;
  locale?: string;
  mainColor?: string;
}

export default {
  namespace: 'global',
  state: {
    menuCollapsed: false,
    locale: 'zh',
    mainColor: '#b682ff',
  },
  reducers: {
    saveMenuCollapsed(state: GlobalState) {
      return { ...state, menuCollapsed: !state.menuCollapsed };
    },
    saveLocale(state: GlobalState) {
      return { ...state, locale: state.locale === 'zh' ? 'en' : 'zh' };
    },
    saveMainColor(state: GlobalState, { payload }: CustomAction) {
      return { ...state, mainColor: payload?.mainColor };
    },
  },
  effects: {
    *menuCollapsedToggle(_: CustomAction, { put }: any) {
      yield put({ type: 'saveMenuCollapsed' });
    },
    *localeToggle(_: CustomAction, { put }: any) {
      yield put({ type: 'saveLocale' });
    },
    *changeMainColor({ payload }: CustomAction, { put }: any) {
      yield put({ type: 'saveMainColor', payload });
    },
  },
};
