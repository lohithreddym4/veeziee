"use client"
import React, { useEffect, useState } from 'react'

const Timer = () => {
    const [time, setTime] = useState("0:00:00")
    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prev) => {
                const time = prev.split(":")
                let h = parseInt(time[0])
                let m = parseInt(time[1])
                let s = parseInt(time[2])
                s++
                if (s === 60) {
                    s = 0
                    m++
                }
                if (m === 60) {
                    m = 0
                    h++
                }
                return `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    return (

        <b>{((parseInt(time.split(":")[0]) == 0 ? "" : time.split(":")[0] + ":")) + time.split(":")[1] + ":" + time.split(":")[2]}</b>


    )
}

export default Timer
