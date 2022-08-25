import React from 'react'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className="sidebar bg-light">
    <ul>
        <li>
          <center>
            <img src="/capgemini.png" alt="Logo" className="brand-image" width="120" height="30"/>
          </center>
          <hr width = "100%"></hr>
        
        </li>      
        <li>

            <NavLink to="/" exact className='text-dark rounded py-2 w-100 d-inline-block px-3' >Home</NavLink>

            
        </li>
        <li>

            <NavLink to="/employee/manage" exact className='text-dark rounded py-2 w-100 d-inline-block px-3' >Manage Employees</NavLink>

        </li>
        <li>

            <NavLink to="/employee/skills" exact className='text-dark rounded py-2 w-100 d-inline-block px-3' >Manage Skills</NavLink>

        </li>
    </ul>
    </div>

  )
}

export default Sidebar