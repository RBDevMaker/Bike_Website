# Bike Shop Application

A full-stack bike shop application with React frontend and AWS serverless backend.

## Project Structure

```
bike-app/
├── frontend/              # React + Vite frontend
│   ├── src/              # React components and logic
│   ├── public/           # Static assets
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── services/             # Backend microservices
│   ├── bike-service/    # Main bike shop service (SAM)
│   │   ├── hello_world/ # Hello world Lambda
│   │   ├── get_products/ # Get products Lambda
│   │   ├── template.yaml
│   │   └── samconfig.toml
│   │
│   └── shared/          # Shared utilities
│       ├── create_bike_products/
│       └── s3/
│
└── README.md
```

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

Deploy the bike service:

```bash
cd services/bike-service
sam build
sam deploy --guided
```

## API Endpoints

- `GET /hello` - Hello world endpoint
- `GET /products` - Get all bike products

## Resources

- DynamoDB Table: `BikeProducts`
- Lambda Functions: HelloWorld, GetProducts
