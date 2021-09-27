import Radio from './Radio';
import Grid from '../common/Grid';
import Center from '../common/Center';

const Main = () => {
  return (
    <Grid
      rows="repeat(8, 100px)"
      columns="auto 1fr"
      border="1px solid gray"
      gap="16px"
    >
      <Center>입찰방법</Center>
      <Center>
        <select name="method" className="userData">
          <option></option>
          <option value="본인입찰">본인입찰</option>
          <option value="대리입찰">대리입찰</option>
          <option value="공동입찰">공동입찰</option>
          <option value="전자서명방식">전자서명방식</option>
          <option value="서류제출방식">서류제출방식</option>
        </select>
      </Center>
      <Center>최저입찰가</Center>
      <Center>640,000,000원</Center>
      <Center>입찰금액</Center>
      <Center>
        <input name="bidAmount" className="userData" />
      </Center>
      <Center>보증금액</Center>
      <Center>
        <input name="guarantee" className="userData" />
      </Center>
      <Center>납부총액</Center>
      <Center>
        <input name="totalPayment" className="userData" />
      </Center>
      <Center>보증금 납부방식</Center>
      <Center>
        <Radio name="pay-method" value="self" label="현금" />
        <Radio name="pay-method" value="self" label="전자보증서" />
        <Center>
          <select>
            <option>선택</option>
            <option></option>
            <option></option>
          </select>
        </Center>
      </Center>
      <Center>보증금 납부계좌 은행선택</Center>
      <Center>
        <select name="paymentBank" className="userData">
          <option></option>
          <option>신한은행</option>
          <option>부산은행</option>
          <option>우리은행</option>
          <option>하나은행</option>
          <option>기업은행</option>
        </select>
      </Center>
      <Center>환불계좌</Center>
      <Center>
        <input name="refundAccount" className="userData" />
      </Center>
    </Grid>
  );
};

export default Main;
