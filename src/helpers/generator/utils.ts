import { Attributes, Element } from "xml-js";

/**
 * Filtra los elementos hijos cuyo `name` coincide con `name`.
 */
export const findChildren = (elements: Element[] | undefined, name: string): Element[] =>
    (elements ?? []).filter((el) => el.name === name);

/**
 * Devuelve el primer elemento hijo cuyo `name` coincide con `name`.
 */
export const findChild = (elements: Element[] | undefined, name: string): Element | undefined =>
    elements?.find((el) => el.name === name);

/**
 * Extrae los atributos de un elemento de forma segura.
 * Retorna un objeto vacío si el elemento o sus atributos no existen.
 */
export const getAttributes = (element: Element | undefined): Attributes =>
    element?.attributes ?? {};

/**
 * Encuentra el primer hijo con `name` y retorna los atributos de sus
 * sub-elementos como un array de objetos de atributos.
 *
 * Equivale a `(findChild(elements, name)?.elements ?? []).map(getAttributes)`
 * pero encapsulado para reducir repetición.
 */
export const getChildAttributes = (elements: Element[] | undefined, name: string): Attributes[] => {
    const child = findChild(elements, name);
    return (child?.elements ?? []).map((e) => getAttributes(e));
};

/**
 * Combina `findChild` + map de atributos en un solo paso.
 * Útil para parsear nodos como Traslados/Retenciones donde el patrón es:
 * buscar un hijo por nombre y mapear los atributos de sus sub-elementos.
 */
export const findChildAttributes = (
    elements: Element[] | undefined,
    name: string
): Attributes[] => {
    return (findChild(elements, name)?.elements ?? []).map((e) => getAttributes(e));
};