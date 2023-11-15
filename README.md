# OpenPix NestJS Library

## Overview

Welcome to the OpenPix NestJS Library! This library is designed to seamlessly integrate OpenPix functionalities into
your NestJS applications, providing a powerful and flexible solution for handling payments and managing financial
transactions.

## Features

- **Payment Processing**: Easily handle online payments with OpenPix integration.
- **Transaction Management**: Keep track of financial transactions and their status.
- **Webhook Support**: Receive real-time updates on payment events using webhooks.
- **Customization**: Configure the library to suit your application's specific needs.

## Installation

To install the OpenPix NestJS Library, use the following command:

```bash
npm install openpix-nestjs
```

## Usage

1. Import the module into your NestJS application:

   ```typescript
   import { OpenPixModule } from 'openpix-nestjs';

   @Module({
     imports: [OpenPixModule.register({
       appID: 'YOUR_OPENPIX_APP_ID',
       version: 'OPENPIX_VERSION',
       // Add additional configuration options as needed
     })],
   })
   export class AppModule {}
   ```

**NOTE:** The `version` property is optional and defaults to `v1`.