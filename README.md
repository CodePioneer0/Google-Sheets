# Housing Society Receipt System

An automated receipt generation system that reads payment data from Google Sheets, generates PDF receipts, and sends them via email.

## Features

- 📊 **Google Sheets Integration**: Reads payment and resident data from Google Sheets
- 📄 **PDF Receipt Generation**: Creates professional PDF receipts
- 📧 **Automated Email Delivery**: Sends receipts to residents via email
- 🔄 **Status Updates**: Automatically updates payment status in Google Sheets
- 🏗️ **Modular Architecture**: Clean, maintainable code structure
- ⚙️ **Environment Configuration**: Flexible configuration via environment variables
- 📝 **Comprehensive Logging**: Detailed logging for monitoring and debugging

## Project Structure

```
├── src/
│   ├── config/           # Configuration management
│   │   └── config.js
│   ├── models/           # Data models
│   │   └── index.js
│   ├── services/         # Business logic services
│   │   ├── GoogleSheetsService.js
│   │   ├── PDFService.js
│   │   ├── EmailService.js
│   │   └── ReceiptProcessingService.js
│   ├── utils/            # Utility functions
│   │   └── index.js
│   └── app.js            # Main application entry point
├── outputs/              # Generated PDF files
├── google.json           # Google Service Account credentials
├── .env                  # Environment variables (create from .env.example)
├── .env.example          # Environment variables template
└── package.json
```

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

3. **Set up Google Sheets API**:
   - Create a Google Cloud Project
   - Enable Google Sheets API
   - Create Service Account credentials
   - Download `google.json` and place in project root
   - Share your Google Sheet with the service account email

4. **Configure email credentials**:
   - Update email settings in `.env`
   - For Gmail, use App Passwords instead of regular password

## Usage

### Process All Pending Receipts
```bash
npm start
# or
node src/app.js
```

### Process Receipt for Specific Flat
```bash
npm run process-flat A101
# or
node src/app.js --flat A101
```

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Show Help
```bash
npm run help
# or
node src/app.js --help
```

## Configuration

Key environment variables:

- `SPREADSHEET_ID`: Your Google Sheets ID
- `EMAIL_USER`: Your email address
- `EMAIL_PASS`: Your email app password
- `SOCIETY_NAME`: Name of your housing society
- `SOCIETY_ADDRESS`: Society address for receipts

See `.env.example` for all available configuration options.

## Google Sheets Format

### PaymentDetail2425 Sheet
| Date | Amount | Payment Mode | Flat No | Payment Type | Amount | Status |
|------|--------|-------------|---------|--------------|--------|--------|
| 01/01/2024 | 5000 | UPI | A101 | Maintenance | 5000 | TO-ISSUE |

### MaintenanceCharges2425 Sheet
| Flat No | Name | Email | ... |
|---------|------|-------|-----|
| A101 | John Doe | john@example.com | ... |

## Architecture Benefits

### Before (Single File)
- ❌ Everything mixed together
- ❌ Hard to test individual components
- ❌ Difficult to maintain
- ❌ No error isolation
- ❌ Hardcoded configurations

### After (Modular Structure)
- ✅ **Separation of Concerns**: Each service has a single responsibility
- ✅ **Testability**: Individual components can be tested in isolation
- ✅ **Maintainability**: Easy to modify specific functionality
- ✅ **Configuration Management**: Environment-based configuration
- ✅ **Error Handling**: Proper error handling and logging
- ✅ **Scalability**: Easy to add new features or modify existing ones
- ✅ **Reusability**: Services can be reused in different contexts

## Key Improvements

1. **Service Layer Pattern**: Separate services for different responsibilities
2. **Data Models**: Structured data representation
3. **Configuration Management**: Environment-based configuration
4. **Error Handling**: Comprehensive error handling and recovery
5. **Logging**: Structured logging for monitoring
6. **File Organization**: Clean directory structure
7. **CLI Interface**: Command-line interface for different operations
8. **Validation**: Input validation and sanitization

## Development

To extend this system:

1. **Add new services** in `src/services/`
2. **Add new models** in `src/models/`
3. **Add utilities** in `src/utils/`
4. **Update configuration** in `src/config/`

## License

ISC
