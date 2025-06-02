import React, { useEffect, useState } from 'react'
import { bus, apiGetAtenciones } from "common-utils";

const Atendidos = () => {
  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    setSubmit(!submit);
    bus.next({
      topic: 'atendidos',
      data: {
        submit: submit,
        data: {
          message: 'Data enviada desde Atendidos'
        }
      }
    });
  }

  const [atenciones, setAtenciones] = useState([]);

  const getData = async () => {
    const data = await apiGetAtenciones({})
    setAtenciones(data.items);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <button onClick={handleSubmit} >enviar data</button>
    </div>
  )
}

export default Atendidos