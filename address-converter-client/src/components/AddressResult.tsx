import type { AddressResponse } from "../types/address";

interface Props {
  data: AddressResponse;
}

export default function AddressResult({ data }: Props) {
  return (
    <div className="mt-4 p-4 rounded-xl border bg-white/90 shadow-xl backdrop-blur-md transition-all duration-300 space-y-3 animate-fade-in-down">
      <DetailRow label="도로명 주소" value={data.roadAddress || "없음"} />
      <DetailRow label="지번 주소" value={data.jibunAddress} />
      <DetailRow label="위도" value={data.latitude} />
      <DetailRow label="경도" value={data.longitude} />
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-gray-700 font-medium">
      <span className="text-blue-600 font-semibold">{label}:</span> {value}
    </div>
  );
}
