import React, { useState, useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';

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
  const [state, setState] = useState(false);
  const onClickCallback = () => {
    setState(true);
    console.log(state);
  };
  useEffect(() => {
    document.title = title;
  });
  return (
    <div>
      <button onClick={onClickCallback}>대리인찾기</button>
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
