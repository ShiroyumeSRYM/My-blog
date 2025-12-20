// IP检测和语言自动设置
document.addEventListener('DOMContentLoaded', function() {
    // 优先使用用户之前选择的语言
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang) {
        setLanguage(savedLang);
        return;
    }
    
    // 检测IP地区并设置语言
    detectIPAndSetLanguage();
});

// 检测IP并设置语言
async function detectIPAndSetLanguage() {
    try {
        // 使用免费的IP定位API
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
            throw new Error('IP检测失败');
        }
        
        const data = await response.json();
        const countryCode = data.country_code;
        
        // 根据国家代码设置语言
        let lang = 'en'; // 默认英语
        
        if (countryCode === 'CN') {
            lang = 'zh'; // 中国
            // 设置默认平台为B站
            setDefaultPlatform('bilibili');
        } else if (countryCode === 'JP') {
            lang = 'ja'; // 日本
            setDefaultPlatform('youtube');
        } else {
            lang = 'en'; // 其他国家
            setDefaultPlatform('youtube');
        }
        
        setLanguage(lang);
        
    } catch (error) {
        console.error('IP检测失败，使用默认设置:', error);
        // 失败时使用浏览器语言
        const browserLang = navigator.language.toLowerCase();
        let lang = 'en';
        
        if (browserLang.startsWith('zh')) {
            lang = 'zh';
            setDefaultPlatform('bilibili');
        } else if (browserLang.startsWith('ja')) {
            lang = 'ja';
            setDefaultPlatform('youtube');
        } else {
            lang = 'en';
            setDefaultPlatform('youtube');
        }
        
        setLanguage(lang);
    }
}

// 设置语言
function setLanguage(lang) {
    // 更新语言按钮状态
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.classList.remove('active');
        if (button.id === `lang-${lang}`) {
            button.classList.add('active');
        }
    });
    
    // 调用主语言切换函数
    if (typeof switchLanguage === 'function') {
        switchLanguage(lang);
    }
}

// 设置默认平台
function setDefaultPlatform(platform) {
    // 等待DOM完全加载
    setTimeout(() => {
        const platformTabs = document.querySelectorAll('.platform-tab');
        const embedContents = document.querySelectorAll('.embed-content');
        
        // 移除所有活动状态
        platformTabs.forEach(tab => tab.classList.remove('active'));
        embedContents.forEach(content => content.classList.remove('active'));
        
        // 设置指定平台为活动状态
        const targetTab = document.querySelector(`.platform-tab[data-platform="${platform}"]`);
        const targetContent = document.getElementById(`embed-${platform}`);
        
        if (targetTab) targetTab.classList.add('active');
        if (targetContent) targetContent.classList.add('active');
    }, 100);
}

// 备用IP检测方法（如果第一个API失败）
async function backupIPDetection() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) {
            throw new Error('备用IP检测失败');
        }
        
        const data = await response.json();
        const ip = data.ip;
        
        // 这里可以使用其他服务进行IP到国家的转换
        // 由于API限制，我们只做简单处理
        console.log('IP地址:', ip);
        
    } catch (error) {
        console.error('备用IP检测也失败:', error);
    }
}
