import React, { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import Container from './components/common/Container';
import Header from './components/common/Header';
import Center from './components/common/Center';
import Button from './components/common/Button';
import Footer from './components/common/Footer';

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
    console.log('element test', document.getElementById('email'));
  });
  return (
    <Container height="100%">
      <Header title="회원 가입" />
      <Center direction="column">
        <input id="email" placeholder="이메일" />
        <input id="name" placeholder="이름" />
        <input type="password" id="password" placeholder="비밀번호" />
        <input id="phone" placeholder="휴대폰 번호" />
        <input id="residence" placeholder="거주지" />
        <Footer>
          <Button
            onClick={async () => {
              const email = (
                document.getElementById('email') as HTMLInputElement
              ).value;
              const password = (
                document.getElementById('password') as HTMLInputElement
              ).value;
              const name = (document.getElementById('name') as HTMLInputElement)
                .value;
              const phone = (
                document.getElementById('phone') as HTMLInputElement
              ).value;
              const residence = (
                document.getElementById('residence') as HTMLInputElement
              ).value;
              const result = await fetch('/u', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email,
                  password,
                  name,
                  phone,
                  residence,
                }),
              });
              const resultJson = await result.text();
              console.log(resultJson);
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
