# 🏢 Housing Society Receipt System

A comprehensive automated receipt generation and email notification system for housing societies. This application integrates with Google Sheets to process payments and generate professional, digitally-signed PDF receipts with beautiful email notifications.

## ✨ Features

### � Digital Security
- **Cryptographic Digital Signatures** - Each receipt is secured with HMAC SHA256 signatures
- **Tamper Detection** - Any modification to receipt data invalidates the signature
- **Unique Receipt IDs** - Time-based unique identifiers for each receipt
- **Verification System** - Built-in signature verification capability

### 📄 Professional PDF Generation
- **Modern Design** - Clean, professional layout with society branding
- **Mobile-Responsive** - Optimized for viewing on all devices
- **Detailed Information** - Comprehensive payment details and resident information
- **Digital Signature Box** - Prominent security information display
- **Professional Typography** - Proper fonts, colors, and spacing

### 📧 Beautiful Email Notifications
- **HTML Email Templates** - Rich, responsive email design
- **Personalized Content** - Dynamic content with resident and payment details
- **Professional Branding** - Society-branded email headers and footers
- **Payment Summary Cards** - Clean, organized payment information
- **Security Notices** - Digital signature information for verification
- **Mobile-Optimized** - Perfect display on mobile devices

### 🔗 Google Sheets Integration
- **Real-time Data Sync** - Direct integration with Google Sheets
- **Automatic Status Updates** - Payment status automatically updated to "ISSUED"
- **Multi-sheet Support** - Handles both payment data and resident information
- **Connection Testing** - Built-in connection verification

### ⚙️ Configuration Management
- **Environment Variables** - Secure configuration through .env files
- **Centralized Authentication** - Single authentication configuration
- **Easy Customization** - Simple society information updates
- **Production Ready** - Environment-aware settings
- 🏗️ **Modular Architecture**: Clean, maintainable code structure
## 🚀 Quick Start

### Prerequisites
- Node.js (v14.0.0 or higher)
- Google Service Account with Sheets API access
- Gmail account with App Password for email sending

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd housing-society-receipt-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Google Sheets Authentication**
   - Create a Google Service Account
   - Download the JSON key file and save as `google.json` in the root directory
   - Share your Google Sheets with the service account email

4. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   # Google Sheets Configuration
   SPREADSHEET_ID=your_spreadsheet_id
   PAYMENT_SHEET=PaymentDetail2425
   MAINTENANCE_SHEET=MaintenanceCharges2425
   
   # Email Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   EMAIL_FROM=your_email@gmail.com
   
   # Society Information
   SOCIETY_NAME=Your Housing Society
   SOCIETY_ADDRESS=Your Address
   SOCIETY_PHONE=+91 1234567890
   SOCIETY_EMAIL=society@example.com
   
   # Digital Signature Configuration
   SIGNATURE_SECRET=your_secret_signing_key
   ```

5. **Create Output Directory**
   ```bash
   mkdir outputs
   ```

### Running the Application

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

## 📁 Project Structure

```
housing-society-receipt-system/
├── src/
│   ├── app.js                 # Main application entry point
│   ├── config/
│   │   ├── auth.js           # Google Sheets authentication
│   │   ├── read.js           # Data reading functions
│   │   └── write.js          # Data writing functions
│   ├── db/
│   │   └── index.js          # Database connection testing
│   ├── services/
│   │   ├── email.js          # Email sending service
│   │   ├── emailTemplate.js  # HTML email templates
│   │   ├── pdf.js            # PDF generation service
│   │   └── receipt.js        # Main receipt processing logic
│   └── utils/
│       ├── apiError.js       # Error handling utilities
│       ├── apiResponse.js    # Response formatting utilities
│       └── signature.js      # Digital signature utilities
├── outputs/                  # Generated PDF receipts
├── google.json              # Google Service Account credentials
├── .env                     # Environment configuration
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 🔧 Configuration

### Google Sheets Setup

Your Google Sheets should have two sheets:

**PaymentDetail2425 Sheet Columns:**
- A: Date
- B: Description
- C: Payment Mode
- D: Flat Number
- E: Payment Type
- F: Amount
- G: Status (TO-ISSUE/ISSUED)

**MaintenanceCharges2425 Sheet Columns:**
- A: Flat Number
- B: Resident Name
- C: Email Address

### Email Configuration

To set up Gmail for sending emails:
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password: Google Account → Security → App passwords
3. Use the App Password in the `EMAIL_PASS` environment variable

## 🛠️ Features in Detail

### Digital Signature System
- Uses HMAC SHA256 for cryptographic signatures
- Combines flat number, amount, date, type, and mode for signature generation
- 16-character signature display for user verification
- Secret key-based signature generation for security

### PDF Receipt Design
- **Header**: Society name, address, and contact information
- **Receipt Information**: Unique receipt ID and generation date
- **Billing Details**: Two-column layout for resident and payment information
- **Payment Table**: Professional table with description, period, and amount
- **Digital Signature Section**: Secure verification information
- **Footer**: Thank you message and legal disclaimers

### Email Template Features
- **Responsive Design**: Works perfectly on mobile and desktop
- **Professional Styling**: Corporate-grade design with proper typography
- **Payment Summary Card**: Clean, organized payment information display
- **Security Information**: Digital signature details for verification
- **Branded Experience**: Society logo and consistent branding

## 📊 Usage Flow

1. **Data Input**: Add payment records to Google Sheets with status "TO-ISSUE"
2. **Application Run**: Execute the application to process pending receipts
3. **PDF Generation**: System generates professional PDF receipts with digital signatures
4. **Email Sending**: Beautiful HTML emails sent to residents with PDF attachments
5. **Status Update**: Payment status automatically updated to "ISSUED" in Google Sheets

## 🔒 Security Features

- **Environment Variable Protection**: Sensitive data stored in .env files
- **Digital Signatures**: Cryptographic protection against tampering
- **Email Validation**: Proper email format verification
- **Error Handling**: Comprehensive error management and logging
- **Connection Security**: Secure SMTP and Google API connections

## 🚀 Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in your environment
2. Use strong, unique secret keys for digital signatures
3. Enable proper logging and monitoring
4. Set up proper backup for the Google Sheets data
5. Configure email rate limiting as needed

## 📞 Support

For support and questions:
- Check the application logs for detailed error information
- Verify Google Sheets permissions and data format
- Ensure all environment variables are properly configured
- Test email configuration with simple test emails

## 🔄 Version History

- **v2.0.0**: Current version with digital signatures and beautiful email templates
- Enhanced PDF design and professional email system
- Centralized configuration and improved error handling

---

**Built with ❤️ for Housing Society Management**

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
