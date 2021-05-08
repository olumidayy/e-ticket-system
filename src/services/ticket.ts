import { Inject, Service } from "typedi";
import { ITicket, ITicketCreateDTO, ITicketUpdateDTO } from "../interfaces/ITicket";
import { CustomError } from "../common/error";
import { IUser } from "../interfaces/IUser";

@Service()
export default class AuthService {
    constructor(
        @Inject("userModel") private userModel: Models.UserModel,
        @Inject("userModel") private ticketModel: Models.UserModel
    ) { }
    
    public async GetAllTickets(): Promise<ITicket[]> {
        return await this.ticketModel.find({});
    }
    
    public async GetTicket(ticketId: string): Promise<ITicket> {
        let ticket: ITicket = await this.ticketModel.findById(ticketId);
        if (!ticket) {
            throw new CustomError("This ticket does not exist.", 400);
        }
        return ticket;
    }

    public async CreateTicket(ticketDTO: ITicketCreateDTO): Promise<ITicket> {
        let user: IUser = await this.userModel.findById(ticketDTO.authorId);
        if(!user) throw new CustomError("That user does not exist.", 400);
        let authorName = `${user.firstname} ${user.lastname}`;
        let newTicket: ITicket = await this.ticketModel.create({
            ...ticketDTO,
            authorName
        });
        return newTicket;
    }

    public async UpdateTicket(ticketDTO: ITicketUpdateDTO, ticketId: string): Promise<ITicket> {
        /**
         * @todo add owner status check
        */
        let ticket: ITicket = await this.ticketModel.findById(ticketId);
        if (!ticket) {
            throw new CustomError("This ticket does not exist.", 400);
        }
        ticket = await this.ticketModel.findByIdAndUpdate(ticketId, ticketDTO);
        return ticket;
    }

    public async CloseTicket(ticketId: string): Promise<ITicket> {
        /**
         * @todo add admin status check
        */
        let ticket: ITicket = await this.ticketModel.findById(ticketId);
        if(!ticket) throw new CustomError("That ticket does not exist.", 400);
        ticket  = await this.ticketModel.findByIdAndUpdate(ticketId, { isClosed: true });
        return ticket;
    }

    public async OpenTicket(ticketId: string): Promise<ITicket> {
        let ticket: ITicket = await this.ticketModel.findById(ticketId);
        if(!ticket) throw new CustomError("That ticket does not exist.", 400);
        ticket  = await this.ticketModel.findByIdAndUpdate(ticketId, { isClosed: false });
        return ticket;
    }

    public async DeleteTicket(ticketId: string): Promise<ITicket> {
        let ticket: ITicket = await this.ticketModel.findById(ticketId);
        if(!ticket) throw new CustomError("That ticket does not exist.", 400);
        ticket  = await this.ticketModel.findByIdAndDelete(ticketId);
        return ticket;
    }
}
