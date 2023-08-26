import { execSync } from "child_process";
import { fileURLToPath } from "url";
import path from "node:path";

try {
  execSync("npm run build", { stdio: "inherit" });
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const distPath = path.resolve(__dirname, "../dist");
  let command = "npm publish --access public";
  execSync(command, {
    stdio: "inherit",
    cwd: distPath,
  });
  console.log(`Published  Sucess`);
} catch (error) {
  // 命令执行失败，可以处理错误信息
  console.error("命令执行失败:", error);
}
