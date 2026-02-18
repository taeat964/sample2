document.addEventListener('DOMContentLoaded', function() {
    console.log("T-MES 시스템 페이지가 로드되었습니다.");

    // 1. 스크롤 시 요소 순차 등장 효과 (Scroll Reveal)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // 약간의 딜레이를 주어 순차적으로 등장
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    // CSS 애니메이션을 위해 스타일 직접 주입 (필요시)
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); 
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // 관찰 대상 선택 (카드들)
    const animatedElements = document.querySelectorAll('.card-stat, .feature-box, .vision-card, .split-content');
    
    // 초기 상태 설정 (CSS에서 처리하지 않았을 경우를 대비)
    animatedElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
        observer.observe(el);
    });
    // [3초 자동 롤링 애니메이션]
    const featureItems = document.querySelectorAll('.feature-item');
    
    if (featureItems.length > 0) {
        let currentIndex = 0;

        // 초기 실행: 첫 번째 요소 활성화
        updateActiveItem(0);

        function updateActiveItem(index) {
            featureItems.forEach(item => item.classList.remove('active'));
            featureItems[index].classList.add('active');
        }

        setInterval(() => {
            currentIndex = (currentIndex + 1) % featureItems.length;
            updateActiveItem(currentIndex);
        }, 2000); 
        
        featureItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentIndex = index;
                updateActiveItem(currentIndex);
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    console.log("T-MES 시스템 페이지가 로드되었습니다.");

    // [1. 무한 반복 스크롤 애니메이션]
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // 요소가 10%만 보여도 감지 시작
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // [A] 화면에 들어왔을 때 (내릴 때)
            if (entry.isIntersecting) {
                // data-delay 속성을 읽어서 딜레이 적용 (순차 등장)
                const delay = entry.target.dataset.delay || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay); 
            } 
            // [B] 화면에서 나갔을 때 (올릴 때 / 벗어날 때)
            else {
                // 클래스를 제거하여 투명 상태로 초기화 (다시 애니메이션 가능하도록)
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    // 1-1. 애니메이션 대상 설정 (제목 + 그리드 박스들)
    // T-MES 섹션의 제목과 박스들을 모두 선택합니다.
    const targetSection = document.querySelector('#tmes');
    const animateTargets = targetSection.querySelectorAll('h4, .feature-box');

    animateTargets.forEach((el, index) => {
        // 공통 애니메이션 클래스 강제 주입
        el.classList.add('scroll-animate');
        
        // 순차 등장을 위해 딜레이 시간(ms)을 계산하여 속성으로 심어둠
        // 제목(h4)은 즉시, 박스들은 0.1초씩 늦게
        if(el.tagName === 'H4') {
            el.dataset.delay = 0;
        } else {
            // 박스들은 index에 따라 순차적 딜레이 (제목 때문에 index 보정)
            el.dataset.delay = (index) * 100; 
        }

        observer.observe(el);
    });


    // [2. 기타 애니메이션 대상] (Hero 카드, Vision 카드 등)
    // 이들은 한 번만 등장하고 유지되도록 별도 처리 (원하시면 위 로직에 합쳐도 됨)
    const otherElements = document.querySelectorAll('.card-stat, .vision-card, .split-content');
    const simpleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.add('scroll-animate'); // 스타일 적용
            }
        });
    });
    otherElements.forEach(el => {
        el.classList.add('scroll-animate');
        simpleObserver.observe(el);
    });


    // [3. 3초 자동 롤링 애니메이션] (기존 유지)
    const featureItems = document.querySelectorAll('.feature-item');
    if (featureItems.length > 0) {
        let currentIndex = 0;
        updateActiveItem(0);

        function updateActiveItem(index) {
            featureItems.forEach(item => item.classList.remove('active'));
            featureItems[index].classList.add('active');
        }

        setInterval(() => {
            currentIndex = (currentIndex + 1) % featureItems.length;
            updateActiveItem(currentIndex);
        }, 2000); 
        
        featureItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentIndex = index;
                updateActiveItem(currentIndex);
            });
        });
    }
});