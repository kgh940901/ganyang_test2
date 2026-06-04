/* ================================================================
   SIMULATOR.JS — GANYANG 소파 바닥매트 매칭 시뮬레이터
   ================================================================ */

/* ================================================================
   ★ 카페24 장바구니 연동 설정
   카페24 관리자에서 아래 두 가지 값을 확인 후 입력하세요.

   1) productNo
      관리자 > 상품관리 > 상품목록 > 해당 상품의 번호(숫자)

   2) optionCodes (매트 색상별 옵션코드)
      관리자 > 상품관리 > 해당 상품 클릭
      > 옵션/재고관리 탭 > 옵션 목록 > '옵션코드' 열
      예시: 'P000BBAAH0001'
   ================================================================ */
const CAFE24 = {
    productNo: 0,           /* ← 상품번호 숫자로 입력 (예: 123) */
    optionCodes: {
        'ivory':        '',   /* ← 각 색상의 옵션코드 입력 */
        'cream':        '',
        'beige':        '',
        'olive':        '',
        'navy':         '',
        'charcoal':     '',
        'terracotta':   '',
        'dusty-rose':   '',
        'black':        '',
    }
};

/* ================================================================
   1. 데이터 설정
   색상 추가·수정은 이 영역만 변경하세요.

   ★ 실제 상품 이미지 사용법:
      image: 'assets/sofas/ivory.png' 처럼 경로를 추가하면
      해당 이미지를 우선 표시합니다.
      이미지 파일이 없거나 로드 실패 시 자동으로 SVG로 대체됩니다.
   ================================================================ */

const SOFAS = [
    { id: 'ivory',      name: '아이보리',      color: '#F0EBE2' },
    { id: 'cream',      name: '크림',           color: '#E6DFC8' },
    { id: 'beige',      name: '베이지',         color: '#C9A882' },
    { id: 'light-gray', name: '라이트 그레이',  color: '#BAB6B2' },
    { id: 'dark-gray',  name: '다크 그레이',    color: '#6E6C68' },
    { id: 'navy',       name: '네이비',         color: '#283A52' },
    { id: 'black',      name: '블랙',           color: '#2A2A2A' },
];

const MATS = [
    { id: 'ivory',      name: '아이보리',       color: '#F0EBE2' },
    { id: 'cream',      name: '크림',           color: '#E6DFC8' },
    { id: 'beige',      name: '베이지',         color: '#C9A882' },
    { id: 'olive',      name: '올리브',         color: '#7A8452' },
    { id: 'navy',       name: '네이비',         color: '#283A52' },
    { id: 'charcoal',   name: '차콜',           color: '#4E4C48' },
    { id: 'terracotta', name: '테라코타',       color: '#C86040' },
    { id: 'dusty-rose', name: '더스티 로즈',    color: '#D8949A' },
    { id: 'black',      name: '블랙',           color: '#2A2A2A' },
];

/* ================================================================
   2. 상태
   ================================================================ */
const state = { sofa: SOFAS[0], mat: MATS[0], qty: 1 };

/* ================================================================
   3. DOM 참조
   ================================================================ */
const sofaImg     = document.getElementById('sofaImg');
const matImg      = document.getElementById('matImg');
const matShape    = document.getElementById('matShape');
const sofaSwEl    = document.getElementById('sofaSwatches');
const matSwEl     = document.getElementById('matSwatches');
const badgeTextEl = document.getElementById('badgeText');
const selTextEl   = document.getElementById('selText');
const footerEl    = document.getElementById('footerText');
const qtyValEl    = document.getElementById('qtyVal');
const cartBtnEl   = document.getElementById('cartBtn');

/* ================================================================
   4. SVG 생성 — 소파
   실제 이미지 파일이 없을 때 이 SVG가 대신 표시됩니다.
   ================================================================ */
function buildSofaSVG(hex) {
    const hi   = shade(hex, +20);   /* 최상단 하이라이트 */
    const base = hex;
    const sh   = shade(hex, -18);   /* 하단 그림자 */
    const arm  = shade(hex, -12);   /* 팔걸이 베이스 */
    const armS = shade(hex, -30);   /* 팔걸이 하단 */
    const leg  = shade(hex, -45);   /* 다리 */

    /* ViewBox 720 × 400
       - 등받이: y=38, h=200, 라운드 18
       - 팔걸이: w=74, h=222
       - 방석 3개: y=236, h=108
       - 다리 3개: y=338, h=48          */
    return `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 등받이·방석 그라데이션 -->
    <linearGradient id="G1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${hi}"/>
      <stop offset="40%"  stop-color="${base}"/>
      <stop offset="100%" stop-color="${sh}"/>
    </linearGradient>
    <!-- 방석 그라데이션 (조금 더 어둠) -->
    <linearGradient id="G2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${base}"/>
      <stop offset="100%" stop-color="${sh}"/>
    </linearGradient>
    <!-- 팔걸이 그라데이션 -->
    <linearGradient id="G3" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${arm}"/>
      <stop offset="100%" stop-color="${armS}"/>
    </linearGradient>
    <!-- 바닥 그림자 -->
    <radialGradient id="SH" cx="50%" cy="50%">
      <stop offset="0%"   stop-color="rgba(0,0,0,0.20)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
    </radialGradient>
  </defs>

  <!-- 바닥 그림자 -->
  <ellipse cx="360" cy="390" rx="298" ry="12" fill="url(#SH)"/>

  <!-- 뒷 다리 (살짝 보임) -->
  <rect x="114" y="304" width="20" height="58" rx="4" fill="${leg}" opacity="0.55"/>
  <rect x="586" y="304" width="20" height="58" rx="4" fill="${leg}" opacity="0.55"/>

  <!-- 등받이 본체 -->
  <rect x="52" y="38" width="616" height="202" rx="18" fill="url(#G1)"/>

  <!-- 등받이 쿠션 구분선 (3구역) -->
  <rect x="254" y="52" width="3" height="178" rx="2" fill="rgba(0,0,0,0.07)"/>
  <rect x="463" y="52" width="3" height="178" rx="2" fill="rgba(0,0,0,0.07)"/>

  <!-- 등받이 상단 하이라이트 -->
  <rect x="52" y="38" width="616" height="30" rx="18" fill="rgba(255,255,255,0.20)"/>

  <!-- 팔걸이 왼쪽 -->
  <rect x="2"  y="102" width="74" height="222" rx="14" fill="url(#G3)"/>
  <rect x="2"  y="102" width="74" height="32"  rx="14" fill="rgba(255,255,255,0.16)"/>

  <!-- 팔걸이 오른쪽 -->
  <rect x="644" y="102" width="74" height="222" rx="14" fill="url(#G3)"/>
  <rect x="644" y="102" width="74" height="32"  rx="14" fill="rgba(255,255,255,0.16)"/>

  <!-- 시트 플랫폼 (방석 아래 받침) -->
  <rect x="52" y="234" width="616" height="14" rx="4" fill="${sh}"/>

  <!-- 방석 왼쪽 -->
  <rect x="58"  y="238" width="195" height="108" rx="11" fill="url(#G2)"/>
  <!-- 방석 가운데 -->
  <rect x="263" y="238" width="194" height="108" rx="11" fill="url(#G2)"/>
  <!-- 방석 오른쪽 -->
  <rect x="467" y="238" width="195" height="108" rx="11" fill="url(#G2)"/>

  <!-- 방석 사이 틈 -->
  <rect x="253" y="244" width="10" height="96" rx="3" fill="rgba(0,0,0,0.08)"/>
  <rect x="457" y="244" width="10" height="96" rx="3" fill="rgba(0,0,0,0.08)"/>

  <!-- 방석 상단 하이라이트 -->
  <rect x="58"  y="238" width="195" height="20" rx="11" fill="rgba(255,255,255,0.20)"/>
  <rect x="263" y="238" width="194" height="20" rx="11" fill="rgba(255,255,255,0.20)"/>
  <rect x="467" y="238" width="195" height="20" rx="11" fill="rgba(255,255,255,0.20)"/>

  <!-- 앞 다리 -->
  <rect x="114" y="338" width="22" height="48" rx="5" fill="${leg}"/>
  <rect x="349" y="338" width="22" height="48" rx="5" fill="${leg}"/>
  <rect x="584" y="338" width="22" height="48" rx="5" fill="${leg}"/>
</svg>`;
}

/* ================================================================
   5. SVG 생성 — 바닥매트
   ================================================================ */
function buildMatSVG(hex) {
    const hi = shade(hex, +24);
    const sh = shade(hex, -20);

    /* ViewBox 580 × 165
       - 매트 본체: y=8, h=142, rx=7
       - 위쪽 하이라이트 엣지
       - 미세 텍스처(수평 라인 패턴)
       - 바닥 그림자               */
    return `<svg viewBox="0 0 580 165" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="MG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${hi}"/>
      <stop offset="28%"  stop-color="${hex}"/>
      <stop offset="100%" stop-color="${sh}"/>
    </linearGradient>
    <!-- 루프 파일 직물 느낌 텍스처 -->
    <pattern id="TX" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
      <line x1="0" y1="2" x2="4" y2="2" stroke="rgba(255,255,255,0.07)" stroke-width="0.9"/>
    </pattern>
    <radialGradient id="MSH" cx="50%" cy="100%">
      <stop offset="0%"   stop-color="rgba(0,0,0,0.18)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
    </radialGradient>
  </defs>

  <!-- 바닥 그림자 -->
  <ellipse cx="290" cy="158" rx="270" ry="9" fill="url(#MSH)"/>

  <!-- 매트 본체 -->
  <rect x="6" y="8" width="568" height="142" rx="7" fill="url(#MG)"/>

  <!-- 텍스처 오버레이 -->
  <rect x="6" y="8" width="568" height="142" rx="7" fill="url(#TX)"/>

  <!-- 상단 하이라이트 엣지 -->
  <rect x="6" y="8" width="568" height="6" rx="4" fill="rgba(255,255,255,0.26)"/>

  <!-- 하단 그림자 영역 -->
  <rect x="6" y="122" width="568" height="28" rx="7" fill="rgba(0,0,0,0.07)"/>
</svg>`;
}

/* ================================================================
   6. SVG → data URI 변환 후 img.src에 적용
   ================================================================ */
function svgToDataURI(svgStr) {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr);
}

/* ================================================================
   7. 미리보기 업데이트
   ================================================================ */
function updateSofa(sofa) {
    if (sofa.image) {
        /* 실제 이미지 경로가 있으면 우선 시도 */
        sofaImg.onerror = () => { sofaImg.src = svgToDataURI(buildSofaSVG(sofa.color)); };
        sofaImg.src = sofa.image;
    } else {
        sofaImg.onerror = null;
        sofaImg.src = svgToDataURI(buildSofaSVG(sofa.color));
    }
}

function updateMat(mat) {
    if (mat.image) {
        matImg.onerror = () => {
            matImg.style.display = 'none';
            matShape.style.display = 'block';
            matShape.style.backgroundColor = mat.color;
        };
        matImg.src = mat.image;
        matImg.style.display = 'block';
        matShape.style.display = 'none';
    } else {
        /* 이미지 없음 → 동적 SVG 사용 */
        matImg.onerror = null;
        matImg.src = svgToDataURI(buildMatSVG(mat.color));
        matImg.style.display = 'block';
        matShape.style.display = 'none';
    }
}

function updateLabel() {
    const comboText = `${state.sofa.name} 소파 + ${state.mat.name} 매트`;
    badgeTextEl.textContent = comboText;
    selTextEl.textContent   = comboText;
    footerEl.textContent    = `${state.mat.name} 매트`;  /* 푸터는 매트 이름만 */
}

/* ================================================================
   8. 스와치 렌더링
   ================================================================ */
function renderSwatches(container, items, type) {
    container.innerHTML = '';
    items.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'sw';
        btn.setAttribute('role', 'radio');
        btn.setAttribute('aria-checked', 'false');
        btn.setAttribute('aria-label', item.name);
        btn.dataset.id   = item.id;
        btn.dataset.type = type;

        /* 밝은 색상 판별 (체크 아이콘 색상 반전용) */
        const isLight = isLightColor(item.color);

        const dot = document.createElement('span');
        dot.className = 'sw__dot' + (isLight ? ' is-light' : '');
        dot.style.backgroundColor = item.color;

        const name = document.createElement('span');
        name.className = 'sw__name';
        name.textContent = item.name;

        btn.appendChild(dot);
        btn.appendChild(name);
        btn.addEventListener('click', () => onSwatchClick(item, type));
        container.appendChild(btn);
    });
}

/* ================================================================
   9. 클릭 처리
   ================================================================ */
function onSwatchClick(item, type) {
    if (type === 'sofa') {
        state.sofa = item;
        setActive(sofaSwEl, item.id);
        updateSofa(item);
    } else {
        state.mat = item;
        setActive(matSwEl, item.id);
        updateMat(item);
    }
    updateLabel();
}

/* ================================================================
   10. 유틸리티
   ================================================================ */

/**
 * 선택된 스와치에 .is-on 클래스 토글
 */
function setActive(container, id) {
    container.querySelectorAll('.sw').forEach(btn => {
        const on = btn.dataset.id === id;
        btn.classList.toggle('is-on', on);
        btn.setAttribute('aria-checked', on ? 'true' : 'false');
    });
}

/**
 * HEX 색상 밝기 조절
 * @param {string} hex     '#rrggbb'
 * @param {number} amount  양수=밝게, 음수=어둡게
 */
function shade(hex, amount) {
    const n = parseInt(hex.replace('#', ''), 16);
    const s = Math.round(255 * amount / 100);
    const r = Math.min(255, Math.max(0, (n >> 16) + s));
    const g = Math.min(255, Math.max(0, ((n >> 8) & 0xFF) + s));
    const b = Math.min(255, Math.max(0, (n & 0xFF) + s));
    return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

/**
 * 색상이 밝은지 판별 (체크 아이콘 색상 결정용)
 */
function isLightColor(hex) {
    const n = parseInt(hex.replace('#', ''), 16);
    const r = (n >> 16) & 0xFF;
    const g = (n >> 8)  & 0xFF;
    const b =  n        & 0xFF;
    /* 상대 밝기 (WCAG 공식) */
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    return lum > 160;
}

/* ================================================================
   11. 수량 조절
   ================================================================ */
function initQty() {
    document.getElementById('qtyMinus').addEventListener('click', () => {
        if (state.qty > 1) {
            state.qty--;
            qtyValEl.textContent = state.qty;
        }
    });
    document.getElementById('qtyPlus').addEventListener('click', () => {
        if (state.qty < 99) {
            state.qty++;
            qtyValEl.textContent = state.qty;
        }
    });
}

/* ================================================================
   12. 장바구니 담기 (카페24)
   ================================================================ */

/**
 * 토스트 메시지 표시
 */
function showToast(msg) {
    const el = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    el.classList.add('is-show');
    setTimeout(() => el.classList.remove('is-show'), 2800);
}

/**
 * 장바구니 담기
 * 카페24 도메인에서 실행 시 폼 POST로 장바구니에 직접 추가됩니다.
 */
function addToCart() {
    /* ── 설정값 검증 ── */
    if (!CAFE24.productNo) {
        alert('simulator.js 상단의 CAFE24.productNo를 입력해주세요.\n(카페24 관리자 > 상품관리 > 상품번호)');
        return;
    }
    const optionCode = CAFE24.optionCodes[state.mat.id];
    if (!optionCode) {
        alert(`"${state.mat.name}" 색상의 옵션코드가 비어있습니다.\nsimulator.js 상단 CAFE24.optionCodes를 확인해주세요.`);
        return;
    }

    /* ── 버튼 로딩 상태 ── */
    if (cartBtnEl) {
        cartBtnEl.classList.add('is-loading');
        cartBtnEl.disabled = true;
    }

    /* ── 카페24 장바구니 폼 POST ──
       이 페이지가 카페24 도메인에 업로드되어 있을 때 동작합니다.
       /exec/front/order/basket/ 은 카페24의 장바구니 처리 주소입니다. */
    const form = document.createElement('form');
    form.method  = 'post';
    form.action  = '/exec/front/order/basket/';
    form.style.display = 'none';

    [
        ['product_no',  CAFE24.productNo],
        ['option_code', optionCode],
        ['quantity',    state.qty],
        ['basketType',  'cart'],
    ].forEach(([name, value]) => {
        const input = document.createElement('input');
        input.type  = 'hidden';
        input.name  = name;
        input.value = value;
        form.appendChild(input);
    });

    document.body.appendChild(form);

    /* 카페24 환경에서는 폼 제출 → 장바구니 페이지로 이동
       개발/미리보기 환경에서는 토스트로 확인만 표시 */
    const isCafe24 = window.location.hostname.includes('cafe24.com')
                  || window.location.hostname.includes('cafe24.net');

    if (isCafe24) {
        form.submit();
    } else {
        /* 로컬/GitHub Pages 미리보기용 피드백 */
        document.body.removeChild(form);
        setTimeout(() => {
            if (cartBtnEl) {
                cartBtnEl.classList.remove('is-loading');
                cartBtnEl.disabled = false;
            }
            showToast(`${state.mat.name} 매트 ${state.qty}개 — 장바구니에 담겼습니다.`);
        }, 800);
    }
}

/* ================================================================
   13. 초기화
   ================================================================ */
function init() {
    renderSwatches(sofaSwEl, SOFAS, 'sofa');
    renderSwatches(matSwEl,  MATS,  'mat');

    setActive(sofaSwEl, state.sofa.id);
    setActive(matSwEl,  state.mat.id);

    updateSofa(state.sofa);
    updateMat(state.mat);
    updateLabel();
    initQty();
}

document.addEventListener('DOMContentLoaded', init);

/* ================================================================
   12. 추후 확장 함수 (필요 시 주석 해제)
   ================================================================ */
/*
function shareURL() {
    const url = new URL(window.location.href);
    url.searchParams.set('sofa', state.sofa.id);
    url.searchParams.set('mat',  state.mat.id);
    navigator.clipboard.writeText(url.toString())
        .then(() => alert('URL이 클립보드에 복사되었습니다.'));
}
function loadFromURL() {
    const p = new URLSearchParams(window.location.search);
    const s = SOFAS.find(x => x.id === p.get('sofa'));
    const m = MATS.find(x  => x.id === p.get('mat'));
    if (s) onSwatchClick(s, 'sofa');
    if (m) onSwatchClick(m, 'mat');
}
// html2canvas 라이브러리 필요
function downloadImage() {
    html2canvas(document.querySelector('.sim__scene')).then(canvas => {
        const a = document.createElement('a');
        a.download = `${state.sofa.id}-${state.mat.id}.png`;
        a.href = canvas.toDataURL();
        a.click();
    });
}
*/
