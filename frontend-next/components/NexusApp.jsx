'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { ethers } from 'ethers'
import LoginScreen from './LoginScreen'
import Dashboard from './Dashboard'
import RainCanvas from './RainCanvas'
import { CONFIG } from '@/lib/config'
import { DATA_LOGISTICA, DATA_CIBERSEGURIDAD, DATA_FARMACEUTICA } from '@/lib/data'

export default function NexusApp() {
  var [provider, setProvider] = useState(null)
  var [signer, setSigner] = useState(null)
  var [userAddress, setUserAddress] = useState(null)
  var [userBalance, setUserBalance] = useState('0.0000')
  var [currentDemo, setCurrentDemo] = useState('logistica')
  var [isCoordinating, setIsCoordinating] = useState(false)
  var [coordinationComplete, setCoordinationComplete] = useState(false)
  var [simulatedDonationTotal, setSimulatedDonationTotal] = useState(0)
  var [taskStatus, setTaskStatus] = useState({ completed: 0, total: 0 })
  var [statusMsg, setStatusMsg] = useState('Conecta tu wallet para comenzar')
  var [coordinationHash, setCoordinationHash] = useState('')
  var [verifyDisabled, setVerifyDisabled] = useState(true)
  var [coordDisabled, setCoordDisabled] = useState(false)
  var [coordBtnText, setCoordBtnText] = useState('INICIAR COORDINACIÓN')

  var intervalRef = useRef(null)
  var currentDemoRef = useRef(currentDemo)

  useEffect(function () {
    currentDemoRef.current = currentDemo
  }, [currentDemo])

  var getDemoData = useCallback(function (demo) {
    if (demo === 'logistica') return DATA_LOGISTICA
    if (demo === 'ciberseguridad') return DATA_CIBERSEGURIDAD
    if (demo === 'farmaceutica') return DATA_FARMACEUTICA
    return null
  }, [])

  var handleConnect = useCallback(async function () {
    if (typeof window === 'undefined' || typeof window.ethereum === 'undefined') {
      return 'MetaMask no detectado. <a href="https://metamask.io" target="_blank" style="color:#00ff88;">Instálalo aquí</a>'
    }

    try {
      var accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      var addr = accounts[0]

      var prov = new ethers.providers.Web3Provider(window.ethereum)
      var network = await prov.getNetwork()

      if (network.chainId !== 10143) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x279F' }]
          })
        } catch (switchErr) {
          if (switchErr.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: '0x279F',
                  chainName: 'Monad Testnet',
                  rpcUrls: [CONFIG.rpcUrl],
                  nativeCurrency: { name: 'MON', symbol: 'MON', decimals: 18 },
                  blockExplorerUrls: ['https://testnet.monadexplorer.com']
                }]
              })
            } catch (addErr) {
              return 'Debes conectarte a Monad Testnet'
            }
          } else {
            return 'Debes conectarte a Monad Testnet'
          }
        }
      }

      var walletProvider = new ethers.providers.Web3Provider(window.ethereum)
      var walletSigner = walletProvider.getSigner()
      var balance = await walletProvider.getBalance(addr)
      var balStr = parseFloat(ethers.utils.formatEther(balance)).toFixed(4)

      setProvider(walletProvider)
      setSigner(walletSigner)
      setUserAddress(addr)
      setUserBalance(balStr)
      setStatusMsg('Conectado: ' + addr.substring(0, 6) + '...' + addr.substring(38))
      setSimulatedDonationTotal(0)

      var data = getDemoData('logistica')
      var items = data.familias || []
      setTaskStatus({ completed: 0, total: items.length })

      window.ethereum.on('accountsChanged', function () { window.location.reload() })
      window.ethereum.on('chainChanged', function () { window.location.reload() })

      return null
    } catch (err) {
      if (err.code === 4001) {
        return 'Conexión rechazada por el usuario'
      }
      return 'Error: ' + (err.message || '').substring(0, 60)
    }
  }, [getDemoData])

  var handleDisconnect = useCallback(function () {
    setProvider(null)
    setSigner(null)
    setUserAddress(null)
    setUserBalance('0.0000')
    setCurrentDemo('logistica')
    setIsCoordinating(false)
    setCoordinationComplete(false)
    setSimulatedDonationTotal(0)
    setTaskStatus({ completed: 0, total: 0 })
    setStatusMsg('Conecta tu wallet para comenzar')
    setCoordinationHash('')
    setVerifyDisabled(true)
    setCoordDisabled(false)
    setCoordBtnText('INICIAR COORDINACIÓN')
  }, [])

  var handleDemoChange = useCallback(function (demo) {
    setCurrentDemo(demo)
    setIsCoordinating(false)
    setCoordinationComplete(false)
    setCoordinationHash('')
    setCoordDisabled(false)
    setVerifyDisabled(true)
    setCoordBtnText('INICIAR COORDINACIÓN')

    var data = getDemoData(demo)
    var items = []
    if (demo === 'logistica') items = data.familias || []
    else if (demo === 'ciberseguridad') items = data.endpoints || []
    else if (demo === 'farmaceutica') items = data.moleculas || []
    setTaskStatus({ completed: 0, total: items.length })
    setStatusMsg('Listo')
  }, [getDemoData])

  var handleStartCoordination = useCallback(function () {
    if (isCoordinating) return
    setIsCoordinating(true)
    setCoordDisabled(true)
    setCoordBtnText('COORDINANDO...')
    setStatusMsg('Ejecutando cálculos verificables...')

    var demo = currentDemoRef.current
    var data = getDemoData(demo)

    var total = 0
    if (demo === 'logistica') total = (data.familias || []).length
    else if (demo === 'ciberseguridad') total = (data.endpoints || []).length
    else if (demo === 'farmaceutica') total = (data.moleculas || []).length

    var completed = 0
    intervalRef.current = setInterval(function () {
      var batch = Math.floor(Math.random() * Math.max(2, Math.floor(total / 5))) + 1
      completed += batch
      if (completed >= total) completed = total
      setTaskStatus({ completed: completed, total: total })

      if (completed >= total) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        setIsCoordinating(false)
        setCoordinationComplete(true)
        setCoordBtnText('COMPLETADO')
        setVerifyDisabled(false)

        if (currentDemoRef.current === 'logistica') {
          setStatusMsg('1.000 rutas. 1 bloque. 400 ms.')
          var hash = '0x'
          for (var i = 0; i < 64; i++) hash += Math.floor(Math.random() * 16).toString(16)
          setCoordinationHash(hash)
        } else {
          setStatusMsg('Proceso completado')
        }
      }
    }, 180)
  }, [isCoordinating, getDemoData])

  var handleVerify = useCallback(function () {
    window.open('https://testnet.monadexplorer.com', '_blank')
  }, [])

  var handleDonate = useCallback(function () {
    if (!provider || !signer) {
      alert('Conecta tu wallet primero')
      return
    }
    setSimulatedDonationTotal(function (prev) {
      var nuevo = prev + 0.01
      setStatusMsg('Donación enviada exitosamente')
      return nuevo
    })
  }, [provider, signer])

  useEffect(function () {
    return function cleanup() {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <>
      {!userAddress ? (
        <LoginScreen onConnect={handleConnect} />
      ) : (
        <Dashboard
          userAddress={userAddress}
          userBalance={userBalance}
          currentDemo={currentDemo}
          isCoordinating={isCoordinating}
          coordinationComplete={coordinationComplete}
          simulatedDonationTotal={simulatedDonationTotal}
          taskStatus={taskStatus}
          statusMsg={statusMsg}
          coordinationHash={coordinationHash}
          verifyDisabled={verifyDisabled}
          coordDisabled={coordDisabled}
          coordBtnText={coordBtnText}
          onDisconnect={handleDisconnect}
          onDemoChange={handleDemoChange}
          onStartCoordination={handleStartCoordination}
          onVerify={handleVerify}
          onDonate={handleDonate}
        />
      )}
      {userAddress && <RainCanvas isCoordinating={isCoordinating} />}
    </>
  )
}
