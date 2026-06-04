/* ================================================================
   SIMULATOR.JS — GANYANG 소파 바닥매트 매칭 시뮬레이터
   ================================================================ */

/* ================================================================
   ★ 카페24 연동 설정
   아래 값을 실제 쇼핑몰 정보로 변경하세요.

   productNo  : 카페24 관리자 > 상품관리 > 상품번호
   price      : 판매가 (원, 숫자만)  예) 32000
   optionCodes: 관리자 > 해당 상품 > 옵션/재고관리 탭 > 옵션코드 열
   ================================================================ */
const CAFE24 = {
    /* 상품 페이지 URL — 카페24 관리자에서 상품 링크를 복사해 입력하세요
       예) 'https://sensemom.com/product/detail.html?product_no=195' */
    productUrl: '',

    /* 판매가 (원, 숫자만) — 선택한 항목 금액 표시용  예) 32000 */
    price: 0,
};

/* ================================================================
   1. 상품 데이터
   ================================================================ */
const SOFAS = [
    { id: 'ivory',      name: '아이보리',     color: '#F0EBE2' },
    { id: 'cream',      name: '크림',          color: '#E6DFC8' },
    { id: 'beige',      name: '베이지',        color: '#C9A882' },
    { id: 'light-gray', name: '라이트 그레이', color: '#BAB6B2' },
    { id: 'dark-gray',  name: '다크 그레이',   color: '#6E6C68' },
    { id: 'navy',       name: '네이비',        color: '#283A52' },
    { id: 'black',      name: '블랙',          color: '#2A2A2A' },
];

const MATS = [
    { id: 'ivory',      name: '아이보리',     color: '#F0EBE2' },
    { id: 'cream',      name: '크림',          color: '#E6DFC8' },
    { id: 'beige',      name: '베이지',        color: '#C9A882' },
    { id: 'olive',      name: '올리브',        color: '#7A8452' },
    { id: 'navy',       name: '네이비',        color: '#283A52' },
    { id: 'charcoal',   name: '차콜',          color: '#4E4C48' },
    { id: 'terracotta', name: '테라코타',      color: '#C86040' },
    { id: 'dusty-rose', name: '더스티 로즈',   color: '#D8949A' },
    { id: 'black',      name: '블랙',          color: '#2A2A2A' },
];

/* ================================================================
   2. 상태
   ================================================================ */
const state = {
    sofa:      SOFAS[0],  /* 시각화용 소파 */
    previewMat: null,     /* 미리보기에 표시 중인 매트 (마지막 선택) */
};
/* 장바구니 담을 항목 목록 — { mat, qty } */
const cartItems = [];

/* ================================================================
   3. DOM 참조
   ================================================================ */
const sofaImg    = document.getElementById('sofaImg');
const matImg     = document.getElementById('matImg');
const matShape   = document.getElementById('matShape');
const sofaSwEl   = document.getElementById('sofaSwatches');
const matSwEl    = document.getElementById('matSwatches');
const badgeEl    = document.getElementById('badgeText');
const badgeDotEl = document.querySelector('.sim__badge-dot');
const optEmptyEl = document.getElementById('optEmpty');
const optItemsEl = document.getElementById('optItems');
const optTotalEl = document.getElementById('optTotal');
const totalPrEl  = document.getElementById('totalPrice');
const cartBtnEl  = document.getElementById('cartBtn');
const buyBtnEl   = document.getElementById('buyBtn');
const gfCartEl   = document.getElementById('gfCartBtn');
const gfBuyEl    = document.getElementById('gfBuyBtn');
const gfLabelEl  = document.getElementById('gfLabel');
const gfPriceEl  = document.getElementById('gfPrice');

/* ================================================================
   4. SVG 생성 — 소파 일러스트
   ================================================================ */
function buildSofaSVG(hex) {
    const hi  = shade(hex, +20);
    const sh  = shade(hex, -18);
    const arm = shade(hex, -12);
    const arS = shade(hex, -30);
    const leg = shade(hex, -45);

    return `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="G1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${hi}"/>
      <stop offset="40%" stop-color="${hex}"/>
      <stop offset="100%" stop-color="${sh}"/>
    </linearGradient>
    <linearGradient id="G2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${hex}"/>
      <stop offset="100%" stop-color="${sh}"/>
    </linearGradient>
    <linearGradient id="G3" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${arm}"/>
      <stop offset="100%" stop-color="${arS}"/>
    </linearGradient>
    <radialGradient id="SH" cx="50%" cy="50%">
      <stop offset="0%" stop-color="rgba(0,0,0,0.18)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
    </radialGradient>
  </defs>
  <ellipse cx="360" cy="390" rx="298" ry="12" fill="url(#SH)"/>
  <rect x="114" y="304" width="20" height="58" rx="4" fill="${leg}" opacity="0.55"/>
  <rect x="586" y="304" width="20" height="58" rx="4" fill="${leg}" opacity="0.55"/>
  <rect x="52" y="38" width="616" height="202" rx="18" fill="url(#G1)"/>
  <rect x="254" y="52" width="3" height="178" rx="2" fill="rgba(0,0,0,0.07)"/>
  <rect x="463" y="52" width="3" height="178" rx="2" fill="rgba(0,0,0,0.07)"/>
  <rect x="52" y="38" width="616" height="30" rx="18" fill="rgba(255,255,255,0.20)"/>
  <rect x="2" y="102" width="74" height="222" rx="14" fill="url(#G3)"/>
  <rect x="2" y="102" width="74" height="32" rx="14" fill="rgba(255,255,255,0.16)"/>
  <rect x="644" y="102" width="74" height="222" rx="14" fill="url(#G3)"/>
  <rect x="644" y="102" width="74" height="32" rx="14" fill="rgba(255,255,255,0.16)"/>
  <rect x="52" y="234" width="616" height="14" rx="4" fill="${sh}"/>
  <rect x="58" y="238" width="195" height="108" rx="11" fill="url(#G2)"/>
  <rect x="263" y="238" width="194" height="108" rx="11" fill="url(#G2)"/>
  <rect x="467" y="238" width="195" height="108" rx="11" fill="url(#G2)"/>
  <rect x="253" y="244" width="10" height="96" rx="3" fill="rgba(0,0,0,0.08)"/>
  <rect x="457" y="244" width="10" height="96" rx="3" fill="rgba(0,0,0,0.08)"/>
  <rect x="58" y="238" width="195" height="20" rx="11" fill="rgba(255,255,255,0.20)"/>
  <rect x="263" y="238" width="194" height="20" rx="11" fill="rgba(255,255,255,0.20)"/>
  <rect x="467" y="238" width="195" height="20" rx="11" fill="rgba(255,255,255,0.20)"/>
  <rect x="114" y="338" width="22" height="48" rx="5" fill="${leg}"/>
  <rect x="349" y="338" width="22" height="48" rx="5" fill="${leg}"/>
  <rect x="584" y="338" width="22" height="48" rx="5" fill="${leg}"/>
</svg>`;
}

/* ================================================================
   5. SVG 생성 — 매트 일러스트
   ================================================================ */
function buildMatSVG(hex) {
    const hi = shade(hex, +24);
    const sh = shade(hex, -20);
    return `<svg viewBox="0 0 580 165" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="MG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${hi}"/>
      <stop offset="28%" stop-color="${hex}"/>
      <stop offset="100%" stop-color="${sh}"/>
    </linearGradient>
    <pattern id="TX" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
      <line x1="0" y1="2" x2="4" y2="2" stroke="rgba(255,255,255,0.07)" stroke-width="0.9"/>
    </pattern>
    <radialGradient id="MS" cx="50%" cy="100%">
      <stop offset="0%" stop-color="rgba(0,0,0,0.16)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
    </radialGradient>
  </defs>
  <ellipse cx="290" cy="158" rx="270" ry="9" fill="url(#MS)"/>
  <rect x="6" y="8" width="568" height="142" rx="7" fill="url(#MG)"/>
  <rect x="6" y="8" width="568" height="142" rx="7" fill="url(#TX)"/>
  <rect x="6" y="8" width="568" height="6" rx="4" fill="rgba(255,255,255,0.26)"/>
  <rect x="6" y="122" width="568" height="28" rx="7" fill="rgba(0,0,0,0.07)"/>
</svg>`;
}

function svgURI(str) {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(str);
}

/* ================================================================
   6. 미리보기 업데이트
   ================================================================ */
function updateSofaVisual(sofa) {
    sofaImg.onerror = () => { sofaImg.src = svgURI(buildSofaSVG(sofa.color)); };
    sofaImg.src = sofa.image
        ? sofa.image
        : svgURI(buildSofaSVG(sofa.color));
}

function updateMatVisual(mat) {
    if (!mat) {
        /* 미선택: 매트 숨김 */
        matImg.style.display = 'none';
        matShape.style.display = 'block';
        matShape.style.backgroundColor = 'transparent';
        matShape.style.boxShadow = 'none';
        return;
    }
    matImg.onerror = () => {
        matImg.style.display = 'none';
        matShape.style.display = 'block';
        matShape.style.backgroundColor = mat.color;
        matShape.style.boxShadow = '0 4px 14px rgba(0,0,0,0.12)';
    };
    if (mat.image) {
        matImg.src = mat.image;
        matImg.style.display = 'block';
        matShape.style.display = 'none';
    } else {
        matImg.src = svgURI(buildMatSVG(mat.color));
        matImg.style.display = 'block';
        matShape.style.display = 'none';
    }
}

/* ================================================================
   7. 선택 상품 박스 — 전체 렌더링
   ================================================================ */
function renderOptBox() {
    if (cartItems.length === 0) {
        optEmptyEl.style.display = 'block';
        optItemsEl.innerHTML     = '';
        optTotalEl.style.display = 'none';
        setButtonsEnabled(false);
        updateFooter(null);
        return;
    }

    optEmptyEl.style.display = 'none';

    /* 항목 카드 목록 */
    optItemsEl.innerHTML = cartItems.map(({ mat, qty }) => {
        const itemPrice = CAFE24.price ? fmtPrice(CAFE24.price * qty) : '가격 미설정';
        return `
        <div class="opt-item" data-mat-id="${mat.id}">
          <div class="opt-item__top">
            <span class="opt-item__name">소파 바닥매트 / ${mat.name}</span>
            <button class="opt-item__del"
              onclick="removeItem('${mat.id}')"
              aria-label="${mat.name} 선택 취소">×</button>
          </div>
          <div class="opt-item__bottom">
            <div class="opt-qty">
              <button class="opt-qty__btn"
                onclick="changeItemQty('${mat.id}', -1)"
                aria-label="수량 감소">−</button>
              <span class="opt-qty__val">${qty}</span>
              <button class="opt-qty__btn"
                onclick="changeItemQty('${mat.id}', +1)"
                aria-label="수량 증가">+</button>
            </div>
            <span class="opt-item__price">${itemPrice}</span>
          </div>
        </div>`;
    }).join('');

    /* 총 금액 */
    if (CAFE24.price) {
        totalPrEl.textContent    = fmtPrice(calcTotal());
        optTotalEl.style.display = 'flex';
    } else {
        optTotalEl.style.display = 'none';
    }

    setButtonsEnabled(true);
    updateFooter();
}

/* 총 금액 계산 */
function calcTotal() {
    return cartItems.reduce((sum, { qty }) => sum + CAFE24.price * qty, 0);
}

/* ================================================================
   8. 버튼 및 하단 바 상태
   ================================================================ */
function setButtonsEnabled(on) {
    [cartBtnEl, buyBtnEl, gfCartEl, gfBuyEl].forEach(b => {
        if (b) b.disabled = !on;
    });
}

function updateFooter() {
    if (cartItems.length === 0) {
        gfLabelEl.textContent   = '색상을 선택해주세요';
        gfPriceEl.style.display = 'none';
        return;
    }
    /* 선택된 색상 이름들 나열 */
    const names = cartItems.map(i => i.mat.name).join(', ');
    gfLabelEl.textContent = names;
    if (CAFE24.price) {
        gfPriceEl.textContent   = '총 ' + fmtPrice(calcTotal());
        gfPriceEl.style.display = 'block';
    }
}

function updateBadge() {
    if (cartItems.length === 0) {
        badgeEl.textContent = '색상을 선택해주세요';
        badgeDotEl.classList.remove('is-active');
    } else {
        const names = cartItems.map(i => i.mat.name).join(' · ');
        badgeEl.textContent = `${state.sofa.name} 소파 + ${names} 매트`;
        badgeDotEl.classList.add('is-active');
    }
}

/* ================================================================
   9. 항목별 수량 변경
   ================================================================ */
function changeItemQty(matId, delta) {
    const item = cartItems.find(i => i.mat.id === matId);
    if (!item) return;
    const next = item.qty + delta;
    if (next < 1) { removeItem(matId); return; }
    if (next > 99) return;
    item.qty = next;
    renderOptBox();    /* 전체 재렌더 (간단하고 일관성 있음) */
}

/* ================================================================
   10. 항목 삭제
   ================================================================ */
function removeItem(matId) {
    const idx = cartItems.findIndex(i => i.mat.id === matId);
    if (idx === -1) return;
    cartItems.splice(idx, 1);

    /* 스와치 is-on 해제 */
    syncSwatchStates();

    /* 미리보기: 남은 항목 중 마지막 것 표시 */
    state.previewMat = cartItems.length
        ? cartItems[cartItems.length - 1].mat
        : null;
    updateMatVisual(state.previewMat);
    renderOptBox();
    updateBadge();
}

/* 스와치 선택 상태를 cartItems 기준으로 동기화 */
function syncSwatchStates() {
    const inCart = new Set(cartItems.map(i => i.mat.id));
    matSwEl.querySelectorAll('.sw').forEach(btn => {
        const on = inCart.has(btn.dataset.id);
        btn.classList.toggle('is-on', on);
        btn.setAttribute('aria-checked', on ? 'true' : 'false');
    });
}

/* ================================================================
   11. 스와치 클릭
   ================================================================ */
function onSwatchClick(item, type) {
    if (type === 'sofa') {
        state.sofa = item;
        setActive(sofaSwEl, item.id);
        updateSofaVisual(item);
        updateBadge();
        return;
    }

    /* 매트 선택 — 이미 있으면 수량 +1, 없으면 신규 추가 */
    const existing = cartItems.find(i => i.mat.id === item.id);
    if (existing) {
        existing.qty = Math.min(existing.qty + 1, 99);
    } else {
        cartItems.push({ mat: item, qty: 1 });
    }

    /* 미리보기는 방금 선택한 매트로 변경 */
    state.previewMat = item;
    updateMatVisual(item);

    syncSwatchStates();
    renderOptBox();
    updateBadge();
}

/* ================================================================
   12. 상품 페이지로 이동 (장바구니 / 바로구매 공통)
   ================================================================ */
function goToProduct(type) {
    if (cartItems.length === 0) {
        showToast('매트 색상을 선택해주세요.');
        return;
    }

    if (!CAFE24.productUrl) {
        showToast('simulator.js의 CAFE24.productUrl을 입력해주세요.');
        return;
    }

    /* 선택한 색상 이름을 URL 파라미터로 전달 (참고용) */
    const colors = cartItems.map(i => i.mat.name).join(',');
    const url    = CAFE24.productUrl
        + (CAFE24.productUrl.includes('?') ? '&' : '?')
        + 'selected_colors=' + encodeURIComponent(colors);

    if (type === 'cart') {
        /* 장바구니: 새 탭으로 상품 페이지 열기 */
        window.open(url, '_blank');
        showToast('상품 페이지에서 장바구니에 담아주세요 ✓');
    } else {
        /* 바로 구매: 현재 탭에서 상품 페이지로 이동 */
        window.location.href = url;
    }
}

/* ================================================================
   13. 유틸리티
   ================================================================ */
function setActive(container, id) {
    container.querySelectorAll('.sw').forEach(b => {
        const on = b.dataset.id === id;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-checked', on ? 'true' : 'false');
    });
}

function shade(hex, amount) {
    const n = parseInt(hex.replace('#', ''), 16);
    const s = Math.round(255 * amount / 100);
    const r = Math.min(255, Math.max(0, (n >> 16) + s));
    const g = Math.min(255, Math.max(0, ((n >> 8) & 0xFF) + s));
    const b = Math.min(255, Math.max(0, (n & 0xFF) + s));
    return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

function isLightColor(hex) {
    const n = parseInt(hex.replace('#', ''), 16);
    const lum = 0.299 * ((n >> 16) & 0xFF)
              + 0.587 * ((n >> 8)  & 0xFF)
              + 0.114 * ( n        & 0xFF);
    return lum > 160;
}

function fmtPrice(n) {
    return n.toLocaleString('ko-KR') + '원';
}

function showToast(msg) {
    const el = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    el.classList.add('is-show');
    setTimeout(() => el.classList.remove('is-show'), 2600);
}

/* ================================================================
   14. 스와치 렌더링
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

        const dot = document.createElement('span');
        dot.className = 'sw__dot' + (isLightColor(item.color) ? ' is-light' : '');
        dot.style.backgroundColor = item.color;

        const name = document.createElement('span');
        name.className   = 'sw__name';
        name.textContent = item.name;

        btn.appendChild(dot);
        btn.appendChild(name);
        btn.addEventListener('click', () => onSwatchClick(item, type));
        container.appendChild(btn);
    });
}

/* ================================================================
   15. 상세 섹션 — 컬러 팔레트 자동 렌더링
   ================================================================ */
function renderDetailColors() {
    const container = document.getElementById('dtlColors');
    if (!container) return;
    container.innerHTML = MATS.map(m => `
        <div class="dtl__color-item">
            <span class="dtl__color-dot" style="background:${m.color}"></span>
            <span class="dtl__color-name">${m.name}</span>
        </div>`).join('');
}

/* ================================================================
   16. 초기화
   ================================================================ */
function init() {
    renderSwatches(sofaSwEl, SOFAS, 'sofa');
    renderSwatches(matSwEl,  MATS,  'mat');
    setActive(sofaSwEl, state.sofa.id);

    updateSofaVisual(state.sofa);
    updateMatVisual(null);
    renderOptBox();
    updateBadge();
    renderDetailColors();
}

document.addEventListener('DOMContentLoaded', init);
