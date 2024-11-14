import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Gestión de Usuarios y Experiencias</h1>
      <div className="button-container">
        <Link href="/usuarios">
          <button className="formdiv">Gestionar Usuarios</button>
        </Link>
        <Link href="/experiencias">
          <button className="formdiv">Gestionar Experiencias</button>
        </Link>
      </div>
    </div>
  );
}

