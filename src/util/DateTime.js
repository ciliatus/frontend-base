import moment from 'moment';

// This class is used as an adapter to an actual date time library.
// Right now we're using moment.js but might switch to JS Temporal when it's ready.
export default class DateTime {

    constructor (dt) {
        this.dt = dt
    }

    static now() {
        return new DateTime(moment())
    }

    static parse(dt) {
        return new DateTime(moment.parseZone(dt))
    }

    format(format = null) {
        if (format == null) return this.dt.format()

        return this.dt.format(format)
    }

    diff (dt) {
        return Math.round(this.dt.diff(dt.dt) / 1000)
    }

    subDays (count) {
        return this.dt.subtract(count, 'days')
    }

}