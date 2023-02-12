import EmployeeForm from "../../../components/Employee/EmployeeForm";


function AddEmployee() {
  // const employees = useSelector((state) => state.employees);
  // console.log(employees);
  return (
    <div>
      <EmployeeForm type="Add" />
    </div>
  );
}

export default AddEmployee;
