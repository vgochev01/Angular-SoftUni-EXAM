export interface IHotel {
    _id: string;
    reviews: Array<any>;
    usersBooked: Array<any>;
    name: string;
    description: string,
    destination: string;
    imageUrl: string;
    freeRooms: number,
    owner: {
        _id: string;
        username: string;
        email: string;
        __v: number;
    };
    __v: number;
    price: number;
    _ownerId: string;
}