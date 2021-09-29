import React, { useState, useCallback, useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import Main from './components/user/Main';
import Modal from './components/common/Modal';
import Header from './components/common/Header';
import Container from './components/common/Container';
import FooterButton from './components/user/FooterButton';

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
  const [modalTitle, setModalTitle] = useState('');

  const findAgent = useCallback(() => {
    const clientName = document.querySelectorAll('.userData');
    const userData = {};
    [...clientName].forEach((v: any) => {
      userData[v.name] = v.value;
    });
    const data = JSON.stringify({
      event: 'apply',
      data: {
        id: null,
        payload: userData,
      },
    });
    wsInstance.send(data);
  }, [wsInstance]);

  const closeModal = useCallback(() => {
    setModalTitle('');
  }, [setModalTitle]);

  useEffect(() => {
    document.title = '부동산 경매 중개 플랫폼';
    console.log('server send data', title);
    if (!wsInstance) {
      const ws = new WebSocket('ws://192.168.10.77:8080');
      ws.addEventListener('open', (e) => {
        console.log(e);
      });
      ws.addEventListener('error', () => {
        setModalTitle('네트워크 상태가 좋지 않습니다.');
      });
      ws.addEventListener('message', (e) => {
        const { event, data } = JSON.parse(e.data);
        switch (event) {
          case 'apply':
            setModalTitle('입찰 대리인을 검색중입니다.');
            break;
          case 'noAgent':
            setModalTitle('입찰 대리인을 찾을 수 없습니다.');
            break;
          case 'match':
            setModalTitle('입찰 대리인을 찾았습니다.');
            console.log(data);
            break;
        }
        console.log(e);
      });
      setWsInstance(ws);
    }
  });
  return (
    <Container>
      <Modal onClose={closeModal} title={modalTitle} />
      <Header title="입찰 대행 신청" />
      <Main />
      <FooterButton onClick={findAgent}>찾기</FooterButton>
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
