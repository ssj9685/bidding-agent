import React, { useState, useCallback, useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import Radio from './components/user/Radio';

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

  const onFind = useCallback(() => {
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
        const { event, data } = JSON.parse(e.data);
        switch (event) {
          case 'apply':
            alert('finding agent...');
            break;
          case 'match':
            alert('your case is matched');
            console.log(data);
            break;
        }
        console.log(e);
      });
      setWsInstance(ws);
    }
  });
  return (
    <div>
      <Radio name="method" value="self" label="본인입찰" />
      <Radio name="method" value="proxy" label="대리입찰" />
      <Radio name="method" value="joint" label="공동입찰" />
      <Radio name="method" value="proxy" label="전자서명방식" />
      <Radio name="method" value="proxy" label="서류제출방식" />
      <input id="clientName" type="text" />
      <button onClick={onFind}>대리인찾기</button>
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
