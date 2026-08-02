import MaterialPage from "@/src/features/materials/components/MaterialPage";

type Props = {
  params: Promise<{
    materialId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { materialId } = await params;

  return <MaterialPage materialId={materialId} />;
}
