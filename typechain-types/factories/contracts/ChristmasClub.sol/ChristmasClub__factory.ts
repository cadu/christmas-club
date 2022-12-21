/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  ChristmasClub,
  ChristmasClubInterface,
} from "../../../contracts/ChristmasClub.sol/ChristmasClub";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_savingsToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_monthAPIImpl",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "saver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "when",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "saver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "when",
        type: "uint256",
      },
    ],
    name: "Withdrawal",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getSaverAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSaverGoal",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isInWithdrawPeriod",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "monthTeller",
    outputs: [
      {
        internalType: "contract MonthAPI",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numberOfSavers",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "inWithdrawalPeriod",
        type: "bool",
      },
    ],
    name: "overrideWithdrawForDemo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "savingsToken",
    outputs: [
      {
        internalType: "contract ICCToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "goalAmount",
        type: "uint256",
      },
    ],
    name: "setGoal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalAmountSaved",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalGoalAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unlockEndTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052600060025560006003556000600455600060055560006006553480156200002a57600080fd5b5060405162001a8738038062001a87833981810160405281019062000050919062000230565b6200007062000064620000fa60201b60201c565b6200010260201b60201c565b81600a60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600b60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505062000277565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001f882620001cb565b9050919050565b6200020a81620001eb565b81146200021657600080fd5b50565b6000815190506200022a81620001ff565b92915050565b600080604083850312156200024a5762000249620001c6565b5b60006200025a8582860162000219565b92505060206200026d8582860162000219565b9150509250929050565b61180080620002876000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c8063a3d9792611610097578063ea091eb811610066578063ea091eb814610241578063ee0062d31461025d578063f2fde38b1461027b578063fcdc022e1461029757610100565b8063a3d97926146101cb578063b6b55f25146101e9578063bf5d3ca414610205578063c7c900351461022357610100565b80633f40a821116100d35780633f40a821146101695780634b29c44814610187578063715018a6146101a35780638da5cb5b146101ad57610100565b806306250ab11461010557806313f877a6146101235780631436282c146101415780633ccfd60b1461015f575b600080fd5b61010d6102b5565b60405161011a9190610eb3565b60405180910390f35b61012b6102db565b6040516101389190610ee9565b60405180910390f35b6101496103ab565b6040516101569190610f1d565b60405180910390f35b6101676103b1565b005b61017161060c565b60405161017e9190610f1d565b60405180910390f35b6101a1600480360381019061019c9190610f69565b610653565b005b6101ab6107c7565b005b6101b56107db565b6040516101c29190610fb7565b60405180910390f35b6101d3610804565b6040516101e09190610ff3565b60405180910390f35b61020360048036038101906101fe9190610f69565b61082a565b005b61020d610aaa565b60405161021a9190610f1d565b60405180910390f35b61022b610ab0565b6040516102389190610f1d565b60405180910390f35b61025b6004803603810190610256919061103a565b610af7565b005b610265610b3e565b6040516102729190610f1d565b60405180910390f35b61029560048036038101906102909190611093565b610b44565b005b61029f610bc7565b6040516102ac9190610f1d565b60405180910390f35b600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60004260065411156102f057600090506103a8565b42600554111561030357600190506103a8565b600c600b60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a324ad24426040518263ffffffff1660e01b81526004016103609190610f1d565b602060405180830381865afa15801561037d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a191906110f9565b60ff161490505b90565b60045481565b6103b96102db565b6103f8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103ef90611183565b60405180910390fd5b6000600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541161047a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161047190611215565b60405180910390fd5b6000600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905080600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461050d9190611264565b9250508190555080600460008282546105269190611264565b92505081905550600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b815260040161058a929190611298565b6020604051808303816000875af11580156105a9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105cd91906112d6565b507fdf273cb619d95419a9cd0ec88123a0538c85064229baa6363788f743fff90deb33824260405161060193929190611303565b60405180910390a150565b6000600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905090565b60008111610696576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161068d906113ac565b60405180910390fd5b600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054811015610718576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161070f9061143e565b60405180910390fd5b6000600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905061077161076b60035483610bcd565b83610bf4565b60038190555081600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506107c3610c20565b5050565b6107cf610cea565b6107d96000610d68565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600b60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6108326102db565b15610872576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610869906114f6565b60405180910390fd5b80600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b81526004016108ce9190610fb7565b6020604051808303816000875af11580156108ed573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610911919061152b565b1015610952576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610949906115ca565b60405180910390fd5b600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b81526004016109b1939291906115ea565b6020604051808303816000875af11580156109d0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109f491906112d6565b5080600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610a449190611621565b925050819055508060046000828254610a5d9190611621565b92505081905550610a6c610c20565b7f90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15338242604051610a9f93929190611303565b60405180910390a150565b60035481565b6000600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905090565b8015610b1e57600060068190555061012c42610b139190611621565b600581905550610b3b565b61012c42610b2c9190611621565b60068190555060006005819055505b50565b60025481565b610b4c610cea565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610bbb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bb2906116c7565b60405180910390fd5b610bc481610d68565b50565b60015481565b600082821115610be057610bdf6116e7565b5b8183610bec9190611264565b905092915050565b6000808284610c039190611621565b905083811015610c1657610c156116e7565b5b8091505092915050565b6000600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905080610ce75760026000815480929190610c8990611716565b91905055506001600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b50565b610cf2610e2c565b73ffffffffffffffffffffffffffffffffffffffff16610d106107db565b73ffffffffffffffffffffffffffffffffffffffff1614610d66576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d5d906117aa565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000610e79610e74610e6f84610e34565b610e54565b610e34565b9050919050565b6000610e8b82610e5e565b9050919050565b6000610e9d82610e80565b9050919050565b610ead81610e92565b82525050565b6000602082019050610ec86000830184610ea4565b92915050565b60008115159050919050565b610ee381610ece565b82525050565b6000602082019050610efe6000830184610eda565b92915050565b6000819050919050565b610f1781610f04565b82525050565b6000602082019050610f326000830184610f0e565b92915050565b600080fd5b610f4681610f04565b8114610f5157600080fd5b50565b600081359050610f6381610f3d565b92915050565b600060208284031215610f7f57610f7e610f38565b5b6000610f8d84828501610f54565b91505092915050565b6000610fa182610e34565b9050919050565b610fb181610f96565b82525050565b6000602082019050610fcc6000830184610fa8565b92915050565b6000610fdd82610e80565b9050919050565b610fed81610fd2565b82525050565b60006020820190506110086000830184610fe4565b92915050565b61101781610ece565b811461102257600080fd5b50565b6000813590506110348161100e565b92915050565b6000602082840312156110505761104f610f38565b5b600061105e84828501611025565b91505092915050565b61107081610f96565b811461107b57600080fd5b50565b60008135905061108d81611067565b92915050565b6000602082840312156110a9576110a8610f38565b5b60006110b78482850161107e565b91505092915050565b600060ff82169050919050565b6110d6816110c0565b81146110e157600080fd5b50565b6000815190506110f3816110cd565b92915050565b60006020828403121561110f5761110e610f38565b5b600061111d848285016110e4565b91505092915050565b600082825260208201905092915050565b7f596f752063616e27742077697468647261772079657400000000000000000000600082015250565b600061116d601683611126565b915061117882611137565b602082019050919050565b6000602082019050818103600083015261119c81611160565b9050919050565b7f596f75206d757374206861766520736176696e677320746f207769746864726160008201527f7700000000000000000000000000000000000000000000000000000000000000602082015250565b60006111ff602183611126565b915061120a826111a3565b604082019050919050565b6000602082019050818103600083015261122e816111f2565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061126f82610f04565b915061127a83610f04565b925082820390508181111561129257611291611235565b5b92915050565b60006040820190506112ad6000830185610fa8565b6112ba6020830184610f0e565b9392505050565b6000815190506112d08161100e565b92915050565b6000602082840312156112ec576112eb610f38565b5b60006112fa848285016112c1565b91505092915050565b60006060820190506113186000830186610fa8565b6113256020830185610f0e565b6113326040830184610f0e565b949350505050565b7f596f75206d7573742068617665206120736176696e677320676f616c2067726560008201527f61746572207468616e207a65726f000000000000000000000000000000000000602082015250565b6000611396602e83611126565b91506113a18261133a565b604082019050919050565b600060208201905081810360008301526113c581611389565b9050919050565b7f596f757220676f616c206d7573742062652067726561746572207468616e206160008201527f6d6f756e7420616c7265616479206465706f7369746564000000000000000000602082015250565b6000611428603783611126565b9150611433826113cc565b604082019050919050565b600060208201905081810360008301526114578161141b565b9050919050565b7f546f6f206c61746520746f206d616b6520616e6f74686572206465706f73697460008201527f20746869732079656172202d20796f752063616e207769746864726177206e6f60208201527f7700000000000000000000000000000000000000000000000000000000000000604082015250565b60006114e0604183611126565b91506114eb8261145e565b606082019050919050565b6000602082019050818103600083015261150f816114d3565b9050919050565b60008151905061152581610f3d565b92915050565b60006020828403121561154157611540610f38565b5b600061154f84828501611516565b91505092915050565b7f596f75722062616c616e6365206f66205553444320697320746f6f206c6f772060008201527f746f206465706f7369742074686973206d756368000000000000000000000000602082015250565b60006115b4603483611126565b91506115bf82611558565b604082019050919050565b600060208201905081810360008301526115e3816115a7565b9050919050565b60006060820190506115ff6000830186610fa8565b61160c6020830185610fa8565b6116196040830184610f0e565b949350505050565b600061162c82610f04565b915061163783610f04565b925082820190508082111561164f5761164e611235565b5b92915050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006116b1602683611126565b91506116bc82611655565b604082019050919050565b600060208201905081810360008301526116e0816116a4565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052600160045260246000fd5b600061172182610f04565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361175357611752611235565b5b600182019050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000611794602083611126565b915061179f8261175e565b602082019050919050565b600060208201905081810360008301526117c381611787565b905091905056fea2646970667358221220a3a485ae2ac705229d62642812bf0c33ab5c14a94f20aa5e350af915f95109bd64736f6c63430008110033";

type ChristmasClubConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ChristmasClubConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ChristmasClub__factory extends ContractFactory {
  constructor(...args: ChristmasClubConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _savingsToken: PromiseOrValue<string>,
    _monthAPIImpl: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ChristmasClub> {
    return super.deploy(
      _savingsToken,
      _monthAPIImpl,
      overrides || {}
    ) as Promise<ChristmasClub>;
  }
  override getDeployTransaction(
    _savingsToken: PromiseOrValue<string>,
    _monthAPIImpl: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _savingsToken,
      _monthAPIImpl,
      overrides || {}
    );
  }
  override attach(address: string): ChristmasClub {
    return super.attach(address) as ChristmasClub;
  }
  override connect(signer: Signer): ChristmasClub__factory {
    return super.connect(signer) as ChristmasClub__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ChristmasClubInterface {
    return new utils.Interface(_abi) as ChristmasClubInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ChristmasClub {
    return new Contract(address, _abi, signerOrProvider) as ChristmasClub;
  }
}
