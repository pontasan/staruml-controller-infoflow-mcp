import { createServer, infoflowTools } from "staruml-controller-mcp-core"

export function createInfoflowServer() {
    return createServer("staruml-controller-infoflow", "1.0.0", infoflowTools)
}
