import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import NavBar from './Components/NavBar/navbar';
import SignUp from './Views/SignUp/signup';
import Login from './Views/Login/login';
import Home from './Views/Home/home';
import SearchBar from './Components/SearchBar/searchbar';
import Results from './Views/Results/results';
import Profile from './Views/Profile/profile';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import BackgroundMusic from './Components/BackgroundMusic/Backgroundmusic';
import { ToastContainer } from 'react-toastify';

function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [themeMode, setThemeMode] = useState('light');

  const handleThemeChange = (themeMode: string) => {
    setThemeMode(themeMode);
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#000000', // Update with primary color for your theme
      },
      secondary: {
        main: '#ffffff', // Update with secondary color for your theme
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
      position="top-right" // Adjust the position to your preference
      autoClose={3000} // Set the autoClose duration (in milliseconds) for the notifications
      hideProgressBar // Hide the progress bar
      newestOnTop={false} // Show newer notifications below older ones
      closeOnClick // Close the notification when clicked
      rtl={false} // Set to true for right-to-left languages
      pauseOnFocusLoss // Pause the notifications when the window loses focus
      draggable // Allow dragging the notifications
      pauseOnHover // Pause the notifications when hovered
      limit={5} // Limit the number of notifications shown at the same time
    />
      <CssBaseline />
      <div className="app">
        <NavBar
          isUserSignedIn={isUserSignedIn}
          setIsUserSignedIn={setIsUserSignedIn}
          handleThemeChange={handleThemeChange}
        />
        <BackgroundMusic/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login setIsUserSignedIn={setIsUserSignedIn} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/results" element={<Results />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
