document.addEventListener('DOMContentLoaded', async function() {
    const loading = document.getElementById('loading');
    const celebritiesList = document.getElementById('celebritiesList');
    const noResults = document.getElementById('noResults');
    const schoolTitle = document.getElementById('schoolTitle');
    const resultCount = document.getElementById('resultCount');
    const backgroundImage = document.getElementById('backgroundImage');
    
    // URL에서 학교 이름 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const schoolNameFromUrl = urlParams.get('school');
    
    if (!schoolNameFromUrl) {
        window.location.href = 'index.html';
        return;
    }
    
    schoolTitle.textContent = schoolNameFromUrl;
    
    try {
        const response = await fetch(`${API_BASE_URL}/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ school_name: schoolNameFromUrl })
        });
        
        const data = await response.json();
        
        loading.classList.add('hidden');
        
        if (!response.ok || data.error) {
            noResults.classList.remove('hidden');
            noResults.querySelector('p').textContent = data.error || '검색 중 오류가 발생했습니다.';
            return;
        }
        
        if (!data.celebrities || data.celebrities.length === 0) {
            noResults.classList.remove('hidden');
            return;
        }
        
        // 결과 개수 표시
        resultCount.textContent = `총 ${data.count}명의 출신 연예인을 찾았습니다.`;
        
        // 배경 이미지 설정
        const celebritiesWithImages = data.celebrities.filter(c => c.image_url);
        if (celebritiesWithImages.length > 0) {
            // 랜덤하게 1명 선택하거나 첫 번째 연예인 선택
            const selectedCelebrity = celebritiesWithImages[0];
            if (selectedCelebrity.image_url) {
                backgroundImage.style.backgroundImage = `url(${selectedCelebrity.image_url})`;
            }
        }
        
        // 연예인 카드 생성
        data.celebrities.forEach(celebrity => {
            const card = createCelebrityCard(celebrity);
            celebritiesList.appendChild(card);
        });
        
    } catch (error) {
        loading.classList.add('hidden');
        noResults.classList.remove('hidden');
        noResults.querySelector('p').textContent = '검색 중 오류가 발생했습니다.';
        console.error('Error:', error);
    }
});

function createCelebrityCard(celebrity) {
    const card = document.createElement('div');
    card.className = 'celebrity-card';
    
    // 프로필 이미지
    const imageContainer = document.createElement('div');
    imageContainer.className = 'celebrity-image-container';
    
    const image = document.createElement('img');
    image.className = 'celebrity-image';
    if (celebrity.image_url) {
        image.src = celebrity.image_url;
        image.alt = celebrity.name;
        image.onerror = function() {
            // 이미지 로딩 실패 시 기본 이미지
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="20" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3E' + encodeURIComponent(celebrity.name.charAt(0)) + '%3C/text%3E%3C/svg%3E';
        };
    } else {
        // 이미지가 없을 경우 이니셜 표시
        image.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23667eea" width="200" height="200"/%3E%3Ctext fill="white" font-family="sans-serif" font-size="60" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3E' + encodeURIComponent(celebrity.name.charAt(0)) + '%3C/text%3E%3C/svg%3E';
    }
    imageContainer.appendChild(image);
    
    // 정보 컨테이너
    const infoContainer = document.createElement('div');
    infoContainer.className = 'celebrity-info';
    
    const name = document.createElement('div');
    name.className = 'celebrity-name';
    name.textContent = celebrity.name;
    
    const job = document.createElement('div');
    job.className = 'celebrity-job';
    job.textContent = celebrity.job || '연예인';
    
    const group = document.createElement('div');
    group.className = 'celebrity-group';
    if (celebrity.group) {
        group.textContent = `소속: ${celebrity.group}`;
    } else {
        group.textContent = '';
    }
    
    // 여백 추가
    const spacer = document.createElement('div');
    spacer.style.height = '10px';
    
    const link = document.createElement('a');
    link.className = 'celebrity-link';
    link.href = celebrity.namu_url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = '나무위키에서 보기 →';
    
    infoContainer.appendChild(name);
    infoContainer.appendChild(job);
    if (celebrity.group) {
        infoContainer.appendChild(group);
    }
    infoContainer.appendChild(spacer);
    infoContainer.appendChild(link);
    
    card.appendChild(imageContainer);
    card.appendChild(infoContainer);
    
    // 카드 클릭 시 나무위키로 이동
    card.addEventListener('click', function(e) {
        if (e.target !== link && !link.contains(e.target)) {
            window.open(celebrity.namu_url, '_blank');
        }
    });
    
    return card;
}

