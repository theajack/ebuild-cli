const fs = require("fs");

// 读取commit message
const commitMessage = fs.readFileSync("./.git/COMMIT_EDITMSG", "utf-8").trim();

const Reg = /^(feat|fix|docs|refactor|test|chore):(.*)$/;

if (Reg.test(commitMessage)) {
  console.log("✅ 提交成功");
  process.exit(0);
} else {
  console.error("❌ 提交失败：提交信息格式错误, 需要以 (feat|fix|docs|refactor|test|chore + :) 开头");
  process.exit(1);
}
