# Deal Countdown Component

Now, we are going to create a component that will display a deal countdown timer. It's not going to do much, but it's a nice touch to add to the homepage.

Create a new file at `components/deal-countdown.tsx` and add the following code:

```tsx
'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Static target date (replace with desired date)
const TARGET_DATE = new Date('2024-12-20T00:00:00');

// Function to calculate time remaining
const calculateTimeRemaining = (targetDate: Date) => {
  const currentTime = new Date();
  const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0);
  return {
    days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ),
    minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
  };
};

const DealCountdown = () => {
  const [time, setTime] = useState<ReturnType<typeof calculateTimeRemaining>>();

  useEffect(() => {
    // Calculate initial time remaining on the client
    setTime(calculateTimeRemaining(TARGET_DATE));

    const timerInterval = setInterval(() => {
      const newTime = calculateTimeRemaining(TARGET_DATE);
      setTime(newTime);

      // Clear when countdown is over
      if (
        newTime.days === 0 &&
        newTime.hours === 0 &&
        newTime.minutes === 0 &&
        newTime.seconds === 0
      ) {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  // Render a loading state during hydration
  if (!time) {
    return (
      <section className='grid grid-cols-1 md:grid-cols-2 my-20'>
        <div className='flex flex-col gap-2 justify-center'>
          <h3 className='text-3xl font-bold'>Loading Countdown...</h3>
        </div>
      </section>
    );
  }

  // If the countdown is over, display fallback UI
  if (
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0
  ) {
    return (
      <section className='grid grid-cols-1 md:grid-cols-2 my-20'>
        <div className='flex flex-col gap-2 justify-center'>
          <h3 className='text-3xl font-bold'>Deal Has Ended</h3>
          <p>
            This deal is no longer available. Check out our latest promotions!
          </p>
          <div className='text-center'>
            <Button asChild>
              <Link href='/search'>View Products</Link>
            </Button>
          </div>
        </div>
        <div className='flex justify-center'>
          <Image
            src='/images/promo.jpg'
            alt='promotion'
            width={300}
            height={200}
          />
        </div>
      </section>
    );
  }

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 my-20'>
      <div className='flex flex-col gap-2 justify-center'>
        <h3 className='text-3xl font-bold'>Deal Of The Month</h3>
        <p>
          Get ready for a shopping experience like never before with our Deals
          of the Month! Every purchase comes with exclusive perks and offers,
          making this month a celebration of savvy choices and amazing deals.
          Don&apos;t miss out! 🎁🛒
        </p>
        <ul className='grid grid-cols-4'>
          <StatBox label='Days' value={time.days} />
          <StatBox label='Hours' value={time.hours} />
          <StatBox label='Minutes' value={time.minutes} />
          <StatBox label='Seconds' value={time.seconds} />
        </ul>
        <div className='text-center'>
          <Button asChild>
            <Link href='/search'>View Products</Link>
          </Button>
        </div>
      </div>
      <div className='flex justify-center'>
        <Image
          src='/images/promo.jpg'
          alt='promotion'
          width={300}
          height={200}
        />
      </div>
    </section>
  );
};

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className='p-4 w-full text-center'>
    <p className='text-3xl font-bold'>{value}</p>
    <p>{label}</p>
  </li>
);

export default DealCountdown;



```

Here is a quick breakdown:

- We set a target date

- Time Calculation: The calculateTimeRemaining function computes the difference between the target date and the current time, converting the result into days, hours, minutes, and seconds.

The `timeDifference` calculates the number of miliseconds between now and the target date.

We use `Math.floor` to round to the nearest whole number. We don't want 2.8 days for example.

We convert the miliseconds into days by dividing the `timeDifference` by the number of milliseconds in a day, which we get with `(1000 * 60 * 60 * 24)`

We  get the remaining time in hours by using the modulo operator to find the remainder of miliseconds that don't fit into full days. `timeDifference % (1000 * 60 * 60 * 24)` gives the leftover milliseconds after accounting for full days. Dividing that by `(1000 * 60 * 60)` converts the remaining milliseconds into hours.

We then get the ramaining time for minutes by calculating the leftover milliseconds after accounting for full hours. `timeDifference % (1000 * 60 * 60)` gives the remaining milliseconds after removing full days and hours.
Dividing by `1000 * 60` converts these milliseconds into minutes.

We convert the remaining time for seconds by calculating the leftover milliseconds after accounting for full minutes. `timeDifference % (1000 * 60)` gives the remaining milliseconds after removing full days, hours, and minutes. Dividing by `1000` converts the milliseconds into seconds.

- Timer with useEffect: We use an interval to update the remaining time every second and stop the timer when it hits zero.

- StatBox Subcomponent: This small reusable component renders each time unit (like "Days" or "Hours") with its value.

- Render a loading state during hydration

- Return depends on if the timer is up or not.

Now import the component into `app/page.tsx` and add it to the homepage.

```tsx
import ProductPromotion from '@/components/deal-countdown';
```

Put it above or below the `IconBoxes` component.

```tsx
<DealCountdown />
```
