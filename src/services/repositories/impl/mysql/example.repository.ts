import connector from "../../../../common/persistence/mysql.persistence";
import { Example } from "../../domain/Example";
import { ExampleRepository } from "../../example.repository";

export class ExampleMySQLRepository implements ExampleRepository {
    public async all(): Promise<Example[]> {
        const [rows] = await connector.execute(
            'SELECT * FROM example ORDER BY id DESC'
        );
        return rows as Example[];
    }

    public async find(id: Number): Promise<Example | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM example WHERE id = ?',
            [id]
        );
        if (rows.length) {
            return rows[0] as Example;
        }
        return null;
    }

    public async store(entry: Example): Promise<void> {
        await connector.execute(
            'INSERT INTO example(name, description) VALUES(?, ?)',
            [ entry.name, entry.description]
        )
    }

    public async update(entry: Example): Promise<void> {
        await connector.execute(
            'UPDATE example SET description = ?, WHERE id = ?',
            [entry.description, entry.id]
        )
    }

    public async remove(id: Number): Promise<void> {
        await connector.execute(
            'DELETE FROM example WHERE id = ?',
            [id]
        )
    }
}