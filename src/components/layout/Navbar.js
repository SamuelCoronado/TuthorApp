import React from 'react'
import {Link, useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
/* import Badge from '@material-ui/core/Badge'
import MailIcon from '@material-ui/icons/Mail'
 */
import {setSearchTerm, getTutorings} from '../../actions/searchActions';

const NavbarCustom = ({isAuthenticated, setSearchTerm, searchTerm, getTutorings}) => {

    const location = useLocation()
    return (
        <Navbar bg="dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
            {
                isAuthenticated?
                <Nav className="mr-auto">
                    <Nav.Link><Link className="nav-link" to="#">Tutorings</Link></Nav.Link>
                    <Nav.Link><Link className="nav-link" to="#">Sessions</Link></Nav.Link>
                    <Nav.Link><Link className="nav-link" to="#">Profile</Link></Nav.Link>
                    <Nav.Link><Link className="nav-link" to="#">Logout</Link></Nav.Link>
                </Nav>
                :
                <Nav className="mr-auto">
                     <Nav.Link><Link className="nav-link" to="#">Profile</Link></Nav.Link>
                    <Nav.Link><Link className="nav-link" to="#">Logout</Link></Nav.Link>
                </Nav>
                
            }
            <div className="form-inline my-2 my-lg-0">
             <input className="form-control mr-sm-2" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="search" placeholder="Search" aria-label="Search"/>
             {
                  location.pathname.split('/').includes('search') ?
                  <button  onClick={() => getTutorings(searchTerm)} className="btn btn-outline-info my-2 my-sm-0">Search tutoring</button>
                  :
                  <Link onClick={() => getTutorings(searchTerm)} to={'/search'} className="btn btn-outline-info my-2 my-sm-0">Search tutoring</Link>
             }
            </div>
            </Navbar.Collapse>
        </Navbar>
      /*   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"></button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

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
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Logout</Link>
                    </li>
                </ul>
                    <div className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="search" placeholder="Search" aria-label="Search"/>
                        {
                            location.pathname.split('/').includes('search') ?
                            <button  onClick={() => getTutorings(searchTerm)} className="btn btn-outline-info my-2 my-sm-0">Search tutoring</button>
                            :
                            <Link onClick={() => getTutorings(searchTerm)} to={'/search'} className="btn btn-outline-info my-2 my-sm-0">Search tutoring</Link>
                        }    
                   </div>     
                </>
                :
                <ul className="nav navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Register</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="#">Login</Link>
                    </li>
                </ul>
            }
        
      </div>
      </nav> */
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    tutorings: state.searchReducer.tutorings,
    searchTerm: state.searchReducer.searchTerm
})

export default connect(mapStateToProps, {setSearchTerm,getTutorings})(NavbarCustom)