module.exports = {
    types: [
        { value: "✨feat", name: "feat:          增加新功能" },
        { value: "🐛fix", name: "fix:           修复bug" },
        { value: "📝docs", name: "docs:          修改文档" },
        { value: "⚡️perf", name: "perf:          性能优化" },
        { value: "🎉init", name: "init:          初始提交" },
        { value: "➕add", name: "add:           添加依赖" },
        { value: "🔨build", name: "build:         打包" },
        { value: "🔧chore", name: "chore:         更改配置文件" },
        { value: "👷ci", name: "ci:            CI部署" },
        { value: "🔥del", name: "del:           删除代码/文件" },
        { value: "♻️refactor", name: "refactor:      代码重构" },
        { value: "⏪revert", name: "revert:        版本回退" },
        { value: "🍱style", name: "style:         样式修改不影响逻辑" },
        { value: "✅test", name: "test:          增删测试" },
    ],
    scopes: [],
    messages: {
        type: "选择更改类型:\n",
        scope: "更改的范围:\n",
        // 如果allowcustomscopes为true，则使用
        // customScope: 'Denote the SCOPE of this change:',
        subject: "简短描述:\n",
        body: '详细描述. 使用"|"换行:\n',
        breaking: "Breaking Changes列表:\n",
        footer: "关闭的issues列表. E.g.: #31, #34:\n",
        confirmCommit: "确认提交?",
    },
    allowCustomScopes: true,
    allowBreakingChanges: ["feat", "fix"],
};

// husky 坑，详见 https://www.yuque.com/dingyin-pahte/lnv9wi/nizvqp
// husky 针对 node 与 git 有版本要求，如 husky v4.3.0 要求：`Existing hooks are kept. Requires Node >= 10 and Git >= 2.13.0.`，否则不走 husky 校验，详见 https://www.npmjs.com/package/husky
