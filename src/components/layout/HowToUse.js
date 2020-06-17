import React from "react";

const HowToUse = () => {
  return (
    <div className="container my-3">
        <h5 className="text-center">
          Tuthor-app connects people who excel in some are with people who need
          help or want to improve their abilities
          <br />
          <br />
          <i className="fas fa-users fa-3x" />
          <i className="fas fa-link fa-3x" />
        </h5>
        <br />
        <hr />
        <h5 className="text-center">
          Are you good at something like math or physics? Offer your knowledge
          to anyone creating a <span className="font-italic">tutoring</span> and
          get some revenue while helping others.
          <br />
          <br />
          <i className="fas fa-edit fa-3x" />
          <i className="fas fa-hands-helping fa-3x" />
        </h5>
        <br />
        <hr />
        <h5 className="text-center">
          You created a tutoring and would like to know who asked for your
          knowledge? Check{" "}
          <span className="font-italic">sessions-&gt;active</span> section and
          see who is waiting for you to help out.
          <br />
          <br />
          <i className="far fa-newspaper fa-3x" />
          <i className="fas fa-glasses fa-3x" />
        </h5>
        <br />
        <hr />
        <h5 className="text-center">
          Perhaps you are struggling with French or maybe you want to prepare
          for that exam? or could it be that you want to level up your drawing?
          Just search for it and schedule a session with a tuthor who excels at
          it.
          <br />
          <br />
          <i className="far fa-calendar-plus fa-3x" />
          <i className="fas fa-chalkboard-teacher fa-3x" />
        </h5>
    </div>
  );
};

export default HowToUse;
