/*
 * Copyright (c) 2019. Aleksey Eremin
 *
 */

/*
  База данных название регионов
 */

function getQfromOKTMO(codeOktmo) {
  var map = new Map(db_oktmo);
  var q = map.get(codeOktmo);
  return q;
}

var db_oktmo = [
  // https://classifikators.ru/oktmo/17000000
  [17701000, 'Владимир, городской округ Владимир, Владимирская область, Центральный федеральный округ, 600000, РФ', 'Владимир'],
  [17720000, 'Гусь-Хрустальный, городской округ Гусь-Хрустальный, Владимирская область, Центральный федеральный округ, 601508, РФ', 'Гусь-Хрустальный'],
  [17725000, 'Ковров, городской округ Ковров, Владимирская область, Центральный федеральный округ, РФ', 'Ковров'],
  [17735000, 'Муром, городской округ Муром, Владимирская область, Центральный федеральный округ, 602267, РФ', 'Муром'],
  [17737000, 'ЗАТО Радужный, Владимирская область, Центральный федеральный округ, РФ', 'ЗАТО Радужный'],
  [17605000, 'Александровский район, Владимирская область, Центральный федеральный округ', 'Александровский р-н'],
  [17610000, 'Вязниковский район, Владимирская область, Центральный федеральный округ', 'Вязниковский р-н'],
  [17615000, 'Гороховецкий район, Владимирская область, Центральный федеральный округ', 'Гороховецкий р-н'],
  [17620000, 'Гусь-Хрустальный район, Владимирская область, Центральный федеральный округ', 'Гусь-Хрустальный р-н'],
  [17625000, 'Камешковский район, Владимирская область, Центральный федеральный округ, РФ', 'Камешковский р-н'],
  [17630000, 'Киржачский район, Владимирская область, Центральный федеральный округ, РФ', 'Киржачский р-н'],
  [17635000, 'Ковровский район, Владимирская область, Центральный федеральный округ, РФ', 'Ковровский р-н'],
  [17640000, 'Кольчугинский район, Владимирская область, Центральный федеральный округ, РФ', 'Кольчугинский р-н'],
  [17642000, 'Меленковский район, Владимирская область, Центральный федеральный округ, РФ', 'Меленковский р-н'],
  [17644000, 'Муромский район, Владимирская область, Центральный федеральный округ, РФ', 'Муромский р-н'],
  [17646000, 'Петушинский район, Владимирская область, Центральный федеральный округ, РФ', 'Петушинский р-н'],
  [17648000, 'Селивановский район, Владимирская область, Центральный федеральный округ, 602330, РФ', 'Селивановский р-н'],
  [17650000, 'Собинский район, Владимирская область, Центральный федеральный округ, РФ', 'Собинский р-н'],
  [17652000, 'Судогодский район, Владимирская область, Центральный федеральный округ, РФ', 'Судогодский р-н'],
  [17654000, 'Суздальский район, Владимирская область, Центральный федеральный округ, РФ', 'Суздальский р-н'],
  [17656000, 'Юрьев-Польский район, Владимирская область, Центральный федеральный округ, РФ', 'Юрьев-Польский р-н'],

  [24601000, 'Вичугский район, Ивановская область, Центральный федеральный округ, 155315, РФ', 'Вичугский р-н'],
  [24602000, 'Верхнеландеховский район, Ивановская область, Центральный федеральный округ, РФ', 'Верхнеландеховский р-н'],
  [24603000, 'Гаврилово-Посадский район, Ивановская область, Центральный федеральный округ, РФ', 'Гаврилово-Посадский р-н'],
  [24605000, 'Заволжский район, Ивановская область, Центральный федеральный округ, 155410, РФ', 'Заволжский р-н'],
  [24607000, 'Ивановский район, Ивановская область, Центральный федеральный округ, РФ', 'Ивановский р-н'],
  [24609000, 'Ильинский район, Ивановская область, Центральный федеральный округ, 155060, РФ', 'Ильинский р-н'],
  [24611000, 'Кинешемский район, Ивановская область, Центральный федеральный округ, 155830, РФ', 'Кинешемский р-н'],
  [24613000, 'Комсомольский район, Ивановская область, Центральный федеральный округ, РФ', 'Комсомольский р-н'],
  [24614000, 'Лежневский район, Ивановская область, Центральный федеральный округ, РФ', 'Лежневский р-н'],
  [24615000, 'Лухский район, Ивановская область, Центральный федеральный округ, 155284, РФ', 'Лухский р-н'],
  [24617000, 'Палехский район, Ивановская область, Центральный федеральный округ, РФ', 'Палехский р-н'],
  [24619000, 'Пестяковский район, Ивановская область, Центральный федеральный округ, РФ', 'Пестяковский р-н'],
  [24620000, 'Приволжский район, Ивановская область, Центральный федеральный округ, РФ', 'Приволжский р-н'],
  [24621000, 'Пучежский район, Ивановская область, Центральный федеральный округ, РФ', 'Пучежский р-н'],
  [24623000, 'Родниковский район, Ивановская область, Центральный федеральный округ, РФ', 'Родниковский р-н'],
  [24625000, 'Савинский район, Ивановская область, Центральный федеральный округ, РФ', 'Савинский р-н'],
  [24629000, 'Тейковский район, Ивановская область, Центральный федеральный округ, РФ', 'Тейковский р-н'],
  [24631000, 'Фурмановский район, Ивановская область, Центральный федеральный округ, РФ', 'Фурмановский р-н'],
  [24633000, 'Шуйский район, Ивановская область, Центральный федеральный округ, 155927, РФ', 'Шуйский р-н'],
  [24635000, 'Южский район, Ивановская область, Центральный федеральный округ, РФ', 'Южский р-н'],
  [24637000, 'Юрьевецкий район, Ивановская область, Центральный федеральный округ, РФ', 'Юрьевецкий р-н'],
  [24701000, 'Иваново, городской округ Иваново, Ивановская область, Центральный федеральный округ, 153000, РФ', 'Иваново'],
  [24703000, 'городской округ Вичуга, Ивановская область, Центральный федеральный округ, РФ', 'Вичуга'],
  [24705000, 'Кинешма, городской округ Кинешма, Ивановская область, Центральный федеральный округ, РФ', 'Кинешма'],
  [24706000, 'городской округ Кохма, Ивановская область, Центральный федеральный округ, 153511, РФ', 'Кохма'],
  [24707000, 'Тейково, городской округ Тейково, Ивановская область, Центральный федеральный округ, РФ', 'Тейково'],
  [24711000, 'Шуя, городской округ Шуя, Ивановская область, Центральный федеральный округ, РФ', 'Шуя'],

  [22602000, 'Ардатовский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Ардатовский р-н'],
  [22603000, 'Арзамасский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Арзамасский р-н'],
  [22605000, 'Балахнинский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Балахнинский р-н'],
  [22607000, 'Богородский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Богородский р-н'],
  [22609000, 'Большеболдинский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Большеболдинский р-н'],
  [22610000, 'Большемурашкинский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Большемурашкинский р-н'],
  [22612000, 'Бутурлинский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Бутурлинский р-н'],
  [22614000, 'Вадский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Вадский р-н'],
  [22615000, 'Варнавинский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Варнавинский р-н'],
  [22617000, 'Вачский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Вачский р-н'],
  [22618000, 'Ветлужский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Ветлужский р-н'],
  [22619000, 'Вознесенский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Вознесенский р-н'],
  [22621000, 'Воротынский городской округ, Нижегородская область, Приволжский федеральный округ, РФ', 'Воротынский р-н'],
  [22622000, 'Воскресенский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Воскресенский р-н'],
  [22626000, 'Гагинский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Гагинский р-н'],
  [22628000, 'Городецкий район, Нижегородская область, Приволжский федеральный округ, РФ', 'Городецкий р-н'],
  [22630000, 'Дальнеконстантиновский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Дальнеконстантиновский р-н'],
  [22631000, 'Володарский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Володарский р-н'],
  [22632000, 'Дивеевский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Дивеевский р-н'],
  [22633000, 'Княгининский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Княгининский р-н'],
  [22634000, 'Ковернинский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Ковернинский р-н'],
  [22635000, 'Краснобаковский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Краснобаковский р-н'],
  [22636000, 'Краснооктябрьский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Краснооктябрьский р-н'],
  [22637000, 'Кстовский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Кстовский р-н'],
  [22638000, 'городской округ Кулебаки, Нижегородская область, Приволжский федеральный округ, РФ', 'Кулебакский р-н'],
  [22639000, 'Лукояновский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Лукояновский р-н'],
  [22640000, 'Лысковский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Лысковский р-н'],
  [22641000, 'Навашинский городской округ, Нижегородская область, Приволжский федеральный округ, РФ', 'Навашинский р-н'],
  [22642000, 'Павловский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Павловский р-н'],
  [22644000, 'Перевозский городской округ, Нижегородская область, Приволжский федеральный округ, РФ', 'Перевозский р-н'],
  [22645000, 'Пильнинский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Пильнинский р-н'],
  [22646000, 'Починковский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Починковский р-н'],
  [22648000, 'Сергачский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Сергачский р-н'],
  [22649000, 'Сеченовский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Сеченовский р-н'],
  [22650000, 'Сосновский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Сосновский р-н'],
  [22651000, 'Спасский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Спасский р-н'],
  [22652000, 'Тонкинский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Тонкинский р-н'],
  [22653000, 'Тоншаевский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Тоншаевский р-н'],
  [22654000, 'Уренский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Уренский р-н'],
  [22655000, 'городской округ Чкаловск, Нижегородская область, Приволжский федеральный округ, РФ', 'Чкаловский р-н'],
  [22656000, 'Шарангский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Шарангский р-н'],
  [22657000, 'Шатковский район, Нижегородская область, Приволжский федеральный округ, РФ', 'Шатковский р-н'],
  [22659000, 'Сокольский городской округ, Нижегородская область, Приволжский федеральный округ, РФ', 'Сокольский р-н'],
  [22701000, 'Нижний Новгород, городской округ Нижний Новгород, Нижегородская область, Приволжский федеральный округ, РФ', 'Н. Новгород'],
  [22703000, 'Арзамас, городской округ Арзамас, Нижегородская область, Приволжский федеральный округ, РФ', 'Арзамас'],
  [22704000, 'Саров, городской округ Саров, Нижегородская область, Приволжский федеральный округ, 607188, РФ', 'ЗАТО Саров'],
  [22712000, 'городской округ Бор, Нижегородская область, Приволжский федеральный округ, РФ', 'Борский р-н'],
  [22715000, 'городской округ Выкса, Нижегородская область, Приволжский федеральный округ, РФ', 'Выксунский р-н'],
  [22721000, 'городской округ Дзержинск, Нижегородская область, Приволжский федеральный округ, РФ', 'Дзержинский р-н'],
  [22734000, 'городской округ Первомайск, Нижегородская область, Приволжский федеральный округ, РФ', 'Первомайский р-н'],
  [22737000, 'Семёновский городской округ, Нижегородская область, Приволжский федеральный округ, РФ', 'Семеновский р-н'],
  [22758000, 'городской округ Шахунья, Нижегородская область, Приволжский федеральный округ, РФ', 'Шахунский р-н'],

  [32601000, 'Беловский район, Кемеровская область', 'Беловский р-н'],
  [32602000, 'Гурьевский район, Кемеровская область', 'Гурьевский р-н'],
  [32604000, 'Ижморский район, Кемеровская область', 'Ижморский р-н'],
  [32607000, 'Кемеровский район, Кемеровская область', 'Кемеровский р-н'],
  [32610000, 'Крапивинский район, Кемеровская область', 'Крапивинский р-н'],
  [32613000, 'Ленинск-Кузнецкий район, Кемеровская область', 'Ленинск-Кузнецкий р-н'],
  [32616000, 'Мариинский район, Кемеровская область', 'Мариинский р-н'],
  [32619000, 'Новокузнецкий район, Кемеровская область', 'Новокузнецкий р-н'],
  [32622000, 'Прокопьевский район, Кемеровская область', 'Прокопьевский р-н'],
  [32625000, 'Промышленновский район, Кемеровская область', 'Промышленновский р-н'],
  [32627000, 'Таштагольский район, Кемеровская область', 'Таштагольский р-н'],
  [32628000, 'Тисульский район, Кемеровская область', 'Тисульский р-н'],
  [32631000, 'Топкинский район, Кемеровская область', 'Топкинский р-н'],
  [32634000, 'Тяжинский район, Кемеровская область', 'Тяжинский р-н'],
  [32637000, 'Чебулинский район, Кемеровская область', 'Чебулинский р-н'],
  [32640000, 'Юргинский район, Кемеровская область', 'Юргинский р-н'],
  [32643000, 'Яйский район, Кемеровская область', 'Яйский р-н'],
  [32646000, 'Яшкинский район, Кемеровская область', 'Яшкинский р-н'],
  [32701000, 'Кемеровский городской округ, Кемеровская область, Сибирский федеральный округ, РФ', 'Кемеровский'],
  [32704000, 'Анжеро-Судженский  городской округ, Кемеровская область, Сибирский федеральный округ, РФ', 'Анжеро-Судженский'],
  [32707000, 'Беловский городской округ, Кемеровская область, Сибирский федеральный округ, РФ', 'Беловский'],
  [32710000, 'Берёзовский городской округ, Кемеровская область, Сибирский федеральный округ, РФ', 'Березовский'],
  [32715000, 'Калтанский городской округ, Кемеровская область, Сибирский федеральный округ, РФ', 'Калтанский'],
  [32716000, 'Киселевский городской округ, Кемеровская область, Сибирский федеральный округ, РФ', 'Киселевский'],
  [32719000, 'Ленинск-Кузнецкий городской округ, Кемеровская область, Сибирский федеральный округ, РФ', 'Ленинск-Кузнецкий'],
  [32725000, 'Междуреченский городской округ, Кемеровская область, Сибирский федеральный округ, РФ', 'Междуреченский'],
  [32728000, 'Мысковский городской округ, Кемеровская область, Сибирский федеральный округ, РФ', 'Мысковский'],
  [32731000, 'Новокузнецкий городской округ, Кемеровская область, Сибирский федеральный округ, РФ', 'Новокузнецкий'],
  [32732000, 'Полысаевский городской округ, Кемеровская область, Сибирский федеральный округ, РФ', 'Полысаевский'],
  [32734000, 'Осинниковский городской округ, Кемеровская область, Сибирский федеральный округ, РФ', 'Осинниковский'],
  [32737000, 'Прокопьевский городской округ, Кемеровская область, Сибирский федеральный округ, РФ', 'Прокопьевский'],
  [32740000, 'Тайгинский городской округ, Кемеровская область, Сибирский федеральный округ, РФ', 'Тайгинский'],
  [32749000, 'Юргинский городской округ, Кемеровская область, Сибирский федеральный округ, РФ', 'Юргинский'],
  [32751000, 'Краснобродский городской округ, Кемеровская область, Сибирский федеральный округ, РФ', 'Краснобродский'],

  [50603000, 'Баганский  район, Новосибирская область', 'Баганский р-н'],
  [50604000, 'Барабинский  район, Новосибирская область', 'Барабинский р-н'],
  [50606000, 'Болотнинский  район, Новосибирская область', 'Болотнинский р-н'],
  [50608000, 'Венгеровский  район, Новосибирская область', 'Венгеровский р-н'],
  [50610000, 'Доволенский  район, Новосибирская область', 'Доволенский р-н'],
  [50613000, 'Здвинский  район, Новосибирская область', 'Здвинский р-н'],
  [50615000, 'Искитимский  район, Новосибирская область', 'Искитимский р-н'],
  [50617000, 'Карасукский  район, Новосибирская область', 'Карасукский р-н'],
  [50619000, 'Каргатский  район, Новосибирская область', 'Каргатский р-н'],
  [50621000, 'Колыванский  район, Новосибирская область', 'Колыванский р-н'],
  [50623000, 'Коченёвский район, Новосибирская область, Сибирский федеральный округ, РФ', 'Коченевский р-н'],
  [50625000, 'Кочковский  район, Новосибирская область', 'Кочковский р-н'],
  [50627000, 'Краснозёрский район, Новосибирская область, Сибирский федеральный округ, РФ', 'Краснозерский р-н'],
  [50630000, 'Куйбышевский  район, Новосибирская область', 'Куйбышевский р-н'],
  [50632000, 'Купинский  район, Новосибирская область', 'Купинский р-н'],
  [50634000, 'Кыштовский  район, Новосибирская область', 'Кыштовский р-н'],
  [50636000, 'Маслянинский  район, Новосибирская область', 'Маслянинский р-н'],
  [50638000, 'Мошковский  район, Новосибирская область', 'Мошковский р-н'],
  [50640000, 'Новосибирский  район, Новосибирская область', 'Новосибирский р-н'],
  [50642000, 'Ордынский  район, Новосибирская область', 'Ордынский р-н'],
  [50644000, 'Северный  район, Новосибирская область', 'Северный р-н'],
  [50648000, 'Сузунский  район, Новосибирская область', 'Сузунский р-н'],
  [50650000, 'Татарский  район, Новосибирская область', 'Татарский р-н'],
  [50652000, 'Тогучинский  район, Новосибирская область', 'Тогучинский р-н'],
  [50654000, 'Убинский  район, Новосибирская область', 'Убинский р-н'],
  [50655000, 'Усть-Таркский  район, Новосибирская область', 'Усть-Таркский р-н'],
  [50656000, 'Чановский  район, Новосибирская область', 'Чановский р-н'],
  [50657000, 'Черепановский  район, Новосибирская область', 'Черепановский р-н'],
  [50658000, 'Чистоозёрный район, Новосибирская область, Сибирский федеральный округ, 632720, РФ', 'Чистоозерный р-н'],
  [50659000, 'Чулымский  район, Новосибирская область', 'Чулымский р-н'],
  [50701000, 'Новосибирск, Новосибирская область', 'Новосибирск'],
  [50708000, 'Бердск, Новосибирская область', 'Бердск'],
  [50712000, 'Искитим, Новосибирская область', 'Искитим'],
  [50717000, 'г. Обь, Новосибирская область', 'г. Обь'],
  [50740000, 'рп Кольцово, Новосибирская область', 'рп Кольцово'],

  [52601000, 'Азовский немецкий национальный  район, Омская область', 'Азовский немецкий национальный  район'],
  [52603000, 'Большереченский  район, Омская область', 'Большереченский  район'],
  [52606000, 'Большеуковский  район, Омская область', 'Большеуковский  район'],
  [52609000, 'Горьковский  район, Омская область', 'Горьковский  район'],
  [52612000, 'Знаменский  район, Омская область', 'Знаменский  район'],
  [52615000, 'Исилькульский  район, Омская область', 'Исилькульский  район'],
  [52618000, 'Калачинский  район, Омская область', 'Калачинский  район'],
  [52621000, 'Колосовский  район, Омская область', 'Колосовский  район'],
  [52623000, 'Кормиловский  район, Омская область', 'Кормиловский  район'],
  [52626000, 'Крутинский  район, Омская область', 'Крутинский  район'],
  [52629000, 'Любинский  район, Омская область', 'Любинский  район'],
  [52630000, 'Марьяновский  район, Омская область', 'Марьяновский  район'],
  [52632000, 'Москаленский  район, Омская область', 'Москаленский  район'],
  [52634000, 'Муромцевский  район, Омская область', 'Муромцевский  район'],
  [52636000, 'Называевский  район, Омская область', 'Называевский  район'],
  [52639000, 'Нижнеомский  район, Омская область', 'Нижнеомский  район'],
  [52641000, 'Нововаршавский  район, Омская область', 'Нововаршавский  район'],
  [52642000, 'Одесский  район, Омская область', 'Одесский  район'],
  [52643000, 'Оконешниковский  район, Омская область', 'Оконешниковский  район'],
  [52644000, 'Омский  район, Омская область', 'Омский  район'],
  [52646000, 'Павлоградский  район, Омская область', 'Павлоградский  район'],
  [52648000, 'Полтавский  район, Омская область', 'Полтавский  район'],
  [52650000, 'Русско-Полянский  район, Омская область', 'Русско-Полянский  район'],
  [52651000, 'Саргатский  район, Омская область', 'Саргатский  район'],
  [52652000, 'Седельниковский  район, Омская область', 'Седельниковский  район'],
  [52653000, 'Таврический  район, Омская область', 'Таврический  район'],
  [52654000, 'Тарский  район, Омская область', 'Тарский  район'],
  [52655000, 'Тевризский  район, Омская область', 'Тевризский  район'],
  [52656000, 'Тюкалинский  район, Омская область', 'Тюкалинский  район'],
  [52657000, 'Усть-Ишимский  район, Омская область', 'Усть-Ишимский  район'],
  [52658000, 'Черлакский  район, Омская область', 'Черлакский  район'],
  [52659000, 'Шербакульский  район, Омская область', 'Шербакульский  район'],
  [52701000, 'город Омск, Омская область', 'город Омск'],

    [0,'0','0']

];

/*
17000000	Владимирская область
22000000	Нижегородская область
24000000	Ивановская область
32000000	Кемеровская область
50000000	Новосибирская область

*/

/**
 * Список районов региона
 * @param code  код региона
 * @param callback(value,i) для каждого подходящего района
 * value[3] район: 0-ОКТМО 1-запрос 2-кратколе наименование
 * i индекс в общем массиве
 */
function listReg(code, callback)
{
  var cod = code.substr(0,2);
  for(var i=0; i < db_oktmo.length; i++) {
    var val = db_oktmo[i];
    if((''+val[0]).substr(0,2) == cod) {
      callback(val,i);
    }
  }
}

function makeListOktmo(code) {
  let str = '';
  listReg(code, function(value) {
    let kn = value[2];
    if(!kn) kn = value[1];
    str += kn + "<br>\n";
  });

  // db_oktmo.forEach(function(value,index,arr) {
  //   if((''+value[0]).startsWith(code.substr(0,2))) {
  //     let kn = value[2];
  //     if(!kn) kn = value[1];
  //     str += kn + "<br>\n";
  //   }
  // });

  return str;
}

