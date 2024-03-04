import Alert from '@mui/material/Alert';


const AlertComponent = (props) => {
    setTimeout(function () {
        if (props.close) props.close(false);
    }, 4000);

    if (props.success) return (
        <div className="alert" style={{ display: props.visible }}>
            <Alert severity="success">Товар в корзине</Alert>
        </div>
    )

    if (!props.success) return (
        <div className="alert" style={{ display: props.visible }}>
            <Alert severity="warning">Войдите в акаунт</Alert>
        </div>
    );
}

export default AlertComponent;