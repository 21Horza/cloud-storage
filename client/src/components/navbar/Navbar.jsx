import React, {useState} from 'react'
import './navbar.css'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/reducers/userReducer'
import {getFiles, searchFiles} from "../../store/actions/file";
import {showLoader} from "../../store/reducers/appReducer";
import { API_URL } from '../../config'
import {BsCloudsFill} from "react-icons/bs"
import userIcon from "../../assets/img/userIcon.png"

function Navbar() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)
  const currentUser = useSelector(state => state.user.currentUser)
  const [searchName, setSearchName] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(false)

  const userPic = currentUser?.avatar ? `${API_URL + currentUser.avatar}` : userIcon

    function searchChangeHandler(e) {
        setSearchName(e.target.value)
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout)
        }
        dispatch(showLoader())
        if(e.target.value !=='') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value));
            }, 500, e.target.value))
        } else {
            dispatch(getFiles(currentDir))
        }
    }

  return (
    <>
        <div className="container">
            <BsCloudsFill className='cloudIcon' />
            <div 
                className='navbar__header'
            >
                <NavLink 
                className="link"
                to='/'>
                    <h2>
                        Cloud Storage
                    </h2>
                </NavLink>
            </div>
            {isAuth && <input
                    value={searchName}
                    onChange={e => searchChangeHandler(e)}
                    className='navbar__search'
                    type="text"
                    placeholder="File name..."/>}
            {!isAuth && <div className='navbar__login'><NavLink className='link link__login' to="/login">Login</NavLink></div> }
            {!isAuth && <div className='navbar__registration'><NavLink className='link link__registration' to="/registration">Sign Up</NavLink></div> }
            {isAuth && <div className='navbar__login link__exit' onClick={() => dispatch(logout())}>Exit</div> }
            {isAuth && <NavLink to='/profile'>
            {isAuth && 
            <img src={userPic} className='userIcon' alt=""/>
            }
            </NavLink>}
        </div>
    </>
  )
}

export default Navbar