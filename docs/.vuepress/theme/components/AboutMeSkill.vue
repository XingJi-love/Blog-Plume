<template>
  <div class="about-me-card-bg vp-blog-post-item about-me-skill">
    <div style="margin-left: 20px">
      <p class="about-me-card-title-normal">技能</p>
      <p class="about-me-card-text-big">我的能力</p>
    </div>
    <!-- 第一行向左移动 -->
    <div class="marquee-row first-row">
      <div class="marquee-content">
        <span v-for="(item, index) in technology" :key="index"> <icon :name="item.icon" /> </span>
        <span v-for="(item, index) in technology" :key="index + technology.length"><icon :name="item.icon" /></span>
      </div>
    </div>
    <!-- 第二行向右移动 -->
    <div class="marquee-row second-row">
      <div class="marquee-content">
        <span v-for="(item, index) in tools" :key="index"><icon :name="item.icon" /></span>
        <span v-for="(item, index) in tools" :key="index + tools.length"><icon :name="item.icon" /></span>
      </div>
    </div>

    <div class="about-me-skill-detail">
      <span v-for="(item, index) in technology" :key="index"> <icon :name="item.icon" /> <span>{{item.type}}</span>  </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const technology = ref([
  // ========== 原有：Java 后端 ==========
  // ----- 核心语言 & 框架（后端） -----
  { type: 'Java', icon: 'devicon:java' },
  { type: 'Spring Boot', icon: 'devicon:spring' },
  { type: 'Spring MVC', icon: 'devicon:spring' },
  { type: 'Spring Cloud', icon: 'devicon:spring' },
  { type: 'Spring Security', icon: 'devicon:spring' },
  { type: 'Hibernate', icon: 'devicon:hibernate' },

  // ----- 数据库 & 缓存 -----
  { type: 'MySQL', icon: 'devicon:mysql' },
  { type: 'PostgreSQL', icon: 'devicon:postgresql' },
  { type: 'Oracle', icon: 'devicon:oracle' },
  { type: 'Redis', icon: 'devicon:redis' },
  { type: 'MongoDB', icon: 'devicon:mongodb' },

  // ----- 消息队列 & 流处理 -----
  { type: 'RabbitMQ', icon: 'devicon:rabbitmq' },
  { type: 'Apache Kafka', icon: 'devicon:apachekafka' },

  // ----- 容器 & 编排 -----
  { type: 'Docker', icon: 'devicon:docker' },
  { type: 'Kubernetes', icon: 'devicon:kubernetes' },

  // ----- 监控 & 日志 -----
  { type: 'Prometheus', icon: 'devicon:prometheus' },
  { type: 'Grafana', icon: 'devicon:grafana' },
  { type: 'ELK Stack', icon: 'devicon:elasticsearch' },

  // ----- API 文档 & 测试（后端） -----
  { type: 'Swagger', icon: 'devicon:swagger' },
  { type: 'OpenAPI', icon: 'simple-icons:openapiinitiative' },
  { type: 'JUnit', icon: 'devicon:junit' },

  // ========== 原有：前端工程化 ==========
  // ----- 前端框架 & 语言 -----
  { type: 'React', icon: 'logos:react' },
  { type: 'Vue.js', icon: 'logos:vue' },
  { type: 'TypeScript', icon: 'devicon:typescript' },

  // ----- 构建工具 & 打包 -----
  { type: 'Vite', icon: 'devicon:vitejs' },
  { type: 'Webpack', icon: 'devicon:webpack' },
  { type: 'Babel', icon: 'devicon:babel' },

  // ----- CSS 预处理 / 框架 -----
  { type: 'Tailwind CSS', icon: 'devicon:tailwindcss' },
  { type: 'Sass', icon: 'devicon:sass' },

  // ----- 代码质量 & 规范（工程化） -----
  { type: 'ESLint', icon: 'devicon:eslint' },
  { type: 'Stylelint', icon: 'simple-icons:stylelint' },

  // ========== AI 应用开发 ==========
  // 1. 编程语言
  { type: 'Python', icon: 'logos:python' },

  // 2. AI 模型与框架
  { type: 'PyTorch', icon: 'logos:pytorch' },
  { type: 'TensorFlow', icon: 'logos:tensorflow' },
  { type: 'Transformers', icon: 'simple-icons:huggingface' },
  { type: 'Hugging Face', icon: 'simple-icons:huggingface' },

  // 3. 应用开发框架
  { type: 'LangChain', icon: 'simple-icons:langchain' },
  { type: 'LlamaIndex', icon: 'simple-icons:llamaindex' },
  { type: 'Semantic Kernel', icon: 'simple-icons:microsoft' }, // 可用微软图标代表

  // 4. 数据与知识处理（向量数据库）
  { type: 'Pinecone', icon: 'simple-icons:pinecone' },
  { type: 'Weaviate', icon: 'simple-icons:weaviate' },

  // 5. 后端与 API 开发（AI 相关）
  { type: 'FastAPI', icon: 'devicon:fastapi' },
  { type: 'Django', icon: 'devicon:django' },

  // 6. 前端开发（AI 应用界面，补充 Next.js）
  { type: 'Next.js', icon: 'logos:nextjs' },
]);

const tools = ref([
  // ========== 原有工具 ==========
  // ----- IDE & 编辑器 -----
  { type: 'IntelliJ IDEA', icon: 'logos:intellij-idea' },
  { type: 'VS Code', icon: 'devicon:vscode' },
  { type: 'Eclipse', icon: 'devicon:eclipse' },

  // ----- 构建工具（后端） -----
  { type: 'Maven', icon: 'devicon:maven' },
  { type: 'Gradle', icon: 'devicon:gradle' },

  // ----- 版本控制 -----
  { type: 'Git', icon: 'devicon:git' },
  { type: 'GitHub', icon: 'devicon:github' },
  { type: 'GitLab', icon: 'devicon:gitlab' },

  // ----- 包管理（前端与后端通用） -----
  { type: 'npm', icon: 'logos:npm' },
  { type: 'yarn', icon: 'logos:yarn' },
  { type: 'pnpm', icon: 'vscode-icons:file-type-light-pnpm' },

  // ----- CI/CD & 自动化 -----
  { type: 'Jenkins', icon: 'devicon:jenkins' },
  { type: 'GitHub Actions', icon: 'devicon:githubactions' },
  { type: 'GitLab CI', icon: 'devicon:gitlab' },

  // ----- 容器 & 编排辅助 -----
  { type: 'Helm', icon: 'devicon:helm' },
  { type: 'Rancher', icon: 'devicon:rancher' },

  // ----- 测试 & 质量（后端） -----
  { type: 'SonarQube', icon: 'devicon:sonarqube' },

  // ----- 接口调试 & 协作 -----
  { type: 'Postman', icon: 'devicon:postman' },
  { type: 'Swagger UI', icon: 'devicon:swagger' },
  { type: 'Figma', icon: 'logos:figma' },
  { type: 'Slack', icon: 'logos:slack' },

  // ----- 服务器 & 部署 -----
  { type: 'Tomcat', icon: 'devicon:tomcat' },
  { type: 'Nginx', icon: 'devicon:nginx' },
  { type: 'AWS', icon: 'logos:aws' },
  { type: 'Azure', icon: 'logos:microsoft-azure' },

  // ========== 🆕 新增：AI 开发辅助工具 ==========
  // Python 包管理 & IDE
  { type: 'pip', icon: 'logos:pip' },
  { type: 'PyCharm', icon: 'devicon:pycharm' },

  // 云平台（补充 GCP）
  { type: 'GCP', icon: 'logos:google-cloud' },
]);
</script>

<style scoped>
.about-me-skill{
  position: relative;
  min-height: 316px;
  padding: 20px 0;
  z-index: 1;
  &:hover .marquee-row{
    opacity: 0;
  }
  &:hover .about-me-skill-detail{
    opacity: 1;
  }
}

.about-me-skill-detail{
  position: absolute;
  top: 100px;
  opacity: 0;
  z-index: 2;
  display: flex;
  padding: 0 20px;
  transition: opacity 0.5s;
  flex-wrap: wrap;
  >span{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 6px 6px 0;
    border-radius: 8px;
    padding: 7px;
    font-size: 16px;
    color: var(--vp-c-text-2);
    background-color: var(--home-action-bnt-bg);
  }
}

.marquee-row {
  transition: opacity 0.6s 0.1s;
  width: 105%;
  margin-left: -6px;
  overflow: hidden;
  white-space: nowrap;
  transform: rotateZ(-6deg);
}

.marquee-content {
  display: inline-flex;
  animation: marquee-left 30s linear infinite;
  >span{
    border-radius: 20%;
    align-content: center;
    align-items: center;
    background-color: var(--about-me-skill-item-bg);
    width: 80px;
    height: 80px;
    font-size: 50px;
    margin: 0 10px;
  }

}
.first-row{
  margin-top: 20px;
}
.second-row{
  margin-top: 20px;
}
.second-row .marquee-content {
  animation: marquee-right 50s linear infinite;
}

@keyframes marquee-left {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

@keyframes marquee-right {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0%); }
}
</style>