import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import path from "path";
import session from "express-session";
import f from "session-file-store";

function loader(app: Express): void {
    const FileStore = f(session);
    const fileStore = new FileStore();

    if (process.env.NODE_ENV !== "test") {
        app.use(logger("dev"));
    }
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "public")));

    app.use(
        session({
            resave: false,
            saveUninitialized: true,
            store: fileStore,
            secret: "asdsadfjkh@#^12412523%@$^@#Q%3lkjfadf",
            cookie: { maxAge: 5000 },
        })
    );
}

export default loader;
