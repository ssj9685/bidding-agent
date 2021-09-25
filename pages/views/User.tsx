import React, { useState, useCallback, useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import Radio from './components/user/Radio';
import GridDiv from './components/user/GridDiv';
import Header from './components/user/Header';
import NextButton from './components/user/NextButton';

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
    <GridDiv>
      <Header height="100px" title="입찰금액 및 보증금 납부 방식 선택" />
      <GridDiv
        justify="center"
        align="center"
        rows="repeat(8, 100px)"
        columns="auto 1fr"
      >
        <div>입찰방법</div>
        <select name="method" className="userData">
          <option></option>
          <option value="self">본인입찰</option>
          <option value="proxy">대리입찰</option>
          <option value="joint">공동입찰</option>
          <option value="signature">전자서명방식</option>
          <option value="document">서류제출방식</option>
        </select>
        <div>최저입찰가</div>
        <div>640,000,000원</div>
        <div>입찰금액</div>
        <input name="bidAmount" className="userData" />
        <div>보증금액</div>
        <input name="guarantee" className="userData" />
        <div>납부총액</div>
        <input name="totalPayment" className="userData" />
        <div>보증금 납부방식</div>
        <div>
          <Radio name="pay-method" value="self" label="현금" />
          <Radio name="pay-method" value="self" label="전자보증서" />
          <select>
            <option>선택</option>
            <option></option>
            <option></option>
          </select>
        </div>
        <div>보증금 납부계좌 은행선택</div>
        <select name="paymentBank" className="userData">
          <option></option>
          <option>신한은행</option>
          <option>부산은행</option>
          <option>우리은행</option>
          <option>하나은행</option>
          <option>기업은행</option>
        </select>
        <div>환불계좌</div>
        <input name="refundAccount" className="userData" />
      </GridDiv>
      <NextButton onClick={onFind}>다음</NextButton>
    </GridDiv>
  );
};

// assigning the initial props to the component's props
Page.getInitialProps = (ctx: PageContext) => {
  return {
    title: ctx.query.title,
  };
};

export default Page;
