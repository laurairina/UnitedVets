import { Mascota } from './mascota';
import { Persona } from './persona';


export class Historial {

    constructor(public codigo:string, public ananmnesis:string, public tratamiento:string, public mascota: Mascota, public fecha:string)
    {

    }
}
