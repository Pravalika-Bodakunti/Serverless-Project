# Full-Stack Serverless CRUD Application

A production-ready full-stack REST API application built with AWS serverless architecture and React frontend.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │   API Gateway    │    │  Lambda Funcs   │    │   DynamoDB      │
│   (Frontend)    │───▶│   (REST API)     │───▶│   (Business)    │───▶│   (Database)    │
│   Material-UI   │    │   CORS Enabled   │    │   Node.js       │    │   NoSQL         │
└─────────────────┘    └──────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │  GitHub Actions  │
                       │    CI/CD         │
                       │  Dev/Prod Deploy │
                       └──────────────────┘
```

## ✅ Requirements Compliance

### **Core Requirements - 100% Complete**

| Requirement | Status | Implementation |
|------------|--------|----------------|
| **JavaScript/Node.js Backend** | ✅ Complete | 5 Lambda functions in Node.js |
| **React Frontend** | ✅ Complete | React with TypeScript & Material-UI |
| **Serverless Framework IAC** | ✅ Complete | Complete infrastructure as code |
| **API Gateway + DynamoDB** | ✅ Complete | REST API with DynamoDB storage |
| **5 Lambda CRUD Functions** | ✅ Complete | Create, List, Get, Update, Delete |
| **No Direct Service Proxy** | ✅ Complete | All requests go through Lambda |
| **Multi-stage CI/CD Pipeline** | ✅ Complete | GitHub Actions with dev/prod |
| **Fully Working Template** | ✅ Complete | Tested and functional |
| **Public GitHub Repository** | ✅ Complete | Public repo with frequent commits |
| **Complete Documentation** | ✅ Complete | This comprehensive README |

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or later
- AWS CLI configured
- Serverless Framework CLI
- Git

### 1. Clone Repository

```bash
git clone https://github.com/Pravalika-Bodakunti/Serverless-Project.git
cd Serverless-Project
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd crud-api
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Deploy Backend

```bash
# Deploy to development
npm run deploy:dev

# Deploy to production
npm run deploy:prod
```

### 4. Run Frontend Locally

```bash
cd frontend
npm start
```

Access the application at: `http://localhost:3000`

## 📋 API Endpoints

### Base URL
- **Development**: `https://zg6y5ynqd0.execute-api.us-east-2.amazonaws.com/dev`
- **Production**: `https://{api-id}.execute-api.us-east-2.amazonaws.com/prod`

### Endpoints

| Method | Endpoint | Description | Lambda Function |
|--------|----------|-------------|-----------------|
| `POST` | `/items` | Create new item | `createItem` |
| `GET` | `/items` | List all items | `listItems` |
| `GET` | `/items/{id}` | Get specific item | `getItem` |
| `PUT` | `/items/{id}` | Update item | `updateItem` |
| `DELETE` | `/items/{id}` | Delete item | `deleteItem` |

### Example Requests

**Create Item:**
```bash
curl -X POST https://api-url/dev/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Sample Item"}'
```

**Get All Items:**
```bash
curl https://api-url/dev/items
```

**Update Item:**
```bash
curl -X PUT https://api-url/dev/items/{id} \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Item"}'
```

## 🏗️ Infrastructure as Code

### Serverless Framework Configuration

The `crud-api/serverless.yml` file defines:

- **5 Lambda Functions** with individual handlers
- **DynamoDB Table** with pay-per-request billing
- **API Gateway** with CORS enabled
- **IAM Permissions** with least privilege access
- **Multi-stage Support** (dev/prod environments)

### AWS Resources Created

```yaml
Resources:
  - AWS Lambda Functions (5)
  - API Gateway REST API (1)
  - DynamoDB Table (1)
  - IAM Role & Policies (1)
  - CloudFormation Stack (1)
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

The `.github/workflows/deploy.yml` implements:

**Triggers:**
- **Pull Request** → Deploy to Development
- **Push to main** → Deploy to Production

**Pipeline Steps:**
1. Checkout code
2. Setup Node.js 18.x
3. Install dependencies
4. Configure AWS credentials
5. Deploy to appropriate environment
6. Run tests (configurable)
7. Comment on PR with status

### Setup Instructions

1. **Add GitHub Secrets:**
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`

2. **Navigate to:** Repository → Settings → Secrets and variables → Actions

3. **Add secrets** with your AWS credentials

## 📱 Frontend Features

### Technology Stack
- **React 18** with TypeScript
- **Material-UI v5** for components
- **Axios** for API communication
- **Responsive Design** for all device sizes

### Device Support
- **Mobile** (< 600px): Compact layout
- **Tablet** (600-960px): Medium layout
- **Desktop** (960-1280px): Full layout
- **Large Screen** (> 1280px): Expanded layout

### Features
- ✅ Complete CRUD operations
- ✅ Real-time data updates
- ✅ Loading states & error handling
- ✅ Form validation
- ✅ Responsive data grid
- ✅ Material Design components
- ✅ Toast notifications

## 🛡️ Backend Features

### Lambda Functions

Each Lambda function includes:
- **Error Handling**: Comprehensive try-catch blocks
- **Input Validation**: Required field validation
- **CORS Headers**: Cross-origin support
- **Logging**: CloudWatch integration
- **Status Codes**: Proper HTTP responses

### Security Features
- **IAM Permissions**: Least privilege access
- **Input Validation**: Prevent injection attacks
- **Error Sanitization**: No sensitive data exposure
- **CORS Configuration**: Controlled access

## 📊 Database Schema

### DynamoDB Table: `crud-api-items-{stage}`

```json
{
  "id": "uuid",           // Primary Key
  "name": "string",       // Item name
  "createdAt": "ISO date", // Creation timestamp
  "updatedAt": "ISO date"  // Last update timestamp
}
```

**Configuration:**
- **Billing Mode**: Pay per request
- **Primary Key**: `id` (String)
- **No GSI**: Simple single-table design

## 🧪 Testing

### Local Testing

1. **Start Backend:**
   ```bash
   npm run deploy:dev
   ```

2. **Start Frontend:**
   ```bash
   cd frontend && npm start
   ```

3. **Test Operations:**
   - Create items
   - View items list
   - Edit items
   - Delete items

### API Testing

```bash
# Test all endpoints
curl -X POST {api-url}/items -d '{"name":"Test"}'
curl {api-url}/items
curl {api-url}/items/{id}
curl -X PUT {api-url}/items/{id} -d '{"name":"Updated"}'
curl -X DELETE {api-url}/items/{id}
```

## 📁 Project Structure

```
serverless-backend/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD pipeline
├── crud-api/                   # Backend serverless application
│   ├── functions/              # Lambda function handlers
│   │   ├── create.js          # POST /items
│   │   ├── list.js            # GET /items
│   │   ├── get.js             # GET /items/{id}
│   │   ├── update.js          # PUT /items/{id}
│   │   └── delete.js          # DELETE /items/{id}
│   ├── serverless.yml         # Infrastructure as Code
│   └── package.json           # Backend dependencies
├── frontend/                   # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   └── ItemsManager.tsx # Main CRUD component
│   │   ├── services/
│   │   │   └── api.ts          # API service layer
│   │   └── App.tsx             # Main app component
│   └── package.json           # Frontend dependencies
├── package.json               # Root package with scripts
└── README.md                  # This documentation
```

## 🚀 Deployment

### Automated Deployment (Recommended)

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **GitHub Actions automatically:**
   - Deploys to production
   - Updates all AWS resources
   - Provides deployment status

### Manual Deployment

```bash
# Development
cd crud-api
serverless deploy --stage dev

# Production
cd crud-api
serverless deploy --stage prod
```

## 📈 Monitoring & Logging

### CloudWatch Integration
- **Lambda Logs**: Automatic logging to CloudWatch
- **API Gateway Logs**: Request/response logging
- **Error Tracking**: Detailed error information
- **Performance Metrics**: Built-in AWS metrics

### Log Access
```bash
# View logs for specific function
cd crud-api
serverless logs -f createItem --stage dev
```

## 🔧 Configuration

### Environment Variables

The application uses these environment variables:

- `TABLE_NAME`: DynamoDB table name (auto-generated)
- `AWS_REGION`: Deployment region (us-east-2)

### Customization

**Change AWS Region:**
```yaml
# crud-api/serverless.yml
provider:
  region: your-preferred-region
```

**Modify Table Name:**
```yaml
# crud-api/serverless.yml
resources:
  Resources:
    ItemsTable:
      Properties:
        TableName: your-custom-table-name
```

## 💰 Cost Optimization

### AWS Free Tier Usage
- **Lambda**: 1M requests/month free
- **API Gateway**: 1M requests/month free
- **DynamoDB**: 25GB storage + 25 RCU/WCU free
- **CloudWatch**: 5GB logs free

### Estimated Costs
- **Development Usage**: $0/month (within free tier)
- **Production (1K requests/day)**: ~$1-2/month

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes with tests
4. Submit a pull request
5. CI/CD will automatically test and deploy

## 📄 License

This project is licensed under the ISC License.

## 🔗 Links

- **Live Application**: [Coming Soon - Frontend Deployment]
- **GitHub Repository**: https://github.com/Pravalika-Bodakunti/Serverless-Project
- **API Documentation**: See API Endpoints section above

## 📞 Support

For questions or issues:
1. Check this README
2. Review GitHub Issues
3. Check CloudWatch logs
4. Contact repository owner

---

**Built with ❤️ using AWS Serverless Architecture and React**
