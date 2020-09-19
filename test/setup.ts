import * as path from "path";
import * as dotenv from "dotenv";

export default function (): void {
  dotenv.config({ path: path.resolve(__dirname, path.join("..", ".env")) });
}
