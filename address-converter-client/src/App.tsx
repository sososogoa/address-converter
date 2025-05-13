import { useState } from "react";
import MapView from "./components/MapView";
import Spinner from "./components/Spinner";
import { convertAddress, convertCoords } from "./api/address";
import type { AddressResponse } from "./types/address";
import { useGlobalLoading } from "./hooks/useLoading";
import { toast } from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddressForm from "./components/AddressForm";
import AddressResult from "./components/AddressResult";
import FloatingPanel from "./components/FloatingPanel";

function App() {
  const isLoading = useGlobalLoading();

  const [result, setResult] = useState<AddressResponse | null>(null);
  const [lat, setLat] = useState("37.5665");
  const [lng, setLng] = useState("126.9780");

  const handleSearch = async (input: string) => {
    try {
      const res = await convertAddress(input);
      if (!res) {
        setResult(null);
        toast("검색 결과가 없습니다.", { icon: "😕" });
        return;
      }

      setResult(res);
      setLat(res.latitude);
      setLng(res.longitude);

      toast.success("주소 변환 성공!");
    } catch {
      toast.error("주소 검색 중 오류 발생");
    }
  };

  const handleMapClick = async (clickedLat: string, clickedLng: string) => {
    try {
      const res = await convertCoords(clickedLat, clickedLng);
      if (!res) {
        setResult(null);
        toast("해당 좌표에 대한 주소를 찾을 수 없습니다.", { icon: "📍" });
        return;
      }

      setResult(res);
      setLat(clickedLat);
      setLng(clickedLng);

      toast.success("지도에서 위치 선택됨!");
    } catch {
      toast.error("지도 클릭 처리 중 오류 발생");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <main className="flex-grow relative">
        {isLoading && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex flex-col items-center justify-center z-50">
            <Spinner />
            <p className="mt-4 text-gray-700 font-medium animate-pulse">
              로딩 중입니다...
            </p>
          </div>
        )}

        <MapView lat={lat} lng={lng} onClickMap={handleMapClick} />
        <FloatingPanel
          title="주소 검색"
          content={
            <>
              <AddressForm onSubmit={handleSearch} isLoading={isLoading} />
              {result && <AddressResult data={result} />}
            </>
          }
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
