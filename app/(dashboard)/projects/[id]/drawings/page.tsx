import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import IfcUploadZone from "@/components/ifc-upload-zone";
import { IfcUploadList } from "@/components/ifc-upload-list";

export default async function DrawingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-6xl">
      <Link
        href={`/projects/${id}`}
        className="inline-flex items-center gap-1.5 text-sm text-[#737373] transition-colors hover:text-[#E5E5E5]"
      >
        <ArrowBackIcon style={{ fontSize: 16 }} />
        Back to project
      </Link>

      <header className="mt-6 mb-8">
        <h1 className="text-[24px] font-semibold tracking-tight text-[#E5E5E5]">
          Drawings
        </h1>
        <p className="font-description mt-1 text-[14px] text-[#737373]">
          Upload IFC building models to extract structural quantities.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="mb-3">
            <h2 className="text-sm font-medium text-[#E5E5E5]">
              Upload IFC file
            </h2>
            <p className="mt-0.5 text-xs text-[#525252]">
              IFC 2×3 or IFC 4 · .ifc only · up to 200 MB
            </p>
          </div>
          <IfcUploadZone />
        </div>
        <div className="lg:col-span-2">
          <IfcUploadList projectId={id} />
        </div>
      </div>
    </div>
  );
}
