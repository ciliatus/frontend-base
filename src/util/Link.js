import config from "../config";

export default class Link {

    static link (...args) {
        return config.web.basePath + config.web.prefix + args.join("/")
    }

    static api (...args) {
        return config.api.basePath + config.api.prefix + args.join("/")
    }

    static base (...args) {
        return config.api.basePath + args.join('/')
    }

}
