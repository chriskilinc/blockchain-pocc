import SHA256 from 'crypto-js/sha256.js';

interface BlockData {
  type: String;
  payload?: BlockDataPayload;
}

interface BlockDataPayload {
  amount: string;
}

export class Block {
  public index: string;
  public timestamp: string;
  public data: BlockData;
  public previousHash: string;
  public hash: string;

  constructor(index, timestamp, data, previousHash = ''){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  public calculateHash():string {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}