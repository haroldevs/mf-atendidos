import React, {useState} from 'react'
import { bus } from "common-utils";

const Atendidos = () => {
  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit =  () => {
    setSubmit(true);
    bus.next({
      topic: 'atendidos',
      data: {
        submit: submit,
        data: {
          message: 'Data enviada desde Atendidos'
        }
      }
    });
    bus
  }
  return (
    <div>
      <button onClick={handleSubmit} >enviar data</button>
    </div>
  )
}

export default Atendidos