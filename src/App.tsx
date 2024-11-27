import React from 'react';
import AppRouter from '@routes/AppRouter';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';

const App: React.FC = () => {
  const { locale } = useSelector((state: any) => state.global);

  return (
    <IntlProvider locale={locale} messages={require(`@/locales/${locale}.json`)}>
      <AppRouter />
    </IntlProvider>
  );
};

export default App;
