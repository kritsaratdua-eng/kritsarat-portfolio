import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xdeedurvamsonavclpel.supabase.co";
const supabaseAnonKey = "sb_publishable_NIZjuyYM2nnNVkd-lYllYw_V76-JEEp";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
