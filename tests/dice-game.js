const assert = require("assert");
const anchor = require('@project-serum/anchor');
const BN = anchor.BN;

const { SystemProgram, LAMPORTS_PER_SOL } = anchor.web3;


describe("dice game", () => {
  // const provider = anchor.Provider.env();
  // anchor.setProvider(provider);

  anchor.setProvider(anchor.Provider.env());
  const dice_game = anchor.workspace.Dicegame;

  // Create account
  const baseUser = anchor.web3.Keypair.generate();

  it("Initialize numbers", async () => {
    // Initialize Test
    const tx = await dice_game.rpc.initialize({
      accounts: {
        baseUser: baseUser.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseUser],
    });

    console.log("Your transaction signature: ", tx);
  })

  // let acc = await program.account.baseUser.fetch(baseUser.publicKey);
  // console.log(acc);

  // Create Game Wallet
  const game_wallet = anchor.web3.Keypair.generate();

  it("Play Game", async () => {
    // Play Game test
    let gameTx = await dice_game.rpc.playGame(0.1, {
      accounts: {
        game_wallet: game_wallet.publicKey,
        baseUser: baseUser.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      },
      signers: [baseUser],
    });

    console.log("Game transaction signature: ", gameTx);
  })
})


// const main = async() => {
//   console.log("Starting Test..........");

//   const provider = anchor.Provider.env();
//   anchor.setProvider(provider);
//   const program = anchor.workspace.Dicegame;

//   // Create account
//   const baseUser = anchor.web3.Keypair.generate();

//   // Initialize Test
//   const tx = await program.rpc.initialize({
//     accounts: {
//       baseUser: baseUser.publicKey,
//       user: provider.wallet.publicKey,
//       systemProgram: SystemProgram.programId
//     },
//     signers: [baseUser],
//   });

//   console.log("Your transaction signature: ", tx);


//   let acc = await program.account.baseUser.fetch(baseUser.publicKey);
//   console.log(acc);

//   // Create Game Wallet
//   const game_wallet = anchor.web3.Keypair.generate();

//   // Play Game test
//   let gameTx = await program.rpc.playGame(0.1, {
//     accounts: {
//       baseUser: baseUser.publicKey,
//       game_wallet: game_wallet.publicKey,
//       user: provider.wallet.publicKey,
//       systemProgram: SystemProgram.programId
//     },
//     signers: [baseUser],
//   });

//   console.log("Game transaction signature: ", gameTx);
// };

// const runMain = async() => {
//   try {
//     await main();
//     process.exit(0);
//   } catch (err) {
//     console.log(err);
//   }
// };

// runMain();