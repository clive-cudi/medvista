import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { ModalCtxProvider, ContextMenuCtxProvider } from '@/providers';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ModalCtxProvider>
      <ContextMenuCtxProvider>
        <Component {...pageProps} />
      </ContextMenuCtxProvider>
    </ModalCtxProvider>
  )
}
