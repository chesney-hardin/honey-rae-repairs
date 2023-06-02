import { useEffect, useState } from "react"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(
        ()=> {
            return fetch('http://localhost:8088/users?isStaff=true')
            .then(response => response.json)
            .then((employeeArray) => {
                setEmployees(employeeArray)
            })
        },
        []
    )

    return <article className="employees">
            <h2>List of Employess</h2>

        {
            employees.map(employee => {
                return <section className="employee" key={`employee--${employee.id}`}>
                    <div>Name: {employee.fullName}</div>
                    <div>Email: {employee.email}</div>

                </section>
            })
        }
    </article>
}