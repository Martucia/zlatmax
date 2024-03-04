import knifes from "../images/knifes.png"
import b1 from '../images/b1.svg'
import b2 from '../images/b2.svg'
import b3 from '../images/b3.svg'
import b4 from '../images/b4.svg'


const Banner = () => {
    return (
        <div className="banner">
            <div className="banner__inner">
                <div className="banner__text">
                    <div className="banner__text__inner">
                        <div className="title">
                            Интернет магазин сертифици&shy;рованных златоустовских ножей
                        </div>
                        <div className="desc">
                            Добро пожаловать на официальный сайт «ЗЛАТМАКС»! В нашем магазине
                            представлен наиболее широкий выбор Златоустовских ножей от Златоустовских
                            Оружейных Фабрик и компаний, мы являемся официальными поставщиками.
                        </div>
                        <button>
                            Подробнее
                        </button>
                    </div>
                </div>
                <div className="banner__img">
                    <p>
                        <img src={knifes} alt="" />
                    </p>
                </div>
                <div className="banner__info">
                    <div className="block">
                        <div className="block__img">
                            <img src={b1} alt="" />
                        </div>
                        <p>
                            Гарантия 100% возврата
                            денежных средств
                        </p>
                    </div>
                    <div className="block">
                        <div className="block__img">
                            <img src={b2} alt="" />
                        </div>
                        <p>
                            Доставка по России,
                            Казахстану и Белоруссии
                        </p>
                    </div>
                    <div className="block">
                        <div className="block__img">
                            <img src={b3} alt="" />
                        </div>
                        <p>
                            Возможность оформление
                            заказа без регистрации.
                        </p>
                    </div>
                    <div className="block">
                        <div className="block__img">
                            <img src={b4} alt="" />
                        </div>
                        <p>
                            Скидки постоянным
                            покупателям.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Banner;