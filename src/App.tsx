import { useState } from 'react';
import './App.css';
import NavBar from './Components/NavBar/navbar';
import SignUp from './Views/SignUp/signup';
import Login from './Views/Login/login';
import Home from './Views/Home/home';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  // const [theme, setTheme] = useState('theme1'); // Add the theme state

  // const changeTheme = () => {
  //   // Logic to change the theme
  //   // For example, toggle between theme1, theme2, theme3, and theme4
  //   if (theme === 'theme1') {
  //     setTheme('theme2');
  //   } else if (theme === 'theme2') {
  //     setTheme('theme3');
  //   } else if (theme === 'theme3') {
  //     setTheme('theme4');
  //   } else {
  //     setTheme('theme1');
  //   }
  // };

  const theme = createTheme({
    // Define your theme properties here
    // You can use the theme state to dynamically change the theme values
  });

  return (
    <ThemeProvider theme={theme}>
      <NavBar isUserSignedIn={isUserSignedIn} setIsUserSignedIn={setIsUserSignedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login setIsUserSignedIn={setIsUserSignedIn} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
