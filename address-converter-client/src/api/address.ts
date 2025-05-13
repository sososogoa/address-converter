import api from "./axios";
import type { AddressResponse } from "../types/address";
import { sleep } from "../utils/sleep";
import { setGlobalLoading } from "../hooks/useLoading";

export async function convertAddress(
  input: string
): Promise<AddressResponse | null> {
  try {
    setGlobalLoading(true);

    const res = await api.get<AddressResponse>("/convert-address", {
      params: { input },
      validateStatus: (status) => status === 200 || status === 204,
    });

    await sleep(600); // 가짜 로딩

    if (res.status === 204) return null;
    return res.data;
  } catch (err) {
    console.error("주소 변환 실패:", err);
    throw err;
  } finally {
    setGlobalLoading(false);
  }
}

export async function convertCoords(
  lat: string,
  lng: string
): Promise<AddressResponse | null> {
  try {
    setGlobalLoading(true);

    const res = await api.get<AddressResponse>("/convert-coord", {
      params: { lat, lng },
      validateStatus: (status) => status === 200 || status === 204,
    });

    await sleep(600);

    if (res.status === 204) return null;
    return res.data;
  } catch (err) {
    console.error("좌표 변환 실패:", err);
    throw err;
  } finally {
    setGlobalLoading(false);
  }
}

export async function fetchSuggestions(input: string): Promise<string[]> {
  try {
    const res = await api.get<string[]>("/suggestions", {
      params: { input },
    });
    return res.data;
  } catch (err) {
    console.error("자동완성 실패:", err);
    return [];
  }
}
