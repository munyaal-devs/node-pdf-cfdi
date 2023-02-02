const units = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
const tenToSixteen = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis'];
const tens = ['treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];

export function convertToText(value: string) {
    if (!validateNumber(parseInt(value))) {
        return;
    }
    return getName(value);
}

const validateNumber = (value: number) => {
    // Validar que la cadena sea un número y que no esté vacía
    if (isNaN(value) || `${value}` === '') {
        return false;
    }
    // Validar que no tenga punto decimal
    if (`${value}`.indexOf('.') >= 0) {
        return false;
    }
    // Validar que el número no sea negativo
    if (`${value}`.indexOf('-') >= 0) {
        return false;
    }
    return true;
}

const getName = (value: string) => {
    if (value.length === 1) {
        return getUnits(value);
    }
    if (value.length === 2) {
        return getTens(value);
    }
    if (value.length === 3) {
        return getHundreds(value);
    }
    if (value.length < 7) {
        return getThousands(value);
    }
    if (value.length < 13) {
        return getPeriod(value, 6, 'millón');
    }
    if (value.length < 19) {
        return getPeriod(value, 12, 'billón');
    }
    return 'Número demasiado grande.';
}

const getUnits = (value: string) => {
    let numberInt = parseInt(value);
    return units[numberInt];
}

const getTens = (value: string) => {
    // Obtener las unidades
    let units = parseInt(value.charAt(1));

    if (parseInt(value) < 17) {
        return tenToSixteen[parseInt(value) - 10];
    }
    if (parseInt(value) < 20) {
        return 'dieci' + getUnits(`${units}`);
    }
    // Nombres especiales
    switch (parseInt(value)) {
        case 20:
            return 'veinte';
        case 22:
            return 'veintidós';
        case 23:
            return 'veintitrés';
        case 26:
            return 'veintiséis';
    }
    if (parseInt(value) < 30) {
        return 'veinti' + getUnits(`${units}`);
    }
    let name = tens[parseInt(value.charAt(0)) - 3];
    if (units > 0) {
        name += ' y ' + getUnits(`${units}`);
    }
    return name;
}

const getHundreds = (value: string) => {
    let name = '';
    // Obtener las centenas
    let hundreds = parseInt(value.charAt(0));
    // Obtener las decenas y unidades
    let tens = parseInt(value.substring(1));

    if (parseInt(value) == 100) {
        return 'cien';
    }
    // Nombres especiales
    switch (hundreds) {
        case 1:
            name = 'ciento';
            break;
        case 5:
            name = 'quinientos';
            break;
        case 7:
            name = 'setecientos';
            break;
        case 9:
            name = 'novecientos';
    }
    if (name === '') {
        name = getUnits(`${hundreds}`) + 'cientos';
    }
    if (tens > 0) {
        name += ' ' + getName(`${tens}`);
    }
    return name;
}

const getThousands = (value: string) =>{
    let name = 'mil';
    // Obtener cuantos dígitos están en los miles
    let thousandsLength = value.length - 3;
    // Obtener los miles
    let thousands = parseInt(value.substring(0, thousandsLength));
    // Obtener las centenas, decenas y unidades
    let hundreds = parseInt(value.substring(thousandsLength));

    if (thousands > 1) {
        // Se reemplaza la palabra uno por un en numeros como 21000, 31000, 41000, etc.
        name = getName(`${thousands}`).replace('uno', 'un') + ' mil';
    }
    if (hundreds > 0) {
        name += ' ' + getName(`${hundreds}`);
    }
    return name;
}

// Obtiene periodos, por ejemplo: millones, billones, etc.
const getPeriod = (value: string, digitsToTheRight: number, periodName: string) =>{
    let name = 'un ' + periodName;
    // Obtener cuantos dígitos están dentro del periodo
    let periodLength = value.length - digitsToTheRight;
    // Obtener los dítos del periodo
    let periodDigits = parseInt(value.substring(0, periodLength));
    // Obtener los digitos previos al periodo
    let previousDigits = parseInt(value.substring(periodLength));

    if (periodDigits > 1) {
        name = getName(`${periodDigits}`).replace('uno', 'un') + ' ' + periodName.replace('ó', 'o') + 'es';
    }
    if (previousDigits > 0) {
        name += ' ' + getName(`${previousDigits}`);
    }
    return name;
}