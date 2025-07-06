use candid::CandidType;
use ic_cdk_macros::{query, update};
use serde::{Deserialize, Serialize};
use std::cell::RefCell;

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
struct NFT {
    id: u64,
    owner: String,
    time_stamp: String,
    item_name: String,
    price: u32,
    description: String,
    bucket_link: String,
}

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
struct TxnRecord {
    txn_id: u64,
    nft_token_id: u64,
    seller: String,
    buyer: String,
}

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
struct Txn {
    txn_id: u64,
    nft_token_id: u64,
    txn_type: String,
}

thread_local! {
    static COUNTER: std::cell::RefCell<u64> = RefCell::new(0);
    static TXN_COUNTER: std::cell::RefCell<u64> = RefCell::new(0);
    static NFT_LIST: RefCell<Vec<NFT>> = RefCell::new(Vec::new());
    static BUY_LIST: RefCell<Vec<NFT>> = RefCell::new(Vec::new());
    static TXN_LIST: RefCell<Vec<TxnRecord>> = RefCell::new(Vec::new());

}

// API calls
// To get NFTs owned buy the user
#[query]
fn get_my_nfts(principal_id: String) -> Vec<NFT> {
    NFT_LIST.with(|nft| {
        let nft_list = nft.borrow().clone();
        let mut user_nft_list: Vec<NFT> = Vec::new();
        let mut i = 0;
        loop {
            if i >= nft_list.len() {
                break;
            }
            if nft_list[i].owner == principal_id {
                user_nft_list.push(nft_list[i].clone());
            }
            i += 1;
        }

        user_nft_list
    })
}

// To get the Buy MarketPlace
#[query]
fn get_buy_marketplace() -> Vec<NFT> {
    BUY_LIST.with(|buy_nfts| buy_nfts.borrow().clone())
}

// To get users sell orders
#[query]
fn get_sell_orders(principal_id: String) -> Vec<NFT> {
    BUY_LIST.with(|nft| {
        let buy_list = nft.borrow().clone();
        let mut user_nft_list: Vec<NFT> = Vec::new();
        let mut i = 0;
        loop {
            if i >= buy_list.len() {
                break;
            }
            if buy_list[i].owner == principal_id {
                user_nft_list.push(buy_list[i].clone());
            }
            i += 1;
        }

        user_nft_list
    })
}

// To get transactions of the user
#[query]
fn get_transactions(principal_id: String) -> Vec<Txn> {
    TXN_LIST.with(|txn| {
        let txn_record = txn.borrow().clone();
        let mut user_txn_record: Vec<Txn> = Vec::new();
        let mut i = 0;
        loop {
            if i >= txn_record.len() {
                break;
            }

            if txn_record[i].seller == principal_id {
                let _txn_record = Txn {
                    txn_id: txn_record[i].txn_id,
                    nft_token_id: txn_record[i].nft_token_id,
                    txn_type: "SELL".to_string(),
                };
                user_txn_record.push(_txn_record);
            } else if txn_record[i].buyer == principal_id {
                let _txn_record = Txn {
                    txn_id: txn_record[i].txn_id,
                    nft_token_id: txn_record[i].nft_token_id,
                    txn_type: "BUY".to_string(),
                };
                user_txn_record.push(_txn_record);
            }

            i += 1;
        }

        user_txn_record
    })
}

// Returns the queried NFT
#[query]
fn get_nft_data(nft_token_id: u64) -> Option<NFT> {
    let mut user_nft: Option<NFT> = None;
    NFT_LIST.with(|nfts| {
        let nft_list = nfts.borrow().clone();
        let mut i = 0;
        loop {
            if i >= nft_list.len() {
                break;
            }
            if nft_list[i].id == nft_token_id {
                user_nft = Some(nft_list[i].clone());
                break;
            }
            i += 1;
        }
    });
    user_nft
}

// Delete a transaction
// #[update]
// fn delete_transaction(principal_id: String, txn_id: u64) -> bool {
//     let mut index = 0;

//     TXN_LIST.with(|txn_record| {
//         let txn_list = txn_record.borrow().clone();

//         let mut i = 0;
//         loop {
//             if i >= txn_list.len() {
//                 break;
//             }

//             if txn_list[i].txn_id == txn_id {
//                 // if txn_list[i].owner == principal_id {
//                 index = i;
//                 break;
//                 // }
//             }

//             i += 1;
//         }
//     });

//     TXN_LIST.with(|txn_list| {
//         txn_list.borrow_mut().remove(index);
//     });

//     true
// }

// Buys an NFT
#[update]
fn buy_nft(principal_id: String, nft_token_id: u64) -> bool {   
    let mut index = 0;
	let mut current_price:u32 = 0;
    let mut prev_owner:String = "".to_string();

    BUY_LIST.with(|nft_list| {  // Find the nft in buy list
        let buy_list = nft_list.borrow().clone();

        let mut i = 0;
        loop {
            if i >= buy_list.len() {
                break;
            }

            if buy_list[i].id == nft_token_id {
                index = i;  // Capture Index
				current_price = buy_list[i].price; // Capture Price
                break;
            }

            i += 1;
        }
    });

    BUY_LIST.with(|buy_list| {
        buy_list.borrow_mut().remove(index);    // Remove from BUY List
    });

	NFT_LIST.with(|nfts| {  // Update NFT List
        let mut nft_list = nfts.borrow_mut();

        let mut i = 0;
        loop {
            if i >= nft_list.len() {
                break;
            }

            if nft_list[i].id == nft_token_id { // Find the nft in NFT List
                prev_owner = nft_list[i].owner.clone(); // Recored Previous Owner
                nft_list[i].owner = principal_id.clone();       // Update owner
				nft_list[i].price = current_price.clone();      // Update Price
                break;
            }

            i += 1;
        }
    });

    let mut txn_id: u64 = 0;

    TXN_COUNTER.with(|counter| {    // Get new id for the transaction
        let mut id_ptr = counter.borrow_mut();
        *id_ptr += 1;
        txn_id = *id_ptr;
    });

    TXN_LIST.with(|txn| {
        let mut txn_record = txn.borrow_mut();
        txn_record.push(TxnRecord { txn_id: txn_id, nft_token_id: nft_token_id.clone(), seller: prev_owner.clone(), buyer: principal_id.clone() });
    });

    true
}

// Sell an NFT
#[update]
fn sell_nft(principal_id: String, nft_token_id: u64, price: u32) -> bool {
    NFT_LIST.with(|nfts| {
        let nft_list = nfts.borrow().clone();

        let mut i = 0;
        loop {
            if i >= nft_list.len() {
                break;
            }

            if nft_list[i].id == nft_token_id {
                if nft_list[i].owner == principal_id {
                    let mut _nft = nft_list[i].clone();
                    _nft.price = price;

                    BUY_LIST.with(|buy_list| {
                        buy_list.borrow_mut().push(_nft);
                    });
                }
            }

            i += 1;
        }
    });

    true
}

// Removes a sell order
#[update]
fn remove_sell_order(principal_id: String, nft_token_id: u64) -> bool {
    let mut index = 0;

    BUY_LIST.with(|nft_list| {
        let buy_list = nft_list.borrow().clone();

        let mut i = 0;
        loop {
            if i >= buy_list.len() {
                break;
            }

            if buy_list[i].id == nft_token_id {
                if buy_list[i].owner == principal_id {
                    index = i;
                    break;
                }
            }

            i += 1;
        }
    });

    BUY_LIST.with(|buy_list| {
        buy_list.borrow_mut().remove(index);
    });

    true
}

// Create an NFT
#[update]
fn create_nft(
    principal_id: String,
    item_name: String,
    time_stamp: String,
    description: String,
    bucket_link: String,
) -> bool {
    let mut id: u64 = 0;

    COUNTER.with(|counter| {
        let mut id_ptr = counter.borrow_mut();
        *id_ptr += 1;
        id = *id_ptr;
    });

    NFT_LIST.with(|nfts| {
        nfts.borrow_mut().push(NFT {
            id: id,
            owner: principal_id,
            time_stamp: time_stamp,
            item_name: item_name,
            price: 0,
            description: description,
            bucket_link: bucket_link,
        });
    });

    true
}

ic_cdk::export_candid!();
