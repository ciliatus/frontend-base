export default class Search {

    static resolveSearchString (string, mapping = null, exact = false) {
        if (!string || string.length < 1) return {}

        if (string.match(/^[a-z0-9\s]+$/i)) string = "name:" + string // Default search pattern

        let resolved = {}, term, regex = /([a-z.]+):([^,]+)/ig
        while ((term = regex.exec(string)) !== null) {
            resolved[term[1]] = {
                exact: exact,
                value: term[2]
            }
        }

        if (mapping) {
            Object.keys(mapping).forEach((m) => {
                if (resolved[m]) {
                    resolved[mapping[m]] = resolved[m]
                    delete resolved[m]
                }
            })
        }

        return resolved
    }

}
