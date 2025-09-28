// VSCode webview bridge
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const acquireVsCodeApi: any;

const vscode =
  typeof acquireVsCodeApi === 'function'
    ? acquireVsCodeApi()
    : {
        postMessage: (_: unknown) => void 0,
      };

export function postMessage(msg: unknown) {
  vscode.postMessage(msg);
}

export function onMessage(cb: (msg: any) => void) {
  window.addEventListener('message', (e) => cb(e.data));
}
