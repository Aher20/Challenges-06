require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const router = require('./routes');
const cors = require('cors');
const Sentry = require('@sentry/node');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');
const file = fs.readFileSync('./api.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

const {
  SENTRY_DSN,
  ENVIRONMENT
} = process.env;

Sentry.init({
  environment: ENVIRONMENT,
  dsn: SENTRY_DSN,
  integrations: [
      new Sentry.Integrations.Http({tracing: true}),
      new Sentry.Integrations.Express({app}),
      ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],
  tracesSampleRate: 1.0,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(cors());

const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const router = require('./routes');
app.use(router);

// Sentry error handler
app.use(Sentry.Handlers.errorHandler());

// 404 
app.use((req, res, next) => {
    return res.status(404).json({
        message: '404 Not Found!'
    });
});

// 500
app.use((err, req, res, next) => {
    return res.status(500).json({
        message: err.message
    });
});

module.exports = app;