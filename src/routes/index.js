import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import UserRoutes from './UserRoutes';
import LeadsRoutes from './LeadsRoutes';
import ManagementRoutes from './ManagementRoutes';
import StockRoutes from './StockRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([LoginRoutes, UserRoutes, LeadsRoutes, MainRoutes, ManagementRoutes, StockRoutes]);
}
