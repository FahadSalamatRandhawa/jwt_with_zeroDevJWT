'use client'
import { ZeroDevWeb3Auth  } from '@zerodev/web3auth'
import * as sdk from '@zerodev/sdk'
import { ECDSAProvider } from '@zerodev/sdk'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
//const { ZeroDevWeb3Auth } = require('@zerodev/web3auth')

const JWT_ZeroDev=()=> {
  const [jwt, setJWT] = useState<null|string>()
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const router=useRouter()
    const handleLogout=async()=>{
        const l=await fetch(`/api/logout`,{cache:'no-cache'})
        console.log(await l.json())
        if(l.ok){
            router.push('/')
        }
    }

  function getJWT(){
    fetch(`/api/verify_jwt`).then(response => {
            response.json().then((data)=>{setJWT(data.jwt)})
        })
    console.log(jwt)
  }

  async function Rotate_JWT(){
    setLoading(true)
    const res=await fetch('/api/verify_jwt',{method:'PUT'})
    if(!res.ok){
      alert('error in rotating jwt')
    }else{
      alert('jwt rotated')
    }
    setLoading(false)
  }

  useEffect(() => {
      // THIS IS DEMO CODE TO CREATE A JWT, YOU WOULD HAVE YOUR OWN WAY TO GET YOUR JWT
      getJWT()
  }, [])

  const setWallet = async (provider:any) => {
      const ecdsaProvider = await ECDSAProvider.init({
        projectId: "73748e98-6b11-44bf-a759-e4bc97d46197",
        owner: sdk.getRPCProviderOwner(provider),
      });
      setAddress(await ecdsaProvider.getAddress())
  }

  const zeroDevWeb3Auth = useMemo(() => {
      const instance = new ZeroDevWeb3Auth(["73748e98-6b11-44bf-a759-e4bc97d46197"])
      instance.init({onConnect: async () => {
          setLoading(true)
          setWallet(zeroDevWeb3Auth.provider)
          setLoading(false)
      }})
      return instance
  }, [])

const disconnect = async () => {
  await zeroDevWeb3Auth.logout()
  setAddress('')
  setJWT('');
}

const handleClick = async () => {
console.log(jwt)
  setLoading(true)
  zeroDevWeb3Auth.connect('jwt', {jwt}).then((provider:any) => {
    setWallet(provider)
  }).finally(() => {
    setLoading(false)
  })
}

const connected = !!address
return (
  <div>
    {connected && 
      <div>
        <label>Wallet: {address}</label>
      </div>
    }
    <div>
      {!connected && 
        <div className=' h- flex gap-10 bg-zinc-600'>
          {!connected?
              <button onClick={handleClick} disabled={loading || !jwt}>{ loading ? 'loading...' : 'Create Wallet with JWT'}</button>:
              <button onClick={disconnect} disabled={loading}>Disconnect</button>
          }
          <div>{address}</div>
          <Button onClick={handleLogout} variant='outline'>Log out</Button>
          <button onClick={Rotate_JWT} disabled={loading || !jwt}>Rotate JWT</button>
        </div>
      }
    </div>
    {jwt&&<div>{jwt}</div>}
  </div>
)
}

export default JWT_ZeroDev;