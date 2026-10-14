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

async function test() {
  console.log("Supabase URL:", env.NEXT_PUBLIC_SUPABASE_URL);

  // 1. Select
  const { data: selData, error: selErr } = await sb.from("job_applicants").select("id, name, created_at").limit(5);
  console.log("SELECT job_applicants count:", selData ? selData.length : 0, "Error:", selErr);
  if (selData) console.log("Sample rows:", selData);

  const { data: jobData, error: jobErr } = await sb.from("career_jobs").select("id, title");
  console.log("career_jobs count:", jobData ? jobData.length : 0, "Jobs:", jobData);

  // 2. Insert test
  const testItem = {
    id: "test_sb_" + Date.now(),
    job_id: null,
    job_title: "Operator Mesin Foil Test",
    name: "Test Budi",
    phone: "0812345678",
    email: "budi@test.com",
    address: "Surabaya",
    status: "new",
  };
  const { data: insData, error: insErr } = await sb.from("job_applicants").insert(testItem).select();
  console.log("INSERT job_applicants result:", { insErr, insData });

  if (!insErr) {
    const { error: delErr } = await sb.from("job_applicants").delete().eq("id", testItem.id);
    console.log("DELETE cleanup result:", { delErr });
  }

  // 3. Test leads insert
  const testLead = {
    id: "test_lead_" + Date.now(),
    name: "Test Lead Name",
    phone: "089887766",
    status: "new",
  };
  const { data: leadData, error: leadErr } = await sb.from("leads").insert(testLead).select();
  console.log("INSERT leads result:", { leadErr, leadData });
  if (!leadErr) {
    await sb.from("leads").delete().eq("id", testLead.id);
    console.log("DELETE lead cleanup done");
  }
}

test();
