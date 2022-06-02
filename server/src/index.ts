import 'dotenv/config';
import express from 'express';
import 'reflect-metadata';
import mongooseConnect from './config/database';

mongooseConnect();

const app = express();
