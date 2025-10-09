/* JSX */
/* @jsxImportSource preact */
import { useState, useEffect, useRef, useMemo } from "preact/hooks";
import { MachineResponse, MachineStatus } from "../../lib/backend-types";
import { ConfirmUserIntent } from "./states/ConfirmUserIntent.tsx";
import { ChevronRight, SendIcon } from "lucide-preact";
import { ChevronDown } from "lucide-preact";
import TextareaAutosize from "react-textarea-autosize";
import { AnimatedEllipsis } from "./AnimatedEllipsis.tsx";
import { useExtensionStore } from "../../store/store";
import { SpecReview } from "./states/SpecReview.tsx";
import { useNextMachineState } from "../../hooks/useNextState.ts";
import { ArchitectureReview } from "./states/ArchitectureReview/ArchitectureReview.tsx";
// TODO: Import ArchitecturePhase component when it's created
const ArchitecturePhase = () => <div>TODO</div>;
const SearchDocumentation = () => <div></div>;

const stateComponentMap: Record<string, any> = {
  specReview: SpecReview,
  confirmUserIntent: ConfirmUserIntent,
  architectImplementation: ArchitecturePhase,
  architectureReview: ArchitectureReview,
  searchDocumentation: SearchDocumentation,
};

export function StateVisualization({data, onSubmit}: {data: MachineResponse, onSubmit: (input: string) => void}) {
  const { apiUrl } = useExtensionStore();
  const { fetch: fetchGetNextState } = useNextMachineState(apiUrl);
  const [specReviewRejected, setSpecReviewRejected] = useState(false);
  const [architectureReviewRejected, setArchitectureReviewRejected] = useState(false);
  const [architectureReviewPayload, setArchitectureReviewPayload] = useState<any>(null);
  const [input, setInput] = useState<{placeholder: string, value}>({placeholder: 'Tell me more...', value: ''});
  const showInput = useMemo(() => {
    // state computation for confirmUserIntent state
    if (data?.currentState?.startsWith('confirmUserIntent') && data.status === 'awaiting_human') {
      return true;
    }

      if (data?.currentState?.startsWith('specReview') && specReviewRejected) {
        return true;
      }
      if (data?.currentState?.startsWith('architectureReview') && architectureReviewRejected) {
        return true;
      }
  }, [data, specReviewRejected]);
  const getDeduplicatedStack = () => {
    if (!data.context?.stack) return [];
    
    const processedStack: string[] = [];
    
    // First pass: count total occurrences
    const stateOccurrences = new Map<string, number>();
    for (const stateKey of data.context.stack) {
      const count = stateOccurrences.get(stateKey) || 0;
      stateOccurrences.set(stateKey, count + 1);
    }
    
    const seenStates = new Map<string, number>();
    
    for (const stateKey of data.context.stack) {
      const seenCount = seenStates.get(stateKey) || 0;
      const totalOccurrences = stateOccurrences.get(stateKey) || 0;
      seenStates.set(stateKey, seenCount + 1);
      
      // Check if this is the last occurrence of this state
      const isLastOccurrence = seenCount + 1 === totalOccurrences;
      
      if (!isLastOccurrence) {
        processedStack.push(`${stateKey}|prev-${seenCount + 1}`);
      } else {
        processedStack.push(stateKey);
      }
    }
    
    return processedStack;
  };

  // Initialize collapsed states - all previous states should be collapsed by default
  const initializeCollapsedStates = () => {
    const collapsed = new Set<string>();
    const currentStateKey = data.context?.currentState || data.context?.stateId;
    const deduplicatedStack = getDeduplicatedStack();
    
    deduplicatedStack.forEach((stateKey) => {
      if (stateKey !== currentStateKey) {
        collapsed.add(stateKey);
      }
    });
    
    return collapsed;
  };

  const [collapsedStates, setCollapsedStates] = useState<Set<string>>(initializeCollapsedStates());
  const currentStateRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  // Update collapsed states when data changes (new states added, current state changes)
  useEffect(() => {
    const currentStateKey = data.context?.currentState || data.context?.stateId;
    const newCollapsed = new Set(collapsedStates);
    const deduplicatedStack = getDeduplicatedStack();
    
    // Add any new previous states to collapsed set
    deduplicatedStack.forEach((stateKey) => {
      if (stateKey !== currentStateKey && !newCollapsed.has(stateKey)) {
        newCollapsed.add(stateKey);
      }
    });
    
    // Remove states that are no longer in the deduplicated stack
    const currentStack = new Set(deduplicatedStack);
    for (const stateKey of newCollapsed) {
      if (!currentStack.has(stateKey)) {
        newCollapsed.delete(stateKey);
      }
    }
    
    setCollapsedStates(newCollapsed);
  }, [data.context?.stack, data.context?.currentState, data.context?.stateId]);

  // Scroll to current state when it changes
  useEffect(() => {
    if (currentStateRef.current) {
      currentStateRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [data.context?.currentState, data.context?.stateId]);

  const toggleCollapse = (stateKey: string) => {
    const newCollapsed = new Set(collapsedStates);
    if (newCollapsed.has(stateKey)) {
      newCollapsed.delete(stateKey);
    } else {
      newCollapsed.add(stateKey);
    }
    setCollapsedStates(newCollapsed);
  };

  const parseStateKey = (stateKey: string) => {
    const parts = stateKey.split('|');
    const stateName = parts[0];
    const stateId = parts[1];
    const isPrevious = parts.length > 2 && parts[2].startsWith('prev-');
    const previousNumber = isPrevious ? parts[2].replace('prev-', '') : null;
    return { stateName, stateId, isPrevious, previousNumber };
  };

  const renderStateComponent = (stateKey: string, onAction: (action: string) => void, machineStatus: MachineStatus) => {
    const { stateName, stateId, isPrevious } = parseStateKey(stateKey);

    const Component = stateComponentMap[stateName];
    
    // For previous states, look up data using the original key (without |prev-01)
    const originalKey = isPrevious ? `${stateName}|${stateId}` : stateKey;
    const stateData = data.context?.[originalKey];

    if (!Component) {
      return (
        <div className="p-4 bg-red-50 rounded border">
          <p className="text-red-600">Unknown state type: {stateName}</p>
        </div>
      );
    }

    return <Component data={stateData} id={stateId} onAction={onAction} machineStatus={machineStatus} />;
  };

  const isCurrentState = (stateKey: string) => {
    const { isPrevious } = parseStateKey(stateKey);
    // Previous states are never current
    if (isPrevious) return false;
    
    return data.context?.currentState === stateKey || data.context?.stateId === stateKey;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.value.trim()) return;
    
    if (!data?.currentState) {
      console.error('Machine data is missing current state');
      return;
    }

    if (data.currentState.startsWith('specReview')) {
      const messages = data.context?.[data.currentState]?.messages;
      const lastMessage =
      messages
        ?.slice()
        .reverse()
        .find((item) => item.user === undefined);
      lastMessage.user = input.value;
      fetchGetNextState({ machineId: data.id, contextUpdate: { [data.currentState]: { approved: false, messages } } });
      setSpecReviewRejected(false);

      return;
    }

    if (data.currentState.startsWith('architectureReview')) {
      const messages = data.context?.[data.currentState]?.messages;
      const lastMessage =
      messages
        ?.slice()
        .reverse()
        .find((item) => item.user === undefined);
      lastMessage.user = `${architectureReviewPayload}\n\n${input.value}`;
      fetchGetNextState({ machineId: data.id, contextUpdate: { [data.currentState]: { approved: false, messages } } });
      setArchitectureReviewRejected(false);
      setArchitectureReviewPayload(null);
      return;
    }

    fetchGetNextState({ machineId: data.id, contextUpdate: { [data.currentState]: { userResponse: input.value } } });

    setInput(curr => ({...curr, value: '', placeholder: 'Tell me more...'}));
    scrollToBottom();
  }



  const handleAction = (action: string, payload?: any) => {
    if (action === 'approveSpec' || action === 'approveArchitecture') {
      setSpecReviewRejected(false);

      if (!data?.currentState) {
        console.error('Machine data is missing current state');
        return;
      }

      const messages = data.context?.[data.currentState]?.messages;
      const lastMessage =
      messages
        ?.slice()
        .reverse()
        .find((item) => item.user === undefined);
      lastMessage.user = 'Looks good, approved.';

      fetchGetNextState({ machineId: data.id, contextUpdate: { [data.currentState]: { approved: true,  messages} } });
    } else if (action === 'rejectSpec') {

      setInput(curr => ({...curr, placeholder: 'Please provide feedback on what you would like changed'}));
      setSpecReviewRejected(true);
    } else if (action === 'rejectArchitecture') {
      setInput(curr => ({...curr, placeholder: 'Please provide feedback on what you would like changed'}));
      setArchitectureReviewRejected(true);
      setArchitectureReviewPayload(payload);
    }
  }

return (
<div className="flex flex-col h-screen max-w-4xl mx-auto">
      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto" style={{paddingBottom: '50px'}}>
       <div className="space-y-4">
          {data.context?.solution && (
            <div className="bg-gray-50 rounded border mb-2">
              Hello! I'm Larry, your AI Coding assistant. I'm working in organized way you will see below.
              <br />
              Let's move some couches today!
            </div>
          )}
           {getDeduplicatedStack().map((stateKey, index) => {
            const { stateName, isPrevious, previousNumber } = parseStateKey(stateKey);
            const formattedName = isPrevious ? `${stateName} (previous ${previousNumber})` : stateName;
            const isCurrent = isCurrentState(stateKey);
            const isCollapsed = collapsedStates.has(stateKey) && !isCurrent;

            return (
              <div 
                className="mb-2" 
                key={stateKey}
              >
                <div 
                  ref={isCurrent ? currentStateRef : null}
                  className={`d-flex cursor-pointer`}
                  style={{
                    alignItems: 'center',
                    cursor: 'pointer',
                    opacity: isCurrent ? '1' : '0.5',
                  }}
                  onClick={() => !isCurrent && toggleCollapse(stateKey)}
                >
                  <div>
                    <span className="text-xs">
                      State: {formattedName}
                    </span>
                  </div>
                  {!isCurrent && (
                    <div className="d-flex" style={{
                      opacity: isCurrent ? '1' : '0.5',
                    }}>
                      {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
                    </div>
                  )}
                </div>

                {/* State content */}
                {(isCurrent || !isCollapsed) && (
                  <div className="pb-3">
                    {renderStateComponent(stateKey, handleAction, data.status)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {data.status === 'running' && (
    <div>
      <span className="shimmer-loading">Working</span><AnimatedEllipsis />
    </div>
  )}
  </div>
  {showInput && (
    <div style={{position: 'fixed', left: 0, padding: '5px', background: 'var(--vscode-editor-background)', bottom: 0, width: '100%'}} className="sticky bottom-0 border-t shadow-lg">
      <form onSubmit={handleSubmit} className="d-flex gap-2" style={{position: 'relative'}}>
        <TextareaAutosize
          value={input.value}
          onInput={(e) => setInput(curr => ({...curr, value: (e.currentTarget as HTMLTextAreaElement).value}))}
          placeholder={input.placeholder}
          minRows={2}
          maxRows={8}
          autoFocus
          className="form-control width-full pr-40"
        />
        <button
          type="submit"
          className="btn btn-primary"
          style={{borderRadius: '50% !important', width: '32px', paddingTop: '12px !important', height: '32px', position: 'absolute', right: '5px', bottom: '6px', lineHeight: '30px !important'}}
        >
          <SendIcon size={16} style={{position: 'relative', top: '4px', left: '-2px'}} />
        </button>
      </form>
    </div>
  )}
</div>
)
}