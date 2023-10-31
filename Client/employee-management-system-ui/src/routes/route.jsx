import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Base from "../pages/Base";
import SignIn from "../pages/signin";
import About from "../pages/About";

const AppRoutes = () => {

  const routes = createBrowserRouter([
		{
			path: '/',
			element: <Base />,
			children: [
				{
					path:'home',
					element: <Home />
				},
				{
					path: 'about',
					element: <About />
				}
			],
		},
		{
			path: 'signin',
			element: <SignIn />
		}
	]);

  return (<RouterProvider router={routes} />);
};

export default AppRoutes;