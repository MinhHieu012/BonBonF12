export const listOrderData = {
  listOrder: [
    {
      id: 1,
      sellerCode: "SLR001",
      customer: {
        id: 1,
        phoneNumber: "123456789",
        fullName: "Nguyễn Văn Hưng",
        address: "Hà Nội",
        avatar: "https://cdn-icons-png.flaticon.com/512/2919/2919906.png",
      },
      orderTime: "2024-04-10 10:00:00",
      orderPrice: 650000,
      status: "Chờ xử lý",
      listProduct: [
        {
          idProduct: 1,
          name: "Sản phẩm 1",
          quantity: 2,
          priceEdit: 150000,
          unit: "Uống",
          avatar:
            "https://images.freeimages.com/uploads/11098418/d0145983-fd47-4756-99ca-cb478d12b23b.jpg",
          totalProductPrice: 150000,
        },
        {
          idProduct: 2,
          name: "Sản phẩm 2",
          quantity: 3,
          priceEdit: 200000,
          unit: "Viên",
          avatar:
            "https://images.freeimages.com/uploads/11098418/4c19c365-41ee-4301-a133-09083314802c.jpg",
          totalProductPrice: 200000,
        },
        {
          idProduct: 3,
          name: "Sản phẩm 3",
          quantity: 4,
          priceEdit: 250000,
          unit: "Viên",
          avatar:
            "https://images.freeimages.com/uploads/11098418/0a97b3f5-743b-4f00-a8bc-36f083d3b75e.jpg",
          totalProductPrice: 250000,
        },
      ],
      orderCode: "11.123456.001",
    },
  ],
  key: "list-order",
};
