import React from 'react'
import {Link, useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
/* import Badge from '@material-ui/core/Badge'
import MailIcon from '@material-ui/icons/Mail'
 */
import {setSearchTerm, getTutorings} from '../../actions/searchActions';

const Navbar = ({isAuthenticated, setSearchTerm, searchTerm, getTutorings}) => {

    const location = useLocation()
    console.log(location.pathname.split('/').includes('search'));
    

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
                    <div className="form-inline">
                        <input className="form-control mr-sm-2" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="search" placeholder="Search" aria-label="Search" style={{width: '400px'}} />
                        {
                            location.pathname.split('/').includes('search') ?
                            <button  onClick={() => getTutorings(searchTerm)} className="btn btn-outline-info my-2 my-sm-0">Search tutoring</button>
                            :
                            <Link onClick={() => getTutorings(searchTerm)} to={'/search'} className="btn btn-outline-info my-2 my-sm-0">Search tutoring</Link>
                        }    
                   </div>     
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
    isAuthenticated: state.authReducer.isAuthenticated,
    tutorings: state.searchReducer.tutorings,
    searchTerm: state.searchReducer.searchTerm
})

export default connect(mapStateToProps, {setSearchTerm,getTutorings})(Navbar)