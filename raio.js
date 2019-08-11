/*
Выдает гео-коды выбранных регионов согласно ISO3166, ISO3166_2:RU
 https://ru.wikipedia.org/wiki/ISO_3166-2:RU

 Пример Яндекс-карты
 https://tech.yandex.ru/maps/jsbox/2.1/regions

 */
optionsTemplate   = '';
var colorSelect   = '#00D000';  // цвет "выбран"
var colorNoselect = '#680ec4';  // цвет "не выбран"
var strArg = '?regs=';          // аргумент араметров "регионы"
ymaps.ready(f1);

function f1() {
  // 0. Создаем карту, например так:
  var map,
    regionN = "Краснодар, Западный округ",
    regionNN = "Нижний Новгород",
    centerP = [38.943216, 45.033266],
    zoomP = 11;
  xyswap(centerP);

  var center0 = [0,0];

  map = new ymaps.Map('ymap', {
      center: center0,
      zoom: zoomP,
      //type: null,
      controls: ['zoomControl']
    }
    // ,{
    //     restrictMapArea: [[10, 10], [85,-160]]
    // }
  );
  map.controls.get('zoomControl').options.set({size: 'small'});

  regPolygon(regionNN, map);
  //regPolygon("Нижний Новгород", map);

  //

}

function regPolygon(name, map)
{
  var url = "http://nominatim.openstreetmap.org/search";
  $.getJSON(url, {q: name, format: "json", polygon_geojson: 1})
    .then(function (data) {
      $.each(data, function(ix, place) {
        if ("relation" == place.osm_type) {
          // 2. Создаем полигон с нужными координатами
          var cpoint = coordinateswap(place.geojson.coordinates);
          var p = new ymaps.Polygon(place.geojson.coordinates);
          // 3. Добавляем полигон на карту
          map.geoObjects.add(p);
          //
          map.panTo(cpoint);
        }
      });
    }, function (err) {
      console.log(err);
    });
}
/**
 * Меняет местами координаты в массивах и вычисляет точку центра
 * @param coordinates
 */
function coordinateswap(coordinates)
{
  var cpoint = [0,0]; // центр
  var cnt = 0;
  coordinates.forEach(function(item, i, arr) {
    // console.log( i + ": " + item + " (массив:" + arr + ")" );
    item.forEach(function(point, j, arr2) {
      //console.log( i + ": " + item/* + " (массив:" + arr + ")" */);
      console.log(".");
      xyswap(point);
      cpoint[0] += point[0];
      cpoint[1] += point[1];
      cnt++;
    });
  });
  if(cnt > 0) {
    cpoint[0] = cpoint[0]/cnt;
    cpoint[1] = cpoint[1]/cnt;
  }
  return cpoint;
}

function xyswap(point)
{
  let a = point[0];
  point[0] = point[1];
  point[1] = a;
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
  var object = collection.getById(objectId);
  if (object && object.options) {
    var col = object.options.fillColor;
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
  var par = strArg;   // параметр "регионы"
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
 * Инициализация цветом выбранных регионов по строке параметров "регионы"
 * @param collection
 */
function initSelColorRegions(collection)
{
  var strs = document.location.search;
  var ir = strs.indexOf(strArg);  // есть строка с аргументами ?
  if (ir < 0)
    return;
  strs = strs.substr(ir + strArg.length);
  var regs = strs.split(','); // разбить по запятым в массив
  var objs = collection.getAll();
  var n  = objs.length;
  var nr = regs.length;
  for (var i=0; i<n; i++) {
    var reg = objs[i];
    if(reg && reg.options) {
      var id = reg.id;    // идентификатор региона
      for(var j=0; j < nr; j++) {
        var cod = iso3166toCod(id);
        if(id === regs[j] || cod == regs[j]) {
          reg.options.fillColor = colorSelect;
        }
      }
    }
  }
}

/**
 * Выдать числовой код региона по гео-коду по ISO3166
 * @param strIso - гео-код по ISO3166
 * @return {any} числовой код
 */
function iso3166toCod(strIso) {
  let mic = new Map([
    ['RU-AD', 1],
    ['RU-AL', 4],
    ['RU-BA', 2],
    ['RU-BU', 3],
    ['RU-DA', 5],
    ['RU-IN', 6],
    ['RU-KB', 7],
    ['RU-KL', 8],
    ['RU-KC', 9],
    ['RU-KR', 10],
    ['RU-KO', 11],
    ['RU-CR', 91],
    ['RU-ME', 12],
    ['RU-MO', 13],
    ['RU-SA', 14],
    ['RU-SE', 15],
    ['RU-TA', 16],
    ['RU-TY', 17],
    ['RU-UD', 18],
    ['RU-KK', 19],
    ['RU-CE', 20],
    ['RU-CU', 21],
    ['RU-ALT', 22],
    ['RU-ZAB', 75],
    ['RU-KAM', 41],
    ['RU-KDA', 23],
    ['RU-KYA', 24],
    ['RU-PER', 59],
    ['RU-PRI', 25],
    ['RU-STA', 26],
    ['RU-KHA', 27],
    ['RU-AMU', 28],
    ['RU-ARK', 29],
    ['RU-AST', 30],
    ['RU-BEL', 31],
    ['RU-BRY', 32],
    ['RU-VLA', 33],
    ['RU-VGG', 34],
    ['RU-VLG', 35],
    ['RU-VOR', 36],
    ['RU-IVA', 37],
    ['RU-IRK', 38],
    ['RU-KGD', 39],
    ['RU-KLU', 40],
    ['RU-KEM', 42],
    ['RU-KIR', 43],
    ['RU-KOS', 44],
    ['RU-KGN', 45],
    ['RU-KRS', 46],
    ['RU-LEN', 47],
    ['RU-LIP', 48],
    ['RU-MAG', 49],
    ['RU-MOS', 50],
    ['RU-MUR', 51],
    ['RU-NIZ', 52],
    ['RU-NGR', 53],
    ['RU-NVS', 54],
    ['RU-OMS', 55],
    ['RU-ORE', 56],
    ['RU-ORL', 57],
    ['RU-PNZ', 58],
    ['RU-PSK', 60],
    ['RU-ROS', 61],
    ['RU-RYA', 62],
    ['RU-SAM', 63],
    ['RU-SAR', 64],
    ['RU-SAK', 65],
    ['RU-SVE', 66],
    ['RU-SMO', 67],
    ['RU-TAM', 68],
    ['RU-TVE', 69],
    ['RU-TOM', 70],
    ['RU-TUL', 71],
    ['RU-TYU', 72],
    ['RU-ULY', 73],
    ['RU-CHE', 74],
    ['RU-YAR', 76],
    ['RU-MOW', 77],
    ['RU-SPE', 78],
    ['RU-SEV', 92],
    ['RU-YEV', 79],
    ['RU-NEN', 83],
    ['RU-KHM', 86],
    ['RU-CHU', 87],
    ['RU-YAN', 89]
  ]);
  var otv = mic.get(strIso);
  // if(otv) return otv;
  // var mic2 = Object.entries(mic).reduce((reverse, entry) => {
  //     reverse[entry[1]] = entry[0];
  //     return reverse;
  // }, {});
  // otv = mic2.get(strIso);
  return otv;
}