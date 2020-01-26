import React, { useRef, useEffect, useState } from "react"
import styled, { css } from "styled-components"

const StickyContent = styled.div`
  position: sticky;
  ${({ top }) => top && css`top: 0;`}
  ${({ bottom }) => bottom && css`bottom: 0;`}
`

const TopDetector = styled.div`
  ${({ top }) => !top && css`display: none;`}
`

const BottomDetector = styled.div`
  ${({ bottom }) => !bottom && css`display: none;`}
`

function Sticky(props) {
  const [stuck, setStuck] = useState(false)
  const topDetectorRef = useRef()
  const bottomDetectorRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      setStuck(entries.some(entry => entry.intersectionRatio < 1))
    }, {
      threshold: [1],
    })
    
    observer.observe(topDetectorRef.current)
    observer.observe(bottomDetectorRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <TopDetector top={props.top} ref={topDetectorRef} />
      <StickyContent className={stuck && 'stuck'} {...props} />
      <BottomDetector bottom={props.bottom} ref={bottomDetectorRef} />
    </>
  )
}

export default Sticky
