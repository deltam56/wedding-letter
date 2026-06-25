---
motion_mood: "storybook-bouncy"           # 동화같은·따뜻한·발랄한·친근한·카툰 일러스트
mood_keywords_source: ["동화같은", "따뜻한", "발랄한", "친근한", "카툰 일러스트"]
density: "balanced"                         # 12~20개 파티클 + 구름 1~2 레이어, 과하지 않게
performance_budget:
  particles_max: 20                         # 동시 활성 파티클 상한 (모바일 60fps 여유 있게)
  cloud_layers_max: 2                       # hero 한정 구름 레이어
  canvas_count: 1                           # 단일 캔버스에 파티클 통합
  reduced_motion_strategy: "static-fallback" # 무한 루프는 OFF, fade-in은 0ms 즉시 표시
adopted_backgrounds: ["heart-leaf-petal-particles", "hero-sky-clouds-parallax"]
rejected_backgrounds: ["gradient-mesh-slow"]  # 일러스트 자체가 화려해서 메시까지 더하면 과부하
implementation_notes:
  - "vanilla JS + Canvas 2D + CSS animation + IntersectionObserver만 사용"
  - "외부 라이브러리(GSAP/Three.js/Lottie) 사용 금지"
  - "모든 transform/opacity 위주, layout 발생 금지"
---

# Motion Specification — 한태현 ♥ 옥정미 동화 청첩장

## 0. 모션 무드 한 줄 정리

> **"동화책 한 페이지를 톡 넘기듯, 발랄하면서도 부드러운"**
>
> 호텔 격식의 절제된 900ms ease-out 대신, **350~600ms의 가볍게 통통거리는 ease-in-out 또는 살짝 오버슛이 있는 spring-like 곡선**을 기본으로 한다. 살랑·통통·따뜻한 호흡·살짝 장난스러운 마이크로 인터랙션이 핵심.

---

## 1. 애니메이션 배경

### A. 하트/잎사귀/꽃잎 파티클 (전 페이지, 단일 Canvas)
- **트리거**: page load → 무한 루프, IntersectionObserver로 viewport 외 일시정지
- **구현 방식**: Canvas 2D, devicePixelRatio 보정, requestAnimationFrame, fixed position 풀스크린 (`pointer-events: none`, `z-index: 1`)
- **파티클 종류 (3종 혼합)**:
  - **하트(♥)**: 코랄(#E54C2E), 비율 30% — SVG path를 ctx.bezierCurveTo로 그리거나 fillText("♥")
  - **잎사귀**: 포레스트 그린(#3F8F4A), 비율 35% — ellipse + 가운데 stroke 선 1px
  - **꽃잎**: 머스타드 옐로우(#F5C84C) 또는 앰버 오렌지(#E89A4D), 비율 35% — 둥근 ellipse
- **파라미터**:
  - count: 16 (모바일 기준, 데스크탑은 20)
  - size_range: [10, 22] px (카툰 무드에 맞춰 조금 큼직하게)
  - opacity_range: [0.35, 0.7]
  - 수직 방향: **아래에서 위로 떠오름** (동화 풍선 느낌, viewport_height / [14, 22]초 randomize)
  - 수평 sway: **사인파 진폭 [25, 50]px, 주기 [3.5, 6]초** (살랑살랑)
  - 회전: 시작 랜덤 [0, 360]deg, 속도 [-1.2, 1.2] deg/frame
  - 재진입: 화면 위로 벗어나면 y = viewport_height + 30 으로 리셋 (x도 새 랜덤)
- **성능**: 16개 동시 활성 시 모바일 평균 1~2% CPU, 60fps 안정. fps < 50 감지 시 count를 12로 자동 감소(선택).
- **prefers-reduced-motion**: Canvas 자체 미동작. 대신 hero 영역 좌상/우하 모서리에 정적 SVG 하트 2개 + 잎사귀 2개를 absolute 배치.

### B. Hero 하늘 구름 패럴랙스 (hero 섹션 한정)
- **트리거**: page load → 무한 루프 (hero가 viewport 안에 있을 때만)
- **구현 방식**: CSS `@keyframes`로 `transform: translateX` 단순 적용. hero 일러스트 위 absolute로 흰색 구름 PNG 2~3개 레이어드.
- **레이어**:
  - 먼 구름(작음, opacity 0.6): 우→좌, duration 60s linear infinite
  - 가까운 구름(큼, opacity 0.85): 좌→우, duration 40s linear infinite, translateY 슬쩍 -4px~+4px 추가(살랑)
- **위치**: hero 일러스트의 sky 영역(top: 8%~28%)에만 배치
- **성능**: GPU compositor만 사용, 거의 무료
- **prefers-reduced-motion**: 구름 애니메이션 OFF, 정지 위치 그대로 표시
- **image-artist 협의 필요**: 구름 PNG(투명 배경) 2~3종 별도 자산 요청 — 디바이더 데코 세트에 포함 가능

### C. (Rejected) 그라디언트 메시
> 일러스트 배경 자체가 채도 높고 정보가 많아 메시까지 추가하면 시각적 과부하. **채택하지 않음.**

---

## 2. 스크롤 시퀀스 (섹션별 진입 애니메이션)

기본 패턴: `IntersectionObserver(threshold: 0.15)` → 진입 시 `.is-visible` 클래스 부여.

### 공통 fade-up (모든 섹션 기본값)
- 초기: `opacity: 0; transform: translateY(20px);`
- 진입: `opacity: 1; transform: translateY(0);`
- duration: **450ms**, easing: **`cubic-bezier(0.34, 1.56, 0.64, 1)`** (살짝 통통한 오버슛)
- prefers-reduced-motion: `opacity: 0 → 1` (0ms, 즉시 표시)

### Hero 진입 (page load)
- 트리거: load 직후
- 시퀀스:
  - 0.0s: hero 일러스트 페이드인 (300ms ease-out)
  - 0.25s: 영문 헤드라인 "We're Getting Married" — scale 0.85 → 1.0 + opacity, 500ms `cubic-bezier(0.34, 1.56, 0.64, 1)` (통통 등장)
  - 0.55s: "한태현 · 옥정미" 한글 이름 — translateY(15px → 0) + opacity, 450ms
  - 0.85s: 날짜 "2026. 11. 07" — opacity + translateY(10px → 0), 400ms
  - 1.20s: 스크롤 인디케이터(아래 화살표) 페이드인 + bounce 시작
- prefers-reduced-motion: 모두 동시 표시 (0ms)

### Hero 캐릭터 통통 등장 (Should)
- hero 일러스트 본체와 별도로 작은 신랑신부 캐릭터를 SVG/PNG로 오버레이한 경우:
  - 신랑: 0.5s delay, scale 0.8 → 1.05 → 1.0, 600ms (overshoot 5%)
  - 신부: 0.7s delay, 동일 (stagger 0.2s)
- prefers-reduced-motion: 즉시 scale 1.0 표시

### Hero 이름 따뜻한 호흡 (Nice-to-have, 무한 루프)
- "한태현 · 옥정미" 텍스트에 scale 1.0 ↔ 1.015 사이 4초 주기 sin 호흡 (alternate)
- prefers-reduced-motion: OFF (scale 1.0 고정)

### Greeting 섹션
- 트리거: viewport 진입 (threshold 0.2)
- 효과: **"저희, 결혼합니다!" 헤더가 단어 단위 stagger reveal**
  - 단어별 translateY(15px → 0) + opacity, stagger 80ms
  - duration each: 400ms, easing: `cubic-bezier(0.34, 1.56, 0.64, 1)`
- 본문(인사말 5줄): 헤더 완료 후 fade-up 일괄 (500ms)
- (Should) 본문 첫 줄 "시선이 닿는 높이는..." 손글씨 word reveal: 단어별 60ms stagger, opacity + 살짝 translateY(8px)
- prefers-reduced-motion: 헤더·본문 동시 표시

### Couple-Intro 섹션
- 부모 함자 라인 2줄: fade-up stagger 100ms
- 신랑/신부 캐릭터 일러스트 2개: 좌우에서 안쪽으로 슬라이드 + 페이드
  - 신랑(좌): translateX(-20px → 0) + opacity, 500ms, delay 200ms
  - 신부(우): translateX(20px → 0) + opacity, 500ms, delay 350ms
- prefers-reduced-motion: 정적 표시

### Calendar / D-day 섹션
- 11월 캘린더 그리드: fade-up
- **D-day 카운트업** (Must):
  - 트리거: 섹션 진입 시 한 번
  - 남은 일/시/분/초 4개 카드: 0 → 실제값 카운트업, 1.0s, ease-out cubic
  - 카드 자체는 `cubic-bezier(0.34, 1.56, 0.64, 1)` scale 0.9 → 1.0, 400ms, stagger 80ms
- **결혼식 당일(7일) 셀 펄스**:
  - scale 1.0 → 1.08 → 1.0, 800ms, 3회 반복 후 무한 호흡(2.5s 주기 1.0↔1.05)
  - 배경 코랄(#E54C2E) 원 + 흰 텍스트
- prefers-reduced-motion: 카운트업 즉시 최종값 표시, 셀 펄스 OFF (정적 코랄 원)

### Gallery 섹션
- 갤러리 컨테이너: fade-up
- (Should) 각 갤러리 썸네일 카드 진입 시 살짝 회전 효과:
  - 초기: `rotate(-1.5deg) scale(0.96)`
  - 진입: `rotate(0deg) scale(1.0)`, 500ms `cubic-bezier(0.34, 1.56, 0.64, 1)`, stagger 100ms
- prefers-reduced-motion: 즉시 rotate(0) scale(1.0) 표시

### Venue / 약도 섹션
- 약도 일러스트: fade-up + scale 0.96 → 1.0 (500ms)
- (Should) **위치 핀 통통 bounce**:
  - 약도 위에 오버레이된 코랄 핀 마커
  - 진입 시 translateY(-12px → 0), 600ms `cubic-bezier(0.34, 1.56, 0.64, 1)` (bounce-in)
  - 진입 완료 후 무한 호흡: translateY 0 ↔ -3px, 2s alternate ease-in-out
- 주소/교통/주차 정보 카드: fade-up stagger 120ms
- prefers-reduced-motion: 핀 무한 호흡 OFF, 초기 위치 정적 표시

### Account 섹션
- "마음 전하실 곳" 헤더: fade-up
- (Should) **계좌 박스 아코디언**:
  - 신랑측 / 신부측 두 박스가 토글로 열림
  - 닫힘 상태 height: 0, opacity: 0; 열림 상태 height: auto, opacity: 1
  - max-height 트릭(`max-height: 0 → 600px`)으로 transition: 350ms ease-in-out
  - 화살표 아이콘: rotate(0 → 180deg), 350ms
- prefers-reduced-motion: transition duration 0ms (즉시 토글)

### RSVP 섹션
- 헤더 + 안내문 fade-up
- "참석 의사 전달하기" 버튼: fade-up + 살짝 scale 0.95 → 1.0 (400ms)
- prefers-reduced-motion: 정적 표시

### Share 섹션
- 카카오 공유 버튼 + 링크 복사 버튼: fade-up stagger 100ms

### Footer
- (Nice-to-have) 작은 하트 펄스 1개: scale 1.0 ↔ 1.15, 1.6s alternate ease-in-out
- prefers-reduced-motion: 정적 표시

---

## 3. 인터랙티브 요소

### 3.1 BGM 토글 (Must)
- **위치**: 우상단 floating, `position: fixed; top: 16px; right: 16px; z-index: 50;`
- **모양**: 둥근 흰색 버튼 (44×44px), 머스타드 옐로우 보더 2px, 라운드 50%
- **아이콘 상태**:
  - 정지 시: 음표(♪) 아이콘, 회색
  - 재생 시: 음표 + 옆에 작은 이퀄라이저 3바 (각 1.5px 폭, 높이 6/10/14px alternate, 0.4/0.5/0.6s ease-in-out infinite)
- **자동재생**: 시도 (muted로) 후 unmute 시도하지 않음. 차단되면 사용자 토글 대기.
- **첫 클릭 시 페이드인**: `audio.volume` 0 → 0.4 까지 1.5s ease-in.
- **음원**: `audio/bgm.mp3` (이미 존재 확인됨)
- **클릭 인터랙션**: 버튼 자체 scale 0.92 → 1.0, 200ms
- **(Nice-to-have) Ripple**: 활성화 시 버튼 주변에 코랄/머스타드 원형 ripple 1회 (scale 1 → 2.0, opacity 0.4 → 0, 600ms)
- **접근성**: `aria-label="배경음악 토글"`, `aria-pressed` 상태 동기화, 키보드 Space/Enter 지원
- **prefers-reduced-motion**: 이퀄라이저 바 OFF (정적 ♪ + 작은 점), ripple OFF

### 3.2 갤러리 스와이프 + 핀치 줌 (Must)
- **라이브러리**: 없음 (touch event + transform)
- **레이아웃**: `display: flex; overflow-x: hidden;` 컨테이너 안에 슬라이드 카드들 가로 배치
- **스와이프 동작**:
  - touchstart: startX 기록, transition 제거
  - touchmove: `translateX(currentOffset + dx)`, passive listener
  - touchend: `|dx| > 50px`이면 prev/next, 그렇지 않으면 원위치
  - 전환 transition: `transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1)`
- **인디케이터**: 하단 dot 5개 (예시), 현재 인덱스 dot은 width 8px → 20px 확장 + 코랄, 200ms ease-out
- **자동 슬라이드**: viewport 진입 시 5초 간격 next. 사용자 swipe/tap 시 10초간 일시정지.
- **Lightbox**:
  - 갤러리 카드 탭 → 풀스크린 모달 (overlay opacity 0 → 0.85, 250ms)
  - 모달 안 이미지 초기 scale 0.92 → 1.0 (300ms `cubic-bezier(0.34, 1.56, 0.64, 1)`)
  - 닫기: 우상단 X 버튼 또는 overlay 탭
- **핀치 줌**:
  - lightbox 내에서 두 손가락 핀치 → scale 1 ↔ 3 (최대), transform-origin은 두 손가락 중심점
  - 더블 탭: scale 1 ↔ 2 toggle, 250ms
  - scale > 1일 때 pan(translate) 가능
- **햅틱**: 슬라이드 전환 시 `navigator.vibrate(10)` (지원 시)
- **접근성**: 이전/다음 버튼(스크린리더용), `aria-roledescription="carousel"`, 인디케이터 `aria-label="슬라이드 N"`
- **prefers-reduced-motion**: 자동 슬라이드 OFF, 전환 duration 150ms로 축소, lightbox scale 진입 OFF

### 3.3 계좌 복사 버튼 (Must)
- **마크업**: 각 계좌 라인에 "복사" 버튼
- **클릭 동작**:
  - `navigator.clipboard.writeText(accountNumber)`
  - 성공 시: 버튼 텍스트 "복사" → 코랄 체크(✓) 아이콘 swap, 1.5s 후 원복
  - 버튼 자체: scale 0.94 → 1.05 → 1.0, 350ms `cubic-bezier(0.34, 1.56, 0.64, 1)` (통통)
- **토스트**: 화면 하단에서 위로 슬쩍 등장
  - 초기: `translateY(60px); opacity: 0`
  - 진입: `translateY(0); opacity: 1`, 300ms ease-out
  - 1.6s 유지 후 fade-out: opacity 1 → 0, translateY 0 → -10px, 300ms ease-in
  - 메시지: "계좌번호가 복사되었습니다"
  - 색: 다크 브라운(#2B2118) 배경, 흰 텍스트, 라운드 24px pill
- **햅틱**: `navigator.vibrate(15)` (지원 시)
- **접근성**: 토스트 `role="status" aria-live="polite"`, 버튼 `aria-label="계좌번호 복사"`
- **prefers-reduced-motion**: 토스트 transition 100ms 짧게, 버튼 scale 효과는 즉시 (애니메이션 없음)

### 3.4 D-day 카운트다운 (Must)
- **표기 방식**: 4개 카드(일/시/분/초) 가로 배치 + 상단에 "D-N" 빅 텍스트
- **카운트업 (페이지/섹션 진입 시 1회)**:
  - 4개 카드의 숫자: 0 → 실제 남은값까지 1.0s, ease-out cubic
  - 진입 후 실시간 갱신은 분 단위로만 (setInterval 60s)
- **카드 모양**: 흰색 카드, 라운드 12px, 안에 큰 숫자(Fredoka 또는 Black Han Sans) + 작은 라벨(일/시간/분/초)
- **D-N 텍스트**: 코랄(#E54C2E), Bungee 폰트, 그림자 살짝
  - 진입 시 scale 0.85 → 1.0, 500ms `cubic-bezier(0.34, 1.56, 0.64, 1)`
- **(Nice-to-have) D-N 발광 호흡**: text-shadow 0 0 8px rgba(229,76,46,0.3) ↔ 0 0 16px rgba(229,76,46,0.5), 3s alternate
- **접근성**: `aria-label="결혼식까지 N일 N시간 남았습니다"`
- **prefers-reduced-motion**: 카운트업 즉시 최종값 표시, 발광 호흡 OFF, 카드 scale 진입 OFF

### 3.5 RSVP 버튼 (Must)
- 외부 폼(구글 폼/네이버 폼 등) 링크 버튼
- 모양: 코랄(#E54C2E) 솔리드 pill 버튼 + 흰 텍스트 "참석 의사 전달하기"
- 호버/탭 시: scale 0.96, 150ms; 탭 후 외부 링크 새 창
- prefers-reduced-motion: 정적 (호버 효과 없이 색만 살짝 변화)

### 3.6 카카오톡 공유 + 링크 복사 (Must)
- **카카오 공유 버튼**:
  - 모양: 카카오 옐로우(#FEE500) 솔리드 pill + "카카오톡으로 공유하기"
  - Kakao SDK 로드되어 있으면 `Kakao.Share.sendDefault({...})`, 아니면 fallback으로 링크 복사
  - 탭 시: scale 0.94 → 1.0, 200ms + 옐로우 펄스 (box-shadow 0 0 0 0 rgba(254,229,0,0.7) → 0 0 0 12px rgba(254,229,0,0), 600ms)
  - 햅틱 vibrate(10)
- **링크 복사 버튼**:
  - 모양: 흰색 + 다크 브라운 보더 1.5px, "청첩장 링크 복사"
  - 동작: `navigator.clipboard.writeText(location.href)` + 동일 토스트 패턴(3.3과 공유)
  - 햅틱 vibrate(10)
- **접근성**: 각 버튼 `aria-label`
- **prefers-reduced-motion**: 펄스 OFF, scale 효과는 즉시

### 3.7 길찾기 버튼 (venue 섹션)
- 카카오맵 / 네이버맵 / T맵 3종 외부 링크 버튼
- 모양: 라운드 pill 흰 배경 + 각 서비스 컬러 보더
- 탭 시: scale 0.96, 150ms
- 외부 링크 새 창

### 3.8 스크롤 인디케이터 (hero 하단)
- 모양: 이중 화살표 ⌄⌄ (코랄 또는 다크 브라운)
- 동작: translateY(0 ↔ 6px), 1.4s alternate ease-in-out, 무한
- scroll 시작(scrollY > 80) 시 페이드아웃 (300ms)
- prefers-reduced-motion: 정적 화살표, bounce OFF

### 3.9 마이크로 인터랙션 (모든 버튼 공통)
- hover (데스크탑): scale 1.03, 150ms ease-out
- active/tap: scale 0.96, 100ms
- focus-visible: 코랄 outline 2px offset 2px

---

## 4. 트랜지션 & 디테일 모음

| 요소 | 효과 | duration | easing |
|------|------|----------|--------|
| 모든 버튼 active | scale 0.96 | 100ms | ease-out |
| 모든 버튼 hover | scale 1.03 | 150ms | ease-out |
| 섹션 진입 fade-up | opacity + translateY(20→0) | 450ms | bouncy `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| 토스트 등장 | translateY(60→0) + opacity | 300ms | ease-out |
| 토스트 퇴장 | translateY(0→-10) + opacity | 300ms | ease-in |
| 갤러리 슬라이드 | translateX | 350ms | bouncy |
| Lightbox 등장 | scale 0.92→1.0 + opacity | 300ms | bouncy |
| 계좌 아코디언 | max-height | 350ms | ease-in-out |
| BGM 페이드인 | volume 0→0.4 | 1500ms | linear |
| 구름 패럴랙스 | translateX | 40-60s | linear infinite |
| 파티클 한 입자 수명 | translateY + sway | 14-22s | linear (sin sway 별도) |

---

## 5. CSS 변수 / 토큰

frontend-developer는 다음 CSS 변수를 그대로 사용해 일관된 모션 톤을 확보한다:

```css
:root {
  /* === EASING === */
  --ease-bouncy: cubic-bezier(0.34, 1.56, 0.64, 1);   /* 통통 등장, 오버슛 */
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);      /* 일반 부드러움 */
  --ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1);    /* 부드러운 감속 */
  --ease-in-out-soft: cubic-bezier(0.45, 0, 0.55, 1); /* 호흡/반복 */

  /* === DURATION === */
  --dur-instant: 100ms;
  --dur-fast: 200ms;
  --dur-base: 350ms;     /* 통통 마이크로 인터랙션 기본 */
  --dur-mid: 450ms;      /* 섹션 진입 fade-up */
  --dur-slow: 600ms;     /* 캐릭터 통통 등장, 핀 bounce */
  --dur-toast: 300ms;
  --dur-countup: 1000ms;
  --dur-bgm-fadein: 1500ms;
  --dur-loop-breath: 2500ms;
  --dur-loop-cloud-near: 40s;
  --dur-loop-cloud-far: 60s;
  --dur-loop-particle: 18s;

  /* === MOTION OFFSETS === */
  --translate-fade-up: 20px;
  --translate-toast-in: 60px;
  --scale-bouncy-in: 0.85;
  --scale-tap: 0.96;
  --scale-hover: 1.03;
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --dur-instant: 0ms;
    --dur-fast: 0ms;
    --dur-base: 0ms;
    --dur-mid: 0ms;
    --dur-slow: 0ms;
    --dur-toast: 100ms;     /* 토스트는 너무 깜빡이지 않게 짧게 유지 */
    --dur-countup: 0ms;
    --translate-fade-up: 0px;
    --translate-toast-in: 20px;
    --scale-bouncy-in: 1;
    --scale-tap: 1;
    --scale-hover: 1;
  }
}
```

---

## 6. prefers-reduced-motion 분기 정책 (한눈에)

| 모션 종류 | 정상 | reduced |
|----------|------|---------|
| 파티클 (Canvas) | 16개 떠다님 | **OFF** + 정적 SVG 4개 |
| 구름 패럴랙스 | 좌우 흐름 | **OFF** + 정지 위치 |
| Hero 진입 시퀀스 | stagger + scale | 동시 표시 (0ms) |
| 섹션 fade-up | 20px translateY + opacity | opacity만 (즉시) |
| D-day 카운트업 | 1.0s 카운트 | 최종값 즉시 |
| D-day 셀 펄스 | 무한 호흡 | **OFF** |
| Hero 이름 호흡 | scale 무한 | **OFF** |
| 위치 핀 bounce + 호흡 | 진입 bounce + 무한 호흡 | **OFF** |
| BGM 이퀄라이저 바 | 3바 무한 | **OFF** + 정적 ♪ |
| 버튼 펄스/ripple | 활성 시 ripple | **OFF** |
| 갤러리 자동 슬라이드 | 5초 간격 | **OFF** (수동만) |
| 핀치 줌/스와이프 | 정상 | 정상 (사용자 입력 기반은 유지) |
| 토스트 슬라이드 인 | 60px + 300ms | 20px + 100ms |
| 푸터 하트 펄스 | 1.6s alternate | **OFF** |

JS 진입점에서 한 번 체크:
```js
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Canvas 파티클, 구름 패럴랙스, 자동 슬라이드, 호흡 루프는 reduced일 때 스킵/정지
```

---

## 7. 구현 우선순위

### Must (있어야 청첩장이 완성됨)
- 1.A 파티클 배경 (16개, 하트/잎사귀/꽃잎 혼합)
- 2 섹션별 fade-up (`IntersectionObserver` + `--ease-bouncy`)
- 2 Hero 진입 시퀀스 (영문 헤드라인 통통 + stagger)
- 3.1 BGM 토글 (audio/bgm.mp3, 첫 인터랙션 후 페이드인)
- 3.2 갤러리 스와이프 + 핀치 줌 lightbox
- 3.3 계좌 복사 버튼 + 토스트 + 햅틱
- 3.4 D-day 카운트다운 (4 카드 + D-N)
- 3.5 RSVP 외부 폼 링크 버튼
- 3.6 카카오 공유 + 링크 복사
- 6 prefers-reduced-motion 분기 전체

### Should (있으면 청첩장 만듦새가 한 단계 올라감)
- 1.B Hero 구름 패럴랙스 (이미지 자산 필요)
- 2 Hero 캐릭터 통통 등장 (이미지 분리 시)
- 2 Greeting 단어 stagger reveal
- 2 Gallery 카드 진입 회전 (-1.5° → 0°)
- 2 Venue 위치 핀 통통 bounce + 호흡
- 3.4 D-day 셀 펄스
- 4 계좌 박스 아코디언 토글

### Nice-to-have (여유 있을 때만, 컨셉 강화 디테일)
- 2 Hero 이름 따뜻한 호흡 (4s alternate)
- 3.1 BGM 토글 ripple
- 3.4 D-N 발광 호흡
- 푸터 작은 하트 펄스
- 패럴랙스 hero 캐릭터 스크롤 미세 이동

---

## 8. 성능 가드레일

- 동시 활성 파티클 ≤ 20
- Canvas는 단일 인스턴스, IntersectionObserver로 viewport 외 일시정지 (`cancelAnimationFrame`)
- 모든 애니메이션은 `transform` / `opacity` 만 사용 — `width/height/top/left/margin` 금지
- `will-change`는 모션이 시작되는 순간에만 추가하고, 완료 후 제거
- `box-shadow` / `filter: blur()` 는 정적 요소에만 사용 (애니메이션 X)
- scroll handler는 `passive: true` + IntersectionObserver 우선
- 폰트는 `font-display: swap` 으로 FOIT 방지

---

## 9. image-artist 협의 사항

> motion-designer가 image-artist에게 요청하는 자산:

1. **흰 구름 PNG (투명 배경)** 2~3종 — hero 패럴랙스용. 가로 [180~280]px, 세로 [80~140]px 권장. 동화 일러스트 톤(둥근 윤곽선, 약한 셰이딩).
2. **(있으면 좋음) 작은 신랑/신부 캐릭터 분리 PNG** — hero 통통 등장 효과를 위해 hero 배경 일러스트와 캐릭터를 분리 (Should 우선순위). 분리 자산이 없으면 hero 일러스트 한 장으로 등장만 처리.
3. **파티클은 Canvas로 그리므로 별도 자산 불필요.** (필요 시 잎사귀 SVG 1종을 데코 세트에 포함하면 reduced-motion fallback에 재활용 가능)

---

## 10. frontend-developer 인계 노트

- 본 명세의 모든 CSS 변수는 컨셉 시트의 폰트/팔레트 변수와 함께 `:root`에 정의
- 모션 진입점 JS는 단일 `init()` 함수에서 `prefers-reduced-motion` 1회 체크 후 분기
- 각 인터랙티브 요소는 모듈화 권장: `initParticles()`, `initGallery()`, `initBGM()`, `initCountdown()`, `initCopyAccount()`, `initShare()` 등
- 햅틱 호출은 모두 try-catch 또는 `if ('vibrate' in navigator)` 가드
- Canvas 리사이즈 핸들러는 debounce 150ms

---

## 11. 접근성 한 줄 정리

모든 무한 루프 모션은 `prefers-reduced-motion: reduce` 시 자동 OFF되며, 진입 모션은 즉시(0ms) 표시로 강등된다. 모든 인터랙티브 버튼은 `aria-label`과 키보드(Space/Enter) 접근을 보장하며, 토스트는 `aria-live="polite"`로 스크린리더에 안내된다.
