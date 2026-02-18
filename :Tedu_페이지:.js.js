// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    console.log("메타태권도 랜딩페이지가 로드되었습니다.");

    // 1. 카드 호버 효과 로깅 (선택사항)
    const cards = document.querySelectorAll('.menu-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            console.log('카드 영역 진입');
        });
    });

    // 2. 하단 CTA 버튼 클릭 이벤트
    const ctaBtns = document.querySelectorAll('.cta-btn');
    ctaBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            alert("도입 문의 페이지로 이동합니다. (데모)");
        });
    });
    
    // 3. 커리큘럼 섹션 스크롤 연동 순차 등장 (Scroll Reveal)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150); 
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const levels = document.querySelectorAll('.level');
    levels.forEach(level => {
        observer.observe(level);
    });
});


/* =========================================
   [통합 기능] 메뉴 가이드 탭 기능 (Web: Fixed / Mobile: Row Injection)
   ========================================= */
const menuGrid = document.querySelector('.menu-grid');

if (menuGrid) {
    // 1. 상세 박스 생성
    let detailView = document.createElement('div');
    detailView.className = 'menu-detail-view';
    // 초기 생성 위치 (웹에서는 맨 뒤)
    menuGrid.appendChild(detailView);

    const menuCards = Array.from(document.querySelectorAll('.menu-card'));

    // 2. 닫기 함수 (부드럽게 닫고, 원상복귀)
    function closeDetail() {
        detailView.style.maxHeight = "0px";
        detailView.classList.remove('show');
        
        // 아이콘 활성화 해제
        menuCards.forEach(c => c.classList.remove('active'));
    }

    // 3. 열기 함수 (부드럽게 열기)
    function openDetail(content) {
        detailView.innerHTML = content;
        detailView.classList.add('show');
        
        requestAnimationFrame(() => {
            const exactHeight = detailView.scrollHeight + 80; 
            detailView.style.maxHeight = exactHeight + "px";
        });
    }

    // 4. 클릭 이벤트
    menuCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            // A. 이미 열린 카드 클릭 -> 닫기
            if (this.classList.contains('active')) {
                closeDetail();
                return;
            }

            // B. 다른 카드 클릭 -> 위치 이동 및 열기
            
            // 기존 활성화 해제
            menuCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');

            // [핵심] 모바일일 경우: 클릭한 줄의 '끝'으로 박스 이동
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
                // 0,1번(1열) 클릭 -> 1번 뒤 / 2,3번(2열) 클릭 -> 3번 뒤
                let targetIndex = Math.floor(index / 2) * 2 + 1;
                if (targetIndex >= menuCards.length) targetIndex = menuCards.length - 1;
                
                const targetCard = menuCards[targetIndex];
                // 이미 그 자리에 있는 게 아니면 이동
                if (targetCard.nextSibling !== detailView) {
                    menuGrid.insertBefore(detailView, targetCard.nextSibling);
                }
            } else {
                // 웹에서는 항상 맨 뒤로 (flex container 아래)
                if (menuGrid.lastChild !== detailView) {
                    menuGrid.appendChild(detailView);
                }
            }

            // 내용 교체 및 열기
            const content = this.querySelector('.menu-text').innerHTML;
            
            // 이미 열려있다면 내용만 교체
            if (detailView.classList.contains('show')) {
                detailView.style.opacity = '0.5'; 
                setTimeout(() => {
                    detailView.innerHTML = content;
                    detailView.style.opacity = '1';
                    const newHeight = detailView.scrollHeight + 80;
                    detailView.style.maxHeight = newHeight + "px";
                }, 150);
            } else {
                openDetail(content);
            }
        });
    });
}

/* [스크롤 탑 버튼 기능] */
const topBtn = document.createElement('button');
topBtn.id = 'scrollTopBtn';
topBtn.innerHTML = '↑';
document.body.appendChild(topBtn);

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) { 
        topBtn.classList.add('show');
    } else {
        topBtn.classList.remove('show');
    }
});

topBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});