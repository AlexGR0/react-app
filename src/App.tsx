import React, { useEffect } from 'react';
import AppRouter from '@routes/AppRouter';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import { connect } from 'react-redux';
import { GlobalState } from '@/models/global';

interface AppProps extends GlobalState {
  mainColor: string;
  locale: string;
}

const App: React.FC<AppProps> = (props) => {
  const { mainColor, locale } = props;

  useEffect(() => {
    document.documentElement.style.setProperty('--main-color', mainColor);
  }, [mainColor]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: mainColor,
          colorPrimaryText: '#f9f0ff',
        },
      }}
    >
      <IntlProvider locale={locale} messages={require(`@/locales/${locale}.json`)}>
        <AppRouter />
      </IntlProvider>
    </ConfigProvider>
  );
};

export default connect(({ global }: any) => ({
  mainColor: global.mainColor,
  locale: global.locale,
}))(App);
