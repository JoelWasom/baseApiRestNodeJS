import { ExampleRepository } from "./repositories/example.repository";
import { Example } from "./repositories/domain/Example";
import { ApplicationException } from "../common/exceptions/application.exception";
import { ExampleCreateDto, ExampleUpdateDto } from "../dtos/example.dto";

export class ExampleService {
    constructor(
        private readonly exampleRepository: ExampleRepository
    ) { }

    public async find(id: number): Promise<Example | null> {
        return await this.exampleRepository.find(id);
    }

    public async all(): Promise<Example[]> {
        return await this.exampleRepository.all();
    }

    public async store(entry: ExampleCreateDto): Promise<void> {
        await this.exampleRepository.store(entry as Example);
    }

    public async update(id: number, entry: ExampleUpdateDto): Promise<void> {
        let originalEntry = await this.exampleRepository.find(id);

        if (originalEntry) {
            originalEntry.description = entry.description;
            await this.exampleRepository.update(originalEntry);
        } else {
            throw new ApplicationException('Example not found.');
        }
    }

    public async remove(id: number): Promise<void> {
        await this.exampleRepository.remove(id);
    }
}