import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { ModalCtxProvider, ContextMenuCtxProvider, TabCtxProvider } from '@/providers';
import { AuthGuard } from '@/components';
import { NextComponentType } from 'next';
import { PageAuth } from '@/types';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

interface MyAppProps extends AppProps {
  Component: NextComponentType & PageAuth
  pageProps: {
    session: Session
  }
}

export default function App({ Component, pageProps: {session, ...pageProps} }: MyAppProps) {
  return (
    <SessionProvider session={session}>
      <ModalCtxProvider>
        <ContextMenuCtxProvider>
          <TabCtxProvider>
            {Component.requireAuth ? (
              <AuthGuard usertype={Component.requireAuth.userType}>
                <Component {...pageProps} />
              </AuthGuard>
            ): (
              <Component {...pageProps} />
            )}
          </TabCtxProvider>
        </ContextMenuCtxProvider>
      </ModalCtxProvider>
     </SessionProvider>
  )
}
