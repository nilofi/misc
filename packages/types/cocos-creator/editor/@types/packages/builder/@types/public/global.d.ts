import { IBuild } from "./index.js";

// 定义 builder 进程内的全局变量
declare global {
    const Build: IBuild;
}
