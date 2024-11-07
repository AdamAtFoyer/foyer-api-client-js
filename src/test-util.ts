import { FoyerApiClient } from "./api-client";
import dotenv from "dotenv";
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.secrets') })

export const TEST_URL = process.env.FOYER_JS_TEST_URL;
export const TEST_KEY = process.env.FOYER_JS_TEST_KEY;
export const TEST_EMAIL = process.env.FOYER_JS_TEST_EMAIL ?? 'test@usefoyer.com';

export const TEST_CLIENT = new FoyerApiClient({ url: TEST_URL, key: TEST_KEY as string, });