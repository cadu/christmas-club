/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface ChristmasClubInterface extends utils.Interface {
  functions: {
    "deposit(uint256)": FunctionFragment;
    "getSaverAmount()": FunctionFragment;
    "getSaverGoal()": FunctionFragment;
    "isInWithdrawPeriod()": FunctionFragment;
    "monthTeller()": FunctionFragment;
    "numberOfSavers()": FunctionFragment;
    "overrideWithdrawForDemo(bool)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "savingsToken()": FunctionFragment;
    "setGoal(uint256)": FunctionFragment;
    "totalAmountSaved()": FunctionFragment;
    "totalGoalAmount()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "unlockEndTime()": FunctionFragment;
    "withdraw()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "deposit"
      | "getSaverAmount"
      | "getSaverGoal"
      | "isInWithdrawPeriod"
      | "monthTeller"
      | "numberOfSavers"
      | "overrideWithdrawForDemo"
      | "owner"
      | "renounceOwnership"
      | "savingsToken"
      | "setGoal"
      | "totalAmountSaved"
      | "totalGoalAmount"
      | "transferOwnership"
      | "unlockEndTime"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "deposit",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getSaverAmount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getSaverGoal",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isInWithdrawPeriod",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "monthTeller",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "numberOfSavers",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "overrideWithdrawForDemo",
    values: [PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "savingsToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setGoal",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "totalAmountSaved",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalGoalAmount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "unlockEndTime",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getSaverAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSaverGoal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isInWithdrawPeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "monthTeller",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "numberOfSavers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "overrideWithdrawForDemo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "savingsToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setGoal", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalAmountSaved",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalGoalAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unlockEndTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "Deposit(address,uint256,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Withdrawal(address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdrawal"): EventFragment;
}

export interface DepositEventObject {
  saver: string;
  amount: BigNumber;
  when: BigNumber;
}
export type DepositEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  DepositEventObject
>;

export type DepositEventFilter = TypedEventFilter<DepositEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface WithdrawalEventObject {
  saver: string;
  amount: BigNumber;
  when: BigNumber;
}
export type WithdrawalEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  WithdrawalEventObject
>;

export type WithdrawalEventFilter = TypedEventFilter<WithdrawalEvent>;

export interface ChristmasClub extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ChristmasClubInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    deposit(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getSaverAmount(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amount: BigNumber }>;

    getSaverGoal(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amount: BigNumber }>;

    isInWithdrawPeriod(overrides?: CallOverrides): Promise<[boolean]>;

    monthTeller(overrides?: CallOverrides): Promise<[string]>;

    numberOfSavers(overrides?: CallOverrides): Promise<[BigNumber]>;

    overrideWithdrawForDemo(
      inWithdrawalPeriod: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    savingsToken(overrides?: CallOverrides): Promise<[string]>;

    setGoal(
      goalAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    totalAmountSaved(overrides?: CallOverrides): Promise<[BigNumber]>;

    totalGoalAmount(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    unlockEndTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  deposit(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getSaverAmount(overrides?: CallOverrides): Promise<BigNumber>;

  getSaverGoal(overrides?: CallOverrides): Promise<BigNumber>;

  isInWithdrawPeriod(overrides?: CallOverrides): Promise<boolean>;

  monthTeller(overrides?: CallOverrides): Promise<string>;

  numberOfSavers(overrides?: CallOverrides): Promise<BigNumber>;

  overrideWithdrawForDemo(
    inWithdrawalPeriod: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  savingsToken(overrides?: CallOverrides): Promise<string>;

  setGoal(
    goalAmount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  totalAmountSaved(overrides?: CallOverrides): Promise<BigNumber>;

  totalGoalAmount(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  unlockEndTime(overrides?: CallOverrides): Promise<BigNumber>;

  withdraw(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    deposit(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getSaverAmount(overrides?: CallOverrides): Promise<BigNumber>;

    getSaverGoal(overrides?: CallOverrides): Promise<BigNumber>;

    isInWithdrawPeriod(overrides?: CallOverrides): Promise<boolean>;

    monthTeller(overrides?: CallOverrides): Promise<string>;

    numberOfSavers(overrides?: CallOverrides): Promise<BigNumber>;

    overrideWithdrawForDemo(
      inWithdrawalPeriod: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    savingsToken(overrides?: CallOverrides): Promise<string>;

    setGoal(
      goalAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    totalAmountSaved(overrides?: CallOverrides): Promise<BigNumber>;

    totalGoalAmount(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    unlockEndTime(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "Deposit(address,uint256,uint256)"(
      saver?: null,
      amount?: null,
      when?: null
    ): DepositEventFilter;
    Deposit(saver?: null, amount?: null, when?: null): DepositEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "Withdrawal(address,uint256,uint256)"(
      saver?: null,
      amount?: null,
      when?: null
    ): WithdrawalEventFilter;
    Withdrawal(saver?: null, amount?: null, when?: null): WithdrawalEventFilter;
  };

  estimateGas: {
    deposit(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getSaverAmount(overrides?: CallOverrides): Promise<BigNumber>;

    getSaverGoal(overrides?: CallOverrides): Promise<BigNumber>;

    isInWithdrawPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    monthTeller(overrides?: CallOverrides): Promise<BigNumber>;

    numberOfSavers(overrides?: CallOverrides): Promise<BigNumber>;

    overrideWithdrawForDemo(
      inWithdrawalPeriod: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    savingsToken(overrides?: CallOverrides): Promise<BigNumber>;

    setGoal(
      goalAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    totalAmountSaved(overrides?: CallOverrides): Promise<BigNumber>;

    totalGoalAmount(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    unlockEndTime(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    deposit(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getSaverAmount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getSaverGoal(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isInWithdrawPeriod(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    monthTeller(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    numberOfSavers(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    overrideWithdrawForDemo(
      inWithdrawalPeriod: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    savingsToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setGoal(
      goalAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    totalAmountSaved(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalGoalAmount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    unlockEndTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
