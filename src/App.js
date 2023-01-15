import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './Components/AppNavbar';
import Home from './Pages/Home';
import  Login  from './Pages/Login';
import Signup from './Pages/Signup';
import { UserProvider } from './UserContext';

// import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from './Components/Footer';
import RoutesApp from './Components/RoutesApp';
import { useEffect, useState } from 'react';

function App() {
  let token = sessionStorage.getItem("token")
  const [currentUser, setCurrentUser] = useState({
      id: null,
      name: null,
      username: null,
      email: null,
      password: null,
      plan: null
  })

  useEffect(() => {
      token = sessionStorage.getItem("token")
      if(token !== null){
        let temp = []
      fetch(`https://pharaphraser-laravel.domingoec.net/api/user-details/${token}`)
        .then(response => response.json())
        .then(data => {
            setCurrentUser({
              id: data['data']['id'],
              name: data['data']['name'],
              username: data['data']['username'],
              email: data['data']['email'],
              password: data['data']['password'],
              plan: data['data']['plan']
            })
        })
      }
  }, [token])

  return (
    <UserProvider value={{currentUser, setCurrentUser}}>
        <RoutesApp/>
    </UserProvider>
  );
}

export default App;
