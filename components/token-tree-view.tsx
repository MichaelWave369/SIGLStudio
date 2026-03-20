import type { TokenTreeNode } from "@/lib/types";

function Node({ node, depth = 0 }: { node: TokenTreeNode; depth?: number }) {
  return (
    <li>
      <div className="rounded-md border border-line bg-slate-950/30 px-2 py-1 text-sm" style={{ marginLeft: depth * 10 }}>
        {node.label}
      </div>
      {node.children && node.children.length > 0 ? (
        <ul className="mt-1 space-y-1">
          {node.children.map((child) => (
            <Node key={child.id} node={child} depth={depth + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function TokenTreeView({ tree }: { tree: TokenTreeNode[] }) {
  if (!tree.length) return <p className="text-sm text-muted">No token tree available.</p>;
  return (
    <ul className="space-y-2">
      {tree.map((node) => (
        <Node key={node.id} node={node} />
      ))}
    </ul>
  );
}
