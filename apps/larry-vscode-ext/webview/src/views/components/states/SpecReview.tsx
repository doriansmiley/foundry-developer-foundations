/* JSX */
/* @jsxImportSource preact */
import { useEffect } from "preact/hooks";
import { postMessage } from "../../../lib/vscode";
import { MachineStatus } from "../../../lib/backend-types";

type DataType = {
  approved: boolean;
  file: string;
  messages: {system?: string, user?: string}[];
  reviewRequired: boolean;
}

export function SpecReview({ data, id, onAction, machineStatus }: { data: DataType, id: string, onAction: (action: string) => void, machineStatus: MachineStatus }) {
  console.log('id', id);
  const file = data.file;
  const isPrev = id.includes('|prev-');
  const openFile = () => {
    // TODO send postMessage to extension to open file
    postMessage({
      type: 'openFile',
      file,
    });
  }

  const approveSpec = () => {
    onAction('approveSpec');
  }

  const rejectSpec = () => {
    onAction('rejectSpec');
  }

  useEffect(() => {
    if (machineStatus === 'running') {
      return;
    }

    openFile();
  }, []);

  return (
    <div className="confirm-user-intent">
      <div><strong>Larry: </strong>I have saved the specification in the file: {file}</div>
      <div className="mb-2 mt-1"><button className="btn" onClick={openFile}>Open file</button></div>
      <div>You can and propose changes in the file itself, once you will finish save the file in same location and click "Approve" button.</div>
      <div className="mt-2">
        {data.messages.map((message, index) => (
          <div key={index}>
            {message.system && <div className="system-message">Larry: {message.system}</div>}
            {message.user && <div className="user-message">You: {message.user}</div>}
          </div>
        ))}
      </div>
      <hr />
      {machineStatus === 'awaiting_human' && !isPrev && (
      <div className="d-flex mt-2">
          <button className="btn btn-primary mr-1 ml-1" onClick={approveSpec}>Approve</button>
          <button className="btn mr-1 ml-1" onClick={rejectSpec}>Reject</button>
        </div>
      )}
    </div>
  );
}
