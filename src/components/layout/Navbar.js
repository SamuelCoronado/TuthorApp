import React from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
/* import Badge from '@material-ui/core/Badge'
import MailIcon from '@material-ui/icons/Mail'
 */

const Navbar = ({isAuthenticated}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container collapse navbar-collapse" id="navbarColor01">

            {
                isAuthenticated?
                <>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Tutorings</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Sessions</Link>
                    </li>
                </ul>
                <div className="mx-auto">
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{width: '400px'}} />
                        <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Search tutoring</button>
                    </form>     
                </div> 
                <ul className="nav navbar-nav pull-sm-right">
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Logout</Link>
                    </li>
                </ul>
                </>
                :
                <ul className="nav navbar-nav pull-sm-right">
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Register</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="#">Login</Link>
                    </li>
                </ul>
            }
        
      </div>
      </nav>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps, null)(Navbar)