import Head from 'next/head';
import 'client/css/global.css';

import { ToastProvider } from 'react-toast-notifications';

function App({ Component, pageProps }) {
  return (
    <ToastProvider autoDismiss placement="bottom-center">
      <Head>
        <title>Auth Example</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Component {...pageProps} />
    </ToastProvider>
  );
}

export default App;
