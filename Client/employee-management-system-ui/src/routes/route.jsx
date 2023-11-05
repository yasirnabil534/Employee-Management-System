import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import Base from "../pages/Base";
import Home from "../pages/Home";
import SignUp from "../pages/Signup";
import SignIn from "../pages/signin";

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