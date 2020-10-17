import React, { useContext } from 'react';
import LandingPage from './components/LandingPage';
// import { AppContext } from './AppContext';

// const { signInWithGoogle } = useContext(AppContext);

function App() {
  return (
    <div>
      {/* <button onclick={signInWithGoogle}></button> */}
      <LandingPage />
    </div>
  );
}

export default App;