# Reward Service

**Dependencies**:
- Minio: to upload an exported file.

## Requirements

This project is developed with:

- Node 18
- Mongo 6.0

## Installation

Clone the project

Go to the project directory

This service contains a `.env.example` file that defines environment variables you need to set. Copy and set the variables to a new `.env` file.

```bash
cp .env.example .env
```

Start the app

```bash
node app.js
```

## Database

Please create a new database.

This microservice depends on `migrate-mongo` package. To install globally
```
npm install -g migrate-mongo
```

### Running Migrations

Run database migration
```
migrate-mongo up
```

### Running Seeds

No seeds.

## Testing

Test the service

```bash
npm test
```