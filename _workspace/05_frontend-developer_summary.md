# Frontend Developer 구현 요약 — 한태현 ♥ 옥정미

> 입력: 컨셉 시트(머스타드+코랄+스카이 동화 카툰), 카피(사용자 원문 인사말 보존), 이미지 매니페스트(텍스트 아티팩트 crop/대체 정책), 모션 명세(storybook-bouncy)
> 출력: `index.html`, `style.css`, `script.js`

---

## 1. 파일 구조

```
wedding-letter/
├── index.html        (431 lines)
├── style.css         (1117 lines)
├── script.js         (739 lines)
├── audio/bgm.mp3     (기존)
└── images/
    ├── hero-illustration.png         (사용 + crop)
    ├── gallery-placeholder-01~05.png (사용 + 각자 crop)
    ├── venue-map-illustration.png    (사용 + crop)
    ├── section-divider-flowers.png   (미사용 → SVG 대체)
    ├── couple-icon-{groom,bride}.png (미사용 → SVG 하트 대체)
    └── og-thumbnail.png              (미사용 → gallery-02 og:image 사용)
```

---

## 2. 모션 명세 구현 매핑

### Must (전부 구현 ✅)

| # | 항목 | 구현 위치 | 비고 |
|---|------|----------|------|
| 1.A | 파티클 배경 16개 (하트/잎/꽃잎) | `script.js` `initParticles()` | Canvas 2D, dpr 보정, IntersectionObserver+visibilitychange로 일시정지. 3종 색상 비율 30/35/35% |
| 2 | 섹션 fade-up | `style.css` `.fade` + `script.js` `initFadeUp()` | `cubic-bezier(0.34, 1.56, 0.64, 1)` 오버슛, threshold 0.15 |
| 2 | Hero 진입 시퀀스 (영문 통통 + stagger) | `style.css` `@keyframes heroEyebrowIn/heroNamesIn/heroDateIn` | 250/550/850/1000/1200ms delay |
| 3.1 | BGM 토글 (페이드인 0→0.4 1.5s) | `script.js` `initBGM()` | `audio/bgm.mp3`, 첫 클릭 시 fadeIn, 이퀄라이저 3바 |
| 3.2 | 갤러리 스와이프 + 핀치 줌 | `script.js` `initGallery()` + `initLightbox()` | touch/mouse 드래그, 더블탭, 두 손가락 pinch, pan |
| 3.3 | 계좌 복사 + 토스트 + 햅틱 | `script.js` `initCopyButtons()` `showToast()` | navigator.clipboard + execCommand fallback, vibrate(15) |
| 3.4 | D-day 카운트다운 (4 카드 + D-N) | `script.js` `initDDay()` | 진입 시 1회 카운트업(1.0s ease-out cubic), 이후 setInterval 1초 |
| 3.5 | RSVP 외부 폼 버튼 | `script.js` `initRSVP()` | placeholder href="#"일 때 토스트 안내 |
| 3.6 | 카카오 공유 + 링크 복사 | `script.js` `initShare()` | Kakao SDK 있으면 sendDefault, 없으면 navigator.share → clipboard fallback |
| 6 | prefers-reduced-motion 분기 | `:root @media reduce` + JS `isReduced()` | 모든 무한 루프 OFF, 진입 모션 0ms |

### Should (대부분 구현 ✅)

| # | 항목 | 구현 위치 | 상태 |
|---|------|----------|------|
| 1.B | Hero 구름 패럴랙스 | — | **미구현** (구름 PNG 별도 자산 없음. hero-illustration에 구름이 일러스트로 포함됨) |
| 2 | Hero 캐릭터 통통 등장 | — | **미구현** (캐릭터 분리 PNG 없음. hero 일러스트 한 장으로 진입 페이드인 처리) |
| 2 | Greeting 단어 stagger reveal | — | **간소화** (헤더 fade-up + 본문 fade-up으로 처리, word-level reveal 생략) |
| 2 | Gallery 카드 진입 회전 | — | **미구현** (카드는 carousel로 항상 하나만 보임, 회전 효과 부적합) |
| 2 | Venue 위치 핀 통통 bounce + 호흡 | `style.css` `@keyframes pinBounceIn/pinBreath` | ✅ 진입 600ms bounce + 2s 호흡 |
| 3.4 | D-day 셀 펄스 | `style.css` `@keyframes todayPulse` | ✅ 2.5s alternate 1.0↔1.08 |
| 4 | 계좌 박스 아코디언 | `<details>` + `.acc-arrow` rotate | ✅ 화살표 180deg 회전 |

### Nice-to-have (선별 구현)

| # | 항목 | 상태 |
|---|------|------|
| Hero 이름 따뜻한 호흡 (4s alternate) | ✅ `@keyframes heroBreath` |
| BGM 토글 ripple | ❌ 미구현 (CSS 펄스만) |
| D-N 발광 호흡 | ✅ `@keyframes ddayGlow` 3s alternate |
| 푸터 작은 하트 펄스 | ✅ `@keyframes footerHeart` 1.6s alternate |
| 카카오 버튼 옐로우 펄스 | ✅ `@keyframes kakaoPulse` 클릭 시 600ms |
| 패럴랙스 hero 캐릭터 미세 이동 | ❌ 미구현 (캐릭터 분리 자산 없음) |

---

## 3. 이미지 매니페스트 정책 매핑

| 자산 | 매니페스트 분류 | 실제 처리 |
|------|----------------|----------|
| `hero-illustration.png` | ✅ 사용 (crop) | `.hero-img { object-fit: cover; object-position: center 85% }` — 상단 "Married" 영역 잘라냄 |
| `gallery-placeholder-01.png` | ✅ 사용 (상단 15% crop) | `.gallery-card--01 img { object-position: center 88% }` |
| `gallery-placeholder-02.png` | ✅ 사용 (그대로) | `.gallery-card--02 img { object-position: center }` |
| `gallery-placeholder-03.png` | ✅ 사용 (강한 crop) | `.gallery-card--03 img { object-position: center 92% }` |
| `gallery-placeholder-04.png` | ✅ 사용 (하단 띠 crop) | `.gallery-card--04 img { object-position: center 20% }` |
| `gallery-placeholder-05.png` | ✅ 사용 (강한 crop) | `.gallery-card--05 img { object-position: center 92% }` |
| `venue-map-illustration.png` | ✅ 사용 (상단 25% crop) | `.venue-map { object-position: center bottom; aspect-ratio: 16/9 }` |
| `section-divider-flowers.png` | ❌ 미사용 → SVG | 매 섹션마다 인라인 SVG 디바이더 (점선 + 코랄 하트 + 양쪽 잎사귀) 직접 작성 |
| `couple-icon-groom.png` | ❌ 미사용 → SVG | 신랑/신부 이름 앞에 인라인 SVG 하트 한 개 |
| `couple-icon-bride.png` | ❌ 미사용 → SVG | (위와 동일) |
| `og-thumbnail.png` | ❌ 미사용 → gallery-02 | `<meta property="og:image" content="images/gallery-placeholder-02.png">` |

**CSS 텍스트 처리** (이미지 위 오버레이):
- Hero 헤드라인 "We're Getting Married!" — `font-family: Bungee`, 코랄 색상, white text-shadow로 입체감
- 신랑신부 이름 "한태현 · 옥정미" — `font-family: Black Han Sans`
- 날짜 "2026. 11. 07 SAT 12:30 PM" — `font-family: Fredoka` + 반투명 흰 배경 pill
- venue 약도 위에는 부모 함자 표시 없음 (couple-intro 섹션에서 HTML 텍스트로 별도 표시)

---

## 4. Placeholder 위치 (사용자가 직접 채울 영역)

| 위치 | 현재 값 | 교체 방법 |
|------|---------|----------|
| 신랑 본인 계좌 | `[○○은행 000-0000-000000]` | `index.html` account 섹션 `data-copy` + `<span class="acc-bank">` 동시 교체 |
| 신랑 아버지(한상철) 계좌 | 동일 | 동일 |
| 신랑 어머니(백은하) 계좌 | 동일 | 동일 |
| 신부 본인 계좌 | 동일 | 동일 |
| 신부 아버지(옥명호) 계좌 | 동일 | 동일 |
| 신부 어머니(김인자) 계좌 | 동일 | 동일 |
| RSVP 폼 URL | `<a id="rsvp-btn" href="#">` | href만 외부 폼 URL로 교체 (구글폼/네이버폼/Tally 등) |
| 카카오 JS SDK key | HTML 주석으로 비활성화 | `<head>` 안 주석 해제 + `Kakao.init("KEY")` (없어도 og 메타로 미리보기는 동작) |
| og:image 절대 URL | 상대 경로 `images/gallery-placeholder-02.png` | 배포 도메인 확정 시 `https://your-domain/images/...`로 교체 |
| og:url | `https://example.com/` | 동일 |

---

## 5. 디자인 토큰 매핑

### 컬러 (CSS custom property)
- `--color-primary: #F5C84C` (mustard)
- `--color-secondary: #5BB4E8` (sky blue)
- `--color-accent: #E54C2E` (coral red)
- `--color-success: #3F8F4A` (forest green)
- `--color-warm: #E89A4D` (amber)
- `--color-bg: #FFFAF0` (cream)
- `--color-surface: #FFFFFF`
- `--color-text: #2B2118` (dark brown)
- `--color-text-muted: #6B5A4A`

### 폰트 (Google Fonts CDN 1회 로드)
- `--font-ko-display`: Black Han Sans (섹션 헤더, 신랑신부 이름)
- `--font-ko-display-alt`: Jua (보조 디스플레이, dir-block h3, venue-place)
- `--font-ko-serif`: Gowun Batang (인사말 본문, 캡션)
- `--font-ko-sans`: Pretendard (정보 라인, 주소, 계좌)
- `--font-en-display`: Bungee (Hero "We're Getting Married!", D-N)
- `--font-en-display-alt`: Fredoka (eyebrow, 날짜, dday-val)
- `--font-en-script`: Caveat ("With love,", footer)

### 모션 토큰
모션 명세 §5의 모든 변수(`--ease-bouncy`, `--ease-standard`, `--ease-out-soft`, `--ease-in-out-soft`, `--dur-*`, `--translate-*`, `--scale-*`)를 `:root`에 그대로 옮기고, `prefers-reduced-motion` 미디어쿼리에서 duration 0ms / scale 1 / translate 0 으로 강등.

---

## 6. 반응형

- 모바일 우선 375px 기준 설계
- `max-width: 480px` `.card` 컨테이너 중앙 정렬
- 768px 이상: body padding 32px, `.card`에 라운드 24px + 부드러운 그림자 (데스크톱 카드형)
- 360px 이하: 섹션 headline 24px / hero eyebrow 20px / hero names 32px / btn min-width 180px 축소
- 가로 스크롤 방지: `body { overflow-x: hidden }`, 갤러리 viewport는 `overflow: hidden` + transform translateX

---

## 7. 접근성 체크

- 모든 `<img>`에 의미 있는 alt 또는 빈 alt (장식)
- 시멘틱 태그: `<header>` 대신 `<main>`, `<section aria-label>`, `<footer>`, `<button type="button">`, `<a rel="noopener">`
- 인터랙티브 버튼 전부 `aria-label`
- 토스트 `role="status" aria-live="polite"`
- BGM 토글 `aria-pressed` 동기화, 키보드 Space/Enter 지원 (button 기본)
- 갤러리 `aria-roledescription="carousel"`, dot button `aria-label="슬라이드 N"`
- Lightbox `role="dialog" aria-modal="true"`, ESC 닫기
- focus-visible outline 코랄

---

## 8. 성능

- 이미지 `loading="lazy"` (hero만 `fetchpriority="high"`)
- 모든 `<img>`에 width/height 명시 (CLS 방지)
- Canvas 파티클: `devicePixelRatio` 보정 (max 2로 cap), IntersectionObserver로 viewport 밖 일시정지, `visibilitychange`로 백그라운드 탭 일시정지, 모바일 16개 / 데스크톱 20개
- 애니메이션은 `transform`/`opacity`만 사용
- `will-change: opacity, transform`은 `.fade` / `.gallery-track`에 한정
- 폰트 `font-display: swap`은 Google Fonts URL에 명시
- Pretendard만 별도 jsdelivr CDN (subset 가능하지만 풀 포함)

---

## 9. 배포 가이드

### GitHub Pages (이미 활성화 상태)
1. 모든 파일을 main 브랜치에 commit & push
2. 자동 배포됨 → `https://<username>.github.io/wedding-letter/`
3. og:image / og:url를 절대 URL로 교체 (카카오톡 미리보기 정상 작동에 필수)

### 즉시 사용 가능한 채널
- 정적 호스팅 (Netlify, Vercel, Cloudflare Pages 등) — 빌드 스크립트 없이 그대로 deploy
- 압축본을 Notion/Google Drive에 올려도 동작

### 사용자가 직접 채워야 할 것 (Day-of)
1. **계좌번호 6개** — `index.html`에서 `[○○은행 000-0000-000000]` 6곳과 `data-copy="000-0000-000000"` 6곳을 함께 교체
2. **RSVP 폼 URL** — `<a id="rsvp-btn" href="#">`의 href를 구글폼/네이버폼 등 외부 폼 URL로 교체
3. **og:url / og:image 절대 URL** — 도메인 확정 시 절대 경로로 교체
4. **(선택) 카카오 JS SDK** — JS key 발급 후 HTML 주석 해제

### QA 인계
다음 항목 검증 요청:
- 정보 정합성 5항목 (신랑신부, 부모, 일시, 장소, 교통) 1글자 단위
- 360px 폭에서 hero 영문 헤드라인 줄바꿈 여부
- `prefers-reduced-motion` 분기: 파티클·구름·호흡·자동슬라이드·발광 모두 OFF
- 컬러 대비: 머스타드 배경 위 다크 브라운 텍스트 / 코랄 텍스트는 크림 위에서만 사용 (WCAG AA)
- 갤러리 스와이프·핀치 줌·더블탭 동작
- 계좌 복사 → 토스트 + 햅틱
- BGM 토글 → 자동재생 차단 시 사용자 클릭으로만 재생

---

## 10. 외부 의존성 요약

| 리소스 | 용도 | 필수 여부 |
|--------|------|----------|
| Google Fonts CSS2 | Black Han Sans, Jua, Gowun Batang, Bungee, Fredoka, Caveat 6종 한 번에 로드 | 필수 |
| jsdelivr Pretendard CSS | 한글 본문 폰트 | 필수 |
| (선택) Kakao JS SDK 2.7.2 | 카카오톡 공유 sendDefault | 선택 (없어도 navigator.share / clipboard fallback) |

라이브러리(jQuery, GSAP, Framer Motion 등) 일체 없음. vanilla JS + Canvas 2D + CSS만 사용.

---

## 11. 알려진 제약 / 향후 개선 후보

- **Hero 구름 패럴랙스**: 구름 PNG 자산이 없어 미구현. 추후 image-artist가 흰 구름 PNG 2-3종 제공하면 hero 상단에 absolute로 배치 + `@keyframes` 좌우 흐름만 추가하면 됨
- **Hero 캐릭터 통통 등장**: 캐릭터 분리 PNG가 없어 hero 일러스트 한 장 전체 페이드인으로 갈음
- **Greeting 단어별 stagger reveal**: HTML 마크업 복잡도 증가 대비 효과가 미미해 헤더+본문 fade-up으로 갈음
- **Gallery 카드 진입 회전**: carousel 구조에서는 카드가 항상 하나만 보여 회전 진입 효과 부적합. 격자형 그리드일 때 의미 있는 효과
- **BGM 자동재생**: 모바일 브라우저 정책상 사용자 인터랙션 없이 재생 불가. 첫 토글 클릭 시 정상 재생 + 페이드인 동작
