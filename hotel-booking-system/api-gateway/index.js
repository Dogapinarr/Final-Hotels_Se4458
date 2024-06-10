const express = require('express');
const httpProxy = require('http-proxy');
const jwt = require('jsonwebtoken');

const apiGateway = express();
const proxy = httpProxy.createProxyServer();

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token is required');

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) return res.status(401).send('Invalid token');
    req.userId = decoded.id;
    next();
  });
};

apiGateway.all('/v1/admin/*', authenticateToken, (req, res) => {
  proxy.web(req, res, { target: 'http://hotel-admin-service:3000' });
});

apiGateway.all('/v1/search/*', (req, res) => {
  proxy.web(req, res, { target: 'http://hotel-search-service:3001' });
});

apiGateway.all('/v1/book/*', authenticateToken, (req, res) => {
  proxy.web(req, res, { target: 'http://book-hotel-service:3002' });
});

apiGateway.all('/v1/notify/*', authenticateToken, (req, res) => {
  proxy.web(req, res, { target: 'http://notification-service:3003' });
});

apiGateway.all('/v1/auth/*', (req, res) => {
  proxy.web(req, res, { target: 'http://auth-service:3005' });
});

apiGateway.listen(3004, () => {
  console.log('API Gateway running on port 3004');
});
