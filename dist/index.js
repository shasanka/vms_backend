"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth/auth"));
const testRoute_1 = __importDefault(require("./routes/private/testRoute"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./controller/db"));
const role_1 = __importDefault(require("./models/role"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
async function startServer() {
    try {
        await (0, db_1.default)();
        await initial();
        app.use('/api/v1/auth', auth_1.default);
        app.use('/api/v1/test', testRoute_1.default);
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error('Error starting the server:', error);
    }
}
async function initial() {
    try {
        const documentCount = await role_1.default.estimatedDocumentCount();
        if (documentCount === 0) {
            await role_1.default.create({ name: 'user' });
            await role_1.default.create({ name: 'admin' });
            await role_1.default.create({ name: 'moderator' });
        }
    }
    catch (error) {
        console.error('Error initializing roles:', error);
        throw new Error('Error initializing roles');
    }
}
startServer();
