"use client";
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
function NavBar() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState('');
    useEffect(() => {
        const checkLoginStatus = async () => {
            const userToken = Cookies.get('user');
            if (userToken) {
                setIsLoggedIn(true);
                setUser(userToken);
            }
        };

        checkLoginStatus();
    }, []);
    const handleLogout = async () => {
        toast.success('Logged Out Successfully');
        const res = await fetch('/api/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.ok) {
            router.push('/login');
        }
    }
    return (
        <nav>
            <Link href="/">
                <div className="logo"></div>
            </Link>
            {
                <span className='d-flex align-items-center flex-column'>
                        <div>
                            {isLoggedIn && user}
                        </div>
                    <button onClick={handleLogout}
                        className={`logout-button ${!isLoggedIn && "hide"}`}

                    >
                        <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>
                    </button>
                </span>
            }

        </nav>
    );
}

export default NavBar;
