import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss';
import { Header, PageWrapper } from '@/components';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Header></Header>
    <PageWrapper>
      
    </PageWrapper>
    </>
  )
}
