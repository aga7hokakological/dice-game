use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod dice_game {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult { 
        let player = &mut ctx.accounts.player;
        player.result = 0;

        Ok(())
    }

    pub fn play_game(ctx: Context<PlayGame>, placed_bet: u64) -> {
        let player = &mut ctx.accounts.player;
        let game_wallet = &mut ctx.accounts.game_wallet;

        let game_wallet_lamports = **game_wallet.to_account_info().lamports.borrow();

        let d1 = Clock::get().unwrap().unix_timestamp;
        let d2 = Clock::get().unwrap().unix_timestamp;

        player.dice1 = d1;
        player.dice2 = d2;
        player.result = ((player.dice1 + player.dice2) / 2) as u64;

        if player.result == 7 {
            invoke(
                &transfer(
                    game_wallet.to_account_info().key,
                    ctx.accounts.player.to_account_info().key,
                    (placed_bet * 2),
                ),
                &[
                    game_wallet.to_account_info(),
                    ctx.accounts.player.to_account_info(),
                    ctx.accounts.system_program.to_account_info()
                ],
            )?;
        }

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct Initialize<'info> {
    #[account(init, payer=user)]
    pub player: Account<'info, Player>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct PlayGame<'info> {
    #[account(init, seeds=[], bump=8)]
    pub game_wallet: Account<'info, GameWallet>,
    #[account(mut)]
    pub player: Account<'info, Player>,
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[account]
pub struct GameWallet {
    amount: u64,
}

#[account]
pub struct Player {
    player_key: Pubkey,
    dice1: u64,
    dice2: u64,
    result: u64,
}

// impl Player {
//     fn space() -> usize {
//         32 + 8 + 64 + 64 + 64
//     }
// }