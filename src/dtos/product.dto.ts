interface ProductCreateDto {
    name: string;
    price: number;
    mrp: number;
    isPublished: boolean;
}

interface ProductUpdateDto {
    name: string;
}
interface ProductUpdateToPostDto{
    isPublished: boolean
}
interface ResponseProductUpdatePost{
    success: boolean;
    code: number;
    message: string
}

export {
    ProductCreateDto,
    ProductUpdateDto,
    ProductUpdateToPostDto,
    ResponseProductUpdatePost
}