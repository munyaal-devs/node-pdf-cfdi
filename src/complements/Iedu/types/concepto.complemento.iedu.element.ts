export type ConceptoComplementoIeduElement = {
    /*
    * Atributo requerido con valor prefijado a 1.0 que indica la versión del estándar bajo el que se encuentra
    * expresado el complemento concepto al comprobante
    * */
    version?: string;
    /*
    * Atributo requerido para indicar el nombre del Alumno
    * */
    nombreAlumno: string;
    /*
    * Atributo requerido para indicar la CURP del alumno de la institución educativa
    * */
    CURP: string;
    /*
    * Atributo requerido para indicar el nivel educativo que cursa el alumno
    * */
    nivelEducativo: string;
    /*
    * Atributo requerido para especificar la clave del centro de trabajo o el reconocimiento de validez oficial de
    * estudios en los términos de la Ley General de Educación que tenga la institución educativa privada donde se
    * realiza el pago
    * */
    autRVOE: string;
    /*
    * Atributo opcional para indicar el RFC de quien realiza el pago cuando sea diferente a quien recibe el servicio
    * */
    rfcPago?: string;
}
