#![cfg_attr(not(feature = "std"), no_std)]

use ink_env::{AccountId, hash::{Blake2x256, CryptoHash, HashOutput}};
use ink_storage::{traits::{PackedLayout, SpreadLayout}};
use ink_prelude::vec::Vec;
#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub struct TickeResult {
    pub price: u128,
    pub maker: ink_env::AccountId,
}

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub enum MeetingError {
    /// Returned if not enough balance to fulfill a request is available.
    NotOwner,
    CallBuyTickerError,
    TransferError,
}

#[derive(
    Debug, Clone, PartialEq, Eq, scale::Encode, scale::Decode, SpreadLayout, PackedLayout,
)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
)]
pub struct Ticket {
    template_addr:AccountId,  //模板id
    meeting:AccountId,      //活动地址
    hash: Vec<u8>,          //hash值
    price: u128,         //价格
    zone_id:u32,              //区域.
    seat_id:Option<(u32,u32)>
}

impl Ticket{
    pub fn new(template_addr:AccountId,meeting:AccountId,price:u128,zone_id:u32,seat_id:Option<(u32,u32)>,ticket_id:u32)->Self{
        // 此处的生成hash的方法极度不合理.需要将template+meeting+price一起生成encode后得到进行hash运算.
        // let mut template_code=scale::Encode::encode(&template);
        let mut meeting_code=scale::Encode::encode(&meeting);
        let mut ticket_id_byte = ticket_id.to_be_bytes().to_vec();
        meeting_code.append(&mut ticket_id_byte);
        // let random_hash:[u8] = ink_env::random(template_code).unwrap().0;
        // template_code.append(random_hash);
        let hash = scale::Encode::encode(&meeting_code);
        
        let mut hash_output = <<Blake2x256 as HashOutput>::Type as Default>::default();
        <Blake2x256 as CryptoHash>::hash(&hash, &mut hash_output);
        Self{
            template_addr,
            meeting,
            hash:hash_output.into(),
            price,
            zone_id,
            seat_id,
        }
    }
}
