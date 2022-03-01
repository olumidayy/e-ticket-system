import { ITicket, ITicketCreateDTO, ITicketUpdateDTO } from "../../../interfaces/ITicket";
import { CustomError } from "../../../common/error";
import { Ticket, User } from "../../../models";

export default class AuthService {
    public static async GetAllTickets(): Promise<ITicket[]> {
        return await Ticket.find({});
    }
    
    public static async GetTicketById(ticketId: string): Promise<ITicket> {
        let ticket: any = await Ticket.findById(ticketId);
        if (!ticket) {
            throw new CustomError("This ticket does not exist.", 400);
        }
        return ticket;
    }

    public static async CreateTicket(ticketDTO: ITicketCreateDTO): Promise<ITicket> {
        let user: any = await User.findById(ticketDTO.authorId);
        if(!user) throw new CustomError("That user does not exist.", 400);
        let authorName = `${user.firstname} ${user.lastname}`;
        let newTicket: ITicket = await Ticket.create({
            ...ticketDTO,
            authorName
        });
        return newTicket;
    }

    public static async UpdateTicket(ticketDTO: ITicketUpdateDTO, ticketId: string): Promise<ITicket> {
        /**
         * @todo add owner status check
        */
        let ticket: any = await Ticket.findById(ticketId);
        if (!ticket) {
            throw new CustomError("This ticket does not exist.", 400);
        }
        ticket = await Ticket.findByIdAndUpdate(ticketId, ticketDTO);
        return ticket;
    }

    public static async CloseTicket(ticketId: string): Promise<ITicket> {
        /**
         * @todo add admin status check
        */
        let ticket: any = await Ticket.findById(ticketId);
        if(!ticket) throw new CustomError("That ticket does not exist.", 400);
        ticket  = await Ticket.findByIdAndUpdate(ticketId, { isClosed: true });
        return ticket;
    }

    public static async OpenTicket(ticketId: string): Promise<ITicket> {
        let ticket: any = await Ticket.findById(ticketId);
        if(!ticket) throw new CustomError("That ticket does not exist.", 400);
        ticket  = await Ticket.findByIdAndUpdate(ticketId, { isClosed: false });
        return ticket;
    }

    public static async DeleteTicket(ticketId: string): Promise<ITicket> {
        let ticket: any = await Ticket.findById(ticketId);
        if(!ticket) throw new CustomError("That ticket does not exist.", 400);
        ticket  = await Ticket.findByIdAndDelete(ticketId);
        return ticket;
    }
}
