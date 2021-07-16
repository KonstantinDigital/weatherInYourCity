function reLoad() {
    window.location.reload();
} //функция обновления страницы

function onClick() {
    let request;
    var myRequest = "http://api.openweathermap.org/data/2.5/weather?q=" + document.searchBlock.cityname.value + "&units=metric&lang=ru&appid=61030a1cc48f4ccbcbaf3cd7db4c106d"; //создаю запрос со значением города, введенного пользователем, выбираю градусы в цельсиях и русский язык

    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    }
    else {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    } //запрос для нового и старого браузеров
    request.open("GET",
        myRequest);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status == 200) {
            console.log(request.responseText);
        } //отслеживание запроса

    }
    request.send(); //отправка запроса

    request.onload = function () {

        let dataJSON = JSON.parse(request.responseText); //парсирую данные

        if (request.status != 200) {
            document.querySelector('.errorDivOne').innerHTML = '404';
            document.querySelector('.errorDivTwo').innerHTML = 'NOT FOUND';
            document.querySelector('.errorDivThree').innerHTML = 'Пожалуйста, введите правильное название города';
        } //создаю условие, при невыполнении которого выскочит ошибка

        var myHourlyRequest = "https://api.openweathermap.org/data/2.5/onecall?lat=" + dataJSON['coord']['lat'] + "&lon=" + dataJSON['coord']['lon'] + "&units=metric&lang=ru&exclude=minutely&exclude=daily&appid=2d59893a42e9acfd4079dcb30a1019fd"; //создаю второй запрос для почасовой погоды с данными из первого запроса

        var xmlRequest = new XMLHttpRequest();
        xmlRequest.open("GET", myHourlyRequest);

        xmlRequest.send();

        xmlRequest.onload = function () {
            let hourlyJSON = JSON.parse(xmlRequest.responseText);
            console.log(xmlRequest.responseText);

            document.querySelector('.hourly').innerHTML = 'Погода по часам'; //вставка погода по часам

            var day = getWeekDay(new Date(hourlyJSON['current']['dt'] * 1000));
            function getWeekDay() {
                let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
                return days[new Date().getDay()];
            } //функция, меняющая числовое значение дня недели на полное название

            document.querySelector('.wrapOneOne').innerHTML = day; //вставка дня недели

            document.querySelector('.wrapOneTwo').innerHTML = 'Температура'; //вставка надписи температура

            document.querySelector('.wrapOneThree').innerHTML = 'Bетер км/ч'; //вставка надписи ветер кмч

            document.querySelector('.wrapOneFour').innerHTML = 'Погодные условия'; //вставка надписи погодные условия

            document.querySelector('.wrapTwoOne').innerHTML = new Date(hourlyJSON['hourly']['3']['dt'] * 1000).getHours() + ':00'; //вставка времени через 3 часа

            document.querySelector('.wrapThreeOne').innerHTML = new Date(hourlyJSON['hourly']['6']['dt'] * 1000).getHours() + ':00'; //вставка времени через 6 часов

            document.querySelector('.wrapFourOne').innerHTML = new Date(hourlyJSON['hourly']['9']['dt'] * 1000).getHours() + ':00'; //вставка времени через 9 часов

            document.querySelector('.wrapFiveOne').innerHTML = new Date(hourlyJSON['hourly']['12']['dt'] * 1000).getHours() + ':00'; //вставка времени через 12 часов

            document.querySelector('.wrapSixOne').innerHTML = new Date(hourlyJSON['hourly']['15']['dt'] * 1000).getHours() + ':00'; //вставка времени через 15 часов

            document.querySelector('.wrapSevenOne').innerHTML = new Date(hourlyJSON['hourly']['18']['dt'] * 1000).getHours() + ':00'; //вставка времени через 18 часов

            document.querySelector('.emptyDiv').innerHTML = '<img src = "img/empty.png" width = "100px">'; //вставка пустой иконки

            document.querySelector('.wrapTwoTwo').innerHTML = '<img src = "https://openweathermap.org/img/wn/' + hourlyJSON['hourly']['3']['weather']['0']['icon'] + '@2x.png" width = "100px">'; //вставка погодной иконки с сайта через 3 часа

            document.querySelector('.wrapThreeTwo').innerHTML = '<img src = "https://openweathermap.org/img/wn/' + hourlyJSON['hourly']['6']['weather']['0']['icon'] + '@2x.png" width = "100px">'; //вставка погодной иконки с сайта через 6 часов

            document.querySelector('.wrapFourTwo').innerHTML = '<img src = "https://openweathermap.org/img/wn/' + hourlyJSON['hourly']['9']['weather']['0']['icon'] + '@2x.png" width = "100px">'; //вставка погодной иконки с сайта через 9 часов

            document.querySelector('.wrapFiveTwo').innerHTML = '<img src = "https://openweathermap.org/img/wn/' + hourlyJSON['hourly']['12']['weather']['0']['icon'] + '@2x.png" width = "100px">'; //вставка погодной иконки с сайта через 12 часов

            document.querySelector('.wrapSixTwo').innerHTML = '<img src = "https://openweathermap.org/img/wn/' + hourlyJSON['hourly']['15']['weather']['0']['icon'] + '@2x.png" width = "100px">'; //вставка погодной иконки с сайта через 15 часов

            document.querySelector('.wrapSevenTwo').innerHTML = '<img src = "https://openweathermap.org/img/wn/' + hourlyJSON['hourly']['18']['weather']['0']['icon'] + '@2x.png" width = "100px">'; //вставка погодной иконки с сайта через 18 часов

            document.querySelector('.wrapTwoThree').innerHTML = Math.round(hourlyJSON['hourly']['3']['temp']) + '&deg;' + 'C'; //округляю полученную в цельсиях темепературу через 3 часа и добавляю значок градуса и цельсия

            document.querySelector('.wrapThreeThree').innerHTML = Math.round(hourlyJSON['hourly']['6']['temp']) + '&deg;' + 'C'; //округляю полученную в цельсиях темепературу через 6 часов и добавляю значок градуса и цельсия

            document.querySelector('.wrapFourThree').innerHTML = Math.round(hourlyJSON['hourly']['9']['temp']) + '&deg;' + 'C'; //округляю полученную в цельсиях темепературу через 9 часов и добавляю значок градуса и цельсия

            document.querySelector('.wrapFiveThree').innerHTML = Math.round(hourlyJSON['hourly']['12']['temp']) + '&deg;' + 'C'; //округляю полученную в цельсиях темепературу через 12 часов и добавляю значок градуса и цельсия

            document.querySelector('.wrapSixThree').innerHTML = Math.round(hourlyJSON['hourly']['15']['temp']) + '&deg;' + 'C'; //округляю полученную в цельсиях темепературу через 15 часов и добавляю значок градуса и цельсия

            document.querySelector('.wrapSevenThree').innerHTML = Math.round(hourlyJSON['hourly']['18']['temp']) + '&deg;' + 'C'; //округляю полученную в цельсиях темепературу через 18 часов и добавляю значок градуса и цельсия

            document.querySelector('.wrapTwoFour').innerHTML = Math.round(hourlyJSON['hourly']['3']['wind_speed']); //округляю скорость ветра через 3 часа

            document.querySelector('.wrapThreeFour').innerHTML = Math.round(hourlyJSON['hourly']['6']['wind_speed']); //округляю скорость ветра через 6 часов

            document.querySelector('.wrapFourFour').innerHTML = Math.round(hourlyJSON['hourly']['9']['wind_speed']); //округляю скорость ветра через 9 часов

            document.querySelector('.wrapFiveFour').innerHTML = Math.round(hourlyJSON['hourly']['12']['wind_speed']); //округляю скорость ветра через 12 часов

            document.querySelector('.wrapSixFour').innerHTML = Math.round(hourlyJSON['hourly']['15']['wind_speed']); //округляю скорость ветра через 15 часов

            document.querySelector('.wrapSevenFour').innerHTML = Math.round(hourlyJSON['hourly']['18']['wind_speed']); //округляю скорость ветра через 18 часов

            document.querySelector('.wrapTwoFive').innerHTML = hourlyJSON['hourly']['3']['weather']['0']['description']; //погодные условия через 3 часа

            document.querySelector('.wrapThreeFive').innerHTML = hourlyJSON['hourly']['6']['weather']['0']['description']; //погодные условия через 6 часов

            document.querySelector('.wrapFourFive').innerHTML = hourlyJSON['hourly']['9']['weather']['0']['description']; //погодные условия через 9 часов

            document.querySelector('.wrapFiveFive').innerHTML = hourlyJSON['hourly']['12']['weather']['0']['description']; //погодные условия через 12 часов

            document.querySelector('.wrapSixFive').innerHTML = hourlyJSON['hourly']['15']['weather']['0']['description']; //погодные условия через 15 часов

            document.querySelector('.wrapSevenFive').innerHTML = hourlyJSON['hourly']['18']['weather']['0']['description']; //погодные условия через 18 часов

        }


        document.querySelector('.name').innerHTML = dataJSON['name']; //вставка названия города

        document.querySelector('.now').textContent = new Date(dataJSON['dt'] * 1000).getDate() + '.' + (new Date(dataJSON['dt'] * 1000).getMonth() + 1) + '.' + new Date(dataJSON['dt'] * 1000).getFullYear(); //вставка даты через точку, месяц плюс один так как январь нулевой

        document.querySelector('.secondDiv').innerHTML = dataJSON['weather']['0']['description']; //вставка погодных условий сейчас

        document.querySelector('.thirdDivWrapOne').innerHTML = '<img src = "https://openweathermap.org/img/wn/' + dataJSON['weather']['0']['icon'] + '@2x.png" width = "200px">'; //вставка иконки погоды сейчас

        document.querySelector('.thirdDivWrapTwo').innerHTML = Math.round(dataJSON['main']['temp']) + '&deg;' + 'C'; //вставка температуры сейчас в цельсиях и округление с добавлением знака градуса и цельсия

        document.querySelector('.one').innerHTML = "Минимальная t&deg;     " + Math.round(dataJSON['main']['temp_min']) + '&deg;' + 'C'; //вставка мин темп и округление с добавлением надписи и знаков градуса цельсия

        document.querySelector('.two').innerHTML = "Максимальная t&deg;      " + Math.round(dataJSON['main']['temp_max']) + '&deg;' + 'C'; //вставка макс темп и округление с добавлением надписи и знаков градуса цельсия

        document.querySelector('.three').innerHTML = "Скорость ветра (km/h)    " + Math.round(dataJSON['wind']['speed']); //вставка скорости ветра с округлением и добавлением надписи

    }

}
