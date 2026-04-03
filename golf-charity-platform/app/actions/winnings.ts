"use server"; // CRITICAL: This must be the very first line

import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function uploadWinningProof(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const file = formData.get('file') as File;
  const winningId = formData.get('winningId') as string;

  if (!file || !winningId) {
    return { error: "Missing file or winning record ID" };
  }

  // 1. Generate a unique file path for Supabase Storage
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${winningId}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `proofs/${fileName}`;

  // 2. Upload to the 'winning-proofs' bucket
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('winning-proofs')
    .upload(filePath, file);

  if (uploadError) {
    console.error("Storage Error:", uploadError);
    return { error: "Failed to upload to storage" };
  }

  // 3. Grab the Public URL
  const { data: { publicUrl } } = supabase.storage
    .from('winning-proofs')
    .getPublicUrl(filePath);

  // 4. Update the 'winnings' table in your DB
  const { error: dbError } = await supabase
    .from('winnings')
    .update({ 
      proof_image_url: publicUrl,
      // status stays 'pending_proof' by default per your request
    })
    .eq('id', winningId)
    .eq('user_id', userId);

  if (dbError) {
    console.error("Database Update Error:", dbError);
    return { error: "Failed to update record" };
  }

  // 5. Refresh the page so the "Action Required" box vanishes
  revalidatePath('/dashboard/winnings');
  
  return { success: true };
}

export async function reviewWinning(winningId: string, status: 'paid' | 'rejected') {
  // Use the service role key for admin overrides
  const { error } = await supabase
    .from('winnings')
    .update({ 
      status: status,
      // If rejected, we might want to clear the proof URL so they can try again
      proof_image_url: status === 'rejected' ? null : undefined 
    })
    .eq('id', winningId);

  if (error) throw new Error(error.message);

  revalidatePath('/admin/winners');
  revalidatePath('/dashboard/winnings');
  return { success: true };
}