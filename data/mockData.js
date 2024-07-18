// /orders/get
export const lazadaResponses = {
    "code": "0",
    "data": {
        "count": "10",
        "countTotal": "500",
        "orders": [
            {
                "voucher_platform": "0.00",
                "voucher": "0.00",
                "warehouse_code": "dropshipping",
                "order_number": "491253082180001",
                "voucher_seller": "0.00",
                "created_at": "2018-02-09T22:44:30+08:00",
                "voucher_code": "1234",
                "gift_option": "false",
                "shipping_fee_discount_platform": "0.00",
                "customer_last_name": "last_name",
                "promised_shipping_times": "shipping_time",
                "updated_at": "2018-02-09T22:44:30+08:00",
                "price": "106.00",
                "national_registration_number": "1",
                "shipping_fee_original": "0.00",
                "payment_method": "COD",
                "address_updated_at": "null",
                "buyer_note": "red color",
                "customer_first_name": "Ha Hung",
                "shipping_fee_discount_seller": "0.00",
                "shipping_fee": "0.54",
                "branch_number": "2222",
                "tax_code": "562562",
                "items_count": "2",
                "delivery_info": "delivery",
                "statuses": [],
                "address_billing": {
                    "country": "Singapore",
                    "address3": "address3",
                    "phone": "61****7",
                    "address2": "address2",
                    "city": "Singapore-Singapore-500001",
                    "address1": "1 CHANGI VILLAGE ROAD, 11",
                    "post_code": "500001",
                    "phone2": "61****7",
                    "last_name": "last_name",
                    "address5": "address5",
                    "address4": "address4",
                    "first_name": "Ha Hung"
                },
                "extra_attributes": "null",
                "order_id": "491253082180001",
                "remarks": "remarks",
                "gift_message": "1",
                "address_shipping": {
                    "country": "Singapore",
                    "address3": "address3",
                    "phone": "6****67",
                    "address2": "address2",
                    "city": "Singapore-Singapore-500001",
                    "address1": "1 CHANGI VILLAGE ROAD, 11",
                    "post_code": "500001",
                    "phone2": "4***456",
                    "last_name": "last_name",
                    "address5": "address5",
                    "address4": "address4",
                    "first_name": "Ha Hung"
                }
            },
            {
                "voucher_platform": "0.00",
                "voucher": "0.00",
                "warehouse_code": "dropshipping",
                "order_number": "491253082180002",
                "voucher_seller": "0.00",
                "created_at": "2018-02-09T22:44:30+08:00",
                "voucher_code": "5678",
                "gift_option": "true",
                "shipping_fee_discount_platform": "0.00",
                "customer_last_name": "last_name",
                "promised_shipping_times": "shipping_time",
                "updated_at": "2018-02-09T22:44:30+08:00",
                "price": "50.00",
                "national_registration_number": "2",
                "shipping_fee_original": "0.00",
                "payment_method": "Credit Card",
                "address_updated_at": "null",
                "buyer_note": "blue color",
                "customer_first_name": "John",
                "shipping_fee_discount_seller": "0.00",
                "shipping_fee": "0.99",
                "branch_number": "3333",
                "tax_code": "789789",
                "items_count": "1",
                "delivery_info": "delivery",
                "statuses": [],
                "address_billing": {
                    "country": "Singapore",
                    "address3": "address3",
                    "phone": "61****7",
                    "address2": "address2",
                    "city": "Singapore-Singapore-500001",
                    "address1": "2 ORCHARD ROAD, 22",
                    "post_code": "500002",
                    "phone2": "61****7",
                    "last_name": "last_name",
                    "address5": "address5",
                    "address4": "address4",
                    "first_name": "John"
                },
                "extra_attributes": "null",
                "order_id": "491253082180002",
                "remarks": "remarks",
                "gift_message": "2",
                "address_shipping": {
                    "country": "Singapore",
                    "address3": "address3",
                    "phone": "6****67",
                    "address2": "address2",
                    "city": "Singapore-Singapore-500001",
                    "address1": "2 ORCHARD ROAD, 22",
                    "post_code": "500002",
                    "phone2": "4***456",
                    "last_name": "last_name",
                    "address5": "address5",
                    "address4": "address4",
                    "first_name": "John"
                }
            }
        ]
    },
    "request_id": "0ba2887315178178017221014"
}

// /api/v2/order/get_order_list
// will need to use /api/v2/order/get_order_detail to get the order details, this only gives order ID
export const shoppeeResponses = {
        "error": "",
        "message": "",
        "response": {
            "more": true,
            "next_cursor":"20",
            "order_list": [
                {
                    "order_sn": "201218V2Y6E59M"
                },
                {
                    "order_sn": "201218V2W2SG1E"
                },
                {
                    "order_sn": "201218V2VJJC70"
                },
                {
                    "order_sn": "201218V2TEURPF"
                },
                {
                    "order_sn": "201218UXWNTUNP"
                },
                {
                    "order_sn": "201218UWFYSCF1"
                },
                {
                    "order_sn": "201215MPRFUUNN"
                },
                {
                    "order_sn": "201215MCR3V9N8"
                },
                {
                    "order_sn": "201214JASXYXY6"
                },
                {
                    "order_sn": "201214JAJXU6G7"
                }
            ]
        },
        "request_id": "b937c04e554847789cbf3fe33a0ad5f1"
    }

export const shoppeeOrderDetails =
    {
        "error": "",
        "message": "",
        "request_id": "023c50ace933ba38473a5fb2a7dc8821",
        "response": {
            "order_list": [
                {
                    "actual_shipping_fee_confirmed": true,
                    "buyer_cancel_reason": "",
                    "buyer_cpf_id": null,
                    "buyer_user_id": 1170319091,
                    "buyer_username": "xt4fdsf96j",
                    "cancel_by": "",
                    "cancel_reason": "",
                    "cod": true,
                    "create_time": 1712601591,
                    "currency": "VND",
                    "days_to_ship": 2,
                    "dropshipper": null,
                    "dropshipper_phone": null,
                    "estimated_shipping_fee": 5000,
                    "fulfillment_flag": "fulfilled_by_local_seller",
                    "goods_to_declare": false,
                    "invoice_data": null,
                    "item_list": [
                        {
                            "add_on_deal": false,
                            "add_on_deal_id": 0,
                            "image_info": {
                                "image_url": "https://cf.shopee.vn/file/vn-11134207-7qukw-lf6guphtf6oad3_tn"
                            },
                            "is_b2c_owned_item": false,
                            "is_prescription_item": false,
                            "item_id": 23620853561,
                            "item_name": "🦋giảm giá🦋Kem nở ngực SADOER enlarging breast cream Papaya / Coconut essence 60g Chiết xuất đu đủ, cùi dừa, nở ngực, kem nâng ngực nhanh",
                            "item_sku": "",
                            "main_item": false,
                            "model_discounted_price": 48000,
                            "model_id": 221404189791,
                            "model_name": "60g（Papaya）",
                            "model_original_price": 300000,
                            "model_quantity_purchased": 1,
                            "model_sku": "QAZ-SADOER-05",
                            "order_item_id": 23620853561,
                            "product_location_id": [
                                "VN10XX2UZ"
                            ],
                            "promotion_group_id": 0,
                            "promotion_id": 779222207758537,
                            "promotion_type": "flash_sale",
                            "weight": 0.01,
                            "wholesale": false
                        }
                    ],
                    "message_to_seller": "",
                    "note": "",
                    "note_update_time": 0,
                    "order_sn": "2404098R48U37H",
                    "order_status": "COMPLETED",
                    "package_list": [
                        {
                            "group_shipment_id": null,
                            "item_list": [
                                {
                                    "item_id": 23620853561,
                                    "model_id": 221404189791,
                                    "model_quantity": 1,
                                    "order_item_id": 23620853561,
                                    "product_location_id": "VN10XX2UZ",
                                    "promotion_group_id": 0
                                }
                            ],
                            "logistics_status": "LOGISTICS_DELIVERY_DONE",
                            "package_number": "OFG166300791210964",
                            "parcel_chargeable_weight_gram": 10,
                            "shipping_carrier": "Giao Hàng Nhanh"
                        }
                    ],
                    "pay_time": 1712817766,
                    "payment_method": "Cash on Delivery",
                    "pickup_done_time": 1712726577,
                    "recipient_address": {
                        "city": "Huyện Phước Long",
                        "district": "Xã Phong Thạnh Tây B",
                        "full_address": "Ấp******",
                        "name": "P******n",
                        "phone": "******64",
                        "region": "VN",
                        "state": "Bạc Liêu",
                        "town": "",
                        "zipcode": ""
                    },
                    "region": "VN",
                    "reverse_shipping_fee": 0,
                    "ship_by_date": 1712671200,
                    "shipping_carrier": "Giao Hàng Nhanh",
                    "split_up": false,
                    "total_amount": 32119,
                    "update_time": 1713139948
                }
            ]
        }
    }