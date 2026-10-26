import { useSyncExternalStore } from "react";

const noop = () => () => {};

// localStorage에 저장된 상태는 브라우저에서만 읽혀서, 서버 렌더와 첫 화면을 맞추려고 써요.
export const useHydrated = () => useSyncExternalStore(noop, () => true, () => false);
