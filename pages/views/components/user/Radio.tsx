const Radio = (props) => {
  const { name, value, label } = props;
  return (
    <div>
      <label>
        <input type="radio" name={name} value={value} />
        {label}
      </label>
    </div>
  );
};

export default Radio;
