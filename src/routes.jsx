import { Navigate } from 'react-router';
import Eventos from './pages/Eventos';
import Home from './pages/Home';
import MinhasOcorrencias from './pages/MinhasOcorrencias';
import Mural from './pages/Mural';
import NoticiaDetalhe from './pages/NoticiaDetalhe';
import Noticias from './pages/Noticias';
import NovaOcorrencia from './pages/NovaOcorrencia';
import OcorrenciaDetalhe from './pages/OcorrenciaDetalhe';

/** @type {import('react-router').RouteObject[]} */
const routes = [
  { path: '/', element: <Navigate to="/home" replace /> },
  { path: '/home', element: <Home /> },
  { path: '/minhas-ocorrencias', element: <MinhasOcorrencias /> },
  { path: '/ocorrencias/nova', element: <NovaOcorrencia /> },
  { path: '/ocorrencias/:id', element: <OcorrenciaDetalhe /> },
  { path: '/mural', element: <Mural /> },
  { path: '/eventos', element: <Eventos /> },
  { path: '/noticias', element: <Noticias /> },
  { path: '/noticias/:id', element: <NoticiaDetalhe /> },
];

export default routes;
