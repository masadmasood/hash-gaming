import ShopPage from "@/components/pages/Shop";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  return (
    <ShopPage
      initialCategory={first(params.category)}
      initialSearch={first(params.search)}
      showCombos={first(params.combo) === "true"}
    />
  );
}