import { EventStoreDBClient, FORWARDS, START } from '@eventstore/db-client';

const client = EventStoreDBClient.connectionString(
    `esdb://${process.env.EVENTSTORE_DB_HOST}:${process.env.EVENTSTORE_DB_PORT}?tls=false`,
);

async function connect() {
    try {
        await client.readAll({
            direction: FORWARDS,
            fromPosition: START,
            maxCount: 1,
        });
    } catch (err) {
        console.error('Unable to connect to EventStoreDB', err);
    }
}

export { client, connect };
