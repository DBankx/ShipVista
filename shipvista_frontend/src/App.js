import React from 'react';
import { extendTheme, ChakraProvider, Container, Box } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { HOME } from './constants/appRoutes';
import Navbar from './components/nav/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const extendedChakraUiTheme = extendTheme({
	fonts: {
		body: 'Karla, sans-serif'
	},
	styles: {
		global: {
			body: '#fff'
		}
	}
});

function App() {
  return (
	  <ChakraProvider theme={extendedChakraUiTheme}>
	  <ToastContainer position='top-right' />
	  <Navbar />
	  <Container mt='2em' maxW='container.xl'>
	  <Routes>
	  	<Route path={HOME} exact element={<Home />} />
		<Route path='*' exact element={<Home />} />
	  </Routes>

<Box mt='2em'>
	  <footer>
		  <Box textAlign='center'>Made with ♥️ by Dami</Box>
	  </footer>
</Box>
	  </Container>
	</ChakraProvider>
  );
}

export default App;
