
import { Element } from "xml-js";

export const getDataFull = (elements: Element[], nameKeys: string[], count: number) => {
    /**Inicializamos el objeto */
    let obj = {}
    /** 
     * Si el contador es 1 los atributos quedaran en el primer plano del objeto 
     * se usa en la primera llamada para obtener un objecto Componente y no un objecto Componente.Componente
     * */
    if(count == 1){
        obj = { ...elements[0].attributes };

        /** 
         * Se reasiganar los valores de namesKeys y elements para que se recorran los elementos del complemento
         */
        nameKeys = getNamesKeyslist(nameKeys[0])
        elements = elements[0].elements || [];
        count++
    }

    /**
     * Comprobación del namesKeys porque al llegar al ultimo recorrido su valor es undefined
     */
    if(nameKeys){

        /**
         * Comprobación si ya no existen valores en namesKeys por acceder
         * y si solo hay un elemento con los atributos 
         */
        if(nameKeys.length == 0 && elements.length == 1){
            obj = { ...obj, ...elements[0].attributes };
        }

        /**
         * Se recorren los namesKeys para acceder a cada uno de ellos y asignarlos
         */
        for (let index = 0; index < nameKeys.length; index++) {
            elements.filter((element_filter) => element_filter.name === nameKeys[index]).forEach(elementValue => {
                const elementValueList = elementValue?.elements || [];
                const nameKey = nameKeys[index].split(':');
                if(elementValueList.length > 0){
                    const namesElemento = getNamesKeyslist(nameKeys[index]);
                    if(isNameKeyArray(nameKeys[index])){
                        const arrayElements = [];
                        for (let indexArray = 0; indexArray < elementValueList.length; indexArray++) {
                            const dataRec = getDataFull(elementValueList, namesElemento ? namesElemento: [], count++)
                            arrayElements.push({
                                //...elementValueList[indexArray].attributes, 
                                ...dataRec
                            })
                        }
                        //validar los doctorelacionados e impuestos
                        obj = Object.assign(obj, {
                            //[`${nameKey[1]}`]: {..elementValue.attributes, 
                            [`${nameKeys[index].split(':')[1]}`]: arrayElements
                            }
                        //}
                    );
                    }else{
                        const objRec = getDataFull(elementValueList, namesElemento ? namesElemento: [], count++)
                        obj = Object.assign(obj, {
                            [`${nameKey[1]}`]: {...elementValue.attributes, ...objRec}
                        });
                    }
                }else{
            
                    obj = Object.assign(obj, {
                        [`${nameKey[1]}`]: {...elementValue.attributes}
                    });
                }
            });
        }
    }

    return obj;
}

export const getDataFull2 = (elements: Element[], nameKeys: string[], count: number): any => {
    let obj: any = {};

    if (count === 1) {
        console.log('value 1', nameKeys.join('-'))
        obj = { ...elements[0].attributes };
        nameKeys = getNamesKeyslist(nameKeys[0]);
        elements = elements[0].elements || [];
        count++;
    }

    if (nameKeys) {
        console.log('nameskey', nameKeys)
        if (nameKeys.length === 0 && elements.length === 1) {
            obj = { ...obj, ...elements[0].attributes };
        } else {
            nameKeys.forEach((key) => {
                console.log('elements', elements)
                elements.filter(el => el.name === key).forEach(elementValue => {
                    const elementValueList = elementValue?.elements || [];
                    const [namespace, localName] = key.split(':');
                    
                    if (elementValueList.length > 0) {
                        const namesElemento = getNamesKeyslist(key);
                        if (isNameKeyArray(key)) {
                            const arrayElements = elementValueList.map(element => {
                                const dataRec = getDataFull([element], namesElemento || [], 1);
                                return {...element.attributes ,  ...dataRec};
                            });
                            obj = { 
                                ...obj, 
                                ...elementValue.attributes,
                                [`${localName}`]: arrayElements  
                            };
                        } else {
                            const objRec = getDataFull(elementValueList, namesElemento || [], 1);
                            obj = { 
                                ...obj, 
                                [localName]: { 
                                    ...elementValue.attributes, 
                                    ...objRec 
                                } 
                            };
                        }
                    } else {
                        obj = { 
                            ...obj, 
                            [localName]: { 
                                ...elementValue.attributes 
                            } 
                        };
                    }
                });
            });
        }
    }

    return obj;
};

/**
 * Objecto de array como key el padre y key hijos como valores
 */
const namesKeyslist: {
    [key: string]: string[]
} = {
    ['cfdi:Comprobante']: [
        //'cfdi:Emisor',
        //'cfdi:Receptor',
        'cfdi:Conceptos',
        //'cfdi:Impuestos',
        'cfdi:Complemento',
        'cfdi:CfdiRelacionados',
    ],
    ['cfdi:Conceptos']: [
        'cfdi:Concepto'
    ],
    ['cfdi:Concepto']: [
        'cfdi:ComplementoConcepto',
        'cfdi:Impuestos'
    ],
    ['cfdi:ComplementoConcepto']: [
       'iedu:instEducativas' 
    ],
    ['cfdi:Impuestos']: [
        'cfdi:Retenciones',
        'cfdi:Traslados'
    ],
    ['cfdi:CfdiRelacionados']: [
        'cfdi:CfdiRelacionado'
    ],
    ['cfdi:Complemento']: [
        'tfd:TimbreFiscalDigital',
        'pago20:Pagos'
    ],
    ['pago20:Pagos']: [
        'pago20:Totales',
        'pago20:Pago'
    ],
    ['pago20:Pago']: [
        'pago20:DoctoRelacionado',
        'pago20:ImpuestosP',
    ],
    ['pago20:DoctoRelacionado']:[
        'pago20:ImpuestosDR'
    ],
    ['pago20:ImpuestosDR']:[
        'pago20:RetencionesDR',
        'pago20:TrasladosDR'
    ],
    ['pago20:ImpuestosP']: [
        'pago20:RetencionesP',
        'pago20:TrasladosP'
    ]
}

/** Obtener el listado de los keys que tienen como padre el key proporcionado */
const getNamesKeyslist = (key: string): string[] => {
    return namesKeyslist[key] || [];
}; 

/**
 * Listado de keys que son arrays
 */
const namesKeysArraylist = [
    'cfdi:CfdiRelacionados',
    'cfdi:CfdiRelacionado',
    'cfdi:Conceptos',
    'cfdi:InformacionAduanera',
    'cfdi:CuentaPredial',
    'cfdi:Parte',
    'cfdi:Traslados',
    'cfdi:Retenciones',
    'pago20:RetencionesDR',
    'pago20:TrasladosDR',
    'pago20:RetencionesP',
    'pago20:TrasladosP',
    'pago20:DoctoRelacionado',
    'pago20:Pago'
]

/**
 * Método para validar si una key es de tipo array
 * @param {string} search  Valor a buscar en el listado
 * @returns {boolean} si el valor existe en el listado
 */
const isNameKeyArray = (search: string): boolean => {
    return namesKeysArraylist.includes(search);
};