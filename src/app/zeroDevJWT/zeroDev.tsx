'use client'
import { ZeroDevWeb3Auth  } from '@zerodev/web3auth'
import * as sdk from '@zerodev/sdk'
import { ECDSAProvider } from '@zerodev/sdk'
import { useEffect, useMemo, useState } from 'react'
//const { ZeroDevWeb3Auth } = require('@zerodev/web3auth')

 const JWT_ZeroDev=({my_jwt}:{my_jwt:string})=> {
    const [jwt, setJWT] = useState<null|string>(null)
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(false)
    const userId = window.crypto.getRandomValues(new Uint32Array(4)).join('-')
    const defaultProjectId='73748e98-6b11-44bf-a759-e4bc97d46197';

    useEffect(() => {
        // THIS IS DEMO CODE TO CREATE A JWT, YOU WOULD HAVE YOUR OWN WAY TO GET YOUR JWT
        setJWT(null)
        fetch('/api/verify_jwt',{cache:'no-cache'}).then((data)=>{data.json().then((d)=>{console.log(d);setJWT(d.jwt);console.log(jwt)})})
    }, [])

    const setWallet = async (provider:any) => {
        const ecdsaProvider = await ECDSAProvider.init({
          projectId: defaultProjectId,
          owner: sdk.getRPCProviderOwner(provider),
        });
        setAddress(await ecdsaProvider.getAddress())
    }

    const zeroDevWeb3Auth = useMemo(() => {
        const instance = new ZeroDevWeb3Auth([defaultProjectId])
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
  }

  const handleClick = async () => {
    alert('clicked')
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
        {!connected && <button onClick={handleClick} disabled={loading || !jwt}>{ loading ? 'loading...' : 'Create Wallet with JWT'}</button>}
        {connected && 
          <button onClick={disconnect} disabled={loading}>Disconnect</button>
        }
        {jwt&&<div>{jwt}</div>}
      </div>
    </div>
  )
}

export default JWT_ZeroDev;