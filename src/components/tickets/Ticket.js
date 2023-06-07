import { Link } from "react-router-dom"

export const Ticket = ({ ticketObject, currentUser, employees, getAllTheTickets }) => {

    // The assigned employee for the current ticket
    let assignedEmployee = null

    if (ticketObject.employeeTickets.length > 0) {
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }

    // The employee object for the current user
    const userEmployee = employees.find(employee => employee.userId === currentUser.id)

    // Conditional to decide if close button should be displayed
    const canClose = () => {
        if (currentUser.staff === true && assignedEmployee?.id === userEmployee?.id && ticketObject.dateCompleted === "") {
            return <button
                onClick={closeTicket}
                className="ticket__finish">Finish</button>
        }
        else {
            return ""
        }

    }

    const deleteTicket = () => {
        return !currentUser.staff ? (
            <button
                onClick={() => {
                    fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
                        method: "DELETE",
                    })
                        .then(getAllTheTickets)

                }} className="button__delete"
            >Delete</button>
        ) : ""

    }

    // Function that is triggered when the close button is clicked
    const closeTicket = () => {
        const copy = {
            userId: ticketObject.id,
            description: ticketObject.description,
            emergency: ticketObject.emergency,
            dateCompleted: new Date()
        }
        return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
            .then(response => response.json())
            .then(getAllTheTickets)
    }

    const claimButton = () => {
        return currentUser.staff ? (
            <button
                onClick={() => {
                    fetch(`http://localhost:8088/employeeTickets`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            employeeId: userEmployee.id,
                            serviceTicketId: ticketObject.id
                        })
                    })
                        .then(response => response.json())
                        .then(() => {
                            getAllTheTickets()
                        })
                }}
            >Claim</button>
        ) : ""
    }


    return <section className="ticket" key={`ticket--${ticketObject.id}`}>
        <header>
            {
                currentUser.staff
                    ? `Ticket ${ticketObject.id}`
                    : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
            }
        </header>
        <section>{ticketObject.description}</section>
        <section>Emergency: {ticketObject.emergency ? "🧨" : "No"}</section>
        <footer>
            {
                ticketObject.employeeTickets.length
                    ? `Currently being worked on by ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                    : claimButton()
            }
            {
                canClose()
            }
            {
                deleteTicket()
            }
        </footer>
    </section>
}