/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "ERC20Burnable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Burnable__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "ChristmasClubToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ChristmasClubToken__factory>;
    getContractFactory(
      name: "ChristmasClub",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ChristmasClub__factory>;
    getContractFactory(
      name: "ICCToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ICCToken__factory>;
    getContractFactory(
      name: "MonthAPI",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MonthAPI__factory>;
    getContractFactory(
      name: "DateTime",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DateTime__factory>;

    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "ERC20Burnable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Burnable>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "ChristmasClubToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ChristmasClubToken>;
    getContractAt(
      name: "ChristmasClub",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ChristmasClub>;
    getContractAt(
      name: "ICCToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ICCToken>;
    getContractAt(
      name: "MonthAPI",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MonthAPI>;
    getContractAt(
      name: "DateTime",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DateTime>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
