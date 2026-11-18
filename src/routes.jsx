import { Navigate } from 'react-router';
import Eventos from './pages/Eventos';
import Home from './pages/Home';
import MinhasOcorrencias from './pages/MinhasOcorrencias';
import Mural from './pages/Mural';
import NoticiaDetalhe from './pages/NoticiaDetalhe';
import Noticias from './pages/Noticias';
import NovaOcorrencia from './pages/NovaOcorrencia';
import OcorrenciaDetalhe from './pages/OcorrenciaDetalhe';
import ZeladorComunicacao from './pages/ZeladorComunicacao';
import ZeladorDemandas from './pages/ZeladorDemandas';
import ZeladorEventos from './pages/ZeladorEventos';
import ZeladorIniciativas from './pages/ZeladorIniciativas';
import ZeladorPainel from './pages/ZeladorPainel';

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
  { path: '/zelador', element: <Navigate to="/zelador/painel" replace /> },
  { path: '/zelador/painel', element: <ZeladorPainel /> },
  { path: '/zelador/demandas', element: <ZeladorDemandas /> },
  { path: '/zelador/iniciativas', element: <ZeladorIniciativas /> },
  { path: '/zelador/comunicacao', element: <ZeladorComunicacao /> },
  { path: '/zelador/eventos', element: <ZeladorEventos /> },
];

export default routes;
