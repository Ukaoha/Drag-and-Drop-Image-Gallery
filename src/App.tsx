// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Register from './Pages/Auth/Registar';
// import Login from './Pages/Auth/Login';
// import ResetPassword from './Pages/Auth/ResetPassword';
// import Gallery from './Components/ImageGallery/ImageGallery';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/resetpassword" element={<ResetPassword />} />
//         </Routes>
//       </BrowserRouter>
//       <DndProvider backend={HTML5Backend}>
//         <Gallery />
//       </DndProvider>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Pages/Auth/Registar';
import Login from './Pages/Auth/Login';
import ResetPassword from './Pages/Auth/ResetPassword';
// import Gallery from './Components/ImageGallery/ImageGallery';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { auth } from './firebase/Config';
import { User } from 'firebase/auth'; // Import User type
import Gallery from './Components/ImageGallery/Gallary';

function App() {
  const [user, setUser] = useState<User | null>(null); // Define the type explicitly

  useEffect(() => {
    // Add Firebase Authentication listener to track user's login status
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      // Unsubscribe from the Firebase Authentication listener when the component unmounts
      unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          {user && (
            <Route path="/gallery" element={<Gallery />}/>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
