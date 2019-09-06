import moment from 'moment';

export function transformObjectToArray(object,id = 'id') {
  return object ? Object.keys(object).map((key)=>{ return {...object[key], [id]: key} }) : false
}

export const transformArrayToObject = (array, keyField) =>
   array.reduce((obj, item) => {
     obj[item[keyField]] = item
     return obj
   }, {})

export const transformArrayToSimpleObject = (array, keyField, valueField) =>
   array.reduce((obj, item) => {
     obj[item[keyField]] = item[valueField]
     return obj
   }, {})

export const convertTime = (time, format = "h:mma") => {
    switch (time) {
      case "00:00:00":
      case "01:00:00":
        return ""
      default:
        return moment(time,"HH:mm:ss").format(format)
    }
  }

export const convertDate = (date, format = "dddd, Do") => {
  const day = moment(date,"YYYY-MM-DD").format("ddd")
    if (day !== "Wed") {
      return moment(date,"YYYY-MM-DD").format(format)
    } else return "N/A"
}

export function dynamicSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      /* next line works with strings and numbers, 
       * and you may want to customize it to your needs
       */
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}

export function dynamicSortMultiple() {
  /*
   * save the arguments object as it will be overwritten
   * note that arguments object is an array-like object
   * consisting of the names of the properties to sort by
   */
  var props = arguments;
  return function (obj1, obj2) {
      var i = 0, result = 0, numberOfProperties = props.length;
      /* try getting a different result from 0 (equal)
       * as long as we have extra properties to compare
       */
      while(result === 0 && i < numberOfProperties) {
          result = dynamicSort(props[i])(obj1, obj2);
          i++;
      }
      return result;
  }
}