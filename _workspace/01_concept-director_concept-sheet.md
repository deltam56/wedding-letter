---
couple:
  groom: "한태현"
  bride: "옥정미"
ceremony:
  date: "2026-11-07 12:30"
  day_of_week: "토요일"
  venue: "로프트가든 344"
  venue_floor: "청학빌딩 10층"
  address: "서울 양천구 오목로 344"
  transit_subway: "5호선 오목교역 7번출구"
  transit_parking: "건물 주차장 또는 인근 공영주차장 이용"
parents:
  groom_father: "한상철"
  groom_mother: "백은하"
  bride_father: "옥명호"
  bride_mother: "김인자"
  groom_birth_order: "외아들"
  bride_birth_order: "외동딸"
mood_keywords: ["동화같은", "따뜻한", "발랄한", "친근한", "카툰 일러스트"]
palette:
  primary: "#F5C84C"        # 머스타드 옐로우 (배경/포인트, 앞면 하단 띠와 동일 톤)
  secondary: "#5BB4E8"      # 스카이 블루 (하늘/지도 배경 톤)
  accent: "#E54C2E"         # 코랄 레드 (영문 디스플레이/포인트 텍스트)
  accent_green: "#3F8F4A"   # 포레스트 그린 (잎사귀/자연 모티프)
  accent_warm: "#E89A4D"    # 앰버 오렌지 (집/땅 톤, 부드러운 보조)
  background: "#FFFAF0"     # 카드/팝업 베이스 (크림 화이트, 옐로우와 자연 조화)
  surface: "#FFFFFF"        # 정보 카드/모달 배경
  text: "#2B2118"           # 다크 브라운 블랙 (본문)
  text_muted: "#6B5A4A"     # 보조 텍스트 (날짜·주소 보조 라인)
typography:
  korean_display: "Black Han Sans"        # 신랑신부 이름·섹션 헤드라인 (굵은 디스플레이)
  korean_display_alt: "Jua"               # 대체/보조 헤드라인 (조금 더 둥글고 친근)
  korean_serif: "Gowun Batang"            # 인사말·본문 한국어 (부드러운 곡선 명조)
  korean_sans: "Pretendard"               # 주소/시간/계좌 등 정보성 한국어
  english_display: "Bungee"               # "We're Getting Married" 같은 메인 카툰 디스플레이
  english_display_alt: "Fredoka"          # 보조 영문 디스플레이 (둥글둥글 친근)
  english_script: "Caveat"                # 손글씨 악센트 (선택적 사용)
imagery_direction: "ref_inv/inv_front.png · ref_inv/inv_back.png의 카툰/동화풍 일러스트 스타일 그대로 유지 — 둥근 윤곽선, 채도 높은 평면 컬러, 자연 배경(바다·산·언덕집·구름·나무), 작은 신랑신부 캐릭터(턱시도+드레스), 하트/잎사귀 데코, 평면 일러스트 지도"
sections_order:
  - hero            # 풀스크린 일러스트 + "We're Getting Married" + 한태현, 옥정미 + 2026.11.07
  - greeting        # "저희, 결혼합니다!" 인사말 (사용자가 좋아한 "시선이 닿는 높이는..." 톤 유지)
  - couple-intro    # 양가 부모 함자 + 신랑신부 소개 (외아들/외동딸 명시)
  - calendar        # 11월 캘린더 + D-day 카운트다운
  - gallery         # placeholder 기반 스와이프 갤러리 + 핀치 줌 lightbox
  - venue           # 일러스트 약도 + 주소 + 5호선 오목교역 7번출구 + 주차 안내
  - account         # 양가 계좌 (마음 전하실 곳)
  - rsvp            # 참석 의사 전달
  - share           # 카카오 공유 + 링크 복사
defaults_applied:
  - "계좌번호: 아직 미수집 → copy-writer가 placeholder 처리"
  - "갤러리 사진: 미제공 → image-artist는 일러스트 placeholder 생성, frontend는 교체 가능한 슬롯으로 마크업"
  - "guestbook 섹션은 사용자가 명시하지 않아 생략 (필요 시 추후 추가)"
---

# 컨셉 디렉션 노트

## 톤앤매너 (한 문단)

격식 호텔식 청첩장이 아니라 **동화책 한 페이지를 펼친 듯한 따뜻하고 발랄한 캐주얼 청첩장**. 두 사람이 좋아하는 것·바라보는 곳이 닮아 있다는 사용자의 카피에서 출발해, **언덕 위 작은 집, 바다, 푸른 하늘이라는 동화적 배경 안에 작은 신랑신부 캐릭터가 함께 서 있는 세계관**을 전체 페이지에 일관되게 유지한다. 친구·동료에게 "우리 진짜 결혼해!" 라고 들뜬 마음으로 보여주는 분위기.

## 핵심 비주얼 컨셉 (한 문단)

**머스타드 옐로우(#F5C84C)** 와 **스카이 블루(#5BB4E8)** 가 양대 배경 컬러로 교차하며, **코랄 레드(#E54C2E)** 가 영문 디스플레이와 포인트 카피에 강한 악센트를 준다. 포레스트 그린(#3F8F4A) 잎사귀·앰버 오렌지(#E89A4D) 집·바다의 그라디언트 블루가 작은 디테일로 곳곳에 등장. 영문은 **Bungee/Fredoka** 같은 굵고 둥근 카툰풍 디스플레이, 한글 이름은 **Black Han Sans** 의 묵직한 블랙 산세리프로 강조하되, 인사말 본문은 **Gowun Batang** 의 부드러운 곡선으로 풀어 따뜻함을 잃지 않는다. 사진 갤러리 자리는 일러스트 액자 프레임으로 placeholder 처리.

---

## 카피라이터 (copy-writer) 가이드

### 톤 기준
- **친근체 + 들뜸 + 시적인 한 줄**: 격식 "○○의 ○자 ○○" 식 한자 결합 호칭은 본문에서 피하되, couple-intro 섹션의 부모 함자 표기는 레퍼런스 뒷면처럼 **"한상철 · 백은하 외아들 한태현 / 옥명호 · 김인자 외동딸 옥정미"** 형식 유지.
- 사용자가 좋아한 인사말 톤을 **그대로 보존**:
  > "시선이 닿는 높이는 서로 다르지만,
  > 좋아하는 것과 바라보는 곳은 닮아 있습니다.
  > 각자의 세계가 뚜렷했던 두 사람이
  > 이제 서로의 하루를 함께 채워가려 합니다.
  > 눈높이는 맞춰가고, 좋아하는 것들을 나누며 살겠습니다.
  > 저희의 새로운 시작을 함께 축복해 주세요."
  → 위 문장은 **원문 그대로 사용 가능**. 다만 hero 직후 greeting 섹션 헤더는 **"저희, 결혼합니다!"** (느낌표 포함, 발랄체)로 시작해 톤을 잡는다.
- 안내문(주소/주차/RSVP)은 짧고 명료하게. 캐주얼하지만 헷갈리지 않게.

### 섹션별 카피 분량 가이드
- hero 부제: "한태현 · 옥정미 / 2026. 11. 07 SAT 12:30 PM" 짧은 한 줄.
- greeting: 사용자 원문 + 마무리 한 줄 "함께해 주시면 큰 기쁨이 되겠습니다." 정도로 마감.
- couple-intro: 부모 함자 라인 2줄 + 신랑신부 별 짧은 한 줄 소개(선택, 두 사람의 성격 키워드 1~2개).
- venue: "5호선 오목교역 7번출구 도보 N분" + "건물 주차장 만차 시 인근 공영주차장 이용 부탁드립니다." 톤.
- account: "참석이 어려우신 분들을 위해 마음 전하실 곳을 안내드립니다." 정도 부드럽게.
- rsvp: "참석 여부를 알려주시면 더 정성껏 준비하겠습니다."
- share: "함께 나누고 싶은 분께 청첩장을 전해주세요."

### 금지/주의
- 한자 호칭(令愛/令息), 지나치게 격식 있는 "삼가 모시고자 합니다" 구문은 본 컨셉과 불일치 → 사용 금지.
- 이모지는 본문 카피에 넣지 않음 (디자인 일러스트가 하트·잎사귀 역할 수행).

---

## 이미지 아티스트 (image-artist) 가이드

### 스타일 기준 — 가장 중요
**`ref_inv/inv_front.png`, `ref_inv/inv_back.png` 의 일러스트 스타일을 직접 참고하여 동일한 카툰/동화풍 톤을 유지할 것.** 새 이미지가 레퍼런스와 따로 노는 인상을 절대 만들지 않는다.

세부 스타일 키워드:
- **둥근 윤곽선** (스트로크가 보이는 라인 일러스트, 너무 얇지 않게)
- **채도 높은 평면 컬러 + 약한 셰이딩** (수채화 아님, 디지털 평면 일러스트)
- **동화책 삽화 무드** — 디즈니 픽사보다는 한국 그림책/스튜디오 지브리 약간 섞인 친근한 톤
- **작은 신랑신부 캐릭터**: 신랑 = 검정 턱시도/흑발/밝은 미소, 신부 = 아이보리/오프화이트 드레스 + 작은 베일/꽃 헤어피스, 둘 다 귀여운 SD 비율(머리:몸 약 1:2~1:2.5)
- **배경 요소 풀**: 푸른 바다 + 작은 보트, 초록 언덕, 주황 지붕의 작은 집, 흰 구름, 침엽수/활엽수, 나무 데크/울타리, 디딤돌, 작은 빨간 하트, 초록 잎사귀
- **컬러 일치**: 머스타드 옐로우 / 스카이 블루 / 코랄 / 포레스트 그린 / 앰버 — 컨셉 시트 팔레트와 동일 톤 유지

### 생성해야 할 이미지 인벤토리
1. **hero 메인 일러스트** (필수, 세로 모바일 풀스크린)
   - 레퍼런스 앞면처럼 두 캐릭터가 나무 데크 위에서 바다·언덕집을 바라보는 구도. 단, 앞면 텍스트는 제외 (텍스트는 HTML로 오버레이).
2. **인사말 섹션 데코** (양옆에 신랑/신부 단독 작은 캐릭터 또는 잎사귀 부케)
3. **couple-intro 캐릭터** (신랑/신부 각각 단독 일러스트, 흰 배경)
4. **약도 일러스트** (지하철역·도로·랜드마크가 들어간 평면 일러스트 지도. 레퍼런스 뒷면 약도 톤 유지)
5. **갤러리 placeholder 프레임** (일러스트 액자/폴라로이드 프레임, 사용자가 사진 교체 가능)
6. **섹션 디바이더 / 스크롤 데코** (구름·하트·잎사귀·플래그·작은 별 등 미니 데코 세트)
7. **share/account 아이콘 데코** (편지·하트·선물 박스 등 미니 모티프, 선택)

### 기술 옵션
- 출력: PNG 또는 WebP (투명 배경이 필요한 데코 요소는 PNG 알파)
- 모바일 우선 사이즈: hero 1080×1920 권장, 디바이더는 1080×320 등 가로 긴 비율
- 텍스트는 일러스트에 굽지 말 것 (HTML/CSS로 오버레이)

---

## 모션 디자이너 (motion-designer) 가이드

### 모션 무드 — 가장 중요
**호텔 격식 무드의 "조용히 피어나는" 절제된 페이드인이 아니라, "동화 속 페이지를 넘기는 듯한 발랄하면서도 부드러운" 모션.** 무겁지 않게, 그러나 어색하게 통통 튀지도 않게. 이지 인-아웃 곡선을 기본으로 약간의 오버슛 허용.

### 모션 무드 키워드
- 살랑거리는 (구름/잎사귀가 좌우로 부드럽게)
- 통통 튀는 (마이크로 인터랙션, 버튼/하트 탭 시)
- 페이지 넘김 (섹션 전환 시 살짝 위로 올라오며 등장)
- 따뜻한 호흡 (이름 텍스트가 아주 미세하게 0.5초 주기로 호흡)

### 권장 인터랙션/애니메이션
1. **배경 애니메이션 (hero)**: 구름 좌→우 느린 패럴랙스(20~40초 사이클), 작은 하트/잎사귀 파티클이 화면 아래에서 위로 가볍게 떠오름.
2. **D-day 카운터**: 숫자 변화 시 살짝 위로 올라오며 페이드인 (오버슛 5~8%).
3. **갤러리**: 스와이프 가능, 탭 시 핀치 줌 lightbox.
4. **하트/플로럴 탭 마이크로 인터랙션**: 코랄 하트 아이콘 탭 시 살짝 스케일업(1.0 → 1.2 → 1.0, 250ms) + 햅틱 1회.
5. **계좌 복사**: 복사 성공 시 토스트가 아래에서 위로 슬쩍 올라옴 + 햅틱.
6. **카카오 공유 버튼**: 호버/탭 시 옐로우 배경에 컬러 펄스.
7. **섹션 진입**: 스크롤 시 각 섹션이 아래에서 위로 12px 슬라이드 + 페이드인 (350ms ease-out).

### 접근성
- `prefers-reduced-motion: reduce` 분기: 모든 패럴랙스/파티클/호흡 모션 중지, 페이드인만 0ms로 즉시 표시.

### BGM (선택)
- 사용자가 BGM mp3 보유 (`audio/bgm.mp3`). 우상단 토글 버튼, 기본은 off. 동화 분위기에 어울리도록 자동재생 강제는 금지.

---

## 프론트엔드 개발자 (frontend-developer) 가이드

### 폰트 로딩 (Google Fonts CDN)
필수 폰트 4종 + 영문 디스플레이 2종을 한 번에 로드:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Jua&family=Gowun+Batang:wght@400;700&family=Bungee&family=Fredoka:wght@500;700&family=Caveat:wght@600&display=swap" rel="stylesheet">
<link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
```

CSS 변수 매핑:
```css
:root {
  --color-primary: #F5C84C;
  --color-secondary: #5BB4E8;
  --color-accent: #E54C2E;
  --color-accent-green: #3F8F4A;
  --color-accent-warm: #E89A4D;
  --color-bg: #FFFAF0;
  --color-surface: #FFFFFF;
  --color-text: #2B2118;
  --color-text-muted: #6B5A4A;

  --font-ko-display: "Black Han Sans", "Jua", sans-serif;
  --font-ko-display-alt: "Jua", sans-serif;
  --font-ko-serif: "Gowun Batang", serif;
  --font-ko-sans: "Pretendard", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-en-display: "Bungee", "Fredoka", system-ui, sans-serif;
  --font-en-display-alt: "Fredoka", system-ui, sans-serif;
  --font-en-script: "Caveat", cursive;
}
```

### 사용 매핑 (어디에 어떤 폰트를 쓸지)
- **hero 영문 헤드라인** ("We're Getting Married"): `--font-en-display` (Bungee) + 코랄(#E54C2E) + 텍스트 섀도 1~2px (레퍼런스 앞면 입체감 재현)
- **hero 신랑신부 한글 이름** ("한태현, 옥정미"): `--font-ko-display` (Black Han Sans) + 다크 브라운, 자간 약간 넓게
- **hero 날짜** ("2026. 11. 07"): `--font-en-display-alt` (Fredoka) 또는 Pretendard Bold
- **섹션 제목** ("저희, 결혼합니다!", "오시는 길", "마음 전하실 곳"): `--font-ko-display` 또는 `--font-ko-display-alt`(Jua)로 친근감
- **인사말 본문**: `--font-ko-serif` (Gowun Batang) — 가독성 + 부드러움
- **주소/시간/계좌 등 정보**: `--font-ko-sans` (Pretendard)
- **악센트 한 줄** (선택, 손글씨 느낌): `--font-en-script` (Caveat)

### 레이아웃 구조 메모
- **모바일 우선 단일 페이지**: max-width 480px 컨테이너 중앙 정렬, 데스크탑은 양옆 배경 색띠.
- **섹션 배경 교차**: hero=일러스트 풀블리드 → greeting=옐로우(#F5C84C) → couple-intro=크림(#FFFAF0) → calendar=스카이블루(#5BB4E8) 약하게 → gallery=크림 → venue=스카이블루 → account=옐로우 → rsvp=크림 → share=옐로우.
  (사용자/QA가 보기 너무 화려하면 옐로우/스카이를 #FFFAF0 베이스에 카드로 축소 적용)
- **카드 UI**: 정보 블록은 흰색(#FFFFFF) 카드 + 부드러운 그림자 + 라운드 16~20px + 약한 코랄/그린 보더 선택.
- **버튼**: 라운드 풀(pill) 형태, 코랄 솔리드 / 옐로우 솔리드 / 화이트 + 보더 3종.

### 섹션 순서 (확정)
hero → greeting → couple-intro → calendar → gallery → venue → account → rsvp → share

### 정보 정합성 — 절대값 (변경 금지)
- 신랑신부: 한태현(왼쪽/먼저) · 옥정미(오른쪽/나중)
- 부모: 한상철 · 백은하의 외아들 한태현 / 옥명호 · 김인자의 외동딸 옥정미
- 일시: 2026년 11월 7일 토요일 오후 12시 30분
- 장소: 로프트가든 344 (서울 양천구 오목로 344, 청학빌딩 10층)
- 교통: 5호선 오목교역 7번출구 / 건물 주차장 또는 인근 공영주차장

### 오픈그래프 (카카오/링크 미리보기)
- og:title = "한태현 ♥ 옥정미 결혼합니다"
- og:description = "2026.11.07 토요일 오후 12:30 · 로프트가든 344"
- og:image = hero 메인 일러스트 1200×630 크롭 버전

---

## QA (invitation-qa) 가이드 (참고)

- 정보 정합성 절대값(위 5항목) 1글자 단위로 매칭.
- 360px 폭에서도 hero 영문 헤드라인이 잘리지 않는지 확인 (Bungee는 자간이 넓어 폰트 사이즈/한 줄 길이 점검 필수).
- `prefers-reduced-motion` 분기에서 파티클·구름 패럴랙스·호흡 모션이 완전히 멈추는지.
- 컬러 대비: 머스타드(#F5C84C) 배경 위 텍스트는 다크 브라운(#2B2118)로만, 코랄(#E54C2E) 텍스트는 흰색 또는 크림 배경 위에서만 사용해 WCAG AA 확보.
