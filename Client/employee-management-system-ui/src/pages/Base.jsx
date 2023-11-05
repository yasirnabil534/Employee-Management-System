import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import BaseComponent from '../components/BaseComponent';
import theme from '../themes/themes';


const Base = () => {
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
