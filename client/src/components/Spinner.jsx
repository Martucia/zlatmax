import {
    CircularProgress,
    Box
} from "@material-ui/core";
import FocusLock from 'react-focus-lock';

const Spinner = (props) => {

    return (

        <FocusLock >
            < Box sx={{ display: "flex", position: "fixed", left: 0, top: 0, width: "100%", opacity: 0.7, height: "100%", bgcolor: '#fff', zIndex:110, justifyContent: "center", alignItems: "center" }} >
                <CircularProgress sx={{ color: '#E8AA31' }} size={250} />

            </Box >
        </FocusLock>
    );
};

// sx={{ color: '#cfd8dc' }}

export default Spinner;
