import { CfdiPdf } from "../src";
import { xmlIngreso } from "./xmls/ingreso";

export const bootstrap = () => {
  let xml = xmlIngreso;

  const cadena = `||1.1|2305e714-f113-4dca-95c9-75ea8b2bbdf7|2024-05-28T12:57:52|SPR190613I52|qlsiT/hsCbU/W9iYBzsQkyw4TWlkb1j1C2zZk+DojU7Yy5pNfrdvspJV90a3SXIDTa1keFuec3gk/XfSTWorZLH+xKNp1PFcGhZyiSfX/4zWmnBAGvZWVofU0H6ACZS2/TQGu/c3NGugmZI4Dbf9i3F9jxhLdRzv0qKWMyN5YPoONf4xha3vF6XQv6llZRwbJJ+mkAwCplwcY9twStEukArRyt2oZLMr9oOkfM7khzCYLGa7diS71iMkzRXmLUKAV8aY5XrQAWtqSmbX0vZB4S4HiDbBKmc9FJp+Fqysb9QnbG0L3QoaZ3ry6Ci/mTcrc12ySdZxv49q3LeWF2RvSg==|30001000000500003456||`;

  const pdf = new CfdiPdf(xml, cadena);

  pdf.createDocument(`${new Date().getTime()}`, `${process.cwd()}/src/pdfs/`);
  
  pdf.getBuffer().then((buffer) => {
    console.log(buffer);
  });
};

bootstrap();
