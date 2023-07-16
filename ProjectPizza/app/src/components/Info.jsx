import React from "react";
import { Link } from "react-router-dom";
const Info = () => {
    return (
        <div>
            <div
                style={{
                    textAlign: "center",
                    width: "80%",
                    margin: "0 auto",
                    fontSize: "70px",
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 384 512"
                >
                    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                </svg>
            </div>
            <div
                style={{
                    textAlign: "center",
                    margin: "0 auto",
                    fontWeight: "bold",
                }}
            >
                Общество с Ограниченной Ответственностью Атом-СЗ <br />
                191040, Санкт-Петербург, Транспортный Переулок, Дом 1, Литер А,{" "}
                <br />
                Помещение 408
            </div>
            <div
                style={{
                    textAlign: "center",
                    margin: "0 auto",
                }}
            >
                <iframe
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1999.6932102761928!2d30.3540103767981!3d59.92063876355005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469631b3e0c80dbd%3A0x22e4719a05edbd4f!2z0KLRgNCw0L3RgdC_0L7RgNGC0L3Ri9C5INC_0LXRgC4sIDEsINCh0LDQvdC60YIt0J_QtdGC0LXRgNCx0YPRgNCzLCAxOTEwNDA!5e0!3m2!1sru!2sru!4v1687253455149!5m2!1sru!2sru"
                    width={"70%"}
                    height="450"
                    frameborder="0"
                ></iframe>
                <div style={{ marginTop: "20px" }}>
                    <Link to="/" className="button button--black">
                        <span>Вернуться назад</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Info;
