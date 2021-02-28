export default {
    api: {
        basePath: window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port: '') + '/',
        prefix: 'api/v1/',
        xDebug: true
    },
    web: {
        basePath: window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port: '') + '/',
        prefix: 'web/'
    },
    pusherKey: ''
}
