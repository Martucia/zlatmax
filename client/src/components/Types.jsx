import React from 'react';
import k1 from "../images/k1.png"
import k2 from "../images/k2.png"
import k3 from "../images/k3.png"
import k4 from "../images/k4.png"
import k5 from "../images/k5.png"
import k6 from "../images/k6.png"
import { NavLink } from 'react-router-dom';

const Types = () => {
    return (
        <div className="types">
            <Block title="Каталог ножей" className={"block1"} right="72" img={k1} bottom="-20" />
            <Block title="Среднеклинковое оружие" className={"block2"} right="-20" bottom="-40" img={k2} />
            <Block title="Длинноклинковое оружие" className={"block3"} right="-30" bottom="-40" img={k3} />
            <Block title="Сувенирные изделия" className={"block4"} right="-20" bottom="-100" img={k4} />
            <Block title="Сопутствующие товары" className={"block5"} right="-75" bottom="-40" img={k5} />
            <Block title="Ножевая мастерская" className={"block6"} right="-50" bottom="-40" img={k6} />
        </div>
    );
}

const Block = (props) => {
    return (
        <div className={"block " + props.className}>
            <NavLink to="/catalog">
                <div className="block__text">
                    <div className="title">
                        {props.title}
                    </div>
                    <div className="line"></div>
                    <ul>
                        <li>
                            Разделочные
                        </li>
                        <li>
                            Туристические
                        </li>
                        <li>
                            Охотничьи
                        </li>
                    </ul>
                </div>
                <div className="block__img"  >
                    {/* style={{ right: props.right + 'px', bottom: props.bottom + 'px' }} */}
                    <img src={props.img} alt="" />
                </div>
            </NavLink>
        </div>
    )
}

export default Types;