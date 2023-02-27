import { useState } from 'react'
import { TextField, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox } from '@mui/material'

import { useCoins } from '../../contexts/coins';
import api from '../api/config'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import FormAddress from '../../components/Forms/Address';
import FormPayment from '../../components/Forms/Payment';
import FormPersonalData from '../../components/Forms/PersonalData';
import CopyToClipboardButton from '../../components/CopyToClipboardButton';
import Snackbar from '../../components/Snackbar/Snackbar';
import TabsCustomized from '../../components/TabsCustomized/TabsCustomized'

const items = [
  {
    label: 'R$ 30,00',
    value: 30
  },
  {
    label: 'R$ 50,00',
    value: 50
  },
  {
    label: 'R$ 100,00',
    value: 100
  },
  {
    label: 'Outro Valor',
    value: 0
  }
]

export default function Pagamento() {

  const { coins, setCoins } = useCoins()
  const [amount, setAmount] = useState(30);

  const [openSnack, setOpenSnack] = useState(false)
  const [messageSnack, setMessageSnack] = useState('')
  const [pix, setPix] = useState({
    qrcode: '',
    text: ''
  })

  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [cpf, setCpf] = useState('')
  const [celular, setCelular] = useState('')
  const [cep, setCep] = useState('')
  const [logradouro, setLogradouro] = useState('')
  const [numero, setNumero] = useState(0)
  const [complemento, setComplemento] = useState('')
  const [bairro, setBairro] = useState('')
  const [localidade, setLocalidade] = useState('')
  const [uf, setUf] = useState('')
  const [payment, setPayment] = useState('CREDIT_CARD')
  const [creditCard, setCreditCard] = useState({
    holderName: '',
    number: '',
    expiryDate: '',
    expiryMonth: '',
    expiryYear: '',
    ccv: '',
    name: '',
    cpfCnpj: '',
    mobilePhone: ''
  })

  const [isNominal, setIsNominal] = useState(true)
  const [isOpenField, setIsOpenField] = useState(false);
  const [isDonationCheck, setIsDonationCheck] = useState(true);
  const [recorrencia, setRecorrencia] = useState('mensal')

  const handleAmount = (value) => {
    setAmount(value)

    if (value == 0) {
      setIsOpenField(true)
    } else {
      setIsOpenField(false)
    }
  }

  const handleType = (e) => {
    setIsNominal(e.target.value === 'nominal' ? true : false)

    if (amount && !isNominal) {
      api
        .post("/pix/static", {
          value: parseFloat(amount),
          date: new Date().toISOString()
        })
        .then((response) => {
          setPix({
            qrcode: response.data.encodedImage,
            text: response.data.payload
          })
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }
  }

  const handleCoins = (value) => {
    localStorage.setItem('coins', value);
    setCoins(parseFloat(value));
  }

  const handleRecharge = (e, amount) => {
    e.preventDefault();

    const donationValue = parseFloat(amount)
    const sum = parseFloat(coins) + parseFloat(amount);

    if(recorrencia === 'pontual'){
      if(isDonationCheck){
        handleCoins(sum / 2)
      }else{
        handleCoins(sum)
      }
    }else{
      if(isDonationCheck){
        handleCoins(sum * 0.2)
      }else{
        handleCoins(sum)
      }
    }

    const userData = {
      name: {
        firstName: nome,
        lastName: sobrenome
      },
      email: 'thays.lacerdac@gmail.com',
      document: cpf.replace(/\D/g, ''),
      documentType: 'CPF',
      mobilePhone: celular.replace(/\D+/g, ''),
      address: {
        country: 'string',
        state: uf,
        city: localidade,
        zipCode: cep,
        address: logradouro,
        addressNumber: numero,
        complement: complemento,
        province: bairro
      }
    }

    const creditCardData = {
      holderName: creditCard.holderName,
      number: creditCard.number,
      expiryMonth: creditCard.expiryMonth,
      expiryYear: creditCard.expiryYear,
      ccv: creditCard.ccv
    }

    const creditCardHolderInfo = {
      name: creditCard.name,
      cpfCnpj: creditCard.cpfCnpj,
      mobilePhone: creditCard.mobilePhone
    }

    const paymentData = {
      billingType: payment,
      value: donationValue,
      coins: coins,
      dueDate: new Date().toISOString(),
      description: '',
      creditCard: creditCardData,
      creditCardHolderInfo: creditCardHolderInfo
    }

    console.log(paymentData)

    api
      .post("/tempOp", {
        userData: userData,
        paymentData: paymentData
      })
      .then((response) => {
        setMessageSnack('Recarga realizada com sucesso!')

        setTimeout(() => {
          window.localtion.href = '/'
        }, 1000);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }

  const renderFormsPersonal = () => {
    if (isNominal) {
      return (
        <>
          <FormPersonalData
            setNome={setNome}
            setSobrenome={setSobrenome}
            setCpf={setCpf}
            setCelular={setCelular}
          />

          <FormAddress
            logradouro={logradouro}
            setLogradouro={setLogradouro}
            complemento={complemento}
            setComplemento={setComplemento}
            numero={numero}
            setNumero={setNumero}
            bairro={bairro}
            setBairro={setBairro}
            localidade={localidade}
            setLocalidade={setLocalidade}
            uf={uf}
            setUf={setUf}
            setCep={setCep}
          />

          <div className='mt-10 pt-10 border-t border-gray-200'>
            <FormControlLabel
              control={<Checkbox
                defaultChecked
                onChange={() => setIsDonationCheck(!isDonationCheck)}
                sx={{
                  marginRight: '5px',
                  color: '#910000fa',
                  '&.Mui-checked': {
                    color: '#910000fa',
                  },
                }}
              />}
              label="Desejo converter o valor acima em moedas virtuais para realizar a distribuição no site entre campanhas e/ou missões."
            />
          </div>
        </>
      )
    }
  }

  const renderButtonsValue = () => (
    <>
      <h2 className="text-lg font-medium text-gray-900">Valor</h2>
      <TabsCustomized items={items} handleAmount={handleAmount} />

      {isOpenField &&
        <div className="sm:col-span-2 flex gap-x-4 mt-8 mb-8">
          <TextField
            type='value'
            size='small'
            label='Valor'
            color='error'
            className='mb-2'
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      }
    </>
  )

  return (
    <div className="bg-gray-50">
      <Header metaTitle={'STH - Pagamento'} />

      <main className="max-w-7xl mx-auto pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">

          <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>

              {renderButtonsValue()}

              <div className='mt-12'>
                <FormControl fullWidth>
                  <InputLabel>Tipo da doação</InputLabel>
                  <Select
                    label="Tipo da doação"
                    color='error'
                    defaultValue='nominal'
                    onChange={handleType}
                  >
                    <MenuItem value='nominal'>Nominal</MenuItem>
                    <MenuItem value='anonimo'>Anônimo</MenuItem>
                  </Select>
                </FormControl>
              </div>

              {isNominal &&
                <div className='mt-12'>
                  <FormControl fullWidth>
                    <InputLabel>Recorrência da doação</InputLabel>
                    <Select
                      label="Recorrência da doação"
                      color='error'
                      defaultValue={recorrencia}
                      onChange={(e) => setRecorrencia(e.target.value)}
                    >
                      <MenuItem value='mensal'>Mensal</MenuItem>
                      {/* <MenuItem value='trimestral'>Trimestral</MenuItem> */}
                      <MenuItem value='pontual'>Pontual</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              }

              {renderFormsPersonal()}

              {!isNominal && pix &&
                <div className='mt-12 pt-6 border-t border-gray-200'>
                  <h2 className="text-lg font-medium text-gray-900">Pagamento</h2>
                  <fieldset className="mt-4">
                    <legend className="sr-only">PIX</legend>
                    <img src={`data:image/jpeg;base64,${pix.qrcode}`} />
                    <CopyToClipboardButton setOpenSnack={setOpenSnack} setMessageSnack={setMessageSnack} content={pix.text} />
                  </fieldset>
                </div>
              }

            </div>

            <div className="mt-10 lg:mt-0">
              {isNominal && <FormPayment payment={payment} setPayment={setPayment} setCreditCard={setCreditCard} />}

              <div className="mt-12 bg-white border border-gray-200 rounded-lg shadow-sm">

                <dl className="py-6 px-4 space-y-6 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-base font-medium">Total</dt>
                    <dd className="text-base font-medium text-gray-900">R$ {amount},00</dd>
                  </div>
                </dl>

                <div className="py-6 px-4 sm:px-6">
                  <button
                    onClick={(e) => handleRecharge(e, amount)}
                    type="submit"
                    className="w-full bg-red-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red-500"
                  >
                    Confirmar recarga
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {openSnack && messageSnack && <Snackbar message={messageSnack} open={openSnack} setOpenSnack={setOpenSnack} />}

      </main>

      <Footer />
    </div>
  )
}
