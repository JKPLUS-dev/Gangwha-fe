import type { Seller } from "../types";

const FEATURED: Seller[] = [
  { id: "s1", name: "교동 햇살농원", area: "교동면", story: "3대째 교동 들녘에서 강화섬쌀을 짓고 있어요." },
  { id: "s2", name: "강화인삼조합 송해점", area: "송해면", story: "6년근만 고집하는 인삼 재배 농가 모임이에요." },
  { id: "s3", name: "외포리 젓갈상회", area: "내가면", story: "외포항에서 잡은 새우로 직접 젓갈을 담가요." },
  { id: "s4", name: "화도 순무밭", area: "화도면", story: "강화 순무와 순무김치를 산지에서 바로 보내드려요." },
  { id: "s5", name: "양사 화문석공방", area: "양사면", story: "왕골을 손으로 엮어 화문석을 만드는 공방이에요." },
  { id: "s6", name: "선수항 갯벌수산", area: "화도면", story: "선수항에서 밴댕이와 갯벌 수산물을 손질해요." },
];

const AREAS = ["강화읍", "선원면", "불은면", "길상면", "화도면", "양도면", "내가면", "하점면", "양사면", "송해면", "교동면", "삼산면", "서도면"];
const KINDS = ["농원", "수산", "상회", "공방", "식품"];
export const TOTAL_SELLERS = 150;

// 1차 입점 목표 150곳을 채우는 목업 업체예요. index 기반이라 렌더마다 같아요.
const GENERATED: Seller[] = Array.from({ length: TOTAL_SELLERS - FEATURED.length }, (_, i) => {
  const area = AREAS[i % AREAS.length];
  return {
    id: `s${FEATURED.length + i + 1}`,
    name: `${area.replace(/[읍면]$/, "")} ${KINDS[i % KINDS.length]} ${Math.floor(i / AREAS.length) + 1}호`,
    area,
    story: `${area}에서 강화 특산품을 직접 생산하는 업체예요.`,
  };
});

export const SELLERS: Seller[] = [...FEATURED, ...GENERATED];
