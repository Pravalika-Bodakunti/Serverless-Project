# Serverless CRUD API Backend

A production-ready serverless REST API built with AWS Lambda, API Gateway, and DynamoDB using the Serverless Framework. This API provides full CRUD (Create, Read, Update, Delete) functionality with proper error handling, validation, and CORS support.

## 🏗️ Architecture

- **AWS Lambda**: Serverless compute for API functions
- **API Gateway**: RESTful API endpoints with CORS
- **DynamoDB**: NoSQL database for data storage
- **GitHub Actions**: CI/CD pipeline for automated deployments
- **Serverless Framework**: Infrastructure as Code

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/items` | List all items |
| GET | `/items/{id}` | Get a specific item |
| POST | `/items` | Create a new item |
| PUT | `/items/{id}` | Update an existing item |
| DELETE | `/items/{id}` | Delete an item |

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or later
- AWS CLI configured with appropriate permissions
- Serverless Framework CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd serverless-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Serverless Framework globally**
   ```bash
   npm install -g serverless
   ```

4. **Configure AWS credentials**
   ```bash
   aws configure
   # or
   export AWS_ACCESS_KEY_ID=your-access-key
   export AWS_SECRET_ACCESS_KEY=your-secret-key
   ```

### Local Development

Deploy to development environment:
```bash
npm run deploy:dev
```

### Production Deployment

Deploy to production:
```bash
npm run deploy:prod
```

## 🔧 Configuration

### Environment Variables

The application uses the following environment variables:

- `TABLE_NAME`: DynamoDB table name (automatically set by Serverless)
- `AWS_REGION`: AWS region (default: us-east-2)

### Serverless Configuration

Key configurations in `serverless.yml`:

- **Runtime**: Node.js 18.x
- **Region**: us-east-2 (configurable)
- **IAM Permissions**: Minimal required permissions for DynamoDB operations
- **CORS**: Enabled for all endpoints
- **DynamoDB**: Pay-per-request billing mode

## 🔄 CI/CD Pipeline

This project includes a comprehensive GitHub Actions workflow that:

### Triggers
- **Pull Requests**: Deploys to development environment
- **Push to master/main**: Deploys to production environment

### Pipeline Steps
1. **Code Checkout**: Gets the latest code
2. **Node.js Setup**: Configures Node.js 18.x environment
3. **Dependencies**: Installs npm dependencies
4. **AWS Configuration**: Sets up AWS credentials
5. **Deployment**: Deploys to appropriate environment
6. **Testing**: Runs API tests (configurable)
7. **Notifications**: Comments on PRs with deployment status

### Setup GitHub Secrets

Add these secrets to your GitHub repository:

1. Go to your repository → Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `AWS_ACCESS_KEY_ID`: Your AWS access key
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret key

![GitHub Secrets Setup](docs/github-secrets.png)

### CI/CD Workflow Visualization

The workflow automatically triggers on:
- **Pull Request**: Deploys to development environment for testing
- **Push to master/main**: Deploys to production environment

## 📝 API Usage Examples

### Create an Item
```bash
curl -X POST https://your-api-url/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Sample Item"}'
```

### Get All Items
```bash
curl https://your-api-url/items
```

### Get Specific Item
```bash
curl https://your-api-url/items/item-id
```

### Update an Item
```bash
curl -X PUT https://your-api-url/items/item-id \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Item"}'
```

### Delete an Item
```bash
curl -X DELETE https://your-api-url/items/item-id
```

## 🛡️ Security Features

- **Input Validation**: All endpoints validate required fields
- **Error Handling**: Comprehensive error responses with appropriate HTTP status codes
- **CORS**: Properly configured for cross-origin requests
- **IAM Permissions**: Minimal required permissions following least privilege principle
- **Conditional Operations**: Prevents race conditions and ensures data integrity

## 📊 Monitoring and Logging

- **CloudWatch Logs**: All Lambda functions log to CloudWatch
- **Error Tracking**: Detailed error logging with stack traces
- **Performance Monitoring**: Built-in AWS Lambda metrics

## 🧪 Testing

Run the deployment:
```bash
npm run deploy:dev
```

Test the API endpoints using the provided curl examples or tools like Postman.

## 📁 Project Structure

```
serverless-backend/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD pipeline
├── crud-api/
│   ├── functions/
│   │   ├── create.js          # Create item function
│   │   ├── list.js            # List items function
│   │   ├── get.js             # Get item function
│   │   ├── update.js          # Update item function
│   │   └── delete.js          # Delete item function
│   ├── serverless.yml         # Serverless configuration
│   └── README.md              # This file
├── package.json               # Dependencies and scripts
└── package-lock.json          # Dependency lock file
```

## 🚨 Troubleshooting

### Common Issues

1. **Deployment Fails**
   - Check AWS credentials are properly configured
   - Ensure you have necessary IAM permissions
   - Verify the region is correct

2. **CORS Issues**
   - CORS is enabled in the serverless.yml configuration
   - Check that your frontend is making requests to the correct API URL

3. **DynamoDB Errors**
   - Ensure the Lambda functions have proper IAM permissions
   - Check that the table name environment variable is set correctly

### Useful Commands

```bash
# View logs for a specific function
npm run logs -- --function createItem

# Remove the entire stack
npm run remove

# Deploy with verbose output
cd crud-api && serverless deploy --verbose
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🔗 Additional Resources

- [Serverless Framework Documentation](https://www.serverless.com/framework/docs/)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [DynamoDB Documentation](https://docs.aws.amazon.com/dynamodb/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)