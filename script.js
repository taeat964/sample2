document.addEventListener('DOMContentLoaded', () => {
    // Tpass 'Coming Soon' 버튼 팝업 로직
    const tpassBtn = document.getElementById('btn-tpass');

    if (tpassBtn) {
        tpassBtn.addEventListener('click', (event) => {
            event.preventDefault();
            alert('준비중입니다.');
        });
    }
});