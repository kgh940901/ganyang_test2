/* ============================================================
   SIMULATOR.JS  —  소파 & 바닥매트 매칭 시뮬레이터
   ============================================================ */

/* ============================================================
   1. 데이터 설정
   색상/이름 추가·수정 시 이 영역만 변경하세요.

   이미지 사용 방법:
     1) assets/sofas/ 또는 assets/mats/ 폴더에 이미지 파일을 추가합니다.
     2) 아래 각 항목의 `image` 줄 주석을 해제합니다.
     3) 이미지 로드 실패 시 자동으로 CSS 색상 표시로 전환됩니다.
   ============================================================ */

/** 소파 색상 목록 */
const SOFAS = [
    {
        id: 'ivory',
        name: '아이보리',
        color: '#F2EDE4',
        // image: 'assets/sofas/ivory.png',
    },
    {
        id: 'cream',
        name: '크림',
        color: '#E5DEC8',
        // image: 'assets/sofas/cream.png',
    },
    {
        id: 'beige',
        name: '베이지',
        color: '#C8A882',
        // image: 'assets/sofas/beige.png',
    },
    {
        id: 'light-gray',
        name: '라이트 그레이',
        color: '#B8B4B0',
        // image: 'assets/sofas/light-gray.png',
    },
    {
        id: 'dark-gray',
        name: '다크 그레이',
        color: '#6A6866',
        // image: 'assets/sofas/dark-gray.png',
    },
    {
        id: 'navy',
        name: '네이비',
        color: '#1E2D4A',
        // image: 'assets/sofas/navy.png',
    },
    {
        id: 'black',
        name: '블랙',
        color: '#1C1C1C',
        // image: 'assets/sofas/black.png',
    },
];

/** 바닥매트 색상 목록 */
const MATS = [
    {
        id: 'ivory',
        name: '아이보리',
        color: '#F2EDE4',
        // image: 'assets/mats/ivory.png',
    },
    {
        id: 'cream',
        name: '크림',
        color: '#E5DEC8',
        // image: 'assets/mats/cream.png',
    },
    {
        id: 'beige',
        name: '베이지',
        color: '#C8A882',
        // image: 'assets/mats/beige.png',
    },
    {
        id: 'olive',
        name: '올리브',
        color: '#6B7645',
        // image: 'assets/mats/olive.png',
    },
    {
        id: 'navy',
        name: '네이비',
        color: '#1E2D4A',
        // image: 'assets/mats/navy.png',
    },
    {
        id: 'charcoal',
        name: '차콜',
        color: '#4A4848',
        // image: 'assets/mats/charcoal.png',
    },
    {
        id: 'terracotta',
        name: '테라코타',
        color: '#C4613A',
        // image: 'assets/mats/terracotta.png',
    },
    {
        id: 'dusty-rose',
        name: '더스티 로즈',
        color: '#D4848A',
        // image: 'assets/mats/dusty-rose.png',
    },
    {
        id: 'black',
        name: '블랙',
        color: '#1C1C1C',
        // image: 'assets/mats/black.png',
    },
];

/* ============================================================
   2. 상태 관리
   ============================================================ */

/** 현재 선택된 소파/매트 */
const state = {
    sofa: SOFAS[0],
    mat:  MATS[0],
};

/* ============================================================
   3. DOM 참조
   ============================================================ */
const sofaOptionsEl  = document.getElementById('sofaOptions');
const matOptionsEl   = document.getElementById('matOptions');
const sofaShapeEl    = document.getElementById('sofaShape');
const sofaImageEl    = document.getElementById('sofaImage');
const matShapeEl     = document.getElementById('matShape');
const matImageEl     = document.getElementById('matImage');
const previewLabelEl = document.getElementById('previewLabel');
const footerLabelEl  = document.getElementById('footerLabel');

/* ============================================================
   4. 렌더링 — 옵션 버튼 생성
   ============================================================ */

/** 소파 옵션 버튼을 DOM에 렌더링 */
function renderSofaOptions() {
    sofaOptionsEl.innerHTML = '';
    SOFAS.forEach(item => {
        sofaOptionsEl.appendChild(createOptionBtn(item, 'sofa'));
    });
}

/** 매트 옵션 버튼을 DOM에 렌더링 */
function renderMatOptions() {
    matOptionsEl.innerHTML = '';
    MATS.forEach(item => {
        matOptionsEl.appendChild(createOptionBtn(item, 'mat'));
    });
}

/**
 * 색상 선택 버튼 엘리먼트 생성
 * @param {Object} item  { id, name, color, image? }
 * @param {string} type  'sofa' | 'mat'
 * @returns {HTMLButtonElement}
 */
function createOptionBtn(item, type) {
    const btn = document.createElement('button');
    btn.className = 'sim-option';
    btn.setAttribute('role', 'radio');
    btn.setAttribute('aria-checked', 'false');
    btn.setAttribute('aria-label', item.name);
    btn.dataset.id   = item.id;
    btn.dataset.type = type;

    /* 색상 스와치 원 */
    const swatch = document.createElement('span');
    swatch.className = 'sim-option__swatch';
    swatch.style.backgroundColor = item.color;

    /* 색상 이름 */
    const label = document.createElement('span');
    label.className = 'sim-option__label';
    label.textContent = item.name;

    btn.appendChild(swatch);
    btn.appendChild(label);
    btn.addEventListener('click', () => onOptionClick(item, type));

    return btn;
}

/* ============================================================
   5. 이벤트 처리
   ============================================================ */

/**
 * 옵션 클릭 시 상태 갱신 → 미리보기 업데이트
 * @param {Object} item
 * @param {string} type  'sofa' | 'mat'
 */
function onOptionClick(item, type) {
    if (type === 'sofa') {
        state.sofa = item;
        setActiveClass(sofaOptionsEl, item.id);
    } else {
        state.mat = item;
        setActiveClass(matOptionsEl, item.id);
    }
    updatePreview();
    updateLabel();
}

/* ============================================================
   6. 미리보기 업데이트
   ============================================================ */

/** 소파 + 매트 미리보기 갱신 */
function updatePreview() {
    updateSofaVisual(state.sofa);
    updateMatVisual(state.mat);
}

/**
 * 소파 비주얼 갱신
 * — 이미지가 있으면 <img> 표시, 없으면 SVG 그라데이션으로 대체
 */
function updateSofaVisual(sofa) {
    if (sofa.image) {
        sofaImageEl.src = sofa.image;

        sofaImageEl.onload = () => {
            sofaImageEl.style.display = 'block';
            sofaShapeEl.style.display = 'none';
        };

        /* 이미지 로드 실패 → SVG 폴백 */
        sofaImageEl.onerror = () => {
            sofaImageEl.style.display = 'none';
            sofaShapeEl.style.display = 'block';
            applySofaSvgColor(sofa.color);
        };
    } else {
        sofaImageEl.style.display = 'none';
        sofaShapeEl.style.display = 'block';
        applySofaSvgColor(sofa.color);
    }
}

/**
 * 매트 비주얼 갱신
 * — 이미지가 있으면 <img> 표시, 없으면 색상 div로 대체
 */
function updateMatVisual(mat) {
    if (mat.image) {
        matImageEl.src = mat.image;

        matImageEl.onload = () => {
            matImageEl.style.display = 'block';
            matShapeEl.style.display = 'none';
        };

        /* 이미지 로드 실패 → 색상 div 폴백 */
        matImageEl.onerror = () => {
            matImageEl.style.display = 'none';
            matShapeEl.style.display = 'block';
            applyMatColor(mat.color);
        };
    } else {
        matImageEl.style.display = 'none';
        matShapeEl.style.display = 'block';
        applyMatColor(mat.color);
    }
}

/**
 * SVG 소파의 그라데이션 색상 변경
 * bodyStop1/2 → 등받이·방석 그라데이션
 * armStop1/2  → 팔걸이 그라데이션
 */
function applySofaSvgColor(hex) {
    const lighter = shadeColor(hex, +18);  /* 하이라이트 */
    const base    = hex;
    const darker  = shadeColor(hex, -18);  /* 아래쪽 그림자 */
    const darkest = shadeColor(hex, -32);  /* 팔걸이 하단 */

    /* CSS stop-color 속성으로 직접 설정 (IE 미지원, 모던 브라우저 OK) */
    setStopColor('bodyStop1', lighter);
    setStopColor('bodyStop2', darker);
    setStopColor('armStop1',  darker);
    setStopColor('armStop2',  darkest);
}

/**
 * 매트 색상 div 색상 변경 + 상단 하이라이트 효과
 */
function applyMatColor(hex) {
    const highlight = shadeColor(hex, +22);
    matShapeEl.style.backgroundColor = hex;
    matShapeEl.style.boxShadow =
        `0 6px 24px rgba(0,0,0,0.45), inset 0 2px 0 ${highlight}`;
}

/* ============================================================
   7. 라벨 텍스트 업데이트
   ============================================================ */

/** '현재 선택' 문구를 두 곳(미리보기 + 푸터)에 동시 반영 */
function updateLabel() {
    const text = `${state.sofa.name} 소파 + ${state.mat.name} 매트`;
    if (previewLabelEl) previewLabelEl.textContent = text;
    if (footerLabelEl)  footerLabelEl.textContent  = text;
}

/* ============================================================
   8. 유틸리티
   ============================================================ */

/**
 * 컨테이너 안에서 선택된 버튼에만 .is-selected 적용
 * @param {Element} container
 * @param {string}  selectedId
 */
function setActiveClass(container, selectedId) {
    container.querySelectorAll('.sim-option').forEach(btn => {
        const active = btn.dataset.id === selectedId;
        btn.classList.toggle('is-selected', active);
        btn.setAttribute('aria-checked', active ? 'true' : 'false');
    });
}

/**
 * SVG <stop> 요소의 stop-color 설정
 * @param {string} stopId  - SVG stop 엘리먼트 id
 * @param {string} color   - HEX 색상
 */
function setStopColor(stopId, color) {
    const el = document.getElementById(stopId);
    if (el) el.style.stopColor = color;
}

/**
 * HEX 색상의 밝기 조절
 * @param {string} hex      - '#rrggbb' 형식
 * @param {number} amount   - 양수: 밝게, 음수: 어둡게 (0~100 범위)
 * @returns {string} 조절된 HEX 색상
 */
function shadeColor(hex, amount) {
    const num = parseInt(hex.replace('#', ''), 16);
    const step = Math.round(255 * amount / 100);
    const r = Math.min(255, Math.max(0, (num >> 16) + step));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0xFF) + step));
    const b = Math.min(255, Math.max(0, (num & 0xFF) + step));
    return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

/* ============================================================
   9. 초기화
   ============================================================ */

function init() {
    /* 옵션 버튼 생성 */
    renderSofaOptions();
    renderMatOptions();

    /* 기본 선택값(첫 번째 항목) 표시 */
    setActiveClass(sofaOptionsEl, state.sofa.id);
    setActiveClass(matOptionsEl,  state.mat.id);

    /* 초기 미리보기 & 라벨 적용 */
    updatePreview();
    updateLabel();
}

document.addEventListener('DOMContentLoaded', init);

/* ============================================================
   10. 추후 확장 함수 (필요 시 주석 해제 후 사용)
   ============================================================ */

/*
// ── 선택 조합 로컬 스토리지 저장 ──────────────────────────────
function saveSelection() {
    localStorage.setItem('sim-selection', JSON.stringify({
        sofaId: state.sofa.id,
        matId:  state.mat.id,
    }));
    alert('조합이 저장되었습니다.');
}

// ── 저장된 조합 불러오기 ────────────────────────────────────────
function loadSavedSelection() {
    const saved = JSON.parse(localStorage.getItem('sim-selection'));
    if (!saved) return;
    const sofa = SOFAS.find(s => s.id === saved.sofaId);
    const mat  = MATS.find(m => m.id  === saved.matId);
    if (sofa) onOptionClick(sofa, 'sofa');
    if (mat)  onOptionClick(mat,  'mat');
}

// ── URL 파라미터로 공유 ────────────────────────────────────────
// 사용 예: ?sofa=beige&mat=navy
function shareURL() {
    const url = new URL(window.location.href);
    url.searchParams.set('sofa', state.sofa.id);
    url.searchParams.set('mat',  state.mat.id);
    navigator.clipboard.writeText(url.toString())
        .then(() => alert('URL이 클립보드에 복사되었습니다.'));
}

function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    const sofa = SOFAS.find(s => s.id === params.get('sofa'));
    const mat  = MATS.find(m => m.id  === params.get('mat'));
    if (sofa) onOptionClick(sofa, 'sofa');
    if (mat)  onOptionClick(mat,  'mat');
}

// ── 미리보기 이미지 다운로드 (html2canvas 라이브러리 필요) ────────
// <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
function downloadImage() {
    html2canvas(document.querySelector('.sim-scene')).then(canvas => {
        const link = document.createElement('a');
        link.download = `sofa-${state.sofa.id}--mat-${state.mat.id}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}
*/
