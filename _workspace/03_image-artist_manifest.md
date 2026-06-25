---
generated_by: "Gemini 2.5 Flash Image (Nano Banana) via _workspace/_image_gen.py"
style_reference: "ref_inv/inv_front.png, ref_inv/inv_back.png"
style_keywords: "cartoon storybook illustration, soft rounded outlines, flat color with subtle paper texture, mustard yellow + coral red + sky blue + forest green + amber palette, super-deformed (SD) chibi characters, digital painting children's picture-book aesthetic"
user_policy:
  - "전체 컨셉이 무너지지 않는 선에서 CSS/HTML 텍스트 요소로 처리. 모든 시각 요소를 이미지로 만들 필요 없음."
  - "이미지에 의도치 않게 박힌 텍스트(ref_inv 원본을 모델이 따라 그린 잔재)는 CSS object-position·crop으로 잘라내거나, 해당 자산을 CSS/SVG/한글 텍스트로 대체."
known_artifacts: |
  Gemini 모델이 ref_inv 학습 이미지의 영문 헤드라인("We're Getting Married") 및 일부 한글
  (부모 함자 띠, 신랑신부 이름)을 함께 그려넣음. 일러스트 자체의 스타일/캐릭터/배경 톤은
  ref_inv와 완벽히 일치하지만, 텍스트가 박힌 영역은 frontend에서 crop으로 가리거나
  CSS 텍스트로 덮어쓴다.
---

# 이미지 매니페스트 — 한태현 × 옥정미 청첩장

## 사용 정책 요약

| 분류 | 처리 방식 |
|------|-----------|
| 일러스트 (캐릭터 + 풍경)가 메인인 이미지 | 사용. 텍스트 박힌 영역은 CSS `object-fit: cover` + `object-position`으로 잘라냄 |
| 텍스트가 시각의 70% 이상을 차지한 이미지 (couple-icons, og) | 사용 보류 — SVG/CSS/HTML 텍스트로 대체 |
| 깨끗한 일러스트 (gallery-02) | 그대로 사용 |
| 디바이더 | 중앙 영역만 crop 또는 SVG 라인 + 작은 하트로 대체 |

frontend-developer는 이 표를 보고 각 자산을 최종 분류대로 처리한다.

---

> **⚠️ 2026-06-25 업데이트 — 실사진으로 교체됨.** 아래 1~6번의 AI 일러스트(hero-illustration.png, gallery-placeholder-0X.png)는 모두 **폐기**되었고, 사용자가 제공한 실제 결혼 사진으로 대체됨. 따라서 "Married" 텍스트 아티팩트 / CSS crop 전략은 **더 이상 유효하지 않음**.
> - **hero**: `images/hero.jpg` (사용자 제공 `images/gallery/hero.jpg` → 가로 1200px 최적화, 가로 클로즈업). `object-position: center 30%`, 박힌 텍스트 없음. 헤드라인은 기존대로 HTML 오버레이.
> - **gallery (2026-06-25 2차 개편)**: 캐러셀 → **4열 썸네일 그리드**(20장, 4×5, 간격 0). `images/gallery-01.jpg`~`gallery-20.jpg`(라이트박스용 긴 변 1600px) + `images/gallery-thumb-01.jpg`~`-20.jpg`(그리드용 600px 정사각 center-crop). EXIF 회전 보정. 썸네일 탭 → 라이트박스 확대(원본 전체) + **좌/우 네비(버튼·키보드·스와이프) + "n / 20" 카운터 + 핀치줌**.
> - **og:image / 카카오 공유**: `images/hero.jpg`로 변경.
> - 원본 고해상도(장당 4~5MB)는 `images/gallery/`(hero 포함 21장)에 보관하되 `.gitignore` 처리(커밋 제외). 재최적화는 PIL 스크립트로 재실행(hero 가로1200 / gallery 긴변1600 + 정사각썸네일600).

## 1. hero-illustration.png  *(폐기 — 실사진 hero.jpg로 대체)*

- **파일**: `images/hero-illustration.png`
- **사이즈**: 약 3:4 portrait
- **상태**: **사용 가능 (조건부)** — 상단 약 25%에 "Married" 대형 텍스트 박혀있음. 캐릭터 + 풍경은 깨끗.
- **사용처**: hero 섹션 배경
- **frontend 처리**:
  ```css
  .hero-img {
    object-fit: cover;
    object-position: center 75%;  /* 하단 75% 위치로 정렬 → 상단 텍스트 영역 잘라냄 */
    aspect-ratio: 3/4;
  }
  ```
  또는 컨테이너에 `overflow: hidden` + 이미지 `transform: translateY(-15%)` + `height: 130%`로 상단 잘라냄. hero 헤드라인 텍스트("We're Getting Married!" / 한태현 ♥ 옥정미 / 2026.11.07)는 이미지 위에 절대 위치로 오버레이하되 이미지 텍스트 영역과 겹치지 않게 하단 배치.
- **대체 자산**: 없음 (필수)

## 2. gallery-placeholder-01.png

- **파일**: `images/gallery-placeholder-01.png`
- **사이즈**: 1:1
- **상태**: **사용 가능 (조건부)** — 상단 약 12-15%에 "Marri-" 잘린 텍스트. 캐릭터 + 풍경 메인.
- **사용처**: 갤러리 1번 카드
- **frontend 처리**: 카드 컨테이너 `aspect-ratio: 4/5` + `object-position: center 85%` → 상단 잘라냄.

## 3. gallery-placeholder-02.png

- **파일**: `images/gallery-placeholder-02.png`
- **사이즈**: 1:1
- **상태**: **완전 깨끗** ✨ — 텍스트 없음. 캐릭터 + 바다 + 보트 + 단풍.
- **사용처**: 갤러리 2번 카드 (대표 이미지로 활용 추천)
- **frontend 처리**: 그대로 사용.

## 4. gallery-placeholder-03.png

- **파일**: `images/gallery-placeholder-03.png`
- **사이즈**: 1:1
- **상태**: **사용 곤란** — 상단 약 30%에 "arried" 대형 텍스트.
- **권장 처리**: object-position으로 하단 65%만 표시 (캐릭터·집 배경) 또는 카드를 가로 16:9로 crop하여 텍스트 영역 더 적극적으로 잘라냄.
- **대체 안**: 갤러리 5장이 부담스러우면 이 이미지 제외하고 4장으로 운영. (사용자 동의 시)

## 5. gallery-placeholder-04.png

- **파일**: `images/gallery-placeholder-04.png`
- **사이즈**: 1:1
- **상태**: **사용 가능 (조건부)** — 하단에 노란 ref_inv 가장자리 띠 약 12%. 상단은 캐릭터 일부 잘림이지만 풍경 메인.
- **사용처**: 갤러리 4번 카드
- **frontend 처리**: `object-position: center 25%` → 하단 띠 잘라냄.

## 6. gallery-placeholder-05.png

- **파일**: `images/gallery-placeholder-05.png`
- **사이즈**: 1:1
- **상태**: **사용 곤란** — 상단 약 30%에 "Married" 대형 텍스트. 그러나 캐릭터 + 집 + 바다 풍경은 모두 들어있음.
- **권장 처리**: 4:5 세로 카드로 변경 후 `object-position: center 90%` → 상단 텍스트 적극 잘라냄.

## 7. venue-map-illustration.png

- **파일**: `images/venue-map-illustration.png`
- **사이즈**: 1233×1307 (≈1:1.06 세로형)
- **상태**: **2026-06-25 교체됨** — 기존 gpt-image2 생성본은 한글 라벨이 전부 환각(가짜 역명/도로명, 부모 함자 깨짐)이라 폐기. 사용자가 제공한 정확한 실제 약도(`images/littlemap.jpeg`, 로프트가든344 핀·오목교역 3~7번 출구·실건물명)를 **AI 재생성 없이 PIL 듀오톤 리컬러**로 테마화(크림/탄 배경 + 도로·건물 크림화이트, 텍스트 다크브라운; 핀·출구 뱃지 등 채도 악센트는 보존). → 한글 라벨 100% 정확.
- **사용처**: venue 섹션 약도
- **frontend 처리**: `width:100%; height:auto`로 전체 표시(crop 없음). 지도에 정확한 핀이 포함돼 있어 HTML 오버레이 핀(`.map-pin`)은 제거.
- **재생성 주의**: 이 약도는 gpt-image2로 재생성 금지(한글 라벨 환각 재발). 색만 바꿀 경우 `littlemap.jpeg`를 소스로 PIL 듀오톤 리컬러 재적용할 것.

## 8. section-divider-flowers.png

- **파일**: `images/section-divider-flowers.png`
- **사이즈**: 16:9 wide
- **상태**: **부분 사용** — 좌우 약 20%씩이 ref_inv 노란 가장자리 모방 (구름 + 잎사귀). 중앙 60%는 깨끗 (작은 빨간 하트 + 옅은 라인).
- **권장 처리**:
  - (A) 중앙 60%만 crop하여 사용 (`width: 60%; object-fit: cover; object-position: center;` 후 마스크)
  - (B) **추천**: 이미지 사용 안 하고 SVG/CSS로 직접 디바이더 구성 — 가는 점선 라인 + 코랄 하트 1개 + 그린 작은 잎사귀 양쪽. 사용자 정책("CSS 요소로 처리")에 부합.
- frontend는 (B) 권장.

## 9. couple-icon-groom.png / couple-icon-bride.png

- **파일**: `images/couple-icon-groom.png`, `images/couple-icon-bride.png`
- **사이즈**: 1:1
- **상태**: **사용 곤란** — 캐릭터 일부만 보이고 옆에 한글 텍스트("옥…", "미") 박혀있음. 작은 아이콘으로 사용 시 텍스트가 더 두드러짐.
- **권장 처리**: **이미지 사용 안 하고 SVG 또는 이모지 + CSS 도형으로 대체**.
  - 대안 1: 인라인 SVG로 작은 신랑·신부 픽토그램 직접 그리기 (검정/크림 색상 도형)
  - 대안 2: 유니코드 기호 🤵🏻‍♂️ 👰🏻‍♀️ 또는 CSS로 그려낸 작은 원형 라벨에 "신랑" / "신부" 한글로 표기
  - 대안 3 (가장 단순): 부모 함자 옆에 작은 SVG 하트 또는 별 아이콘만 두고 캐릭터 아이콘 생략
- **권장**: 대안 3 — 미니멀하게 SVG 하트 한 개로 처리.

## 10. og-thumbnail.png

- **파일**: `images/og-thumbnail.png`
- **사이즈**: 약 1200x630 16:9
- **상태**: **사용 곤란** — 상단 약 40%에 "Married" 대형 텍스트가 박혀 있음. 우측에 큰 빈 영역.
- **권장 처리**:
  - (A) 그대로 사용 — og 이미지는 카카오톡/SNS에서 작게 보여서 텍스트 아티팩트 영향이 hero만큼 크지 않음. 단, 메타 태그에 og:title("한태현 ♥ 옥정미 결혼합니다")이 별도로 노출되므로 이미지 자체의 텍스트는 중복 노이즈.
  - (B) **추천**: gallery-02 (깨끗한 이미지)를 og:image로 재활용. 1200x630 정확한 비율이 아니어도 og 미리보기는 정사각형 fallback 처리됨.
- frontend는 (B) 채택 권장 — `<meta property="og:image" content="images/gallery-placeholder-02.png">`.

---

## 최종 사용 자산 요약

| 자산 | 분류 | 비고 |
|------|------|------|
| `hero-illustration.png` | ✅ 사용 (crop) | hero 배경, 상단 25% 잘라냄 |
| `gallery-placeholder-01.png` | ✅ 사용 (crop) | 갤러리, 상단 15% 잘라냄 |
| `gallery-placeholder-02.png` | ✅ 사용 (그대로) | 갤러리 + **og:image** |
| `gallery-placeholder-03.png` | ✅ 사용 (강한 crop) | 갤러리, 상단 30% 잘라냄 |
| `gallery-placeholder-04.png` | ✅ 사용 (crop) | 갤러리, 하단 12% 잘라냄 |
| `gallery-placeholder-05.png` | ✅ 사용 (강한 crop) | 갤러리, 상단 30% 잘라냄 |
| `venue-map-illustration.png` | ✅ 사용 (실제 약도 리컬러) | venue 약도, 전체 표시 (crop 없음) |
| `section-divider-flowers.png` | ❌ 미사용 | SVG/CSS 디바이더로 대체 |
| `couple-icon-groom.png` | ❌ 미사용 | SVG 하트로 대체 |
| `couple-icon-bride.png` | ❌ 미사용 | SVG 하트로 대체 |
| `og-thumbnail.png` | ❌ 미사용 | gallery-placeholder-02.png를 og:image로 사용 |

---

## frontend-developer 통합 가이드

### CSS crop 패턴 (각 이미지별 권장 값)

```css
/* hero */
.hero-illustration {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  object-position: center 85%;  /* 상단 "Married" 텍스트 잘라냄 */
}

/* gallery: 4:5 세로 카드 */
.gallery-card img { object-fit: cover; object-position: center; }
.gallery-card--01 img { object-position: center 88%; }
.gallery-card--02 img { object-position: center; }      /* 그대로 */
.gallery-card--03 img { object-position: center 92%; }  /* 상단 30% 잘라냄 */
.gallery-card--04 img { object-position: center 20%; }  /* 하단 띠 잘라냄 */
.gallery-card--05 img { object-position: center 92%; }

/* venue — 실제 약도 리컬러본, 전체 표시 */
.venue-map {
  display: block;
  width: 100%;
  height: auto;
  background: var(--color-bg);
}
```

### SVG 대체 자산 (인라인)

```html
<!-- section divider: 가는 점선 + 코랄 하트 + 양쪽 잎사귀 -->
<svg viewBox="0 0 320 24" class="divider" aria-hidden="true">
  <path d="M10 12 L140 12" stroke="#3F8F4A" stroke-width="1" stroke-dasharray="2 4"/>
  <path d="M180 12 L310 12" stroke="#3F8F4A" stroke-width="1" stroke-dasharray="2 4"/>
  <!-- 작은 잎사귀 양쪽 -->
  <path d="M140 12 q4 -6 8 0 q-4 6 -8 0" fill="#3F8F4A"/>
  <path d="M172 12 q4 -6 8 0 q-4 6 -8 0" fill="#3F8F4A"/>
  <!-- 중앙 코랄 하트 -->
  <path d="M160 16 c-6 -4 -10 -8 -6 -12 c2 -2 4 0 6 2 c2 -2 4 -4 6 -2 c4 4 0 8 -6 12 z" fill="#E54C2E"/>
</svg>

<!-- couple icon: 작은 하트만 -->
<svg viewBox="0 0 24 24" class="couple-icon" aria-hidden="true">
  <path d="M12 21 c-6 -5 -10 -9 -6 -13 c2 -2 4 0 6 2 c2 -2 4 -4 6 -2 c4 4 0 8 -6 13 z" fill="#E54C2E"/>
</svg>
```

### og:image 설정

```html
<meta property="og:image" content="images/gallery-placeholder-02.png">
<meta property="og:image:width" content="1024">
<meta property="og:image:height" content="1024">
```

(gallery-02는 1:1이므로 og:type "square fallback"으로 동작. 카카오톡은 정사각형 미리보기 잘 지원.)

---

## 향후 사용자 보강 시 옵션

사용자가 추후 이미지를 깨끗하게 다시 만들고 싶을 때:
- `_workspace/_image_gen.py`의 STYLE 상수에서 `"No words, no letters, no Korean characters anywhere in the image."` 부분을 더 강하게 강조 — 예: 프롬프트 맨 앞에 대문자로 `"ABSOLUTELY NO TEXT, NO LETTERS, NO KOREAN CHARACTERS, NO ENGLISH WORDS ANYWHERE IN THE IMAGE. PURE ILLUSTRATION ONLY."` 추가.
- `python3 _workspace/_image_gen.py hero-illustration og-thumbnail venue-map-illustration` 처럼 인자 전달로 특정 이미지만 재생성 가능.
- 또는 사용자 본인 결혼사진을 `images/gallery-placeholder-01.png ~ 05.png` 파일명으로 대체하면 즉시 갤러리에 반영.
