import { useEffect, useState } from 'react';
import ExperienciaList from '../components/ExperienciaList';
import ExperienciaForm from '../components/ExperienciaForm';

export default function Experiencias() {
  const [experiencias, setExperiencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingExperience, setEditingExperience] = useState(null); // Estado para la experiencia en edición
  const URL = "http://localhost:3000/api/experiencias";

  useEffect(() => {
    setLoading(true);
    const fetchExperiencias = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setExperiencias(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchExperiencias();
  }, []);

  const handleExperienciaSubmit = async (experience) => {
    if (editingExperience) {
      // Actualizar experiencia existente
      try {
        const response = await fetch(`${URL}/${editingExperience._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(experience),
        });
  
        if (!response.ok) {
          throw new Error('Error al actualizar la experiencia');
        }
  
        const updatedExperience = await response.json();
  
        // Actualizar la lista de experiencias inmediatamente
        setExperiencias((prevExperiencias) =>
          prevExperiencias.map((exp) =>
            exp._id === updatedExperience._id ? updatedExperience : exp
          )
        );
  
        setEditingExperience(null); // Salir del modo edición
      } catch (err) {
        console.error(err.message);
      }
    } else {
      // Crear nueva experiencia
      try {
        const response = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(experience),
        });
  
        if (!response.ok) {
          throw new Error('Error al crear la experiencia');
        }
  
        const data = await response.json();
  
        // Agregar la nueva experiencia a la lista
        setExperiencias((prevExperiencias) => [...prevExperiencias, data]);
      } catch (err) {
        console.error(err.message);
      }
    }
  };
  

  const handleDeleteExperience = async (expId) => {
    try {
      const response = await fetch(`${URL}/${expId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la experiencia');
      }

      setExperiencias(experiencias.filter((exp) => exp._id !== expId)); // Actualiza la lista
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditExperience = (experience) => {
    setEditingExperience(experience); // Activa el modo edición
  };

  return (
    <div className="form-container">
      <h2-form>Gestión de Experiencias</h2-form>
      {loading && <p>Cargando experiencias...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <ExperienciaList
            experiencias={experiencias}
            onDeleteExperience={handleDeleteExperience}
            onEditExperience={handleEditExperience} // Nueva función para editar
          />
          <ExperienciaForm
            onSubmit={handleExperienciaSubmit}
            editingExperience={editingExperience} // Pasar experiencia en edición
          />
        </>
      )}
    </div>
  );
}

