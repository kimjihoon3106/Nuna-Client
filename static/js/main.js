document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const schoolInput = document.getElementById('schoolInput');
    const searchBtn = document.getElementById('searchBtn');
    const loading = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    
    searchForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const schoolName = schoolInput.value.trim();
        
        if (!schoolName) {
            showError('학교 이름을 입력해주세요.');
            return;
        }
        
        // UI 업데이트
        searchBtn.disabled = true;
        loading.classList.remove('hidden');
        errorDiv.classList.add('hidden');
        errorDiv.textContent = '';
        
        try {
            const response = await fetch(`${API_BASE_URL}/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ school_name: schoolName })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || '검색 중 오류가 발생했습니다.');
            }
            
            // 결과 페이지로 이동
            const params = new URLSearchParams({ school: schoolName });
            window.location.href = `results.html?${params.toString()}`;
            
        } catch (error) {
            showError(error.message);
        } finally {
            searchBtn.disabled = false;
            loading.classList.add('hidden');
        }
    });
    
    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
    }
});
