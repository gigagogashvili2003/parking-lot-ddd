import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

export class ZodValidationPipe implements PipeTransform {
    public constructor(private schema: ZodSchema) {}

    public transform(value: unknown) {
        try {
            const parsedValue = this.schema.parse(value);
            return parsedValue;
        } catch (error) {
            if (error instanceof ZodError) {
                const formattedErrors = error.errors
                    .map((err) => {
                        const path = err.path.join('.');
                        return `${path}: ${err.message}`;
                    })
                    .join(', ');

                throw new BadRequestException(`Validation failed: ${formattedErrors}`);
            } else {
                throw new BadRequestException('Validation failed');
            }
        }
    }
}
