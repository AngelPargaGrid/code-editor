# CoreEditor

This project was generated using Angular CLI version 21.0.1.

## Environment Configuration

The application uses environment variables for configuration. A `.env.example` file is provided with default values.

### Environment Variables

- `WEBSOCKET_URL`: WebSocket server URL for real-time collaboration
- `API_BASE_URL`: Backend API base URL  
- `COMPLETION_API_URL`: API endpoint for code completion suggestions

### Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Modify the `.env` file with your specific configuration values.

3. Ensure the WebSocket server is running on the specified port.

## Development server

To start a local development server, run:

```bash
npm install
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`


## WebSocket Server

A WebSocket server is included for real-time collaboration features. To start it:

```bash
node server.js
```

The server will listen on the port specified in the `.env` file or default to port 1234.
