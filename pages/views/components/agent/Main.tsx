import Grid from '../common/Grid';
import Center from '../common/Center';
import commer from '../../utils/stringObjComma';

const Main = (props) => {
  if (props.data) {
    const payload = props.data.payload;
    const { method, bidAmount, guarantee, totalPayment, paymentBank } =
      commer(payload);
    return (
      <Grid
        rows="repeat(6, 80px)"
        gap="1px"
        gapColor="gray"
        border="1px solid rgba(0,0,0,0.3)"
        columns="auto 1fr"
      >
        <Center>사건번호</Center>
        <Center>{props.data.id}</Center>
        <Center>방법</Center>
        <Center>{method}</Center>
        <Center>입찰금액</Center>
        <Center>{bidAmount}원</Center>
        <Center>보증금액</Center>
        <Center>{guarantee}원</Center>
        <Center>납부총액</Center>
        <Center>{totalPayment}원</Center>
        <Center>납부계좌</Center>
        <Center>{paymentBank}</Center>
      </Grid>
    );
  } else {
    return <Center>의뢰를 기다리는 중입니다.</Center>;
  }
};
export default Main;
