import React, { useState, useCallback, useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import Main from './components/user/Main';
import Modal from './components/common/Modal';
import Header from './components/user/Header';
import Container from './components/common/Container';
import NextButton from './components/user/FooterButton';
import GridDiv from './components/user/GridDiv';

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
  const [findTitle, setFindTitle] = useState('');

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
    setFindTitle('');
  }, [setFindTitle]);

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
            setFindTitle('Finding agent...');
            break;
          case 'noAgent':
            alert('there is no agent');
            break;
          case 'match':
            setFindTitle('your case is matched');
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
      <GridDiv rows="80px 1fr 80px">
        <Modal onClose={closeModal} title={findTitle} />
        <Header height="100px" title="입찰금액 및 보증금 납부 방식 선택" />
        <Main />
        <NextButton onClick={findAgent}>찾기</NextButton>
      </GridDiv>
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
