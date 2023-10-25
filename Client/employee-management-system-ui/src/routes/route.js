import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Base from '../pages/Base';

const AppRoutes = () => {
	const paths = [
		{
			path: '/',
			element: <Base />,
		}
	];

  const routes = createBrowserRouter(paths);

  return <RouterProvider router={routes} />;
};

export default AppRoutes;