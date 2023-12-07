import {Box, Button, Paper, Typography} from "@mui/material";
import {indigo} from "@mui/material/colors";
import CustomGoogleMap from "./CustomGoogleMap.tsx";

const App = () => {
    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Paper sx={{
                bgcolor: indigo[500],
                padding: 1,
                borderRadius: 5,
                zIndex: 1,
                top: '60px',
                left: '50%',
                transform: 'translateX(-50%)',
                position: 'absolute',
                width: '30%',
            }} elevation={10}>
                <Typography variant={'h4'} sx={{color: 'white', userSelect: 'none', marginX: 1, textAlign: 'center'}}>Map</Typography>
            </Paper>
            <Paper elevation={10} sx={{
                bgcolor: indigo[500],
                marginX: 2,
                padding: 2,
                borderRadius: 5,
            }}>
                <CustomGoogleMap/>
                <Button>Delete Markers</Button>
            </Paper>
        </Box>
    );
};

export default App;
