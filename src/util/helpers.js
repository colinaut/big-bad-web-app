import moment from 'moment';

export function transformObjectToArray(object,id = 'id') {
  return object ? Object.keys(object).map((key)=>{ return {...object[key], [id]: key} }) : false
}

export const transformArrayToObject = (array, keyField) =>
   array.reduce((obj, item) => {
     obj[item[keyField]] = item
     return obj
   }, {})

export const convertTime = (time, format = "h:mma") => {
    switch (time) {
      case "00:00:00":
        return ""
      default:
        return moment(time,"HH:mm:ss").format(format)
    }
  }

export const convertDate = (date, format = "dddd, Do") => {
    const day = moment(date,"YYYY-MM-DD").format("ddd")
    if (day !== "Wed") {
      return moment(date,"YYYY-MM-DD").format(format)
    } else return "Date TBA"
  }