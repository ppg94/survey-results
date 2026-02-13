// === 页面状态管理器 ===

const PageState = {
  PRE_SURVEY: 'pre-survey',
  RANKING_SURVEY: 'ranking-survey',
  COMPLETION: 'completion'
};

/**
 * 切换页面视图
 * @param {string} pageState - PageState 枚举值
 */
function showPage(pageState) {
  const sections = [
    PageState.PRE_SURVEY,
    PageState.RANKING_SURVEY,
    PageState.COMPLETION
  ];

  sections.forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.className = (id === pageState) ? 'view-active' : 'view-hidden';
    }
  });
}

// === 题目数据配置 ===

const QUESTIONS = [
  {
    id: 6,
    queryImage: '题目6/题目图片/video26_000166.jpg',
    options: [
      '题目6/选项图片/video26_000216.jpg',
      '题目6/选项图片/video26_000330.jpg',
      '题目6/选项图片/video26_000380.jpg',
      '题目6/选项图片/video26_000452.jpg',
      '题目6/选项图片/video26_000474.jpg'
    ]
  },
  {
    id: 7,
    queryImage: '题目7/题目图片/video58_001569.jpg',
    options: [
      '题目7/选项图片/video58_001542.jpg',
      '题目7/选项图片/video59_000104.jpg',
      '题目7/选项图片/video59_000227.jpg',
      '题目7/选项图片/video59_000265.jpg',
      '题目7/选项图片/video59_000478.jpg'
    ]
  },
  {
    id: 8,
    queryImage: '题目8/题目图片/video26_000592.jpg',
    options: [
      '题目8/选项图片/video26_000772.jpg',
      '题目8/选项图片/video26_000776.jpg',
      '题目8/选项图片/video57_000075.jpg',
      '题目8/选项图片/video57_000175.jpg',
      '题目8/选项图片/video57_000644.jpg'
    ]
  },
  {
    id: 9,
    queryImage: '题目9/题目图片/video62_000323.jpg',
    options: [
      '题目9/选项图片/video62_000267.jpg',
      '题目9/选项图片/video62_000325.jpg',
      '题目9/选项图片/video62_000350.jpg',
      '题目9/选项图片/video62_000388.jpg',
      '题目9/选项图片/video62_000594.jpg'
    ]
  },
  {
    id: 10,
    queryImage: '题目10/题目图片/video62_000589.jpg',
    options: [
      '题目10/选项图片/video62_000604.jpg',
      '题目10/选项图片/video62_000644.jpg',
      '题目10/选项图片/video63_000276.jpg',
      '题目10/选项图片/video63_000326.jpg',
      '题目10/选项图片/video63_000359.jpg'
    ]
  },
  {
    id: 11,
    queryImage: '题目11/题目图片/video63_000677.jpg',
    options: [
      '题目11/选项图片/video63_000697.jpg',
      '题目11/选项图片/video63_000707.jpg',
      '题目11/选项图片/video63_000724.jpg',
      '题目11/选项图片/video66_000456.jpg',
      '题目11/选项图片/video66_000509.jpg'
    ]
  },
  {
    id: 12,
    queryImage: '题目12/题目图片/video67_000841.jpg',
    options: [
      '题目12/选项图片/video068_000154.jpg',
      '题目12/选项图片/video67_000862.jpg',
      '题目12/选项图片/video67_000887.jpg',
      '题目12/选项图片/video67_001058.jpg',
      '题目12/选项图片/video68_000829.jpg'
    ]
  },
  {
    id: 13,
    queryImage: '题目13/题目图片/video68_000994.jpg',
    options: [
      '题目13/选项图片/video069_000090.jpg',
      '题目13/选项图片/video069_000113.jpg',
      '题目13/选项图片/video68_001014.jpg',
      '题目13/选项图片/video69_000288.jpg',
      '题目13/选项图片/video69_000369.jpg'
    ]
  },
  {
    id: 14,
    queryImage: '题目14/题目图片/video71_000843.jpg',
    options: [
      '题目14/选项图片/video072_000227.jpg',
      '题目14/选项图片/video072_000268.jpg',
      '题目14/选项图片/video72_000551.jpg',
      '题目14/选项图片/video73_000387.jpg',
      '题目14/选项图片/video73_000531.jpg'
    ]
  },
  {
    id: 15,
    queryImage: '题目15/题目图片/video086_000565.jpg',
    options: [
      '题目15/选项图片/video087_000122.jpg',
      '题目15/选项图片/video088_000545.jpg',
      '题目15/选项图片/video86_001010.jpg',
      '题目15/选项图片/video87_000469.jpg',
      '题目15/选项图片/video87_000634.jpg'
    ]
  }
];

// === 前置问卷模块 ===

// 有效选项常量
const VALID_TITLES = ['初级', '中级', '高级'];
const VALID_EXPERIENCES = ['少于5年', '5-10年', '10-15年', '15年以上'];
const VALID_CASE_COUNTS = ['少于20例', '20-50例', '50-100例', '100例以上'];

// 存储前置问卷数据
var preSurveyData = null;

/**
 * 验证前置问卷数据（纯函数，不依赖 DOM）
 * @param {Object} formData - { name, specialty, title, experience, caseCount }
 * @returns {string[]} 错误信息数组，空数组表示验证通过
 */
function validatePreSurvey(formData) {
  var errors = [];

  if (!formData.name || !formData.name.trim()) {
    errors.push('请输入姓名');
  }
  if (!formData.specialty || !formData.specialty.trim()) {
    errors.push('请输入专业');
  }
  if (VALID_TITLES.indexOf(formData.title) === -1) {
    errors.push('请选择职称');
  }
  if (VALID_EXPERIENCES.indexOf(formData.experience) === -1) {
    errors.push('请选择腹腔镜手术经验年限');
  }
  if (VALID_CASE_COUNTS.indexOf(formData.caseCount) === -1) {
    errors.push('请选择主刀腹腔镜手术例数');
  }

  return errors;
}

/**
 * 从 DOM 中读取前置问卷表单数据
 * @returns {Object} PreSurveyData 对象
 */
function getPreSurveyData() {
  var titleRadio = document.querySelector('input[name="title"]:checked');
  var experienceRadio = document.querySelector('input[name="experience"]:checked');
  var caseCountRadio = document.querySelector('input[name="caseCount"]:checked');

  return {
    name: (document.getElementById('name') || {}).value || '',
    specialty: (document.getElementById('specialty') || {}).value || '',
    title: titleRadio ? titleRadio.value : '',
    experience: experienceRadio ? experienceRadio.value : '',
    caseCount: caseCountRadio ? caseCountRadio.value : ''
  };
}

/**
 * 显示或清除验证错误信息
 * @param {string[]} errors - 错误信息数组
 * @param {Object} formData - 表单数据，用于判断哪些字段有错
 */
function showValidationErrors(errors, formData) {
  // 字段到错误 span ID 的映射
  var fieldErrors = {
    name: { id: 'name-error', msg: '请输入姓名' },
    specialty: { id: 'specialty-error', msg: '请输入专业' },
    title: { id: 'title-error', msg: '请选择职称' },
    experience: { id: 'experience-error', msg: '请选择腹腔镜手术经验年限' },
    caseCount: { id: 'caseCount-error', msg: '请选择主刀腹腔镜手术例数' }
  };

  // 清除所有错误
  Object.keys(fieldErrors).forEach(function (key) {
    var el = document.getElementById(fieldErrors[key].id);
    if (el) {
      el.textContent = '';
    }
  });

  var summary = document.getElementById('form-error-summary');
  if (summary) {
    summary.textContent = '';
    summary.hidden = true;
  }

  // 如果没有错误，直接返回
  if (errors.length === 0) return;

  // 显示各字段的错误
  errors.forEach(function (errMsg) {
    Object.keys(fieldErrors).forEach(function (key) {
      if (fieldErrors[key].msg === errMsg) {
        var el = document.getElementById(fieldErrors[key].id);
        if (el) {
          el.textContent = errMsg;
        }
      }
    });
  });

  // 显示错误摘要
  if (summary) {
    summary.textContent = '请完善以下信息：' + errors.join('、');
    summary.hidden = false;
  }
}

// === 表单提交事件绑定 ===

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('pre-survey-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var data = getPreSurveyData();
        var errors = validatePreSurvey(data);

        showValidationErrors(errors, data);

        if (errors.length === 0) {
          preSurveyData = data;
          showPage(PageState.RANKING_SURVEY);
          if (typeof initRankingSurvey === 'function') {
            initRankingSurvey();
          }
        }
      });
    }
  });
}

// === 排序问卷模块 ===

var currentQuestionIndex = 0;
var rankings = new Array(QUESTIONS.length); // 存储每题的排序结果

/**
 * 随机排列数组（Fisher-Yates 洗牌算法）
 * @param {any[]} arr - 原数组
 * @returns {any[]} 新的随机排列数组
 */
function shuffleArray(arr) {
  var result = arr.slice();
  for (var i = result.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

/**
 * 生成进度文本
 * @param {number} questionIndex - 题目索引（0-9）
 * @returns {string} 进度文本
 */
function getProgressText(questionIndex) {
  return '第 ' + (questionIndex + 1) + ' 题 / 共 ' + QUESTIONS.length + ' 题';
}

/**
 * 生成位次编号数组
 * @param {number} count - 选项数量
 * @returns {number[]} 位次编号数组 [1, 2, ..., count]
 */
function getRankNumbers(count) {
  var result = [];
  for (var i = 1; i <= count; i++) {
    result.push(i);
  }
  return result;
}

/**
 * 初始化排序问卷，加载第一题
 */
function initRankingSurvey() {
  currentQuestionIndex = 0;
  // 为每题初始化随机排列的选项（如果尚未保存排序结果）
  for (var i = 0; i < QUESTIONS.length; i++) {
    if (!rankings[i]) {
      rankings[i] = shuffleArray(QUESTIONS[i].options);
    }
  }
  renderQuestion(currentQuestionIndex);
}

/**
 * 渲染指定题目
 * @param {number} questionIndex - 题目索引（0-9）
 */
function renderQuestion(questionIndex) {
  var question = QUESTIONS[questionIndex];
  if (!question) return;

  // 更新进度文本
  var progressEl = document.getElementById('progress-text');
  if (progressEl) {
    progressEl.textContent = getProgressText(questionIndex);
  }

  // 更新查询图片
  var queryImg = document.getElementById('query-image');
  if (queryImg) {
    queryImg.src = question.queryImage;
    queryImg.alt = '查询图片 - 题目' + question.id;
  }

  // 渲染选项图片
  var container = document.getElementById('options-container');
  if (container) {
    container.innerHTML = '';
    var orderedOptions = rankings[questionIndex] || question.options;
    orderedOptions.forEach(function (optPath, idx) {
      var item = document.createElement('div');
      item.className = 'option-item';
      item.setAttribute('draggable', 'true');
      item.setAttribute('data-src', optPath);

      var badge = document.createElement('span');
      badge.className = 'rank-badge';
      badge.textContent = idx + 1;

      var img = document.createElement('img');
      img.src = optPath;
      img.alt = '选项图片 ' + (idx + 1);
      img.onerror = function () {
        this.alt = '图片加载失败';
        this.style.minHeight = '100px';
        this.style.background = '#f0f0f0';
      };

      item.appendChild(badge);
      item.appendChild(img);
      container.appendChild(item);
    });

    // 初始化拖拽（如果 DragSortManager 已实现）
    if (typeof initDragSort === 'function') {
      initDragSort(container);
    }
  }

  // 更新导航按钮状态
  var btnPrev = document.getElementById('btn-prev');
  var btnNext = document.getElementById('btn-next');

  if (btnPrev) {
    btnPrev.disabled = (questionIndex === 0);
  }

  if (btnNext) {
    if (questionIndex === QUESTIONS.length - 1) {
      btnNext.textContent = '提交问卷';
      btnNext.onclick = function () { submitSurvey(); };
    } else {
      btnNext.textContent = '下一题';
      btnNext.onclick = function () { goToNext(); };
    }
  }
}

/**
 * 保存当前题目的排序结果
 */
function saveCurrentRanking() {
  var container = document.getElementById('options-container');
  if (!container) return;
  var items = container.querySelectorAll('.option-item');
  var order = [];
  items.forEach(function (item) {
    order.push(item.getAttribute('data-src'));
  });
  if (order.length > 0) {
    rankings[currentQuestionIndex] = order;
  }
}

/**
 * 获取所有排序结果
 * @returns {Object[]} RankingResult 数组
 */
function getAllRankings() {
  return QUESTIONS.map(function (q, i) {
    var rankedOptions = (rankings[i] || q.options).map(function (fullPath) {
      // 提取文件名
      var parts = fullPath.split('/');
      return parts[parts.length - 1];
    });
    return {
      questionId: q.id,
      queryImage: q.queryImage.split('/').pop(),
      rankedOptions: rankedOptions
    };
  });
}

/**
 * 导航到上一题
 */
function goToPrevious() {
  if (currentQuestionIndex > 0) {
    saveCurrentRanking();
    currentQuestionIndex--;
    renderQuestion(currentQuestionIndex);
  }
}

/**
 * 导航到下一题
 */
function goToNext() {
  if (currentQuestionIndex < QUESTIONS.length - 1) {
    saveCurrentRanking();
    currentQuestionIndex++;
    renderQuestion(currentQuestionIndex);
  }
}

// === 拖拽排序管理器 ===

var dragSrcEl = null;

/**
 * 初始化拖拽排序功能
 * @param {HTMLElement} container - 选项图片容器元素
 */
function initDragSort(container) {
  var items = container.querySelectorAll('.option-item');
  items.forEach(function (item) {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('dragenter', handleDragEnter);
    item.addEventListener('dragleave', handleDragLeave);
    item.addEventListener('drop', handleDrop);
    item.addEventListener('dragend', handleDragEnd);
  });
}

function handleDragStart(e) {
  dragSrcEl = this;
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', '');
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
  e.preventDefault();
  this.classList.add('drag-over');
}

function handleDragLeave() {
  this.classList.remove('drag-over');
}

function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  this.classList.remove('drag-over');

  if (dragSrcEl && dragSrcEl !== this) {
    var container = this.parentNode;
    var allItems = Array.from(container.children);
    var srcIndex = allItems.indexOf(dragSrcEl);
    var destIndex = allItems.indexOf(this);

    if (srcIndex < destIndex) {
      container.insertBefore(dragSrcEl, this.nextSibling);
    } else {
      container.insertBefore(dragSrcEl, this);
    }

    updateRankNumbers(container);
    saveCurrentRanking();
  }
}

function handleDragEnd() {
  this.classList.remove('dragging');
  var container = this.parentNode;
  if (container) {
    var items = container.querySelectorAll('.option-item');
    items.forEach(function (item) {
      item.classList.remove('drag-over');
    });
  }
}

/**
 * 获取当前排列顺序
 * @param {HTMLElement} container - 容器元素
 * @returns {string[]} 文件名数组
 */
function getCurrentOrder(container) {
  var items = container.querySelectorAll('.option-item');
  var order = [];
  items.forEach(function (item) {
    order.push(item.getAttribute('data-src'));
  });
  return order;
}

/**
 * 设置排列顺序（恢复已保存的排序）
 * @param {HTMLElement} container - 容器元素
 * @param {string[]} orderedFileNames - 排序后的文件名数组
 */
function setOrder(container, orderedFileNames) {
  var items = Array.from(container.querySelectorAll('.option-item'));
  var itemMap = {};
  items.forEach(function (item) {
    itemMap[item.getAttribute('data-src')] = item;
  });
  orderedFileNames.forEach(function (fileName) {
    if (itemMap[fileName]) {
      container.appendChild(itemMap[fileName]);
    }
  });
  updateRankNumbers(container);
}

/**
 * 更新位次编号显示
 * @param {HTMLElement} container - 容器元素
 */
function updateRankNumbers(container) {
  var items = container.querySelectorAll('.option-item');
  items.forEach(function (item, idx) {
    var badge = item.querySelector('.rank-badge');
    if (badge) {
      badge.textContent = idx + 1;
    }
  });
}

// === 结果导出模块 ===

/**
 * 组装完整的问卷结果
 * @param {Object} preSurveyData - 前置问卷数据
 * @param {Object[]} rankings - 排序结果数组
 * @returns {Object} SurveyResult
 */
function buildResult(preSurveyData, rankings) {
  return {
    preSurvey: preSurveyData,
    rankings: rankings,
    submittedAt: new Date().toISOString()
  };
}

/**
 * 序列化为 JSON 字符串
 * @param {Object} result - SurveyResult
 * @returns {string} JSON 字符串
 */
function serializeResult(result) {
  return JSON.stringify(result, null, 2);
}

/**
 * 反序列化 JSON 字符串
 * @param {string} jsonString - JSON 字符串
 * @returns {Object} SurveyResult
 */
function deserializeResult(jsonString) {
  return JSON.parse(jsonString);
}

/**
 * 生成下载文件名
 * @param {string} name - 医生姓名
 * @param {string} timestamp - ISO 时间戳
 * @returns {string} 文件名
 */
function generateFileName(name, timestamp) {
  // 将时间戳中的冒号替换为短横线，使文件名合法
  var safeTimestamp = timestamp.replace(/:/g, '-');
  return '问卷结果_' + name + '_' + safeTimestamp + '.json';
}

// === GitHub 上传配置 ===
var GITHUB_CONFIG = {
  // Token 通过 URL 参数传入，不硬编码在源码中
  token: '',
  owner: 'ppg94',
  repo: 'survey-results',
  branch: 'main',
  folder: 'results'
};

// 从 URL 参数中读取 token
(function () {
  if (typeof window !== 'undefined') {
    var params = new URLSearchParams(window.location.search);
    var t = params.get('t');
    if (t) {
      GITHUB_CONFIG.token = t;
    }
  }
})();

/**
 * 将问卷结果上传到 GitHub 仓库
 * @param {Object} result - SurveyResult
 * @returns {Promise<boolean>} 是否上传成功
 */
function uploadToGitHub(result) {
  var jsonStr = serializeResult(result);
  var content = btoa(unescape(encodeURIComponent(jsonStr))); // Base64 编码（支持中文）
  var fileName = generateFileName(result.preSurvey.name, result.submittedAt);
  var filePath = GITHUB_CONFIG.folder + '/' + fileName;

  var url = 'https://api.github.com/repos/' + GITHUB_CONFIG.owner + '/' + GITHUB_CONFIG.repo + '/contents/' + encodeURIComponent(filePath);

  return fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + GITHUB_CONFIG.token,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json'
    },
    body: JSON.stringify({
      message: '添加问卷结果: ' + result.preSurvey.name,
      content: content,
      branch: GITHUB_CONFIG.branch
    })
  }).then(function (response) {
    if (response.ok) {
      return true;
    }
    return response.text().then(function (text) {
      console.error('GitHub API 错误:', response.status, text);
      return false;
    });
  }).catch(function (err) {
    console.error('上传失败:', err);
    return false;
  });
}

/**
 * 备用：触发文件下载（上传失败时使用）
 * @param {Object} result - SurveyResult
 */
function downloadResult(result) {
  var jsonStr = serializeResult(result);
  var blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = generateFileName(result.preSurvey.name, result.submittedAt);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * 提交问卷
 */
function submitSurvey() {
  saveCurrentRanking();
  var result = buildResult(preSurveyData, getAllRankings());

  // 禁用提交按钮，防止重复提交
  var btnNext = document.getElementById('btn-next');
  if (btnNext) {
    btnNext.disabled = true;
    btnNext.textContent = '正在提交...';
  }

  uploadToGitHub(result).then(function (success) {
    if (success) {
      showPage(PageState.COMPLETION);
    } else {
      // 上传失败，降级为本地下载
      downloadResult(result);
      showPage(PageState.COMPLETION);
      var hint = document.querySelector('.completion-hint');
      if (hint) {
        hint.textContent = '在线提交失败，结果已下载到本地，请手动发送给管理员。';
        hint.style.color = '#dc2626';
      }
    }
  });
}

// === Node.js/Jest 兼容导出 ===
if (typeof module !== 'undefined') {
  module.exports = {
    PageState, showPage, QUESTIONS,
    validatePreSurvey, getPreSurveyData, showValidationErrors,
    VALID_TITLES, VALID_EXPERIENCES, VALID_CASE_COUNTS,
    shuffleArray, getProgressText, getRankNumbers,
    initRankingSurvey, renderQuestion, saveCurrentRanking, getAllRankings,
    goToPrevious, goToNext, submitSurvey,
    initDragSort, getCurrentOrder, setOrder, updateRankNumbers,
    buildResult, serializeResult, deserializeResult, generateFileName, downloadResult, uploadToGitHub,
    get currentQuestionIndex() { return currentQuestionIndex; },
    set currentQuestionIndex(v) { currentQuestionIndex = v; },
    get rankings() { return rankings; },
    set rankings(v) { rankings = v; }
  };
}