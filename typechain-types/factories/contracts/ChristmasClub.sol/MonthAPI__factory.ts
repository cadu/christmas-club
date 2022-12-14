/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  MonthAPI,
  MonthAPIInterface,
} from "../../../contracts/ChristmasClub.sol/MonthAPI";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "getMonth",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class MonthAPI__factory {
  static readonly abi = _abi;
  static createInterface(): MonthAPIInterface {
    return new utils.Interface(_abi) as MonthAPIInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MonthAPI {
    return new Contract(address, _abi, signerOrProvider) as MonthAPI;
  }
}
