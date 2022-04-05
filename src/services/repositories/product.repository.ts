import { Product } from "./domain/product";

export interface ProductRepository {
    find(id: number): Promise<Product | null>;
    all(): Promise<Product[]>;
    store(entry: Product): Promise<void>;
    update(entry: Product): Promise<void>;
    remove(id: number): Promise<void>;
    updatePost(entry: Product): Promise<void>;
}