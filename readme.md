# Wallet System

Welcome to Wallet System API! 

##
This is a simple guide to help you get started.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

1. **Node.js:** Download and install Node.js from [nodejs.org](https://nodejs.org/).
2. **MongoDB:** Install MongoDB by following the instructions on [mongodb.com](https://www.mongodb.com/try/download/community).


Before you can run the app, you need to install its dependencies. Open a terminal and navigate to the project directory, then run:
## Run Locally

Clone the project

```bash
  git clone https://github.com/Arun-kavale/wallet-system-api
```

Go to the project directory

```bash
  cd wallet-system-api

```

Install dependencies

```bash
  npm install
```

### Environmental Variables
Set up the following environmental variables before running the application. You can use a tool like .env or set them directly in your deployment environment.

Create a file named .env in the root of your project and add the following variables:

### MongoDB Connection URI
- `DB_HOST` // DB host URI
- `DB_NAME` // DataBase Name
- `DB_PASSWORD` // DB Password
- `DB_USER_NAME` // DB User Name

### Port for the Node.js server
`PORT`=3000
##
Start the server

```bash
  npm run start
```

Below is the list of API's which are added in this APP

##
### Wallet Setup API

**Endpoint:**
```http
POST localhost:3000/api/v1/wallet/setup
```
Description:
This API is used to set up a new wallet. It internally adds data to the Wallet collection and creates a transaction for the wallet.

**Request body:**

```json
{
    "balance": 1000,
    "name": "Wallet 2"
}
```
**Response:**
Status: 200 OK

```json
{
    "_id": "65d1e186c1eaff747856958f",
    "name": "Wallet 2",
    "balance": 1000,
    "transactionId": "65d1e188c1eaff7478569592",
    "date": "2024-02-18T10:52:56.281Z"
}
```
Internals:
- This API adds the provided data to the Wallet collection.
- It also creates a transaction associated with the newly created wallet.

##
### Get Wallet By WalletId

**Endpoint:**
```http
GET localhost:3000/api/v1/wallet/:walletId
```
Description:
This API retrieves the details of an added wallet using its ID.


***Request:***

- **Method:** GET
- **Endpoint:** /api/v1/wallet/:walletId
- **Parameters:** walletId (Path Parameter): ID of the wallet to retrieve.

**Response:**
Status: 200 OK

```json
{
    "_id": "65d1e186c1eaff747856958f",
    "name": "Wallet 2",
    "balance": 1000,
    "transactionId": "65d1e188c1eaff7478569592",
    "date": "2024-02-18T10:52:56.281Z"
}
```

##
### Add Transaction in to Wallet

**Endpoint:**
```http
POST localhost:3000/api/v1/transact/:walletId
```
Description:
This API is used to add a trasaction in wallet. It internally adds the trasaction new trasaction collection and update the wallet balance

***Request:***

- **Method:** POST
- **Endpoint:** /api/v1/transact/:walletId
- **Parameters:** walletId (Path Parameter): ID of the wallet to add transaction in.

**Request body:**

```json
{
    "amount": 500.0101,
    "desc":"Adding a 500 Rupee to my Testing wallet"
}
```
**Response:**
Status: 200 OK

```json
{
    "_id": "65d1e5eec1eaff7478569595",
    "amount": 500.0101,
    "walletId": "65d0488ef0cb7d7c0439054c",
    "type": "CREDIT",
    "balance": 254275.1111,
    "date": "2024-02-18T11:11:42.814Z",
    "updatedAt": "2024-02-18T11:11:42.814Z",
    "__v": 0
}
```


##
### Get wallet Transactions

**Endpoint:**
```http
POST GET localhost:3000/api/v1/transaction?walletId=65d175459f0e440034007f7c&skip=0&limit=5&order=asc&sortBy=date

```
Description:
This API is used to a transactions with the help of walletID, 


**Request:**
- **Method:** `GET`
- **Endpoint:** `/api/v1/transaction`
- **Query Parameters:**
  - `walletId` (required): ID of the wallet to retrieve transactions for.
  - `skip` (optional): Number of records to skip for pagination (default: 0).
  - `limit` (optional): Number of records to return (default: 5).
  - `order` (optional): Sorting order (`1` or `-1`, default: `1`).
  - `sortBy` (optional): Sorting field (e.g., `date`, default: `date`).

**Example Request:**
```http
GET localhost:3000/api/v1/transaction?walletId=65d175459f0e440034007f7c&skip=0&limit=5&order=asc&sortBy=date

```
**Response:**
Status: 200 OK

```json
{
    "transactions": [
        {
            "_id": "65d01e602b53804900adc8bf",
            "amount": 500.0101,
            "walletId": "65d01e3a2b53804900adc8b1",
            "type": "CREDIT",
            "balance": 2000.2747,
            "date": "2024-02-17T02:48:00.933Z",
            "updatedAt": "2024-02-17T02:48:00.933Z",
            "__v": 0
        },
        {
            "_id": "65d01e662b53804900adc8c3",
            "amount": -500.0101,
            "walletId": "65d01e3a2b53804900adc8b1",
            "type": "DEBIT",
            "balance": 1500.2646,
            "date": "2024-02-17T02:48:06.195Z",
            "updatedAt": "2024-02-17T02:48:06.195Z",
            "__v": 0
        }
    ],
    "totalNumber": 7,
    "totalPages": 2
}
```

- **transactions:** An array containing individual transaction objects. Each object represents a transaction and includes details such as transaction ID (_id), transaction amount (amount), associated wallet ID (walletId), transaction type (type - either "CREDIT" or "DEBIT"), updated wallet balance (balance), transaction date (date), and timestamps (updatedAt).

- **totalNumber:** An integer representing the total number of available transactions. In this case, there are a total of 7 transactions.

- **totalPages:** An integer indicating the total number of pages available based on pagination. In this case, there are 2 pages of transactions.

