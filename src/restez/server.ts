import {IFactory} from './factory'
import * as restify from 'restify'
const loader = require('glob-module-loader')

export interface IServer {
    load(path: string)
}

export class Server implements IServer {
    private server: restify.Server

    constructor(private config) {
        this.server = restify.createServer()
        this.server.use(restify.bodyParser())
    }

    listen(port: number) {
        this.server.listen(port, function() {
            console.log('listening on port', port)
        })
    }

    register(controllerFactory: IFactory) {
        var instance = controllerFactory.Create(this.config)

        instance.register(this.server, instance)
    }

    load(path) {
        let _this = this

        return new Promise((resolve, reject) => {
            loader.load(path,
                function(module) {
                    _this.register(module)
                },
                function(err, modules) {
                    if (err) {
                        throw err
                    } else {
                        console.log('resolve')
                        resolve()
                    }
                }
            )
        })
    }
}