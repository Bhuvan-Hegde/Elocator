import { supabase } from "./supabaseClient";

export async function addRecycleEvent({ user_id, name, location, facility, price, pickup_date, pickup_time, phone }: {
  user_id: string,
  name: string,
  location: string,
  facility: string,
  price: number,
  pickup_date: string,
  pickup_time: string,
  phone: string
}) {
  const { data, error } = await supabase
    .from("recycles")
    .insert([
      { user_id, name, location, facility, price, pickup_date, pickup_time, phone }
    ]);
  return { data, error };
}

export async function getRecycleEvents(user_id: string) {
  const { data, error } = await supabase
    .from("recycles")
    .select("id, name, location, facility, price, pickup_date, pickup_time, phone")
    .eq("user_id", user_id)
    .order("pickup_date", { ascending: false });
  return { data, error };
}
