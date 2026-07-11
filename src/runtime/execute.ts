import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

import { toNodeOperationError } from './request';

export async function executeItemWithContinueOnFail(
  context: IExecuteFunctions,
  itemIndex: number,
  operation: () => Promise<INodeExecutionData[]>,
): Promise<INodeExecutionData[]> {
  try {
    return await operation();
  } catch (error) {
    if (context.continueOnFail()) {
      return [
        {
          json: {
            error: toNodeOperationError(context, error, itemIndex).message,
          },
          pairedItem: {
            item: itemIndex,
          },
        },
      ];
    }

    throw toNodeOperationError(context, error, itemIndex);
  }
}
