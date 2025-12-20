// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化
    init();
});

// 初始化函数
function init() {
    // 头像加载失败处理
    const avatarImg = document.getElementById('avatar-img');
    const avatarPlaceholder = document.getElementById('avatar-placeholder');
    
    if (avatarImg) {
        avatarImg.onerror = function() {
            this.style.display = 'none';
            if (avatarPlaceholder) {
                avatarPlaceholder.style.display = 'block';
            }
        };
    }
    
    // 简介展开/收起功能
    const expandBtn = document.getElementById('expand-bio');
    const bioContent = document.getElementById('bio-content');
    
    if (expandBtn && bioContent) {
        expandBtn.addEventListener('click', function() {
            const isCollapsed = bioContent.classList.contains('collapsed');
            const icon = this.querySelector('i');
            
            if (isCollapsed) {
                bioContent.classList.remove('collapsed');
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                bioContent.classList.add('collapsed');
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    }
    
    // 平台切换功能
    const platformTabs = document.querySelectorAll('.platform-tab');
    const embedContents = document.querySelectorAll('.embed-content');
    
    platformTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            
            // 更新活动标签
            platformTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 显示对应的嵌入内容
            embedContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `embed-${platform}`) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // 弹窗功能
    const openModalBtn = document.getElementById('open-works-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('works-modal');
    
    // 打开弹窗
    if (openModalBtn) {
        openModalBtn.addEventListener('click', function() {
            loadWorksList();
            modalOverlay.style.display = 'block';
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        });
    }
    
    // 关闭弹窗
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    // 点击弹窗外部关闭
    if (modal) {
        modal.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // ESC键关闭弹窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // 语言切换功能
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.id.replace('lang-', '');
            switchLanguage(lang);
            
            // 更新活动按钮
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// 关闭弹窗函数
function closeModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('works-modal');
    
    if (modalOverlay) modalOverlay.style.display = 'none';
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 从JSON文件加载作品列表
function loadWorksFromJSON() {
    return new Promise((resolve, reject) => {
        // 检测环境并选择合适的加载方式
        const isLocalFile = window.location.protocol === 'file:';
        
        if (isLocalFile) {
            // 本地文件环境：使用XMLHttpRequest
            loadJSONViaXHR().then(data => resolve(generateWorksHTML(data))).catch(reject);
        } else {
            // HTTP/HTTPS环境：使用fetch
            loadJSONViaFetch().then(data => resolve(generateWorksHTML(data))).catch(() => {
                // fetch失败，尝试XMLHttpRequest
                loadJSONViaXHR().then(data => resolve(generateWorksHTML(data))).catch(reject);
            });
        }
    });
}

// 使用fetch加载JSON
function loadJSONViaFetch() {
    return fetch('popup.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP错误! 状态: ${response.status}`);
            }
            return response.json();
        });
}

// 使用XMLHttpRequest加载JSON（适用于本地文件）
function loadJSONViaXHR() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'popup.json', true);
        xhr.responseType = 'json';
        
        xhr.onload = function() {
            if (xhr.status === 200 || xhr.status === 0) { // status 0 for file://
                try {
                    const data = xhr.response;
                    if (data && data.works) {
                        resolve(data);
                    } else {
                        reject(new Error('JSON格式错误或未找到works数据'));
                    }
                } catch (e) {
                    reject(new Error('JSON解析失败'));
                }
            } else {
                reject(new Error(`HTTP错误! 状态: ${xhr.status}`));
            }
        };
        
        xhr.onerror = function() {
            reject(new Error('JSON文件加载失败'));
        };
        
        try {
            xhr.send();
        } catch (e) {
            reject(e);
        }
    });
}

// 根据JSON数据生成HTML
function generateWorksHTML(data) {
    if (!data || !data.works || !Array.isArray(data.works)) {
        throw new Error('作品数据格式错误');
    }
    
    let worksHTML = '<div class="works-list">';
    
    data.works.forEach(work => {
        worksHTML += `
            <div class="work-item">
                <div class="work-header">
                    <h4 class="work-title">${escapeHtml(work.title)}</h4>
                    <span class="work-time" data-time="${work.time}">${escapeHtml(work.displayTime || work.time)}</span>
                </div>
                <p class="work-description">${escapeHtml(work.description)}</p>
                <div class="work-platforms">
                    ${generatePlatformLinks(work.platforms)}
                </div>
            </div>
        `;
    });
    
    worksHTML += '</div>';
    return worksHTML;
}

// 生成平台链接HTML
function generatePlatformLinks(platforms) {
    if (!platforms || !Array.isArray(platforms)) {
        return '';
    }
    
    let linksHTML = '';
    platforms.forEach(platform => {
        linksHTML += `
            <a href="${escapeHtml(platform.url)}" target="_blank" 
               class="work-platform-link ${escapeHtml(platform.name)}" 
               title="${escapeHtml(platform.title)}">
                <i class="${escapeHtml(platform.icon)}"></i>
            </a>
        `;
    });
    return linksHTML;
}

// HTML转义函数
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}



// 内嵌的备用内容（如果所有方法都失败）
const fallbackWorksHTML = `
<div class="works-list">
    <!-- 请编辑popup.json文件来更新作品列表 -->
    <div class="work-item">
        <div class="work-header">
            <h4 class="work-title">请编辑 popup.json 文件</h4>
            <span class="work-time" data-time="2024-01-01">2024年1月1日</span>
        </div>
        <p class="work-description">请编辑 popup.json 文件来更新作品列表内容。</p>
        <div class="work-platforms">
            <a href="#" target="_blank" class="work-platform-link disabled" title="待添加">
                <i class="fas fa-plus"></i>
            </a>
        </div>
    </div>
</div>
`;

// 加载作品列表
function loadWorksList() {
    const worksListContainer = document.getElementById('works-list-container');
    if (!worksListContainer) return;
    
    // 显示加载中状态
    worksListContainer.innerHTML = `
        <div class="loading-message">
            <p>加载作品列表中...</p>
        </div>
    `;
    
    // 从JSON文件加载作品数据
    loadWorksFromJSON()
        .then(worksHTML => {
            worksListContainer.innerHTML = worksHTML;
            loadFontAwesome();
        })
        .catch(error => {
            console.error('加载作品列表失败:', error);
            showErrorMessage(worksListContainer, error);
        });
}

// 显示错误信息
function showErrorMessage(container, error) {
    container.innerHTML = `
        <div class="error-message">
            <p>无法加载作品列表。</p>
            <p>请确保popup.json文件存在于网站根目录中。</p>
            <p><strong>错误详情:</strong> ${error.message}</p>
            <div style="margin-top: 20px;">
                <button onclick="loadWorksList()" class="retry-btn">重试</button>
                <button onclick="showManualInstructions()" class="manual-btn">手动操作指南</button>
            </div>
            <div id="manual-instructions" style="display: none; margin-top: 20px; text-align: left; background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
                <h4>🔧 手动解决方案:</h4>
                <ol>
                    <li><strong>方法一:</strong> 使用本地服务器（推荐）
                        <ul>
                            <li>安装 Node.js</li>
                            <li>运行: <code>npx http-server</code></li>
                            <li>访问 <code>http://localhost:8080</code></li>
                        </ul>
                    </li>
                    <li><strong>方法二:</strong> 使用VS Code Live Server
                        <ul>
                            <li>安装 Live Server 扩展</li>
                            <li>右键 index.html → "Open with Live Server"</li>
                        </ul>
                    </li>
                    <li><strong>方法三:</strong> 检查JSON格式
                        <ul>
                            <li>确保 popup.json 是有效的JSON格式</li>
                            <li>检查是否包含 works 数组</li>
                            <li>验证每个作品对象的结构</li>
                        </ul>
                    </li>
                </ol>
            </div>
        </div>
    `;
}

// 显示手动操作指南
function showManualInstructions() {
    const instructions = document.getElementById('manual-instructions');
    if (instructions) {
        instructions.style.display = instructions.style.display === 'none' ? 'block' : 'none';
    }
}



// 加载Font Awesome图标（如果未在主页面加载）
function loadFontAwesome() {
    // 检查是否已加载Font Awesome
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(link);
        console.log('Font Awesome 已动态加载');
    }
}

// 语言切换函数
function switchLanguage(lang) {
    // 获取所有带有data-lang-key属性的元素
    const elements = document.querySelectorAll('[data-lang-key]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.value = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // 更新页面语言属性
    document.documentElement.lang = lang;
    
    // 保存语言偏好到本地存储
    localStorage.setItem('preferred-language', lang);
}

const translations = {
    'zh': {
        'main-name': 'シロユメ_Shiroyume',
        'subtitle': '纯白之梦',
        'bio-title': '简介',
        'bio-short': 'VOCALOID-P / Musical / Coder',
        'bio-line1': '曲风：Hardcore、Trance、Drum & Bass',
        'bio-line2': '喜欢：Kasane Teto、Chis-A、Kafu、Hatsune Miku',
        'bio-line3': '语言：中文（母语）、英语（一些）',
        'bio-line4': '曾用名：无意识_koishi、KOI',
        'latest-works': '最新作品',
        'bilibili-tab': 'B站',
        'youtube-tab': 'YouTube',
        'netease-tab': '网易云',
        'upcoming': '即将发布',
        'upcoming-default': 'My New Music!!!',
        'works-btn': '查看所有作品',
        'works-modal-title': '作品列表'
    },
    'ja': {
        'main-name': 'シロユメ_Shiroyume',
        'subtitle': '纯白之梦',
        'bio-title': 'プロフィール',
        'bio-short': 'VOCALOID-P / Musical / Coder',
        'bio-line1': 'ジャンル：Hardcore、Trance、Drum & Bass',
        'bio-line2': '好き：Kasane Teto、Chis-A、Kafu、Hatsune Miku',
        'bio-line3': '言語：中国語（母国語）、英語（一些）',
        'bio-line4': '旧名：无意识_koishi、KOI',
        'latest-works': '最新作品',
        'bilibili-tab': 'Bilibili',
        'youtube-tab': 'YouTube',
        'netease-tab': '网易云音乐',
        'upcoming': '近日公開',
        'upcoming-default': 'My New Music!!!',
        'works-btn': 'すべての作品を見る',
        'works-modal-title': '作品一覧'
    },
    'en': {
        'main-name': 'シロユメ_Shiroyume',
        'subtitle': '纯白之梦',
        'bio-title': 'Bio',
        'bio-short': 'VOCALOID-P / Musical / Coder',
        'bio-line1': 'Genres: Hardcore, Trance, Drum & Bass',
        'bio-line2': 'Likes: Kasane Teto, Chis-A, Kafu, Hatsune Miku',
        'bio-line3': 'Languages: Chinese (Native), English (Some)',
        'bio-line4': 'Former names: 无意识_koishi, KOI',
        'latest-works': 'Latest Works',
        'bilibili-tab': 'Bilibili',
        'youtube-tab': 'YouTube',
        'netease-tab': 'Netease Cloud',
        'upcoming': 'Upcoming',
        'upcoming-default': 'My New Music!!!',
        'works-btn': 'View All Works',
        'works-modal-title': 'Works List'
    }
};