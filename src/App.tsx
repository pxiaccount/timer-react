import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00'
  })
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (isFinished) {
      alert("Time's up")
      setIsFinished(false)
    }
  }, [isFinished])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const num = parseInt(value)
    const formattedValue = num < 10 ? `0${num}` : String(num)

    setTime(prev => ({
      ...prev,
      [name]: formattedValue
    }))
  }

  const startTimer = () => {
    if (intervalRef.current !== null) return

    setIsRunning(true)
    intervalRef.current = window.setInterval(() => {
      setTime(prev => {
        let hours = parseInt(prev.hours)
        let minutes = parseInt(prev.minutes)
        let seconds = parseInt(prev.seconds)

        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else {
          clearInterval(intervalRef.current!)
          setIsRunning(false)
          intervalRef.current = null
          setIsFinished(true)
          return prev
        }

        return {
          hours: hours < 10 ? `0${hours}` : String(hours),
          minutes: minutes < 10 ? `0${minutes}` : String(minutes),
          seconds: seconds < 10 ? `0${seconds}` : String(seconds)
        }
      })
    }, 1000)
  }

  const resetTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRunning(false)
    setTime({
      hours: '00',
      minutes: '00',
      seconds: '00'
    })
  }

  const stopTimer = () => {
    if (intervalRef.current === null) return
    clearInterval(intervalRef.current)
    intervalRef.current = null
    setIsRunning(false)
  }

  return (
    <>
      <div className={`min-h-screen py-20 px-4 sm:px-7 lg:px-8`}>
        <div className='max-w-200 mx-auto'>
          <div className='flex flex-row justify-center items-center'>
            <input
              type="number"
              name="hours"
              min={0}
              max={23}
              value={time.hours}
              onChange={handleChange}
              disabled={isRunning}
              style={{ width: '200px' }}
              className={`mx-2 text-9xl`}
            />
            <input
              type="number"
              name="minutes"
              min={0}
              max={59}
              value={time.minutes}
              onChange={handleChange}
              disabled={isRunning}
              style={{ width: '200px' }}
              className={`mx-2 text-9xl`}
            />
            <input
              type="number"
              name="seconds"
              min={0}
              max={59}
              value={time.seconds}
              onChange={handleChange}
              disabled={isRunning}
              style={{ width: '200px' }}
              className={`mx-2 text-9xl`}
            />
          </div>
          <div className='w-200 flex flex-row justify-center items-center text-white'>
            <button onClick={startTimer} disabled={isRunning} className={`bg-blue-500 rounded-lg mx-2 p-1 my-2`}>
              Start
            </button>
            <button onClick={stopTimer} disabled={!isRunning} className={`bg-blue-500 rounded-lg mx-2 p-1 my-2`}>
              Stop
            </button>
            <button onClick={resetTimer} className={`bg-blue-500 rounded-lg mx-2 p-1 my-2`}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
