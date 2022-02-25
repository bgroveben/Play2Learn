const express = require('express');
const {check, validationResult} = require('express-validator');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));