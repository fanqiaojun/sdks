import { Provider } from "ethers";
import { MetaMorpho__factory } from "ethers-types";

import {
  Address,
  ChainUtils,
  MarketId,
  VaultMarketConfig,
} from "@morpho-org/blue-sdk";
import { FetchOptions } from "../types";
import { fetchVaultMarketPublicAllocatorConfig } from "./VaultMarketPublicAllocatorConfig";

export async function fetchVaultMarketConfig(
  vault: Address,
  marketId: MarketId,
  runner: { provider: Provider },
  options: FetchOptions = {},
) {
  options.chainId = ChainUtils.parseSupportedChainId(
    options.chainId ?? (await runner.provider.getNetwork()).chainId,
  );
  options.overrides ??= {};

  const mm = MetaMorpho__factory.connect(vault, runner);

  const [{ cap, removableAt, enabled }, pendingCap, publicAllocatorConfig] =
    await Promise.all([
      mm.config(marketId, options.overrides),
      mm
        .pendingCap(marketId, options.overrides)
        .then(({ value, validAt }) => ({ value, validAt })),
      fetchVaultMarketPublicAllocatorConfig(vault, marketId, runner, options),
    ]);

  return new VaultMarketConfig({
    vault,
    marketId,
    cap,
    pendingCap,
    enabled,
    removableAt,
    publicAllocatorConfig,
  });
}
