interface ExampleCreateDto {
    name: string;
    description: string;
    active: boolean;
}

interface ExampleUpdateDto {
    description: string;
}

export {
    ExampleCreateDto,
    ExampleUpdateDto
}