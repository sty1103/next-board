import React  from "react";

interface Props {
  value: string | number;
  name: string;
  placeholder: string;
  type: string;
  onChange: Function;
}

const InputField = ({ value, name, placeholder, type, onChange }: Props) => (
    <input
      type={type}
      value={value}
      name={name}
      className="form-control"
      placeholder={placeholder}
      onChange={() => onChange()}
    />
);

export default InputField;