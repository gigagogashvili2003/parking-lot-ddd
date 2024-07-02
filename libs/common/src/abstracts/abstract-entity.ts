import { CryptoUtils } from '@app/common/utils';
import { UUID } from 'crypto';

export abstract class Entity<T> {
  protected readonly _id: UUID;
  protected props: T;

  public constructor(props: T, id?: UUID) {
    this._id = id || CryptoUtils.generateUUID();
    this.props = props;
  }
}
