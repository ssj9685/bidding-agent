import React, { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import Container from './components/common/Container';
import Header from './components/common/Header';
import Center from './components/common/Center';
import Button from './components/common/Button';
import Footer from './components/common/Footer';
import fetchHandler from './utils/fetchHandler';

// The component's props type
type PageProps = {
  title: string;
};

// extending the default next context type
type PageContext = NextPageContext & {
  query: PageProps;
};

// react component
const Page: NextPage<PageProps> = ({ title }) => {
  useEffect(() => {
    document.title = '부동산 경매 중개 플랫폼';
    console.log('server send data', title);
  });
  return (
    <Container height="100%">
      <Header title="로그인" />
      <Center direction="column">
        <Center direction="column">
          <input id="email" name="email" placeholder="이메일" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="비밀번호"
          />
        </Center>
        <Footer>
          <Button
            onClick={async () => {
              const email = (
                document.getElementById('email') as HTMLInputElement
              ).value;
              const password = (
                document.getElementById('password') as HTMLInputElement
              ).value;
              const sendData = JSON.stringify({ email, password });
              console.log(sendData);
              const response = await fetch('/signin', {
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: sendData,
              });
              fetchHandler(response);
            }}
            height="100%"
          >
            다음
          </Button>
        </Footer>
      </Center>
    </Container>
  );
};

// assigning the initial props to the component's props
Page.getInitialProps = (ctx: PageContext) => {
  return {
    title: ctx.query.title,
  };
};

export default Page;
