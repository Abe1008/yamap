ymaps.ready(init);

// проверим передали на страницу параметр (online)
var ps = document.location.search;
if(!ps || ps.indexOf('?') < 0) {
  ps = '';  // приставку-добавку занулим, если это не GET-аргумент
}
// debug
// console.log(ps);

//////////////////////////
// загрузка данных точек из БД по запросу координат
// https://tech.yandex.ru/maps/jsbox/2.1/object_manager_balloon_async
//
// и загружают данные балуна из БД
// https://tech.yandex.ru/maps/jsbox/2.1/om_balloon_ajax
//
// и ищем на карте агентов по названию - поиск по своим объектам
// https://tech.yandex.ru/maps/jsbox/2.1/custom_search
//
function init () {
  var myMap = new ymaps.Map('map',
      {
        center: [55.077, 49.977],
        zoom: 6,
        // выбираем элементы управления на карте
        // https://tech.yandex.ru/maps/doc/jsapi/2.1/dg/concepts/controls-docpage/#controls-adding
        controls: ['zoomControl', 'rulerControl', 'typeSelector']
      }
      );

  var objectManager = new ymaps.ObjectManager(
        {
          // по нажатию на кластер список не открывается
          clusterOpenBalloonOnClick: false,
          // у кластера нет балуна
          clusterHasBalloon:  false,
          // Мы хотим загружать данные для балуна перед открытием, поэтому
          // запретим автоматически открывать балун по клику.
          geoObjectOpenBalloonOnClick: false,
          // Данные запрашиваются по тайлам по географическим координатам
          splitRequests: false,
          // Чтобы метки начали кластеризоваться, выставляем опцию.
          clusterize: true,
          // ObjectManager принимает те же опции, что и кластеризатор.
          clusetrGgridSize: 32,
          // Флаг, запрещающий увеличение коэффициента масштабирования карты при клике на кластер
          // а я разрешаю.
          clusterDisableClickZoom: false,
          // Макет метки кластера pieChart.
          clusterIconLayout: 'default#pieChart',
          // Радиус диаграммы в пикселях.
          clusterIconPieChartRadius: 18,
          // Радиус центральной части макета.
          clusterIconPieChartCoreRadius: 10,
          // Ширина линий-разделителей секторов и внешней обводки диаграммы.
          clusterIconPieChartStrokeWidth: 3
        });

  $.ajax({
    url: "yandexmapdata.php" + ps
  }).done(function(data) {
    objectManager.add(data);
  });
  // Чтобы задать опции одиночным объектам и кластерам,
  // обратимся к дочерним коллекциям ObjectManager.
  //objectManager.objects.options.set('preset', 'islands#darkBlueCircleIcon');
  ///objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
  myMap.geoObjects.add(objectManager);

  // определяет - есть ли данные в балуне
  function hasBalloonData (objectId) {
    return objectManager.objects.getById(objectId).properties.balloonContent;
  }

  // Функция, выполняющая запрос содержимого балуна за данными на сервер.
  function loadBalloonData (objectId) {
    var dataDeferred = ymaps.vow.defer();
    $.ajax({
      url: "yandexmapdataballoon.php?id=" + objectId
    }).done(function(data) {
      dataDeferred.resolve(data);
    });
    return dataDeferred.promise();
  }

  objectManager.objects.events.add('click', function (e) {
    var objectId = e.get('objectId'),
        obj = objectManager.objects.getById(objectId);
    if (hasBalloonData(objectId)) {
      objectManager.objects.balloon.open(objectId);
    } else {
      // на время загрузки - покажем картинку
      obj.properties.balloonContent = "<img src='images/loading3.gif' width=32 height=32>";
      // откроеми балун
      objectManager.objects.balloon.open(objectId);
      // начнем загружать в него данные
      loadBalloonData(objectId).then(function (data) {
        obj.properties.balloonContent = data;
        objectManager.objects.balloon.setData(obj);
      });
    }
  });

  //
  // https://tech.yandex.ru/maps/jsbox/2.1/custom_search
  // Создаем экземпляр класса ymaps.control.SearchControl
  var mySearchControl = new ymaps.control.SearchControl({
    options: {
      // Заменяем стандартный провайдер данных (геокодер) нашим собственным.
      provider: new CustomSearchProvider(),
      // Не будем показывать еще одну метку при выборе результата поиска,
      // т.к. метки агентов уже добавлены на карту.
      noPlacemark: true,
      // не показывать панель с поисковыми подсказками
      noSuggestPanel: true,
      // текст подсказки в строке ввода
      placeholderContent: 'название агента или оператора',
      // максим. кол-во результатов
      results: 50
    }});

  // Добавляем контрол поиска в верхний правый угол,
  myMap.controls
       .add(mySearchControl, { float: 'right' });

  createButton(myMap);
}

//
// https://tech.yandex.ru/maps/jsbox/2.1/custom_search
// собственный провайдер данных для поиска
// Провайдер данных для элемента управления ymaps.control.SearchControl.
// Реализует интерфейс IGeocodeProvider.
function CustomSearchProvider()
{
}

// Провайдер запрашивает БД по имени агента или организации
CustomSearchProvider.prototype.geocode = function (request, options) {
  var searchDeferred = new ymaps.vow.defer(); // объект-обещание
      // Сколько результатов нужно пропустить
  var skip = options.skip || 0,
      // Количество возвращаемых результатов
      limit = options.results || 20;

  // debug
  // console.log(request);

  // отправим запрос к БД и по получению ответа сделаем resolve
  // строку-запрос отправим через метод POST, чтобы не было искажений
  // как аналог ajax
  // https://ruseller.com/jquery?id=15
  $.post(
    'yandexmapsearch.php' + ps,
    {
      'request':  request,  // строка-запрос
      'skip':     skip,     // сколько пропустить (0)
      'limit':    limit     // лимит выдачи (по умолч. 50)
    }
  ).done(function(data) {
    // после получения данных из запроса попадаем сюда
    // получаем JSON для формирования коллекции гео-объектов
    // https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geoQuery-docpage/
    var geoObjs = ymaps.geoQuery(data);
    // после получения списка найденных точек
    // формируем "решение" обещанного ответа для объекта-обещания
    searchDeferred.resolve({
      // Геообъекты поисковой выдачи.
      geoObjects: geoObjs,
      // Метаинформация ответа.
      metaData: {
        geocoder: {
          'request':  request,  // Строка обработанного запроса.
          'found':    geoObjs.getLength(), // Количество найденных результатов.
          'results':  limit,    // Количество возвращенных результатов.
          'skip':     skip      // Количество пропущенных результатов.
        }
      }
    });
    // конец обработки получения данных
  });

  // Возвращаем объект-обещание
  return searchDeferred.promise();
};


function createButton(map)
{
  // https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/control.Button-docpage/

// var button = new ymaps.control.Button({
//   data: {
//     // Зададим иконку для кнопки
//     image: 'images/button.jpg',
//     // Текст на кнопке.
//     content: 'не в сети',
//     // Текст всплывающей подсказки.
//     title: 'Нажмите для сохранения маршрута'
//   },
//   options: {
//     // Зададим опции для кнопки.
//     selectOnClick: false,
//     // Кнопка будет иметь три состояния - иконка, текст и иконка+текст.
//     // Поэтому зададим три значения ширины кнопки для всех состояний.
//     maxWidth: [30, 100, 150]
//   }});

  var firstButton = new ymaps.control.Button("не в сети");

  map.controls.add(firstButton, {float: 'right'});

  // если задан параметр online=0 значит отображаем агенты не в  сети и делаем кнопку "нажатой"
  if(ps && ps.indexOf("online=0")) {
    firstButton.select();
  }

  // обработка нажатия кнопки ее состояние меняется
  firstButton.events.add('click', function(e) {
    // если в момент нажатия состояние было "нажато",
    // то значит кнопка отжимется и надо показывать все агенты,
    // а если в момент нажатия кнопка была не нажата, значит сейчас будет нажата "не в сети" и
    // следовательно надо отображать только те агенты, которые не в сети
     var sta = firstButton.isSelected(); // состояние
     var a = '';
     if(!sta) a = '?online=0';  // было не нажато, а станет нажато
     //console.log('нажал ' + sta);
     window.location.href= 'yandexmap.html' + a;
  });

  // map.controls.add(button, { float: 'right', floatIndex: 100 });
}