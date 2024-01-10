export function getAgeFromBirthday(b){
    const birthday = new Date(b);
    const MonthsInRussian = [
      "Января",
      "Февраля",
      "Марта",
      "Апреля",
      "Мая",
      "Июня",
      "Июля",
      "Августа",
      "Сентября",
      "Октября",
      "Ноября",
      "Декабря",
    ];
    const MonthsInRussian2 = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    let age = 0;
    age = new Date().getTime() - birthday.getTime();
    age = parseInt(age / (1000 * 60 * 60 * 24 * 365));
    return age
}