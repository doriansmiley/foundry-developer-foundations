/* JSX */
/* @jsxImportSource preact */
import { useState, useRef } from "preact/hooks";
import { MachineStatus } from "../../../../lib/backend-types"
import { useContentFromLocalFile } from "../../../../hooks/useContentFromLocalFile";
import { useParseCodeEdits } from "./useParseCodeEdits";
import { useMarkdown } from "../../../../hooks/useMarkdown";
import { LucideFilePlus2, LucideFileDiff, LucideFileMinus2, LucideCopy, LucideCheck, LucideX } from "lucide-preact";

type DataType = {
  approved: boolean;
  file: string;
  messages: {system?: string, user?: string}[];
  reviewRequired: boolean;
}

function CodeBlock({ code, codeBlockRef }: { code: string, codeBlockRef: any }) {
  const mark = useMarkdown();
  const codeContent = mark(code);

  return (
    <div className="markdown-content markdown-body" ref={codeBlockRef}>
      <span dangerouslySetInnerHTML={{ __html: codeContent }} />
    </div>
  )
}

export function ArchitectureReview({ data, id, onAction, machineStatus }: { data: DataType, id: string, onAction: (action: string, payload?: any) => void, machineStatus: MachineStatus }) {
  const file = data.file;
  
  const { content } = useContentFromLocalFile(file);

  const codeEdits = useParseCodeEdits(content);

  // State to track which code blocks have been copied
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});
  
  // State to track individual file approvals/rejections
  const [fileApprovals, setFileApprovals] = useState<{[key: string]: {filePath: string, approved: boolean} | null}>({});
  
  // Refs for each code block
  const codeBlockRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  const handleIndividualApprove = (filePath: string) => {
    setFileApprovals(prev => ({
      ...prev,
      [filePath]: { filePath, approved: true }
    }));
  }

  const handleIndividualReject = (filePath: string) => {
    setFileApprovals(prev => ({
      ...prev,
      [filePath]: { filePath, approved: false }
    }));

    onAction('rejectArchitecture', `Rejected files: ${Object.values(fileApprovals).map(approval => approval?.filePath).join(', ')}`);
  }

  const approveArchitecture = () => {
    const allApprovals: {[key: string]: {filePath: string, approved: boolean}} = {};
    codeEdits.forEach(codeEdit => {
      allApprovals[codeEdit.filePath] = { filePath: codeEdit.filePath, approved: true };
    });
    setFileApprovals(allApprovals);
    onAction('approveArchitecture');
  }

  const rejectArchitecture = () => {
    const allRejections: {[key: string]: {filePath: string, approved: boolean}} = {};
    codeEdits.forEach(codeEdit => {
      allRejections[codeEdit.filePath] = { filePath: codeEdit.filePath, approved: false };
    });
    setFileApprovals(allRejections);
    onAction('rejectArchitecture');
  }

  const handleCopyClick = async (filePath: string, code: string) => {
    try {
      const codeBlockElement = codeBlockRefs.current[filePath];
      if (codeBlockElement) {
        const range = document.createRange();
        range.selectNodeContents(codeBlockElement);
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }

      await navigator.clipboard.writeText(code);
      setCopiedStates(prev => ({ ...prev, [filePath]: true }));
      
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [filePath]: false }));
      }, 5000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }

  const lucideIconsMap = {
    CREATE: <LucideFilePlus2 className="create-icon" />,
    MODIFY: <LucideFileDiff className="modify-icon" />,
    DELETE: <LucideFileMinus2 className="delete-icon" />,
  }

  return (
    <div className="ArchitectureReview">
      <div>Please review the architecture:</div>
      <br />
      
      {codeEdits.map((codeEdit) => {
        const approval = fileApprovals[codeEdit.filePath];
        const isApproved = approval?.approved === true;
        const isRejected = approval?.approved === false;

        return (
          <div key={codeEdit.filePath}>
            <div className="codeBlockHeader">
              {lucideIconsMap[codeEdit.type]}
              <div>{codeEdit.filePath}</div>
            </div>
            <CodeBlock 
              code={codeEdit.proposedChange} 
              codeBlockRef={(el: HTMLDivElement | null) => {
                codeBlockRefs.current[codeEdit.filePath] = el;
              }}
            />
            <div className="codeBlockFooter">
              <div className="actionButtons">
              <div 
                className={`d-flex text-button ${isApproved ? 'selected' : ''}`}
                onClick={() => handleIndividualApprove(codeEdit.filePath)}
                style={{ cursor: 'pointer' }}
              >
                <LucideCheck className="check-icon" />
                Approve
              </div>
              <div 
                className={`d-flex text-button ${isRejected ? 'selected' : ''}`}
                onClick={() => handleIndividualReject(codeEdit.filePath)}
                style={{ cursor: 'pointer' }}
              >
                <LucideX className="reject-icon" />
                Reject
              </div></div>
              <div className="text-button">
              {copiedStates[codeEdit.filePath] && (
                <span className="copied-indicator" style={{ marginLeft: '8px', fontSize: '12px', color: '#28a745' }}>
                  Copied
                </span>
              )}
              <LucideCopy 
                className="copy-icon" 
                onClick={() => handleCopyClick(codeEdit.filePath, codeEdit.proposedChange)}
                style={{ cursor: 'pointer' }}
              /></div>
            </div>
          </div>
        )
      })}

      <hr />
      {machineStatus === 'awaiting_human' && (
      <div className="d-flex mt-2">
          <button className="btn btn-primary mr-1 ml-1" onClick={approveArchitecture}>Approve All</button>
          <button className="btn mr-1 ml-1" onClick={rejectArchitecture}>Reject All</button>
        </div>
      )}
    </div>
  );
}
