import * as restify from 'restify'

export interface IController {
    list(req: restify.Request,
        res: restify.Response,
        next: restify.Next)

    get(req: restify.Request,
        res: restify.Response,
        next: restify.Next)

    put(req: restify.Request,
        res: restify.Response,
        next: restify.Next)

    post(req: restify.Request,
        res: restify.Response,
        next: restify.Next)

    delete(req: restify.Request,
        res: restify.Response,
        next: restify.Next)

    itemName(): string

    register(server: restify.Server, controller: IController)
}

export abstract class Controller implements IController {
    abstract list(req, res, next)

    abstract get(req, res, next)

    abstract put(req, res, next)

    abstract post(req, res, next)

    abstract delete(req, res, next)

    abstract itemName()

    register(server: restify.Server, controller: IController) {
        let apiroot = `api/${this.itemName()}`.toLowerCase()
        console.log('registering', apiroot)

        server.get(`${apiroot}`, (req, res, next) => controller.list(req, res, next))        
        server.post(`${apiroot}`, (req, res, next) => controller.post(req, res, next))

        server.get(`${apiroot}/:id`, (req, res, next) => controller.get(req, res, next))
        server.put(`${apiroot}/:id`, (req, res, next) => controller.put(req, res, next))
        server.del(`${apiroot}/:id`, (req, res, next) => controller.delete(req, res, next))
    }
}