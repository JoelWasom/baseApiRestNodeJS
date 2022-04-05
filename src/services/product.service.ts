import { ProductRepository } from "./repositories/product.repository";
import { Product } from "./repositories/domain/product";
import { ApplicationException } from "../common/exceptions/application.exception";
import { ResponseHelper } from "../common/response.helper";

import { ProductCreateDto, ProductUpdateDto, ProductUpdateToPostDto, ResponseProductUpdatePost } from "../dtos/product.dto";

export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly responseHelper: ResponseHelper
    ) { }

    public async find(id: number): Promise<Product | null> {
        return await this.productRepository.find(id);
    }

    public async all(): Promise<Product[]> {
        return await this.productRepository.all();
    }

    public async store(entry: ProductCreateDto): Promise<void> {
        await this.productRepository.store(entry as Product);
    }

    public async update(id: number, entry: ProductUpdateDto): Promise<void> {
        let originalEntry = await this.productRepository.find(id);

        if (originalEntry) {
            originalEntry.name = entry.name;
            await this.productRepository.update(originalEntry);
        } else {
            throw new ApplicationException('Product not found.');
        }
    }

    // public async toPost(id: number, entry: ProductUpdateToPostDto): Promise<void>{
    //     let originalEntry = await this.productRepository.find(id);

    //     if (originalEntry) {
    //         if(originalEntry.mrp >= originalEntry.price){
    //             if(originalEntry.stock > 0){
    //                 originalEntry.isPublished = entry.isPublished;
    //                 await this.productRepository.updatePost(originalEntry);
    //             } else{
    //                 this.responseHelper.responseCriterio2();
    //             }
    //         } else if(originalEntry.stock > 0){
    //             this.responseHelper.responseCriterio1();
    //         } else{
    //             this.responseHelper.responseCriterio12();
    //         }
    //     } else {
    //         throw new ApplicationException('Product not found.');
    //     }
    // }
    public async toPost(id: number, entry: ProductUpdateToPostDto){
        let originalEntry = await this.productRepository.find(id);

        if (originalEntry) {
            if(originalEntry.mrp >= originalEntry.price){
                if(originalEntry.stock > 0){
                    originalEntry.isPublished = entry.isPublished;
                    await this.productRepository.updatePost(originalEntry);
                    return this.responseHelper.response();
                } else{
                    return this.responseHelper.responseCriterio2();
                }
            } else if(originalEntry.stock > 0){
                return this.responseHelper.responseCriterio1();
            } else{
                return this.responseHelper.responseCriterio12();
            }
        } else {
            throw new ApplicationException('Product not found.');
        }
    }
    // public updateToPost(id:number, entry: ProductUpdateToPostDto){
    //     let originalEntry = this.productRepository.find(id);
    //     let result = this.toPost(originalEntry)
    // }
    
    public async remove(id: number): Promise<void> {
        await this.productRepository.remove(id);
    }
}