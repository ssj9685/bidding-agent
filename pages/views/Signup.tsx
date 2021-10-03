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
  });
  return (
    <Container height="100%">
      <Header title="회원 가입" />
      <Center direction="column">
        <input id="email" placeholder="이메일" />
        <input id="name" placeholder="이름" />
        <input id="phone" placeholder="휴대폰 번호" />
        <input id="residence" placeholder="거주지" />
        <Footer>
          <Button
            onClick={async () => {
              const email = (
                document.getElementById('email') as HTMLInputElement
              ).value;
              const name = (document.getElementById('name') as HTMLInputElement)
                .value;
              const phone = (
                document.getElementById('phone') as HTMLInputElement
              ).value;
              const residence = (
                document.getElementById('residence') as HTMLInputElement
              ).value;
              console.log(email, name, phone, residence);
              const result = await fetch('/u', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email,
                  name,
                  phone,
                  residence,
                }),
              });
              console.log(await result.text());
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
