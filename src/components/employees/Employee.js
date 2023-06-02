import { Link } from "react-router-dom"

export const Employee = ({id, fullName, email}) => {
    {
        return <section className="employee">
            <div>           
                <Link className="employee__link" to={`/employees/${id}`}>{fullName}</Link>
           </div>
            <div>Email: {email}</div>

        </section>
    }
}