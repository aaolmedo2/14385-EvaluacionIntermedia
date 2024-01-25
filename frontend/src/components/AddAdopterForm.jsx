import { useState } from 'react';
import PropTypes from 'prop-types';

const AddAdopterForm = ({ onAdopterSubmit }) => {
    const [adopterNames, setAdopterNames] = useState(['', '', '']);
    
    const handleInputChange = (index, value) => {
        const newAdopterNames = [...adopterNames];
        newAdopterNames[index] = value;
        setAdopterNames(newAdopterNames);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        for (const adopterName of adopterNames) {
            if (!adopterName) {
                console.error('Debe ingresar respuestas válidas.');
                return;
            }
        }

        onAdopterSubmit(adopterNames);
        setAdopterNames(['', '', '']);
    };

    return (
        <form onSubmit={handleSubmit}>
            {adopterNames.map((adopterName, index) => (
                <input
                    key={index}
                    type="text"
                    value={adopterName}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    placeholder={`Respuesta ${index + 1}`}
                />
            ))}
            <br />
            <button type="submit">Agregar respuestas</button>
        </form>
    );
};

AddAdopterForm.propTypes = {
    onAdopterSubmit: PropTypes.func.isRequired,
};

export default AddAdopterForm;
