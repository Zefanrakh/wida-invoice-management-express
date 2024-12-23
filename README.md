# Invoice Management Service API

## Overview
This document provides information on how to use the Invoice Management Service API. The API supports CRUD operations for managing invoices and importing data from an XLSX file.

## Prerequisites
- Node.js installed
- A running MySQL database
- Postman to test the API

## API Endpoints

### 1. Create Invoice
**POST** `/api/invoices`

#### Request Body
```json
{
    "invoiceNumber": 30,
    "date": "1/6/2021",
    "customerName": "Zefan",
    "salespersonName": "Hazel",
    "paymentType": "CREDIT",
    "products": [{
        "itemName": "Bluetooth speaker",
        "quantity": 4,
        "totalCogs": 840000,
        "totalPrice": 1008000
  }]
}
```

#### Response
```json
{
    "success": true,
    "data": {
        "id": 50,
        "invoiceNumber": 30,
        "date": "2021-01-05T17:00:00.000Z",
        "customerName": "Zefan",
        "salespersonName": "Hazel",
        "paymentType": "CREDIT",
        "updatedAt": "2024-12-23T09:47:00.496Z",
        "createdAt": "2024-12-23T09:47:00.496Z"
  }
}
```

### 2. Get All Invoices
**GET** `/api/invoices`

#### Query Parameters
- `date` (optional): Filter invoices by date
- `size` (optional): Number of records per page (default: 10)
- `page` (optional): Page number (default: 1)

#### Response
```json
{
    "success": true,
    "data": {
        "count": 5,
        "rows": [
            {
                "id": 25,
                "invoiceNumber": "1",
                "date": "1970-01-01T00:00:44.000Z",
                "customerName": "John",
                "salespersonName": "Doe",
                "paymentType": "CASH",
                "notes": "Lorem ipsum",
                "createdAt": "2024-12-23T09:12:11.000Z",
                "updatedAt": "2024-12-23T09:12:11.000Z",
                "products": [
                    {
                        "id": 37,
                        "itemName": "Bluetooth speaker",
                        "quantity": 3,
                        "totalCogs": 630000,
                        "totalPrice": 756000,
                        "createdAt": "2024-12-23T09:12:11.000Z",
                        "updatedAt": "2024-12-23T09:12:11.000Z",
                        "invoiceId": 25
                    },
                    {
                        "id": 38,
                        "itemName": "Headphone",
                        "quantity": 8,
                        "totalCogs": 400000,
                        "totalPrice": 480000,
                        "createdAt": "2024-12-23T09:12:11.000Z",
                        "updatedAt": "2024-12-23T09:12:11.000Z",
                        "invoiceId": 25
                    }
                ]
            },
            {
                "id": 26,
                "invoiceNumber": "2",
                "date": "1970-01-01T00:00:44.000Z",
                "customerName": "John",
                "salespersonName": "Doe",
                "paymentType": "CASH",
                "notes": "Lorem ipsum",
                "createdAt": "2024-12-23T09:12:11.000Z",
                "updatedAt": "2024-12-23T09:12:11.000Z",
                "products": [
                    {
                        "id": 39,
                        "itemName": "Laptop charger",
                        "quantity": 4,
                        "totalCogs": 800000,
                        "totalPrice": 960000,
                        "createdAt": "2024-12-23T09:12:12.000Z",
                        "updatedAt": "2024-12-23T09:12:12.000Z",
                        "invoiceId": 26
                    }
                ]
            },
            {
                "id": 27,
                "invoiceNumber": "3",
                "date": "1970-01-01T00:00:44.000Z",
                "customerName": "Jane",
                "salespersonName": "Doe",
                "paymentType": "CREDIT",
                "notes": "Lorem ipsum",
                "createdAt": "2024-12-23T09:12:12.000Z",
                "updatedAt": "2024-12-23T09:12:12.000Z",
                "products": [
                    {
                        "id": 40,
                        "itemName": "LCD Monitor",
                        "quantity": 1,
                        "totalCogs": 500000,
                        "totalPrice": 600000,
                        "createdAt": "2024-12-23T09:12:12.000Z",
                        "updatedAt": "2024-12-23T09:12:12.000Z",
                        "invoiceId": 27
                    },
                    {
                        "id": 41,
                        "itemName": "Bluetooth speaker",
                        "quantity": 1,
                        "totalCogs": 210000,
                        "totalPrice": 252000,
                        "createdAt": "2024-12-23T09:12:12.000Z",
                        "updatedAt": "2024-12-23T09:12:12.000Z",
                        "invoiceId": 27
                    }
                ]
            },
            {
                "id": 45,
                "invoiceNumber": "10",
                "date": "2021-01-05T17:00:00.000Z",
                "customerName": "Zefan",
                "salespersonName": "Jessie",
                "paymentType": "CREDIT",
                "notes": null,
                "createdAt": "2024-12-23T09:24:22.000Z",
                "updatedAt": "2024-12-23T09:32:30.000Z",
                "products": [
                    {
                        "id": 43,
                        "itemName": "Bluetooth speaker",
                        "quantity": 4,
                        "totalCogs": 840000,
                        "totalPrice": 1008000,
                        "createdAt": "2024-12-23T09:27:38.000Z",
                        "updatedAt": "2024-12-23T09:27:38.000Z",
                        "invoiceId": 45
                    }
                ]
            },
            {
                "id": 50,
                "invoiceNumber": "30",
                "date": "2021-01-05T17:00:00.000Z",
                "customerName": "Zefan",
                "salespersonName": "Hazel",
                "paymentType": "CREDIT",
                "notes": null,
                "createdAt": "2024-12-23T09:47:00.000Z",
                "updatedAt": "2024-12-23T09:47:00.000Z",
                "products": [
                    {
                        "id": 44,
                        "itemName": "Bluetooth speaker",
                        "quantity": 4,
                        "totalCogs": 840000,
                        "totalPrice": 1008000,
                        "createdAt": "2024-12-23T09:47:00.000Z",
                        "updatedAt": "2024-12-23T09:47:00.000Z",
                        "invoiceId": 50
                    }
                ]
            }
        ]
    }
}
```

### 3. Update Invoice
**PUT** `/api/invoices/:id`

#### Request Body
```json
{
	"salespersonName": "Jessie"
}
```

#### Response
```json
{
  "success": true
}
```

### 4. Delete Invoice
**DELETE** `/api/invoices/:id`

#### Response
```json
{
  "success": true
}
```

### 5. Upload Invoice
**POST** `/api/invoices/upload`

#### Request
- Body: Multipart/form-data with a file field named `file`

#### Response
```json
{
    "success": true,
    "message": "File processed successfully.",
    "validInvoices": [
      1,
      2,
      3
    ],
    "errorInvoices": [
        {
            "invoiceNumber": 4,
            "error": "Invalid payment type. Must be either CASH or CREDIT."
        },
        {
            "invoiceNumber": 5,
            "error": "Required fields are missing. {\"invoice no\":5,\"date\":44200,\"customer\":\"Frank\",\"salesperson\":null,\"payment type\":\"CASH\",\"notes\":\"Lorem ipsum\",\"missingFields\":[\"salesperson\"]}"
        },
        {
            "invoiceNumber": 2,
            "error": "Invoice number already exists"
        },
        {
            "invoiceNumber": 6,
            "error": "Invalid product data: [{\"Invoice no\":6,\"item\":\"Headphone\",\"quantity\":2,\"total cogs\":null,\"total price\":120000,\"missingFields\":[\"total cogs\"]}]"
        }
    ]
}
```

### 6. Get One Invoice
**GET** `/api/invoices/:id`

#### Response
```json
{
    "success": true,
    "data": {
        "id": 45,
        "invoiceNumber": "10",
        "date": "2021-01-05T17:00:00.000Z",
        "customerName": "Zefan",
        "salespersonName": "Jessie",
        "paymentType": "CREDIT",
        "notes": null,
        "createdAt": "2024-12-23T09:24:22.000Z",
        "updatedAt": "2024-12-23T09:32:30.000Z",
        "products": [
            {
                "id": 43,
                "itemName": "Bluetooth speaker",
                "quantity": 4,
                "totalCogs": 840000,
                "totalPrice": 1008000,
                "createdAt": "2024-12-23T09:27:38.000Z",
                "updatedAt": "2024-12-23T09:27:38.000Z",
                "invoiceId": 45
            }
        ]
    }
}
```

## Postman Collection
Exported Postman collection is available in v2.1 JSON format below:

```json
{
	"info": {
		"_postman_id": "1836010b-69e3-49f7-88de-b83f6f1d673c",
		"name": "Invoice Management Service",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "39924110",
		"_collection_link": "https://www.postman.com/maintenance-engineer-54783269/workspace/wida-invoice-management/collection/39924110-1836010b-69e3-49f7-88de-b83f6f1d673c?action=share&source=collection_link&creator=39924110"
	},
	"item": [
		{
			"name": "Upload Invoice",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "file",
							"type": "file",
							"src": "postman-cloud:///1efc10c9-66a1-4e40-86f1-0c09e5631a92"
						}
					]
				},
				"url": {
					"raw": "{{baseUrl}}/api/invoices/upload",
					"host": [
						"{{baseUrl}}"
					],
					"path": [
						"api",
						"invoices",
						"upload"
					]
				}
			},
			"response": []
		},
		{
			"name": "Get One Invoice",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "{{baseUrl}}/api/invoices/45",
					"host": [
						"{{baseUrl}}"
					],
					"path": [
						"api",
						"invoices",
						"45"
					]
				}
			},
			"response": []
		},
		{
			"name": "Get All Invoices",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "{{baseUrl}}/api/invoices/",
					"host": [
						"{{baseUrl}}"
					],
					"path": [
						"api",
						"invoices",
						""
					]
				}
			},
			"response": []
		},
		{
			"name": "Create Invoice",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\n    \"invoiceNumber\": 30,\n\t\t\"date\": \"1/6/2021\",\n\t\t\"customerName\": \"Zefan\",\n\t\t\"salespersonName\": \"Hazel\",\n\t\t\"paymentType\": \"CREDIT\",\n\t\t\"products\": [{\n\t\t\t\"itemName\": \"Bluetooth speaker\",\n\t\t\t\"quantity\": 4,\n\t\t\t\"totalCogs\": 840000,\n\t\t\t\"totalPrice\": 1008000\n\t\t}]\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{baseUrl}}/api/invoices/",
					"host": [
						"{{baseUrl}}"
					],
					"path": [
						"api",
						"invoices",
						""
					]
				}
			},
			"response": []
		},
		{
			"name": "Update Invoice",
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"salespersonName\": \"Jessie\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{baseUrl}}/api/invoices/45",
					"host": [
						"{{baseUrl}}"
					],
					"path": [
						"api",
						"invoices",
						"45"
					]
				}
			},
			"response": []
		},
		{
			"name": "Delete Invoice",
			"request": {
				"method": "DELETE",
				"header": [],
				"url": {
					"raw": "{{baseUrl}}/api/invoices/45",
					"host": [
						"{{baseUrl}}"
					],
					"path": [
						"api",
						"invoices",
						"45"
					]
				}
			},
			"response": []
		}
	]
}
```

