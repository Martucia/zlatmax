import HeaderBottom from "./HeaderBottom";
import HeaderCenter from "./HeaderCenter";
import HeaderTop from "./HeaderTop";
// import { useSelector } from "react-redux";

const Header = (props) => {
    // const isAdmin = useSelector(state => state.user.isAdmin);

    return (
        <header className="header">
            <HeaderTop setOpen={props.setOpen} />
            <HeaderCenter openBasket={props.openBasket} openLog={props.openLog} />
            <HeaderBottom />
            {/* {!isAdmin && <HeaderBottom />} */}

        </header>
    );
}

export default Header;