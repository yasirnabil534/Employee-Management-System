import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Base from "../pages/Base";
import SignIn from "../pages/signin";
import About from "../pages/About";
import SignUp from "../pages/Signup";

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
		},
		{
			path: '/signup',
			element: <SignUp />
		}
	]);

  return (<RouterProvider router={routes} />);
};

export default AppRoutes;