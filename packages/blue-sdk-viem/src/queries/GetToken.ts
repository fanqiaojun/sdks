export const abi = [
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
      { internalType: "bool", name: "isWstEth", type: "bool" },
    ],
    name: "query",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "decimals",
            type: "uint256",
          },
          { internalType: "string", name: "symbol", type: "string" },
          { internalType: "string", name: "name", type: "string" },
          {
            internalType: "uint256",
            name: "stEthPerWstEth",
            type: "uint256",
          },
        ],
        internalType: "struct TokenResponse",
        name: "res",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const code =
  "0x60808060405234601557610340908161001a8239f35b5f80fdfe6080806040526004361015610012575f80fd5b5f3560e01c63287861f914610025575f80fd5b346101ad5760403660031901126101ad576004356001600160a01b03811691908290036101ad5760243580151581036101ad576080820182811067ffffffffffffffff82111761023d576040525f8252602082019260608452604083016060815260608401925f845260405163313ce56760e01b8152602081600481875afa80156101b9575f90610200575b60ff168652506040516395d89b4160e01b81525f81600481875afa9081156101b9575f916101e6575b5086526040516306fdde0360e01b81525f81600481875afa9081156101b9575f916101c4575b508252610150575b610145915061013260405195869560208752516020870152516080604087015260a0860190610251565b9051848203601f19016060860152610251565b905160808301520390f35b6020600492604051938480926301afd7c160e11b82525afa80156101b9575f90610181575b61014592508352610108565b506020823d6020116101b1575b8161019b60209383610275565b810103126101ad576101459151610175565b5f80fd5b3d915061018e565b6040513d5f823e3d90fd5b6101e091503d805f833e6101d88183610275565b810190610297565b5f610100565b6101fa91503d805f833e6101d88183610275565b5f6100da565b506020813d602011610235575b8161021a60209383610275565b810103126101ad575160ff811681036101ad5760ff906100b1565b3d915061020d565b634e487b7160e01b5f52604160045260245ffd5b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b90601f8019910116810190811067ffffffffffffffff82111761023d57604052565b6020818303126101ad5780519067ffffffffffffffff82116101ad570181601f820112156101ad5780519067ffffffffffffffff821161023d57604051926102e9601f8401601f191660200185610275565b828452602083830101116101ad57815f9260208093018386015e830101529056fea26469706673582212204029d875a2a9b244354fa7f1fc88d7b3d1ed680b6f90febd3e2794ee5f5e0dc064736f6c634300081b0033";
