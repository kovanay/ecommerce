import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div className='p-12 text-center'>
      <h1>Acceso Denegado</h1>
      <p>No tienes los permisos necesarios para ver esta página.</p>
      <Link to="/login">Volver al inicio</Link>
    </div>
  );
};

export default UnauthorizedPage;
