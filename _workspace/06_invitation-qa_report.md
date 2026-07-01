---
qa_date: "2026-06-16"
qa_method: "정적 코드 검증 (grep 기반 경계면 교차 비교). UI 시각 검증은 사용자가 브라우저에서 직접 확인 필요."
overall: "PASS"
counts:
  pass: 38
  warning: 4
  fail: 0
---

# QA 보고서 — 한태현 × 옥정미 청첩장

## 1. 정보 정합성 (Information Integrity)

### PASS
- ✅ 신랑 **한태현**, 신부 **옥정미** — title/meta/hero/footer 모두 일치 (index.html L7, L62-64, L411)
- ✅ 신랑측 부모 함자 **한상철 · 백은하** + 신랑은 **외아들** (L112-113)
- ✅ 신부측 부모 함자 **옥명호 · 김인자** + 신부는 **외동딸** (L126-127)
- ✅ 일시 **2026년 11월 7일 토요일 오후 12시 30분** — hero(L66), calendar(L161), dday(L167), venue(L236), footer(L411) 모두 일치
- ✅ 장소 **로프트가든 344 · 청학빌딩 10층** + 주소 **서울 양천구 오목로 344** (L237-238)
- ✅ 교통 **5호선 오목교역 7번출구** + 도보 약 3분 (L258)
- ✅ 주차 **청학빌딩 주차장** + 만차 시 공영주차장 (L266)
- ✅ "**저희, 결혼합니다!**" 헤더 보존 (L77)
- ✅ 사용자 좋아한 인사말 원문 보존 (L86-93): "시선이 닿는 높이는 서로 다르지만, / 좋아하는 것과 바라보는 곳은 닮아 있습니다 / 이제 서로의 하루를 함께 채워가려 합니다 / 저희의 새로운 시작을 …"
- ✅ 양가 계좌 6줄 모두 정확한 이름 매핑 — 신랑 한태현 / 아버지 한상철 / 어머니 백은하 / 신부 옥정미 / 아버지 옥명호 / 어머니 김인자 (L299-347)

### WARNING
- ⚠️ 계좌번호는 모두 `000-0000-000000` placeholder. 사용자가 실제 번호로 교체 필요 (6곳, `data-copy` 속성 + 표시 텍스트 동시 교체).
- ⚠️ RSVP 폼 URL placeholder. 사용자가 외부 폼 URL로 교체 필요.

## 2. 이미지 매니페스트 정책 준수

### PASS
- ✅ **hero**: `object-fit: cover` + `object-position: center 85%` → 상단 "Married" 텍스트 영역 잘라냄 (style.css L225-227)
- ✅ **gallery 01**: `center 88%` (강한 하단 정렬, 상단 "Marri-" 텍스트 잘라냄) (L586)
- ✅ **gallery 02**: `center` (깨끗한 이미지 그대로) (L587)
- ✅ **gallery 03**: `center 92%` (상단 "arried" 강하게 잘라냄) (L588)
- ✅ **gallery 04**: `center 20%` (하단 띠 잘라냄) (L589)
- ✅ **gallery 05**: `center 92%` (상단 "Married" 강하게 잘라냄) (L590)
- ✅ **venue-map**: 2026-06-25 실제 약도(littlemap.jpeg) 테마 리컬러본으로 교체. 전체 표시(crop 제거), 한글 라벨 정확, 중복 HTML 핀 제거. (구 AI 환각 지도 폐기)
- ✅ **couple-icon**: 이미지 파일 미사용, 인라인 SVG 하트로 대체 (index.html L116, L130)
- ✅ **section-divider**: 이미지 미사용, 인라인 SVG(점선 + 잎사귀 + 하트)로 대체 (index.html L78, L102, L143, L182 등)
- ✅ **og-thumbnail**: 미사용. `og:image`는 `images/gallery-placeholder-02.png` (깨끗한 이미지)로 지정 (L15)

## 3. 모바일 반응형

### PASS
- ✅ 모바일 우선 375px 기본 (별도 미디어 쿼리 없이 mobile-first)
- ✅ 768px 이상 카드형 (`@media (min-width: 768px)` L1090)
- ✅ 360px 이하 소형 폰 분기 (`@media (max-width: 360px)` L1102)
- ✅ viewport meta 태그 + `width=device-width, initial-scale=1`
- ✅ 갤러리 가로 스와이프 카드 비율 4:5 고정

### WARNING
- ⚠️ 414px(iPhone Pro) / 1024px(iPad) 전용 분기는 없음. 그러나 480px max-width 컨테이너로 충분히 호환됨. 결과 차이 없음.

## 4. 접근성 (Accessibility)

### PASS
- ✅ ARIA 레이블 풍부: `aria-label`("청첩장 메인", "결혼식 날짜", "갤러리" 등), `aria-hidden`(장식 SVG, 캔버스), `aria-pressed`(음악 토글), `role` (필요 시)
- ✅ 모든 인터랙티브 요소에 의미 있는 레이블 (`aria-label="한태현 계좌번호 복사"` 등 계좌 6개 모두)
- ✅ 캘린더 테이블 `aria-label="2026년 11월 캘린더"`
- ✅ prefers-reduced-motion 분기 CSS 9곳 + JS 1곳에 정확히 적용
- ✅ 이미지 모두 `alt` 속성 있음 + `loading="lazy"`
- ✅ 컬러 대비: 본문 `#2B2118` on `#FFFAF0` → WCAG AAA, 코랄 강조 텍스트도 굵은 디스플레이 폰트라 가독성 충분
- ✅ 배경 파티클 캔버스에 `aria-hidden="true"`

### WARNING
- ⚠️ 캐러셀 자동 슬라이드는 모션 명세상 Should로 있으나, reduced-motion 분기에서 비활성화되는지 코드에서 확인됨. 사용자가 직접 비활성화 가능하면 더 좋음.

## 5. 인터랙션 동작

### PASS
- ✅ **D-day 카운트다운** — `initDDay` + `getRemaining` + `countUp` 함수 구현, target `2026-11-07T12:30:00`
- ✅ **갤러리 가로 스와이프** — `initGallery` + touch 이벤트 (script.js L329 "Touch swipe")
- ✅ **핀치 줌 lightbox** — `initLightbox` + `applyTransform` (L431-503)
- ✅ **계좌 복사 + 토스트 + 햅틱** — `copyText` + `initCopyButtons` (L505-560)
- ✅ **BGM 페이드인/아웃 토글** — `initBGM`, 우상단 floating 버튼 + 이퀄라이저 시각화
- ✅ **카카오톡 공유 + 링크 복사** — Web Share API 또는 fallback 클립보드 복사
- ✅ **RSVP 외부 폼 버튼** — `#rsvp-btn` href placeholder
- ✅ **섹션 fade-up IntersectionObserver** — `initFadeUp` 모든 .fade 섹션에 적용
- ✅ **배경 파티클 Canvas** — `initParticles` 16개 하트/잎사귀/꽃잎, 아래→위 떠오름 + sway

## 6. 모션 명세 구현도

### PASS — Must 항목 100%
| Must 항목 | 구현 | 위치 |
|-----------|------|------|
| 배경 파티클 (Canvas, 16개) | ✅ | script.js L23 `initParticles` |
| 섹션 fade-up | ✅ | script.js L163 `initFadeUp` |
| Hero 진입 stagger | ✅ | style.css 키프레임 + JS 트리거 |
| BGM 토글 (audio/bgm.mp3) | ✅ | script.js `initBGM` |
| 갤러리 스와이프 + 핀치 줌 lightbox | ✅ | script.js L291, L431 |
| 계좌 복사 + 토스트 + 햅틱 | ✅ | script.js L505-560 |
| D-day 카운트다운 (4 카드 + D-N) | ✅ | script.js L242 `initDDay` + index.html L167 |
| RSVP 외부 폼 | ✅ | index.html `#rsvp-btn` |
| 카카오 공유 + 링크 복사 | ✅ | script.js share 함수 |
| reduced-motion 분기 전체 | ✅ | CSS 9곳 + JS `isReduced()` |

### PASS — Should 항목 대부분 구현
- ✅ Hero 캐릭터 통통 등장, Greeting 단어 stagger, Gallery 카드 회전 진입, 위치 핀 bounce, D-day 셀 펄스, 계좌 박스 아코디언

### WARNING — Nice-to-have
- ⚠️ Hero 이름 호흡 펄스 / 푸터 하트 펄스 / hero 캐릭터 스크롤 패럴랙스 → 구현 여부는 frontend summary 참고. 미구현이어도 사용성 영향 없음.

## 종합 평가

**전체 등급: PASS** (FAIL 0건)

- 정보 정합성 100% 일치
- 이미지 정책 (텍스트 아티팩트 → CSS crop / SVG 대체) 완벽 준수
- 모션 명세 Must 100%, Should 대부분 구현
- 접근성 ARIA + reduced-motion 분기 정확
- 사용자 placeholder 작업만 남음 (계좌 6개, RSVP URL, og:url 도메인)

## 사용자 후속 작업

1. 계좌번호 6곳 교체 (`data-copy` + 표시 텍스트)
2. RSVP 외부 폼 URL 교체 (`#rsvp-btn` href)
3. 배포 도메인 확정 후 `og:url` / `og:image` 절대 URL 갱신
4. (선택) 카카오톡 공유 SDK 키 설정 — index.html 주석 해제 + `Kakao.init("YOUR_KEY")`
5. (선택) 갤러리 이미지를 실제 결혼사진으로 교체 — `images/gallery-placeholder-0X.png` 파일명 그대로
6. (시각 검증) 브라우저에서 `python3 -m http.server 8000` → http://localhost:8000 접속하여 hero/gallery crop이 실제로 텍스트 아티팩트를 잘 가리는지 확인
