import React, { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';

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
    <div>
      <h1>{title}</h1>
      <Link href="/agent">
        <button>대리인</button>
      </Link>
      <Link href="/user">
        <button>사용자</button>
      </Link>
    </div>
  );
};

// assigning the initial props to the component's props
Page.getInitialProps = (ctx: PageContext) => {
  return {
    title: ctx.query.title,
  };
};

export default Page;
