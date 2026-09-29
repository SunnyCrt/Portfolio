import { works } from "./works";
// HOME 콘텐츠 편집 파일: 따옴표 안의 문구를 변경하고 저장하세요.
// 줄바꿈은 titleLines / descriptionLines의 배열 항목으로 구분합니다.
// titleLines의 accent: true는 기존 파란 강조색을 적용합니다.
export const introduction = {
  eyebrow: "PORTFOLIO / 2026",
  titleLines: [
    {
      text: "Game Content",
      accent: false,
    },
    {
      text: "Designer",
      accent: true,
    },
  ],
  role: "퀘스트 · 콘텐츠 기획",
  descriptionLines: [
    "RPG 및 스토리 게임 신규 개발 경험과 라이브 서비스 경험을 바탕으로",
    "내러티브와 시스템이 어우러진 콘텐츠를 기획합니다.",
  ],
  worksLinkText: "EXPLORE WORKS ↗",
  scrollHint: "SCROLL TO DISCOVER ↓",
};

// 경력 섹션의 제목과 전체 기간 (개별 경력 기간과 별도로 수정합니다).
export const careerSection = {
  eyebrow: "01 / CAREER",
  title: "Experience",
  responsibilitiesLabel: "주요 담당 업무",
  period: "2017 — 2025",
};

export type CareerWorkType = "퀘스트" | "내러티브·시나리오" | "시스템·콘텐츠";

export interface Career {
  id: string;
  icon: string;
  // 비우면 배열 순서에 따라 01 / 04 형식으로 자동 표시합니다.
  number?: string;
  // public 안의 파일은 /로 시작하는 경로로 지정합니다. 빈 값이면 약자 표시.
  iconImage?: string;
  workTypes: CareerWorkType[];
  responsibilities: string[];
  title: string;
  company: string;
  period: string;
}
// 표시 순서대로 나열합니다. 항목 추가 시 id는 중복되지 않게 작성하세요.
// icon은 이미지가 없을 때 표시할 약자, iconImage는 이미지 경로입니다.
// 업무 유형과 업무 내용은 편집용 예시이며 실제 경력을 뜻하지 않습니다.
// workTypes에 유형을 추가하고 responsibilities에 항목을 자유롭게 추가/삭제하세요.
export const careers: Career[] = [
  {
    id: "mabinogi-mobile",
    icon: "MM",
    iconImage: "public/game-icons/mabinogi.webp",
    workTypes: ["내러티브·시나리오"],
    responsibilities: [
      "퀘스트, 아르바이트 내러티브 기획 및 텍스트 작성",
      "아이템, 인게임 콘텐츠 내러티브 기획 및 네이밍·설명 작성",
      "NPC·몬스터의 음성 대사에 대한 성우 녹음 디렉팅",
    ],
    title: "마비노기 모바일",
    company: "데브캣",
    period: "2024.04 — 2025.07",
  },
  {
    id: "summoners-war",
    icon: "SW",
    iconImage: "public/game-icons/chronicles.jpg",
    workTypes: ["퀘스트", "내러티브·시나리오", "시스템·콘텐츠"],
    responsibilities: [
      "콘타나 지역 서브 퀘스트 기획",
      "소환수 소환 대사 작성 및 성우 녹음 디렉팅",
      "소환 시스템 데이터 관리",
      "인게임 스트링 다국어 번역 데이터 관리",
    ],
    title: "서머너즈 워: 크로니클",
    company: "컴투스",
    period: "2022.09 — 2024.03",
  },
  {
    id: "egon",
    icon: "EG",
    iconImage: "public/game-icons/egon.png",
    workTypes: ["퀘스트", "내러티브·시나리오"],
    responsibilities: [
      "메인·서브 퀘스트 기획",
      "메인 퀘스트 전체 시나리오 성우 녹음 디렉팅",
      "인게임 콘텐츠 내러티브 기획 및 네이밍·설명 작성",
    ],
    title: "에곤: 인페르나 벨룸",
    company: "라운드플래닛",
    period: "2021.07 — 2022.08",
  },
  {
    id: "storypick",
    icon: "SP",
    iconImage: "public/game-icons/storypick.png",
    workTypes: ["내러티브·시나리오"],
    responsibilities: [
      "넷플릭스 드라마 '킹덤' 스토리 게임화 기획",
      "로맨스 스토리 게임 '연애 게임 속 주인공이 되었습니다' 시나리오 기획",
      "모바일 스토리RPG '워너비 챌린지' 시나리오 기획"
    ],
    title: "스토리픽 외",
    company: "데이세븐",
    period: "2017.11 — 2021.07",
  },
];

export const projectSection = {
  eyebrow: "02 / PROJECTS",
  title: "Selected Works",
  allWorksText: "VIEW WORK ARCHIVE ↗",
};

// HOME 카드 선택: workId를 works.ts의 id로 교체하세요. 배열 순서가 카드 위치입니다.
// 프로젝트명·제목·유형·썸네일은 Archive에서 자동으로 가져옵니다.
export const selectedWorks = [
  { workId: "quest-arbeit" },
  { workId: "collection-content" },
  { workId: "quest-flow" },
  { workId: "kingdom" },
];
export const projects = selectedWorks.flatMap(({ workId }) => {
  const work = works.find(item => item.id === workId);
  if (!work) return [];
  return [{ id: work.id, thumbnail: work.thumbnail, game: work.project, title: work.title, types: work.types }];
});

// CONTACT 이름과 이메일을 수정하세요. 복사 버튼은 이메일만 복사합니다.
export const contact = { name: "김선희", email: "sunheek1102@naver.com" };
