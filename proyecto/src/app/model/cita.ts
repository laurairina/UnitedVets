import { User } from './user';

export class Cita {

    public id: number
    public cliente: string
    public mascota: string
    public hora: string
    constructor(id:number, cliente: string, mascota: string, hora: string)
    {
        this.id = id
        this.cliente = cliente;
        this.mascota = mascota;
        this.hora = hora;
    }
}
