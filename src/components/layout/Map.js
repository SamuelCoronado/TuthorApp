import React,{useState, useEffect} from 'react'
import ReactMapGL, {Marker} from 'react-map-gl';
import {connect} from 'react-redux';
import {getCurrentPosition, updateMarker, zoomIn, zoomOut, setViewport, updateLocation} from '../../actions/sessionActions'
import LocationIcon from './location_icon.png'

const MapContainer = ({viewport, getCurrentPosition, updateMarker, zoomIn, zoomOut,setViewport,updateLocation}) => {

    console.log('entro en este momento');
    
    
   /*  const [viewport, setViewport] = useState({
            width: "100vw",
            height: "100vh",
            latitude: 42.430472,
            longitude: -123.334102, 
            zoom: 17    
          
    })
 */

    useEffect(() => {
        const getCurrentPositionFunction = async() => {
            await getCurrentPosition();
        }
        getCurrentPositionFunction()
    }, []) 

    const onClick = (e) => { 
        updateMarker(e)
        updateLocation(e.lngLat[1], e.lngLat[0])
        
    }
    //https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.json?access_token=pk.eyJ1Ijoic2FtdWVsY29yb25hZG8iLCJhIjoiY2p4MjZiMzAwMDR2djQzcHlyNWs2MXNjdiJ9.wbogdv9262vjvpvif6mvIQ
    
    return (
        <div className="container">
            
            {
                viewport == null?
                null
                :
                <ReactMapGL {...viewport}
                width="700px"
                height="300px"
                 mapStyle="mapbox://styles/mapbox/outdoors-v11"
                 mapboxApiAccessToken="pk.eyJ1Ijoic2FtdWVsY29yb25hZG8iLCJhIjoiY2p4MjZiMzAwMDR2djQzcHlyNWs2MXNjdiJ9.wbogdv9262vjvpvif6mvIQ"
                 onClick={(e) => onClick(e)}
                 onViewportChange={(viewport) =>setViewport(viewport)}

                  >
                 <div className="my-3 mx-3">
                     <button className="btn btn-primary" onClick={() => zoomIn()}>+</button><br/><br/>
                     <button className="btn btn-primary" onClick={() => zoomOut()}>-</button>
                 </div>
                 {
                     viewport.latitude !==null && viewport.longitude !==null?
                     <Marker
                     latitude={viewport.latitude}
                     longitude={viewport.longitude}
                     >
                         <img src={LocationIcon} alt=""/>
                     </Marker>
                     :
                     null
                 }
                
                 </ReactMapGL>   
            }
                   
        </div>
    )
}

const mapStateToProps = (state) => ({
     viewport: state.newSessionReducer.viewport
})

export default connect(mapStateToProps, {getCurrentPosition, updateMarker, zoomIn, zoomOut, setViewport, updateLocation})(MapContainer)
