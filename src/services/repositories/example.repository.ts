import { Example } from "./domain/Example"

export interface ExampleRepository {
    find(id: number): Promise<Example | null>;
    all(): Promise<Example[]>;
    store(entry: Example): Promise<void>;
    update(entry: Example): Promise<void>;
    remove(id: number): Promise<void>;
}