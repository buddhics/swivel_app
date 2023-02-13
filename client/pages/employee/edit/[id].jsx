import EmployeeForm from "../../../components/Employee/EmployeeForm";
import { useRouter } from "next/router";

function EditEmployee() {
  const router = useRouter()
  const { id } = router.query
  console.log(id);
  return (
    <div>
      <EmployeeForm type="Edit" eid={id} />
    </div>
  );
}

export default EditEmployee;
