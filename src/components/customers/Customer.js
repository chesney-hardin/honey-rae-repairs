import { Link } from "react-router-dom"

export const Customer = ({id, fullName, phoneNumber, address}) => {
    {
        return <section className="customer">
            <div>           
                <Link className="customer__link" to={`/customers/${id}`}>{fullName}</Link>
           </div>
            <div>Phone Number: {phoneNumber}</div>
            <div>Address: {address}</div>

        </section>
    }
}