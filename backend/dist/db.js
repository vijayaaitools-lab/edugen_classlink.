"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.pool = void 0;
console.log("=== ENVIRONMENT DEBUG START ===");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("All environment variables count:", Object.keys(process.env).length);
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
console.log("DATABASE_URL type:", typeof process.env.DATABASE_URL);
if (process.env.DATABASE_URL) {
    console.log("DATABASE_URL first 30 chars:", process.env.DATABASE_URL.substring(0, 30));
    console.log("DATABASE_URL length:", process.env.DATABASE_URL.length);
}
console.log("=== ENVIRONMENT DEBUG END ===");
// Your existing code below...
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    console.error("❌ DATABASE_URL is not set!");
    throw new Error("DATABASE_URL must be set.");
}
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = __importDefault(require("pg"));
const schema = __importStar(require("./schema"));
const { Pool } = pg_1.default;
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be set.");
}
exports.pool = new Pool({ connectionString: process.env.DATABASE_URL });
exports.db = (0, node_postgres_1.drizzle)(exports.pool, { schema });
