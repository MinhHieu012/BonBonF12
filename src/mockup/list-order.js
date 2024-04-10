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
            customerInfo: {
                id: 1,
                phoneNumber: "123456789",
                fullName: "John Doe",
                address: "123 Main St",
                avatar: "avatar.jpg",
            },
            orderTime: "2024-04-10 10:00:00",
            orderPrice: 100,
            status: "pending",
            listProduct: [
                {
                    idProduct: 1,
                    name: "Product 1",
                    quantity: 2,
                    unit: "pcs",
                    avatar: "product1.jpg",
                    totalProductPrice: 50,
                },
                {
                    idProduct: 2,
                    name: "Product 2",
                    quantity: 3,
                    unit: "pcs",
                    avatar: "product2.jpg",
                    totalProductPrice: 75,
                },
            ],
        },
        {
            id: 2,
            sellerCode: "SLR002",
            customerInfo: {
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
        },
    ],
    key: "list-order",
};