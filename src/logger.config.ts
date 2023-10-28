import { terminalLogger } from "@banglarthek/logger";

export const devLogger = terminalLogger.create({
  loggerEnvironments: ["development", "staging"],
});

export const logger = terminalLogger.create({
  loggerEnvironments: ["development", "production", "staging"],
});
