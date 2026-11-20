# "Two Standards Walk Into an Agent" and AI SRE

Research notes, Nov 2026. Question: how does the JoustMania pattern (OTel in, OpenFeature out, "fast decides, slow reflects") relate to AI SRE?

## 1. What "AI SRE" means in 2025-2026

The common definition is an LLM agent that takes on parts of the incident lifecycle: alert triage, root-cause investigation across telemetry, proposing or running a mitigation, and drafting the postmortem [1][2]. In practice, investigation is the mature part. Remediation is usually gated by a human, and fully unattended action is limited to low-risk, well-understood fixes [1][2].

| Category | Examples | Acts how? |
|---|---|---|
| Investigation / RCA agents (vendor) | Datadog Bits AI SRE / Bits Investigation [3], incident.io AI SRE [2], Rootly [11] | Mostly read-only. Hypotheses, evidence, agent trace view |
| Cloud-provider SRE agents | Azure SRE Agent (GA Mar 2026) [4]; AWS DevOps Agent (GA) [5] | ReadOnly / Review (default) / Autonomous run modes on Azure [4]. AWS produces mitigation plans [5] |
| Observability-platform autonomy | Dynatrace Autonomous SRE Agent ("crawl-walk-run" toward human-on-the-loop) [6] | Triage plus remediation inside guardrails |
| Open source, CNCF | HolmesGPT (CNCF Sandbox Oct 2025; Robusta + Microsoft) [7][8]; K8sGPT (CNCF Sandbox) [9] | HolmesGPT is read-only, RBAC-bound, any OpenAI-compatible or local model [8]. K8sGPT: analyzers plus an in-cluster operator |
| Hyperscaler internal practice | Google SRE "AI in SRE": autonomy levels L0-L4, Actus control plane, "Red Button" [10] | L3 = autonomous only in bounded scenarios. Every action is logged to an agent principal |
| Flag vendors + agents | AWS DevOps Agent + LaunchDarkly MCP (June 2026) [12]; Unleash, Flagsmith, OpenFeature MCP servers [13][14][15] | The agent **recommends** a flag toggle as first-line containment and a human flips it [12] |

Evaluation reality check: IBM's ITBench (ICML 2025) found frontier-model agents solved about 11-14% of SRE scenarios [16]. On the 2026 ITBench-AA leaderboard every frontier model still scores below 50% on Kubernetes RCA [17].

## 2. Where the talk maps directly

- **Telemetry as the agent's senses.** AI SRE agents run on traces, metrics and logs (HolmesGPT, Bits, DevOps Agent via the Datadog MCP [5][8]). The talk does the same thing on a vendor-neutral base: OTel traces, metrics and span metrics. The agent also emits its own spans using the OTel GenAI conventions (`invoke_agent`, `gen_ai.*`), which are still at Development status and now live in a dedicated semconv-genai repo [18][19].
- **Flags as the safe actuator.** Vendors are converging on "disable the flag before you roll back": a toggle is smaller, faster and more reversible than a redeploy [12]. Kill switches and guarded rollouts are standard progressive-delivery tools [20]. The talk makes the flag the agent's *only* actuator.
- **Bounded autonomy.** This matches Azure run modes [4], Google's L2/L3 split with downgrade-on-risk [10], and Dynatrace's crawl-walk-run [6]. The talk's version uses flag-defined magnitude bounds, the `interventions_allowed` kill switch (Google's "Red Button" equivalent), and a confidence-threshold gate.
- **Human-on-the-loop.** Humans set goals and limits in Flagsmith and the agent works inside them. This is the "humans design guardrails, not incident response" shift Google describes [10].
- **Audit trail.** Google ties every agent action to a unique principal with an immutable record [10]. In the talk, agent writes sit in the same flag audit log as human writes.
- **Observe, decide, act, reflect.** The fast loop corresponds to triage and mitigation. The slow LLM retro corresponds to AI-generated postmortems [1][2], and it goes a step further by proposing weight changes, which closes the learning loop.

## 3. Where it differs or goes further

- **It acts through flags, not kubectl or scripts.** Most AI SRE products end at "restart pod / roll back deployment / open a PR" [1]. In the talk, the action space is a typed, bounded, enumerable set of flag values, with no shell and no infrastructure credentials. That makes the blast radius a property of the flag schema rather than of the prompt.
- **It is portable because it is built on standards.** Vendor agents are tied to one platform (Azure resources, Datadog data, AWS). The talk uses OTel for observation and OpenFeature (flagd and Flagsmith are swappable providers) for action. The agent's reasoning can be swapped too: a local model or Claude.
- **Two speeds.** The talk splits a cheap, fast, gated decision loop from a slow, reflective LLM. Most products use one large model for everything.
- **The agent tunes the product, not just repairs it.** The objective is player experience (balance and fun), not uptime alone. This is the AI SRE pattern applied to SLO-style product goals.
- **A safe sandbox.** A party game is a low-stakes place to run the autonomous end of the ladder live. In production you would rarely see that demonstrated honestly.
- **What it does not do.** There is no multi-system RCA over a large estate, no topology reasoning, and no code fixes. Say this openly.

## 4. Critiques of AI SRE and the talk's answers

| Critique | Source | Guardrail in the talk |
|---|---|---|
| Hallucinated diagnoses or fixes become accepted as fact | Rootly: every claim needs evidence [11]; DevOps.com [21] | Decisions are tied to OTel signals. The confidence gate drops low-confidence proposals. The agent's own spans are traceable in Jaeger |
| Blast radius: agent errors spread faster than human errors | Google SRE [10]; InfoWorld [22] | Flag magnitude bounds cap every action. Only flags are writable. Every action is reversible by flipping the flag back |
| Runaway loops | Google: rate limits and circuit breakers [10] | Fast-loop cadence plus the `interventions_allowed` kill switch |
| Trust and accountability: who changed what? | Google: agent principal and immutable log [10]; CSO Online trust ladder [23] | The agent writes under its own identity in the same audit log humans use |
| Evaluation: agents are weak at real RCA | ITBench, ITBench-AA [16][17] | A narrow, measurable task. Per-game retros act as a built-in eval and replay dataset |
| Buying autonomy before you are ready ("AIRE gap") | DevOps.com [21] | Autonomy is a flag: start at zero and raise it per objective |

## 5. Talking points and slide framings

1. **"AI SRE, minus the root password."** Show the industry ladder (read-only, then review, then autonomous [4][10]). Then show that this agent's entire action space is a flag schema.
2. **"Every AI SRE needs senses and hands. Standardize both."** OTel (plus GenAI semconv) for the senses, OpenFeature for the hands. Vendor agents are locked to one platform. This agent is portable.
3. **"Flags are the remediation lever the industry is converging on."** Cite the AWS DevOps Agent + LaunchDarkly "disable the flag before you roll back" guidance [12]. The talk takes the next step and lets the agent flip the flag, within bounds.
4. **"Fast decides, slow reflects = triage loop + automated postmortem."** Map the two loops onto the incident lifecycle diagram used by AI SRE vendors [1][2].
5. **"Autonomy is a feature flag."** `interventions_allowed`, magnitude bounds and confidence threshold are Google's L2/L3 and Red Button [10], expressed in the same tool product teams already use.

Quotable lines (own wording):
- "Let the agent hold the dimmer switch, not the root password."
- "If the agent can only flip flags, you can always flip them back."
- "Autonomy isn't a setting you buy. It's a flag you raise."

## Sources

1. Augment Code, AI SRE incident management guide: https://www.augmentcode.com/guides/ai-sre-incident-management
2. incident.io, What is an AI SRE agent?: https://incident.io/blog/ai-sre-agent-definition
3. Datadog, Bits AI SRE / Bits Investigation: https://www.datadoghq.com/product/ai/bits-ai-sre/ and https://www.datadoghq.com/blog/building-bits-ai-sre/
4. Microsoft, Azure SRE Agent GA (Mar 2026): https://techcommunity.microsoft.com/blog/appsonazureblog/announcing-general-availability-for-the-azure-sre-agent/4500682 and run modes: https://learn.microsoft.com/en-us/azure/sre-agent/run-modes
5. AWS, DevOps Agent GA with Datadog MCP Server: https://aws.amazon.com/blogs/devops/production-ready-autonomous-incident-resolution-with-aws-devops-agent-now-ga-and-datadog-mcp-server/
6. The New Stack, Dynatrace autonomous SRE agents: https://thenewstack.io/dynatrace-autonomous-sre-agents/
7. CNCF, HolmesGPT project page and blog (Jan 2026): https://www.cncf.io/projects/holmesgpt/ and https://www.cncf.io/blog/2026/01/07/holmesgpt-agentic-troubleshooting-built-for-the-cloud-native-era/
8. HolmesGPT repository: https://github.com/HolmesGPT/holmesgpt
9. CNCF blog, K8sGPT: https://www.cncf.io/blog/2024/06/07/generative-ai-for-kubernetes-meet-k8sgpt-open-source-project
10. Google SRE, AI in SRE: https://sre.google/resources/practices-and-processes/ai-engineering-reliable-operations/
11. Rootly, where AI helps and fails across the incident lifecycle: https://rootly.com/ai-sre-guide/lifecycle.md
12. AWS + LaunchDarkly, feature flag orchestration (June 2026): https://aws.amazon.com/blogs/devops/feature-flag-orchestration-with-aws-devops-agent-and-launchdarkly/ and https://launchdarkly.com/blog/feature-flags-aws-devops-agent/
13. OpenFeature MCP server docs: https://openfeature.dev/docs/reference/other-technologies/mcp/
14. Flagsmith MCP server: https://www.flagsmith.com/blog/flagsmith-mcp-server
15. Unleash, runtime control for AI agents: https://www.getunleash.io/blog/runtime-control-for-ai-agents
16. ITBench paper (ICML 2025): https://proceedings.mlr.press/v267/jha25a.html and https://github.com/itbench-hub/ITBench
17. IBM Research + Artificial Analysis, ITBench-AA (May 2026): https://huggingface.co/blog/ibm-research/itbench-aa
18. OTel GenAI agent span conventions: https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-agent-spans/
19. OTel semantic-conventions-genai repository: https://github.com/open-telemetry/semantic-conventions-genai
20. LaunchDarkly, kill switches and progressive rollouts: https://launchdarkly.com/blog/kill-switches-progressive-rollouts-user-targeting/
21. DevOps.com, the "AIRE gap": https://devops.com/the-aire-gap-why-organizations-are-buying-ai-sre-tools-they-arent-ready-to-use/
22. InfoWorld, teaching SRE AI agents to fail safely: https://www.infoworld.com/article/4195114/how-to-teach-sre-ai-agents-to-fail-safely-and-earn-your-teams-trust.html
23. CSO Online, what SRE teams need before they trust AI agents: https://www.csoonline.com/article/4183666/what-sre-teams-need-before-they-trust-ai-agents.html

Caveat: much AI SRE material is vendor-authored, and MTTR claims are unverified. Google SRE, ITBench and the CNCF and OTel specs are the strongest primary sources.
