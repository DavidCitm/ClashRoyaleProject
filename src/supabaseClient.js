import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://yrpaahgwlhuvwsvgzdau.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_D0iDnQVwzQt1_XzxDIkbmw_80jfFsMU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
