import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookies } from 'react-cookie'
import { logout } from './../../utils/auth'

const Navigator = () => {
    const cookies = new Cookies()
    const [token, setToken] = useState();

    useEffect(() => {
        setToken(cookies.get("token"));
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link href="/">
                    <a className="navbar-brand">
                        {/* Ajustar imagen al div */}
                        {/* <img src="images/logo.png" className="img-fluid" style={{ "objectFit": "contain"}}/> */}
                        Home
                    </a>
                </Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="d-flex ms-auto">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {!token && (
                                <li className="nav-item">
                                    <Link href="/user/login">
                                        <a className="nav-link active" aria-current="page"
                                        >Log in</a>
                                    </Link>
                                </li>
                            )}
                            {!token && (
                                <li className="nav-item">
                                    <Link href="/user/register">
                                        <a className="nav-link">Register</a>
                                    </Link>
                                </li>
                            )}
                            {token && (
                                <li className="nav-item">
                                        <a className="nav-link" onClick={async () => await logout()} >Logout</a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigator;