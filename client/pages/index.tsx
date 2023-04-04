import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss';
import { Header, PageWrapper } from '@/components';
import { getSession } from 'next-auth/react';

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


Home.getInitialProps = async (ctx: {req: any, res: any}) => {
  const { req, res } = ctx;
  const session = await getSession({ req });

  if ((session)?.user && res) {
    res.writeHead(302, {
      Location: (session)?.user.userType === 'patient' ? '/patient' : '/doctor',
    });

    res.end();

    return {
      props: {},
    };
  }

  return {
    props: {},
  };
}

Home.requireAuth = {
  userType: 'patient'
}