import '@/styles/globals.css'

import { Session } from 'next-auth';
import { SessionProvider } from "next-auth/react"

interface AppProps {
  Component: React.ComponentType<any>;
  pageProps: {
    session: Session | null | undefined; // Adjust the Session type based on your actual session type
    // Add other properties if needed
  };
}


export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
