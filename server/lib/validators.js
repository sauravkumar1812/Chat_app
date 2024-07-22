import {body} from 'express-validator';

const registerValidator = () => [body(["name", "username", "password","bio"]).notEmpty(),];


export  { registerValidator }