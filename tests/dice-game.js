const anchor = require('@project-serum/anchor');

const { SystemProgram, LAMPORTS_PER_SOL } = anchor.web3;

const main = async() => {
  console.log("Starting Test..........");

  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.DiceGame;

  // Create account
  const baseUser = anchor.web3.Keypair.generate();

  // Initialize Test
  const tx = await program.rpc.initialize({
    accounts: {
      baseUser: baseUser.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId
    },
    signers: [baseUser],
  });

  console.log("Your transaction signature: ", tx);


  let acc = await program.account.baseUser.fetch(baseUser.publicKey);
  console.log(acc);

  // Create Game Wallet
  const game_wallet = anchor.web3.Keypair.generate();

  // Play Game test
  let gameTx = await program.rpc.playGame(0.1, {
    accounts: {
      baseUser: baseUser.publicKey,
      game_wallet: game_wallet.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId
    },
    signers: [baseUser],
  });

  console.log("Game transaction signature: ", gameTx);
};

const runMain = async() => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

runMain();