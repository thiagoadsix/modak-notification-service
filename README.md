# Notification Service

This project implements a notification service that applies rate limiting for different types of notifications, such as status updates, news, and marketing. The system is modular, with specific strategies for each type of notification, a gateway for sending messages, and a service that manages these operations.

## Challenge

The full details of the technical challenge are documented in the [challenge.md](./challenge.md) file. This document outlines the requirements, expectations, and evaluation criteria for the challenge. Be sure to read the `challenge.md` to understand the scope of the project and the design decisions made during the implementation.

## Project Structure

```plaintext
├── src
│   ├── gateways
│   │   ├── notification.gateway.test.ts
│   │   └── notification.gateway.ts
│   ├── services
│   │   ├── notification-service.impl.test.ts
│   │   ├── notification-service.impl.ts
│   │   └── notification-service.interface.ts
│   └── strategies
│       ├── marketing-rate-limit.strategy.test.ts
│       ├── marketing-rate-limit.strategy.ts
│       ├── news-rate-limit.strategy.test.ts
│       ├── news-rate-limit.strategy.ts
│       ├── rate-limit.abstract.test.ts
│       ├── rate-limit.abstract.ts
│       ├── status-rate-limit.strategy.test.ts
│       └── status-rate-limit.strategy.ts
│── index.ts
```

## Components

### 1. Gateways

#### Files:
- **notification.gateway.ts**
- **notification.gateway.test.ts**

#### Description:
The `NotificationGateway` is responsible for sending notification messages to recipients. It abstracts the specific implementation of sending, allowing the notification service to use different sending mechanisms without modifying the core code.

##### Main Functions:
- `send(userId: string, message: string): void`: Sends a message to a specific user.

##### Tests:
- Verifies that the gateway can send a message.
- Ensures the correct message is sent to the right recipient.

### 2. Services

#### Files:
- **notification-service.impl.ts**
- **notification-service.impl.test.ts**
- **notification-service.interface.ts**

#### Description:
The `NotificationServiceImpl` is the core of the system, managing the sending of notifications according to the defined rate limits. It uses different strategies to ensure that the limits are respected for each type of notification.

##### Main Functions:
- `send(type: string, userId: string, message: string): void`: Sends a notification using the appropriate strategy for the notification type, respecting the rate limits.

##### Tests:
- Verifies that a notification is sent correctly when the rate limit is not exceeded.
- Ensures notifications are blocked when the rate limit is reached.
- Confirms that the correct strategy is used for each type of notification.

### 3. Strategies

#### Files:
- **rate-limit.abstract.ts**
- **rate-limit.abstract.test.ts**
- **marketing-rate-limit.strategy.ts**
- **marketing-rate-limit.strategy.test.ts**
- **news-rate-limit.strategy.ts**
- **news-rate-limit.strategy.test.ts**
- **status-rate-limit.strategy.ts**
- **status-rate-limit.strategy.test.ts**

#### Description:
Rate limit strategies (`RateLimitStrategy`) are responsible for defining and enforcing rate limit rules for different types of notifications. The `RateLimitAbstract` class serves as a base for specific strategies, implementing common logic for checking and logging requests.

##### Strategies:
- **StatusRateLimitStrategy**: Limits status notifications to 2 per minute per recipient.
- **NewsRateLimitStrategy**: Limits news notifications to 1 per day per recipient.
- **MarketingRateLimitStrategy**: Limits marketing notifications to 3 per hour per recipient.

##### Tests:
- Each strategy has tests to verify if requests are allowed or blocked according to the configured limits.
- Tests ensure that limits are reset correctly after the configured time period.

### 4. Main File

#### File:
- **index.ts**

#### Description:
The `index.ts` file serves as the main entry point for the application. It initializes the necessary components and manages the initial configuration of the notification service.

##### Main Functions:
- Initializes `NotificationServiceImpl` with `NotificationGateway` and configures the rate limit strategies.
- Central point to trigger sending notifications of different types.

---

## How to Run Tests

To run tests and check code coverage, you can use Vitest. Follow the steps below:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Tests**:
   ```bash
   npm run test
   ```

3. **Generate Coverage Report**:
   ```bash
   npm run coverage
   ```

## Conclusion

This project demonstrates a robust implementation of a notification service with configurable rate limits for different types of messages. With a modular architecture and comprehensive tests, it ensures the flexibility and reliability needed to prevent abuse and provide a good user experience.
