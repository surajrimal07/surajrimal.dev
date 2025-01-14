import type { AI } from '@/lib/chat/actions';
import {
  useActions as untypedUseActions,
  useUIState as untypedUseUIState,
} from 'ai/rsc';

export function useUIState() {
  return untypedUseUIState<typeof AI>();
}

export function useActions() {
  return untypedUseActions<typeof AI>();
}
