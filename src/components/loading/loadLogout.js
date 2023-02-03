import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadLogout() {

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "2rem",
                }}
                open={true}
            >
                <CircularProgress color="secondary" />
                <h1>Agradecemos por utilizar o KONTACTS</h1>
                <h1>Volte sempre !</h1>
            </Backdrop>
        </div>
    );
}