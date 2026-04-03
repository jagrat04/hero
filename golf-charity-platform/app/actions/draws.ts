"use server";

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Divine access
);

export async function runMonthlyDraw(targetMonth: string) {
  // 1. Calculate the Pool
  const { count: activeUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('subscription_status', 'active');

  const userCount = activeUsers || 0;
  const totalPool = (userCount * 10) * 0.40; // 40% to winner

  // 2. Fetch all scores for the target month
  const startDate = `${targetMonth}-01`;
  const endDate = new Date(new Date(startDate).getFullYear(), new Date(startDate).getMonth() + 1, 0).toISOString().split('T')[0];

  const { data: monthScores } = await supabase
    .from('scores')
    .select('user_id, stableford_score')
    .gte('date_played', startDate)
    .lte('date_played', endDate);

  if (!monthScores || monthScores.length === 0) {
    return { error: "No scores found for this period." };
  }

  // 3. THE ALGORITHM: Weighted Random Selection
  let ticketPool: string[] = [];
  monthScores.forEach(entry => {
    // A score of 35 adds the user_id 35 times to the "hat"
    for (let i = 0; i < entry.stableford_score; i++) {
      ticketPool.push(entry.user_id);
    }
  });

  const winnerId = ticketPool[Math.floor(Math.random() * ticketPool.length)];

  // 4. Update Database
  // Create the Draw record
  const { data: drawRecord, error: drawError } = await supabase
    .from('draws')
    .insert({
      target_month: startDate,
      total_pool: totalPool,
      status: 'published'
    })
    .select()
    .single();

  if (drawError) return { error: "Failed to create draw record" };

  // Create the Winning record for the user
  const { error: winError } = await supabase
    .from('winnings')
    .insert({
      user_id: winnerId,
      draw_id: drawRecord.id,
      prize_amount: totalPool,
      status: 'pending_proof' // This triggers the card on the user's dashboard!
    });

  if (winError) return { error: "Failed to assign winner" };

  revalidatePath('/dashboard/winnings');
  revalidatePath('/admin/draws');
  
  return { success: true, winnerId, pool: totalPool };
}