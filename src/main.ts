import { Blockchain } from './Blockchain';
import { Block } from './Block';
import { incrementDate } from './utility';

//  This function test the Proof of Concept Coin
function preview() {
  console.log('Creating Blockchain and adding 2 blocks')
  const pocC = new Blockchain();
  pocC.addBlock(new Block('1', incrementDate(new Date(), 1).toISOString(), {type: 'TRANSACTION', payload: { amount: '1'}}));
  pocC.addBlock(new Block('2', incrementDate(new Date(), 2).toISOString(), {type: 'TRANSACTION', payload: { amount: '2'}}));
  console.log(JSON.stringify(pocC, null, 2));
  console.log(`Is Blockchain Valid?: ${pocC.isChainValid()}`);

  console.log('');

  // Hack block [1]
  console.log('Hacking block [1] by altering amount in data.payload and recalculating hash')
  pocC.chain[1].data = {type: 'TRANSACTION', payload: { amount: '100'}};
  pocC.chain[1].hash = pocC.chain[1].calculateHash();
  console.log(JSON.stringify(pocC, null, 2));
  console.log(`Is Blockchain Valid?: ${pocC.isChainValid()}`);
  console.log('Because chain[1].hash !== chain[2].previousHash. Block [1] has been altered and the hash is not the same.');
}
preview();