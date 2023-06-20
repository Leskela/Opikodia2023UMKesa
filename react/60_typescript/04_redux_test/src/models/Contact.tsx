export default class Contact {
	
	id:number = 0;
	firstname:string = "";
	lastname:string = "";
	email:string = "";
	phone:string = "";
	
	constructor(firstname:string,lastname:string,email:string,phone:string,id:number) {
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.phone = phone;
		this.id = id;
	}
}