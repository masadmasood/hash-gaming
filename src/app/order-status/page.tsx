import OrderStatusPage from "@/components/pages/OrderStatus";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  return (
    <OrderStatusPage
      orderId={first(params.orderId)}
      payment={first(params.payment)}
      total={first(params.total)}
    />
  );
}
