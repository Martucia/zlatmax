import phone from "../images/phone.svg"
import timer from "../images/oclock.svg"
import map from "../images/map-icon.svg"
import mail from "../images/mail.svg"
import right from "../images/right-white.svg"
import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__inner">
                <div className="footer__row">
                    <div className="footer__column">
                        <div className="title">
                            ИНФОРМАЦИЯ
                        </div>
                        <ul>
                            <li><a href="/">Златоустовские ножи
                                в Москве и Московской
                                области</a></li>
                            <li><a href="/">Ножевые стали</a></li>
                            <li><a href="/">О нас</a></li>
                            <li><a href="/">Условия оплаты
                                и доставки</a></li>
                            <li><a href="/">Политика
                                конфиденциальности</a></li>
                        </ul>
                    </div>
                    <div className="footer__column">
                        <div className="title">
                            СЛУЖБА ПОДДЕРЖКИ
                        </div>
                        <ul>
                            <li><a href="/">Контактная информация</a></li>
                            <li><a href="/">Возврат товара</a></li>
                            <li><a href="/">Карта сайта</a></li>
                        </ul>
                    </div>
                    <div className="footer__column">
                        <div className="title">
                            ДОПОЛНИТЕЛЬНО
                        </div>
                        <ul>
                            <li><a href="/">Подарочные сертификаты</a></li>
                            <li><a href="/">Партнеры</a></li>
                            <li><a href="/">Товары со скидкой</a></li>
                        </ul>
                    </div>
                    <div className="footer__column">
                        <div className="title">
                            ЛИЧНЫЙ КАБИНЕТ
                        </div>
                        <ul>
                            <li><a href="/">Личный кабинет</a></li>
                            <li><a href="/">История заказов</a></li>
                            <li><a href="/">Мои закладки</a></li>
                            <li><a href="/">Рассылка новостей</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer__row">
                    <div className="footer__column">
                        <div className="title">
                            КОНТАКТЫ
                        </div>
                        <ul>
                            <li><a href="/"><img src={phone} alt="" />8 (800) 777-49-67</a></li>
                            <li><a href="/"><img src={timer} alt="" />Пн-Пт
                                7:00 - 16:00 (МСК)</a></li>
                            <li><a href="/"><img src={map} alt="" />Златоуст,
                                ул. Шоссейная,
                                д. 1, офис «6Б»</a></li>
                            <li><a href="/"><img src={mail} alt="" />info@zlatmax.ru</a></li>
                        </ul>
                    </div>
                    <div className="footer__column">
                        <div className="title">
                            ПОЛЕЗНЫЕ ССЫЛКИ
                        </div>
                        <ul>
                            <li><a href="/">Способы оплаты и доставки</a></li>
                        </ul>
                    </div>
                    <div className="footer__column">
                        <div className="title">
                            НАША ГАРАНТИЯ
                        </div>
                        <p className="warranty">
                            Недовольны своей покупкой?
                            Вы можете вернуть ее в течении
                            30 дней с даты получения, согласно <a href="/">нашим правилам</a>
                        </p>
                    </div>
                    <div className="footer__column footer__form">
                        <div className="title">
                            НОВОСТНАЯ РАССЫЛКА
                        </div>
                        <p className="description">
                            Подпишитесь прямо сейчас!
                        </p>
                        <form action="">
                            <p className="input">
                                <input id="send-email" type="search" placeholder='example@gmail.com' />
                                <button>
                                    <img src={right} alt="" />
                                </button>
                            </p>
                            <p className="checkbox">
                                <input type="checkbox" id="send-email-check" name="send-email-check" />
                                <label htmlFor="send-email-check">Я прочитал Условия соглашения и
                                    согласен с условиями </label>
                            </p>
                        </form>
                    </div>
                </div>
                <div className="footer__row footer__bottom">
                    <p className="footer__bottom__text">
                        Все материалы, размещенные на сайте, носят справочный характер и не являются
                        публичной офертой, определяемойположениями Статьи 437 Гражданского кодекса Российской Федерации.
                        При копировании материалов гиперссылка на www.zlatmax.ru обязательна!
                    </p>
                    <a href="/">Златоустовские ножи www.zlatmax.ru ©</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;