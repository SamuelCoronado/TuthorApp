import React from 'react'
import Study from './Study';

const StudiesContainer = ({studies}) => {
    return (
        <div className="col-md-3 border-right border-secundary">
            <h3 className="text-center">Studies</h3>
            {
                studies.length === 0 ?
                <button className="btn btn-block btn-primary">Add a study</button>
                :
                studies.length === 3 ?
                studies.map((study) => {
                    return(
                        <Study signature={study.signature} institute={study.institute} period={study.period} description={study.description}/>
                       
                    )
                })
                :
                studies.map((study, index) => {
                    if(index === studies.length-1){
                        return(
                            <>
                                <Study signature={study.signature} institute={study.institute} period={study.period} description={study.description}/>
                                <button className="btn btn-block btn-primary">Add a study</button>
                            </>
                        )
                    }
                    return(
                        <Study signature={study.signature} institute={study.institute} period={study.period} description={study.description}/>
                       
                    )
                })
                
            }
            
            
      </div>
    )
}

export default StudiesContainer