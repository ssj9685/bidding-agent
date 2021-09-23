import React, { useState, useCallback, useEffect } from 'react';
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
  const [wsInstance, setWsInstance] = useState(null);

  const onClick = useCallback(() => {
    const clientName = document.getElementById(
      'clientName',
    ) as HTMLInputElement;
    const data = JSON.stringify({
      event: 'apply',
      data: {
        id: null,
        payload: clientName.value,
      },
    });
    wsInstance.send(data);
  }, [wsInstance]);

  useEffect(() => {
    document.title = title;
    if (!wsInstance) {
      const ws = new WebSocket('ws://localhost:8080');
      ws.addEventListener('open', (e) => {
        console.log(e);
      });
      ws.addEventListener('message', (e) => {
        const { event, payload } = JSON.parse(e.data);
        if (event === 'accept') {
          alert('your case is accpeted');
          console.log(payload);
        }
        console.log(e);
      });
      setWsInstance(ws);
    }
  });
  return (
    <div>
      <input type="radio" name="method" value="self" />
      본인입찰
      <input type="radio" name="method" value="proxy" />
      대리입찰
      <input id="clientName" type="text" />
      <button onClick={onClick}>대리인찾기</button>
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
