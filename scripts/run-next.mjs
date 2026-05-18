/**
 * next komutunu her zaman bahen klasöründen çalıştırır.
 * Üst dizindeki (Users/Tuğba) package-lock.json yanlış workspace kökü seçmesin diye.
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

process.chdir(projectRoot);

const cmd = process.argv[2] ?? "dev";
const extra = process.argv.slice(3);

const result = spawnSync("npx", ["next", cmd, ...extra], {
  stdio: "inherit",
  shell: true,
  cwd: projectRoot,
  env: {
    ...process.env,
    INIT_CWD: projectRoot,
  },
});

process.exit(result.status ?? 1);
