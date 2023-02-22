import { Component,OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit{
  employeesList:Employee[]=[]
  newEmployee:Employee=new Employee()
  editEmployee:Employee=new Employee()

  constructor(private employeeService:EmployeeService){}
  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.employeeService.getAllEmployees().subscribe(
      (response)=>{
        this.employeesList=response;
        // console.log(this.employeesList)
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  saveClick(){
    //alert(this.newEmployee.name)
    this.employeeService.saveEmployee(this.newEmployee).subscribe(
      (response)=>{
        this.getAll()
        this.newEmployee.name=""
        this.newEmployee.address=""
        this.newEmployee.salary=0 
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  editClick(emp:any){
    alert(emp.name)
    this.editEmployee.id=emp.id
    this.editEmployee.name=emp.name
    this.editEmployee.address=emp.address
    this.editEmployee.salary=emp.salary
  }
  updateClick(){
    //alert(this.editEmployee.name)
    this.employeeService.updateEmployee(this.editEmployee).subscribe(
      (response)=>{
        this.getAll()
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  deleteClick(id:number){
    //alert(id)
    let ans=window.confirm('Want to delete data???')
    if(!ans) return

    this.employeeService.deleteEmployee(id).subscribe(
      (response)=>{
        this.getAll()
      },
      (error)=>{
        console.log(error)
      }
    )

  }
}
