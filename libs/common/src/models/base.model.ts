import { CreateDateColumn, PrimaryColumn } from 'typeorm';

export class BaseModel {
    @PrimaryColumn('uuid')
    id: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    createdAd: Date;

    @CreateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    updatedAt: Date;
}
