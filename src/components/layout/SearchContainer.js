import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {connect} from 'react-redux';
import Tutoring from "../layout/tutoring/Tutoring";
import { getChunks } from "./tutoring/TutoringsContainer";

const SearchContainer = ({tutorings}) => {

  /* const { term } = useParams();
  console.log(term);

  const [tutorings, setTutorings] = useState(null);

  useEffect(() => {
    const getTutorings = async (term) => {
      const res = await axios.get(
        "http://localhost:3000/api/tutorings/search/"+term
      );
      setTutorings(res.data);
    };

    getTutorings(term);
  }, []); */

  return (
    <>
      {tutorings ? (
        <div className="container">
          {getChunks(tutorings).map((array) => {
            return (
              <div className="row my-4">
                {array.map((tutoring) => (
                  <div className="col-md-4 mb-3">
                    <Tutoring tutoringInfo={tutoring} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
    tutorings: state.searchReducer.tutorings
});

export default connect(mapStateToProps, null)(SearchContainer)
