// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title PrepaidPaymentToken
 * @dev 前払式支払手段のERC-20トークンと初回購入者向け固定投票権を実装したコントラクト
 */
contract PrepaidPaymentToken is ERC20, Ownable, Pausable {
    // 投票権の構造体
    struct VotingRight {
        bool hasRight;
        uint256 votingPower;
    }
    
    // 投票権のマッピング
    mapping(address => VotingRight) public votingRights;
    
    // 固定投票権の値
    uint256 public constant FIXED_VOTING_POWER = 1;
    
    // トークンの価格（Wei）
    uint256 public tokenPrice;
    
    // イベント
    event TokensPurchased(address indexed buyer, uint256 amount);
    event VotingRightGranted(address indexed holder);
    event TokenPriceUpdated(uint256 newPrice);

    /**
     * @dev コンストラクタ
     * @param name トークンの名前
     * @param symbol トークンのシンボル
     * @param initialPrice 初期トークン価格（Wei）
     */
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialPrice
    ) ERC20(name, symbol) {
        tokenPrice = initialPrice;
    }

    /**
     * @dev トークンを購入する
     */
    function purchaseTokens() public payable whenNotPaused {
        require(msg.value > 0, "Payment amount must be greater than 0");
        require(msg.value % tokenPrice == 0, "Payment amount must be a multiple of token price");
        
        uint256 tokenAmount = msg.value / tokenPrice;
        
        // 初回購入時のみ投票権を付与
        if (balanceOf(msg.sender) == 0 && !votingRights[msg.sender].hasRight) {
            votingRights[msg.sender] = VotingRight(true, FIXED_VOTING_POWER);
            emit VotingRightGranted(msg.sender);
        }
        
        _mint(msg.sender, tokenAmount);
        emit TokensPurchased(msg.sender, tokenAmount);
    }

    /**
     * @dev トークン価格を更新する（オーナーのみ）
     * @param newPrice 新しいトークン価格
     */
    function updateTokenPrice(uint256 newPrice) public onlyOwner {
        require(newPrice > 0, "Price must be greater than 0");
        tokenPrice = newPrice;
        emit TokenPriceUpdated(newPrice);
    }

    /**
     * @dev コントラクトを一時停止する（オーナーのみ）
     */
    function pause() public onlyOwner {
        _pause();
    }

    /**
     * @dev コントラクトの一時停止を解除する（オーナーのみ）
     */
    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     * @dev アドレスの投票力を取得する
     * @param account 確認するアドレス
     * @return 投票力
     */
    function getVotingPower(address account) public view returns (uint256) {
        return votingRights[account].votingPower;
    }

    /**
     * @dev コントラクトの残高を引き出す（オーナーのみ）
     */
    function withdrawBalance() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        
        (bool sent, ) = payable(owner()).call{value: balance}("");
        require(sent, "Failed to withdraw balance");
    }

    /**
     * @dev トークン転送時の処理
     * @param from 送信元アドレス
     * @param to 送信先アドレス
     * @param amount 転送量
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
        // 転送時の追加処理は不要になりました
    }
}