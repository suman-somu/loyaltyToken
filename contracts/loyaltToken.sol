// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract LoyalToken is
    ERC20,
    ERC20Burnable,
    ERC20Snapshot,
    Ownable,
    ERC20Permit
{
    mapping(address => uint256) private _addressToDate;
    address private _owner;

    constructor() ERC20("LoyaltyToken", "LTK") ERC20Permit("LoyalToken") {
        _mint(msg.sender, 400000000);
        _owner = msg.sender;
    }

    modifier onlyOwnerOrSelf() {
        require(
            msg.sender == _owner || msg.sender == address(this),
            "Not the owner or contract itself"
        );
        _;
    }

    function updateAccountWithDecay(address account) public onlyOwner {
        uint256 lastTxnDate = getAddressDate(account);
        uint256 elapsedTime = block.timestamp - lastTxnDate;

        if (elapsedTime >= 10 days) {
            uint256 decayPeriods = elapsedTime / 10 days;
            uint256 decayRate = 10; // 10% decay

            uint256 balance = balanceOf(account);
            uint256 decayedBalance = (balance *
                (100 - decayRate) ** decayPeriods) / 100 ** decayPeriods;

            _burn(account, balance - decayedBalance);
            _mint(address(this), balance - decayedBalance);
        }
    }

    function setAddressDate(address account, uint256 date) internal onlyOwner {
        _addressToDate[account] = date;
    }

    function getAddressDate(address account) public view returns (uint256) {
        return _addressToDate[account];
    }

    function snapshot() public onlyOwner {
        _snapshot();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public override onlyOwner returns (bool) {
        setAddressDate(sender, block.timestamp);
        setAddressDate(recipient, block.timestamp);
        super.transferFrom(sender, recipient, amount);
        return true;
    }

    function transfer(
        address recipient,
        uint256 amount
    ) public override onlyOwner returns (bool) {
        setAddressDate(msg.sender, block.timestamp);
        setAddressDate(recipient, block.timestamp);
        super.transfer(recipient, amount);
        return true;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Snapshot) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
