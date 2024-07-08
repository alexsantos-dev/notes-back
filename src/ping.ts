import axios from "axios"

export async function
  ping() {

  const accessUrlAndPrintMessage = async () => {
    try {
      await axios.get('https://notes-back-h7u5.onrender.com/')
      console.log('Página acessada!')
    } catch (error) {
      console.error('Erro ao acessar a página:', error.message)
    }
  }

  await accessUrlAndPrintMessage()

  setInterval(accessUrlAndPrintMessage, 60000)

  await new Promise(() => { })
}