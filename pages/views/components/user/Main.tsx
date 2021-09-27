import Radio from './Radio';
import GridDiv from '../common/Grid';

const Main = () => {
  return (
    <GridDiv
      justify="center"
      align="center"
      rows="repeat(8, 100px)"
      columns="auto 1fr"
      gap="16px"
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
  );
};

export default Main;
