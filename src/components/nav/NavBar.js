import { EmployeeNav } from "./EmployeeNav"
import { CustomerNav } from "./CustomerNav"

export const NavBar = () => {

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

	if (honeyUserObject.staff) {
		// Return Employee views
		return <EmployeeNav />
	}

	else {
		// Return customer views
		return <CustomerNav />
	}
	
}
