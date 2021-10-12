import React, { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import Container from './components/common/Container';
import Grid from './components/common/Grid';
import Button from './components/common/Button';
import Header from './components/common/Header';
import Center from './components/common/Center';

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
      <Header title="부동산 경매 중개 플랫폼" />
      <Center>
        <Grid columns="1fr">
          <Center>
            <Button
              width="320px"
              height="80px"
              radius="2em"
              onClick={() => (location.href = '/user')}
            >
              사용자
            </Button>
          </Center>
          <Center>
            <Button
              width="320px"
              height="80px"
              radius="2em"
              onClick={() => (location.href = '/agent')}
            >
              중계인
            </Button>
          </Center>
        </Grid>
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
