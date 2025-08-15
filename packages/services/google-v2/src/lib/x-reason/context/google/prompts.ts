import {
  SupportedEngines,
  xReasonFactory,
  SupportTrainingDataTypes,
} from '../../factory';
import {
  ActionType,
  TrainingDataDao,
  TYPES,
} from '@codestrap/developer-foundations-types';
import { container } from '@codestrap/developer-foundations-di';

// TODO: Implement training data retrieval
async function getProgrammingTrainingData() {
  // Scaffolding - implement actual training data retrieval
  const data = `
  // TODO: Add training examples here
  
  If the task list is:
  1. Unsupported question

  Your response is:
  [
  {
    "id": "UnsupportedQuestion",
    "transitions": [
      { "on": "CONTINUE", "target": "success" },
      { "on": "ERROR", "target": "failure" }
    ]
  },
  {
    "id": "success",
    "type": "final"
  },
  {
    "id": "failure",
    "type": "final"
  }
  ]

  Explanation:
  This is a placeholder for unsupported questions.
  `;

  return data;
}

async function getSolverTrainingData() {
  // Scaffolding - implement actual training data retrieval
  const data = `
  // TODO: Add solver training examples here
  `;

  return data;
}

export async function programmer(query: string, functionCatalog: string) {
  const trainingData = await getProgrammingTrainingData();

  const system = `
  You are a Google Services programming assistant.
  
  // TODO: Add specific Google services programming instructions
  
  Available functions:
  ${functionCatalog}
  
  Training examples:
  ${trainingData}
  `;

  const user = `
  Task: ${query}
  
  // TODO: Add specific user prompt instructions
  `;

  return { system, user };
}

export async function solver(query: string) {
  const trainingData = await getSolverTrainingData();

  const system = `
  You are a Google Services problem solver.
  
  // TODO: Add specific Google services solving instructions
  
  Training examples:
  ${trainingData}
  `;

  const user = `
  Problem: ${query}
  
  // TODO: Add specific solver instructions
  `;

  return { system, user };
}

export async function aiTransition(context: string, events: string) {
  const system = `
  You are a Google Services state transition evaluator.
  
  // TODO: Add specific transition logic instructions
  `;

  const user = `
  Context: ${context}
  Events: ${events}
  
  // TODO: Add specific transition evaluation instructions
  `;

  return { system, user };
}

export async function evaluate(context: string, result: string) {
  const system = `
  You are a Google Services result evaluator.
  
  // TODO: Add specific evaluation criteria
  `;

  const user = `
  Context: ${context}
  Result: ${result}
  
  // TODO: Add specific evaluation instructions
  `;

  return { system, user };
}
