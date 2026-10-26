# Prerequisites

In this step you will set up everything you need before starting the React Native 0.83 upgrade workshop. By the end you will have Vega SDK 0.24 (the first SDK with React Native 0.83 support) installed and active, and the Amazon Devices Builder Tools MCP server wired up to your AI coding assistant.

## Step 1: Install the Vega SDK 0.24

ℹ️ **Why 0.24?** Vega SDK 0.24 is the first SDK release that ships with support for React Native 0.83. Earlier SDKs only support React Native 0.72, so make sure you're on 0.24 or later before starting the upgrade.

**Supported operating systems:** macOS (Apple Silicon) or Ubuntu. Support for Intel Macs reaches end of life with 0.24, see the [release notes](https://developer.amazon.com/docs/vega/0.24/vega-release-notes#support-for-intel-mac-x86_64-reaches-end-of-life).

⚠️ **Important:** Windows and Windows Subsystem for Linux (WSL) are not supported or tested. The Vega SDK requires native macOS or Linux/Ubuntu installations only.

Depending on network speeds, this installation can take 5 to 15 minutes. We strongly recommend you download and install prior to the workshop.

**New to Vega?** Follow the official [Install the Vega SDK](https://developer.amazon.com/docs/vega/0.24/install-vega-sdk) guide. It covers the system dependencies, the Vega CLI and the SDK install.

**Already have the Vega CLI? Update to 0.24**

```bash
vega sdk list-remote                  # find the latest 0.24.x version
vega sdk install <version number>     # the 0.24.x version from the list
```

**Verify**

```bash
vega --version
```

Check that `Active SDK Version` shows **0.24** or higher.

## Step 2: Install MCP Server

To use our MCP server or AI prompts you will need at least one AI coding assistant such as Cursor, Claude Code, Copilot, Kiro, or Cline. We have included support for these and have tested primarily on **Kiro & Claude Code** with **Claude Sonnet 4.6 and 4.7** models. We expect these prompts to work across most models. To learn more about MCPs, visit [modelcontextprotocol.io](https://modelcontextprotocol.io/).

ℹ️ **Don't have an AI coding assistant?** Try [Kiro](https://kiro.dev/). It comes with free credits upon first use.

Install the Amazon Devices Builder Tools MCP server by running the following commands in a terminal window.

**Option A: Create a new workspace for the workshop**

```bash
# Create a workspace directory for the workshop
mkdir ~/vegaWorkshop && cd ~/vegaWorkshop

# Install MCP and steering document
npx -y @amazon-devices/amazon-devices-buildertools-mcp@latest init-context
```

**Option B: Use your existing Vega app workspace**

If you'd rather configure the MCP inside an existing Vega project, change into that project directory first and run `init-context` from there:

```bash
cd /path/to/your/vega-app
npx -y @amazon-devices/amazon-devices-buildertools-mcp@latest init-context
```

Either option will prompt you to select your AI coding assistant and configure the MCP server for it.

To manually configure the MCP server, add the following to your AI agent's MCP settings JSON:

```json
"amazon-devices-buildertools-mcp": {
  "command": "npx",
  "args": ["-y", "@amazon-devices/amazon-devices-buildertools-mcp@latest"],
  "type": "stdio"
}
```

Verify your setup is correct by running the following command in the terminal window:

```bash
npx -y @amazon-devices/amazon-devices-buildertools-mcp@latest check-status
```

You should see your agent's context document and MCP configuration as ✅ Configured.

**Verify MCP version:** run the following command and ensure the version is `0.1.31` or higher.

```bash
npx -y @amazon-devices/amazon-devices-buildertools-mcp@latest --version
```

⚠️ **Important:** Enable MCP in your AI agent if it isn't enabled by default. For example, to enable MCP in Kiro IDE, click the **Enable MCP** button.

---

**Next:** [Upgrade to React Native 0.83](./1-rn-0.83-upgrade.md)
