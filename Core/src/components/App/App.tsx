import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Viewer from '../../../../ComponentViewer/src/components/Viewer/Viewer';
import Core from '../Core/Core';
import AppCollection from '../../../../ComponentCollection/src/components/App/App';

export { Viewer };

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Core />,
      children: [
        {
          path: 'collection',
          element: <AppCollection />,
        },
      ],
    },
  ],
  { basename: '/inclusive-research-webdev' }
);

export default function App() {
  return <RouterProvider router={router} />;
}
