import { MarketId, VaultMarketConfig } from "@morpho-org/blue-sdk";
import { UseQueryResult, useQueries } from "@tanstack/react-query";
import { combineIndexedQueries } from "src/queries/combineIndexedQueries.js";
import { Address, ReadContractErrorType, UnionOmit } from "viem";
import { Config, ResolvedRegister, useConfig } from "wagmi";
import { structuralSharing } from "wagmi/query";
import {
  VaultMarketConfigParameters,
  fetchVaultMarketConfigQueryOptions,
} from "../queries/fetchVaultMarketConfig.js";
import { useChainId } from "./useChainId.js";
import { UseVaultMarketConfigParameters } from "./useVaultMarketConfig.js";

export type FetchVaultMarketConfigsParameters = {
  configs: Iterable<Partial<VaultMarketConfigParameters>>;
};

export type UseVaultMarketConfigsParameters<
  config extends Config = Config,
  TCombinedResult = ReturnType<typeof combineVaultMarketConfigs>,
> = FetchVaultMarketConfigsParameters &
  UnionOmit<
    UseVaultMarketConfigParameters<config>,
    keyof VaultMarketConfigParameters
  > & {
    combine?: (
      results: UseQueryResult<VaultMarketConfig, ReadContractErrorType>[],
    ) => TCombinedResult;
  };

export type UseVaultMarketConfigsReturnType<
  TCombinedResult = ReturnType<typeof combineVaultMarketConfigs>,
> = TCombinedResult;

export const combineVaultMarketConfigs = combineIndexedQueries<
  VaultMarketConfig,
  ReadContractErrorType,
  [Address, MarketId]
>((config) => [config.vault as Address, config.marketId]);

export function useVaultMarketConfigs<
  config extends Config = ResolvedRegister["config"],
  TCombinedResult = ReturnType<typeof combineVaultMarketConfigs>,
>({
  configs,
  combine = combineVaultMarketConfigs as any,
  query = {},
  ...parameters
}: UseVaultMarketConfigsParameters<
  config,
  TCombinedResult
>): UseVaultMarketConfigsReturnType<TCombinedResult> {
  const config = useConfig(parameters);
  const chainId = useChainId(parameters);

  return useQueries({
    queries: Array.from(configs, (vaultMarketConfig) => ({
      ...query,
      ...fetchVaultMarketConfigQueryOptions(config, {
        ...parameters,
        ...vaultMarketConfig,
        chainId,
      }),
      enabled:
        vaultMarketConfig.vault != null &&
        vaultMarketConfig.marketId != null &&
        query.enabled,
      structuralSharing: query.structuralSharing ?? structuralSharing,
      staleTime:
        query.staleTime ?? parameters.blockNumber != null
          ? Infinity
          : undefined,
    })),
    combine,
  });
}
