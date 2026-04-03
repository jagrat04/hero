"use server";

import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function updateCharitySettings(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const percentage = parseInt(formData.get('percentage') as string);
  const charityId = formData.get('charityId') as string;

  if (percentage < 0 || percentage > 100) throw new Error("Invalid percentage");

  const { error } = await supabase
    .from('profiles')
    .update({ 
      charity_percentage: percentage,
      charity_id: charityId || null
    })
    .eq('id', userId);

  if (error) {
    console.error("Database error:", error);
    return { error: "Failed to update settings" };
  }

  // Tell Next.js to refresh the page with the new data
  revalidatePath('/dashboard/charity');
  return { success: true };
}