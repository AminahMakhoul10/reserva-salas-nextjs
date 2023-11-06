import styles from './styles.module.css';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '../Input';

export default function Cadastro() {
  const [reserva, setReserva] = useState({
    descricao: "",
    solicitante: "",
    sala: "",
    inicio: "",
    fim: ""
  })

  const [termo, setTermo] = useState(false)

  const limparReserva = () => {
    setReserva({
      descricao: "",
      solicitante: "",
      sala: "",
      inicio: "",
      fim: ""
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setReserva({
      ...reserva,
      [name]: value
    });
  }

  const handleTermoChange = (e) => {
    setTermo(e.target.checked);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termo) {
      toast.error('Concorde com os termos antes de prosseguir.')
      return;
    }

    try {
      await axios.post('http://localhost:3001/reservas', reserva)
      limparReserva();
      toast.success('Reserva realizada com sucesso!')
    } catch (error) {
      console.error(error);
      toast.error('Erro ao realizar reserva, por favor tente novamente mais tarde!')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Reservar sala</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.subcontainer}>
          <div>
            <label htmlFor='descricao'>Descrição:</label>
            <br />
            <textarea
              name='descricao'
              id='descricao'
              className={styles.textarea}
              value={reserva.descricao}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor='solicitante'>Solicitante:</label>
            <br />
            <Input
              name='solicitante'
              id='solicitante'
              type='text'
              value={reserva.solicitante}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='sala'>Sala:</label>
            <br />
            <select
              className={styles.select}
              name='sala' id='sala'
              value={reserva.sala}
              onChange={handleInputChange}
            >
                <option value='Bloco A - Lab. de Informática'>Bloco A - Lab. de Informática</option>
                <option value='Bloco A - Auditorio'>Bloco A - Auditorio</option>
                <option value='Bloco A - Sala 5- ADS '>Bloco A - Sala 5- ADS</option>
                <option value='Bloco B - Lab. de Quimica'>Bloco B - Lab. de Quimica</option>
                <option value='Bloco C - Lab. de Edificações'>Bloco C - Lab. de Edificações</option>
                <option value='Bloco D - Lab. de Eletromecanica'>Bloco D - Lab. de Eletromecanica</option>
                <option value='Bloco D - Sala 7- Arquitetura'>Bloco D - Lab. de Arquitetura</option>
            </select>
          </div>
          <div>
            <label htmlFor='inicio'>Início:</label>
            <br />
            <Input
              id='inicio'
              type='datetime-local'
              name='inicio'
              value={reserva.inicio}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='fim'>Fim:</label>
            <br />
            <Input
              id='fim'
              type='datetime-local'
              name='fim'
              value={reserva.fim}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>
              <input
              type="checkbox"
              name="termos"
              id="termos"
              className={styles.checkbox}
              checked={termo}
              onChange={handleTermoChange}
              />
              Concordo com os termos
            </label>
          </div>
          <div className={styles.containerbutton}>
            <button className={styles.button} type='submit'>Reservar sala</button>
          </div>
        </div>
      </form>
    </div>
  )
}
