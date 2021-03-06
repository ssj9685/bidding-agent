import GridDiv from '../common/Grid';

const RadioGroup = (props) => {
  return (
    <GridDiv columns="repeat(auto-fill, 200px)" justify="center" align="center">
      {props.children}
    </GridDiv>
  );
};

export default RadioGroup;
