/* JSX */
/* @jsxImportSource preact */
import { useState, useEffect, useRef } from "preact/hooks";
import { MachineResponse } from "../../lib/backend-types";
import { ConfirmUserIntent } from "./states/ConfirmUserIntent.tsx";
import { ChevronRight, SendIcon } from "lucide-preact";
import { ChevronDown } from "lucide-preact";
import TextareaAutosize from "react-textarea-autosize";
import { AnimatedEllipsis } from "./AnimatedEllipsis.tsx";

// TODO: Import ArchitecturePhase component when it's created
const ArchitecturePhase = () => <div>Architecture Phase Component</div>;

const stateComponentMap: Record<string, any> = {
  confirmUserIntent: ConfirmUserIntent,
  architecturePhase: ArchitecturePhase,
  // Add more mappings as needed
};

export function StateVisualization({data, onSubmit}: {data: MachineResponse, onSubmit: (input: string) => void}) {
  // Deduplicate stack while preserving order (keep last occurrence)
  const getDeduplicatedStack = () => {
    if (!data.context?.stack) return [];
    
    const seen = new Set<string>();
    const deduplicatedStack: string[] = [];
    
    // Process in reverse to keep the last occurrence of each state
    for (let i = data.context.stack.length - 1; i >= 0; i--) {
      const stateKey = data.context.stack[i];
      if (!seen.has(stateKey)) {
        seen.add(stateKey);
        deduplicatedStack.unshift(stateKey); // Add to beginning to maintain original order
      }
    }
    
    return deduplicatedStack;
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
  const [inputValue, setInputValue] = useState('');
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
    const [stateName, stateId] = stateKey.split('|');
    return { stateName, stateId };
  };

  const renderStateComponent = (stateKey: string) => {
    const { stateName, stateId } = parseStateKey(stateKey);
    const Component = stateComponentMap[stateName];
    const stateData = data.context?.[stateKey];

    if (!Component) {
      return (
        <div className="p-4 bg-red-50 rounded border">
          <p className="text-red-600">Unknown state type: {stateName}</p>
        </div>
      );
    }

    return <Component data={stateData} id={stateId} />;
  };

  const isCurrentState = (stateKey: string) => {
    return data.context?.currentState === stateKey || data.context?.stateId === stateKey;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onSubmit(inputValue);
    setInputValue('');
    scrollToBottom();
  }


return (
<div className="flex flex-col h-screen max-w-4xl mx-auto">
      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto" style={{paddingBottom: '50px'}}>
       <div className="space-y-4">
          {data.context?.solution && (
            <div className="p-4 bg-gray-50 rounded border">
              <ConfirmUserIntent data={{confirmationPrompt: data.context.solution}} id={'solution-123'} />
            </div>
          )}
           {getDeduplicatedStack().map((stateKey, index) => {
            const { stateName } = parseStateKey(stateKey);
            const formattedName = stateName;
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
                    {renderStateComponent(stateKey)}
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
  {data.status === 'awaiting_human' && (
    <div style={{position: 'fixed', left: 0, padding: '5px', background: 'var(--vscode-editor-background)', bottom: 0, width: '100%'}} className="sticky bottom-0 border-t shadow-lg">
      <form onSubmit={handleSubmit} className="d-flex gap-2" style={{position: 'relative'}}>
        <TextareaAutosize
          value={inputValue}
          onInput={(e) => setInputValue((e.currentTarget as HTMLTextAreaElement).value)}
          placeholder="Talk to Larry..."
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