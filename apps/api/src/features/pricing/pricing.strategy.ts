import { MarketStats, PricingInput } from '@automarket/shared-types';

export const MIN_SAMPLE_SIZE = 5;

export interface IPricingStrategy {
  readonly name: string;
  canApply(input: PricingInput, pool: import('pg').Pool): Promise<boolean>;
  compute(input: PricingInput, pool: import('pg').Pool): Promise<MarketStats>;
}
