import { useState, useEffect } from 'react';

export default function ExperienciaForm({ onSubmit, editingExperience }) {
  const [description, setDescription] = useState('');
  const [owner, setOwner] = useState('');
  const [participants, setParticipants] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user`);
        const data = await response.json();
        setUsers(data);
        setLoadingUsers(false);
      } catch (err) {
        console.error('Error al cargar los usuarios:', err);
      }
    };

    fetchUsers();
  }, []);

  // Rellenar el formulario si hay una experiencia en edición
  useEffect(() => {
    if (editingExperience) {
      setDescription(editingExperience.description || '');
      setOwner(editingExperience.owner || '');
      setParticipants(editingExperience.participants || []);
    } else {
      setDescription('');
      setOwner('');
      setParticipants([]);
    }
  }, [editingExperience]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (description && owner) {
      const newExperience = { description, owner, participants };
      onSubmit(newExperience);
    } else {
      alert('Debes completar todos los campos');
    }
  };

  if (loadingUsers) return <p>Cargando usuarios...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2-form>{editingExperience ? 'Editar Experiencia' : 'Crear Experiencia'}</h2-form>
      <div>
        <label>Descripción de la experiencia:</label>
        <input
          className="formdiv"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label>Seleccionar dueño:</label>
        <select
          className="formdiv"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        >
          <option value="">--Selecciona un usuario--</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Seleccionar participantes:</label>
        <select
          className="formdiv"
          multiple
          value={participants}
          onChange={(e) => {
            const selectedParticipants = Array.from(
              e.target.selectedOptions,
              (option) => option.value
            );
            setParticipants(selectedParticipants);
          }}
        >
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">
        {editingExperience ? 'Actualizar Experiencia' : 'Crear Experiencia'}
      </button>
    </form>
  );
}

