"use server"

import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

// Initialize Supabase admin client to securely insert data
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function submitGolfScore(formData: FormData) {
  try {
    // 1. Verify the user is securely logged in via Clerk
    const { userId } = await auth();
    
    if (!userId) {
      return { error: "You must be logged in to submit a score." };
    }

    // 2. Extract and validate the form data
    const datePlayed = formData.get('datePlayed') as string;
    const score = parseInt(formData.get('score') as string, 10);

    if (!datePlayed || isNaN(score)) {
      return { error: "Please provide both a valid date and score." };
    }

    // PRD Constraint: Stableford scores must be between 1 and 45
    if (score < 1 || score > 45) {
      return { error: "Stableford score must be between 1 and 45." };
    }

    // 3. Insert the score into Supabase
    // Note: Our Postgres Trigger will automatically handle the "Rolling 5" logic!
    const { error: dbError } = await supabase
      .from('scores')
      .insert({
        user_id: userId,
        date_played: datePlayed,
        stableford_score: score,
      });

    if (dbError) {
      console.error("Database Insert Error:", dbError);
      return { error: "Failed to save your score. Please try again." };
    }

    // 4. Tell Next.js to refresh the dashboard page to show the new score
    revalidatePath('/dashboard/scores');
    
    return { success: true };

  } catch (error) {
    console.error("Score Submission Error:", error);
    return { error: "An unexpected error occurred." };
  }
}