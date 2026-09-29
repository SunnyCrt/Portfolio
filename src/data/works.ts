// 항목 순서가 표시 순서입니다. 추가 시 고유 id를 지정하고 이후 유지하세요.
export const workTypes = [
  "퀘스트",
  "내러티브·시나리오",
  "시스템·콘텐츠",
] as const;
export type WorkType = (typeof workTypes)[number];
export interface WorkItem {
  id: string;
  project: string;
  title: string;
  // public/works/example.jpg 파일은 /works/example.jpg로 지정. 빈 값은 문자 대체 영역.
  thumbnail: string;
  types: WorkType[];
  summary?: string;
  // 항목 순서대로 표시. label/value를 자유롭게 추가·삭제하세요.
  details?: { label: string; value: string }[];
  heroImage?: string;
  heroImageAlt?: string;
  // src/content/works 안의 Markdown 파일명
  body?: string;
}
export const worksPage = {
  label: "주요 작업 / WORKS",
  title: "Work Archive",
  description: "참여 프로젝트와 주요 작업을 소개합니다.",
  documentTitle: "Work Archive | 포트폴리오",
  filterLabel: "업무 유형",
  emptyMessage: "해당 유형의 작업물이 아직 없습니다.",
};
// 아래 목록을 추가·삭제·이동하면 화면에 자동 반영됩니다. types에는 여러 유형을 넣을 수 있습니다.
export const works: WorkItem[] = [
  {
    id: "quest-arbeit",
    summary: "퀘스트와 아르바이트 콘텐츠의 내러티브를 기획하고, 인게임 구현에 필요한 연출 및 데이터 작업을 진행했습니다.",
    details: [
      {
        label: "프로젝트",
        value: "마비노기 모바일",
      },
      {
        label: "담당 범위",
        value: "내러티브 기획, 시나리오 제작 및 연출",
      },
      {
        label: "작업 연도",
        value: "2024~2025",
      },
      {
        label: "개발 단계",
        value: "신규 개발, 라이브 서비스",
      },
    ],
    heroImage: "",
    body: "quest-arbeit.md",
    project: "마비노기 모바일",
    title: "퀘스트·아르바이트 내러티브 기획",
    thumbnail: "/works-images/quest-arbeit/quest-arbeit-1.png",
    types: ["내러티브·시나리오"],
  },
  {
    id: "naming-description",
    summary: "특징을 직관적으로 파악할 수 있으면서도 게임의 분위기에 어울리는 네이밍·디스크립션을 작성하고, 각 콘텐츠의 기획 의도와 설정·내러티브가 텍스트를 통해 자연스럽게 전달될 수 있도록 작업했습니다.",
    details: [
      {
        label: "프로젝트",
        value: "마비노기 모바일",
      },
      {
        label: "담당 범위",
        value: "내러티브 기획, 콘텐츠 네이밍 및 디스크립션 작성",
      },
      {
        label: "작업 연도",
        value: "2024~2025",
      },
      {
        label: "개발 단계",
        value: "신규 개발, 라이브 서비스",
      },
    ],
    heroImage: "",
    body: "naming-description.md",
    project: "마비노기 모바일",
    title: "콘텐츠 네이밍·디스크립션 내러티브 기획",
    thumbnail: "/works-images/naming-description/naming-description-1.png",
    types: ["내러티브·시나리오"],
  },
  {
    id: "collection-content",
    summary: "게임 내에서 획득하고 경험한 일러스트와 BGM을 수집·감상할 수 있도록 기획한 콘텐츠입니다.",
    details: [
      {
        label: "프로젝트",
        value: "서머너즈 워: 크로니클",
      },
      {
        label: "담당 범위",
        value: "시스템 기획, 콘텐츠 설계, 데이터 설계, UI 기획",
      },
      {
        label: "작업 연도",
        value: "2024",
      },
      {
        label: "개발 단계",
        value: "라이브 서비스",
      },
    ],
    heroImage: "",
    body: "collection-content.md",
    project: "서머너즈 워: 크로니클",
    title: "회상의 서재(아카이브 시스템) 기획",
    thumbnail: "/works-images/collection-content/archive-main.png",
    types: ["시스템·콘텐츠"],
  },
  {
    id: "dungeon_ranking",
    summary: "상위 던전에 대한 도전을 유도하고 플레이 동기를 강화하기 위해 기획한 시스템입니다.",
    details: [
      {
        label: "프로젝트",
        value: "서머너즈 워: 크로니클",
      },
      {
        label: "담당 범위",
        value: "시스템 기획, 데이터 설계, UI 기획",
      },
      {
        label: "작업 연도",
        value: "2023",
      },
      {
        label: "개발 단계",
        value: "라이브 서비스",
      },
    ],
    heroImage: "",
    body: "dungeon_ranking.md",
    project: "서머너즈 워: 크로니클",
    title: "던전 랭킹 시스템 기획",
    thumbnail: "/works-images/dungeon_ranking/dungeon_ranking-1.png",
    types: ["시스템·콘텐츠"],
  },
  {
    id: "collection-bonus",
    summary: "소환수 도감 효과 성장의 부담을 완화하고 소환수 육성 편의성을 높이기 위해 기획한 시스템입니다.",
    details: [
      {
        label: "프로젝트",
        value: "서머너즈 워: 크로니클",
      },
      {
        label: "담당 범위",
        value: "시스템 기획, 데이터 설계, UI 기획",
      },
      {
        label: "작업 연도",
        value: "2023",
      },
      {
        label: "개발 단계",
        value: "라이브 서비스",
      },
    ],
    heroImage: "",
    body: "collection-bonus.md",
    project: "서머너즈 워: 크로니클",
    title: "도감 보너스 포인트 시스템 기획",
    thumbnail: "/works-images/collection-bonus/collection.png",
    types: ["시스템·콘텐츠"],
  },
  {
    id: "quest_quick_complete",
    summary: "부 캐릭터의 반복적인 메인 퀘스트 진행 부담을 완화하고 육성 편의성을 높이기 위해 기획한 시스템입니다.",
    details: [
      {
        label: "프로젝트",
        value: "서머너즈 워: 크로니클",
      },
      {
        label: "담당 범위",
        value: "시스템 기획, 데이터 설계, UI 기획",
      },
      {
        label: "작업 연도",
        value: "2023",
      },
      {
        label: "개발 단계",
        value: "라이브 서비스",
      },
    ],
    heroImage: "",
    body: "quest_quick_complete.md",
    project: "서머너즈 워: 크로니클",
    title: "메인 퀘스트 일괄 완료 시스템 기획",
    thumbnail: "/works-images/quest_quick_complete/quest_quick_complete-2.png",
    types: ["시스템·콘텐츠", "퀘스트"],
  },
  {
    id: "quest-flow",
    summary: "지역별 이야기와 플레이 흐름을 연결하여 메인 퀘스트를 제작하고, 퀘스트 진행에 따른 플레이 동선과 NPC 배치를 설계했습니다.",
    details: [
      {
        label: "프로젝트",
        value: "에곤: 인페르나 벨룸",
      },
      {
        label: "담당 범위",
        value: "퀘스트 기획, 시나리오 기획, 플레이 동선 설계",
      },
      {
        label: "작업 연도",
        value: "2021~2022",
      },
      {
        label: "개발 단계",
        value: "신규 개발",
      },
    ],
    heroImage: "",
    body: "quest-flow.md",
    project: "에곤: 인페르나 벨룸",
    title: "메인 퀘스트 및 플레이 동선 기획",
    thumbnail: "/works-images/quest-flow/quest-flow-2.png",
    types: ["퀘스트", "내러티브·시나리오"],
  },
  {
    id: "voice-directing",
    summary: "스토리를 보다 효과적으로 전달하고 게임에 생동감을 더하기 위해, 성우 캐스팅부터 녹음 대본 준비, 현장 디렉팅까지 맡아 성우 녹음을 진행했습니다.",
    details: [
      {
        label: "프로젝트",
        value: "에곤: 인페르나 벨룸",
      },
      {
        label: "담당 범위",
        value: "성우 캐스팅, 녹음 대본 제작, 녹음 디렉팅",
      },
      {
        label: "작업 연도",
        value: "2021",
      },
      {
        label: "개발 단계",
        value: "신규 개발",
      },
    ],
    heroImage: "",
    body: "voice-directing.md",
    project: "에곤: 인페르나 벨룸",
    title: "성우 캐스팅 및 녹음 디렉팅",
    thumbnail: "/works-images/voice-directing/voice-directing-1.png",
    types: ["내러티브·시나리오"],
  },
  {
    id: "kingdom",
    summary: "넷플릭스 드라마 <킹덤> 시즌 1을 인터랙티브 스토리 게임으로 재구성하고 원작 이후의 이야기를 창작하여, 선택과 분기에 따라 전개와 결말이 달라지는 스토리 게임을 기획했습니다.",
    details: [
      {
        label: "프로젝트",
        value: "스토리픽",
      },
      {
        label: "담당 범위",
        value: "게임 기획, 시나리오 기획, 연출 기획",
      },
      {
        label: "작업 연도",
        value: "2019-2020",
      },
      {
        label: "개발 단계",
        value: "신규 개발",
      },
    ],
    heroImage: "",
    body: "kingdom.md",
    project: "스토리픽",
    title: "넷플릭스 드라마 <킹덤> 스토리 게임 기획",
    thumbnail: "/works-images/kingdom/kingdom-0.jpg",
    types: ["내러티브·시나리오"],
  },
  {
    id: "wannabe",
    summary: "세계관과 설정을 기획하고, 이를 바탕으로 남자 주인공의 과거 서사를 설계하여, 캐릭터 중심의 서브 스토리 콘텐츠를 제작했습니다.",
    details: [
      {
        label: "프로젝트",
        value: "워너비 챌린지",
      },
      {
        label: "담당 범위",
        value: "세계관·설정 기획, 서브 스토리 기획 및 작성, 시나리오 연출",
      },
      {
        label: "작업 연도",
        value: "2018-2019",
      },
      {
        label: "개발 단계",
        value: "신규 개발",
      },
    ],
    heroImage: "",
    body: "wannabe.md",
    project: "워너비 챌린지",
    title: "캐릭터 서브 스토리 및 콘텐츠 기획",
    thumbnail: "/works-images/wannabe/wannabe-0.png",
    types: ["내러티브·시나리오"],
  },
];
