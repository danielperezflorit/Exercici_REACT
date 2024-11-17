import { useState } from 'react';

export default function ExperienciaList({
  experiencias = [],
  onDeleteExperience,
  onEditExperience, // Nueva prop
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (loading) return <p>Cargando experiencias...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleDelete = (id) => {
    if (onDeleteExperience) {
      onDeleteExperience(id);
    }
  };

  const handleEdit = (experience) => {
    if (onEditExperience) {
      onEditExperience(experience);
    }
  };

  return (
    <div>
      <h2-form>Lista de Experiencias</h2-form>
      <ul>
        {experiencias.map((exp) => (
          <li key={exp._id}>
            <p>
              <strong>Descripción:</strong> {exp.description}
            </p>
            <p>
              <strong>Dueño:</strong> {exp.owner}
            </p>
            <p>
              <strong>Participantes:</strong> {exp.participants.join(', ')}
            </p>
            <button onClick={() => handleEdit(exp)}>Editar</button> {/* Botón para editar */}
            <button onClick={() => handleDelete(exp._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

