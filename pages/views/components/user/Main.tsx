import Radio from './Radio';
import Grid from '../common/Grid';

const Main = () => {
  return (
    <Grid align="center" height="100%" padding="8px" columns="1fr 3fr">
      <div>입찰방법</div>
      <select name="method" className="userData">
        <option></option>
        <option value="본인입찰">본인입찰</option>
        <option value="대리입찰">대리입찰</option>
        <option value="공동입찰">공동입찰</option>
        <option value="전자서명방식">전자서명방식</option>
        <option value="서류제출방식">서류제출방식</option>
      </select>
      <div>최저입찰가</div>
      <input value="640000000" disabled />
      <div>입찰금액</div>
      <input name="bidAmount" className="userData" />
      <div>보증금액</div>
      <input name="guarantee" className="userData" />
      <div>납부총액</div>
      <input name="totalPayment" className="userData" />
      <div>보증금 납부방식</div>
      <Grid rows="1fr" columns="1fr 1fr" gap="8px">
        <Radio name="pay-method" value="self" label="현금" />
        <Radio name="pay-method" value="self" label="전자보증서" />
      </Grid>
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
    </Grid>
  );
};

export default Main;
