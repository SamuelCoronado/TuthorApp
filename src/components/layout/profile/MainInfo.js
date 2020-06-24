import React, {useState} from 'react'
import {connect} from 'react-redux';
import {setProfileImage} from '../../../actions/profileActions'
import {Link} from 'react-router-dom';
import axios from 'axios';

const MainInfo = ({name, city, state, rating, birthdate, profileImage, setProfileImage, id}) => {

    const [file, setFile] = useState('');

    const [filename, setFilename] = useState('Choose file');

    const userId = id;

    const onChange = (e) => {
      setFile(e.target.files[0])
      setFilename(e.target.files[0].name)
    }

    const onSubmit = async(e) => {
      e.preventDefault()
      if(file == '' || filename == ''){
        alert('You have to select a file');
        return;
      }
      await setProfileImage(file)
      /* window.location.reload();
      return false */
    }

    return (
        <div className="container p-4">
          <div className="row">
            <div className="col-md-3">
              <img src={`https://tuthor-app.herokuapp.com/images/${profileImage}`} style={{width: '250px', height: '250px'}} alt="" />
              <form className="mt-3" onSubmit={(e) => onSubmit(e)}>
                <div className="custom-file">
                  <input type="file" className="custom-file-input" name="image" onChange={(e) => onChange(e)}/>
                  <label className="custom-file-label" htmlFor="customFile">{filename}</label>
                </div>
                  <input type="submit" value="Upload" className="btn btn-info btn-block mt-3"/>
              </form>
            </div>
            <div className="col-md-9">
              <p className="font-weight-bold"><i className="fas fa-user"></i> {name}</p>
              <p className="font-weight-bold"><i className="fas fa-globe-americas"></i> {city}, {state}</p>
              {/* <p>{rating}</p> */}
              <p className="font-weight-bold"><i className="fas fa-birthday-cake"></i> {new Date(Date.now()).getFullYear() - new Date(birthdate).getFullYear()} years</p>
               <Link className="btn btn-info" to={`/user/${userId}/tutorings`}>View active tutorings</Link>
            </div>
          </div>
      </div>
    )
}

export default connect(null, {setProfileImage})(MainInfo)