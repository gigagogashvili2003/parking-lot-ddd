import { ValueObject } from '@app/common/abstracts';

interface ILastNameProps {
    value: string;
}

export class LastName extends ValueObject<ILastNameProps> {
    public constructor(props: ILastNameProps) {
        super(props);
    }

    public get value(): string {
        return this.props.value;
    }
}
