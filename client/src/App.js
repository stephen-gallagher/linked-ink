
import './App.css';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import {useState} from 'react'
import {Switch, Route} from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login'
import UserDashboard from './pages/UserDashboard'
import ArtistDashboard from './pages/ArtistDashboard'
import ProtectedRoute from './components/ProtectedRoute';


function App(props) {

  const [user, setUser] = useState()
  const [artist,setArtist] = useState()

  const addUser = user => {
    setUser(user)
  }
  console.log('user: ',user)
  console.log('artist: ', artist)

  const addArtist = artist => {
    setArtist(artist)
  }

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Homepage}/>
        <Route 
          exact path="/signup" 
          render={props => <Signup setUser={addUser} {...props} />}
          />
        <Route
          exact path="/login"
          render={props => <Login setUser={addUser} {...props} />}
        />
        <ProtectedRoute 
        exact path="/user/dashboard" 
        user={user}
        component={UserDashboard}/>
         <ProtectedRoute 
        exact path="/artist/dashboard" 
        user={user}
        component={ArtistDashboard}/>
      </Switch>
    </div>
  );
}

export default App;
