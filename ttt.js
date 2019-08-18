/*
 * Copyright (c) 2019. Aleksey Eremin
 *
 */

/*
 Выдает гео-коды выбранных регионов согласно ОКТМО
 ISO3166, ISO3166_2:RU
 https://ru.wikipedia.org/wiki/ISO_3166-2:RU

 Пример Яндекс-карты
 https://tech.yandex.ru/maps/jsbox/2.1/regions

 */
var strRegs = '?regs=';           // аргумент параметров под-"регионы"
var Map1;
var colorSelect  = '#aa1314';
var colorNoselect = '#3f3fa2';
var strKeyMetka = '0305396879554012335'; // ключевая метка для наших полигонов
var Regions = defineRegion();  // определить регионы картирования (2 цифры)
var promise_regions = []; // массив обещаний
var MyBounds = [[],[]];    // границы регионов
//
ymaps.ready(f1);

function f1() {
  // 0. Создаем карту, например так:
  var
    centerP = [55.751, 37.618], // Москва
    zoomP = 6;

  Map1 = new ymaps.Map('ymap', {
      center: centerP,
      zoom: zoomP,
      //type: null,
      controls: ['zoomControl']
    }
    // ,{
    //     restrictMapArea: [[10, 10], [85,-160]]
    // }
  );
  Map1.controls.get('zoomControl').options.set({size: 'small'});
  //
  // загрузка районов пегиона
  // код ОКТМО первые 2 знака - главный регион
  listReg(Regions.substr(0,2), function(value){
    regPolygon(value[1], value[2], value[0]);
  });
  Map1.geoObjects.events.add('click', clickOnPolygon);
  //Map1.events.add('click', clickOnPolygon);

  // var p1 = Promise.all(promise_regions);
  // p1.then(function (val) {
  //   let str = "promise end " + val;
  //   console.log(str);
  // });
  // ждем исполнения всех промисов после загрузки полигонов
  Promise.all(promise_regions).then(fallpromises);
  //console.log("Центр " + Cpoint);
  //Map1.setBounds([[55,38.8],[57,39]]);
}

/**
 * по завершению всех промисов переместить карту на границы
 * @param values
 */
function fallpromises(values)
{
  console.log("обещания выполнены " + values.length);
  //Map1.setCenter(Cpoint);
  if(MyBounds[0].length >= 2) {
    Map1.setBounds(MyBounds);
  } else {
    console.log("границы не определены");
  }
  promise_regions = [];
  MyBounds = [[],[]];    // границы регионов
}

/**
 * Обработка нажатия мыши над полигоном
 * @param e
 */
function clickOnPolygon(e)
{
  //alert('Дошло до коллекции объектов карты');
  // Получение ссылки на дочерний объект, на котором произошло событие.
  let obj = e.get('target');
  if(isMyPolygon(obj)) {
    // есть свойство
    //let slct = obj.properties._data.myKeySelect;
    let slct = fisSelect(obj);
    setSelectRegion(obj, !slct);
  }
  var otv = fgetSelectedRegions();
  var tit = document.title;
  var pan = document.location.pathname;
  var uri = pan + otv;
  window.history.pushState('', tit, uri);
  window.history.pathname  = uri;
  //console.log("Нажал: " + otv);
  // var bound = Map1.geoObjects.getBounds();
  // console.log("границы: " + bound);
  // https://tech.yandex.ru/maps/jsapi/doc/2.1/dg/concepts/events-docpage/
  e.stopPropagation();
}
/**
 * Определить - полигон выбран
 * @param obj полигон
 * @returns {boolean}
 */
function fisSelect(obj)
{
  let clr = obj.options.get('fillColor');
  return clr === colorSelect;
}

/**
 * Создать полигоны для региона
 * @param query запрос к OSM
 * @param name  название на подсказке
 * @param idreg код региона
 */
function regPolygon(query, name, idreg)
{
  var p;  // полигон
  // будем ждать "обещания, что нарисуется полигон"
  let promise_reg = new Promise(function (resolve, reject) {
    let url = "http://nominatim.openstreetmap.org/search";
    $.getJSON(url, {q: query, format: "json", polygon_geojson: 1, polygon_threshold: 0.001})
        .then(function (data) {
          $.each(data, function (ix, place) {
            if ("relation" == place.osm_type) {
              // 2. Создаем полигон с нужными координатами
              //var cpoint = coordinateswap(place.geojson.coordinates);
              //let coords = place.geojson.coordinates;
              if (place.geojson.type == 'MultiPolygon') {
                let ar1 = place.geojson.coordinates;
                for (let i = 0; i < ar1.length; i++) {
                  // https://noteskeeper.ru/1/
                  faddPolygon(ar1[i], name, idreg);
                }
              }
              if (place.geojson.type === 'Polygon') {
                let ar1 = place.geojson.coordinates;
                faddPolygon(ar1, name, idreg);
              }
            }
          });
          //console.log("центр " + Cpoint);
          //Map1.panTo(Cpoint,7);
          //Map1.setCenter(Cpoint);
          // Promise
          resolve("добавили " + idreg);
        }, function (err) {
          console.log(err);
          // Promise
          //reject("ошибка получения кординат");
          resolve("ошибка чтения региона " + idreg);
        });
  });
  // запомним
  promise_regions.push(promise_reg);
}

/**
 * Добавить полигон для региона
 * @param coords
 * @param regname
 * @param idreg
 */
function faddPolygon(coords, regname, idreg)
{
  let ncors = coords.slice();
  coordinateswap(ncors);
  // Инициализация цветом выбранных регионов по строке параметров "регионы"
  // если строка кода региона есть в строке аргументов, то он будет выбранный
  let colr = (Regions.indexOf(idreg)<0)? colorNoselect: colorSelect;
  let p = new ymaps.Polygon(ncors, {
    hintContent:      regname,      // название региона
    myKeyIdRegion:    idreg,        // идентификатор региона
    myKeyMetka:       strKeyMetka,  // ключевая метка для опознания своих полигонов
  }, {
    fillColor:        colr,         // цвет и признак, что полигон выбран
    fillOpacity:      0.4
  });
  // Добавляем полигон на карту
  Map1.geoObjects.add(p);
  //p.events.add('click', clickOnPolygon);
}

/**
 * Вернуть строку выбранных регионов
 */
function fgetSelectedRegions()
{
  let mapa = new Map();
  Map1.geoObjects.each(function (elm) {
    if(isMyPolygon(elm)) {
      // проверим выбран полигон ? (окрашен в нужный цвет)
      if(fisSelect(elm)) {
        let idreg = elm.properties._data.myKeyIdRegion;  // код региона
        mapa.set(idreg, 1);
      }
    }
  });
  let str = '', sep ='';
  let par = strRegs;
  mapa.forEach(function (value, key, map) {
    str = par + str + sep + key;
    sep = ','; par = '';
  });
  return str;
}

/**
 * Определим: данный объект наш полигон?
 * @param obj   объект
 * @returns {boolean}
 */
function isMyPolygon(obj) {
  if('properties' in obj && '_data' in obj.properties) {
      if(obj.properties._data.myKeyMetka === undefined) return false;
      if(strKeyMetka === obj.properties._data.myKeyMetka) return true;
    }
  return false;
}

/**
 * установить отобранность и цвет всем полигонам с таким-же регионом
 * @param obj   объект-полигон
 * @param slct  выбран/не выбран
 */
function  setSelectRegion(obj, slct)
{
  if (!isMyPolygon(obj)) return;
  var colr = slct? colorSelect: colorNoselect;             // цвет регионов
  var reg  = obj.properties._data.myKeyIdRegion;  // код региона
  Map1.geoObjects.each(function (elm) {
    if(isMyPolygon(elm)) {
      if(elm.properties._data.myKeyIdRegion === reg) {
        //elm.properties._data.myKeySelect = slct;  // уст. признак выбран
        elm.options.set('fillColor', colr);       // установить нужный цвет
      }
    }
  });
}

/**
 * Меняет местами координаты в массивах, вычисляет границы
 * @param coordinates
 */
function coordinateswap(coordinates)
{
  //let cnt = 0, x = 0, y = 0;
  coordinates[0].forEach(function(point, i, arr) {
    //console.log( i + ": " + item/* + " (массив:" + arr + ")" */);
    //console.log(".");
    // поменяем координаты местами
    let a = point[0];
    point[0] = point[1];
    point[1] = a;
    if (MyBounds[0].length < 2) {
      MyBounds[0][0] = MyBounds[1][0] = point[0];
      MyBounds[0][1] = MyBounds[1][1] = point[1];
    } else {
      MyBounds[0][0] = Math.min(point[0], MyBounds[0][0]);
      MyBounds[0][1] = Math.min(point[1], MyBounds[0][1]);
      MyBounds[1][0] = Math.max(point[0], MyBounds[1][0]);
      MyBounds[1][1] = Math.max(point[1], MyBounds[1][1]);
    }
    //cnt++;
  });
  // if(cnt > 0) {
  //   Cpoint[0] = (MyBounds[0][0] + MyBounds[1][0])/2;
  //   Cpoint[1] = (MyBounds[0][1] + MyBounds[1][1])/2;
  // }
}

function init2() {
  // Создадим собственный макет RegionControl.
  var RegionControlLayout = ymaps.templateLayoutFactory.createClass('', {
    build: function () {
      RegionControlLayout.superclass.build.call(this);
      this.handleClick = ymaps.util.bind(this.handleClick, this);
      $(this.getParentElement)
        .on('click', 'a#regions', this.handleClick);
    },
    clear: function () {
      $(this.getParentElement)
        .off('click', 'a#regions', this.handleClick);
      RegionControlLayout.superclass.clear.call(this);
    },
    handleClick: function (e) {
      e.preventDefault();
      var $target = $(e.currentTarget);
      var state = this.getData().state;
      var newValues = ymaps.util.extend({}, state.get('values'));
      if (!$target.hasClass('active')) {
        newValues[$target.data('param')] = $target.data('id');
        state.set('values', newValues);
      }
    }
  });
  // Наследуем класс нашего контрола от ymaps.control.Button.
  RegionControl = ymaps.util.defineClass(function (parameters) {
    RegionControl.superclass.constructor.call(this, parameters);
  }, ymaps.control.Button, /** @lends ymaps.control.Button */{
    onAddToMap: function (map) {
      RegionControl.superclass.onAddToMap.call(this, map);
      this.setupStateMonitor();
      this.loadRegions(this.state.get('values'));
    },

    onRemoveFromMap: function (map) {
      map.geoObjects.remove(this.regions);
      this.clearStateMonitor();
      RegionControl.superclass.onRemoveFromMap.call(this, map);
    },

    setupStateMonitor: function () {
      this.stateMonitor = new ymaps.Monitor(this.state);
      this.stateMonitor.add('values', this.handleStateChange, this);
    },

    clearStateMonitor: function () {
      this.stateMonitor.removeAll();
    },

    handleStateChange: function (params) {
      this.loadRegions(params);
    },

    handleRegionsLoaded: function (res) {
      if(this.regions){
        map.geoObjects.remove(this.regions);
      }

      this.regions = new ymaps.ObjectManager();
      this.regions
        .add(res.features.map(function (feature) {
          feature.id = feature.properties.iso3166;
          feature.options = {
            strokeColor: '#ffffff',
            strokeOpacity: 0.4,
            fillColor: colorNoselect,
            fillOpacity: 0.8,
            hintCloseTimeout: 0,
            hintOpenTimeout: 0
          };
          return feature;
        }));
      map.geoObjects.add(this.regions);

      this.selectedRegionId = '';
      this.regions.events
        .add('mouseenter', function (e) {
          var id = e.get('objectId');
          this.regions.objects.setObjectOptions(id, {strokeWidth: 2});
        }, this)
        .add('mouseleave', function (e) {
          var id = e.get('objectId');
          if (this.selectedRegionId !== id) {
            this.regions.objects.setObjectOptions(id, {strokeWidth: 1});
          }
        }, this)
        .add('click', function (e) {
          var id = e.get('objectId');
          var regcol = fcolorRegion(id, this.regions.objects);
          var colorNew = (regcol === colorSelect) ? colorNoselect: colorSelect;
          this.regions.objects.setObjectOptions(id,
            {strokeWidth: 2, fillColor: colorNew}
          );
          this.selectedRegionId = id;
          //
          //console.log("Click mouse: " + id);
          getSelRegs(this.regions.objects);
          //
        }, this);
      this.getMap().setBounds(
        this.regions.getBounds(),
        {checkZoomRange: true}
      );
      //
      // раскрасим выделенные регионы
      initSelColorRegions(this.regions.objects);
    },

    loadRegions: function (params) {
      this.disable();
      return ymaps.borders.load(params.region, params)
        .then(this.handleRegionsLoaded, this)
        .always(this.enable, this);
    }
  });

  // пример
  // https://tech.yandex.ru/maps/jsbox/2.1/regions_districts
  // .

  var map = new ymaps.Map('map', {
    center: [65, 100],
    zoom: 2,
    //type: null,
    controls: ['zoomControl']
  },{
    restrictMapArea: [[10, 10], [85,-160]]
  });
  map.controls.get('zoomControl').options.set({size: 'small'});

  // Создадим экземпляр RegionControl.
  regionControl = new RegionControl({
    state: {
      enabled: true,
      values: {
        region: 'RU',
        lang: 'ru',
        quality: '2'
      }
    } ,
    options: {
      layout: RegionControlLayout
    }
    // ,
    // float: 'left',
    // maxWidth: [1200]
  });

  // Добавим контрол на карту.
  map.controls.add(regionControl);
  /*
      // Узнавать о изменениях параметров RegionControl можно следующим образом.
       regionControl.events.add('statechange', function (e) {
           console.log(e.get('target').get('values'));
       });
  */

}

/**
 * Получить цвет объекта из коллекции
 * @param objectId
 * @param collection
 * @returns {string|string}
 */
function fcolorRegion(objectId, collection)
{
  let object = collection.getById(objectId);
  if (object && object.options) {
    let col = object.options.fillColor;
    // console.log("цвет объекта " + col);
    return col;
  }
  return '?';
}

/**
 * получить список выбранных регионов
 * @param collection - коллеция регионов - гео-объектов из Яндекс.API
 */
function getSelRegs(collection)
{
  var objs = collection.getAll();
  var n = objs.length;
  var par = strRegs;   // параметр "регионы"
  var otv = '';
  var sep = '';
  for (var i=0; i<n; i++) {
    var reg = objs[i];
    if(reg && reg.options) {
      var col = reg.options.fillColor;
      if(col === colorSelect) {
        // числовые коды регионов
        //otv = par + otv + sep + iso3166toCod(reg.id);
        // коды по ISO3166
        otv = par + otv + sep + reg.id;
        par = '';  sep = ',';
      }
    }
  }
  var tit = document.title;
  var pan = document.location.pathname;
  var uri = pan + otv;
  window.history.pushState('', tit, uri);
  window.history.pathname  = uri;
  console.log(otv);
}

/**
 * Определить регион по аргументам, либо по-умолчанию
 */
function defineRegion()
{
  let i, sr, strs;
  strs = document.location.search;
  i = strs.indexOf(strRegs);  // есть строка с аргументами районами-региона?
  if (i < 0) {
    // регион явно в аргументах не задан
    // ищем в html параграф с id = "defaultRegion"
    let dr = document.getElementById('defaultRegion');
    if(dr) {
      sr = dr.innerText;
    } else {
      sr = '';
    }
  } else {
    // задан регион аргументом ?regs=
    sr = strs.substr(i + strRegs.length); // регион или список регионов
  }
  return sr.length >= 2? sr: "50"; // XX регион по-умолчанию
}
