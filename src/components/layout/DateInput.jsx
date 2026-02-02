import { Input } from "@chakra-ui/react";
import "./DateInput.css";

const DateInput = ({ placeholder, value, onChange }) => {
  return (
    <Input
        type="date"
        border="1px solid"
        borderColor="brand.600"
        borderRadius="xl"
        color="text.primary"
        bg="brand.900"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        _focus={{
            borderColor: "brand.500",
            focusRingColor: "brand.500",
        }}
        className="date-input"
    />
  )
}

export default DateInput