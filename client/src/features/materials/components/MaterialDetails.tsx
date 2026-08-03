"use client";

import Image from "next/image";
import Link from "next/link";
import { Download, Bookmark, Calendar } from "lucide-react";
import { format } from "date-fns";

import MaterialPreview from "./MaterialPreview";
import { Material } from "../types/material";
import { useToggleSaveMaterial } from "../../profile/hooks/useToggleSave";
import { useState } from "react";
import { useDownloadMaterial } from "../hooks/useDownloadMaterial";
import ShareButton from "@/src/components/ui/ShareButton";

type Props = {
  material: Material;
};

export default function MaterialDetails({ material }: Props) {
  const { saveMaterial, unsaveMaterial, isSaving } = useToggleSaveMaterial();
  const { startDownload, isDownloading } = useDownloadMaterial();
  const [saved, setSaved] = useState(material.isSaved);

  async function handleSave() {
    if (saved) {
      await unsaveMaterial(material._id);
      setSaved(false);
    } else {
      await saveMaterial(material._id);
      setSaved(true);
    }
  }

  return (
    <div className="bg-background space-y-8 p-5">
      {/* Header */}
      <section className="space-y-6 rounded-2xl py-6">
        <div>
          <h1 className="text-primary text-3xl font-bold uppercase">
            {material.title}
          </h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => startDownload(material._id)}
            disabled={isDownloading}
            className="bg-primary inline-flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 font-medium text-white"
          >
            <Download size={18} />
            Download
          </button>

          <a
            href={material.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2"
          >
            Open
          </a>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 font-medium transition ${
              saved
                ? "border-primary bg-primary/10 text-primary"
                : "border-slate-300"
            }`}
          >
            <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
          </button>

          <ShareButton
            title={material.title}
            text={`Check out "${material.title}" on Archiv.`}
          />
        </div>
      </section>

      {/* Preview + Sidebar */}
      <section className="grid gap-8 md:grid-cols-[1fr_320px]">
        {/* Preview */}
        <div className="px-4 py-2">
          <MaterialPreview
            materialId={material._id}
            fileUrl={material.fileUrl}
            fileType={material.fileType}
            title={material.title}
          />
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Uploaded By */}
          <div className="rounded-2xl border border-slate-200 p-5">
            <h3 className="mb-4 font-semibold">Uploaded By</h3>

            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={material.uploadedBy?.photo?.url ?? "/default.jpg"}
                  alt={material.uploadedBy?.name ?? ""}
                  fill
                  sizes="48px"
                  className="h-full w-full border-2 border-white object-cover shadow-md"
                />
              </div>

              <div className="flex flex-col">
                <span className="font-medium">
                  {material?.uploadedBy?.name}
                </span>
                <span className="flex items-center gap-1 text-xs">
                  <Calendar size={10} />
                  {format(new Date(material.createdAt), "PPP")}
                </span>
              </div>
            </div>
          </div>

          {/* Academic Info */}
          <div className="rounded-2xl border border-slate-200 p-5">
            <h3 className="mb-4 font-semibold">Academic Information</h3>

            <div className="space-y-4 text-sm">
              <InfoRow label="School" value={material.school?.name} />

              <InfoRow label="Department" value={material.department?.name} />

              <InfoRow label="Level" value={material.level?.name} />

              <InfoRow label="Semester" value={material.semester?.name} />
            </div>
          </div>

          {/* File Info */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="mb-4 font-semibold">File Information</h3>

            <div className="space-y-4 text-sm">
              <InfoRow label="Type" value={material.fileType} />

              <InfoRow label="Views" value={String(material.viewCount)} />

              <InfoRow
                label="Downloads"
                value={String(material.downloadCount)}
              />
            </div>
          </div>
        </aside>
      </section>

      {/* Description */}
      {material.description && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">Description</h2>

          <p className="leading-relaxed whitespace-pre-wrap text-slate-700">
            {material.description}
          </p>
        </section>
      )}

      {/* Related Materials */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Related Materials</h2>

          <Link href="/materials" className="text-primary text-sm font-medium">
            View More
          </Link>
        </div>

        <p className="text-slate-500">Related materials will appear here.</p>
      </section>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
      <span className="text-slate-500">{label}</span>

      <span className="text-right font-medium">{value ?? "-"}</span>
    </div>
  );
}
