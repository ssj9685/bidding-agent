import React, { useState, useEffect, useCallback } from 'react';
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
  const [wsData, setWsData] = useState('');
  const [wsId, setWsId] = useState(-1);

  const onFind = useCallback(() => {
    wsInstance.send(
      JSON.stringify({
        event: 'find',
        data: {
          id: null,
          payload: '',
        },
      }),
    );
  }, [wsInstance]);

  const onAccept = useCallback(() => {
    console.log(wsData);
    wsInstance.send(
      JSON.stringify({
        event: 'accept',
        data: {
          id: wsId,
          payload: wsData,
        },
      }),
    );
  }, [wsInstance, wsData]);

  const onDecline = useCallback(() => {
    console.log('decline');
  }, []);

  useEffect(() => {
    document.title = title;
    if (!wsInstance) {
      const ws = new WebSocket('ws://localhost:8080');
      ws.addEventListener('open', (e) => {
        console.log(e);
      });
      ws.addEventListener('message', (e) => {
        const { event, data } = JSON.parse(e.data);
        console.log(event, data);
        switch (event) {
          case 'request':
            alert('request comming');
            setWsData(data);
            break;
          case 'find':
            alert('start find');
            setWsId(data);
            break;
          case 'accepted':
            alert('already accepted');
            break;
        }
        console.log(e);
      });
      setWsInstance(ws);
    }
  });

  return (
    <div>
      <button onClick={onFind}>시작</button>
      <button onClick={onDecline}>거부</button>
      <button onClick={onAccept}>승인</button>
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
