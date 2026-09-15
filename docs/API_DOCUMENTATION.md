# NexoraProject - API Documentation

Welcome to the official REST API reference for **NexoraProject**. This service enables searching, managing, and analyzing web clients in the healthcare sector within Vasai.

## Base URL
```
http://localhost:5000
```

## Authentication & Headers
All requests returning or sending JSON payload must supply standard Content-Type headers:
```http
Content-Type: application/json
Accept: application/json
```

---

## Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | System health and database connection status |
| `GET` | `/api/nexoraproject` | Query and filter healthcare client records in Vasai |
| `POST` | `/api/nexoraproject` | Create a new healthcare client record |
| `GET` | `/api/nexoraproject/:id` | Fetch specific healthcare client details by ID |
| `PATCH` | `/api/nexoraproject/:id` | Partially update a client record |
| `DELETE` | `/api/nexoraproject/:id` | Delete a client record from the database |

---

## Endpoint Details

### 1. Health Check
Checks service availability and operational readiness.

* **HTTP Method**: `GET`
* **Path**: `/health`
* **Headers**: None required

#### Response (200 OK)
```json
{
  "status": "UP",
  "timestamp": "2023-10-24T12:00:00.000Z",
  "service": "NexoraProject API",
  "database": "connected"
}
```

#### cURL Example
```bash
curl -X GET http://localhost:5000/health
```

---

### 2. List Client Records
Retrieves healthcare website clients in Vasai with optional query filtering.

* **HTTP Method**: `GET`
* **Path**: `/api/nexoraproject`
* **Query Parameters**:
  * `locality` *(string, optional)*: Filter by sub-region (e.g., `Vasai West`, `Vasai East`).
  * `category` *(string, optional)*: Type of organization (`clinic`, `hospital`, `diagnostic_center`, `dental`).
  * `hasWebsite` *(boolean, optional)*: Filter by existing website presence (`true`/`false`).
  * `page` *(integer, default: 1)*: Page number.
  * `limit` *(integer, default: 10)*: Page size.

#### Response (200 OK)
```json
{
  "success": true,
  "total": 1,
  "page": 1,
  "limit": 10,
  "data": [
    {
      "id": "c9f8a3b2-7d1e-4f6a-9a8b-1c2d3e4f5a6b",
      "name": "Vasai Metro General Hospital",
      "category": "hospital",
      "locality": "Vasai West",
      "contactEmail": "info@vasaimetrohospital.com",
      "phoneNumber": "+919823001122",
      "websiteUrl": "https://vasaimetrohospital.com",
      "leadStatus": "CONTACTED",
      "createdAt": "2023-10-24T08:30:00.000Z"
    }
  ]
}
```

#### cURL Example
```bash
curl -X GET "http://localhost:5000/api/nexoraproject?locality=Vasai%20West&category=hospital"
```

---

### 3. Create Record
Adds a new healthcare client entry to the database.

* **HTTP Method**: `POST`
* **Path**: `/api/nexoraproject`
* **Request Body Schema**:
```json
{
  "name": "string (required)",
  "category": "hospital | clinic | diagnostic_center | dental (required)",
  "locality": "string (required)",
  "contactEmail": "string (email format, optional)",
  "phoneNumber": "string (optional)",
  "websiteUrl": "string (url format, optional)",
  "leadStatus": "NEW | CONTACTED | AUDITED | PROPOSED | WON | LOST (optional)"
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "message": "Healthcare client created successfully",
  "data": {
    "id": "d1e2f3a4-5b6c-7d8e-9f0a-1b2c3d4e5f6a",
    "name": "Sunray Diagnostic Center",
    "category": "diagnostic_center",
    "locality": "Vasai East",
    "contactEmail": "contact@sunraydiag.in",
    "phoneNumber": "+919876543210",
    "websiteUrl": null,
    "leadStatus": "NEW",
    "createdAt": "2023-10-24T12:15:00.000Z"
  }
}
```

#### Error Response (400 Bad Request)
```json
{
  "success": false,
  "error": "Validation Error",
  "details": [
    "Field 'name' is required",
    "Field 'category' must be a valid healthcare domain category"
  ]
}
```

#### cURL Example
```bash
curl -X POST http://localhost:5000/api/nexoraproject \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sunray Diagnostic Center",
    "category": "diagnostic_center",
    "locality": "Vasai East",
    "contactEmail": "contact@sunraydiag.in",
    "phoneNumber": "+919876543210"
  }'
```

---

### 4. Get Record
Fetch single client record details using unique UUID identifier.

* **HTTP Method**: `GET`
* **Path**: `/api/nexoraproject/:id`

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "c9f8a3b2-7d1e-4f6a-9a8b-1c2d3e4f5a6b",
    "name": "Vasai Metro General Hospital",
    "category": "hospital",
    "locality": "Vasai West",
    "contactEmail": "info@vasaimetrohospital.com",
    "phoneNumber": "+919823001122",
    "websiteUrl": "https://vasaimetrohospital.com",
    "leadStatus": "CONTACTED",
    "createdAt": "2023-10-24T08:30:00.000Z",
    "updatedAt": "2023-10-24T10:00:00.000Z"
  }
}
```

#### Error Response (404 Not Found)
```json
{
  "success": false,
  "error": "Record with ID 'c9f8a3b2-7d1e-4f6a-9a8b-1c2d3e4f5a6b' was not found."
}
```

#### cURL Example
```bash
curl -X GET http://localhost:5000/api/nexoraproject/c9f8a3b2-7d1e-4f6a-9a8b-1c2d3e4f5a6b
```

---

### 5. Update Record
Partially update attributes of an existing healthcare client record.

* **HTTP Method**: `PATCH`
* **Path**: `/api/nexoraproject/:id`
* **Request Body Schema** (partial fields allowed):
```json
{
  "websiteUrl": "string (url format)",
  "leadStatus": "string",
  "contactEmail": "string"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Client record updated successfully",
  "data": {
    "id": "c9f8a3b2-7d1e-4f6a-9a8b-1c2d3e4f5a6b",
    "name": "Vasai Metro General Hospital",
    "category": "hospital",
    "locality": "Vasai West",
    "contactEmail": "info@vasaimetrohospital.com",
    "phoneNumber": "+919823001122",
    "websiteUrl": "https://new-vasaimetrohospital.com",
    "leadStatus": "PROPOSED",
    "updatedAt": "2023-10-24T14:22:00.000Z"
  }
}
```

#### cURL Example
```bash
curl -X PATCH http://localhost:5000/api/nexoraproject/c9f8a3b2-7d1e-4f6a-9a8b-1c2d3e4f5a6b \
  -H "Content-Type: application/json" \
  -d '{
    "websiteUrl": "https://new-vasaimetrohospital.com",
    "leadStatus": "PROPOSED"
  }'
```

---

### 6. Remove Record
Deletes a healthcare client entry from the system.

* **HTTP Method**: `DELETE`
* **Path**: `/api/nexoraproject/:id`

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Record 'c9f8a3b2-7d1e-4f6a-9a8b-1c2d3e4f5a6b' removed successfully"
}
```

#### cURL Example
```bash
curl -X DELETE http://localhost:5000/api/nexoraproject/c9f8a3b2-7d1e-4f6a-9a8b-1c2d3e4f5a6b
```
