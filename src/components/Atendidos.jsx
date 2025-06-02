import React, { useEffect, useState } from 'react'
import { bus, apiGetAtenciones } from "common-utils";
import { Button } from 'common-components-react'

import "common-resources/css/table.css";

const Atendidos = () => {
  const [atenciones, setAtenciones] = useState([]);
  const editAtencion = (id, callback) => {
    setAtenciones(prev =>
      prev.map(a => (a.atencionId === id ? callback(a) : a))
    );
  };

  const getData = async () => {
    const data = await apiGetAtenciones({
      estado: 'AX'
    })
    setAtenciones(data.items);
    if (window.transferidos) {
      data.items = data.items.map(a => {
        const transferido = window.transferidos.find(t => t.atencionId === a.atencionId);
        if (transferido) {
          return {
            ...a,
            isTransferido: true,
            destinoAtencion: transferido.destinoAtencion
          };
        }
        return a;
      });
      setAtenciones(data.items);
    }
  }

  const transferir = (data) => {
    editAtencion(data.atencionId, (a) => ({
      ...a,
      isTransferido: true,
    }));
    bus.next({
      topic: 'transferir',
      data: data
    });
    window.transferidos.push(data);
  }

  useEffect(() => {
    getData();
    window.transferidos = window.transferidos || [];
  }, []);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Historia</th>
            <th>Prioridad</th>
            <th>Destino</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {atenciones.map((a) => (
            <tr key={a.atencionId}>
              <td>{a.nombreCompleto}</td>
              <td>{a.historiaClinica}</td>
              <td style={{ backgroundColor: a.prioridadBgColor, color: a.prioridadFgColor }}>
                {a.prioridad}
              </td>
              <td>{a.destinoAtencion}</td>
              <td>{new Date(a.createdAt).toLocaleString()}</td>
              <td>
                {(!a?.isTransferido ?? true) && (
                  <Button onClick={() => transferir(a)}
                  >
                    Transferir
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Atendidos