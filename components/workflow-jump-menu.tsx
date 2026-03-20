"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getContextActions } from "@/lib/contextActions";

export function WorkflowJumpMenu() {
  const pathname = usePathname();
  const actions = [...getContextActions(pathname), { label: "Open Analytics", route: "/analytics" }, { label: "Open Recipes", route: "/recipes" }];
  return (
    <div className="flex flex-wrap gap-2 text-xs">
      {actions.map((action) => <Link key={`${action.route}-${action.label}`} href={action.route as never} className="rounded border border-line px-2 py-1">{action.label}</Link>)}
    </div>
  );
}
