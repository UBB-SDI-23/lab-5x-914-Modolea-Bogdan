import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar.js';
import Home from './pages/Home.js';
import AllTeams from './team/AllTeams.js';
import AddTeam from './team/AddTeam.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditTeam from './team/EditTeam';
import ViewTeam from './team/ViewTeam';

function App() {
  const toAddURL = 'lab-5x-914-Modolea-Bogdan/';
  // const toAddURL = '';
  
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route exact path={"/"+toAddURL} element={<Home />}></Route>
          <Route path={"/" + toAddURL +  "teams"} element={<AllTeams />}></Route>
          <Route exact path={"/" + toAddURL +  "addTeam"} element={<AddTeam />}></Route>
          <Route exact path={"/" + toAddURL + "updateTeam/:id"} element={<EditTeam />}></Route>
          <Route exact path={"/" + toAddURL + "viewTEam/:id"} element={<ViewTeam />}></Route>
          {/* <Route exact path="/leagues" element={<AllLeagues />}></Route> */}
          {/* <Route exact path="/addLeague" element={<AddLeague />}></Route> */}
          {/* <Route exact path="/fans" element={<AllFans />}></Route> */}
          {/* <Route exact path="/addFan" element={<AddFan />}></Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
