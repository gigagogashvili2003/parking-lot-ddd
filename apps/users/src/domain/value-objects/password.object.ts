import { ValueObject } from '@app/common/abstracts';
import * as bcrypt from 'bcrypt';

interface IPasswordProps {
    value: string;
}

export class Password extends ValueObject<IPasswordProps> {
    public constructor(props: IPasswordProps) {
        super(props);
    }

    public static async create(value: string) {
        const hashedPassword = await bcrypt.hash(value, 10);
        return new Password({ value: hashedPassword });
    }

    public get value(): string {
        return this.props.value;
    }
}
