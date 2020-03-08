import { Block } from './Block';

export class Blockchain {
  public chain: Array<Block>;

  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  public addBlock(newBlock: Block) {
    newBlock.previousHash  = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  public isChainValid(): boolean {
    for(let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      //  Recalculate the hash and see if its the same
      if(currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  private createGenesisBlock(): Block {
    return new Block('0', new Date().toISOString(), {type: 'GENESIS BLOCK'}, '0');
  }

  private getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }
}