import { ObjectId } from "mongodb";

export default class User {
    constructor(public fullname: string, public username: string, public email: string, public birthday: string, public age: string, public id?: ObjectId) {}
}