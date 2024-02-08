'use server'

import { redirect } from 'next/navigation';
import { saveMeal } from "./meals"
import { revalidatePath } from 'next/cache';

function isInvalidtext(text) {
  return !text || text.trim() === ''
}

export async function shareMeal(prevState, formData) {

    const meal = {
      title: formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      image: formData.get('image'),
      creator: formData.get('name'),
      creator_email: formData.get('email'),
    }

    if (
      isInvalidtext(meal.title) ||
      isInvalidtext(meal.summary) ||
      isInvalidtext(meal.instructions) ||
      isInvalidtext(meal.creator) ||
      isInvalidtext(meal.creator_email) ||
      !meal.creator_email.includes('@') ||
      !meal.image ||
      meal.image.size === 0
      ) {
        return {
          message: 'Invalid Input'
        }
    }
    await saveMeal(meal)
    revalidatePath('/meals')
    redirect('/meals');
}