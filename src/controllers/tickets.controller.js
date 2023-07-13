import {
    getTicketsByID as getTicketsByIDTicketService,
} from '../services/tickets.services.js'


const getTicketsByID = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const getTicketsByID = await getTicketsByIDTicketService(id);
        if (!getTicketsByID) return res.send({
            message: "NO EXISTE ESE TICKET"
        });
        res.json({

            status: 'success',
            payload: getTicketsByID
        });
    } catch (error) {
        res.status(500).send({
            message: ("hay un error")
        });
    }
}

export {
    getTicketsByID
}