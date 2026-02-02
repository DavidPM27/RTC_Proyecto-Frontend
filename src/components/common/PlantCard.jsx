import {
  Image,
  Link as ChakraLink,
  Card,
  Button,
  HStack,
  Icon,
} from "@chakra-ui/react";
import ButtonCustom from "../layout/ButtonCustom";
import { LuCircle, LuDroplets } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const PlantCard = (plant) => {
  const navigate = useNavigate();

  return (
    <Card.Root
      size="md"
      w="100%"
      overflow="hidden"
      borderRadius="2xl" 
      bg="brand.800/60"
      backdropFilter="blur(12px)"
      border="1px solid"
      borderColor="whiteAlpha.100"
      boxShadow="lg"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-5px)",
        borderColor: "brandTertiary.500",
        boxShadow: "xl",
      }}
    >
      <Image
        h="200px"
        objectFit="cover"
        aspectRatio="7/5"
        src={plant.imageUrl}
        alt={plant.species}
        filter="brightness(0.8)"
        _hover={{ filter: "brightness(1)" }}
        transition="0.3s"
      />

      <Card.Body>
        <Card.Title
          fontSize="lg"
          fontWeight="bold"
          color="text.primary"
        >
          {plant.species}
        </Card.Title>

        <Card.Description
          fontSize="sm"
          color="text.secondary"
          fontWeight="medium"
        >
          Categoría: {plant.category}
        </Card.Description>
        <HStack mt={4} pb={4} spacing={2} borderBottom="1px solid" borderColor="brand.700">
          <Icon as={LuDroplets} boxSize={4} color="brand.500" />
          <Card.Description fontSize="xs" color="text.primary">
            {plant.stats.wateringFrequency} %
          </Card.Description>
          <Icon as={LuCircle} boxSize={3} color="brandSecondary.500" />
          <Card.Description fontSize="xs" color="text.primary">
            In today
          </Card.Description>
        </HStack>
      </Card.Body>

      <Card.Footer>
        <ButtonCustom 
          type="primary" 
          textValue="View Details" 
          onClick={() => navigate(`/plant/${plant.apiId}`)}
        />
      </Card.Footer>
    </Card.Root>
  );
};

export default PlantCard;

