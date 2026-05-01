import PaymentVerificationPage from "@/components/pages/PaymentVerification";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  return <PaymentVerificationPage orderId={first(params.orderId)} />;
}
