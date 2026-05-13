import { useRef, useState } from "react"
import "./card.css" 

const Topics = () => {

  const mediaRecorder = useRef(null)
  const videoRef = useRef(null)
  const audioChunks = useRef([])
  const [audio, setAudio] = useState(null)

  const audioCapture = async () => {
    console.log("recording")
    const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true})
    mediaRecorder.current = new MediaRecorder(stream)

    videoRef.current.srcObject = stream

    mediaRecorder.current.ondataavailable = (e) => {
      audioChunks.current.push(e.data)
    }

    mediaRecorder.current.start()
  }

  const stopCapture = async () => {
    mediaRecorder.current.stop()

    videoRef.current.srcObject.getTracks().forEach(track => track.stop())


    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current)
      setAudio(audioBlob)

      audioChunks.current = []
      videoRef.current = []
    }
  }

  return (
    <div className='flex-view'>
      <button onClick={audioCapture}>Start recoridng</button>
      <button onClick={stopCapture}>Stop</button>
      <video ref={videoRef} autoPlay playsInline controls/>
      {audio && <audio src={URL.createObjectURL(audio)} controls/>}
      {audio && <video src={URL.createObjectURL(audio)} controls style={{width:"400px" , height: "400px"}}/>}
    </div>
  )
}

export default Topics