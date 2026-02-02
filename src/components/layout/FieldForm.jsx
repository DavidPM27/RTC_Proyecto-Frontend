import { Input, Field, NumberInput } from "@chakra-ui/react";
import TextInput from "./TextInput";
import NumericInput from "./NumberInput";
import DateInput from "./DateInput";

const FieldForm = ({ label, placeholder, type = "text", value, onChange }) => {
  const renderInput = () => {
    switch (type) {
      case "number":
        return (
          <NumericInput
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        );
      case "date":
        return (
          <DateInput
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        );
      case "text":
      default:
        return (
          <TextInput
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        );
    }
  };

  return (
    <Field.Root>
      <Field.Label color="text.secondary">{label}</Field.Label>
      {renderInput()}
    </Field.Root>
  );
};

export default FieldForm;
