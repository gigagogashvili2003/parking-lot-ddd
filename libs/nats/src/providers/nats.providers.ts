import { Provider } from '@nestjs/common';
import { NatsService } from '../services';
import { NATS_SERVICE } from '../constants';

export const natsProviders: Provider[] = [
  {
    provide: NATS_SERVICE,
    useClass: NatsService,
  },
];
