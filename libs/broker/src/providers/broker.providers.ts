import { Provider } from '@nestjs/common';
import { BROKER_SERVICE } from '../constants';
import { BrokerService } from '../services';

export const brokerProviders: Provider[] = [
  {
    provide: BROKER_SERVICE,
    useClass: BrokerService,
  },
];
