import { ValueObject } from '@app/common/abstraction';

interface IPasswordProps {
    value: string;
}

export class Password extends ValueObject<IPasswordProps> {
    public constructor(props: IPasswordProps) {
        super(props);
    }

    public get value(): string {
        return this.props.value;
    }
}
