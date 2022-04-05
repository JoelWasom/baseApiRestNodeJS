import express = require('express');
import { createContainer, asClass } from "awilix";
import { scopePerRequest } from "awilix-express";

import { ExampleMySQLRepository } from './services/repositories/impl/mysql/example.repository';
import { ExampleService } from './services/example.service';
import { ProductMySQLRepository } from './services/repositories/impl/mysql/product.repository';
import { ProductService } from './services/product.service';
import { ResponseHelper } from './common/response.helper';

export default (app: express.Application): void => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    container.register({
        // repositories
        exampleRepository: asClass(ExampleMySQLRepository).scoped(),
        productRepository: asClass(ProductMySQLRepository).scoped(),

        // services(),
        exampleService: asClass(ExampleService).scoped(),
        productService: asClass(ProductService).scoped(),
        responseHelper: asClass(ResponseHelper).scoped()
    });

    app.use(scopePerRequest(container));
};