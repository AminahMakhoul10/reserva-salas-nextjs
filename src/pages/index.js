import Cabecalho from '@/components/Cabecalho'
import Cadastro from '@/components/Cadastro'
import Label from '@/components/Label'

import Head from 'next/head'
import { ToastContainer } from 'react-toastify'


export default function Home() {
  return (
    <>
      <Head>
        <title>Reserva de Salas</title>
      </Head>

      <Cabecalho/>
      <Cadastro/>
      <Label/>
      <ToastContainer/>
      
     
    </>
  )
}
