import plantsData from "./plants_mock_data.json";

const getPlant = (id) => plantsData.find((p) => p.id === id);

const monstera = getPlant(1);
const aloe = getPlant(8);
const pothos = getPlant(4);
const snakePlant = getPlant(5); // Dracaena trifasciata (antes sansevieria)

export const INITIAL_PLANTS = [
  {
    id: "p1-monstera",
    apiId: monstera.id,
    species: monstera.scientific_name[0],
    imageUrl: monstera.default_image?.regular_url || "",
    category: monstera.type,
    stats: {
      plantedAt: "2025-05-12",
      lastWatered: "2026-01-01T10:00:00Z",
      wateringFrequency: parseInt(monstera.watering_general_benchmark?.value) || 7,
    },
    requirements: {
      minTemp: parseInt(monstera.hardiness?.min) || 18,
      maxTemp: parseInt(monstera.hardiness?.max) || 30,
      idealPh: 6.0,
    },
  },
  {
    id: "p2-aloe",
    apiId: aloe.id,
    species: aloe.scientific_name[0],
    imageUrl: aloe.default_image?.regular_url || "",
    category: aloe.type,
    stats: {
      plantedAt: "2025-08-20",
      lastWatered: "2025-12-15T09:30:00Z",
      wateringFrequency: parseInt(aloe.watering_general_benchmark?.value) || 14,
    },
    requirements: {
      minTemp: parseInt(aloe.hardiness?.min) || 10,
      maxTemp: parseInt(aloe.hardiness?.max) || 35,
      idealPh: 7.0,
    },
  },
  {
    id: "p3-pothos",
    apiId: pothos.id,
    species: pothos.scientific_name[0],
    imageUrl: pothos.default_image?.regular_url || "",
    category: pothos.type,
    stats: {
      plantedAt: "2025-12-01",
      lastWatered: "2026-01-02T18:00:00Z",
      wateringFrequency: parseInt(pothos.watering_general_benchmark?.value) || 20,
    },
    requirements: {
      minTemp: parseInt(pothos.hardiness?.min) || 5,
      maxTemp: parseInt(pothos.hardiness?.max) || 35,
      idealPh: 5.5,
    },
  },
  {
    id: "p4-sansevieria",
    apiId: snakePlant.id,
    species: snakePlant.scientific_name[0],
    imageUrl: snakePlant.default_image?.regular_url || "",
    category: snakePlant.type,
    stats: {
      plantedAt: "2024-01-10",
      lastWatered: "2025-12-20T12:00:00Z",
      wateringFrequency: parseInt(snakePlant.watering_general_benchmark?.value) || 20,
    },
    requirements: {
      minTemp: parseInt(snakePlant.hardiness?.min) || 12,
      maxTemp: parseInt(snakePlant.hardiness?.max) || 32,
      idealPh: 5.5,
    },
  },
];
