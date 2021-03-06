import { useEffect, useMemo, useState } from 'react';
import { WorkspaceWindowState } from '../types/workspace';
import { closeWorkspace, getWorkspaceStore, OpenWorkspace, Prompt, WorkspaceStoreState } from './workspaces';

export interface WorkspacesInfo {
  active: boolean;
  windowState: WorkspaceWindowState;
  workspaces: Array<OpenWorkspace>;
  prompt: Prompt;
}

export function useWorkspaces(): WorkspacesInfo {
  const [workspaces, setWorkspaces] = useState<Array<OpenWorkspace>>([]);
  const [prompt, setPrompt] = useState<Prompt>(null);

  useEffect(() => {
    function update(state: WorkspaceStoreState) {
      setWorkspaces(state.openWorkspaces.map((w) => ({ ...w, closeWorkspace: () => closeWorkspace(w.name) })));
      setPrompt(state.prompt);
    }
    update(getWorkspaceStore().getState());
    getWorkspaceStore().subscribe(update);
  }, []);

  const windowState = useMemo(() => {
    if (workspaces.length === 0) {
      return WorkspaceWindowState.hidden;
    } else if (workspaces.length === 1) {
      return workspaces[0].preferredWindowSize;
    }
  }, [workspaces]);

  return {
    active: workspaces.length > 0,
    windowState,
    workspaces,
    prompt,
  };
}
