import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../contexts/Contexts";
import { getAccess } from "../services/authServices";

const SecureRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
	useEffect(() => {
    console.log('rendering secure route');
    if (Object.keys(user).length === 0) {
      const checkAuth = async () => { 
        const currentUser = await getAccess();
        if (!currentUser) {
          navigate('/signin');
        } else {
          setUser(() => ({...currentUser}));
          console.log('check', user);
        }
      };
      checkAuth();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return children;
};

export default SecureRoute;

