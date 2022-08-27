import React from 'react'
import {BiCoinStack} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    return (
        <>
         <Link to='/'>
            <div className='navbar'>
                <BiCoinStack className='icon' />
                <h1> CRYPco</h1><Link to='/crypto'><h1 className='news'>| News</h1></Link>
            </div>
         </Link>
            {/* <Link to='/crypto'><h1>News</h1></Link> */}
        </>
    )
}

export default Navbar
