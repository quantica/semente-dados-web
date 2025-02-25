import { createBrowserRouter } from 'react-router-dom'

import { ROUTES } from './path'
import HomePage from '../pages/home'
import ProtectedRoute from '../components/ProtectedRoute'
import ProjectsPage from '../pages/projects'
import BusinessesPage from '../pages/businesses'
import ImpactsPage from '../pages/impacts'
import TeamPage from '../pages/team'
import ImpactDetail from '../pages/impacts/detail'
import ProjectDetail from '../pages/projects/detail'
import BusinessDetail from '../pages/businesses/detail'
import TeamDetail from '../pages/team/detail'

export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <HomePage /> },
      { element: <ProjectsPage />, path: ROUTES.project },
      { element: <ProjectDetail />, path: ROUTES.projectDetail },
      { element: <BusinessesPage />, path: ROUTES.business },
      { element: <BusinessDetail />, path: ROUTES.businessDetail },
      { element: <ImpactsPage />, path: ROUTES.impact },
      { element: <TeamPage />, path: ROUTES.team },
      { element: <TeamDetail />, path: ROUTES.teamDetail },
      { element: <ImpactDetail />, path: ROUTES.impactDetail }
    ]
  }
])
