// App.jsx
import { useState, useEffect } from 'react';
import AdoptionForm from './components/AdoptionForm';
import AdoptionList from './components/AdoptionList';
import AvailableList from './components/AvailableList';
import AddDogForm from './components/AddDogForm';
import AddAdopterForm from './components/AddAdopterForm';
import Evaluacion from './pages/evaluacion';
import { Routes, Route, Link } from 'react-router-dom';

const App = () => {
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
    <div className="App">

       <h5 style={{ marginTop: 0, textAlign: 'left' }}>ROL: Profesor</h5>
      <h2>Respuestas y Preguntas</h2>
      <AvailableList dogs={dogs} adopters={adopters} />
      <h2>Agregar nueva pregunta</h2>
      <AddDogForm onDogSubmit={handleDogSubmit} />
      <h2>Agregar nueva respuesta</h2>
      <AddAdopterForm onAdopterSubmit={handleAdopterSubmit} />
      <h2>Asignar Respuestas</h2>
      <AdoptionForm dogs={dogs} adopters={adopters} onAdoptionSubmit={handleAdoptionSubmit} />
      <div className="Eva">

      <h1>Visualizar evaluacion</h1>
      <Routes>
        <Route path='/evaluacion' element ={<Evaluacion></Evaluacion>}></Route>
      </Routes>
      <Link to='/evaluacion'>
            <button>Cargar Evaluación</button>
      </Link>
      
      {/* <AdoptionList adoptions={adoptions} dogs={dogs} adopters={adopters} /> */}
      </div>

    </div>
  );
};

export default App;
