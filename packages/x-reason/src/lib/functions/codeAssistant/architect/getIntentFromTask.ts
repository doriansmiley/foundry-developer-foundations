/*
This function assumes that solver will return well formed task,
---
if not everything will be undefined and we will need 
to get it from user by asking questions - this function is not doing that
*/
export function getIntentFromTaskAlgorithmically(task?: string) {
  if (!task) {
    return {
      intent: undefined,
      functionName: undefined,
      functionalityExplanation: undefined,
      alreadyExists: false,
    };
  }

  const intentMatch = task?.match(/intent(?:\s+to)?\s+"([^"]+)"/i);
  const functionMatch = task?.match(/function\s+"([^"]+)"/i);
  const alreadyExistsMatch = task?.match(/already exists/i);

  const actionIntent: {
    intent: string | undefined;
    functionName: string | undefined;
    functionalityExplanation: string | undefined;
    alreadyExists: boolean;
  } = {
    intent: intentMatch?.[1],
    functionName: functionMatch?.[1],
    functionalityExplanation: undefined,
    alreadyExists: !!alreadyExistsMatch?.[0],
  };

  // If intent and functionName are present, derive a best-guess functionality explanation
  if (actionIntent.intent && actionIntent.functionName) {
    const phrase = actionIntent.functionName
      // insert spaces before capitals in camelCase
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/[_-]+/g, ' ')
      .toLowerCase();
    const capitalized = phrase.charAt(0).toUpperCase() + phrase.slice(1);
    actionIntent.functionalityExplanation = capitalized;
  }

  return actionIntent;
}
