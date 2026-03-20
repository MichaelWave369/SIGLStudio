export type EngineMode = "mock" | "vibe";

export type GlyphCategory = "generator" | "operator" | "state";

export interface GlyphDefinition {
  symbol: string;
  name: string;
  category: GlyphCategory;
  description: string;
  related: string[];
  example: string;
  semanticGroup: "core" | "flow" | "boundary" | "state";
}

export interface SigilGraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface SigilGraphEdge {
  from: string;
  to: string;
  label?: string;
}

export interface ValidationObligation {
  id: string;
  label: string;
  status: "pass" | "warn" | "fail";
  detail: string;
}

export interface ValidationResult {
  valid: boolean;
  bridgeScore: number;
  issues: string[];
  warnings: string[];
  obligations: ValidationObligation[];
  mode: EngineMode;
  modeReason: string;
}

export interface InspectResult {
  canonical: Record<string, unknown>;
  parsedSummary: {
    inferredForm: string;
    tokenCount: number;
  };
  tokenTree: TokenTreeNode[];
  renderHints: string[];
  obligationsTrace: ValidationObligation[];
  issues: string[];
  warnings: string[];
  graph: {
    nodes: SigilGraphNode[];
    edges: SigilGraphEdge[];
  };
  mode: EngineMode;
  modeReason: string;
}

export interface TokenTreeNode {
  id: string;
  label: string;
  children?: TokenTreeNode[];
}

export interface TemporalSequenceStep {
  id: string;
  label: string;
  sigil: string;
}

export interface ExportMetadata {
  export_version: string;
  created_at: string;
  engine_mode: EngineMode;
  source_hash: string;
  sequence_present: boolean;
  glyph_count: number;
  obligation_count: number;
}

export interface ExportBundle {
  metadata: ExportMetadata;
  files: {
    "sigil.txt": string;
    "sigil.vibe": string;
    "sigil.svg": string;
    "sigil.json": Record<string, unknown>;
  };
}

export interface ExportPayload {
  source: string;
  json: Record<string, unknown>;
  vibeSnippet: string;
  svg: string;
  bundle: ExportBundle;
}

export interface DraftEntry {
  id: string;
  name: string;
  source: string;
  updatedAt: string;
  route: string;
}

export interface StudioSettings {
  showEngineStatus: boolean;
  shortcutsEnabled: boolean;
  reducedMotion: boolean;
}

export interface DiffInspectionSnapshot {
  source: string;
  inspect: InspectResult | null;
  validation: ValidationResult | null;
  sourceHash: string;
  sequencePresent: boolean;
}

export interface DiffSummary {
  same: boolean;
  glyphCountDelta: number;
  obligationCountDelta: number;
  sequencePresenceDelta: boolean;
  sourceHashEqual: boolean;
  categories: Array<"structure changed" | "obligations changed" | "issues changed" | "render hints changed" | "source changed only">;
}

export interface BatchItem {
  id: string;
  title: string;
  source: string;
  sequence: boolean;
}

export interface BatchItemResult {
  item: BatchItem;
  validation: ValidationResult | null;
  inspect: InspectResult | null;
  sourceHash: string;
}

export interface ProjectPackItem {
  id: string;
  type: "sigil" | "sequence" | "note";
  title: string;
  source: string;
  hash: string;
  labels: string[];
}

export interface ProjectPack {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  version: string;
  engine_mode_last_used: EngineMode;
  export_version: string;
  pack_hash: string;
  items: ProjectPackItem[];
}

export interface RelationEdge {
  from: string;
  to: string;
  label: "related" | "paired" | "state-adjacent" | "operator-neighbor" | "example-associated";
}

export type SessionStepType = "compose" | "inspect" | "validate" | "compare" | "reflect" | "export" | "present";

export interface SessionCheckpoint {
  id: string;
  label: string;
  completed: boolean;
}

export interface SessionStep {
  id: string;
  type: SessionStepType;
  title: string;
  note: string;
  linkedSource?: string;
  checkpoints: SessionCheckpoint[];
}

export interface GuidedSession {
  id: string;
  title: string;
  description: string;
  steps: SessionStep[];
  created_at: string;
  updated_at: string;
}

export interface SessionProgress {
  sessionId: string;
  currentStepIndex: number;
  completedCheckpointIds: string[];
}

export type PresentationFocusMode = "symbol-first" | "analysis-first" | "balanced";

export interface PresentationConfig {
  id: string;
  title: string;
  sourceType: "compose" | "sequence" | "diff" | "batch" | "project" | "session";
  slides: Array<{ id: string; title: string; source: string; notes?: string }>;
  focusMode: PresentationFocusMode;
  cleanMode: boolean;
  created_at: string;
}

export type ArtifactType = "poster" | "symbol-card" | "sequence-card" | "diff-card" | "project-overview";

export interface ArtifactTemplateConfig {
  id: string;
  type: ArtifactType;
  title: string;
  subtitle: string;
  source: string;
  notes?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface ProvenanceMeta {
  engine_mode: EngineMode;
  mode_reason: string;
  source_hash?: string;
  item_hash?: string;
  pack_hash?: string;
  export_version: string;
  created_at: string;
  obligation_count?: number;
  issue_count?: number;
  normalized_shape_version?: string;
}

export type RuntimeMode = "web" | "desktop";

export interface BoardLayer {
  id: string;
  title: string;
  visible: boolean;
  locked: boolean;
}

export interface BoardConnection {
  id: string;
  from_block_id: string;
  to_block_id: string;
  label?: string;
}

export type ReviewStatus = "draft" | "in-review" | "approved" | "revise" | "archived";

export interface ReviewFlowSection {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface ReviewFlow {
  id: string;
  source_review_pack_id?: string;
  title: string;
  status: ReviewStatus;
  author_notes: string;
  reviewer_notes: string;
  decision_notes: string;
  next_actions: string[];
  sections: ReviewFlowSection[];
  created_at: string;
  updated_at: string;
  schema_version: string;
}

export type ArtifactSetPreset = "review-pack" | "presentation-summary" | "project-overview" | "diff-package" | "board-snapshot";

export type ArtifactSetType = ArtifactType | "review-summary-card" | "board-summary-card" | "session-summary-card";

export interface ArtifactSetItem {
  id: string;
  artifact_type: ArtifactSetType;
  file_name: string;
  title: string;
  source_ref: string;
}

export interface ArtifactSetManifest {
  id: string;
  preset: ArtifactSetPreset;
  theme_id: string;
  export_version: string;
  created_at: string;
  item_count: number;
  manifest_hash: string;
  items: ArtifactSetItem[];
}

export interface ReviewTemplateDefinition {
  id: string;
  title: string;
  description: string;
  sections: ReviewFlowSection[];
  suggested_notes_fields: string[];
  recommended_artifact_preset: ArtifactSetPreset;
  recommended_presentation_mode: PresentationFocusMode;
  decision_prompts: string[];
  next_action_prompts: string[];
  schema_version: string;
  origin: "built-in" | "local";
}

export interface BoardPipelineManifest {
  id: string;
  board_id: string;
  board_hash: string;
  output_type: "artifact-set" | "review-pack" | "presentation" | "handoff" | "session";
  selected_block_ids: string[];
  theme_id: string;
  created_at: string;
  export_version: string;
  source_context: string;
}

export interface AnalyticsSummary {
  source: string;
  obligations_by_type: Record<string, number>;
  obligations_by_status: Record<string, number>;
  issue_by_severity: Record<string, number>;
  graph_metrics: { node_count: number; edge_count: number };
  bridge_score?: number;
  analytics_shape_version: string;
}

export interface ExtensionEntry {
  id: string;
  name: string;
  kind: "review-template-pack" | "artifact-preset" | "handoff-formatter" | "board-starter" | "analytics-grouping";
  origin: "built-in" | "local";
  schema_version: string;
  config: Record<string, unknown>;
}

export type PipelineSourceType = "board" | "review-pack" | "review-flow" | "batch" | "diff" | "project";
export type PipelineTargetType = "review-pack" | "artifact-set" | "presentation" | "handoff" | "session";

export interface CompositionPipelineManifest {
  id: string;
  source_type: PipelineSourceType;
  source_id: string;
  target_type: PipelineTargetType;
  included_ids: string[];
  theme_id: string;
  source_hash?: string;
  board_hash?: string;
  pack_hash?: string;
  created_at: string;
  export_version: string;
}

export interface ExtensionPack {
  id: string;
  title: string;
  schema_version: string;
  created_at: string;
  entries: ExtensionEntry[];
}

export interface AnalyticsDashboardFilter {
  source: "all" | PipelineSourceType;
  min_issue_count: number;
}

export interface RecipeAction {
  id: string;
  kind: "validate" | "inspect" | "summarize-analytics" | "create-artifact-set" | "create-review-pack" | "create-presentation" | "export-handoff" | "apply-theme" | "create-board" | "create-session";
  params: Record<string, string | number | boolean>;
}

export interface AutomationRecipe {
  id: string;
  name: string;
  description: string;
  source_scope: PipelineSourceType | "global";
  output_target: PipelineTargetType | "none";
  actions: RecipeAction[];
  last_run_at?: string;
  schema_version: string;
}

export interface WorkflowSnapshot {
  id: string;
  route: string;
  label: string;
  created_at: string;
}
