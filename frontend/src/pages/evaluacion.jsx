
import AdoptionList from '../components/AdoptionList';
import { useState, useEffect } from 'react';
import AdoptionForm from '../components/AdoptionForm';

import AvailableList from '../components/AvailableList';
import AddDogForm from '../components/AddDogForm';
import AddAdopterForm from '../components/AddAdopterForm';
import { Routes, Route, Link } from 'react-router-dom';

const Evaluacion = () => {
  const [dogs, setDogs] = useState([]);
  const [adopters, setAdopters] = useState([]);
  const [adoptions, setAdoptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dogsResponse = await fetch('http://localhost:3001/dogs');
        const dogsData = await dogsResponse.json();
        setDogs(dogsData);

        const adoptersResponse = await fetch('http://localhost:3001/adopters');
        const adoptersData = await adoptersResponse.json();
        setAdopters(adoptersData);

        const adoptionsResponse = await fetch('http://localhost:3001/adoptions');
        const adoptionsData = await adoptionsResponse.json();
        console.log('Adopciones:', adoptionsData);
        setAdoptions(adoptionsData);
      } catch (error) {
        console.error('Error al cargar datos:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleAdoptionSubmit = async (dogId, adopterId) => {
    try {
      const response = await fetch('http://localhost:3001/adoptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dogId,
          adopterId,
        }),
      });

      if (response.ok) {
        const newAdoption = await response.json();
        setAdoptions((prevAdoptions) => [...prevAdoptions, newAdoption]);

        // Mostrar una alerta con los datos de la nueva adopción
        alert(`¡Adopción realizada con éxito!\nID: ${newAdoption.id}\nPerro: ${newAdoption.dogId}\nAdoptante: ${newAdoption.adopterId}`);
      } else {
        throw new Error('Error al enviar la solicitud de adopción.');
      }
    } catch (error) {
      console.error('Error en la solicitud de adopción:', error.message);
      throw error;
    }
  };

  const handleDogSubmit = (dogName) => {
    setDogs([...dogs, { id: dogs.length + 1, name: dogName }]);
  };

  const handleAdopterSubmit = (adopterName) => {
    setAdopters([...adopters, { id: adopters.length + 1, name: adopterName }]);
  };



  return (
    <div>Evaluacion
    <AdoptionList adoptions={adoptions} dogs={dogs} adopters={adopters} />
    </div>  
  )
}

export default Evaluacion;