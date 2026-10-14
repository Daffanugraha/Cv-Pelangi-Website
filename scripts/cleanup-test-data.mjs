import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const envContent = fs.readFileSync(".env.local", "utf-8");
const env = {};
for (const line of envContent.split("\n")) {
  const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (m) env[m[1]] = m[2].trim().replace(/^['"]|['"]$/g, "");
}

const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function clean() {
  const { error: err1 } = await sb.from("job_applicants").delete().ilike("name", "%Tester%");
  const { error: err2 } = await sb.from("leads").delete().ilike("name", "%Testing QA%");
  console.log("Supabase cleanup done. Errors:", { err1, err2 });

  // Local JSON cleanup
  const applicantsPath = path.join(process.cwd(), "data", "admin", "applicants.json");
  if (fs.existsSync(applicantsPath)) {
    const list = JSON.parse(fs.readFileSync(applicantsPath, "utf-8"));
    const filtered = list.filter((a) => !a.name.includes("Tester"));
    fs.writeFileSync(applicantsPath, JSON.stringify(filtered, null, 2), "utf-8");
  }

  const leadsPath = path.join(process.cwd(), "data", "admin", "leads.json");
  if (fs.existsSync(leadsPath)) {
    const list = JSON.parse(fs.readFileSync(leadsPath, "utf-8"));
    const filtered = list.filter((l) => !l.name.includes("Testing QA"));
    fs.writeFileSync(leadsPath, JSON.stringify(filtered, null, 2), "utf-8");
  }

  console.log("All test data cleaned up successfully.");
}

clean();
