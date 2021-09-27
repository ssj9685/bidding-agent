import React, { useState, useCallback, useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import Main from './components/user/Main';
import Modal from './components/common/Modal';
import Header from './components/common/Header';
import Container from './components/common/Container';
import Button from './components/common/Button';
import Grid from './components/common/Grid';

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
    document.title = title;
    if (!wsInstance) {
      const ws = new WebSocket('ws://localhost:8080/client');
      ws.addEventListener('open', (e) => {
        console.log(e);
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
      <Grid rows="80px 1fr 80px">
        <Modal onClose={closeModal} title={modalTitle} />
        <Header title="입찰금액 및 보증금 납부 방식 선택" />
        <Main />
        <Button onClick={findAgent}>찾기</Button>
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
