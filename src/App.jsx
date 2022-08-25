import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.scss';
import NavbarNav from './components/NavbarNav'
import Sidebar from './components/Sidebar';
 import Home from './pages/Home'
 import Login from './pages/Login'
import ManageEmployeesPage from './pages/ManageEmployeesPage'
import ManageSkillsPage from './pages/ManageSkillsPage'
function App() {
  return (
    <BrowserRouter>

      {/* <Routes>
        <Route path='/'  exact={true} element={<Login />}></Route>
      </Routes> */}
      <div className="flex">
        <Sidebar />
        <div className="content w-100">
          <NavbarNav />
          <Routes>
            {/* <Route path='/'  exact={true} element={<Login />}></Route> */}
            <Route path='/'  exact={true} element={<Home />}></Route>
            <Route path='/employee/manage' exact={true} element={<ManageEmployeesPage />}></Route>
            <Route path='/employee/skills' exact={true} element={<ManageSkillsPage />}></Route>
          </Routes>
        </div>
      </div>
      
    </BrowserRouter>
  );
}

export default App;
