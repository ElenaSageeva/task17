const text = document.querySelector('.text');
const userPos = document.querySelector('.userPos');
let latitude;
let longitude;
let time_loc;
let date_time;

const success = async (position) => {

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    await fetch(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`)
        .then((response) => {
            const result = response.json();
            return result;
        })
        .then((data) => {
            time_loc = data.timezone;
            date_time = data.date_time_txt;
        })

    text.innerHTML = `Ширина экрана ${window.screen.width} Высота экрана ${window.screen.height} Координаты ${latitude} ${longitude} ${time_loc} ${date_time}`;
}

const error = () => {
    text.textContent = `Информация о местоположении недоступна Ширина экрана ${window.screen.width} Высота экрана ${window.screen.height}`;
}

const userPosInfo = () => {

    userPos.addEventListener('click', () => {
        if (!navigator.geolocation) {
            text.textContent = 'Местоположение недоступно';
        } else {
            text.textContent = 'Определение местоположения…';
            navigator.geolocation.getCurrentPosition(success, error);
        }
    })
}
userPosInfo();