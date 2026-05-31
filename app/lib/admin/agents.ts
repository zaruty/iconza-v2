/** IDs dos agentes/universos — usar em rotas ADM e futuras tabelas com agent_id. */
export const AGENT_IDS = [
  "iconmind",
  "iconlove",
  "iconetnia",
  "iconfood",
  "iconart",
] as const;

export type AgentId = (typeof AGENT_IDS)[number];

export function isAgentId(value: string): value is AgentId {
  return (AGENT_IDS as readonly string[]).includes(value);
}
