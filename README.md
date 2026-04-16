# AI-Refactored Playwright Tests

Assignment for Generative AI aplicada al Testing y Automatización de Software course. This project demonstrates the refactoring of legacy Playwright tests into a modern TypeScript structure using the Page Object Model pattern.

## Project Structure

```
├── legacy/                 # Original JavaScript tests (do not modify)
│   └── tests/
│       ├── authentication.spec.js
│       ├── cart.spec.js
│       ├── checkout.spec.js
│       ├── fixture.js
│       └── navigation.spec.js
├── refactored/             # Refactored TypeScript tests
│   ├── pages/              # Page Object Model classes
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   ├── CartPage.ts
│   │   ├── CheckoutPage.ts
│   │   └── index.ts
│   └── tests/              # Refactored test files
│       ├── authentication.spec.ts
│       ├── cart.spec.ts
│       ├── checkout.spec.ts
│       └── navigation.spec.ts
├── .github/workflows/      # GitHub Actions CI/CD
├── playwright.config.ts    # Playwright configuration
├── package.json            # Project dependencies
├── tsconfig.json           # TypeScript configuration
├── .eslintrc.js           # ESLint configuration
└── prompts.md             # AI prompt history and summaries
```

## Features

- **TypeScript**: Full type safety with modern JavaScript features
- **Page Object Model**: Maintainable and reusable page abstractions
- **Comprehensive Test Coverage**: Authentication, cart management, checkout, and navigation
- **CI/CD**: Automated linting and testing on GitHub Actions
- **Reporting**: Visual HTML reports and trace analysis for failures

## Setup

1. **Prerequisites**
   - Node.js 18+
   - npm

2. **Installation**
   ```bash
   npm install
   ```

3. **Install Playwright Browsers**
   ```bash
   npx playwright install
   ```

## Running Tests

### Local Execution
```bash
# Run all tests
npm test

# Run specific test file
npx playwright test refactored/tests/authentication.spec.ts

# Run with specific browser
npx playwright test --project=chromium

# Run in headed mode (visible browser)
npx playwright test --headed
```

### Test Reports
```bash
# View HTML report after test run
npx playwright show-report

# View traces for failed tests
npx playwright show-trace test-results/*/trace.zip
```

## CI/CD

The project uses GitHub Actions for continuous integration:

- **Triggers**: Push and pull requests to `develop` branch
- **Linting**: ESLint checks for code quality
- **Testing**: Runs tests across Chromium, Firefox, and WebKit
- **Reporting**: Uploads test artifacts for analysis
- **System Dependencies**: Automatically installed via `playwright install-deps` for browser support

### Why System Dependencies Matter

When running in GitHub Actions (Ubuntu environment), additional system libraries are required for browsers:
- **WebKit** requires GTK, GStreamer, and multimedia libraries
- **Firefox** requires additional graphics and codec libraries
- **Chromium** has fewer dependencies but still needs some libraries

These dependencies are pre-installed on local macOS but absent in the minimal Ubuntu container used by GitHub Actions. The CI workflow handles this automatically with `npx playwright install-deps`.

### Viewing CI Reports

1. Go to the Actions tab in your GitHub repository
2. Select the latest workflow run
3. Download artifacts from the "Artifacts" section:
   - `playwright-report`: HTML test report
   - `test-results`: Traces and screenshots for debugging

## Test Coverage

The test suite covers the following scenarios for https://www.saucedemo.com:

### Authentication
- Successful login
- Logout functionality
- Navigation after login

### Cart Management
- Add/remove items from product pages
- Add/remove items from inventory
- Cart badge updates

### Checkout Process
- Form validation (error handling)
- Complete checkout flow
- Order confirmation

### Navigation
- Cancel actions from various pages
- Proper URL transitions

## Development

### Code Quality
```bash
# Run linter
npm run lint

# Fix linting issues automatically
npm run lint:fix
```

### Adding New Tests
1. Create page methods in appropriate `Page.ts` file
2. Add test in corresponding `spec.ts` file
3. Use page objects for interactions

### Configuration
- **Base URL**: Configured for https://www.saucedemo.com
- **Browsers**: Chromium, Firefox, WebKit
- **Retries**: 2 on CI, 0 locally
- **Traces**: Captured on first retry for debugging

## Contributing

1. Create a feature branch from `develop`
2. Make changes following the established patterns
3. Ensure tests pass locally
4. Push and create a pull request
5. CI will run automated checks

## License

This project is part of an academic assignment and follows the course guidelines.
