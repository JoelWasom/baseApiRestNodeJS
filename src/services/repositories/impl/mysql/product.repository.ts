import connector from "../../../../common/persistence/mysql.persistence";
import { Product } from "../../domain/product";
import { ProductRepository } from "../../product.repository";
import { ResponseProductUpdatePost } from "../../../../dtos/product.dto";

export class ProductMySQLRepository implements ProductRepository {
    public async all(): Promise<Product[]> {
        const [rows] = await connector.execute(
            'SELECT * FROM products ORDER BY id ASC'
        );
        return rows as Product[];
    }

    public async find(id: Number): Promise<Product | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM products WHERE id = ?',
            [id]
        );
        if (rows.length) {
            return rows[0] as Product;
        }
        return null;
    }

    public async store(entry: Product): Promise<void> {
        await connector.execute(
            'INSERT INTO products(name, price, mrp, stock, isPublished) VALUES(?, ?, ?, ?, ?)',
            [ entry.name, entry.price, entry.mrp, entry.stock, entry.isPublished]
        )
    }

    public async update(entry: Product): Promise<void> {
        await connector.execute(
            'UPDATE products SET name = ?, WHERE id = ?',
            [entry.name, entry.id]
        )
    }

    public async remove(id: Number): Promise<void> {
        await connector.execute(
            'DELETE FROM products WHERE id = ?',
            [id]
        )
    }

    public async updatePost(entry: Product):Promise<void>{
        await connector.execute(
            'UPDATE products SET isPublished = ? WHERE id = ?',
            [entry.isPublished, entry.id]
        )
    }
}