/* ================================================================
   PRODUCTS.JS — SENSEMOM 전체 상품 쇼케이스
   ================================================================
   상품 추가/수정: PRODUCTS 배열에 항목을 추가하세요.
   이미지는 sensemom.com 관리자 > 상품 상세에서 이미지 URL을 복사하세요.
   ================================================================ */

const PRODUCTS = [

    /* ── 매트리스 ─────────────────────────────────── */
    {
        id: 11,
        cat: 'mattress', catLabel: '매트리스',
        name: '투사이드',
        desc: '프리미엄 방수커버 무료 증정',
        price: 179000, origin: 0,
        badge: 'BEST',
        img: 'https://sensemom.com/web/product/medium/202507/85674e574d72051cfd12afb6ebfaf0da.webp',
        url: 'https://sensemom.com/product/detail.html?product_no=11',
    },
    {
        id: 111,
        cat: 'mattress', catLabel: '매트리스',
        name: '시그니처 더나인s',
        desc: '프리미엄 방수커버 무료 증정',
        price: 129000, origin: 0,
        badge: 'BEST',
        img: 'https://sensemom.com/web/product/medium/202507/fad7d07e2d1074c32ad51a1aff9e2480.webp',
        url: 'https://sensemom.com/product/detail.html?product_no=111',
    },
    {
        id: 30,
        cat: 'mattress', catLabel: '매트리스',
        name: '뉴 시그니처9',
        desc: '',
        price: 129000, origin: 0,
        badge: 'NEW',
        img: 'https://sensemom.com/web/product/medium/202512/195d0b05ad46bf085fcaa808b7dffa7d.webp',
        url: 'https://sensemom.com/product/detail.html?product_no=30',
    },
    {
        id: 13,
        cat: 'mattress', catLabel: '매트리스',
        name: '베이직',
        desc: '',
        price: 79000, origin: 0,
        badge: '',
        img: 'https://sensemom.com/web/product/medium/202511/ce778564aba5230b21a9fc495d9133da.webp',
        url: 'https://sensemom.com/product/detail.html?product_no=13',
    },
    {
        id: 313,
        cat: 'mattress', catLabel: '매트리스',
        name: 'ZIP 3단 접이식 매트리스',
        desc: 'MS / SS / Q 사이즈',
        price: 59000, origin: 0,
        badge: 'NEW',
        img: 'https://sensemom.com/web/product/medium/202603/1a19a38b2e9107f2c39609fd11f87ad2.jpg',
        url: 'https://sensemom.com/product/detail.html?product_no=313',
    },

    /* ── 토퍼 ─────────────────────────────────────── */
    {
        id: 293,
        cat: 'topper', catLabel: '토퍼',
        name: '에어볼 6cm 토퍼',
        desc: '전용 세탁망 증정 / 리오셀 혼방 원단',
        price: 89000, origin: 149000,
        badge: 'SALE',
        img: 'https://sensemom.com/web/product/medium/202602/96b6488e3c2c21a3c64330b420ff97c7.jpg',
        url: 'https://sensemom.com/product/detail.html?product_no=293',
    },
    {
        id: 254,
        cat: 'topper', catLabel: '토퍼',
        name: '더 포근한 6cm 토퍼',
        desc: '구름처럼 포근한 토퍼 매트리스',
        price: 69000, origin: 159000,
        badge: 'BEST',
        img: 'https://sensemom.com/web/product/medium/202603/747fc769f7f7d75bda6cca58d99b9926.webp',
        url: 'https://sensemom.com/product/detail.html?product_no=254',
    },
    {
        id: 160,
        cat: 'topper', catLabel: '토퍼',
        name: '토퍼 멀티 보관가방',
        desc: '',
        price: 9000, origin: 14000,
        badge: '',
        img: 'https://sensemom.com/web/product/medium/202501/72b616ce71b66330efdcfe19ab672c0d.jpg',
        url: 'https://sensemom.com/product/detail.html?product_no=160',
    },

    /* ── 이불 ─────────────────────────────────────── */
    {
        id: 122,
        cat: 'bedding', catLabel: '이불',
        name: '하이퍼쿨 아이스 냉감이불',
        desc: '-7℃ 냉감 효과 / 베스트셀러',
        price: 39000, origin: 0,
        badge: 'BEST',
        img: 'https://sensemom.com/web/product/medium/202506/7e0e98c1f10a95e67f4e29d8c7b123ae.jpg',
        url: 'https://sensemom.com/product/detail.html?product_no=122',
    },
    {
        id: 314,
        cat: 'bedding', catLabel: '이불',
        name: '오차드 리버시블 차렵이불',
        desc: '양면 사용 가능한 사계절 이불',
        price: 29000, origin: 0,
        badge: 'NEW',
        img: 'https://sensemom.com/web/product/medium/202603/f8a3b9c7e1d0a5f24198b6c3e7d9a2b1.jpg',
        url: 'https://sensemom.com/product/detail.html?product_no=314',
    },
    {
        id: 300,
        cat: 'bedding', catLabel: '이불',
        name: '에어리프 시어서커 차렵이불',
        desc: '통기성 좋은 시어서커 소재',
        price: 34000, origin: 0,
        badge: '',
        img: 'https://sensemom.com/web/product/medium/202603/a4d8f2c6b9e1a7d3c5f8b2e4a9d6c3f7.jpg',
        url: 'https://sensemom.com/product/list.html?cate_no=62',
    },
    {
        id: 302,
        cat: 'bedding', catLabel: '이불',
        name: '뉴질랜드 포근한 양모 이불',
        desc: '세탁망 증정 / 뉴질랜드산 양모',
        price: 129000, origin: 0,
        badge: '',
        img: 'https://sensemom.com/web/product/medium/202604/b3e7a1d9c5f2a8b4e6d0c7f3a9b5e2d8.jpg',
        url: 'https://sensemom.com/product/list.html?cate_no=62',
    },

    /* ── 필로우 ───────────────────────────────────── */
    {
        id: 17,
        cat: 'pillow', catLabel: '필로우',
        name: '숨쉬는 베개',
        desc: '인체공학 설계 / 프리미엄 경추베개',
        price: 54900, origin: 119000,
        badge: 'BEST',
        img: 'https://sensemom.com/web/product/medium/202605/2d919d822d5a7e4014c20323c95914d1.jpg',
        url: 'https://sensemom.com/product/detail.html?product_no=17',
    },
    {
        id: 316,
        cat: 'pillow', catLabel: '필로우',
        name: '스위치 경추 베개',
        desc: '높이 조절 가능 / 런칭특가',
        price: 49000, origin: 109000,
        badge: 'NEW',
        img: 'https://sensemom.com/web/product/medium/202604/1a82553f26e5a69c90315e68194ee8f9.jpg',
        url: 'https://sensemom.com/product/detail.html?product_no=316',
    },
    {
        id: 21,
        cat: 'pillow', catLabel: '필로우',
        name: '바디필로우',
        desc: '포근한 U자형 대형 바디필로우',
        price: 79000, origin: 135000,
        badge: '',
        img: 'https://sensemom.com/web/product/medium/202605/4b7267a84f6767c75533ef49ca34a7ab.jpg',
        url: 'https://sensemom.com/product/detail.html?product_no=21',
    },

    /* ── 세트상품 ─────────────────────────────────── */
    {
        id: 195,
        cat: 'set', catLabel: '세트',
        name: '투사이드 + 토퍼 6cm 세트',
        desc: '매트리스 + 토퍼 기획세트',
        price: 208000, origin: 328000,
        badge: 'SET',
        img: 'https://sensemom.com/web/product/medium/202601/15c33430b3d0ec11b5bbe957cffea632.jpg',
        url: 'https://sensemom.com/product/detail.html?product_no=195',
    },
    {
        id: 156,
        cat: 'set', catLabel: '세트',
        name: '더나인s + 토퍼 6cm 세트',
        desc: '매트리스 + 토퍼 기획세트',
        price: 158000, origin: 288000,
        badge: 'SET',
        img: 'https://sensemom.com/web/product/medium/202601/96f2fd53198681b51b2ead9a9d933bcb.jpg',
        url: 'https://sensemom.com/product/detail.html?product_no=156',
    },
    {
        id: 178,
        cat: 'set', catLabel: '세트',
        name: '투사이드 + 숨쉬는베개(2P) 세트',
        desc: '매트리스 + 프리미엄 베개 기획',
        price: 259000, origin: 0,
        badge: 'SET',
        img: 'https://sensemom.com/web/product/medium/202504/87ef8ed67641daf36026aeaac8bdf542.jpg',
        url: 'https://sensemom.com/product/detail.html?product_no=178',
    },
    {
        id: 47,
        cat: 'set', catLabel: '세트',
        name: '[1+1] 투사이드 두 개 세트',
        desc: '1+1 특가 / 투사이드 2매 구성',
        price: 343000, origin: 0,
        badge: 'SET',
        img: 'https://sensemom.com/web/product/medium/202604/d0679b46fed95c947b431e4979173a87.jpg',
        url: 'https://sensemom.com/product/detail.html?product_no=47',
    },
    {
        id: 148,
        cat: 'set', catLabel: '세트',
        name: '[1+1] 더나인s 두 개 세트',
        desc: '1+1 특가 / 더나인s 2매 구성',
        price: 243000, origin: 0,
        badge: 'SET',
        img: 'https://sensemom.com/web/product/medium/202604/133a889fbdfdd517367f170e6ff9456c.jpg',
        url: 'https://sensemom.com/product/detail.html?product_no=148',
    },
];

/* ================================================================
   현재 필터
   ================================================================ */
let currentCat = 'all';

/* ================================================================
   렌더링
   ================================================================ */
function renderProducts(cat) {
    const grid     = document.getElementById('catalogGrid');
    const countEl  = document.getElementById('catalogCount');
    const filtered = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);

    countEl.textContent = `${filtered.length}개 상품`;

    grid.innerHTML = filtered.map(p => {
        const badgeHTML = p.badge
            ? `<span class="pcard__badge pcard__badge--${p.badge.toLowerCase()}">${p.badge}</span>`
            : '';
        const originHTML = p.origin
            ? `<span class="pcard__origin">${fmtPrice(p.origin)}</span>`
            : '';

        return `
        <a class="pcard" href="${p.url}" target="_blank" data-cat="${p.cat}">
            <div class="pcard__img-wrap">
                <img class="pcard__img"
                     src="${p.img}"
                     alt="${p.name}"
                     loading="lazy"
                     onerror="this.closest('.pcard__img-wrap').style.background='#E8E5E0';this.style.display='none'">
                ${badgeHTML}
            </div>
            <div class="pcard__info">
                <span class="pcard__cat">${p.catLabel}</span>
                <span class="pcard__name">${p.name}</span>
                ${p.desc ? `<span class="pcard__desc">${p.desc}</span>` : ''}
                <div class="pcard__price-row">
                    <span class="pcard__price">${fmtPrice(p.price)}</span>
                    ${originHTML}
                </div>
            </div>
            <div class="pcard__cta">
                <span>자세히 보기</span>
                <span class="pcard__cta-arrow">→</span>
            </div>
        </a>`;
    }).join('');
}

/* ================================================================
   필터 버튼 이벤트
   ================================================================ */
function initFilters() {
    document.querySelectorAll('.filter__btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter__btn').forEach(b => b.classList.remove('is-on'));
            btn.classList.add('is-on');
            currentCat = btn.dataset.cat;
            renderProducts(currentCat);
        });
    });
}

/* ================================================================
   유틸
   ================================================================ */
function fmtPrice(n) {
    return n.toLocaleString('ko-KR') + '원';
}

/* ================================================================
   초기화
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
    initFilters();
    renderProducts('all');
});
