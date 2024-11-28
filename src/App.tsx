import React, { useEffect } from 'react';
import AppRouter from '@routes/AppRouter';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { ConfigProvider } from 'antd';

const App: React.FC = () => {
  const { locale, mainColor } = useSelector((state: any) => state.global);

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

export default App;
