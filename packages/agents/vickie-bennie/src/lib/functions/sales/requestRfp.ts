import { Context, MachineEvent } from '@codestrap/developer-foundations-types';
import { uuidv4 } from '@codestrap/developer-foundations-utils';
import {
  RangrRequestsDao,
  RfpRequestsDao,
  TYPES,
  RfpRequestResponse,
} from '@codestrap/developer-foundations-types';
import { container } from '../../inversify.config';

enum VendorType {
  RANGR = 'RANGR',
  // Add more vendor types here as needed
  // OTHER = 'OTHER',
}

class VendorParsingError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'VendorParsingError';
    }
}

class VendorNotSupportedError extends Error {
    constructor(vendorId: string) {
        super(`Vendor ${vendorId} is not currently supported`);
        this.name = 'VendorNotSupportedError';
    }
}

const VENDOR_DOMAINS = {
  [VendorType.RANGR]: ['axisdata.com', 'rangrdata.com', 'rangr.com'],
  // Add other vendors here as needed
  // [VendorType.OTHER]: ['othervendor.com', 'ov.com'],
} as const;

const DOMAIN_REGEX = /<([^>]+)>/;
const VENDOR_NAME_REGEX = /:\s*([\w\s]+)\s*</;

function extractVendorId(input: string): string | null {
    if (!input) return null;
    const match = input.match(DOMAIN_REGEX);
    return match ? match[1] : null;
}

function extractVendorName(input: string): string | null {
    if (!input) return null;
    const match = input.match(VENDOR_NAME_REGEX);
    return match ? match[1].trim() : null;
}

interface VendorHandler {
    submit(task: string, executionId: string): Promise<any>;
}

class RangrVendorHandler implements VendorHandler {
    async submit(task: string, executionId: string): Promise<any> {
        const rangrRfpDao = container.get<RangrRequestsDao>(TYPES.RangrRfpRequestsDao);
        return await rangrRfpDao.submit(task, executionId);
    }
}

// Vendor Handler Factory
type VendorHandlerFactory = (config?: Record<string, any>) => VendorHandler;

const vendorHandlers: Record<VendorType, VendorHandlerFactory> = {
    [VendorType.RANGR]: (config?: Record<string, any>) => {
        console.log(`Creating Rangr vendor handler with config: ${config}`);
        return new RangrVendorHandler();
    },
    // Add more vendor handlers here as needed
    // [VendorType.OTHER]: (config?: Record<string, any>) => {
    //     console.log(`Creating Other vendor handler with config: ${config}`);
    //     return new OtherVendorHandler();
    // },
};

function determineVendorType(vendorId: string): VendorType {
    // Iterate through all vendor domains to find a match
    for (const [vendorType, domains] of Object.entries(VENDOR_DOMAINS)) {
        if (domains.some(domain => 
            vendorId === domain || vendorId.includes(domain)
        )) {
            return vendorType as VendorType;
        }
    }
    throw new VendorNotSupportedError(vendorId);
}

function createVendorHandler(vendorId: string, config?: Record<string, any>): VendorHandler {
    const vendorType = determineVendorType(vendorId);
    const handlerFactory = vendorHandlers[vendorType];
    
    if (!handlerFactory) {
        throw new VendorNotSupportedError(vendorId);
    }
    
    return handlerFactory(config);
}

export async function requestRfp(
    context: Context, 
    event?: MachineEvent, 
    task?: string
): Promise<RfpRequestResponse> {
    if (!task) {
        throw new VendorParsingError('Task parameter is required');
    }

    const vendorName = extractVendorName(task);
    const vendorId = extractVendorId(task);

    if (!vendorName || !vendorId) {
        throw new VendorParsingError('Vendor name or ID could not be extracted from task');
    }

    try {
        const vendorHandler = createVendorHandler(vendorId);
        
        const vendorResponse = await vendorHandler.submit(task, context.machineExecutionId!);
        
        console.log(`${vendorId} returned the following response:`, vendorResponse);

        const rfpDao = container.get<RfpRequestsDao>(TYPES.RfpRequestsDao);
        await rfpDao.upsert(task, vendorResponse.message || 'Request submitted successfully', vendorId, context.machineExecutionId!);

        return {
            status: vendorResponse.status || 200,
            message: vendorResponse.message || 'We have received your RFP and will respond shortly',
            vendorName,
            vendorId,
            received: vendorResponse.received || false,
            machineExecutionId: context.machineExecutionId || uuidv4(),
            receipt: vendorResponse.receipt || {
                id: uuidv4(),
                timestamp: new Date(),
            }
        };
    } catch (error) {
        console.error(`Error processing RFP for vendor ${vendorId}:`, error);
        
        if (error instanceof VendorNotSupportedError) {
            throw error;
        }
        
        throw new Error(`Failed to process RFP request: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}