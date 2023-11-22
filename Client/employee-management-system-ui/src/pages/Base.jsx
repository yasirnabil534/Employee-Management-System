import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import BaseComponent from '../components/BaseComponent';
import theme from '../themes/themes';


const Base = () => {
	const navigate = useNavigate();
	const location = useLocation();
	useEffect(() => {
		if (location.pathname === '/') {
			navigate('home');
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

  return (
		<ThemeProvider theme={theme}>
			<Box component='div' mt={8} sx={ 
				{ 
					height: '93vh',
					width: '100vw',
					bgcolor: 'backgroundColor.main',
					overflowY: 'auto'
				} 
			}>
				<BaseComponent />
        <Outlet />
			</Box>
		</ThemeProvider>
	);
};

export default Base;
