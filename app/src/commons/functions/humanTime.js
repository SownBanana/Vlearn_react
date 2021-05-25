import moment from 'moment'
import 'moment/locale/vi'  // without this line it didn't work

const dateTimeFormat = "DD-MM-yyyy HH:mm";
function fromTimeString(timeString, nullMessage = "Không đặt") {
    if (timeString) {
        const timestamp = new Date(timeString);
        return fromTimeStamp(timestamp);
    } else {
        return nullMessage;
    }
}
function fromTimeStamp(timestamp) {
    return moment(timestamp).format(dateTimeFormat)
}


export { fromTimeString, fromTimeStamp }