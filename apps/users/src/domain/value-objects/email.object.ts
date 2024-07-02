import { ValueObject } from '@app/common/abstraction';

interface IEmailProps {
    value: string;
}

export class Email extends ValueObject<IEmailProps> {
    public constructor(props: IEmailProps) {
        super(props);
    }

    public get value(): string {
        return this.props.value;
    }
}
