export default class ErrorParser {

    static parse (error) {
        let errors = [],
            resp = JSON.parse(error.response.data)
        if (resp.errors) {
            Object.keys(resp.errors).forEach((e) => {
                window.console.log(e)
                errors.push({
                    severity: 'error',
                    message: resp.errors[e].join(' ')
                })
            })
        } else {
            errors.push({
                severity: 'error',
                message: 'Server error'
            })
        }

        window.console.log(error)

        return errors
    }

}
