import { NumberInput } from "@chakra-ui/react";

const NumericInput = ({ placeholder, value, onChange }) => {
  const handleChange = (valueAsString, valueAsNumber) => {
    onChange({ target: { value: valueAsNumber } });
  };

  return (
    <NumberInput.Root value={String(value || "")} onValueChange={handleChange} min={0}>
      <NumberInput.Control border="1px solid" borderColor="brand.600" borderRadius="xl" bg="brand.900">
        <NumberInput.IncrementTrigger />
        <NumberInput.DecrementTrigger borderColor="brand.600" _focus={{
            bg: "brand.600",
            focusRingColor: "brand.500",
        }}/>
      </NumberInput.Control>
      <NumberInput.Input 
        border="1px solid" 
        borderColor="brand.600" 
        borderRadius="xl" 
        bg="brand.900" 
        color="text.primary" 
        _focus={{
          borderColor: "brand.500",
          focusRingColor: "brand.500",
        }}
      />
    </NumberInput.Root>
  );
};

export default NumericInput;