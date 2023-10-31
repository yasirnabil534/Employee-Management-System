const publicRoutes = ['/signin', '/signup'];

const baseRouter = (navigate, path) => {
  if (publicRoutes.includes(path)) {
    navigate(path);
  } else {
    navigate('/signin');
  }
};

export {
  baseRouter
};

