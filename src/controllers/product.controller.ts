import { Request, Response } from 'express';
import { route, GET, POST, PUT, PATCH, DELETE } from "awilix-express";
import { ProductService } from '../services/product.service';
import { BaseController } from '../common/controllers/base.controller';
import { ProductCreateDto, ProductUpdateDto, ProductUpdateToPostDto } from '../dtos/product.dto';

@route('/products')
export class ExampleController extends BaseController {
    constructor(
        private readonly productService: ProductService
    ) {
        super();
    }

    @GET()
    public async all(req: Request, res: Response) {
        try {
            res.send(
                await this.productService.all()
            );
        } catch (error) {
            this.handleException(error, res);
        }
    }

    // Ex: products/1
    @route('/:id')
    @GET()
    public async find(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const result = await this.productService.find(id);
            if (result) {
                res.send(result);
            } else {
                res.status(404).send();
            }
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @POST()
    public async store(req: Request, res: Response) {
        try {
            await this.productService.store({
                name: req.body.name,
                price: req.body.price,
                mrp: req.body.mrp,
                stock: req.body.stock,
                isPublished: true,
            } as ProductCreateDto);
            res.status(201).send();
        } catch (error) {
            this.handleException(error, res);
        }
    }
    @route('/:id')
    @PATCH()
    public async toPost(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            let result = await this.productService.toPost(id, { isPublished: true } as ProductUpdateToPostDto);
            if(result.success == true){
                res.status(204).send();
            } else {
                // res.send(422);
                res.status(422).send(result);
            }
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/:id')
    @PUT()
    public async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            // await this.productService.update(id, {
            //     name: req.body.name
            // } as ProductUpdateDto);
            res.status(405).send();
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/:id')
    @DELETE()
    public async remove(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            
            // await this.productService.remove(id);
            res.status(405).send();
        } catch (error) {
            this.handleException(error, res);
        }
    }
}