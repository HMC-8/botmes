const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bot is running!");
});

app.listen(port, () => {
  console.log(`Web server listening on port ${port}`);
});

const { spawn } = require("child_process");
const log = require("./utils/log");
require('./includes/chess/covua');

const startBot = () => {
    log('🌸 ĐANG KHỞI ĐỘNG BOT', "⟦ KÍCH HOẠT ⟧⪼ ");
    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "niio-limit.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", async (exitCode) => {
        if (exitCode === 1) {
            log("🔄 BOT ĐANG KHỞI ĐỘNG LẠI!!!", "[ Khởi động ]");
            startBot();
        } else if (exitCode >= 200 && exitCode < 300) {
            const delay = (exitCode - 200) * 1000;
            log(`🌸 BOT ĐÃ ĐƯỢC KÍCH HOẠT, VUI LÒNG CHỜ ${delay / 1000} GIÂY!!!`, "[ Khởi động ]");
            await new Promise((resolve) => setTimeout(resolve, delay));
            startBot();
        } else if (exitCode === 134) {
            log("🔄 BOT ĐANG KHỞI ĐỘNG LẠI DO LỖI NẶNG!!!", "[ Khởi động ]");
            startBot();
        } else {
            log(`Kết thúc chương trình với mã thoát ${exitCode}`, "[ Khởi động ]");
            process.exit(0)
        }
    });

    child.on("error", (error) => {
        log(`Đã xảy ra lỗi: ${error.message}`, "[ Khởi động ]");
    });
};

startBot();
