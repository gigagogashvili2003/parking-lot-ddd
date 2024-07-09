import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'apps/users/src/infrastructure/models';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async (configService: ConfigService) => {
                return {
                    type: 'postgres',
                    host: configService.get('POSTGRES_HOST'),
                    port: parseInt(configService.get('POSTGRES_PORT')),
                    username: configService.get('POSTGRES_USER'),
                    password: configService.get('POSTGRES_PASSWORD'),
                    database: configService.get('POSTGRES_DB'),
                    entities: [UserModel],
                    synchronize: true,
                    logging: false,
                };
            },
            imports: [ConfigModule],
            inject: [ConfigService],
        }),
    ],
    providers: [],
    exports: [],
})
export class DbModule {}
