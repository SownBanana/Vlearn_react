import moment from "moment";

const HOUR = 3600000;
const DAY = 86400000;
export const getTimePastText = (timestamp) => {
    const timePast = moment(Date.now()).diff(moment(timestamp));
    const timeString =
        (timePast < 60000) ?
            "vừa xong" :
            (timePast < HOUR) ?
                moment(timePast).format("m ") + "phút trước" :
                (timePast < DAY) ?
                    moment(timestamp).format("HH:mm") :
                    moment(timestamp).format("DD MMMM HH:mm")
    return timeString;
}