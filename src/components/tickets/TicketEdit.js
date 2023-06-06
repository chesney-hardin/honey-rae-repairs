import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const TicketEdit = () => {
    const { ticketId } = useParams()

    const [ticket, assignTicket] = useState({})

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets?id=${ticketId}`)
            .then(response => response.json())
            .then((data) => {
                const ticketToEdit = data[0]
                assignTicket(ticketToEdit)
            })

        },
        [ticketId]
    )


    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })
            //.then(response => response.json())
            .then(() => {
                navigate("/tickets")
            })
    }



    return <form className="ticketForm">
        <h2 className="ticketForm__title">Service Ticket</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={ticket.description}
                    onChange={
                        (evt) => {
                            const copy = { ...ticket }
                            copy.description = evt.target.value
                            assignTicket(copy)
                        }
                    }>{ticket.description}</textarea>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Emergency:</label>
                <input type="checkbox"
                    value={ticket.emergency}
                    onChange={
                        (evt) => {
                            const copy = { ...ticket }
                            copy.emergency = evt.target.checked
                            assignTicket(copy)
                        }
                    } />
            </div>
        </fieldset>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Save Edits
        </button>
    </form>
}