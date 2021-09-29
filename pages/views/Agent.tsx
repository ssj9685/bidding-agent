import React, { useState, useEffect, useCallback } from 'react';
import { NextPage, NextPageContext } from 'next';
import Container from './components/common/Container';
import Main from './components/agent/Main';
import Header from './components/common/Header';
import Modal from './components/common/Modal';
import FooterButton from './components/agent/FooterButton';

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
      setModalTitle('요청을 수락하였습니다.');
    }
  }, [wsInstance, clientData]);

  const closeModal = useCallback(() => {
    setModalTitle('');
  }, [setModalTitle]);

  const onDecline = useCallback(() => {
    setClientData(null);
    setModalTitle('요청을 거절하였습니다.');
  }, []);

  useEffect(() => {
    document.title = '부동산 경매 중개 플랫폼';
    console.log('server send data', title);
    if (!wsInstance) {
      const ws = new WebSocket('ws://192.168.10.77:8080');
      setWsInstance(ws);
      ws.addEventListener('open', (e) => {
        console.log(e);
        ws.send(
          JSON.stringify({
            event: 'find',
            data: {
              id: null,
              payload: '',
            },
          }),
        );
        ws.addEventListener('error', () => {
          setModalTitle('네트워크 상태가 좋지 않습니다.');
        });
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
            setModalTitle('의뢰인 탐색을 시작합니다.');
            setAgentId(data.id);
            break;
          case 'matched':
            setModalTitle('이미 만료된 요청입니다.');
            setClientData(null);
            break;
        }
        console.log(e);
      });
    }
  });

  return (
    <Container height="100%">
      <Modal title={modalTitle} onClose={closeModal} />
      <Header fontSize="1.2em" title="입찰대행신청건 담당 중개사 선정" />
      <Main data={clientData} />
      <FooterButton onDecline={onDecline} onAccept={onAccept} />
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
