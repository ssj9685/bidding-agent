import React, { useState, useEffect, useCallback } from 'react';
import { NextPage, NextPageContext } from 'next';
import Container from './components/common/Container';
import Grid from './components/common/Grid';
import Header from './components/common/Header';
import Button from './components/common/Button';
import Center from './components/common/Center';
import Modal from './components/common/Modal';

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
  const [clientData, setClientData] = useState(null);
  const [agentId, setAgentId] = useState(-1);
  const [modalTitle, setModalTitle] = useState('');

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
    if (clientData) {
      wsInstance.send(
        JSON.stringify({
          event: 'match',
          data: {
            id: agentId,
            payload: clientData,
          },
        }),
      );
    }
  }, [wsInstance, clientData]);

  const closeModal = useCallback(() => {
    setModalTitle('');
  }, [setModalTitle]);

  const onDecline = useCallback(() => {
    console.log('decline');
  }, []);

  useEffect(() => {
    document.title = title;
    if (!wsInstance) {
      const ws = new WebSocket('ws://localhost:8080/agent');
      ws.addEventListener('open', (e) => {
        console.log(e);
      });
      ws.addEventListener('message', (e) => {
        const { event, data } = JSON.parse(e.data);
        console.log(event, data);
        switch (event) {
          case 'request':
            setModalTitle('입찰 대리 요청이 도착하였습니다');
            setClientData(data);
            break;
          case 'find':
            setModalTitle('의뢰인 탐색중입니다.');
            setAgentId(data.id);
            break;
          case 'matched':
            setModalTitle('이미 만료된 요청입니다.');
            setClientData(null);
            break;
        }
        console.log(e);
      });
      setWsInstance(ws);
    }
  });

  return (
    <Container height="100%">
      <Modal title={modalTitle} onClose={closeModal} />
      <Grid height="100%" rows="80px 1fr 80px">
        <Header title="부동산 경매 중개인 화면" />
        <Center>
          <Button
            width="200px"
            height="200px"
            radius="50%"
            bgColor="gray"
            fontSize="2em"
            onClick={onFind}
          >
            시작
          </Button>
        </Center>
        <Grid rows="80px" columns="1fr 2fr">
          <Button bgColor="gray" onClick={onDecline}>
            거부
          </Button>
          <Button onClick={onAccept}>승인</Button>
        </Grid>
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
