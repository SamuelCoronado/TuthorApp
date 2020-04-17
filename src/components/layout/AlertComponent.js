import React from 'react'
import {Alert} from '@material-ui/lab';
import {connect} from 'react-redux'

const AlertComponent = ({alerts}) => {
    return (
        <div className="container my-3">
            {
                alerts.length > 0 ?
                alerts.map((alert) => {
                    return(
                        <Alert variant="filled" severity={alert.type}>
                            {alert.message}
                        </Alert> 
                    )
                })
                :
                null
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    alerts: state.alertReducer.alerts
})

export default connect(mapStateToProps, null)(AlertComponent) 
