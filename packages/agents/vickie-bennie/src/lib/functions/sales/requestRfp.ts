import { Context, MachineEvent } from '@codestrap/developer-foundations-types';
import { uuidv4 } from '@codestrap/developer-foundations-utils';
import {
  RfpRequestsDao,
  TYPES,
  RfpRequestResponse,
  VendorRequestsDao,
} from '@codestrap/developer-foundations-types';
import { container } from '../../inversify.config';

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

enum VendorType {
  RANGR = 'RANGR',
  // Add more vendor types here as needed
  // NORTHSLOPE = 'NORTHSLOPE',
  // PWC = 'PWC',
  // OTHER = 'OTHER',
}

//TODO: this should be coming from foundry 
const VENDOR_DOMAINS = {
  RANGR: ['axisdata.com', 'rangrdata.com', 'rangr.com'],
  // other vendors goes here as needed
  // NORTHSLOPE: ['northslope.com', 'northslopedata.com'],
  // PWC: ['pwc.com', 'pricewaterhousecoopers.com'],
} as const;
// Vendor type to TYPES symbol mapping
const VENDOR_TYPE_MAPPING= {
  [VendorType.RANGR]: TYPES.RangrRfpRequestsDao,
  // more mappings as new vendors are supported
  // [VendorType.NORTHSLOPE]: TYPES.NorthslopeRfpRequestsDao,
  // [VendorType.PWC]: TYPES.PwcRfpRequestsDao,
  // [VendorType.OTHER]: TYPES.OtherRfpRequestsDao,
};

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

//TODO: all vendors and their ids should be stored in ontology and there should be a service in foundry that gives vendor type based on given vendorID from vendors details stored in ontology
function findVendorType(vendorId: string): VendorType | null {
    if (!vendorId) return null;
    
    for (const [vendorType, domains] of Object.entries(VENDOR_DOMAINS)) {
        const isMatch = domains.some(domain => 
            vendorId === domain || vendorId.includes(domain)
        );
        if (isMatch) {
            return vendorType as VendorType;
        }
    }
    
    return null;
}

function getVendorType(vendorId: string): VendorType {
    const vendorType = findVendorType(vendorId);
    if (!vendorType) {
        throw new VendorNotSupportedError(vendorId);
    }
    return vendorType;
}

function getVendorDao<T extends VendorType>(vendorType: T):VendorRequestsDao {
    const typeSymbol = VENDOR_TYPE_MAPPING[vendorType];
    return container.get<VendorRequestsDao>(typeSymbol);
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
        const vendorType = getVendorType(vendorId);
        const vendorDao = getVendorDao(vendorType);
        
        const vendorResponse = await vendorDao.submit(task, context.machineExecutionId!);
        
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