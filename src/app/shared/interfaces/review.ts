export interface IReview {
    _id: string;
    title: string;
    content: string;
    hotelId: string;
    owner: {
        _id: string;
        username: string;
        email: string;
        __v: number;
    }
    __v: number;
}