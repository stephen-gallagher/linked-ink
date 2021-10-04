import React from 'react'
import { useEffect, useState, useRef } from 'react';
import axios from 'axios'
// import MapboxGL from "@react-native-mapbox-gl/maps";
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = "pk.eyJ1Ijoic3RlcGhlbmdhbGxhZ2hlciIsImEiOiJja25mdmVwN2wxYzd0Mm9vN3A2bjV1a2U1In0.2-AsAryWffIh9UqbCHW_GQ"

export default function StudioShow(props) {

    // const mapContainer = React.createRef()

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(0);
    const [zoom, setZoom] = useState(9);

 


    const [name, setName] = useState('')
    const [location , setLocation] = useState('')
    const [description, setDescription] = useState('')

    // const [geometry, setGeometry] = useState({})

    const getStudio = () => {
		// get request to the server
		axios.get(`/api/crud/studio/${props.match.params.id}`)
			.then(response => {
				console.log('geography',response.data[0].geometry.coordinates);
                setName(response.data[0].name)
                setLocation(response.data[0].location)
                setDescription(response.data[0].description)
                setLng(response.data[0].geometry.coordinates[0])
                setLat(response.data[0].geometry.coordinates[1])
                // setGeometry(response.data[0].geometry)
			})
			.catch(err => console.log(err));
	}
	useEffect(() => { 
		getStudio();

	}, [])

       useEffect(() => {
        if(lng !==0 ){
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: 14
        });
        // map.current = new mapboxgl.Marker()
        // .setLngLat([lng, lat])
        // .addTo(map)
    }
        }, [lat]);

        // let marker = new mapboxgl.marker()
        // .setLngLat([lng, lat])
        // .addTo(map)

        // useEffect(() => {
        //     if (!map.current) return; // wait for map to initialize
        //     map.current.on('move', () => {
        //     setLng(map.current.getCenter().lng.toFixed(4));
        //     setLat(map.current.getCenter().lat.toFixed(4));
        //     setZoom(map.current.getZoom().toFixed(2));
        //     });
        //     }, []);

    return (
        <div>
            <div>
            <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
                <div ref={mapContainer} className="mapContainer" />
            </div>

            <h1>{name}</h1>
            <h2>{location}</h2>
            <p>{description}</p>
            {/* <p>{geometry}</p> */}
        </div>
    )
}
