// export const listOrderData = {
//     listOrder: [
//     ],
//     key: "list-order",
// }

export const listOrderData = {
    listOrder: [
        {
            id: 1,
            sellerCode: "SLR001",
            customer: {
                id: 1,
                phoneNumber: "123456789",
                fullName: "John Doe",
                address: "123 Main St",
                avatar: "https://cdn-icons-png.flaticon.com/512/2919/2919906.png",
            },
            orderTime: "2024-04-10 10:00:00",
            orderPrice: 100000,
            status: "pending",
            listProduct: [
                {
                    idProduct: 1,
                    name: "Product 1",
                    quantity: 2,
                    unit: "pcs",
                    avatar: "https://cdn-icons-png.flaticon.com/512/2919/2919906.png",
                    totalProductPrice: 50,
                },
                {
                    idProduct: 2,
                    name: "Product 2",
                    quantity: 3,
                    unit: "pcs",
                    avatar: "https://cdn-icons-png.flaticon.com/512/2919/2919906.png",
                    totalProductPrice: 75,
                },
            ],
            orderCode: "11.123456.001",
        },
        {
            id: 2,
            sellerCode: "SLR002",
            customer: {
                id: 2,
                phoneNumber: "987654321",
                fullName: "Jane Smith",
                address: "456 Oak Ave",
                avatar: "avatar.jpg",
            },
            orderTime: "2024-04-09 15:30:00",
            orderPrice: 50,
            status: "completed",
            listProduct: [
                {
                    idProduct: 3,
                    name: "Product 3",
                    quantity: 1,
                    unit: "pcs",
                    avatar: "product3.jpg",
                    totalProductPrice: 25,
                },
            ],
            orderCode: "11.987654.001",
        },
    ],
    key: "list-order",
};