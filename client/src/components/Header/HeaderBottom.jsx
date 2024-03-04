import { NavLink } from 'react-router-dom';


const HeaderBottom = () => {
    return (
        <div className="header__bottom">
            <div className='header__bottom__inner'>
                <NavLink to="/catalog?page=1">
                    Каталог ножей
                </NavLink>
                <NavLink to="/d">
                    Клинковое оружие
                </NavLink>
                <NavLink to="/dd">
                    Сувенирные изделия
                </NavLink>
                <NavLink to="/df">
                    Фонари ARMYTEK
                </NavLink>
                <NavLink to="/ddf">
                    Сопуствующие товары
                </NavLink>

            </div>
        </div>
    );
}

export default HeaderBottom;