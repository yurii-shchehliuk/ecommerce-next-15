# Create Update Review Action

Now that we have our form dialog, we need an action to submit the form to. Create a new file at `lib/actions/review.actions.ts` and add the following imports:

```ts
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { auth } from '@/auth';
import { formatError } from '../utils';
import { insertReviewSchema } from '../validator';
import { prisma } from '@/db/prisma';
```

Now add the following action:

```ts
// Create & Update Review
export async function createUpdateReview(
  data: z.infer<typeof insertReviewSchema>
) {
  try {
    const session = await auth();
    if (!session) throw new Error('User is not authenticated');

    // Validate and store review data and userId
    const review = insertReviewSchema.parse({
      ...data,
      userId: session?.user.id,
    });

    // Get the product being reviewed
    const product = await prisma.product.findFirst({
      where: { id: review.productId },
    });

    if (!product) throw new Error('Product not found');

    // Check if user has already reviewed this product
    const reviewExists = await prisma.review.findFirst({
      where: {
        productId: review.productId,
        userId: review.userId,
      },
    });

    // If review exists, update it, otherwise create a new one
    await prisma.$transaction(async (tx) => {
      if (reviewExists) {
        // Update the review
        await tx.review.update({
          where: { id: reviewExists.id },
          data: {
            description: review.description,
            title: review.title,
            rating: review.rating,
          },
        });
      } else {
        // Create a new review
        await tx.review.create({ data: review });
      }

      // Get the average rating
      const averageRating = await tx.review.aggregate({
        _avg: { rating: true },
        where: { productId: review.productId },
      });

      // Get the number of reviews
      const numReviews = await tx.review.count({
        where: { productId: review.productId },
      });

      // Update rating and  number of reviews
      await tx.product.update({
        where: { id: review.productId },
        data: {
          rating: averageRating._avg.rating || 0,
          numReviews: numReviews,
        },
      });
    });

    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: 'Review updated successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
```

This is quite a bit of code, but it's very straightforward. We first validate the data using the `insertReviewSchema` and then check if the user has already reviewed the product. If they have, we update the review, otherwise we create a new one. We then get the average rating and number of reviews for the product and update the product's rating and number of reviews.

In the next lesson, we will connect our form to this action.
