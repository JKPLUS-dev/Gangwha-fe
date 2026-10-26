import type { Storage } from "./types";

export const formatPrice = (won: number) => `${won.toLocaleString("ko-KR")}원`;

export const STORAGE_LABEL: Record<Storage, string> = {
  room: "상온",
  chilled: "냉장",
  frozen: "냉동",
};
