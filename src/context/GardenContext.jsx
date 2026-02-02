import { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { INITIAL_PLANTS } from '../api/initialPlants';
import { useWeather } from '../hooks/useWeather';

const GardenContext = createContext();

export const GardenProvider = ({ children }) => {
  const [myGarden, setMyGarden] = useState(INITIAL_PLANTS);
  const [notification, setNotification] = useState(null);
  const { weather, loading, error } = useWeather();
  const [cachedWeather, setCachedWeather] = useState(null);

  useEffect(() => {
    if (weather && !loading) {
      setCachedWeather(weather);
    }
  }, [weather, loading]);

  const addPlant = (plantData) => {
    let newPlant;
    
    // Transform data if it comes from Perenual API
    if (plantData.apiId || plantData.common_name) {
      const cleanedWaterData = plantData.watering_general_benchmark?.value?.replace(/['"]/g, '');
      
      newPlant = {
        id: crypto.randomUUID(),
        apiId: plantData.id,
        species: plantData.common_name || plantData.scientific_name?.[0] || 'Unknown Plant',
        imageUrl: plantData.default_image?.medium_url || plantData.default_image?.thumbnail || 'https://via.placeholder.com/400',
        category: plantData.type || 'Plant',
        stats: {
          plantedAt: new Date().toISOString().split('T')[0],
          lastWatered: new Date().toISOString(),
          wateringFrequency: plantData.watering_general_benchmark?.value ? parseInt(cleanedWaterData?.split('-')[0]) : 7,
        },
        requirements: {
          minTemp: plantData.hardiness?.min ? parseInt(plantData.hardiness.min) : 10,
          maxTemp: plantData.hardiness?.max ? parseInt(plantData.hardiness.max) : 30,
          idealPh: 6.0,
        },
      };
    } else {
      newPlant = {
        ...plantData,
        id: crypto.randomUUID(),
        stats: {
          ...plantData.stats,
          plantedAt: new Date().toISOString().split('T')[0],
          lastWatered: new Date().toISOString(),
        }
      };
    }

    setMyGarden((prevGarden) => [newPlant, ...prevGarden]);
    setNotification({ type: 'success', message: `¡${newPlant.species} añadida al huerto!` });
    
    setTimeout(() => setNotification(null), 3000);
  };

  const removePlant = useCallback((plantId) => {
    setMyGarden((prevGarden) => prevGarden.filter((plant) => plant.id !== plantId));
    
    setNotification({ type: 'info', message: 'Planta eliminada correctamente.' });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const waterPlant = useCallback((plantId) => {
    setMyGarden((prevGarden) => 
      prevGarden.map((plant) => {
        if (plant.id === plantId) {
          return {
            ...plant,
            stats: {
              ...plant.stats,
              lastWatered: new Date().toISOString()
            }
          };
        }
        return plant;
      })
    );
  }, []);

  const value = {
    myGarden,
    notification,
    addPlant,
    removePlant,
    waterPlant,
    weather: cachedWeather,
    weatherLoading: loading,
    weatherError: error
  };

  return (
    <GardenContext.Provider value={value}>
      {children}
    </GardenContext.Provider>
  );
};

export const useGarden = () => {
  const context = useContext(GardenContext);
  if (!context) {
    throw new Error('useGarden debe ser usado dentro de un GardenProvider');
  }
  return context;
};