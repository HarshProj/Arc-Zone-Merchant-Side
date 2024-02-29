import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from '../context/LoginContext';
import './CSS/Navbar.css'

export default function Navbar({ login }) {

    const { setModalOpen } = useContext(LoginContext)
    const loginStatus = () => {
        const token = localStorage.getItem("jwt");
        if (login || token) {
            return [
                <>
                   
                    <Link className="nav-hower" to="/addproduct">
                        <li>Add Product</li>
                    </Link>
                    <Link className="nav-hower" to="/viewproduct">
                        <li>View Product</li>
                    </Link>
                    <Link className="nav-hower" to="/orders">
                        <li>Orders</li>
                    </Link>
                    <Link className="nav-hower" to="">
                        <span onClick={() => {setModalOpen(true)}} class="material-symbols-outlined">
                            logout
                        </span>
                    </Link>
                    
                </>,
            ];
        } else {
            return [
                <>
                    <Link className="nav-hower" to="/signup">
                        <li className="primaryBtn2">signup</li>
                    </Link>
                    <Link className="nav-hower" to="/signin">
                        <li className="primaryBtn2">signin</li>
                    </Link>
                </>,
            ];
        }
    };


  return (
    <div className='navbar'>

        <Link to={'/'}>
            <h1>Navbar</h1>
        </Link>
        <ul className="nav-menu">
                {loginStatus()}
        </ul>
    </div>
  )
}
