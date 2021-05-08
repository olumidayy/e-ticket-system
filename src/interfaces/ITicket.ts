export interface ITicket {
    _id: string;
    authorId: string;
    authorName: string;
    comments: string[];
    title: string;
    description: string;
    isClosed: boolean;
}

export interface ITicketCreateDTO {
    authorId: string;
    authorName: string;
    title: string;
    description: string;
}

export interface ITicketUpdateDTO {
    ticketId: string;
    title?: string;
    description?: string;
}