import React, { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';
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
    document.title = title;
  });
  return (
    <Container height="100%">
      <Grid height="100%" rows="100px 1fr 100px">
        <Header height="100px" title="부동산 경매 플랫폼" />
        <Center>
          <Grid gap="40px" rows="80px 80px" columns="1fr">
            <Link href="/agent">
              <Button bgColor="gray">대리인</Button>
            </Link>
            <Link href="/user">
              <Button bgColor="gray">사용자</Button>
            </Link>
          </Grid>
        </Center>
        <div></div>
      </Grid>
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
