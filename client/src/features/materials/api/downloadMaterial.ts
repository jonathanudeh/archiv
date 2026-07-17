export function downloadMaterial(materialId: string) {
  //   window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/materials/${materialId}/download`;
  window.open(
    `${process.env.NEXT_PUBLIC_API_URL}/materials/${materialId}/download`,
    "_self",
  );
}
