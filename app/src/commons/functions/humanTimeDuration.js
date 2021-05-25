import moment from 'moment'
import 'moment/locale/vi'  // without this line it didn't work

const HOUR = 3600000;
const DAY = 86400000;
function humanTimeDuration(duration) {
    return (duration < 60000) ?
        `${duration / 1000} giây` :
        (duration < HOUR) ?
            moment(duration).format("m ") + "phút" :
            (duration < DAY) ?
                moment(duration).format("HH giờ mm phút") :
                (duration < 365 * DAY) ?
                    moment.duration(duration).asDays() :
                    'Bài test chỉ được làm 1 lần'
}
function humanDayDiff(duration) {
    return (duration < 30) ?
        `${duration} ngày` :
        (duration < 365) ?
            `${Math.ceil(duration / 30)} tháng` :
            'Bài test chỉ được làm 1 lần'
}

function smallTime(duration) {
    return (duration < 60000) ?
        `${Math.floor(duration / 1000)} giây` :
        (duration < HOUR) ?
            moment(duration).format("m ") + "phút" :
            (duration < DAY) ?
                moment(duration).format("HH giờ mm phút") :
                (duration < 365 * DAY) ?
                    moment.duration(duration).asDays() :
                    'Năm sau'
}

export { humanTimeDuration, humanDayDiff, smallTime }