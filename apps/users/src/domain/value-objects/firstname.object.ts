import { ValueObject } from '@app/common/abstraction';

interface IFirstNameProps {
    value: string;
}

export class FirstName extends ValueObject<IFirstNameProps> {
    public constructor(props: IFirstNameProps) {
        super(props);
    }

    public get value(): string {
        return this.props.value;
    }
}
