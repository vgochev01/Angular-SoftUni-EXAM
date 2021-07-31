export interface IHotel {
    _id: string;
    reviews: Array<any>;
    usersBooked: Array<any>;
    name: string;
    description: string,
    destination: string;
    imageUrl: string;
    freeRooms: number,
    owner: string;
    __v: number;
    price: number
}