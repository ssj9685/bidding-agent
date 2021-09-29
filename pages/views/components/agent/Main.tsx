import Grid from '../common/Grid';
import commer from '../../utils/stringObjComma';
import Center from '../common/Center';

const Main = (props) => {
  if (props.data) {
    const payload = props.data.payload;
    const { method, bidAmount, guarantee, totalPayment, paymentBank } =
      commer(payload);
    return (
      <Grid
        align="center"
        padding="8px"
        rows="repeat(6, 80px)"
        columns="1fr 2fr"
      >
        <div>사건번호</div>
        <div>{props.data.id}</div>
        <div>방법</div>
        <div>{method}</div>
        <div>입찰금액</div>
        <div>{bidAmount}원</div>
        <div>보증금액</div>
        <div>{guarantee}원</div>
        <div>납부총액</div>
        <div>{totalPayment}원</div>
        <div>납부계좌</div>
        <div>{paymentBank}</div>
      </Grid>
    );
  } else {
    return <Center>의뢰를 기다리는 중입니다.</Center>;
  }
};
export default Main;
