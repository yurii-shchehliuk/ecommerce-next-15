# Receipt Email Template


Now we will create the email template using the components from React Email. Open the `email/purchase-receipt.tsx` file and add the following to the return:

```tsx
export default function PurchaseReceiptEmail({ order }: {order: Order}) {
  return (
    <Html>
      <Preview>View order receipt</Preview>
      <Tailwind>
        <Head />
        <Body className='font-sans bg-white'>
          <Container className='max-w-xl'>
            <Heading>Purchase Receipt</Heading>
            <Section>
              <Row>
                <Column>
                  <Text className='mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4'>
                    Order ID
                  </Text>
                  <Text className='mt-0 mr-4'>{order.id.toString()}</Text>
                </Column>
                <Column>
                  <Text className='mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4'>
                    Purchased On
                  </Text>
                  <Text className='mt-0 mr-4'>
                    {dateFormatter.format(order.createdAt)}
                  </Text>
                </Column>
                <Column>
                  <Text className='mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4'>
                    Price Paid
                  </Text>
                  <Text className='mt-0 mr-4'>
                    {formatCurrency(order.totalPrice)}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section className='border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4'>
              {order.orderItems.map((item) => (
                <Row key={item.productId} className='mt-8'>
                  <Column className='w-20'>
                    <Img
                      width='80'
                      alt={item.name}
                      className='rounded'
                      src={
                        item.image.startsWith('/')
                          ? `${process.env.NEXT_PUBLIC_SERVER_URL}${item.image}`
                          : item.image
                      }
                    />
                  </Column>
                  <Column className='align-top'>
                    <Text className='mx-2 my-0'>
                      {item.name} x {item.qty}
                    </Text>
                  </Column>
                  <Column align='right' className='align-top'>
                    <Text className='m-0 '>{formatCurrency(item.price)}</Text>
                  </Column>
                </Row>
              ))}
              {[
                { name: 'Items', price: order.itemsPrice },
                { name: 'Tax', price: order.taxPrice },
                { name: 'Shipping', price: order.shippingPrice },
                { name: 'Total', price: order.totalPrice },
              ].map(({ name, price }) => (
                <Row key={name} className='py-1'>
                  <Column align='right'>{name}:</Column>
                  <Column align='right' width={70} className='align-top'>
                    <Text className='m-0'>{formatCurrency(price)}</Text>
                  </Column>
                </Row>
              ))}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
```

In this template, we used the `Tailwind` component to apply Tailwind CSS classes to our email. We are also using the `Row` and `Column` components to layout our email. We are also using the `Img` component to display an image. We are also using the `formatCurrency` function to format the price.

We get the order items and map over them to display a row for each item. We are also displaying the total price of the order. For the image, we are checking if the image is a relative path or an absolute path. If it is a relative path, we are adding the `process.env.NEXT_PUBLIC_SERVER_URL` to the path.

In the next lesson, we are going to add some preview props to our email template so that we can preview it in the browser.
