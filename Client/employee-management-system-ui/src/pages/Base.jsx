import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import BaseComponent from '../components/BaseComponent';
import theme from '../themes/themes';


const Base = () => {
	const navigate = useNavigate();
	useEffect(() => {
		navigate('home');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

  return (
		<ThemeProvider theme={theme}>
			<Box component='div' mt={8} sx={ 
				{ 
					height: '93vh',
					width: '100vw',
					bgcolor: 'backgroundColor.main'
				} 
			}>
				<BaseComponent />
        <Outlet />
			</Box>
		</ThemeProvider>
	);
};

export default Base;
