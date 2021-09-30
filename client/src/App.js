
import './App.css';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import {useState} from 'react'
import {Switch, Route} from 'react-router-dom';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard'

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
        <Route exact path="/user/dashboard" component={UserDashboard} props={user}/>
      </Switch>
    </div>
  );
}

export default App;
