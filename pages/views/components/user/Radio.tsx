const Radio = (props) => {
  const { name, value, label } = props;
  return (
    <label>
      <input type="radio" name={name} value={value} />
      {label}
    </label>
  );
};

export default Radio;
