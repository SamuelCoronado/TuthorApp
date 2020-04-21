import React,{useState, useEffect} from 'react'
import ReactMapGL, {Marker} from 'react-map-gl';
import LocationIcon from './location_icon.png'

const Map = () => {
    
    const [viewport, setViewport] = useState({
            width: "100vw",
            height: "100vh",
            latitude: 42.430472,
            longitude: -123.334102, 
            zoom: 17    
          
    })

    const getLatAndLong = () => {
        navigator.geolocation.getCurrentPosition(position => {
            setViewport({...viewport, latitude: position.coords.latitude, longitude: position.coords.longitude})
        })
    }

    useEffect(() => {
        getLatAndLong();
    }, [])

    const onClick = (e) => {
        const lngLat = e.lngLat;
        const latitude =  lngLat[1];
        const longitude = lngLat[0];
        setViewport({...viewport, latitude: Number(latitude), longitude: Number(longitude)})
        console.log(Number(latitude), Number(longitude));
        
    }

    const zoomIn = (e) => {
        setViewport({...viewport, zoom:viewport.zoom+1})
    }
    const zoomOut = (e) => {
        setViewport({...viewport, zoom:viewport.zoom-1})
    }

    //https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.json?access_token=pk.eyJ1Ijoic2FtdWVsY29yb25hZG8iLCJhIjoiY2p4MjZiMzAwMDR2djQzcHlyNWs2MXNjdiJ9.wbogdv9262vjvpvif6mvIQ
    

    return (
        <div>
            
            <ReactMapGL {...viewport}
            mapStyle="mapbox://styles/mapbox/outdoors-v11"
            mapboxApiAccessToken="pk.eyJ1Ijoic2FtdWVsY29yb25hZG8iLCJhIjoiY2p4MjZiMzAwMDR2djQzcHlyNWs2MXNjdiJ9.wbogdv9262vjvpvif6mvIQ"
            onClick={(e) => onClick(e)}
            onViewportChange = {(viewport) => setViewport(viewport)}
             >
            <div className="my-3 mx-3">
                <button className="btn btn-primary" onClick={(e) => zoomIn(e)}>+</button><br/><br/>
                <button className="btn btn-primary" onClick={(e) => zoomOut(e)}>-</button>
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
        </div>
    )
}

export default Map
