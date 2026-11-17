import { Navigate } from 'react-router';
import Home from './pages/Home';
import MinhasOcorrencias from './pages/MinhasOcorrencias';
import NovaOcorrencia from './pages/NovaOcorrencia';
import OcorrenciaDetalhe from './pages/OcorrenciaDetalhe';

/** @type {import('react-router').RouteObject[]} */
const routes = [
  { path: '/', element: <Navigate to="/home" replace /> },
  { path: '/home', element: <Home /> },
  { path: '/minhas-ocorrencias', element: <MinhasOcorrencias /> },
  { path: '/ocorrencias/nova', element: <NovaOcorrencia /> },
  { path: '/ocorrencias/:id', element: <OcorrenciaDetalhe /> },
];

export default routes;
