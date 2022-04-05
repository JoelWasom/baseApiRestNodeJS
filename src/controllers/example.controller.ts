import { Request, Response } from 'express';
import { route, GET, POST, PUT, DELETE } from "awilix-express";
import { ExampleService } from '../services/example.service';
import { BaseController } from '../common/controllers/base.controller';
import { ExampleCreateDto, ExampleUpdateDto } from '../dtos/example.dto';
import { TestService } from '../services/test.service';

@route('/examples')
export class ExampleController extends BaseController {
    constructor(
        private readonly exampleService: ExampleService,
        private readonly testService: TestService
    ) {
        super();
    }

    @GET()
    public async all(req: Request, res: Response) {
        try {
            res.send(
                await this.exampleService.all()
            );
        } catch (error) {
            this.handleException(error, res);
        }
    }

    // Ex: examples/1
    @route('/:id')
    @GET()
    public async find(req: Request, res: Response) {
        console.log(req.params.id);
        try {
            const id = parseInt(req.params.id);
            const result = await this.exampleService.find(id);
            if (result) {
                res.send(result);
            } else {
                res.status(404);
                res.send();
            }
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @POST()
    public async store(req: Request, res: Response) {
        try {
            await this.exampleService.store({
                name: req.body.name,
                description: req.body.description,
                active: req.body.active
            } as ExampleCreateDto);
            res.status(201);
            res.send(this.testService.response());
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/:id')
    @PUT()
    public async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await this.exampleService.update(id, {
                description: req.body.description
            } as ExampleUpdateDto);
            res.send();
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/:id')
    @DELETE()
    public async remove(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await this.exampleService.remove(id);
            res.send();
        } catch (error) {
            this.handleException(error, res);
        }
    }
}