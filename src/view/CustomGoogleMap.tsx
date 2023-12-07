import {useEffect, useState} from "react";
import {Box, CircularProgress} from "@mui/material";
import {addQuest, deleteQuest, updateQuest} from "../services/firebase-database.ts";

let labelIndex = 1;
const center = {lat: 49.8397, lng: 24.0296};
const CustomGoogleMap = () => {
    const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
    const [markers, setMarkers] = useState<any[]>([]);

    useEffect(() => {
        const initMap = () => {
            const mapElement = document.getElementById("map") as HTMLElement;
            const map = new window.google.maps.Map(mapElement, {
                zoom: 15,
                center: center,
            });

            window.google.maps.event.addListener(map, "click", async (event: google.maps.KmlMouseEvent) => {
                await addMarker(event.latLng, map);
            });

            setIsMapLoaded(true);
        };

        const addMarker = async (location: any, map: google.maps.Map) => {
            try {
                const label = String(labelIndex++);
                const lat = location.lat();
                const lng = location.lng();

                const marker = new window.google.maps.Marker({
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    position: {lat, lng},
                    label,
                    map: map,
                });

                const id = await addQuest(label, {lat, lng});

                window.google.maps.event.addListener(marker, "dragend", async (event: any) => {
                    const updatedLat = event.latLng.lat();
                    const updatedLng = event.latLng.lng();

                    await updateQuest(id! ,label, {lat: updatedLat, lng: updatedLng});
                    console.log('Marker dragged. Updated position:', {lat: updatedLat, lng: updatedLng});
                })
                window.google.maps.event.addListener(marker, "click", () => {
                    removeMarker(id!, marker);
                });

                setMarkers((prevMarkers) => [...prevMarkers, { id, marker }]);
                console.log('addMarker');
            } catch (error) {
                console.error('Error adding marker:', error);
            }
        };

        const removeMarker = async (id: string, marker: google.maps.Marker) => {
            marker.setMap(null);

            setMarkers((prevMarkers) => prevMarkers.filter((m) => m.id !== id));

            await deleteQuest(id);
        };

        if (window.google && window.google.maps) {
            initMap();
        } else {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCohypMvHQY53-nZhUOl_eHWIzmTenwoCo&callback=initMap`;
            script.defer = true;
            script.async = true;
            script.onload = () => {
                initMap();
            };

            script.onerror = () => {
                console.error('Error loading Google Maps');
                setIsMapLoaded(false);
            };

            document.head.appendChild(script);
        }

    }, []);

    return (
        <Box sx={{position: "relative", width: "100%", height: "90vh", borderRadius: "10px"}}>
            {!isMapLoaded && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "white",
                        borderRadius: "10px",
                    }}
                >
                    <CircularProgress/>
                </Box>
            )}
            <div id={'map'} style={{width: '100%', height: '90vh', borderRadius: '10px'}}></div>
        </Box>
    );
};
export default CustomGoogleMap;