import * as dotenv from "dotenv";

dotenv.config();

const configENV = {
    mongo: {
        options: {
            socketTimeoutMS: 300000,
            maxPoolSize: 50,
            autoIndex: false,
            retryWrites: false,
        },
        url: process.env.DATABASE_URL as string,
    },
    PORT: process.env.PORT as string,
    JWT_KEY: process.env.JWT_SECRET as string,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET as string,
    GOOGLE_ID: process.env.GOOGLE_ID as string,
};

export default configENV;
