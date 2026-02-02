import {
  Card,
  Button,
  Stack,
  HStack,
  Input,
  Field,
  Box,
  FileUpload,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuUpload } from "react-icons/lu";
import FieldForm from "../components/layout/FieldForm";
import ButtonCustom from "../components/layout/ButtonCustom";

const AddPlant = ({ onAddPlant, onClose }) => {
  const [formData, setFormData] = useState({
    nickname: "",
    species: "",
    plantedAt: "",
    wateringFrequency: 7,
    imageUrl: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Validar que al menos nombre o especie estén presentes
    if (!formData.nickname && !formData.species) {
      alert("Por favor ingresa al menos un nombre o especie");
      return;
    }

    // Preparar datos con valores por defecto
    const plantData = {
      species: formData.species || formData.nickname,
      imageUrl: formData.imageUrl || "https://via.placeholder.com/400?text=Plant",
      category: "Custom Plant",
      stats: {
        plantedAt: formData.plantedAt || new Date().toISOString().split('T')[0],
        lastWatered: new Date().toISOString(),
        wateringFrequency: formData.wateringFrequency || 7,
      },
      requirements: {
        minTemp: 10,
        maxTemp: 30,
        idealPh: 6.0,
      },
    };

    onAddPlant(plantData);
    onClose();
  };

  return (
    <Stack gap="4" w="full">
      <FileUpload.Root maxW="xl" alignItems="stretch" maxFiles={1}>
        <FileUpload.HiddenInput
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (event) => {
                handleInputChange(
                  "imageUrl",
                  event.target?.result
                );
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        <FileUpload.Dropzone
          bg="brand.900"
          borderRadius="md"
          border="2px dashed"
          borderColor="brand.600"
          p="4"
        >
          <Icon size="md" color="fg.muted">
            <LuUpload />
          </Icon>
          <FileUpload.DropzoneContent>
            <Box color="text.secondary">Upload photo</Box>
            <Box color="brandTertiary.900">.png, .jpg up to 5MB</Box>
          </FileUpload.DropzoneContent>
        </FileUpload.Dropzone>
        <FileUpload.List />
      </FileUpload.Root>
      <FieldForm
        label="Name / Nickname"
        placeholder="Echeveria"
        type="text"
        value={formData.nickname}
        onChange={(e) => handleInputChange("nickname", e.target.value)}
      />
      <FieldForm
        label="Scientific name"
        placeholder="Echeveria Elegans"
        type="text"
        value={formData.species}
        onChange={(e) => handleInputChange("species", e.target.value)}
      />
      <HStack spacing="4" w="full">
        <FieldForm
          label="Date of birth"
          type="date"
          value={formData.plantedAt}
          onChange={(e) => handleInputChange("plantedAt", e.target.value)}
        />
        <FieldForm
          label="Water frequency (days)"
          placeholder="7"
          type="number"
          value={formData.wateringFrequency}
          onChange={(e) =>
            handleInputChange("wateringFrequency", parseInt(e.target.value) || 7)
          }
        />
      </HStack>
      <ButtonCustom type="primary" textValue="Add to garden" onClick={handleSubmit} />
    </Stack>
  );
};

export default AddPlant;
