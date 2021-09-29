const Radio = (props) => {
  const { name, value, label } = props;
  return (
    <label style={{ width: '100%' }}>
      <input type="radio" name={name} value={value} />
      <div>{label}</div>
    </label>
  );
};

export default Radio;
